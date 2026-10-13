#!/usr/bin/env tsx
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Import data from source files
import { communities } from '../src/data/communities.js';
import { artists } from '../src/data/artists.js';
import { cards } from '../src/data/cards.js';
import { squads } from '../src/data/squads.js';
import { meetups } from '../src/data/meetups.js';
import { soldiers } from '../src/data/soldiers.js';
import { countries } from '../src/data/countries.js';

const baseUrl = 'https://veintiuno.lat';

interface SitemapUrl {
  path: string;
  priority: string;
  changefreq: string;
  sources: string[];
  /** Editorial date from guide frontmatter, when the route is an MDX guide. */
  contentDate?: string;
}

const guidesDir = path.resolve(process.cwd(), 'src', 'content', 'guides');
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

/**
 * Last commit date of a tracked file.
 * File mtimes and "today" are not content dates: CI checks the repo out at
 * deploy time, so both would mark the whole sitemap as modified on every build.
 * A shallow clone may not contain the commit that last touched a file; callers
 * fall back to the lastmod already committed in public/sitemap.xml.
 */
const gitLastmod = (relativePath: string): string | undefined => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relativePath], {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
};

const latest = (...dates: Array<string | undefined>): string | undefined => {
  const valid = dates.filter((date): date is string => !!date && /^\d{4}-\d{2}-\d{2}$/.test(date));
  return valid.sort().at(-1);
};

const readExistingLastmods = (): Map<string, string> => {
  const dates = new Map<string, string>();
  if (!fs.existsSync(outputPath)) return dates;
  const xml = fs.readFileSync(outputPath, 'utf8');
  const entry = /<loc>([^<]+)<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g;
  for (const match of xml.matchAll(entry)) {
    const routePath = match[1].startsWith(baseUrl) ? match[1].slice(baseUrl.length) || '/' : match[1];
    dates.set(routePath, match[2]);
  }
  return dates;
};

