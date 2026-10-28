/**
 * The Sway locations that sell gift cards on the site (native checkout, ported from the Spavia site's
 * gift checkout 10/28: "implement gift card purchase pages like spavia does").
 *
 * Each location is its own Mindbody site; a gift card is issued by, and recorded at, the site it's
 * bought from. All three sell the same Mindbody gift cards (verified 10/28 via /sale/giftcards):
 * 100030 "Gift Card (Custom Amount)" (any amount, the one every button sells) plus fixed $100 /
 * $150 / $200 / $300 cards. Sold at the location itself (LocationId 1), never the Online Store
 * (98): at 98 Mindbody leaves the new card's barcode out of its answer (Spavia 10/26).
 */
import { CLUB_LOCATIONS } from "@/lib/clubLocations";

export type GiftSite = {
  slug: "denver-larimer" | "denver-rino" | "denver-central-park";
  /** "Sway Larimer" */
  name: string;
  siteId: string;
  locationId: number;
  phone: string;
  /** One line, for emails and the printable card */
  address: string;
  /** Reply-to on gift emails, and who guests write to */
  contactEmail: string;
  timezone: string;
  /** Mindbody's own gift card store for this site (the fallback, and where a paused checkout sends guests) */
  mindbodyUrl: string;
};

const store = (siteId: string) => `https://clients.mindbodyonline.com/classic/ws?studioid=${siteId}&stype=42`;

export function giftSites(): GiftSite[] {
  const larimer = process.env.MINDBODY_SITE_ID || "5739770";
  const rino = CLUB_LOCATIONS["denver-rino"];
  const cp = CLUB_LOCATIONS["denver-central-park"];
  return [
    {
      slug: "denver-larimer",
      name: "Sway Larimer",
      siteId: larimer,
      locationId: 1,
      phone: "(303) 476-6150",
      address: "1428 Larimer St., Denver, CO 80202",
      contactEmail: "contact@swaywellnessspa.com",
      timezone: "America/Denver",
      mindbodyUrl: store(larimer),
    },
    {
      slug: "denver-rino",
      name: "Sway RiNo",
      siteId: rino.siteId,
      locationId: rino.locationId,
      phone: rino.phone,
      address: "3636 Blake St., Denver, CO 80205",
      contactEmail: rino.contactEmail,
      timezone: "America/Denver",
      mindbodyUrl: store(rino.siteId),
    },
    {
      slug: "denver-central-park",
      name: "Sway Central Park",
      siteId: cp.siteId,
      locationId: cp.locationId,
      phone: cp.phone,
      address: "2271 Clinton St., Aurora, CO 80010",
      contactEmail: cp.contactEmail,
      timezone: "America/Denver",
      mindbodyUrl: store(cp.siteId),
    },
  ];
}

export function giftSite(slug: unknown): GiftSite | null {
  return giftSites().find((s) => s.slug === slug) ?? null;
}

export const giftCheckoutPath = (slug: string) => `/locations/${slug}/gift-cards/checkout/`;
export const giftPagePath = (slug: string) => `/locations/${slug}/gift-cards/`;
export const bookPath = (slug: string) => `/locations/${slug}/book/`;

/** Where gift emails link to. The live site, except a preview build that sets PUBLIC_SITE_ORIGIN. */
export function publicOrigin(): string {
  const o = process.env.PUBLIC_SITE_ORIGIN;
  return o && /^https:\/\/[a-z0-9.-]+$/i.test(o) ? o : "https://swaywellnessspa.com";
}

/**
 * The native checkout is on unless GIFT_CHECKOUT=off in Vercel (kill switch: no new purchases, the
 * page points to the location's Mindbody store; gift links keep working).
 */
export const giftCheckoutOn = () => process.env.GIFT_CHECKOUT !== "off";
