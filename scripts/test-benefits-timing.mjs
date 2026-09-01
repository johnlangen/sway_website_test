// (b) Settle benefits-activation timing on the Larimer test client (no real
// customer). Creates a REAL deferred Founding contract (future StartDate →
// $0 today), then checks whether the booking flow's signal (clientcontracts
// IsActive / activeclientmemberships Current) shows the member as ACTIVE NOW
// vs only at StartDate. Default = read-only baseline; --commit does the sale.
// NOTE: a committed contract must be terminated in the MB owner UI afterward
// (no public API to cancel) — there's a scheduled $99 on 2026-07-20 to kill.
import { readFileSync } from "fs";

const COMMIT = process.argv.includes("--commit");
const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY, SITE = env.MINDBODY_SITE_ID, CLIENT = "100005390";
const START = "2026-07-20";

const token = await (await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
  method: "POST", headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE },
  body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER3, Password: env.MINDBODY_STAFF_PASS3 }),
})).json().then((d) => d.AccessToken);
const H = { Accept: "application/json", "Api-Key": API_KEY, SiteId: SITE, Authorization: `Bearer ${token}` };

async function get(path, params) { const u = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) u.searchParams.append(k, v);
  return (await fetch(u, { headers: H }).then((r) => r.json()).catch(() => ({}))); }

// Which Founding contract id on Larimer?
const contracts = (await get("sale/contracts", { "request.limit": "100" })).Contracts || [];
const founding = contracts.find((c) => /founding membership/i.test(c.Name) && c.Id < 101) || contracts.find((c) => c.Id === 100);
console.log("Founding contract on Larimer:", founding ? `[${founding.Id}] "${founding.Name}"` : "NOT FOUND (will use 122 Essential)");
const CONTRACT = String(founding?.Id ?? 122);

async function snapshot(label) {
  const cc = (await get("client/clientcontracts", { "request.clientId": CLIENT })).Contracts || [];
  const ms = (await get("client/activeclientmemberships", { "request.clientId": CLIENT, "request.crossRegionalLookup": "true" })).ClientMemberships || [];
  console.log(`\n--- ${label} ---`);
  console.log(`  clientcontracts: ${cc.length}`);
  for (const c of cc) console.log(`    "${c.ContractName ?? c.Name}" IsActive=${c.IsActive} StartDate=${c.StartDate} Term=${c.TerminationDate} upcomingAutopays=${(c.UpcomingAutopayEvents||[]).map(e=>e.ClearedDate||e.PaymentDate||e.Date).join(",")||"-"}`);
  console.log(`  activeclientmemberships: ${ms.length}`);
  for (const m of ms) console.log(`    "${m.Name}" Current=${m.Current} Active=${m.Active} ActiveDate=${m.ActiveDate} ExpDate=${m.ExpirationDate}`);
  return { cc, ms };
}

await snapshot("BASELINE (before)");

if (!COMMIT) { console.log("\n(preview only — pass --commit to create the deferred contract and re-check)"); process.exit(0); }

console.log(`\n>>> Creating REAL deferred contract [${CONTRACT}] StartDate=${START} FirstPaymentOccurs=StartDate ...`);
const buy = await fetch("https://api.mindbodyonline.com/public/v6/sale/purchasecontract", {
  method: "POST", headers: { ...H, "Content-Type": "application/json" },
  body: JSON.stringify({ Test: false, SendNotifications: false, LocationId: 1, ClientId: CLIENT, ContractId: CONTRACT,
    StartDate: START, FirstPaymentOccurs: "StartDate", StoredCardInfo: { LastFour: "4242" } }),
}).then((r) => r.json());
console.log("  purchase result: ClientContractId=", buy.ClientContractId, "| Totals.Total=", buy?.Totals?.Total, "| Error=", buy?.Error?.Message || "none");

const after = await snapshot("AFTER (immediately post-purchase, today is well before StartDate)");

// verdict
const newC = after.cc.find((c) => String(c.Id) === String(buy.ClientContractId) || /founding/i.test(c.ContractName ?? c.Name ?? ""));
const activeNow = (after.cc.some((c) => c.IsActive === true && /founding/i.test(c.ContractName ?? c.Name ?? ""))) ||
                  (after.ms.some((m) => m.Current === true));
console.log("\n===== VERDICT =====");
console.log(`  New contract IsActive now (before StartDate ${START}): ${newC ? newC.IsActive : "not found"}`);
console.log(`  Booking-flow would recognize as member TODAY: ${activeNow ? "YES (benefits active immediately)" : "NO (benefits start at StartDate — early-July gap exists)"}`);
console.log(`\n  ⚠️ CLEANUP: terminate ClientContractId ${buy.ClientContractId} in the Mindbody owner UI before ${START} (scheduled $99 on the test card).`);
