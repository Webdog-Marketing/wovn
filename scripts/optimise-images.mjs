// Usage: node scripts/optimise-images.mjs <folder-of-originals> <destination>
// Example: node scripts/optimise-images.mjs ~/Downloads/Edukid edukid
// Resizes to 2000px on the longest edge, compresses, and saves as 01.jpg, 02.jpg...
// in public/images/<destination>/. The first image becomes that folder's hero.
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { homedir } from "node:os";

const [inputArg, dest] = process.argv.slice(2);
if (!inputArg || !dest) {
  console.error("Usage: node scripts/optimise-images.mjs <folder-of-originals> <destination>");
  process.exit(1);
}

const input = resolve(inputArg.replace(/^~/, homedir()));
const outDir = join(process.cwd(), "public", "images", dest);
mkdirSync(outDir, { recursive: true });

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);
const files = readdirSync(input)
  .filter((f) => exts.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let i = 0;
for (const file of files) {
  i += 1;
  const name = String(i).padStart(2, "0") + ".jpg";
  await sharp(join(input, file))
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(outDir, name));
  console.log(`${file} -> ${dest}/${name}`);
}
console.log(`Done: ${i} image(s) written to public/images/${dest}/`);
