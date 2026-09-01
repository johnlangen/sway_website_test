// Read-only: find recent membership joins on all three sites, then pull each
// buyer's client contracts to see which were terminated and how quickly.
// Usage: node scripts/churn-check.mjs [daysBack]
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const DAYS = parseInt(process.argv[2] || "60", 10);

const SITES = [
  { label: "Larimer", siteId: env.MINDBODY_SITE_ID, user: env.MINDBODY_STAFF_USER3, pass: env.MINDBODY_STAFF_PASS3 },
  { label: "RiNo", siteId: "5754020", user: env.MINDBODY_STAFF_USER2, pass: env.MINDBODY_STAFF_PASS2 },
  { label: "Central Park", siteId: "5754021", user: env.MINDBODY_STAFF_USER2, pass: env.MINDBODY_STAFF_PASS2 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getToken(siteId, user, pass) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: user, Password: pass }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`token ${siteId}: ${r.status} ${JSON.stringify(d)}`);
  return d.AccessToken;
}

async function mb(path, siteId, token, params = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const r = await fetch(url, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
  });
  const d = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, data: d };
}

const now = new Date();
const startISO = new Date(now.getTime() - DAYS * 86400000).toISOString().slice(0, 19);
const endISO = now.toISOString().slice(0, 19);

let printedShape = false;

for (const { label, siteId, user, pass } of SITES) {
  console.log(`\n########## ${label} (site ${siteId}) — joins in last ${DAYS}d ##########`);
  let token;
  try { token = await getToken(siteId, user, pass); }
  catch (e) { console.log(`  TOKEN FAILED: ${e.message}`); continue; }

  // 1. pull sales, find membership purchases
  let all = [], offset = 0;
  for (;;) {
    const res = await mb("sale/sales", siteId, token, {
      StartSaleDateTime: startISO, EndSaleDateTime: endISO, limit: "200", offset: String(offset),
    });
    if (!res.ok) { console.log(`  sales fetch failed ${res.status}`); break; }
    const sales = res.data.Sales || [];
    all.push(...sales);
    const total = res.data.PaginationResponse?.TotalResults ?? all.length;
    offset += sales.length;
    if (!sales.length || all.length >= total) break;
  }

  const isMembership = (n = "") => /member|contract|autopay|monthly|unlimited|lounge/i.test(n);
  const buyers = new Map(); // clientId -> first membership sale info
  for (const s of all) {
    const items = (s.PurchasedItems || []).filter((i) => isMembership(i.Description || i.Name || ""));
    if (!items.length) continue;
    const hasContract = items.some((i) => i.ContractId != null);
    if (!hasContract) continue; // renewals/rebills excluded
    if (!buyers.has(s.ClientId)) {
      buyers.set(s.ClientId, {
        saleDate: s.SaleDateTime,
        items: items.map((i) => i.Description || i.Name).join(", "),
        amount: (s.Payments || []).reduce((a, p) => a + (p.Amount || 0), 0),
      });
    }
  }
  console.log(`  ${all.length} sales pulled, ${buyers.size} distinct new-join clients`);

  // 2. per buyer: name + contracts
  for (const [clientId, info] of buyers) {
    await sleep(120);
    const [cRes, kRes] = await Promise.all([
      mb("client/clients", siteId, token, { "request.clientIds": clientId, "request.limit": "1" }),
      mb("client/clientcontracts", siteId, token, { "request.clientId": clientId, "request.limit": "50" }),
    ]);
    const cl = (cRes.data.Clients || [])[0] || {};
    const name = `${cl.FirstName || "?"} ${cl.LastName || "?"}`;
    const contracts = kRes.data.Contracts || [];
    if (!printedShape && contracts.length) {
      console.log("  [contract fields sample]:", JSON.stringify(contracts[0]));
      printedShape = true;
    }
    for (const k of contracts) {
      const agreed = k.AgreementDate || k.StartDate || "?";
      const term = k.TerminationDate || null;
      const status = k.AutopayStatus || k.Status || "?";
      let flag = "";
      if (term) {
        const days = Math.round((new Date(term) - new Date(agreed)) / 86400000);
        flag = `  <<< TERMINATED after ${days}d`;
      } else if (/inactive|terminated|declined|cancel/i.test(String(status))) {
        flag = `  <<< status ${status}`;
      }
      console.log(`  ${name} (${clientId})  joined ${String(info.saleDate).slice(0, 10)}  $${info.amount}  [${k.ContractName || info.items}]  status=${status}  start=${String(k.StartDate||"?").slice(0,10)} end=${String(k.EndDate||"?").slice(0,10)} term=${term ? String(term).slice(0,10) : "-"}${flag}`);
    }
    if (!contracts.length) {
      console.log(`  ${name} (${clientId})  joined ${String(info.saleDate).slice(0, 10)}  $${info.amount}  [${info.items}]  NO CONTRACTS RETURNED`);
    }
  }
}
