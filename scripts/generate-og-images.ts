#!/usr/bin/env tsx
/* eslint-disable no-control-regex */
/**
 * Build-time per-page Open Graph image generator.
 *
 * For every Community / Artist / Meetup / Card / Soldier / Squad, render a
 * 1200x630 JPG using Sharp from a hand-tuned SVG template. The output goes to
 * `public/og/<entity>/<id>.jpg` so the asset is served by both `vite preview`
 * (dev) and the deployed static host (prod), and so the prerender step picks it
 * up on the next build.
 *
 * Re-run this whenever community/artist/meetup data changes. It is wired into
 * `pnpm build` automatically.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import { communities } from '../src/data/communities.js';
import { artists } from '../src/data/artists.js';
import { cards } from '../src/data/cards.js';
import { squads } from '../src/data/squads.js';
import { meetups } from '../src/data/meetups.js';
import { soldiers } from '../src/data/soldiers.js';

const W = 1200;
const H = 630;
const publicDir = path.resolve(process.cwd(), 'public');
const ogRoot = path.join(publicDir, 'og');

// XML-safe text. Strips control chars and escapes the 5 reserved chars.
const xml = (s: string | undefined | null): string =>
  (s ?? '')
    .replace(/[\u0000-\u001f]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Truncate a string to N chars, appending ellipsis if cut.
const trunc = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…');

interface OgTemplateOpts {
  /** Big headline (max ~36 chars rendered at 88px) */
  title: string;
  /** Tagline shown above the title (uppercase, small) */
  badge: string;
  /** Subtitle below the title */
  subtitle?: string;
  /** Variant tone: warm = orange aurora, dark = ember, sunrise = yellow-pink */
  variant?: 'warm' | 'dark' | 'sunrise' | 'ember';
}

const variants = {
  warm: { base: '#fff8ef', glow1: '#F7931A', glow2: '#FFA940', glow3: '#FFD93D', text: '#171717', sub: 'rgba(23,23,23,0.75)' },
  dark: { base: '#0a0a0a', glow1: '#F7931A', glow2: '#FFA940', glow3: '#FFD93D', text: '#ffffff', sub: 'rgba(255,255,255,0.75)' },
  sunrise: { base: '#fffaf0', glow1: '#FFD93D', glow2: '#F7931A', glow3: '#FF6B6B', text: '#171717', sub: 'rgba(23,23,23,0.75)' },
  ember: { base: '#171717', glow1: '#F7931A', glow2: '#FF6B6B', glow3: '#F7931A', text: '#ffffff', sub: 'rgba(255,255,255,0.7)' },
};

const ogTemplate = ({ title, badge, subtitle, variant = 'warm' }: OgTemplateOpts): string => {
  const v = variants[variant];
  const titleSize = title.length > 28 ? 84 : title.length > 18 ? 100 : 116;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g1" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${v.glow1}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${v.glow1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="80%" cy="70%" r="60%">
      <stop offset="0%" stop-color="${v.glow2}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${v.glow2}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g3" cx="50%" cy="100%" r="80%">
      <stop offset="0%" stop-color="${v.glow3}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${v.glow3}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F7931A"/>
      <stop offset="50%" stop-color="#FFA940"/>
      <stop offset="100%" stop-color="#FFD93D"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${v.base}"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <rect width="${W}" height="${H}" fill="url(#g3)"/>

  <!-- Brand mark top-left -->
  <g font-family="Inter, system-ui, sans-serif" fill="${v.text}" opacity="0.85">
    <text x="80" y="100" font-size="36" font-weight="700" letter-spacing="2">VEINTIUNO.LAT</text>
  </g>

  <!-- Badge -->
  <g transform="translate(80, ${H / 2 - 130})" font-family="Inter, system-ui, sans-serif">
    <rect width="${badge.length * 13 + 60}" height="44" rx="22" fill="${v.text}" fill-opacity="0.08"/>
    <circle cx="28" cy="22" r="6" fill="#F7931A"/>
    <text x="48" y="29" font-size="18" font-weight="700" fill="${v.text}" letter-spacing="3">${xml(badge.toUpperCase())}</text>
  </g>

  <!-- Title -->
  <g font-family="Inter, system-ui, sans-serif">
    <text x="80" y="${H / 2 + 20}" font-size="${titleSize}" font-weight="900" fill="url(#textGrad)" letter-spacing="-3">${xml(trunc(title.toUpperCase(), 36))}</text>
  </g>

  ${
    subtitle
      ? `<g font-family="Inter, system-ui, sans-serif">
    <text x="80" y="${H / 2 + 90}" font-size="32" font-weight="500" fill="${v.sub}">${xml(trunc(subtitle, 64))}</text>
  </g>`
      : ''
  }

  <!-- Footer -->
  <g font-family="Inter, system-ui, sans-serif">
    <text x="80" y="${H - 50}" font-size="22" font-weight="500" fill="${v.sub}">${xml('Comunidades Bitcoin en Latinoamérica')}</text>
  </g>
</svg>`;
};

const writeOg = async (svg: string, outRel: string) => {
  const outAbs = path.join(ogRoot, outRel);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  await sharp(Buffer.from(svg)).resize(W, H).jpeg({ quality: 85, progressive: true }).toFile(outAbs);
};

async function main() {
  fs.mkdirSync(ogRoot, { recursive: true });

  let n = 0;

  // Communities
  for (const c of communities) {
    await writeOg(
      ogTemplate({
        badge: 'Comunidad',
        title: c.title,
        subtitle: `${c.city ? c.city + ', ' : ''}${c.country}`,
        variant: 'warm',
      }),
      `community/${c.id}.jpg`,
    );
    n++;
  }

  // Artists
  for (const a of artists) {
    await writeOg(
      ogTemplate({
        badge: 'Artista',
        title: a.username,
        subtitle: `${a.completedCards}/${a.totalCards} cards · ${a.countryName}`,
        variant: 'sunrise',
      }),
      `artist/${a.id}.jpg`,
    );
    n++;
  }

  // Meetups
  for (const m of meetups) {
    await writeOg(
      ogTemplate({
        badge: `${m.category} · ${m.type}`,
        title: m.title,
        subtitle: `${m.date} · ${m.location}`,
        variant: 'ember',
      }),
      `meetup/${m.id}.jpg`,
    );
    n++;
  }

  // Cards
  for (const c of cards) {
    await writeOg(
      ogTemplate({
        badge: `Card ${c.number}`,
        title: c.title || c.communityName,
        subtitle: `${c.artist} · ${c.location}`,
        variant: 'dark',
      }),
      `card/${c.id}.jpg`,
    );
    n++;
  }

  // Squads
  for (const s of squads) {
    await writeOg(
      ogTemplate({
        badge: 'Squad',
        title: s.name,
        subtitle: `${s.soldiers} soldados · ${s.leader}`,
        variant: 'ember',
      }),
      `squad/${s.id}.jpg`,
    );
    n++;
  }

  // Soldiers
  for (const s of soldiers) {
    await writeOg(
      ogTemplate({
        badge: 'Soldado',
        title: s.username,
        subtitle: `${s.role} · ${s.countryName}`,
        variant: 'warm',
      }),
      `soldier/${s.id}.jpg`,
    );
    n++;
  }

  console.log(`✅ Generated ${n} OG images in public/og/`);
}

main().catch((err) => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
