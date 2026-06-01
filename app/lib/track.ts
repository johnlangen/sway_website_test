/**
 * Sway tracking helpers.
 *
 * Centralized so we don't have to find/replace `gtag` calls across the codebase
 * when conversion labels change.
 *
 * Pattern: push to `dataLayer` for GTM (which then fires whatever tags GTM has
 * configured: GA4, Google Ads, Meta, TikTok, etc). This lets us add/remove
 * downstream tags without code changes.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Fire when a user clicks the "Buy Gift Card" button. The actual purchase
 * happens on Mindbody's hosted store (offsite), so we can only track
 * INTENT (the click), not the completed purchase.
 *
 * GTM is responsible for fanning this event out to:
 *  - GA4 (as `gift_card_intent` event)
 *  - Google Ads (as conversion action — needs to be wired in GTM/Ads)
 *  - Meta/TikTok pixels when those are installed
 *
 * @param source  Where the click originated, e.g. "larimer_gc_page",
 *                "fathers_day_gc_page", "popup_holiday_2025"
 * @param valueHint  Optional dollar amount the user appears to be selecting
 *                   (e.g. if you have preset GC amounts on the page)
 */
export function trackGiftCardIntent(source: string, valueHint?: number) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gift_card_intent",
      gift_card_source: source,
      ...(valueHint ? { value: valueHint, currency: "USD" } : {}),
    });
  } catch {
    // Swallow — tracking failure must never break the user flow.
  }
}
