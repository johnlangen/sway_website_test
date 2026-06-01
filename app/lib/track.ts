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
    // Both fields optional to align with existing declaration in
    // app/themavenhotel/page.tsx — TypeScript merges global declarations
    // only when signatures match exactly (optional-ness included).
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
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
// Google Ads "Gift Card Intent" conversion action.
// Created via API on 2026-06-01 (ConversionActionService → id 7632175659).
// Default value $100 (rough avg GC amount). value param overrides if provided.
const GIFT_CARD_INTENT_SEND_TO = "AW-17421817568/vUdvCKuEp7ccEOCtr_NA";

export function trackGiftCardIntent(source: string, valueHint?: number) {
  if (typeof window === "undefined") return;
  try {
    // 1) Push to dataLayer for GTM → GA4 / Meta / TikTok / future tags
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gift_card_intent",
      gift_card_source: source,
      ...(valueHint ? { value: valueHint, currency: "USD" } : {}),
    });

    // 2) Fire Google Ads conversion directly (no GTM config required).
    // Global gtag config for AW-17421817568 is loaded in app/layout.tsx.
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
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
