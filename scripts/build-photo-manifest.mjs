// Scans public/images/<folder>/ and writes content/photo-manifest.json so pages
// can find photos at build time without touching the filesystem at runtime.
// Runs automatically before `npm run dev` and `npm run build`.
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";

const root = join(process.cwd(), "public", "images");
const out = join(process.cwd(), "content", "photo-manifest.json");
const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const manifest = {};

if (existsSync(root)) {
  for (const folder of readdirSync(root)) {
    const dir = join(root, folder);
    if (!statSync(dir).isDirectory()) continue;
    const files = readdirSync(dir)
      .filter((f) => exts.has(extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (files.length) manifest[folder] = files.map((f) => `/images/${folder}/${f}`);
  }
}

mkdirSync(join(process.cwd(), "content"), { recursive: true });
writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Photo manifest: ${Object.keys(manifest).length} folder(s)`);
