/**
 * Pins every membership the checkout page can sell to its Mindbody contract, price and site
 * (lib/membershipOffers.ts). A wrong contract id here is a wrong charge, so this is checked by
 * hand-written numbers, not by reading the same constants back. Pure: no network.
 *
 *   npx tsx scripts/test-membership-offers.mts
 */
import assert from "node:assert/strict";
import { allPlans, joinHref, launchCheckout, membershipCheckout } from "../lib/membershipOffers";
import { LAUNCH_SITES } from "../lib/launchSites";

let n = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  n++;
  console.log(`ok  ${name}`);
};
const table = (location: string) => Object.fromEntries(allPlans(location).map((p) => [p.key, [p.contractId, p.price]]));

ok("Larimer: six plans, each on its own contract and price", () => {
  assert.deepEqual(table("denver-larimer"), {
    essential: [122, 99],
    premier: [123, 129],
    ultimate: [124, 159],
    aescape30: [119, 99],
    aescape60: [120, 99],
    remedy: [102, 99],
  });
});
ok("Clubs: founding rate, founding with Lounge visits (regular contracts), and the Lounge", () => {
  for (const club of ["denver-rino", "denver-central-park"])
    assert.deepEqual(table(club), {
      essential: [137, 89],
      premier: [138, 119],
      ultimate: [139, 149],
      "essential-visits": [122, 99],
      "premier-visits": [123, 129],
      "ultimate-visits": [124, 159],
      club_lounge: [143, 129],
    });
});
ok("the Mindbody site each checkout charges", () => {
  assert.equal(membershipCheckout("denver-larimer", { plan: "essential" })!.config.siteId, undefined); // routes default to Larimer, as the pop-up did
  assert.equal(membershipCheckout("denver-rino", { plan: "lounge" })!.config.siteId, "5754020");
  assert.equal(membershipCheckout("denver-central-park", { plan: "lounge" })!.config.siteId, "5754021");
  assert.equal(launchCheckout(LAUNCH_SITES["union-market"], "essential").config.siteId, "5757939");
  assert.equal(membershipCheckout("georgetown", { plan: "essential" }), null);
});
ok("the link picks the plan, and the checkout only offers that plan's siblings", () => {
  const pick = (loc: string, q: { plan?: string; perk?: string }) => {
    const c = membershipCheckout(loc, q)!;
    return [c.initialPlan, c.config.plans.map((p) => p.key).join(",")];
  };
  assert.deepEqual(pick("denver-larimer", { plan: "premier" }), ["premier", "essential,premier,ultimate"]);
  assert.deepEqual(pick("denver-larimer", { plan: "aescape60" }), ["aescape60", "aescape30,aescape60"]);
  assert.deepEqual(pick("denver-larimer", { plan: "remedy" }), ["remedy", "remedy"]);
  assert.deepEqual(pick("denver-larimer", {}), [null, "essential,premier,ultimate"]); // no plan: the picker
  assert.deepEqual(pick("denver-larimer", { plan: "nonsense" }), [null, "essential,premier,ultimate"]);
  assert.deepEqual(pick("denver-rino", { plan: "lounge" }), ["club_lounge", "club_lounge"]);
  assert.deepEqual(pick("denver-rino", {}), ["club_lounge", "club_lounge"]);
  assert.deepEqual(pick("denver-rino", { plan: "ultimate" }), ["ultimate", "essential,premier,ultimate"]);
  assert.deepEqual(pick("denver-rino", { plan: "ultimate", perk: "rate" }), ["ultimate", "essential,premier,ultimate"]);
  assert.deepEqual(pick("denver-central-park", { plan: "premier", perk: "visits" }), ["premier-visits", "essential-visits,premier-visits,ultimate-visits"]);
});
ok("a founding checkout never mixes the two perks", () => {
  const rate = membershipCheckout("denver-rino", { plan: "essential", perk: "rate" })!.config;
  const visits = membershipCheckout("denver-rino", { plan: "essential", perk: "visits" })!.config;
  assert.deepEqual(rate.plans.map((p) => p.contractId), [137, 138, 139]);
  assert.deepEqual(visits.plans.map((p) => p.contractId), [122, 123, 124]);
  assert.equal(rate.plans[0].regular, 99); // shown against the regular rate
  assert.equal(visits.plans[0].regular, undefined); // IS the regular rate
});
ok("Google Ads: Larimer's labels at Larimer only, the club's own at a club, none at a launch site", () => {
  assert.equal(membershipCheckout("denver-larimer", { plan: "essential" })!.config.ads, "larimer");
  assert.equal(membershipCheckout("denver-rino", { plan: "lounge" })!.config.ads, "club");
  assert.equal(membershipCheckout("denver-rino", { plan: "essential" })!.config.ads, "club");
  assert.equal(launchCheckout(LAUNCH_SITES["union-market"], "essential").config.ads, "none");
});
ok("Union Market: three founding contracts, live prices, unchanged", () => {
  const c = launchCheckout(LAUNCH_SITES["union-market"], "PREMIER");
  assert.equal(c.initialPlan, "premier");
  assert.deepEqual(c.config.plans.map((p) => [p.key, p.contractId, p.price, p.regular, p.visit]), [
    ["essential", 137, 89, 99, 139],
    ["premier", 138, 119, 129, 169],
    ["ultimate", 139, 149, 159, 199],
  ]);
  assert.equal(c.config.launch, true);
  assert.equal(c.config.marketingDefault, false);
});
ok("join links", () => {
  assert.equal(joinHref("denver-larimer", "premier", { from: "tier" }), "/locations/denver-larimer/membership/join/?plan=premier&from=tier");
  assert.equal(joinHref("denver-rino", "essential", { perk: "visits", from: "tier" }), "/locations/denver-rino/membership/join/?plan=essential&perk=visits&from=tier");
  assert.equal(joinHref("denver-central-park", "lounge"), "/locations/denver-central-park/membership/join/?plan=lounge");
});
ok("Signature Massage says light to medium pressure wherever a plan names it", () => {
  for (const loc of ["denver-larimer", "denver-rino", "denver-central-park"])
    for (const p of allPlans(loc))
      for (const line of p.choose) if (/Signature Massage/.test(line)) assert.match(line, /light to medium pressure/, `${loc} ${p.key}: ${line}`);
});

console.log(`\n${n} checks passed`);
