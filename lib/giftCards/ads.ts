/**
 * Google Ads: a gift card PURCHASE, with its dollar amount (11/24/2026).
 *
 * Why it exists: last year's holiday gift campaign could only record "Page view", so Google spent
 * the budget finding page loads. Cards are bought on this site now, so the real sale can be sent.
 *
 * "Gift Card Purchase" is a SECONDARY conversion action (like the RiNo ones, lib/clubAds.ts): the
 * account-default goals that Larimer's booking campaigns bid on never see it. Only the gift
 * campaign reports on it, through the custom goal "Gift Card Purchases".
 * Built by ~/spavia-agents/sway/gift_ads/01_conversion_action.py.
 *
 * Browser only, after Mindbody confirms the sale. Ad blockers stop this tag, so the number to
 * trust is the site's own ledger (lib/ops): a gift row with `extra.gclid` came from an ad click.
 */
export const GIFT_ADS_SEND_TO = "AW-17421817568/PN46CMuK5L4dEOCtr_NA";

/** Sent once per sale: `transactionId` (the location + Mindbody sale id) makes Google drop a repeat */
export function fireGiftAdsConversion(opts: { value: number; transactionId: string }): boolean {
  if (typeof window === "undefined") return false;
  if (!Number.isFinite(opts.value) || opts.value <= 0 || !opts.transactionId) return false;
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return false;
    gtag("event", "conversion", { send_to: GIFT_ADS_SEND_TO, value: opts.value, currency: "USD", transaction_id: opts.transactionId });
    return true;
  } catch {
    return false; // tracking never breaks a confirmation screen
  }
}

/** A Google click id as the browser stored it (lib/gclid.ts), or null if it doesn't look like one */
export const cleanClickId = (v: unknown): string | null => (typeof v === "string" && /^[A-Za-z0-9_-]{10,250}$/.test(v) ? v : null);
