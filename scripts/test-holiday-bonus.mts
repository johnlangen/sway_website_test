// Holiday gift card bonus (lib/holidayBonus.ts, lib/giftCards/bonus.ts). Run: npx tsx scripts/test-holiday-bonus.mts
import assert from "node:assert/strict";
import { HOLIDAY_BONUS, bonusTerms, holidayBonusOpen, makeBonusCode, qualifiesForBonus } from "../lib/holidayBonus";
import { bonusCodes, giftBonusFor, issueBonusCode } from "../lib/giftCards/bonus";
import { giftEmail, holidayBonusEmail, receiptEmail, withBonusLine } from "../lib/giftCards/emails";
import { giftStore } from "../lib/giftCards/store";
import type { GiftDetails } from "../lib/giftCards/catalog";

let n = 0;
const ok = async (name: string, fn: () => void | Promise<void>) => { await fn(); n++; console.log("ok ", name); };
const MT = "America/Denver";
const larimer = { slug: "denver-larimer", name: "Sway Larimer", siteId: "5739770", locationId: 1, timezone: MT } as const;
const gift = (over: Partial<GiftDetails> = {}): GiftDetails => ({
  productId: 100030, amount: 200, designId: 273, recipient: "Anna", recipientEmail: "anna@example.com", sender: "Sam",
  title: "A moment just for you", message: "", deliveryDate: "2026-12-01", payment: "new", ...over,
});
const at = (iso: string) => new Date(iso);

await ok("on by date in Mountain time: Nov 26 through Dec 25, at the three locations only", () => {
  assert.equal(holidayBonusOpen("denver-larimer", MT, at("2026-11-26T06:59:00Z")), false); // 11:59 pm Nov 25
  assert.equal(holidayBonusOpen("denver-larimer", MT, at("2026-11-26T07:00:00Z")), true); // midnight Nov 26
  assert.equal(holidayBonusOpen("denver-rino", MT, at("2026-12-10T18:00:00Z")), true);
  assert.equal(holidayBonusOpen("denver-central-park", MT, at("2026-12-26T06:59:00Z")), true); // 11:59 pm Dec 25
  assert.equal(holidayBonusOpen("denver-central-park", MT, at("2026-12-26T07:00:00Z")), false);
  assert.equal(holidayBonusOpen("union-market", MT, at("2026-12-10T18:00:00Z")), false);
  assert.equal(holidayBonusOpen("denver-larimer", MT, at("2026-11-24T18:00:00Z")), false); // today
});

await ok("$200 or more qualifies; $199.99 does not", () => {
  assert.equal(qualifiesForBonus(200), true);
  assert.equal(qualifiesForBonus(199.99), false);
  assert.equal(qualifiesForBonus(NaN), false);
});

await ok("a qualifying purchase carries a bonus: to the gift's recipient by default, to the buyer if kept", () => {
  const now = at("2026-12-01T18:00:00Z");
  assert.equal(giftBonusFor(larimer, gift({ amount: 150 }), 150, "sam@example.com", now), undefined);
  assert.equal(giftBonusFor(larimer, gift(), 200, "sam@example.com", at("2026-11-24T18:00:00Z")), undefined); // before it starts
  assert.equal(giftBonusFor({ slug: "union-market", timezone: MT }, gift(), 200, "sam@example.com", now), undefined);
  assert.deepEqual(giftBonusFor(larimer, gift(), 200, "sam@example.com", now), { who: "recipient", name: "Anna", email: "anna@example.com", date: "2026-12-01" });
  assert.deepEqual(giftBonusFor(larimer, gift({ bonus: "self" }), 200, " Sam@Example.com ", now), { who: "self", name: "Sam", email: "sam@example.com", date: "2026-12-01" });
  const later = giftBonusFor(larimer, gift({ deliveryDate: "2026-12-24" }), 200, "sam@example.com", now)!;
  assert.equal(later.scheduledAt, "2026-12-24T16:00:00.000Z"); // 9 a.m. Mountain, with the gift
  // A card Mindbody sells below its value doesn't qualify on value alone
  assert.equal(giftBonusFor(larimer, gift({ amount: 150 }), 200, "sam@example.com", now), undefined);
});

await ok("bonus codes are readable at the desk", () => {
  for (let i = 0; i < 200; i++) assert.match(makeBonusCode(), /^[ACDEFGHJKMNPQRTUVWXY34679]{4}-[ACDEFGHJKMNPQRTUVWXY34679]{4}$/);
});

