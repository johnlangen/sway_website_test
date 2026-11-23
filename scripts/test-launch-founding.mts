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
import { feedDays } from "../lib/ops/feeds";
import { LAUNCH_SITES, LAUNCH_TIER_KEYS, launchTierForContract, launchToday } from "../lib/launchSites";

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
  assert.equal(launchTierForContract(site, 102), null); // Remedy Room: sold online in Mindbody, not on the page
  assert.match(launchToday(site, new Date("2026-11-24T03:30:00Z")), /^2026-11-23$/); // 10:30 PM in DC
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
    for (const tier of LAUNCH_TIER_KEYS) {
      const { contractId, price } = site.founding.tiers[tier];
      const raw = (live.Contracts as any[]).find((c) => c.Id === contractId);
      const c = checkFoundingContract(raw, tier, price, launchToday(site));
      assert.equal(c.ok, true, `${tier}: ${JSON.stringify(c)}`);
      if (c.ok) console.log(`    ${tier}: "${c.contract.name}" $${c.contract.price}, starts ${c.contract.startDate}, terms ${c.contract.terms?.length ?? 0} chars`);
    }
  });
}
console.log(`\n${n} checks passed`);
