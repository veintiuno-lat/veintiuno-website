#!/usr/bin/env tsx
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
  lastmod?: string;
}

// Pull a stable lastmod for a data collection from its source file mtime, falling back to today.
const today = new Date().toISOString().split('T')[0];
const dataDir = path.resolve(process.cwd(), 'src', 'data');
const fileMtime = (filename: string): string => {
  try {
    const stat = fs.statSync(path.join(dataDir, filename));
    return stat.mtime.toISOString().split('T')[0];
  } catch {
    return today;
  }
};

const lastmodCommunities = fileMtime('communities.ts');
const lastmodArtists = fileMtime('artists.ts');
const lastmodCards = fileMtime('cards.ts');
const lastmodSquads = fileMtime('squads.ts');
const lastmodMeetups = fileMtime('meetups.ts');
const lastmodSoldiers = fileMtime('soldiers.ts');
const lastmodCountries = fileMtime('countries.ts');

// Static routes (must match the routes registered in src/App.tsx).
const staticRoutes: SitemapUrl[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
  { path: '/communities', priority: '0.9', changefreq: 'weekly', lastmod: lastmodCommunities },
  { path: '/meetups', priority: '0.9', changefreq: 'daily', lastmod: lastmodMeetups },
  { path: '/artists', priority: '0.8', changefreq: 'monthly', lastmod: lastmodArtists },
  { path: '/cards', priority: '0.8', changefreq: 'monthly', lastmod: lastmodCards },
  { path: '/army', priority: '0.7', changefreq: 'monthly', lastmod: lastmodSquads },
  { path: '/mission/nodes', priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/mission/merchants', priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/mission/self-custody', priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/mission/stack', priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/contact', priority: '0.6', changefreq: 'monthly', lastmod: today },
  { path: '/sobre-nosotros', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/guias', priority: '0.85', changefreq: 'weekly', lastmod: today },
  { path: '/guias/bitcoin-en-latinoamerica', priority: '0.9', changefreq: 'monthly', lastmod: '2026-05-02' },
  { path: '/guias/bitcoin-argentina', priority: '0.9', changefreq: 'monthly', lastmod: '2026-05-02' },
];

// Dynamic routes — note these are SINGULAR to match src/App.tsx route definitions.
const communityRoutes: SitemapUrl[] = communities.map((c) => ({
  path: `/community/${c.id}`,
  priority: '0.8',
  changefreq: 'monthly',
  lastmod: lastmodCommunities,
}));

const artistRoutes: SitemapUrl[] = artists.map((a) => ({
  path: `/artist/${a.id}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: lastmodArtists,
}));

const cardRoutes: SitemapUrl[] = cards.map((c) => ({
  path: `/card/${c.id}`,
  priority: '0.6',
  changefreq: 'monthly',
  lastmod: lastmodCards,
}));

const squadRoutes: SitemapUrl[] = squads.map((s) => ({
  path: `/squad/${s.id}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: lastmodSquads,
}));

const meetupRoutes: SitemapUrl[] = meetups.map((m) => ({
  path: `/meetup/${m.id}`,
  priority: '0.7',
  changefreq: 'weekly',
  lastmod: lastmodMeetups,
}));

const soldierRoutes: SitemapUrl[] = soldiers.map((s) => ({
  path: `/soldier/${s.id}`,
  priority: '0.6',
  changefreq: 'monthly',
  lastmod: lastmodSoldiers,
}));

const countryRoutes: SitemapUrl[] = countries.map((c) => ({
  path: `/pais/${c.slug}`,
  priority: '0.85',
  changefreq: 'weekly',
  lastmod: lastmodCountries,
}));

const allRoutes: SitemapUrl[] = [
  ...staticRoutes,
  ...countryRoutes,
  ...communityRoutes,
  ...artistRoutes,
  ...cardRoutes,
  ...squadRoutes,
  ...meetupRoutes,
  ...soldierRoutes,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u.path}</loc>
    <lastmod>${u.lastmod ?? today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log('✅ Sitemap generated');
console.log(`   - Total URLs:  ${allRoutes.length}`);
console.log(`   - Static:      ${staticRoutes.length}`);
console.log(`   - Communities: ${communityRoutes.length}`);
console.log(`   - Artists:     ${artistRoutes.length}`);
console.log(`   - Cards:       ${cardRoutes.length}`);
console.log(`   - Squads:      ${squadRoutes.length}`);
console.log(`   - Meetups:     ${meetupRoutes.length}`);
console.log(`   - Soldiers:    ${soldierRoutes.length}`);
console.log(`   - Countries:   ${countryRoutes.length}`);
console.log(`   - File:        ${outputPath}`);
