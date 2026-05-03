#!/usr/bin/env tsx
/**
 * One-shot generator for static brand assets that need to ship in `public/`:
 *  - apple-touch-icon.png  (180x180)
 *  - logo.png              (512x512, used by JSON-LD Organization.logo)
 *  - og-default.jpg        (1200x630, default Open Graph preview)
 *  - favicon.ico           (legacy fallback derived from favicon.svg)
 *
 * Re-run only when the brand mark changes.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');

// Brand mark used for icons — black rounded square with the orange "21" wordmark.
const iconSvg = (size: number) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="14" fill="#171717"/>
  <text x="32" y="46" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="36" fill="#F7931A" letter-spacing="-2">21</text>
</svg>`;

// Open Graph default — 1200x630 with aurora gradient + wordmark + tagline.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#F7931A" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#F7931A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="80%" cy="70%" r="60%">
      <stop offset="0%" stop-color="#FFA940" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#FFA940" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g3" cx="50%" cy="100%" r="80%">
      <stop offset="0%" stop-color="#FFD93D" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFD93D" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F7931A"/>
      <stop offset="50%" stop-color="#FFA940"/>
      <stop offset="100%" stop-color="#FFD93D"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect width="1200" height="630" fill="url(#g3)"/>
  <g font-family="Inter, system-ui, sans-serif" text-anchor="middle">
    <text x="600" y="220" font-size="48" font-weight="700" fill="rgba(255,255,255,0.55)" letter-spacing="6">VEINTIUNO.LAT</text>
    <text x="600" y="360" font-size="120" font-weight="900" fill="url(#textGrad)" letter-spacing="-4">LA CRUZADA</text>
    <text x="600" y="470" font-size="100" font-weight="900" fill="#ffffff" letter-spacing="-3">BITCOINER</text>
    <text x="600" y="560" font-size="32" font-weight="500" fill="rgba(255,255,255,0.7)">Comunidades Bitcoin en Latinoamérica</text>
  </g>
</svg>`;

async function main() {
  // 1. apple-touch-icon (180x180 PNG)
  await sharp(Buffer.from(iconSvg(180)))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png');

  // 2. logo.png (512x512 for JSON-LD Organization.logo)
  await sharp(Buffer.from(iconSvg(512)))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✅ logo.png');

  // 3. og-default.jpg (1200x630)
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .jpeg({ quality: 88, progressive: true })
    .toFile(path.join(publicDir, 'og-default.jpg'));
  console.log('✅ og-default.jpg');

  // 4. favicon.ico — sharp doesn't natively output .ico, but most browsers now read favicon.svg.
  //    We ship a 32x32 PNG named .ico for legacy IE/older Edge compatibility.
  await sharp(Buffer.from(iconSvg(32)))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✅ favicon.ico (32x32 PNG, legacy fallback)');

  console.log('\nAll brand assets generated in public/');
}

main().catch((err) => {
  console.error('Failed to generate brand assets:', err);
  process.exit(1);
});

if (!fs.existsSync(publicDir)) {
  console.error(`public/ not found at ${publicDir}`);
  process.exit(1);
}
