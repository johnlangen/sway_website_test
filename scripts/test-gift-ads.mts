// Gift card purchase -> Google Ads (lib/giftCards/ads.ts). Run: npx tsx scripts/test-gift-ads.mts
import assert from "node:assert/strict";
import { GIFT_ADS_SEND_TO, cleanClickId, fireGiftAdsConversion } from "../lib/giftCards/ads";

let n = 0;
const ok = (name: string, fn: () => void) => { fn(); n++; console.log("ok ", name); };

ok("the purchase is sent once shaped the way Google Ads expects: action, dollars, sale id", () => {
  const calls: unknown[][] = [];
  (globalThis as unknown as { window: unknown }).window = { gtag: (...a: unknown[]) => calls.push(a) };
  assert.equal(fireGiftAdsConversion({ value: 250, transactionId: "gift-denver-larimer-100575999" }), true);
  assert.deepEqual(calls, [["event", "conversion", { send_to: GIFT_ADS_SEND_TO, value: 250, currency: "USD", transaction_id: "gift-denver-larimer-100575999" }]]);
  assert.match(GIFT_ADS_SEND_TO, /^AW-17421817568\/[A-Za-z0-9_-]+$/);
  // Larimer's booking labels must never be reused for gifts
  for (const larimer of ["T3o8CK-LoukbEOCtr_NA", "ZY8ECK7B0P0bEOCtr_NA", "ArEMCLWJ0P0bEOCtr_NA", "NB15CLC60P0bEOCtr_NA"]) assert.ok(!GIFT_ADS_SEND_TO.includes(larimer));
});

ok("nothing is sent for a $0 sale, a missing sale id, or when the tag is blocked; it never throws", () => {
  const calls: unknown[][] = [];
  (globalThis as unknown as { window: unknown }).window = { gtag: (...a: unknown[]) => calls.push(a) };
  assert.equal(fireGiftAdsConversion({ value: 0, transactionId: "x" }), false);
  assert.equal(fireGiftAdsConversion({ value: NaN, transactionId: "x" }), false);
  assert.equal(fireGiftAdsConversion({ value: 100, transactionId: "" }), false);
  assert.equal(calls.length, 0);
  (globalThis as unknown as { window: unknown }).window = {}; // an ad blocker removed gtag
  assert.equal(fireGiftAdsConversion({ value: 100, transactionId: "x" }), false);
  (globalThis as unknown as { window: unknown }).window = { gtag: () => { throw new Error("boom"); } };
  assert.equal(fireGiftAdsConversion({ value: 100, transactionId: "x" }), false);
});

ok("only something shaped like a click id is kept with the order", () => {
  assert.equal(cleanClickId("Cj0KCQiA_abc-DEF123456789"), "Cj0KCQiA_abc-DEF123456789");
  for (const bad of [null, undefined, "", "short", 12345, "has spaces in it here", "<script>alert(1)</script>", "a".repeat(300)]) assert.equal(cleanClickId(bad), null);
});

console.log(`\n${n} checks passed`);
