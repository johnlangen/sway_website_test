/**
 * Mocked run of POST /api/membership/purchase: what it sends to Mindbody for Larimer, a club and a
 * launch site (Union Market), and what it refuses. No network: fetch is replaced, sessions use the
 * in-memory store (no KV env), `after()` from next/server runs its callback immediately.
 *
 *   node --experimental-test-module-mocks --import tsx scripts/test-membership-purchase-route.mts
 *   (Node 22+; `nvm use 23`)
 */
import assert from "node:assert/strict";
import { mock } from "node:test";

for (const k of Object.keys(process.env)) if (/^(KV_|UPSTASH_|OPS_KV_|VERCEL|GA4_)/.test(k)) delete process.env[k];
Object.assign(process.env, {
  MINDBODY_API_KEY: "test-key",
  MINDBODY_SITE_ID: "5739770",
  MINDBODY_STAFF_USER: "u",
  MINDBODY_STAFF_PASS: "p",
  MINDBODY_STAFF_USER2: "u2",
  MINDBODY_STAFF_PASS2: "p2",
});

const real = await import("next/server");
mock.module("next/server", {
  namedExports: { ...real, after: (fn: () => unknown) => void Promise.resolve().then(fn).catch(() => {}) },
});

type Call = { url: string; body: any };
let calls: Call[] = [];
let world: {
  contracts: any[];
  preview: (body: any) => { status: number; json: any };
  charge: (body: any) => { status: number; json: any };
};
const founding = (id: number, tier: string, price: number, patch: Record<string, unknown> = {}) => ({
  Id: id,
  Name: `Founding ${tier} Membership - $${price} per month`,
  SoldOnline: true,
  IntroOffer: "None",
  AutopaySchedule: { FrequencyType: "SetNumberOfAutopays", FrequencyValue: 1, FrequencyTimeUnit: "Monthly" },
  ClientsChargedOn: "SpecificDate",
  ClientsChargedOnSpecificDate: "2099-02-05T00:00:00",
  DiscountAmount: 0,
  DepositAmount: 0,
  AutopayEnabled: true,
  FirstPaymentAmountTotal: price,
  RecurringPaymentAmountTotal: price,
  AgreementTerms: "<div>terms</div>",
  ...patch,
});
// Union Market's Remedy Room membership sold before opening (contract 145): the regular price on a fixed start.
const remedyPre = (patch: Record<string, unknown> = {}) => ({ ...founding(145, "x", 99), Name: "Remedy Room Membership | 4 Sessions | Pre-Opening", ...patch });
const okSale = (total: number, id: number | null) => ({ status: 200, json: { ClientContractId: id, Totals: { Total: total, SubTotal: total, Tax: 0 } } });
function reset() {
  calls = [];
  world = {
    contracts: [founding(137, "Essential", 89), founding(138, "Premier", 119), founding(139, "Ultimate", 149), remedyPre()],
    preview: () => okSale(89, null),
    charge: () => okSale(89, 777),
  };
}
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
globalThis.fetch = (async (input: any, init?: any) => {
  const url = String(input?.url ?? input);
  const body = init?.body ? JSON.parse(init.body) : null;
  calls.push({ url, body });
  if (url.includes("/usertoken/issue")) return json(200, { AccessToken: "tok", Expires: new Date(Date.now() + 3600e3).toISOString() });
  if (url.includes("/client/clients"))
    return json(200, { Clients: [{ Id: "100", FirstName: "Ada", LastName: "Lovelace", MobilePhone: "2025550123", ClientCreditCard: { LastFour: "4242" } }] });
  if (url.includes("/sale/contracts")) return json(200, { Contracts: world.contracts });
  if (url.includes("/sale/purchasecontract")) {
    const r = body.Test ? world.preview(body) : world.charge(body);
    return json(r.status, r.json);
  }
  return json(204, {});
}) as typeof fetch;

const { POST } = await import("../app/api/membership/purchase/route");
const { createSession, sessionCookie } = await import("../lib/membershipVerify");

