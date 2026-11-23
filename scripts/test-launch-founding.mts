/**
 * Checks for the launch-site founding checkout (lib/launchFounding.ts, lib/foundingCheckouts.ts,
 * lib/ops/feeds.ts). Pure functions only: no network, no Mindbody, no Redis.
 *
 *   npx tsx scripts/test-launch-founding.mts [path/to/live-contracts.json]
 *
 * With a path, also runs every tier against a saved copy of the spa's live /sale/contracts answer.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import { checkFoundingContract, longDate, monthAfter, termsToPlainText } from "../lib/launchFounding";
import { mergeFoundingCheckout } from "../lib/foundingCheckouts";
import { feedDays, feedRowFor } from "../lib/ops/feeds";
import { LAUNCH_SITES, LAUNCH_TIER_KEYS, launchPlanForContract, launchPlanPrice, launchTierForContract, launchToday, type LaunchPlanKey } from "../lib/launchSites";

let n = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  n++;
  console.log(`ok  ${name}`);
};

// A founding contract as Union Market's Mindbody returned it on 11/23/2026 (trimmed).
const base = {
  Id: 137,
  Name: "Founding Essential Membership - $89 per month",
  SoldOnline: true,
  IntroOffer: "None",
  AutopaySchedule: { FrequencyType: "SetNumberOfAutopays", FrequencyValue: 1, FrequencyTimeUnit: "Monthly" },
  NumberOfAutopays: 12,
  ClientsChargedOn: "SpecificDate",
  ClientsChargedOnSpecificDate: "2027-02-05T00:00:00",
  DiscountAmount: 0,
  DepositAmount: 0,
  FirstAutopayFree: false,
  LastAutopayFree: false,
  AutopayEnabled: true,
  FirstPaymentAmountTotal: 89,
  RecurringPaymentAmountTotal: 89,
  NumberOfPromoAutopays: null,
  AgreementTerms: "<div>My first month&rsquo;s dues.<br>Welcome to wellness!</div>",
};
const today = "2026-11-23";

ok("a matching founding contract sells, with the contract's start date", () => {
  const c = checkFoundingContract(base, "essential", 89, today);
  assert.equal(c.ok, true);
  if (c.ok) {
    assert.equal(c.contract.startDate, "2027-02-05");
    assert.equal(c.contract.fixedStart, true);
    assert.equal(c.contract.price, 89);
    assert.equal(c.contract.terms, "My first month's dues.\nWelcome to wellness!");
  }
});
ok("once the start date has passed, the membership starts the day it is bought", () => {
  const c = checkFoundingContract(base, "essential", 89, "2027-02-05");
  assert.equal(c.ok && c.contract.startDate, "2027-02-05");
  assert.equal(c.ok && c.contract.fixedStart, false);
  const later = checkFoundingContract(base, "essential", 89, "2027-03-01");
  assert.equal(later.ok && later.contract.startDate, "2027-03-01");
});
ok("a price changed in Mindbody is refused", () => {
  for (const patch of [{ FirstPaymentAmountTotal: 99 }, { RecurringPaymentAmountTotal: 99 }, { FirstPaymentAmountTotal: 0 }]) {
    const c = checkFoundingContract({ ...base, ...patch }, "essential", 89, today);
    assert.equal(c.ok, false);
    assert.equal(!c.ok && c.reason, "price");
  }
});
ok("the wrong contract is refused (not founding, wrong tier, not sold online, missing)", () => {
  const not = (raw: unknown, reason: string, tier: "essential" | "premier" = "essential") => {
    const c = checkFoundingContract(raw, tier, 89, today);
    assert.equal(c.ok, false);
    assert.equal(!c.ok && c.reason, reason);
  };
  not({ ...base, Name: "Remedy Room Membership | 4 Sessions" }, "not_founding");
  not({ ...base, Name: "Essential Membership" }, "not_founding");
  not(base, "not_founding", "premier");
  not({ ...base, SoldOnline: false }, "not_online");
  not(undefined, "missing");
});
ok("a contract with a deposit, discount, promo or odd schedule is refused", () => {
  for (const patch of [
    { DepositAmount: 50 },
    { DiscountAmount: 10 },
    { IntroOffer: "NewAndReturningClients" },
    { FirstAutopayFree: true },
    { NumberOfPromoAutopays: 3 },
    { AutopaySchedule: { FrequencyValue: 1, FrequencyTimeUnit: "Weekly" } },
    { ClientsChargedOn: "FirstOfTheMonth" },
    { ClientsChargedOn: "SpecificDate", ClientsChargedOnSpecificDate: null },
  ]) {
    const c = checkFoundingContract({ ...base, ...patch }, "essential", 89, today);
    assert.equal(c.ok, false, JSON.stringify(patch));
    assert.equal(!c.ok && c.reason, "shape", JSON.stringify(patch));
  }
});
ok("dates read as the guest will see them", () => {
  assert.equal(longDate("2027-02-05"), "February 5, 2027");
  assert.equal(monthAfter("2027-02-05"), "2027-03-05");
  assert.equal(monthAfter("2027-01-31"), "2027-02-28");
  assert.equal(monthAfter("2026-12-15"), "2027-01-15");
  assert.equal(termsToPlainText("<p>A &amp; B</p><ul><li>one</li></ul>"), "A & B\n· one");
});
ok("the page's contracts map to tiers, and only those", () => {
  const site = LAUNCH_SITES["union-market"];
  assert.equal(launchTierForContract(site, 137), "essential");
  assert.equal(launchTierForContract(site, 139), "ultimate");
  assert.equal(launchTierForContract(site, 102), null); // the Remedy Room contract is not a founding TIER
  assert.equal(launchPlanForContract(site, 102), "remedy"); // but it is a plan the site sells
  assert.equal(launchPlanForContract(site, 137), "essential");
  assert.equal(launchPlanForContract(site, 145), null); // the retired pre-opening copy is never sold
  assert.deepEqual(launchPlanPrice(site, "remedy"), { contractId: 102, price: 99 });
  assert.match(launchToday(site, new Date("2026-11-24T03:30:00Z")), /^2026-11-23$/); // 10:30 PM in DC
});
// The Remedy Room membership sold before opening: the regular contract 102 with the spa's start date (trimmed).
const remedyBase = {
  ...base,
  Id: 102,
  Name: "Remedy Room Membership | 4 Sessions",
  FirstPaymentAmountTotal: 99,
  RecurringPaymentAmountTotal: 99,
};
ok("the Remedy Room membership sells only on the Remedy Room contract, at its price, while it has a fixed start", () => {
  const c = checkFoundingContract(remedyBase, "remedy", 99, today);
  assert.equal(c.ok, true);
  if (c.ok) {
    assert.equal(c.contract.contractId, 102);
    assert.equal(c.contract.startDate, "2027-02-05");
    assert.equal(c.contract.fixedStart, true);
  }
  // a Flex one, a founding tier and anything else are refused
  for (const Name of ["Flex Remedy Room Membership | 1 Month", "Founding Essential Membership - $89 per month", "Founding Remedy Room Membership - $99 per month", "Aescape Premier Membership 4 sessions x 30 min $99"]) {
    const r = checkFoundingContract({ ...remedyBase, Name }, "remedy", 99, today);
    assert.equal(r.ok, false, Name);
    if (!r.ok) assert.equal(r.reason, "not_founding");
  }
  // and the Remedy Room contract is not a founding tier
  assert.equal(checkFoundingContract(remedyBase, "essential", 99, today).ok, false);
  // wrong price, not sold online
  assert.equal(checkFoundingContract(remedyBase, "remedy", 89, today).ok, false);
  assert.equal(checkFoundingContract({ ...remedyBase, SoldOnline: false }, "remedy", 99, today).ok, false);
  // switched to "on the sale date": it would bill from today for a spa that isn't open
  const onSale = { ...remedyBase, ClientsChargedOn: "OnSaleDate", ClientsChargedOnSpecificDate: null };
  for (const opens of [undefined, "2027-02-05"]) {
    const flipped = checkFoundingContract(onSale, "remedy", 99, today, opens);
    assert.equal(flipped.ok, false);
    if (!flipped.ok) assert.equal(flipped.reason, "shape");
  }
  assert.equal(checkFoundingContract(onSale, "remedy", 99, "2027-02-04", "2027-02-05").ok, false); // the day before opening
  // from the spa's start date on, the owner has switched it back and it sells from the day it is bought
  const opened = checkFoundingContract(onSale, "remedy", 99, "2027-02-05", "2027-02-05");
  assert.equal(opened.ok && opened.contract.startDate, "2027-02-05");
  assert.equal(opened.ok && opened.contract.fixedStart, false);
  assert.equal(LAUNCH_SITES["union-market"].remedyRoom?.opens, "2027-02-05");
  // a founding tier on the sale date is still allowed, as before
  assert.equal(checkFoundingContract({ ...base, ClientsChargedOn: "OnSaleDate", ClientsChargedOnSpecificDate: null }, "essential", 89, today).ok, true);
  // once the fixed date has passed it starts the day it is bought
  const later = checkFoundingContract(remedyBase, "remedy", 99, "2027-03-01");
  assert.equal(later.ok && later.contract.startDate, "2027-03-01");
  assert.equal(later.ok && later.contract.fixedStart, false);
});
ok("the follow-up list keeps the furthest screen and fills in the name", () => {
  const a = mergeFoundingCheckout(undefined, "union-market", "a@b.co", "email", {}, "2026-11-23T10:00:00.000Z");
  assert.deepEqual(a, { spa: "union-market", email: "a@b.co", startedAt: "2026-11-23T10:00:00.000Z", updatedAt: "2026-11-23T10:00:00.000Z", stage: "email" });
  const b = mergeFoundingCheckout(a, "union-market", "a@b.co", "payment", { firstName: " Ada ", lastName: "Lovelace", phone: "2025550123" }, "2026-11-23T10:05:00.000Z");
  assert.equal(b.stage, "payment");
  assert.equal(b.firstName, "Ada");
  assert.equal(b.startedAt, "2026-11-23T10:00:00.000Z");
  const c = mergeFoundingCheckout(b, "union-market", "a@b.co", "email", {}, "2026-11-24T09:00:00.000Z"); // came back, started over
  assert.equal(c.stage, "payment");
  assert.equal(c.firstName, "Ada");
  assert.equal(c.updatedAt, "2026-11-24T09:00:00.000Z");
  assert.equal(mergeFoundingCheckout(c, "union-market", "a@b.co", "joined", {}, "x").stage, "joined");
});
ok("the follow-up list records the plan, and a founder who starts the Remedy Room checkout is a new checkout", () => {
  const a = mergeFoundingCheckout(undefined, "union-market", "a@b.co", "email", { plan: "essential" }, "2026-11-23T10:00:00.000Z");
  assert.equal(a.plan, "essential");
  // a later note without a plan keeps it; a switch of tier follows the guest
  assert.equal(mergeFoundingCheckout(a, "union-market", "a@b.co", "payment", {}, "t").plan, "essential");
  assert.equal(mergeFoundingCheckout(a, "union-market", "a@b.co", "payment", { plan: "premier" }, "t").plan, "premier");
  assert.equal(mergeFoundingCheckout(a, "union-market", "a@b.co", "payment", { plan: "not a plan!" }, "t").plan, "essential");
  // joined founding, then the Remedy Room checkout: the record restarts on "remedy", it is not "joined" on it
  const joined = mergeFoundingCheckout(a, "union-market", "a@b.co", "joined", { firstName: "Ada", plan: "essential" }, "2026-11-23T10:10:00.000Z");
  const remedy = mergeFoundingCheckout(joined, "union-market", "a@b.co", "email", { plan: "remedy" }, "2026-11-24T09:00:00.000Z");
  assert.deepEqual([remedy.plan, remedy.stage, remedy.startedAt, remedy.firstName], ["remedy", "email", "2026-11-24T09:00:00.000Z", "Ada"]);
  assert.equal(mergeFoundingCheckout(remedy, "union-market", "a@b.co", "joined", { plan: "remedy" }, "t").stage, "joined");
  // a joined row from before plans were recorded (founding): only "remedy" restarts it
  const old = { spa: "union-market", email: "a@b.co", startedAt: "s", updatedAt: "u", stage: "joined" as const };
  assert.deepEqual([mergeFoundingCheckout(old, "union-market", "a@b.co", "email", { plan: "essential" }, "t").stage, mergeFoundingCheckout(old, "union-market", "a@b.co", "email", { plan: "remedy" }, "t").stage], ["joined", "email"]);
  // the same plan again after joining stays joined
  assert.equal(mergeFoundingCheckout(joined, "union-market", "a@b.co", "email", { plan: "essential" }, "t").stage, "joined");
});
ok("the Launch Board funnel keeps founding and the Remedy Room checkout in separate flows", () => {
  const spas = new Set(["union-market"]);
  const row = (f: string) => { const r = feedRowFor(f, spas); return r ? `${r.flow}/${r.step}/${r.from}/${r.variant}` : null; };
  assert.equal(row("membership|union-market|email|essential"), "membership/email/membership/essential");
  assert.equal(row("membership|union-market|from-founding|premier"), "membership/from-founding/membership/premier");
  assert.equal(row("membership|union-market|opened|"), "membership/opened/membership/-");
  assert.equal(row("membership|union-market|email|remedy"), "remedy/email/membership/remedy"); // its own flow
  assert.equal(row("membership|union-market|joined|remedy"), "remedy/joined/membership/remedy");
  assert.equal(row("checkout|union-market|from-location|remedy"), "remedy/from-location/checkout/remedy"); // which page sent them
  assert.equal(row("checkout|union-market|from-founding|essential"), null); // founding detail stays out of the feed, as before
  assert.equal(row("checkout|union-market|code-sent|remedy"), null);
  assert.equal(row("membership|denver-larimer|email|remedy"), null); // launch sites only
  assert.equal(row("service|union-market|done|x"), null);
});
ok("feed day ranges are inclusive, capped and never in the future", () => {
  assert.deepEqual(feedDays("2026-11-21", "2026-11-23", "2026-11-23"), ["2026-11-21", "2026-11-22", "2026-11-23"]);
  assert.deepEqual(feedDays(null, null, "2026-11-23"), ["2026-11-23"]);
  assert.deepEqual(feedDays("2026-11-22", "2027-01-01", "2026-11-23"), ["2026-11-22", "2026-11-23"]);
  assert.equal(feedDays("2020-01-01", "2026-11-23", "2026-11-23").length, 120);
  assert.deepEqual(feedDays("junk", "2026-11-23", "2026-11-23"), ["2026-11-23"]);
});

const livePath = process.argv[2];
if (livePath) {
  const live = JSON.parse(fs.readFileSync(livePath, "utf8"));
  const site = LAUNCH_SITES["union-market"];
  ok(`live contracts from ${livePath} all match the page`, () => {
    const plans: LaunchPlanKey[] = [...LAUNCH_TIER_KEYS, ...(site.remedyRoom ? (["remedy"] as const) : [])];
    for (const tier of plans) {
      const { contractId, price } = launchPlanPrice(site, tier)!;
      const raw = (live.Contracts as any[]).find((c) => c.Id === contractId);
      const c = checkFoundingContract(raw, tier, price, launchToday(site), site.remedyRoom?.opens);
      assert.equal(c.ok, true, `${tier}: ${JSON.stringify(c)}`);
      if (c.ok) console.log(`    ${tier}: "${c.contract.name}" $${c.contract.price}, starts ${c.contract.startDate}, terms ${c.contract.terms?.length ?? 0} chars`);
    }
  });
}
console.log(`\n${n} checks passed`);
