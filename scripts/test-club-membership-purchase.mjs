// DRY-RUN probe: Mindbody documented Test:true purchase of the Premier Remedy
// Lounge Membership (contract 143) on both club sites — validates the exact
// payload /api/membership/purchase sends (LocationId 1, Denver StartDate,
// FirstPaymentOccurs Instant, StoredCardInfo) without committing or charging
// anything. SendNotifications:false, Test:true. No writes.
//
// Client selection: first ENROLLED row per site from the July 1 enrollment log
// (~/sway-mindbody-migration/enrolled.csv) — known-good accounts with stored
// cards. Usage: node scripts/test-club-membership-purchase.mjs
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const SITE = { "RiNo Station": "5754020", "Central Park": "5754021" };
const CONTRACT_ID = 143;

function denverToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const rows = readFileSync(join(homedir(), "sway-mindbody-migration", "enrolled.csv"), "utf8")
  .split("\n")
  .slice(1)
  .filter((l) => l.includes("ENROLLED"))
  .map((l) => l.split(","));
// Columns: Timestamp,CustomerID,Email,Site,ClientId,ClientContractId,StartDate,Total,Status
const candidates = {};
for (const r of rows) {
  const site = r[3];
  if (!candidates[site]) candidates[site] = { email: r[2], clientId: r[4] };
}

async function getToken(siteId) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`token ${siteId}: ${JSON.stringify(d)}`);
  return d.AccessToken;
}

for (const [siteName, siteId] of Object.entries(SITE)) {
  const cand = candidates[siteName];
  console.log(`\n===== ${siteName} (site ${siteId}) =====`);
  if (!cand) {
    console.log("  no enrolled candidate found — skipping");
    continue;
  }
  const token = await getToken(siteId);

  // Same server-side card lookup the purchase route does.
  const cu = new URL("https://api.mindbodyonline.com/public/v6/client/clients");
  cu.searchParams.set("request.clientIds", cand.clientId);
  cu.searchParams.set("request.limit", "1");
  const cr = await fetch(cu, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
  });
  const client = ((await cr.json())?.Clients ?? [])[0];
  const lastFour = client?.ClientCreditCard?.LastFour;
  console.log(`  client ${cand.clientId} (${cand.email}) card on file: ${lastFour ? "…" + lastFour : "NONE"}`);
  if (!lastFour) continue;

  const res = await fetch("https://api.mindbodyonline.com/public/v6/sale/purchasecontract", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      SiteId: siteId,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Test: true, // documented dry-run: validates everything, commits nothing
      LocationId: 1,
      ClientId: cand.clientId,
      ContractId: CONTRACT_ID,
      StartDate: denverToday(),
      FirstPaymentOccurs: "Instant",
      SendNotifications: false,
      StoredCardInfo: { LastFour: String(lastFour) },
    }),
  });
  const data = await res.json().catch(() => ({}));
  console.log(`  HTTP ${res.status}`);
  console.log(`  ClientContractId: ${data?.ClientContractId ?? null}`);
  console.log(`  Totals: ${JSON.stringify(data?.Totals ?? null)}`);
  console.log(`  PaymentProcessingFailures: ${JSON.stringify(data?.PaymentProcessingFailures ?? null)}`);
  if (data?.Error) console.log(`  ERROR: ${JSON.stringify(data.Error)}`);
}
