// Gift card emails end to end, with a stand-in for the mail service (Resend): what is sent, to whom, when,
// that nothing is ever sent twice, and what happens after (delivered, bounced, not sent).
// Run: npx tsx scripts/test-gift-delivery.mts
import assert from "node:assert/strict";

process.env.RESEND_API_KEY = "test";
const { giftStore } = await import("../lib/giftCards/store");
const { fulfillGift, confirmGiftDelivered, giftsToConfirm } = await import("../lib/giftCards/delivery");

// ---------------------------------------------------------------- the stand-in mail service
type Sent = { id: string; key: string; to: string[]; subject: string; html: string; text: string; scheduled_at?: string; reply_to?: string };
const sent: Sent[] = [];
const events = new Map<string, string>();
let failNext = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  if (!url.startsWith("https://api.resend.com/")) return realFetch(input, init);
  if (init?.method === "POST") {
    if (failNext > 0) {
      failNext--;
      return new Response(JSON.stringify({ message: "down" }), { status: 500 });
    }
    const key = String((init.headers as Record<string, string>)["Idempotency-Key"]);
    // The real service answers a repeated key with the first email's id
    const before = sent.find((s) => s.key === key);
    if (before) return new Response(JSON.stringify({ id: before.id }), { status: 200 });
    const body = JSON.parse(String(init.body));
    const id = `em_${sent.length + 1}`;
    sent.push({ id, key, ...body });
    events.set(id, body.scheduled_at ? "scheduled" : "sent");
    return new Response(JSON.stringify({ id }), { status: 200 });
  }
  const id = decodeURIComponent(url.split("/").pop()!);
  return new Response(JSON.stringify({ last_event: events.get(id) ?? "" }), { status: 200 });
}) as typeof fetch;

const store = giftStore();
let n = 0;
const ok = async (name: string, fn: () => Promise<void>) => { await fn(); n++; console.log("ok ", name); };
const days = (d: number) => new Date(Date.now() + d * 86400000);
const design = { id: 273, name: "Happy Holidays", occasions: ["Holiday"], image: "/gift-cards/art/x.jpg", thumbnail: "/gift-cards/art/x-t.jpg", printImage: "/gift-cards/art/x-p.jpg" };

async function purchase(order: string, over: Record<string, unknown> = {}) {
  const gift = {
    productId: 100030, amount: 250, designId: 273, recipient: "Anna", recipientEmail: "anna@example.com", sender: "Sam", title: "A moment just for you",
    message: "Enjoy", deliveryDate: new Date().toISOString().slice(0, 10), payment: "new", id: "q", sessionId: "s", slug: "denver-larimer", siteId: "5739770", clientId: "100", expires: 0,
    product: { id: 100030, name: "Gift Card", value: 0, price: 0, custom: true, available: true, terms: "", designs: [design], version: "v" }, value: 250, cardLastFour: "4242",
    ...over,
  };
  await store.put(`purchase:${order}`, {
    email: "sam@example.com", clientId: "100", quoteId: "q", startedAt: Date.now(), token: order.padEnd(64, "a").slice(0, 64).replace(/[^a-f0-9]/g, "b"),
    result: { state: "purchased", reference: `GIFT-${order.slice(0, 8).toUpperCase()}`, saleId: 9001, value: 250, amount: 250 },
    receipt: { saleId: 9001, barcode: `1757${order.replace(/\D/g, "").padEnd(8, "0").slice(0, 8)}`, value: 250, amount: 250 }, gift,
  }, 3600);
}
/** Lets the next status read through (statuses are read at most every 30 s) */
async function due(...keys: string[]) {
  for (const k of keys) {
    const d = await store.get<Record<string, unknown>>(k);
    if (d) await store.put(k, { ...d, checkedAt: 0 }, 3600);
  }
}
const mail = (order: string, kind: string) => sent.find((s) => s.key === `sway-${kind}:${order}`);

