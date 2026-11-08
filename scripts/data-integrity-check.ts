/**
 * Data Integrity Check Script
 *
 * Validates data files for common issues discovered in audit:
 * - URL format (must have https:// scheme, no relative URLs)
 * - Image path references (must exist in public folder)
 * - Data consistency (no duplicate IDs, valid country codes)
 * - Fallback handling (communities without images, soldiers without profiles)
 *
 * Run with: npx tsx scripts/data-integrity-check.ts
 */

import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { communities } from "../src/data/communities";
import { soldiers } from "../src/data/soldiers";
import { artists } from "../src/data/artists";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");

interface Issue {
  type: "error" | "warning";
  source: string;
  id: string;
  field: string;
  message: string;
  value?: string;
}

const issues: Issue[] = [];

function addIssue(
  type: "error" | "warning",
  source: string,
  id: string,
  field: string,
  message: string,
  value?: string
) {
  issues.push({ type, source, id, field, message, value });
}

// Valid ISO 3166-1 alpha-2 country codes (lowercase)
const VALID_COUNTRY_CODES = new Set([
  "ar", "bo", "br", "cl", "co", "cr", "cu", "do", "ec", "sv", "gt", "hn",
  "mx", "ni", "pa", "py", "pe", "pr", "uy", "ve", "us", "es", "de", "fr",
  "gb", "it", "pt", "nl", "be", "ch", "at", "au", "nz", "jp", "kr", "cn",
  "in", "sg", "hk", "tw", "th", "vn", "ph", "my", "id", "za", "ng", "ke",
  "eg", "ma", "ae", "sa", "il", "tr", "ru", "ua", "pl", "cz", "ro", "hu",
  "bg", "hr", "rs", "ba", "si", "sk", "lt", "lv", "ee", "fi", "se", "no",
  "dk", "ie", "is", "lu", "mt", "cy", "gr", "al", "mk", "me", "xk",
]);

// Check if URL has proper scheme
function isValidUrl(url: string): boolean {
  if (!url || url.trim() === "") return true; // empty is valid (means not provided)
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" || parsed.protocol === "mailto:";
  } catch {
    return false;
  }
}

// Check if a local image path exists
function imageExists(path: string): boolean {
  if (!path) return true; // undefined/empty is valid (means not provided)
  if (path.startsWith("http://") || path.startsWith("https://")) return true; // external URLs skip check
  const fullPath = join(PUBLIC_DIR, path);
  return existsSync(fullPath);
}

// Check for NIP-05 format (should use njump.me, not direct href)
function isValidNostrLink(value: string): boolean {
  if (!value) return true;
  // Valid: njump.me URLs, npub URLs
  if (value.startsWith("https://njump.me/") || value.startsWith("https://primal.net/")) return true;
  // Invalid: NIP-05 identifiers without resolver (e.g., "user@domain.com")
  if (value.includes("@") && !value.startsWith("http")) return false;
  // Invalid: nostr.com URLs (returns 404)
  if (value.includes("nostr.com/")) return false;
  return true;
}

console.log("🔍 Running data integrity checks...\n");

// === COMMUNITIES ===
console.log("📍 Checking communities...");
const communityIds = new Set<string>();

for (const community of communities) {
  // Check for duplicate IDs
  if (communityIds.has(community.id)) {
    addIssue("error", "communities", community.id, "id", "Duplicate community ID");
  }
  communityIds.add(community.id);

  // Check main link
  if (community.link && !isValidUrl(community.link)) {
    addIssue("error", "communities", community.id, "link", "Invalid URL format (missing scheme?)", community.link);
  }

  // Check social links
  const socialFields = ["linkTwitter", "linkEmail", "linkDiscord", "linkTelegram"] as const;
  for (const field of socialFields) {
    const value = community[field];
    if (value && !isValidUrl(field === "linkEmail" ? `mailto:${value}` : value)) {
      addIssue("error", "communities", community.id, field, "Invalid URL format", value);
    }
  }

  // Check image paths
  if (community.avatarImage && !imageExists(community.avatarImage)) {
    addIssue("error", "communities", community.id, "avatarImage", "Image file not found", community.avatarImage);
  }
  if (community.backgroundImage && !imageExists(community.backgroundImage)) {
    addIssue("error", "communities", community.id, "backgroundImage", "Image file not found", community.backgroundImage);
  }

  // Check coordinates
  if (community.latitude < -90 || community.latitude > 90) {
    addIssue("error", "communities", community.id, "latitude", "Invalid latitude", String(community.latitude));
  }
  if (community.longitude < -180 || community.longitude > 180) {
    addIssue("error", "communities", community.id, "longitude", "Invalid longitude", String(community.longitude));
  }

  // Warning for communities without images (intentional but should be tracked)
  if (!community.avatarImage) {
    addIssue("warning", "communities", community.id, "avatarImage", "No avatar image (using initials fallback)");
  }
  if (!community.backgroundImage) {
    addIssue("warning", "communities", community.id, "backgroundImage", "No background image (using gradient fallback)");
  }
}

