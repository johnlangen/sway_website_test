/**
 * Sway's gift card designs (scripts/gift-artwork/build.py → artwork-library.json + public/gift-cards/art/).
 * Every location offers the same designs. File names carry a content hash and are never reused, so
 * an issued gift (including one scheduled weeks out) always shows the artwork the buyer picked.
 */
import library from "./artwork-library.json";
import { publicOrigin } from "./sites";
import { holidaySeason } from "./season";

export type GiftDesign = {
  id: number;
  name: string;
  occasions: string[];
  /** Site-relative: /gift-cards/art/<file> */
  image: string;
  thumbnail: string;
  printImage: string;
};

export const ART_PATH = "/gift-cards/art/";

const files = new Set<string>([
  ...library.designs.flatMap((d) => [d.image, d.thumbnail, d.printImage]),
  ...(library.archivedFiles as string[]),
]);

export function giftDesigns(): GiftDesign[] {
  // In the holiday season the holiday designs come first (the checkout opens on the first design)
  const designs = holidaySeason()
    ? [...library.designs].sort((a, b) => Number(b.occasions.includes("Holiday")) - Number(a.occasions.includes("Holiday")))
    : library.designs;
  return designs.map((d) => ({
    id: d.id,
    name: d.name,
    occasions: [...d.occasions],
    image: ART_PATH + d.image,
    thumbnail: ART_PATH + d.thumbnail,
    printImage: ART_PATH + d.printImage,
  }));
}

/** The library file behind a site-relative or absolute artwork address, or undefined */
export function artworkFile(value: string): string | undefined {
  try {
    const u = new URL(value, publicOrigin());
    if (u.search || u.hash || !u.pathname.startsWith(ART_PATH)) return;
    const file = u.pathname.slice(ART_PATH.length);
    return files.has(file) ? file : undefined;
  } catch {
    return;
  }
}

export const absoluteArtwork = (value: string) => (artworkFile(value) ? new URL(value, publicOrigin()).href : value);