let ip = 1;
// One guest per check, so one check's purchase lock never blocks the next.
let guest = "100";
async function buy(siteId: string, contractId: number, opts: { test?: boolean; sessionSite?: string; clientIds?: string[] } = {}) {
  const token = await createSession({ email: "ada@example.com", siteId: opts.sessionSite ?? siteId, mode: "verified", clientIds: opts.clientIds ?? [guest] });
  const cookie = sessionCookie(token).split(";")[0];
  const res = await POST(
    new Request("https://www.swaywellnessspa.com/api/membership/purchase/", {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie, host: "www.swaywellnessspa.com", "x-forwarded-for": `10.0.0.${ip++}` },
      body: JSON.stringify({ clientId: guest, contractId, siteId, ...(opts.test ? { test: true } : {}) }),
    })
  );
  return { status: res.status, data: await res.json(), sales: calls.filter((c) => c.url.includes("/sale/purchasecontract")).map((c) => c.body) };
}
const denverToday = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver" }).format(new Date());
const LARIMER = "5739770", RINO = "5754020", UM = "5757939";
let n = 0;
async function check(name: string, fn: () => Promise<void>) {
  reset();
  guest = String(100 + n + 1);
  await fn();
  n++;
  console.log(`ok  ${name}`);
}

await check("Larimer, real: one sale, exactly as before", async () => {
  world.charge = () => okSale(99, 501);
  const r = await buy(LARIMER, 122);
  assert.equal(r.status, 200);
  assert.deepEqual(r.sales, [{ Test: false, LocationId: 1, ClientId: guest, ContractId: 122, StartDate: denverToday, FirstPaymentOccurs: "Instant", SendNotifications: true, StoredCardInfo: { LastFour: "4242" } }]);
  assert.deepEqual(r.data, { success: true, test: false, clientContractId: 501, totals: { Total: 99, SubTotal: 99, Tax: 0 }, membership: "essential" });
  assert.equal(calls.some((c) => c.url.includes("/sale/contracts")), false);
});
await check("Larimer, memtest: one no-charge test sale, no notification", async () => {
  world.preview = () => okSale(129, null);
  const r = await buy(LARIMER, 123, { test: true });
  assert.equal(r.status, 200);
  assert.equal(r.sales.length, 1);
  assert.equal(r.sales[0].Test, true);
  assert.equal(r.sales[0].SendNotifications, false);
  assert.equal(r.data.test, true);
});
await check("Club (RiNo), real: one sale at its own site, unchanged", async () => {
  world.charge = () => okSale(129, 502);
  const r = await buy(RINO, 143);
  assert.equal(r.status, 200);
  assert.equal(r.sales.length, 1);
  assert.deepEqual([r.sales[0].Test, r.sales[0].LocationId, r.sales[0].StartDate], [false, 1, denverToday]);
  assert.equal(r.data.startDate, undefined);
});
await check("Larimer, declined: card_failed, lock released (a retry goes through)", async () => {
  world.charge = () => ({ status: 400, json: { Error: { Message: "Card declined" } } });
  const r = await buy(LARIMER, 122);
  assert.equal(r.status, 400);
  assert.equal(r.data.code, "card_failed");
  world.charge = () => okSale(99, 503);
  calls = [];
  assert.equal((await buy(LARIMER, 122)).status, 200);
});
await check("Larimer: a second submit while one is in flight is refused", async () => {
  world.charge = () => okSale(159, 504);
  assert.equal((await buy(LARIMER, 124)).status, 200);
  calls = [];
  const again = await buy(LARIMER, 124);
  assert.equal(again.status, 409);
  assert.equal(again.data.code, "in_progress");
  assert.equal(again.sales.length, 0);
});

