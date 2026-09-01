// DRY-RUN enrollment plan for the club Founding-membership migration.
// NOTHING is committed/charged/emailed — every purchasecontract call is Test:true.
// For each FRESH active paying member (dedup by Customer ID, rate>0, minus the
// payment-failure list), it: resolves their July StartDate from the forecast
// report, looks up their Mindbody client + card, and dry-runs the deferred
// Founding [100] purchase to confirm $0-at-creation. Writes a per-member plan CSV.
//
// Usage: node scripts/enroll-club-members-dryrun.mjs
import { readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const HOME = homedir();
const env = Object.fromEntries(
  readFileSync(join(process.cwd(), ".env.local"), "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const SITE = { "RiNo Station": "5754020", "Central Park": "5754021" };
const CONTRACT = "100";           // Founding Membership $99/mo (both club sites)
const JULY_FLOOR = "2026-07-01";  // first Mindbody-era charge (MT owns June)

// ---------- helpers ----------
function parseCSV(text) {
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) { const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
    else { if (c === '"') q = true; else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; } else if (c === "\r") {} else cur += c; } }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
function dict(path) { const r = parseCSV(readFileSync(path, "utf8")); const h = r[0]; return r.slice(1).map((row) => Object.fromEntries(h.map((k, i) => [k, row[i] ?? ""]))); }
function isoDate(s) { s = (s || "").trim(); let m;
  if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})/))) return `${m[1]}-${m[2]}-${m[3]}`;
  if ((m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/))) return `${m[3]}-${String(m[1]).padStart(2,"0")}-${String(m[2]).padStart(2,"0")}`;
  return null; }
const num = (s) => parseFloat((s || "0").replace(/,/g, "").trim()) || 0;

// ---------- load data ----------
const fc = dict(join(HOME, "report-membership-recurring-fees-forecast-details (1).csv"));
const startByCid = {};
for (const r of fc) { const cid = r["Customer ID"].trim(); const d = isoDate(r["Charge Date"]);
  if (!d || d < JULY_FLOOR) continue; if (!startByCid[cid] || d < startByCid[cid]) startByCid[cid] = d; }

const pf = new Set(dict(join(HOME, "report-customers-in-payment-failure (1).csv")).map((r) => r["Customer ID"].trim()));

// fresh active, paying, dedup by Customer ID
const seen = new Set(); const members = [];
for (const r of dict(join(HOME, "report-membership-details (2).csv"))) {
  if (r["Membership Status"].trim().toLowerCase() !== "active") continue;
  if (num(r["Renewal Rate"]) <= 0) continue;
  const cid = r["Customer ID"].trim();
  if (seen.has(cid) || pf.has(cid)) continue;
  seen.add(cid);
  // StartDate: forecast July date, else derive from Purchase Date day-of-month
  let start = startByCid[cid];
  if (!start) { const pd = isoDate(r["Purchase Date"]); start = pd ? `2026-07-${pd.slice(8, 10)}` : null; }
  members.push({ cid, email: r["Customer Email"].trim(), loc: r["Purchase Location"].trim(),
    type: r["Membership Type"].trim(), rate: r["Renewal Rate"].trim(), start, startSrc: startByCid[cid] ? "forecast" : "derived" });
}
console.log(`Fresh active paying members (dedup, minus ${pf.size} payment-failure): ${members.length}`);

// ---------- API ----------
async function getToken(siteId) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", { method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }) });
  const d = await r.json(); if (!r.ok) throw new Error(`token ${siteId}: ${r.status}`); return d.AccessToken;
}
async function mbGet(path, siteId, token, params) { const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const r = await fetch(url, { headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` } });
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) }; }
async function dryPurchase(siteId, token, clientId, lastFour, startDate) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/sale/purchasecontract", { method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ Test: true, SendNotifications: false, LocationId: 1, ClientId: clientId, ContractId: CONTRACT,
      StartDate: startDate, FirstPaymentOccurs: "StartDate", StoredCardInfo: { LastFour: String(lastFour) } }) });
  const d = await r.json().catch(() => ({}));
  return { ok: r.ok, total: d?.Totals?.Total, committed: d?.ClientContractId ?? null, err: d?.Error?.Message || null }; }

const tokens = {};
for (const [loc, sid] of Object.entries(SITE)) { tokens[loc] = await getToken(sid); console.log(`  token OK ${loc}`); }

const out = [["CustomerID","Email","Site","StartDate","StartSrc","HasCard","DryRunTotal","DryRunOK","ClientId","Rate","Type","Note"]];
const t = { ready: 0, noCard: 0, notFound: 0, noStart: 0, dryFail: 0, noSite: 0 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let n = 0;
for (const m of members) {
  n++; const sid = SITE[m.loc]; const token = tokens[m.loc];
  const push = (found, hasCard, total, ok, clientId, note) => out.push([m.cid, m.email, m.loc, m.start || "", m.startSrc, hasCard, total ?? "", ok ?? "", clientId ?? "", m.rate, m.type, note]);
  if (!sid) { t.noSite++; push("", "", "", "", "", "NO_SITE_MAP"); continue; }
  if (!m.start) { t.noStart++; }
  try {
    const res = await mbGet("client/clients", sid, token, { "request.searchText": m.email, "request.limit": "10" });
    const clients = (res.data.Clients || []).filter((c) => (c.Email || "").toLowerCase() === m.email.toLowerCase());
    if (!clients.length) { t.notFound++; push("", "", "", "", "", "NOT_IN_MINDBODY"); await sleep(110); continue; }
    const cl = clients[0]; const lastFour = cl.ClientCreditCard?.LastFour || "";
    if (!lastFour) { t.noCard++; push("Y", "N", "", "", cl.Id, "NO_CARD"); await sleep(110); continue; }
    if (!m.start) { push("Y", "Y", "", "", cl.Id, "NO_STARTDATE"); await sleep(110); continue; }
    const dr = await dryPurchase(sid, token, cl.Id, lastFour, m.start);
    const ok = dr.ok && dr.committed === null && Number(dr.total) === 0;
    if (ok) t.ready++; else t.dryFail++;
    push("Y", "Y", dr.total, ok ? "Y" : `N:${dr.err || dr.total}`, cl.Id, ok ? "READY" : "DRYRUN_ISSUE");
  } catch (e) { push("", "", "", "", "", `EXC:${e.message}`); }
  if (n % 25 === 0) console.log(`  ...${n}/${members.length}`);
  await sleep(110);
}

const outPath = join(HOME, "sway-mindbody-migration", "enrollment-plan.csv");
writeFileSync(outPath, out.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n"));
console.log("\n===== ENROLLMENT DRY-RUN SUMMARY =====");
console.log(`  READY (card + dry-run $0 deferred OK): ${t.ready}`);
console.log(`  No card (collect):                     ${t.noCard}`);
console.log(`  Not in Mindbody (likely new delta):    ${t.notFound}`);
console.log(`  No StartDate resolved:                 ${t.noStart}`);
console.log(`  Dry-run issues (investigate):          ${t.dryFail}`);
console.log(`  No site mapping:                       ${t.noSite}`);
console.log(`\n  Per-member plan: ${outPath}`);
