#!/usr/bin/env tsx
/**
 * Build-time SPA pre-renderer.
 *
 * Runs after `vite build`:
 *   1. spins up `vite preview` on a free port
 *   2. uses puppeteer to fetch each route from the in-memory static server
 *   3. writes the fully-rendered HTML back to `dist/<route>/index.html`
 *
 * The result: every URL in the sitemap ships pre-populated <head> meta tags so
 * social-media scrapers (Facebook, Twitter, LinkedIn, Slack, WhatsApp) — which
 * do not execute JavaScript — see the correct title, description, OG image, and
 * JSON-LD without needing SSR.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer, { type Browser } from 'puppeteer';

import { communities } from '../src/data/communities.js';
import { artists } from '../src/data/artists.js';
import { cards } from '../src/data/cards.js';
import { squads } from '../src/data/squads.js';
import { meetups } from '../src/data/meetups.js';
import { soldiers } from '../src/data/soldiers.js';

const PORT = 4173 + Math.floor(Math.random() * 100);
const HOST = `http://localhost:${PORT}`;
const distDir = path.resolve(process.cwd(), 'dist');

if (!existsSync(distDir)) {
  console.error('❌ dist/ not found — run `vite build` first.');
  process.exit(1);
}

// All routes to prerender. Must stay aligned with src/App.tsx and the sitemap.
const staticRoutes = [
  '/',
  '/communities',
  '/cards',
  '/artists',
  '/meetups',
  '/army',
  '/contact',
  '/mission/nodes',
  '/mission/merchants',
  '/mission/self-custody',
  '/mission/stack',
];
const dynamicRoutes = [
  ...communities.map((c) => `/community/${c.id}`),
  ...artists.map((a) => `/artist/${a.id}`),
  ...cards.map((c) => `/card/${c.id}`),
  ...squads.map((s) => `/squad/${s.id}`),
  ...meetups.map((m) => `/meetup/${m.id}`),
  ...soldiers.map((s) => `/soldier/${s.id}`),
];
const routes = [...staticRoutes, ...dynamicRoutes];

const startPreview = (): Promise<{ kill: () => void }> =>
  new Promise((resolve, reject) => {
    const proc = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT), '--strictPort'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    });

    let resolved = false;
    const onData = (chunk: Buffer) => {
      const s = chunk.toString();
      if (!resolved && s.includes(`localhost:${PORT}`)) {
        resolved = true;
        resolve({ kill: () => proc.kill() });
      }
    };
    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', onData);

    proc.on('error', reject);
    setTimeout(() => {
      if (!resolved) reject(new Error(`vite preview did not start on :${PORT} within 15s`));
    }, 15000);
  });

const renderRoute = async (browser: Browser, route: string): Promise<string> => {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (compatible; VeintiunoPrerender/1.0)');
  try {
    await page.goto(`${HOST}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    // Wait an extra tick for any post-mount head writes to flush.
    await new Promise((r) => setTimeout(r, 250));
    const html = await page.content();
    return html;
  } finally {
    await page.close();
  }
};

const writeRouteHtml = (route: string, html: string) => {
  const cleanRoute = route === '/' ? '' : route.replace(/^\//, '');
  const targetDir = route === '/' ? distDir : path.join(distDir, cleanRoute);
  mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, 'index.html');
  writeFileSync(targetFile, html, 'utf-8');
};

async function main() {
  console.log(`🚀 Starting vite preview on :${PORT} ...`);
  const preview = await startPreview();

  let browser: Browser | undefined;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    console.log(`🧭 Pre-rendering ${routes.length} routes ...`);

    let done = 0;
    let failed = 0;
    const concurrency = 4;
    const queue = [...routes];
    const workers = Array.from({ length: concurrency }, async () => {
      while (queue.length > 0) {
        const route = queue.shift();
        if (!route) break;
        try {
          const html = await renderRoute(browser!, route);
          writeRouteHtml(route, html);
          done += 1;
          if (done % 10 === 0 || done === routes.length) {
            console.log(`   [${done}/${routes.length}] last: ${route}`);
          }
        } catch (err) {
          failed += 1;
          console.warn(`   ⚠️  ${route} — ${(err as Error).message}`);
        }
      }
    });
    await Promise.all(workers);
    console.log(`\n✅ Done. ${done} rendered, ${failed} failed.`);
  } finally {
    await browser?.close();
    preview.kill();
  }
}

main().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
