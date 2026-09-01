// Read-only reconciliation: for each PAYING active club member (rate>0) from the
// June 12 Mariana Tek membership export, check Mindbody for (a) loaded profile,
// (b) card on file, (c) any existing contract. No writes. Writes a CSV artifact;
// prints only aggregate counts to stdout (PII stays in the file).
//
// Usage: node scripts/reconcile-club-members.mjs
import { readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;

const SITE = {
  "RiNo Station": "5754020",
  "Central Park": "5754021",
};

async function getToken(siteId) {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token ${siteId}: ${res.status} ${JSON.stringify(data)}`);
  return data.AccessToken;
}

async function mb(path, siteId, token, params = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const res = await fetch(url, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

// --- tiny CSV parser (handles quoted fields) ---
function parseCSV(text) {
  const rows = [];
  let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c === "\r") {} else cur += c;
    }
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

const csvPath = join(homedir(), "sway-mindbody-migration", "sway-membership-details-20260612.csv");
const rows = parseCSV(readFileSync(csvPath, "utf8"));
const header = rows[0];
const idx = (name) => header.indexOf(name);
const C = {
  status: idx("Membership Status"), type: idx("Membership Type"), rate: idx("Renewal Rate"),
  email: idx("Customer Email"), cid: idx("Customer ID"), loc: idx("Purchase Location"),
  bill: idx("Start of Payment Interval"), contract: idx("Membership Contract"),
};

// cohort = active AND rate>0  (this already excludes all $0 staff/affiliate/comp)
const payers = rows.slice(1).filter((r) => {
  if (!r[C.status]) return false;
  if (r[C.status].trim().toLowerCase() !== "active") return false;
  const rate = parseFloat((r[C.rate] || "0").trim()) || 0;
  return rate > 0;
});

console.log(`Paying active members to reconcile: ${payers.length}`);

const tokens = {};
for (const [loc, siteId] of Object.entries(SITE)) {
  try { tokens[loc] = await getToken(siteId); console.log(`  token OK: ${loc} (${siteId})`); }
  catch (e) { console.log(`  TOKEN FAILED ${loc}: ${e.message}`); }
}

const out = [["CustomerID","Email","PurchaseLocation","SiteId","Found","Matches","ClientId","HasCard","LastFour","ExistingContracts","BillDate","Rate","Type","Contract"]];
const tally = { ready: 0, noCard: 0, notFound: 0, multi: 0, hasContract: 0, error: 0, noSite: 0 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let n = 0;
for (const r of payers) {
  n++;
  const email = (r[C.email] || "").trim();
  const loc = (r[C.loc] || "").trim();
  const siteId = SITE[loc];
  const base = { cid: r[C.cid], email, loc, bill: r[C.bill], rate: r[C.rate], type: r[C.type], contract: r[C.contract] };
  if (!siteId || !tokens[loc]) {
    tally.noSite++;
    out.push([base.cid, email, loc, siteId||"", "NO_SITE","","","","","",base.bill,base.rate,base.type,base.contract]);
    continue;
  }
  try {
    const res = await mb("client/clients", siteId, tokens[loc], { "request.searchText": email, "request.limit": "10" });
    if (!res.ok) { tally.error++; out.push([base.cid,email,loc,siteId,`ERR_${res.status}`,"","","","","",base.bill,base.rate,base.type,base.contract]); await sleep(120); continue; }
    const clients = (res.data.Clients || []).filter((c) => (c.Email || "").toLowerCase() === email.toLowerCase());
    if (clients.length === 0) {
      tally.notFound++;
      out.push([base.cid,email,loc,siteId,"NO","0","","","","",base.bill,base.rate,base.type,base.contract]);
      await sleep(120); continue;
    }
    const cl = clients[0];
    const lastFour = cl.ClientCreditCard?.LastFour || "";
    const hasCard = lastFour ? "Y" : "N";
    // existing contracts (avoid double-sell)
    let ec = "?";
    try {
      const cc = await mb("client/clientcontracts", siteId, tokens[loc], { "request.clientId": cl.Id, "request.limit": "50" });
      ec = cc.ok ? String((cc.data.Contracts || []).length) : "?";
      if (cc.ok && (cc.data.Contracts || []).length > 0) tally.hasContract++;
    } catch {}
    if (clients.length > 1) tally.multi++;
    if (hasCard === "Y") tally.ready++; else tally.noCard++;
    out.push([base.cid,email,loc,siteId,"YES",String(clients.length),cl.Id,hasCard,lastFour,ec,base.bill,base.rate,base.type,base.contract]);
  } catch (e) {
    tally.error++;
    out.push([base.cid,email,loc,siteId,"EXC","","","","","",base.bill,base.rate,base.type,base.contract]);
  }
  if (n % 25 === 0) console.log(`  ...${n}/${payers.length}`);
  await sleep(120);
}

const outPath = join(homedir(), "sway-mindbody-migration", "reconcile-output.csv");
writeFileSync(outPath, out.map((r) => r.map((v) => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n"));

console.log("\n===== RECONCILIATION SUMMARY =====");
console.log(`  Loaded + has card (READY to sell):   ${tally.ready}`);
console.log(`  Loaded + NO card (collect card):     ${tally.noCard}`);
console.log(`  NOT found in Mindbody (investigate): ${tally.notFound}`);
console.log(`  No site mapping:                     ${tally.noSite}`);
console.log(`  API errors:                          ${tally.error}`);
console.log(`  -- of the found: multiple-match emails: ${tally.multi}`);
console.log(`  -- of the found: ALREADY have a contract: ${tally.hasContract}`);
console.log(`\n  Full per-member detail written to: ${outPath}`);
