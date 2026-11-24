// Holiday gift card bonus (lib/holidayBonus.ts, lib/giftCards/bonus.ts). Run: npx tsx scripts/test-holiday-bonus.mts
import assert from "node:assert/strict";
import { HOLIDAY_BONUS, bonusTerms, holidayBonusOpen, makeBonusCode, qualifiesForBonus } from "../lib/holidayBonus";
import { bonusCodes, giftBonusFor, issueBonusCode, type SharedBonusDb } from "../lib/giftCards/bonus";
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
  const first = await issueBonusCode(store, input, null);
  const again = await issueBonusCode(store, input, null);
  assert.equal(first.created, true);
  assert.deepEqual(again, { code: first.code, created: false });
  const other = await issueBonusCode(store, { ...input, saleId: 9002, barcode: "175746437676" }, null);
  assert.notEqual(other.code, first.code);
  // The same barcode at another Mindbody site is a different card
  const rino = await issueBonusCode(store, { ...input, site: { ...larimer, slug: "denver-rino", name: "Sway RiNo", siteId: "5754020" } }, null);
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

await ok("on the live site the code is issued in the database Atlas reads, under the location's Mindbody site", async () => {
  // A stand-in for the shared database that follows the contract's issue script
  const hashes = new Map<string, Record<string, string>>(), strings = new Map<string, string>(), sets = new Map<string, Set<string>>();
  const db: SharedBonusDb = async <T,>(c: (string | number)[]) => {
    if (c[0] === "HGET") return (hashes.get(String(c[1]))?.[String(c[2])] ?? null) as T;
    assert.equal(c[0], "EVAL");
    const [codeKey, cardKey, spaKey, code] = [String(c[3]), String(c[4]), String(c[5]), String(c[6])];
    if (strings.has(cardKey)) return ["exists", strings.get(cardKey)] as T;
    if (hashes.has(codeKey)) return ["collision", ""] as T;
    strings.set(cardKey, code);
    const rec: Record<string, string> = {};
    for (let k = 8; k < c.length; k += 2) rec[String(c[k])] = String(c[k + 1]);
    hashes.set(codeKey, rec);
    (sets.get(spaKey) ?? sets.set(spaKey, new Set()).get(spaKey)!).add(code);
    return ["created", code] as T;
  };
  const store = giftStore();
  const bonus = giftBonusFor(larimer, gift({ amount: 300 }), 300, "sam@example.com", at("2026-12-01T18:00:00Z"))!;
  const input = { site: larimer, saleId: 9100, barcode: "275746437000", value: 300, buyerName: "Sam", buyerEmail: "sam@example.com", bonus, purchasedAt: at("2026-12-01T18:00:00Z") };
  const { code } = await issueBonusCode(store, input, db);
  // What Atlas's redeem screen reads: the location's set, then the record
  assert.deepEqual([...sets.get("bonus:spa:5739770:1")!], [code]);
  const rec = hashes.get(`bonus:code:${code}`)!;
  assert.equal(rec.site_id, "5739770");
  assert.equal(rec.location_id, "1");
  assert.equal(rec.status, "active");
  assert.equal(rec.spa_name, "Sway Larimer");
  assert.equal(rec.active_from, "2027-01-01T07:00:00Z");
  assert.equal(strings.get("bonus:card:275746437000"), code);
  for (const v of Object.values(rec)) assert.equal(typeof v, "string"); // the contract: every field a string
  // A repeat, even from a fresh gift store, keeps the database's code
  assert.equal((await issueBonusCode(store, input, db)).code, code);
  assert.equal((await issueBonusCode(giftStore(), { ...input, barcode: "275746437000" }, db)).code, code);
  // The same card number already coded at another site is refused, not handed over
  strings.set("bonus:card:999", "AAAA-CCCC");
  hashes.set("bonus:code:AAAA-CCCC", { site_id: "13205" });
  await assert.rejects(issueBonusCode(store, { ...input, barcode: "999" }, db), /another site/);
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

await ok("the gift card questions: the holiday offer is listed only while it is on, and names the location", async () => {
  const { giftFaqs, giftFaqJsonLd } = await import("../lib/giftCards/faq");
  const off = giftFaqs({ slug: "denver-rino", spaName: "Sway RiNo" });
  assert.ok(!off.some((i) => /holiday gift card offer/i.test(i.q)));
  assert.ok(off.some((i) => i.q === "How much should I put on a gift card for Sway RiNo?"));
  const on = giftFaqs({ slug: "denver-rino", spaName: "Sway RiNo", holidayOn: true });
  assert.equal(on[0].q, "Is there a holiday gift card offer at Sway RiNo?");
  assert.ok(on[0].a.includes("$200") && on[0].a.includes("at Sway RiNo") && on[0].a.includes("January 1 to April 30, 2027"));
  assert.equal(on.length, off.length + 1);
  for (const i of on) assert.ok(!i.a.includes("—") && !i.q.includes("—"), "no em dashes");
  assert.equal(giftFaqJsonLd(off).mainEntity.length, off.length);
  assert.ok(!giftFaqs().some((i) => /How much should I put/.test(i.q)), "no location, no price guide");
});

console.log(`\n${n} checks passed`);