const frontmatterDate = (filename: string, key: 'dateModified' | 'datePublished'): string | undefined => {
  const text = fs.readFileSync(path.join(guidesDir, filename), 'utf8');
  const match = text.match(new RegExp(`^${key}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'));
  return match?.[1];
};

const guideFiles = fs
  .readdirSync(guidesDir)
  .filter((name) => name.endsWith('.mdx'))
  .sort();

const guides = guideFiles.map((filename) => {
  const slug = filename.slice(0, -'.mdx'.length);
  const source = `src/content/guides/${filename}`;
  return {
    slug,
    source,
    contentDate: latest(frontmatterDate(filename, 'dateModified'), frontmatterDate(filename, 'datePublished')),
  };
});

// Static routes (must match the routes registered in src/App.tsx).
// `sources` are the files whose content actually renders on that URL.
const staticRoutes: SitemapUrl[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', sources: ['src/pages/HomePage.tsx', 'src/data/communities.ts'] },
  { path: '/communities', priority: '0.9', changefreq: 'weekly', sources: ['src/pages/CommunitiesPage.tsx', 'src/data/communities.ts'] },
  { path: '/meetups', priority: '0.9', changefreq: 'daily', sources: ['src/pages/MeetupsPage.tsx', 'src/data/meetups.ts'] },
  { path: '/artists', priority: '0.8', changefreq: 'monthly', sources: ['src/pages/ArtistsPage.tsx', 'src/data/artists.ts'] },
  { path: '/cards', priority: '0.8', changefreq: 'monthly', sources: ['src/pages/CardsPage.tsx', 'src/data/cards.ts'] },
  { path: '/army', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/ArmyPage.tsx', 'src/data/squads.ts', 'src/data/soldiers.ts'] },
  { path: '/mission/nodes', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/NodesPage.tsx'] },
  { path: '/mission/merchants', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/MerchantsPage.tsx'] },
  { path: '/mission/self-custody', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/SelfCustodyPage.tsx'] },
  { path: '/mission/stack', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/StackPage.tsx'] },
  { path: '/contact', priority: '0.6', changefreq: 'monthly', sources: ['src/pages/ContactUsPage.tsx'] },
  {
    path: '/sobre-nosotros',
    priority: '0.8',
    changefreq: 'monthly',
    sources: ['src/pages/AboutPage.tsx', 'src/data/communities.ts', 'src/data/soldiers.ts', 'src/data/meetups.ts', 'src/data/countries.ts'],
  },
  {
    path: '/guias',
    priority: '0.85',
    changefreq: 'weekly',
    sources: ['src/pages/GuidesIndex.tsx', ...guides.map((guide) => guide.source)],
  },
];

const guideRoutes: SitemapUrl[] = guides.map((guide) => ({
  path: `/guias/${guide.slug}`,
  priority: '0.9',
  changefreq: 'monthly',
  sources: [guide.source, 'src/pages/GuidePage.tsx'],
  contentDate: guide.contentDate,
}));

// Dynamic routes — note these are SINGULAR to match src/App.tsx route definitions.
const communityRoutes: SitemapUrl[] = communities.map((c) => ({
  path: `/community/${c.id}`,
  priority: '0.8',
  changefreq: 'monthly',
  sources: ['src/data/communities.ts', 'src/pages/CommunityPage.tsx'],
}));

const artistRoutes: SitemapUrl[] = artists.map((a) => ({
  path: `/artist/${a.id}`,
  priority: '0.7',
  changefreq: 'monthly',
  sources: ['src/data/artists.ts', 'src/pages/ArtistPage.tsx'],
}));

const cardRoutes: SitemapUrl[] = cards.map((c) => ({
  path: `/card/${c.id}`,
  priority: '0.6',
  changefreq: 'monthly',
  sources: ['src/data/cards.ts', 'src/pages/CardPage.tsx'],
}));

const squadRoutes: SitemapUrl[] = squads.map((s) => ({
  path: `/squad/${s.id}`,
  priority: '0.7',
  changefreq: 'monthly',
  sources: ['src/data/squads.ts', 'src/pages/SquadPage.tsx'],
}));

const meetupRoutes: SitemapUrl[] = meetups.map((m) => ({
  path: `/meetup/${m.id}`,
  priority: '0.7',
  changefreq: 'weekly',
  sources: ['src/data/meetups.ts', 'src/pages/MeetupPage.tsx'],
}));

const soldierRoutes: SitemapUrl[] = soldiers.map((s) => ({
  path: `/soldier/${s.id}`,
  priority: '0.6',
  changefreq: 'monthly',
  sources: ['src/data/soldiers.ts', 'src/pages/SoldierPage.tsx'],
}));

const countryRoutes: SitemapUrl[] = countries.map((c) => ({
  path: `/pais/${c.slug}`,
  priority: '0.85',
  changefreq: 'weekly',
  sources: ['src/data/countries.ts', 'src/pages/CountryPage.tsx'],
}));

const allRoutes: SitemapUrl[] = [
  ...staticRoutes,
  ...guideRoutes,
  ...countryRoutes,
  ...communityRoutes,
  ...artistRoutes,
  ...cardRoutes,
  ...squadRoutes,
  ...meetupRoutes,
  ...soldierRoutes,
];

const existingLastmods = readExistingLastmods();
const sourceDateCache = new Map<string, string | undefined>();
const sourceLastmod = (relativePath: string): string | undefined => {
  if (!sourceDateCache.has(relativePath)) sourceDateCache.set(relativePath, gitLastmod(relativePath));
  return sourceDateCache.get(relativePath);
};

const resolveLastmod = (route: SitemapUrl): string | undefined =>
  latest(route.contentDate, ...route.sources.map(sourceLastmod)) ?? existingLastmods.get(route.path);

const xmlEscape = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const routePatternMatches = (pathname: string, pattern: string): boolean => {
  const pathParts = pathname.split('/').filter(Boolean);
  const patternParts = pattern.split('/').filter(Boolean);
  if (pathParts.length !== patternParts.length) return false;
  return patternParts.every((part, index) => part.startsWith(':') || part === pathParts[index]);
};

const assertRoutesMatchApp = (paths: string[]): void => {
  const appSource = fs.readFileSync(path.resolve(process.cwd(), 'src', 'App.tsx'), 'utf8');
  const declared = [...appSource.matchAll(/<Route\s+path=['"]([^'"]+)['"]/g)].map((match) => match[1]);
  const indexable = declared.filter((route) => route !== '*');
  const missing = indexable.filter((route) => {
    if (!route.includes(':')) return !paths.includes(route);
    return !paths.some((pathname) => routePatternMatches(pathname, route));
  });
  const orphans = paths.filter((pathname) => !indexable.some((route) => routePatternMatches(pathname, route)));
  const duplicates = paths.filter((pathname, index) => paths.indexOf(pathname) !== index);

  if (missing.length || orphans.length || duplicates.length) {
    if (missing.length) console.error(`Sitemap is missing routes: ${missing.join(', ')}`);
    if (orphans.length) console.error(`Sitemap has URLs with no route: ${orphans.join(', ')}`);
    if (duplicates.length) console.error(`Sitemap has duplicate URLs: ${[...new Set(duplicates)].join(', ')}`);
    process.exit(1);
  }
};

const paths = allRoutes.map((route) => route.path);
assertRoutesMatchApp(paths);

const undated = allRoutes.filter((route) => !resolveLastmod(route)).map((route) => route.path);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const lastmod = resolveLastmod(route);
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>
    <loc>${xmlEscape(`${baseUrl}${route.path}`)}</loc>${lastmodTag}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(outputPath, xml, 'utf-8');

console.log('✅ Sitemap generated');
console.log(`   - Total URLs:  ${allRoutes.length}`);
console.log(`   - Static:      ${staticRoutes.length}`);
console.log(`   - Guides:      ${guideRoutes.length}`);
console.log(`   - Communities: ${communityRoutes.length}`);
console.log(`   - Artists:     ${artistRoutes.length}`);
console.log(`   - Cards:       ${cardRoutes.length}`);
console.log(`   - Squads:      ${squadRoutes.length}`);
console.log(`   - Meetups:     ${meetupRoutes.length}`);
console.log(`   - Soldiers:    ${soldierRoutes.length}`);
console.log(`   - Countries:   ${countryRoutes.length}`);
if (undated.length) console.log(`   - Missing lastmod: ${undated.join(', ')}`);
console.log(`   - File:        ${outputPath}`);
