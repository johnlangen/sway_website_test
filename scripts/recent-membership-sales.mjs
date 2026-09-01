// Read-only: pull recent Larimer sales from Mindbody, surface membership/contract
// purchases, and flag online/API sales (SalesRepId null) vs front-desk closes.
// Usage: node scripts/recent-membership-sales.mjs [days]
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const API_KEY = env.MINDBODY_API_KEY;
const SITE_ID = env.MINDBODY_SITE_ID; // Larimer
const USER = env.MINDBODY_STAFF_USER3;
const PASS = env.MINDBODY_STAFF_PASS3;
const DAYS = parseInt(process.argv[2] || "60", 10);

async function getToken() {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE_ID },
    body: JSON.stringify({ Username: USER, Password: PASS }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token: ${res.status} ${JSON.stringify(data)}`);
  return data.AccessToken;
}

async function getSales(token, startISO, endISO, offset) {
  const url = new URL("https://api.mindbodyonline.com/public/v6/sale/sales");
  url.searchParams.append("StartSaleDateTime", startISO);
  url.searchParams.append("EndSaleDateTime", endISO);
  url.searchParams.append("limit", "200");
  url.searchParams.append("offset", String(offset));
  const res = await fetch(url, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: SITE_ID, Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`sales: ${res.status} ${JSON.stringify(data)}`);
  return data;
}

const now = new Date();
const start = new Date(now.getTime() - DAYS * 86400000);
const startISO = start.toISOString().slice(0, 19);
const endISO = now.toISOString().slice(0, 19);

const token = await getToken();
let offset = 0;
let all = [];
for (;;) {
  const data = await getSales(token, startISO, endISO, offset);
  const sales = data.Sales || [];
  all = all.concat(sales);
  const total = data.PaginationResponse?.TotalResults ?? all.length;
  offset += sales.length;
  if (!sales.length || all.length >= total) break;
}

console.log(`Pulled ${all.length} sales at Larimer over last ${DAYS} days (${startISO} → ${endISO})\n`);

// Heuristic: a membership/contract shows up as a PurchasedItem whose name or
// type references membership/contract/autopay, OR the sale carries a contract.
const isMembership = (name = "") =>
  /member|contract|autopay|monthly|unlimited/i.test(name);

// Classify each membership-related sale:
//   NEW signup     = a PurchasedItem with ContractId != null
//   AUTOPAY renewal = membership item with ContractId == null (recurring rebill)
const newJoins = [];
const renewals = [];
for (const s of all) {
  const items = (s.PurchasedItems || []).filter(
    (i) => isMembership(i.Description || i.Name || "")
  );
  if (!items.length) continue;
  const names = items.map((i) => i.Description || i.Name || i.BarcodeId);
  const hasContract = items.some((i) => i.ContractId != null);
  const rec = {
    date: s.SaleDateTime,
    client: s.ClientId,
    rep: s.SalesRepId ?? null,
    total: (s.Payments || []).reduce((a, p) => a + (p.Amount || 0), 0),
    items: names,
  };
  (hasContract ? newJoins : renewals).push(rec);
}

const midpoint = new Date(now.getTime() - 30 * 86400000);
const inRecent = (d) => new Date(d) >= midpoint;

console.log("=== NEW MEMBERSHIP SIGNUPS (ContractId set) ===");
for (const m of newJoins) {
  const ch = m.rep == null ? "ONLINE (no rep)" : `front-desk ${m.rep}`;
  console.log(`${m.date}  $${m.total}  [${ch}]  ${m.items.join(", ")}`);
}

const split = (arr) => {
  const recent = arr.filter((m) => inRecent(m.date));
  const prior = arr.filter((m) => !inRecent(m.date));
  const onl = (a) => a.filter((m) => m.rep == null).length;
  return { recent: recent.length, prior: prior.length,
           recentOnline: onl(recent), priorOnline: onl(prior),
           recentDesk: recent.length - onl(recent), priorDesk: prior.length - onl(prior) };
};

const nj = split(newJoins);
const rn = split(renewals);

console.log("\n================ SUMMARY ================");
console.log(`Window: last 60 days, split at 30d (recent = last 30d)\n`);
console.log("NEW SIGNUPS (genuine new members):");
console.log(`  recent 30d: ${nj.recent}  (online ${nj.recentOnline} / front-desk ${nj.recentDesk})`);
console.log(`  prior  30d: ${nj.prior}  (online ${nj.priorOnline} / front-desk ${nj.priorDesk})`);
console.log("\nAUTOPAY RENEWALS (recurring rebills, not new sales):");
console.log(`  recent 30d: ${rn.recent}   prior 30d: ${rn.prior}`);
