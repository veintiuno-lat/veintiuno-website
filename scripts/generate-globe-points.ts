/**
 * One-shot: samples a Fibonacci sphere, keeps points on land, writes
 * public/geo/land-points.json as a flat [lat, lng, lat, lng, ...] array.
 * Run: pnpm tsx scripts/generate-globe-points.ts (output is committed).
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";
import type { Topology, GeometryCollection } from "topojson-specification";

const require = createRequire(import.meta.url);
const world = require("world-atlas/land-110m.json") as Topology;
const land = feature(world, world.objects.land as GeometryCollection);

const N = 26000; // sphere samples → ~7.5k land dots
const golden = Math.PI * (3 - Math.sqrt(5));
const out: number[] = [];

for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2;
  const theta = golden * i;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lng = ((((theta * 180) / Math.PI) % 360) + 540) % 360 - 180;
  if (lat < -60) continue; // skip Antarctica: keeps the focus on the inhabited world
  if (geoContains(land, [lng, lat])) out.push(+lat.toFixed(2), +lng.toFixed(2));
}

writeFileSync("public/geo/land-points.json", JSON.stringify(out));
console.log(`land points: ${out.length / 2}`);
