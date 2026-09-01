// Dry-run probe (Test:true, NOTHING committed/charged/sent): does a future
// StartDate defer the first autopay, or does it fire on creation?
// Runs purchasecontract in Test mode on the Larimer spavia.com test client
// (100005390) across several StartDate / FirstPaymentOccurs combos and prints
// the Totals + any date/schedule fields so we can see the deferral behavior.
// Clubs are clones of Larimer, so the platform behavior transfers.
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY, SITE = env.MINDBODY_SITE_ID;
const CLIENT = "100005390";       // Test SwayMembership (spavia.com), card 4242
const CONTRACT = "122";           // Essential Membership $99/mo auto-renew (Larimer)

const token = await (await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
  method: "POST", headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE },
  body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER3, Password: env.MINDBODY_STAFF_PASS3 }),
})).json().then((d) => d.AccessToken);

async function dryRun(label, body) {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/sale/purchasecontract", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "Api-Key": API_KEY, SiteId: SITE, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ClientId: CLIENT, ContractId: CONTRACT, LocationId: 1, Test: true, SendNotifications: false, StoredCardInfo: { LastFour: "4242" }, ...body }),
  });
  const data = await res.json().catch(() => ({}));
  console.log(`\n===== ${label} =====  (HTTP ${res.status})`);
  if (!res.ok) { console.log("  ERROR:", JSON.stringify(data).slice(0, 400)); return; }
  const cc = data.ClientContract || data;
  console.log("  ClientContractId:", data.ClientContractId ?? cc.Id ?? "(null = nothing committed)");
  // surface anything that looks like a schedule/date/amount
  const interesting = {};
  const scan = (obj, prefix = "") => {
    for (const [k, v] of Object.entries(obj || {})) {
      if (v && typeof v === "object" && !Array.isArray(v)) scan(v, prefix + k + ".");
      else if (/date|payment|autopay|start|amount|total|charge|next|first/i.test(k)) interesting[prefix + k] = v;
    }
  };
  scan(data);
  for (const [k, v] of Object.entries(interesting)) console.log(`  ${k}: ${v}`);
}

await dryRun("A) StartDate=TODAY, FirstPaymentOccurs=Instant (baseline = charge now)", { StartDate: "2026-06-25", FirstPaymentOccurs: "Instant" });
await dryRun("B) StartDate=2026-07-20 (future), FirstPaymentOccurs=Instant", { StartDate: "2026-07-20", FirstPaymentOccurs: "Instant" });
await dryRun("C) StartDate=2026-07-20 (future), FirstPaymentOccurs=StartDate (defer to anniversary)", { StartDate: "2026-07-20", FirstPaymentOccurs: "StartDate" });
await dryRun("D) StartDate=2026-07-20 (future), no FirstPaymentOccurs", { StartDate: "2026-07-20" });
