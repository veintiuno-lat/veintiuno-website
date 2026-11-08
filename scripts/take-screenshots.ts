/**
 * Screenshot script for visual verification of audit corrections
 *
 * Takes screenshots of key pages on desktop and mobile viewports:
 * - /communities
 * - /community/btc-isla (missing avatar+cover)
 * - /community/bitcoin-pichilemu (fixed typo)
 * - /community/ong-bitcoin-argentina (working avatar+cover)
 * - /army
 * - /soldier/lalo (fixed twitter URL)
 * - /cards (broken form notice)
 * - /artists (broken form notice)
 * - /meetups
 *
 * Run with: npx tsx scripts/take-screenshots.ts
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "http://localhost:4173";
const OUTPUT_DIR = join(__dirname, "..", "screenshots");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const PAGES = [
  { path: "/communities", name: "communities" },
  { path: "/community/btc-isla", name: "community-btc-isla" },
  { path: "/community/bitcoin-pichilemu", name: "community-bitcoin-pichilemu" },
  { path: "/community/ong-bitcoin-argentina", name: "community-ong-bitcoin-argentina" },
  { path: "/community/casa-satoshi", name: "community-casa-satoshi" },
  { path: "/army", name: "army" },
  { path: "/soldier/lalo", name: "soldier-lalo" },
  { path: "/soldier/fierillo", name: "soldier-fierillo" },
  { path: "/cards", name: "cards" },
  { path: "/artists", name: "artists" },
  { path: "/meetups", name: "meetups" },
  { path: "/mission/stack", name: "stack" },
];

async function takeScreenshots() {
  console.log("📸 Starting screenshot capture...\n");

  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      console.log(`\n📱 Viewport: ${viewportName} (${viewport.width}x${viewport.height})`);

      const page = await browser.newPage();
      await page.setViewport(viewport);

      for (const { path, name } of PAGES) {
        const url = `${BASE_URL}${path}`;
        const filename = `${name}-${viewportName}.png`;
        const filepath = join(OUTPUT_DIR, filename);

        try {
          console.log(`  📷 ${path}...`);
          await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

          // Wait a bit for animations to settle
          await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

          await page.screenshot({
            path: filepath,
            fullPage: false,
          });

          console.log(`     ✅ Saved: ${filename}`);
        } catch (err) {
          console.error(`     ❌ Failed: ${filename} - ${err}`);
        }
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`\n✅ Screenshots saved to: ${OUTPUT_DIR}`);
}

takeScreenshots().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
