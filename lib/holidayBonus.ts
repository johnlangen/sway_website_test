/**
 * Holiday gift card bonus, 2026: the same offer the Spavia spas run (John 11/24/2026: "keep the
 * same as spavia and in person. 200+ free 30 minute massage or facial"; the team trained the desk
 * and printed the bonus cards on it). A single gift card of $200 or more bought Nov 26 to Dec 25
 * comes with one free 30-minute express facial or massage, usable Jan 1 to Apr 30, 2027, only at
 * the location that sold the card.
 *
 * On and off BY DATE in the location's own time zone: no deploy needed on Nov 26 or Dec 26.
 * Ported from the Spavia site's src/lib/holiday-bonus.ts. Safe to import in the browser.
 *
 * To end early or drop a location: remove its slug from HOLIDAY_BONUS_LOCATIONS and deploy.
 */
import { giftDate } from "@/lib/giftCards/schedule";

export const HOLIDAY_BONUS = {
  minValue: 200,
  /** First and last sale day, in the location's own time zone */
  start: "2026-11-26",
  end: "2026-12-25",
  saleWindowLabel: "Nov 26 to Dec 25",
  /** The bonus can be used from Jan 1 (keeps free treatments out of December) through Apr 30 */
  validFrom: "2027-01-01",
  validFromLabel: "January 1, 2027",
  expires: "2027-04-30",
  expiresLabel: "April 30, 2027",
  windowLabel: "January 1 to April 30, 2027",
  treatment: "30-minute express facial or massage",
  campaign: "holiday-2026",
} as const;

/** "All 3" (the team, 11/24/2026). Central Park's massage and facials open in December. */
export const HOLIDAY_BONUS_LOCATIONS: ReadonlySet<string> = new Set(["denver-larimer", "denver-rino", "denver-central-park"]);

export const qualifiesForBonus = (value: number) => Number.isFinite(value) && value >= HOLIDAY_BONUS.minValue;

/** The offer is on at this location today */
export function holidayBonusOpen(slug: string, timeZone: string, now = new Date()) {
  const day = giftDate(timeZone, now);
  return HOLIDAY_BONUS_LOCATIONS.has(slug) && day >= HOLIDAY_BONUS.start && day <= HOLIDAY_BONUS.end;
}

/** On at ANY location today (for pages that aren't one location's: the holiday page, the gift card hub) */
export function holidayBonusOn(now = new Date()) {
  return [...HOLIDAY_BONUS_LOCATIONS].some((slug) => holidayBonusOpen(slug, "America/Denver", now));
}

/** The one line every bonus touchpoint carries */
export const bonusWhereLine = (spaName: string) =>
  `The free ${HOLIDAY_BONUS.treatment} is redeemable only at ${spaName}, ${HOLIDAY_BONUS.windowLabel}. Your gift card works at any Sway or Spavia spa.`;

/** The bonus terms (the Spavia terms John approved 11/23, with Sway's names) */
export const bonusTerms = (spaName: string) =>
  [
    `One complimentary ${HOLIDAY_BONUS.treatment} comes with each single gift card of $${HOLIDAY_BONUS.minValue} or more purchased on swaywellnessspa.com from November 26 through December 25, 2026, at Sway Larimer, Sway RiNo and Sway Central Park.`,
    `The bonus is redeemable only at ${spaName}, the location that sold the gift card. The gift card itself can be used at any Sway or Spavia spa in the United States.`,
    `The bonus can be used from ${HOLIDAY_BONUS.validFromLabel} and must be used by ${HOLIDAY_BONUS.expiresLabel}. The guest chooses facial or massage when booking; an appointment is required and is subject to availability.`,
    `The bonus has no cash value, cannot be added to a gift card balance, and is void if the gift card purchase is cancelled. Two cards under $${HOLIDAY_BONUS.minValue} do not combine to qualify.`,
    `The bonus treatment can't be combined with other offers, including first-visit offers.`,
  ].join(" ");

// No look-alike characters (0/O, 1/I/L, 2/Z, 5/S, 8/B) so the desk can read it aloud.
const ALPHABET = "ACDEFGHJKMNPQRTUVWXY34679";

/** e.g. "HX7K-QD4M" */
export function makeBonusCode(): string {
  const chars: string[] = [];
  const bytes = new Uint8Array(16);
  while (chars.length < 8) {
    globalThis.crypto.getRandomValues(bytes);
    // 250 = 10 x 25: dropping 250-255 keeps every character equally likely
    for (const b of bytes) if (b < 250 && chars.length < 8) chars.push(ALPHABET[b % ALPHABET.length]);
  }
  return `${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}