await ok("a gift for a later date with the bonus: four emails, the gift and the bonus held for the date, nothing sent twice", async () => {
  const when = days(3);
  when.setUTCHours(16, 0, 0, 0);
  const at = when.toISOString();
  const date = at.slice(0, 10);
  await purchase("order0001", { deliveryDate: date, scheduledAt: at, giftBonus: { who: "recipient", name: "Anna", email: "anna@example.com", date, scheduledAt: at } });
  const result = await fulfillGift(store, "order0001");
  assert.equal(sent.length, 4);
  const [gift, receipt, bonus, desk] = ["delivery", "receipt", "bonusmail", "spa-notice"].map((k) => mail("order0001", k)!);
  assert.deepEqual(gift.to, ["anna@example.com"]);
  assert.equal(gift.scheduled_at, at, "the gift waits for its date");
  assert.ok(gift.html.includes("Holiday bonus included") && gift.html.includes("Your bonus code arrives in a separate email."));
  assert.deepEqual(receipt.to, ["sam@example.com"]);
  assert.equal(receipt.scheduled_at, undefined, "the receipt goes right away");
  assert.ok(receipt.html.includes("Holiday bonus included") && receipt.text.includes("the bonus code to Anna (anna@example.com) on"));
  assert.deepEqual(bonus.to, ["anna@example.com"]);
  assert.equal(bonus.scheduled_at, at, "the bonus arrives with the gift, not before it");
  const code = /[ACDEFGHJKMNPQRTUVWXY34679]{4}-[ACDEFGHJKMNPQRTUVWXY34679]{4}/.exec(bonus.text)?.[0];
  assert.ok(code, "the bonus email carries the code");
  assert.ok(bonus.html.includes(code!) && bonus.html.includes("January 1 to April 30, 2027") && bonus.html.includes("Sway Larimer"));
  assert.ok(sent.indexOf(bonus) > sent.indexOf(gift), "the bonus is handed over after the gift");
  assert.deepEqual(desk.to, ["contact@swaywellnessspa.com"]);
  assert.equal(desk.reply_to, "sam@example.com");
  assert.ok(desk.text.includes(code!) && desk.text.includes("Holiday bonus"));
  assert.ok(!gift.html.includes(code!) && !receipt.html.includes(code!), "the code is only in the bonus email and the desk's note");
  assert.equal(result.deliveryCheckNeeded, false);
  assert.ok(result.delivery?.includes("scheduled for") && result.bonus?.includes("scheduled for"));

  // The purchase request runs delivery twice (once more after 3 s), the guest can ask again, the job can too
  await fulfillGift(store, "order0001");
  await fulfillGift(store, "order0001");
  assert.equal(sent.length, 4, "no email is sent twice");
  assert.equal(new Set(sent.map((s) => s.key)).size, 4);

  const list = (await giftsToConfirm(store)).filter((x) => x.item.order === "order0001");
  assert.equal(list.length, 1);
  assert.equal(list[0].item.at, Date.parse(at), "checked after its send time");
});

await ok("once that gift reaches the recipient, the buyer gets one note saying so", async () => {
  assert.equal(await confirmGiftDelivered(store, "order0001"), "waiting"); // still scheduled
  events.set(mail("order0001", "delivery")!.id, "delivered");
  await due("delivery:order0001", "bonusmail:order0001");
  assert.equal(await confirmGiftDelivered(store, "order0001"), "waiting"); // the bonus isn't in yet
  events.set(mail("order0001", "bonusmail")!.id, "delivered");
  await due("delivery:order0001", "bonusmail:order0001");
  assert.equal(await confirmGiftDelivered(store, "order0001"), "notified");
  const note = mail("order0001", "delivered")!;
  assert.deepEqual(note.to, ["sam@example.com"]);
  assert.equal(note.subject, "Your gift to Anna was delivered");
  assert.ok(note.text.includes("#gift="));
  const count = sent.length;
  assert.equal(await confirmGiftDelivered(store, "order0001"), "notified");
  assert.equal(sent.length, count, "one note, however often it is checked");
});

