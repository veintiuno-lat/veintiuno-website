// Store puppeteer's bundled Chromium inside node_modules so Vercel's build
// cache picks it up (Vercel caches node_modules but not ~/.cache by default).
// Without this, the puppeteer Chrome binary downloads to ~/.cache/puppeteer/
// which Vercel's build container does not always preserve between runs.
const { join } = require('path');
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};
