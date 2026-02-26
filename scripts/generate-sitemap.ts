#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

// Import data from source files
import { communities } from '../src/data/communities.js';
import { artists } from '../src/data/artists.js';
import { cards } from '../src/data/cards.js';
import { squads } from '../src/data/squads.js';

const baseUrl = 'https://veintiuno.lat';
const today = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  path: string;
  priority: string;
  changefreq: string;
}

// Static routes
const staticRoutes: SitemapUrl[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/communities', priority: '0.9', changefreq: 'weekly' },
  { path: '/meetups', priority: '0.9', changefreq: 'daily' },
  { path: '/artists', priority: '0.8', changefreq: 'monthly' },
  { path: '/cards', priority: '0.8', changefreq: 'monthly' },
  { path: '/army', priority: '0.7', changefreq: 'monthly' },
  { path: '/nodes', priority: '0.7', changefreq: 'monthly' },
  { path: '/merchants', priority: '0.7', changefreq: 'monthly' },
  { path: '/self-custody', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
];

// Generate dynamic routes
const communityRoutes: SitemapUrl[] = communities.map(c => ({
  path: `/communities/${c.id}`,
  priority: '0.8',
  changefreq: 'monthly'
}));

const artistRoutes: SitemapUrl[] = artists.map(a => ({
  path: `/artists/${a.id}`,
  priority: '0.7',
  changefreq: 'monthly'
}));

const cardRoutes: SitemapUrl[] = cards.map(c => ({
  path: `/cards/${c.id}`,
  priority: '0.7',
  changefreq: 'monthly'
}));

const squadRoutes: SitemapUrl[] = squads.map(s => ({
  path: `/squads/${s.id}`,
  priority: '0.7',
  changefreq: 'monthly'
}));

// Combine all routes
const allRoutes: SitemapUrl[] = [
  ...staticRoutes,
  ...communityRoutes,
  ...artistRoutes,
  ...cardRoutes,
  ...squadRoutes,
];

// Build sitemap XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(u => `  <url>
    <loc>${baseUrl}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to public directory
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Sitemap generado exitosamente`);
console.log(`   - Total URLs: ${allRoutes.length}`);
console.log(`   - Comunidades: ${communityRoutes.length}`);
console.log(`   - Artistas: ${artistRoutes.length}`);
console.log(`   - Tarjetas: ${cardRoutes.length}`);
console.log(`   - Squads: ${squadRoutes.length}`);
console.log(`   - Archivo: ${outputPath}`);
