#!/usr/bin/env tsx
/**
 * Build-time SPA pre-renderer.
 *
 * Runs after `vite build`:
 *   1. spins up an in-process Node http server serving `dist/` (with SPA fallback)
 *   2. uses puppeteer to fetch each route from that server
 *   3. writes the fully-rendered HTML back to `dist/<route>/index.html`
 *
 * The result: every URL in the sitemap ships pre-populated <head> meta tags so
 * social-media scrapers (Facebook, Twitter, LinkedIn, Slack, WhatsApp) — which
 * do not execute JavaScript — see the correct title, description, OG image, and
 * JSON-LD without needing SSR.
 *
 * Why an in-process http server (not `vite preview`)?
 *   On Vercel CI, spawning `pnpm exec vite preview` was racy: pnpm + vite
 *   startup could exceed our 15s readiness window, breaking the build. The
 *   built-in server starts in <50ms and is dependency-free.
 */
import { createServer, type Server } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer, { type Browser } from 'puppeteer';

import { communities } from '../src/data/communities.js';
import { artists } from '../src/data/artists.js';
import { cards } from '../src/data/cards.js';
import { squads } from '../src/data/squads.js';
import { meetups } from '../src/data/meetups.js';
import { soldiers } from '../src/data/soldiers.js';
import { countries } from '../src/data/countries.js';

const PORT = 4173 + Math.floor(Math.random() * 100);
const HOST = `http://127.0.0.1:${PORT}`;
const distDir = path.resolve(process.cwd(), 'dist');

if (!existsSync(distDir)) {
  console.error('❌ dist/ not found — run `vite build` first.');
  process.exit(1);
}

if (!existsSync(path.join(distDir, 'index.html'))) {
  console.error('❌ dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const staticRoutes = [
  '/',
  '/communities',
  '/cards',
  '/artists',
  '/meetups',
  '/army',
  '/contact',
  '/sobre-nosotros',
  '/mission/nodes',
  '/mission/merchants',
  '/mission/self-custody',
  '/mission/stack',
  '/guias',
  '/guias/bitcoin-en-latinoamerica',
  '/guias/bitcoin-argentina',
];
const dynamicRoutes = [
  ...countries.map((c) => `/pais/${c.slug}`),
  ...communities.map((c) => `/community/${c.id}`),
  ...artists.map((a) => `/artist/${a.id}`),
  ...cards.map((c) => `/card/${c.id}`),
  ...squads.map((s) => `/squad/${s.id}`),
  ...meetups.map((m) => `/meetup/${m.id}`),
  ...soldiers.map((s) => `/soldier/${s.id}`),
];
const routes = [...staticRoutes, ...dynamicRoutes];

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

const sendFile = async (
  res: import('node:http').ServerResponse,
  filePath: string,
  status = 200,
): Promise<boolean> => {
  try {
    const data = await readFile(filePath);
    res.statusCode = status;
    res.setHeader('content-type', MIME[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream');
    res.end(data);
    return true;
  } catch {
    return false;
  }
};

const startServer = (): Promise<Server> =>
  new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const reqPath = (req.url ?? '/').split('?')[0];
        const target = path.join(distDir, decodeURIComponent(reqPath));

        // Try the literal path. If it's a directory, fall through to its index.html.
        try {
          const s = await stat(target);
          if (s.isFile() && (await sendFile(res, target))) return;
          if (s.isDirectory() && (await sendFile(res, path.join(target, 'index.html')))) return;
        } catch {
          // path missing — fall through to SPA fallback
        }

        // SPA fallback: serve dist/index.html so client-side routing kicks in.
        if (await sendFile(res, path.join(distDir, 'index.html'))) return;

        res.statusCode = 404;
        res.end('Not found');
      } catch (err) {
        res.statusCode = 500;
        res.end(`Server error: ${(err as Error).message}`);
      }
    });

    server.on('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });

const renderRoute = async (browser: Browser, route: string): Promise<string> => {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (compatible; VeintiunoPrerender/1.0)');
  try {
    await page.goto(`${HOST}${route}`, { waitUntil: 'networkidle0', timeout: 45000 });
    // Extra tick for any post-mount head writes to flush.
    await new Promise((r) => setTimeout(r, 250));
    return await page.content();
  } finally {
    await page.close();
  }
};

const writeRouteHtml = (route: string, html: string) => {
  const cleanRoute = route === '/' ? '' : route.replace(/^\//, '');
  const targetDir = route === '/' ? distDir : path.join(distDir, cleanRoute);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
};

async function main() {
  console.log(`🚀 Starting in-process static server on :${PORT} ...`);
  const server = await startServer();

  let browser: Browser | undefined;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    console.log(`🧭 Pre-rendering ${routes.length} routes ...`);

    let done = 0;
    let failed = 0;
    // Lower concurrency on CI (Vercel's build container has limited CPU/RAM
    // and puppeteer pages are heavy). Override with PRERENDER_CONCURRENCY.
    const concurrency = Number(process.env.PRERENDER_CONCURRENCY) || (process.env.CI ? 2 : 4);
    const queue = [...routes];

    const workers = Array.from({ length: concurrency }, async () => {
      while (queue.length > 0) {
        const route = queue.shift();
        if (!route) break;
        let attempts = 0;
        const maxAttempts = 2;
        let success = false;
        while (attempts < maxAttempts && !success) {
          attempts++;
          try {
            const html = await renderRoute(browser!, route);
            writeRouteHtml(route, html);
            done += 1;
            success = true;
            if (done % 10 === 0 || done === routes.length) {
              console.log(`   [${done}/${routes.length}] last: ${route}`);
            }
          } catch (err) {
            if (attempts >= maxAttempts) {
              failed += 1;
              console.warn(`   ⚠️  ${route} — ${(err as Error).message}`);
            } else {
              await new Promise((r) => setTimeout(r, 500));
            }
          }
        }
      }
    });
    await Promise.all(workers);

    if (failed > 0) {
      console.warn(`\n⚠️  Done with ${failed} failures. ${done} rendered.`);
      // Don't fail the build on a few flaky routes — they'll fall back to the
      // SPA shell, still index after JS. CI will surface the warning.
    } else {
      console.log(`\n✅ Done. ${done}/${routes.length} routes rendered.`);
    }
  } finally {
    await browser?.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