// === SOLDIERS ===
console.log("⚔️ Checking soldiers...");
const soldierIds = new Set<string>();

for (const soldier of soldiers) {
  // Check for duplicate IDs
  if (soldierIds.has(soldier.id)) {
    addIssue("error", "soldiers", soldier.id, "id", "Duplicate soldier ID");
  }
  soldierIds.add(soldier.id);

  // Check profile image
  if (!imageExists(soldier.profileImage)) {
    addIssue("error", "soldiers", soldier.id, "profileImage", "Image file not found", soldier.profileImage);
  }

  // Check country code
  if (!VALID_COUNTRY_CODES.has(soldier.country.toLowerCase())) {
    addIssue("error", "soldiers", soldier.id, "country", "Invalid country code", soldier.country);
  }

  // Check social links
  if (soldier.socialLinks) {
    const { website, instagram, twitter, nostr, github } = soldier.socialLinks;

    if (website && !isValidUrl(website)) {
      addIssue("error", "soldiers", soldier.id, "socialLinks.website", "Invalid URL format", website);
    }
    if (instagram && !isValidUrl(instagram)) {
      addIssue("error", "soldiers", soldier.id, "socialLinks.instagram", "Invalid URL format", instagram);
    }
    if (twitter && !isValidUrl(twitter)) {
      addIssue("error", "soldiers", soldier.id, "socialLinks.twitter", "Invalid URL format", twitter);
    }
    if (github && !isValidUrl(github)) {
      addIssue("error", "soldiers", soldier.id, "socialLinks.github", "Invalid URL format", github);
    }

    // Special check for Nostr links
    if (nostr && !isValidNostrLink(nostr)) {
      addIssue("error", "soldiers", soldier.id, "socialLinks.nostr", "Invalid Nostr link (needs njump.me prefix for NIP-05)", nostr);
    }
  }

  // Warning for soldiers without bio
  if (!soldier.bio || soldier.bio.trim() === "") {
    addIssue("warning", "soldiers", soldier.id, "bio", "Empty bio (pending identity verification)");
  }
}

// === ARTISTS ===
console.log("🎨 Checking artists...");
const artistIds = new Set<string>();

for (const artist of artists) {
  // Check for duplicate IDs
  if (artistIds.has(artist.id)) {
    addIssue("error", "artists", artist.id, "id", "Duplicate artist ID");
  }
  artistIds.add(artist.id);

  // Check profile image
  if (!imageExists(artist.profileImage)) {
    addIssue("error", "artists", artist.id, "profileImage", "Image file not found", artist.profileImage);
  }

  // Check country code
  if (!VALID_COUNTRY_CODES.has(artist.country.toLowerCase())) {
    addIssue("error", "artists", artist.id, "country", "Invalid country code", artist.country);
  }

  // Check social links
  if (artist.socialLinks) {
    for (const [key, value] of Object.entries(artist.socialLinks)) {
      if (value && typeof value === "string") {
        if (key === "nostr") {
          if (!isValidNostrLink(value)) {
            addIssue("error", "artists", artist.id, `socialLinks.${key}`, "Invalid Nostr link", value);
          }
        } else if (!isValidUrl(value)) {
          addIssue("error", "artists", artist.id, `socialLinks.${key}`, "Invalid URL format", value);
        }
      }
    }
  }

  // Check community references
  for (const communityId of artist.communities) {
    if (!communityIds.has(communityId)) {
      addIssue("error", "artists", artist.id, "communities", "References non-existent community", communityId);
    }
  }
}

// === REPORT ===
console.log("\n" + "=".repeat(60));
console.log("📊 DATA INTEGRITY REPORT");
console.log("=".repeat(60));

const errors = issues.filter((i) => i.type === "error");
const warnings = issues.filter((i) => i.type === "warning");

console.log(`\n✅ Communities checked: ${communities.length}`);
console.log(`✅ Soldiers checked: ${soldiers.length}`);
console.log(`✅ Artists checked: ${artists.length}`);

if (errors.length > 0) {
  console.log(`\n❌ ERRORS (${errors.length}):`);
  for (const issue of errors) {
    console.log(`  [${issue.source}/${issue.id}] ${issue.field}: ${issue.message}`);
    if (issue.value) console.log(`    → Value: "${issue.value}"`);
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠️ WARNINGS (${warnings.length}):`);
  for (const issue of warnings) {
    console.log(`  [${issue.source}/${issue.id}] ${issue.field}: ${issue.message}`);
  }
}

if (errors.length === 0 && warnings.length === 0) {
  console.log("\n🎉 All checks passed! No issues found.");
}

console.log("\n" + "=".repeat(60));

// Exit with error code if there are errors
if (errors.length > 0) {
  console.log("\n💥 Data integrity check FAILED with errors.");
  process.exit(1);
} else {
  console.log("\n✅ Data integrity check PASSED.");
  process.exit(0);
}
