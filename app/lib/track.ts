/**
 * Sway tracking helpers.
 *
 * Centralized so we don't have to find/replace `gtag` calls across the codebase
 * when conversion labels change.
 *
 * Pattern: push to `dataLayer` for GTM (which then fires whatever tags GTM has
 * configured: GA4, Google Ads, Meta, TikTok, etc) AND fire gtag directly for
 * Google Ads conversion (works without GTM tag configuration).
 *
 * Types: `window.dataLayer` is declared globally in /global.d.ts as
 * `Record<string, any>[]`. `window.gtag` is loaded by external gtag.js
 * script (loaded in app/layout.tsx) and accessed via runtime check rather
 * than re-declaring globally — avoids type-merge conflicts with other
 * files that declare it locally (e.g. themavenhotel/page.tsx).
 */

// Google Ads "Gift Card Intent" conversion action.
// Created via API on 2026-06-01 (ConversionActionService → id 7632175659).
// Default value $100 (rough avg GC amount). value param overrides if provided.
const GIFT_CARD_INTENT_SEND_TO = "AW-17421817568/vUdvCKuEp7ccEOCtr_NA";

/**
 * Fire when a user clicks the "Buy Gift Card" button. The actual purchase
 * happens on Mindbody's hosted store (offsite), so we can only track
 * INTENT (the click), not the completed purchase.
 *
 * @param source  Where the click originated, e.g. "larimer_gc_page",
 *                "fathers_day_gc_page", "popup_holiday_2025"
 * @param valueHint  Optional dollar amount the user appears to be selecting
 *                   (e.g. if you have preset GC amounts on the page)
 */
export function trackGiftCardIntent(source: string, valueHint?: number) {
  if (typeof window === "undefined") return;
  try {
    // 1) Push to dataLayer for GTM → GA4 / Meta / TikTok / future tags.
    // dataLayer is globally typed as Record<string, any>[] in global.d.ts.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gift_card_intent",
      gift_card_source: source,
      ...(valueHint ? { value: valueHint, currency: "USD" } : {}),
    });

    // 2) Fire Google Ads conversion directly (no GTM config required).
    // Global gtag config for AW-17421817568 is loaded in app/layout.tsx.
    // Use (window as any) to avoid global Window type conflicts.
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", "conversion", {
        send_to: GIFT_CARD_INTENT_SEND_TO,
        value: valueHint || 100,
        currency: "USD",
        transaction_id: "", // optional, dedupe if you have one
      });
    }
  } catch {
    // Swallow — tracking failure must never break the user flow.
  }
}