await ok("one code per gift card, however many times it is issued; usable Jan 1 to Apr 30, 2027", async () => {
  const store = giftStore();
  const bonus = giftBonusFor(larimer, gift(), 250, "sam@example.com", at("2026-12-01T18:00:00Z"))!;
  const input = { site: larimer, saleId: 9001, barcode: "175746437675", value: 250, buyerName: "Sam", buyerEmail: "sam@example.com", bonus, purchasedAt: at("2026-12-01T18:00:00Z") };
  const first = await issueBonusCode(store, input);
  const again = await issueBonusCode(store, input);
  assert.equal(first.created, true);
  assert.deepEqual(again, { code: first.code, created: false });
  const other = await issueBonusCode(store, { ...input, saleId: 9002, barcode: "175746437676" });
  assert.notEqual(other.code, first.code);
  // The same barcode at another Mindbody site is a different card
  const rino = await issueBonusCode(store, { ...input, site: { ...larimer, slug: "denver-rino", name: "Sway RiNo", siteId: "5754020" } });
  assert.notEqual(rino.code, first.code);
  const all = await bonusCodes(store);
  assert.equal(all.length, 3);
  const rec = all.find((r) => r.code === first.code)!;
  assert.equal(rec.status, "active");
  assert.equal(rec.amount, "250.00");
  assert.equal(rec.recipient_email, "anna@example.com");
  assert.equal(rec.active_from, "2027-01-01T07:00:00Z"); // midnight Jan 1, Mountain
  assert.equal(rec.expires_at, "2027-05-01T05:59:59Z"); // end of Apr 30, Mountain daylight time
  assert.equal(rec.campaign, HOLIDAY_BONUS.campaign);
});

await ok("the emails say what the bonus is, where and when, and carry the code", () => {
  const spa = { name: "Sway Larimer", address: "1428 Larimer St., Denver, CO 80202", phone: "(303) 476-6150", pageUrl: "https://swaywellnessspa.com/locations/denver-larimer/", bookUrl: "https://swaywellnessspa.com/locations/denver-larimer/book/", contactEmail: "contact@swaywellnessspa.com" };
  const mail = holidayBonusEmail({ spa, recipientName: "Anna", senderName: "Sam", code: "HX7K-QD4M", logoUrl: "https://swaywellnessspa.com/gift-cards/sway-logo-white.png" });
  assert.equal(mail.subject, "Sam sent you a free 30-minute express facial or massage");
  for (const body of [mail.html, mail.text]) {
    assert.ok(body.includes("HX7K-QD4M"));
    assert.ok(body.includes("January 1 to April 30, 2027"));
    assert.ok(body.includes("Sway Larimer"));
    assert.ok(body.includes("purchased on swaywellnessspa.com from November 26 through December 25, 2026"));
    assert.ok(!body.includes("—"), "no em dashes");
  }
  assert.equal(holidayBonusEmail({ spa, recipientName: "Sam", code: "HX7K-QD4M", logoUrl: "x" }).subject, "Your free 30-minute express facial or massage at Sway Larimer");

  const base = { spa, title: "A moment just for you", recipientName: "Anna", senderName: "Sam", message: "", value: 250, code: "175746437675", artworkUrl: "https://x/a.jpg", giftUrl: "https://x/#gift=1", logoUrl: "https://x/l.png" };
  const g = giftEmail(base);
  const gWith = withBonusLine(g, "gift", "Sway Larimer", "Your bonus code arrives in a separate email.");
  assert.ok(gWith.html.length > g.html.length && gWith.html.includes("Holiday bonus included"), "the block lands in the gift email");
  assert.ok(gWith.html.indexOf("Holiday bonus included") < gWith.html.indexOf("How to use it"));
  const r = receiptEmail({ ...base, recipientEmail: "anna@example.com", buyerName: "Sam", amountPaid: 250, cardLabel: "card ending in 4242", saleId: 9001, purchasedOn: "December 1, 2026", deliveryLabel: "Right after purchase", scheduled: false });
  const rWith = withBonusLine(r, "receipt", "Sway Larimer", "We'll email the bonus code to Anna (anna@example.com) right away.");
  assert.ok(rWith.html.length > r.html.length && rWith.html.includes("Holiday bonus included"), "the block lands in the receipt");
  assert.ok(rWith.text.includes("redeemable only at Sway Larimer"));
  assert.ok(bonusTerms("Sway RiNo").includes("redeemable only at Sway RiNo"));
});

console.log(`\n${n} checks passed`);