await ok("a gift sent right away that bounces: the buyer is told, with the gift link, once", async () => {
  await purchase("order0002", { recipientEmail: "ana@exampel.com" });
  const before = sent.length;
  const result = await fulfillGift(store, "order0002");
  assert.equal(sent.length - before, 3); // gift, receipt, the desk's note; no bonus on this one
  assert.equal(mail("order0002", "delivery")!.scheduled_at, undefined);
  assert.ok(!mail("order0002", "delivery")!.html.includes("Holiday bonus"));
  assert.ok(result.delivery?.includes("on its way"));
  const item = (await giftsToConfirm(store)).find((x) => x.item.order === "order0002")!.item;
  assert.ok(item.at > Date.now() && item.at <= Date.now() + 2 * 60000, "checked two minutes after sending");
  events.set(mail("order0002", "delivery")!.id, "bounced");
  await due("delivery:order0002");
  assert.equal(await confirmGiftDelivered(store, "order0002"), "failed");
  const note = mail("order0002", "bounced")!;
  assert.deepEqual(note.to, ["sam@example.com"]);
  assert.equal(note.subject, "Your gift to Anna couldn't be delivered");
  assert.ok(note.text.includes("ana@exampel.com") && note.text.includes("#gift="));
  const count = sent.length;
  await due("delivery:order0002");
  assert.equal(await confirmGiftDelivered(store, "order0002"), "failed");
  assert.equal(sent.length, count);
});

await ok("a gift sent right away that arrives needs nothing more", async () => {
  await purchase("order0003");
  await fulfillGift(store, "order0003");
  events.set(mail("order0003", "delivery")!.id, "delivered");
  await due("delivery:order0003");
  const count = sent.length;
  assert.equal(await confirmGiftDelivered(store, "order0003"), "delivered");
  assert.equal(sent.length, count, "no extra email for a gift the buyer watched go out");
});

await ok("the buyer keeps the bonus and sends the gift to their own inbox: the gift email mentions it, the code comes right away", async () => {
  const today = new Date().toISOString().slice(0, 10);
  await purchase("order0004", { recipientEmail: "sam@example.com", giftBonus: { who: "self", name: "Sam", email: "sam@example.com", date: today } });
  await fulfillGift(store, "order0004");
  assert.ok(mail("order0004", "delivery")!.html.includes("Holiday bonus included"));
  const bonus = mail("order0004", "bonusmail")!;
  assert.deepEqual(bonus.to, ["sam@example.com"]);
  assert.equal(bonus.scheduled_at, undefined);
  assert.equal(bonus.subject, "Your free 30-minute express facial or massage at Sway Larimer");
  assert.ok(mail("order0004", "receipt")!.text.includes("You kept the bonus"));
});

await ok("the mail service is down: nothing is lost, the order goes on the retry list, and the retry sends each email once", async () => {
  await purchase("order0005", { giftBonus: { who: "recipient", name: "Anna", email: "anna@example.com", date: new Date().toISOString().slice(0, 10) } });
  const before = sent.length;
  failNext = 99;
  const down = await fulfillGift(store, "order0005");
  assert.equal(sent.length, before);
  assert.equal(down.deliveryCheckNeeded, true);
  assert.ok((await store.smembers("deliveries")).includes("order0005"), "the reconcile job will retry it");
  assert.ok(!(await giftsToConfirm(store)).some((x) => x.item.order === "order0005"), "nothing to check until it has actually been sent");
  failNext = 0;
  // The send lock from the failed try clears by itself; here it has already been released
  const up = await fulfillGift(store, "order0005");
  assert.equal(sent.length - before, 4);
  assert.equal(up.deliveryCheckNeeded, false);
  assert.ok(!(await store.smembers("deliveries")).includes("order0005"));
  assert.ok((await giftsToConfirm(store)).some((x) => x.item.order === "order0005"));
  // The same card kept the same code across the failed and the successful run
  const code = /[ACDEFGHJKMNPQRTUVWXY34679]{4}-[ACDEFGHJKMNPQRTUVWXY34679]{4}/.exec(mail("order0005", "bonusmail")!.text)![0];
  await fulfillGift(store, "order0005");
  assert.equal(sent.length - before, 4);
  assert.ok(mail("order0005", "spa-notice")!.text.includes(code));
});

globalThis.fetch = realFetch;
console.log(`\n${n} checks passed`);