await check("Union Market, real: contract re-read, test sale, then the sale with the contract's start date", async () => {
  const r = await buy(UM, 137);
  assert.equal(r.status, 200, JSON.stringify(r.data));
  assert.equal(calls.filter((c) => c.url.includes("/sale/contracts")).length, 1);
  assert.equal(r.sales.length, 2);
  const [preview, sale] = r.sales;
  assert.deepEqual([preview.Test, preview.SendNotifications], [true, false]);
  assert.deepEqual([sale.Test, sale.SendNotifications], [false, true]);
  for (const b of r.sales) assert.deepEqual([b.LocationId, b.ContractId, b.StartDate, b.FirstPaymentOccurs, b.StoredCardInfo.LastFour], [1, 137, "2099-02-05", "Instant", "4242"]);
  assert.deepEqual([r.data.success, r.data.clientContractId, r.data.membership, r.data.startDate, r.data.fixedStart, r.data.nextCharge], [true, 777, "essential", "2099-02-05", true, "2099-03-05"]);
});
await check("Union Market, memtest: the test sale only", async () => {
  world.preview = () => okSale(149, null);
  const r = await buy(UM, 139, { test: true });
  assert.equal(r.status, 200);
  assert.equal(r.sales.length, 1);
  assert.equal(r.sales[0].Test, true);
  assert.equal(r.data.test, true);
});
await check("Union Market: price changed in Mindbody → off sale, Mindbody never asked to sell", async () => {
  world.contracts = [founding(137, "Essential", 99)];
  const r = await buy(UM, 137);
  assert.equal(r.status, 409);
  assert.equal(r.data.code, "off_sale");
  assert.match(r.data.error, /contact@swaywellnessspa\.com/);
  assert.equal(r.sales.length, 0);
});
await check("Union Market: test sale total differs (tax) → off sale, no charge", async () => {
  world.preview = () => okSale(94.34, null);
  const r = await buy(UM, 137);
  assert.equal(r.status, 409);
  assert.equal(r.data.code, "off_sale");
  assert.deepEqual(r.sales.map((b) => b.Test), [true]);
});
await check("Union Market: card declined on the test sale → back to the card screen, no charge", async () => {
  world.preview = () => ({ status: 400, json: { Error: { Message: "Card declined" } } });
  const r = await buy(UM, 137);
  assert.equal(r.status, 400);
  assert.equal(r.data.code, "card_failed");
  assert.deepEqual(r.sales.map((b) => b.Test), [true]);
});
await check("Union Market, Remedy Room membership: sold on its pre-opening contract with that contract's start date", async () => {
  world.preview = () => okSale(99, null);
  world.charge = () => okSale(99, 778);
  const r = await buy(UM, 145);
  assert.equal(r.status, 200, JSON.stringify(r.data));
  assert.equal(r.sales.length, 2);
  const [preview, sale] = r.sales;
  assert.deepEqual([preview.Test, preview.SendNotifications], [true, false]);
  assert.deepEqual([sale.Test, sale.SendNotifications], [false, true]);
  for (const b of r.sales) assert.deepEqual([b.LocationId, b.ContractId, b.StartDate, b.FirstPaymentOccurs, b.StoredCardInfo.LastFour], [1, 145, "2099-02-05", "Instant", "4242"]);
  assert.deepEqual([r.data.success, r.data.clientContractId, r.data.membership, r.data.startDate, r.data.fixedStart, r.data.nextCharge], [true, 778, "remedy", "2099-02-05", true, "2099-03-05"]);
});
await check("Union Market, Remedy Room membership: refused when 145 is renamed, repriced or loses its fixed start", async () => {
  for (const patch of [
    { Name: "Remedy Room Membership | 4 Sessions" }, // the regular contract's name: starts the day it is bought
    { FirstPaymentAmountTotal: 109, RecurringPaymentAmountTotal: 109 },
    { ClientsChargedOn: "OnSaleDate", ClientsChargedOnSpecificDate: null },
    { SoldOnline: false },
  ]) {
    world.contracts = [founding(137, "Essential", 89), remedyPre(patch)];
    world.preview = () => okSale(99, null);
    const r = await buy(UM, 145);
    assert.equal(r.status, 409, JSON.stringify(patch));
    assert.equal(r.data.code, "off_sale");
    assert.equal(r.sales.length, 0, "Mindbody is never asked to sell");
    guest = String(Number(guest) + 1000);
  }
});
await check("Union Market: only the founding contracts and the pre-opening Remedy Room contract can be bought", async () => {
  for (const id of [102, 122, 143, 100]) {
    const r = await buy(UM, id);
    assert.equal(r.status, 400, String(id));
    assert.equal(r.sales.length, 0);
  }
});
await check("Union Market: a session from another site, or another client, can't buy here", async () => {
  assert.equal((await buy(UM, 137, { sessionSite: LARIMER })).status, 401);
  assert.equal((await buy(UM, 137, { clientIds: ["999"] })).status, 401);
  assert.equal(calls.some((c) => c.url.includes("/sale/")), false);
});
await check("an unknown site is refused", async () => {
  const r = await buy("1148", 137);
  assert.equal(r.status, 400);
});

console.log(`\n${n} checks passed`);
process.exit(0);
