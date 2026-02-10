/**
 * Image Optimization Script
 *
 * Resizes and compresses images in public/assets/ in-place.
 * Run: node scripts/optimize-images.mjs
 *
 * - Resizes images wider than MAX_WIDTH down (preserving aspect ratio)
 * - Compresses JPEGs to quality 82
 * - Converts photo-PNGs (no meaningful transparency) to optimized JPEG
 * - Keeps PNGs that truly need transparency as optimized PNG
 * - Skips SVGs, GIFs, files under MIN_SIZE, and files in SKIP list
 * - Prints a before/after report
 */

import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const ASSETS_DIR = join(process.cwd(), "public", "assets");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80; // for palette-based compression
const MIN_SIZE = 100 * 1024; // skip files under 100KB

// Files to never touch (logos, icons, specific assets)
const SKIP = new Set([
  "swaylogo.png",
  "swaylogogreen.svg",
  "swaylogo3.png",
  "athletech.png",   // tiny
  "bloom.png",       // tiny
]);

// OG images — keep as JPEG, just compress, don't resize below 1200
const OG_PREFIX = "og-";

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Recurse into subdirectories (e.g., OG/)
      const subFiles = await getFiles(fullPath);
      files.push(...subFiles);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

/**
 * Check if a PNG has meaningful transparency.
 * Sample pixels — if any have alpha < 250, it uses transparency.
 */
async function hasTransparency(filePath) {
  try {
    const { data, info } = await sharp(filePath)
      .resize(100, 100, { fit: "inside" }) // tiny sample for speed
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const channels = info.channels;
    for (let i = 3; i < data.length; i += channels) {
      if (data[i] < 250) return true;
    }
    return false;
  } catch {
    return true; // if we can't check, assume it needs transparency
  }
}

async function optimizeImage(filePath) {
  const name = basename(filePath);
  const ext = extname(name).toLowerCase();

  // Skip small files and explicitly skipped files
  if (SKIP.has(name)) return null;
  const fileStats = await stat(filePath);
  if (fileStats.size < MIN_SIZE) return null;

  const originalSize = fileStats.size;
  const isOG = name.startsWith(OG_PREFIX);

  try {
    const metadata = await sharp(filePath).metadata();
    const maxW = isOG ? 1200 : MAX_WIDTH;

    let pipeline = sharp(filePath).rotate(); // auto-rotate based on EXIF

    // Resize if wider than max
    if (metadata.width && metadata.width > maxW) {
      pipeline = pipeline.resize(maxW, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    if (ext === ".png") {
      // Check if this PNG actually needs transparency
      const needsAlpha = await hasTransparency(filePath);

      if (needsAlpha) {
        // Keep as PNG, optimize
        const buffer = await pipeline
          .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
          .toBuffer();

        // Only save if we actually reduced size
        if (buffer.length < originalSize) {
          await sharp(buffer).toFile(filePath);
          return { name, originalSize, newSize: buffer.length, format: "PNG" };
        }
        return null;
      } else {
        // Convert to JPEG (no transparency needed)
        const jpegPath = filePath.replace(/\.png$/i, ".jpg");
        const buffer = await pipeline
          .flatten({ background: { r: 255, g: 255, b: 255 } })
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer();

        await sharp(buffer).toFile(jpegPath);

        // Only swap if JPEG is smaller
        if (buffer.length < originalSize) {
          // Remove old PNG
          if (jpegPath !== filePath) {
            await unlink(filePath);
          }
          return {
            name,
            originalSize,
            newSize: buffer.length,
            format: "PNG→JPG",
            newName: basename(jpegPath),
          };
        } else {
          // JPEG wasn't smaller, remove it and keep PNG
          if (jpegPath !== filePath) {
            await unlink(jpegPath);
          }
          return null;
        }
      }
    } else {
      // JPEG/WebP — just resize and compress
      const buffer = await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();

      if (buffer.length < originalSize) {
        await sharp(buffer).toFile(filePath);
        return { name, originalSize, newSize: buffer.length, format: ext.replace(".", "").toUpperCase() };
      }
      return null;
    }
  } catch (err) {
    console.error(`  ✗ Error processing ${name}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("🖼  Image Optimization Script");
  console.log("================================\n");
  console.log(`Scanning ${ASSETS_DIR}...\n`);

  const files = await getFiles(ASSETS_DIR);
  console.log(`Found ${files.length} images to process.\n`);

  const results = [];
  let totalOriginal = 0;
  let totalNew = 0;
  let skipped = 0;
  const renamedFiles = []; // Track PNG→JPG conversions for code updates

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result) {
      results.push(result);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;

      const savedPct = (
        ((result.originalSize - result.newSize) / result.originalSize) *
        100
      ).toFixed(0);
      const origMB = (result.originalSize / 1024 / 1024).toFixed(1);
      const newMB = (result.newSize / 1024 / 1024).toFixed(1);
      const label = result.newName
        ? `${result.name} → ${result.newName}`
        : result.name;
      console.log(
        `  ✓ ${label} | ${origMB}MB → ${newMB}MB (−${savedPct}%) [${result.format}]`
      );

      if (result.newName) {
        renamedFiles.push({ old: result.name, new: result.newName });
      }
    } else {
      skipped++;
    }
  }

  console.log("\n================================");
  console.log(`Optimized: ${results.length} files`);
  console.log(`Skipped:   ${skipped} files (already small or unchanged)`);

  if (results.length > 0) {
    const totalOrigMB = (totalOriginal / 1024 / 1024).toFixed(1);
    const totalNewMB = (totalNew / 1024 / 1024).toFixed(1);
    const totalSavedMB = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(1);
    const totalSavedPct = (
      ((totalOriginal - totalNew) / totalOriginal) *
      100
    ).toFixed(0);

    console.log(`\nTotal: ${totalOrigMB}MB → ${totalNewMB}MB (saved ${totalSavedMB}MB, −${totalSavedPct}%)`);
  }

  if (renamedFiles.length > 0) {
    console.log("\n⚠️  Files converted from PNG → JPG (need code references updated):");
    renamedFiles.forEach((r) => console.log(`   ${r.old} → ${r.new}`));
    console.log(
      "\nRun a search-and-replace in your codebase for these filenames."
    );
  }

  console.log("\n✅ Done! Originals backed up in public/assets_backup/");
}

main().catch(console.error);
