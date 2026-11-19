/**
 * Google Ads conversions for the club locations (RiNo first, 11/19/2026).
 *
 * Each club has its own conversion actions (lib/clubLocations.ts `adsConversions`). They are
 * secondary actions that only that club's campaigns bid on, through a custom goal, so a club
 * booking never lands in Larimer's "ALL Purchases" (that mix-up is why the club flows fired no
 * Ads conversions from 11/2 to 11/19). A club with no label set fires nothing.
 *
 * Browser only, after Mindbody confirms. The same booking is also in the first-party ledger
 * (lib/ops, written by the API route), which is the number to trust when the two disagree.
 */
import { getClubBySiteId, type ClubLocation } from "@/lib/clubLocations";

export type ClubAdsKind = "service" | "lounge" | "membership";

export function fireClubAdsConversion(
  club: ClubLocation | null | undefined,
  kind: ClubAdsKind,
  opts: { value: number; transactionId: string }
): boolean {
  if (typeof window === "undefined") return false;
  const sendTo = club?.adsConversions?.[kind];
  if (!sendTo) return false;
  try {
    const gtag = (window as any).gtag;
    if (typeof gtag !== "function") return false;
    gtag("event", "conversion", {
      send_to: sendTo,
      value: opts.value,
      currency: "USD",
      transaction_id: opts.transactionId,
    });
    return true;
  } catch {
    return false; // tracking never breaks a confirmation screen
  }
}

/** Same, for callers that only know the Mindbody SiteId (the membership join flow). */
export function fireClubAdsConversionBySite(
  siteId: string | null | undefined,
  kind: ClubAdsKind,
  opts: { value: number; transactionId: string }
): boolean {
  return siteId ? fireClubAdsConversion(getClubBySiteId(siteId), kind, opts) : false;
}
