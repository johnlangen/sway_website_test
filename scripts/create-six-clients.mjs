// Create the 6 bridge-period members who aren't in Mindbody yet (NOT_IN_MINDBODY
// from the enrollment dry-run). Dedup-checks by email AND phone first to avoid
// duplicates; creates at each member's purchase-location site; NO welcome
// emails/texts (these are existing club members, not new acquisitions).
// Writes created ClientIds to a mapping file. Real write (Test:false).
//
// Usage: node scripts/create-six-clients.mjs            (dry preview, no writes)
//        node scripts/create-six-clients.mjs --commit   (actually create)
import { readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const COMMIT = process.argv.includes("--commit");
const HOME = homedir();
const env = Object.fromEntries(
  readFileSync(join(process.cwd(), ".env.local"), "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const SITE = { "RiNo Station": "5754020", "Central Park": "5754021" };

function parseCSV(text) { const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) { const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
    else { if (c === '"') q = true; else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; } else if (c === "\r") {} else cur += c; } }
  if (cur || row.length) { row.push(cur); rows.push(row); } return rows; }
function dict(path) { const r = parseCSV(readFileSync(path, "utf8")); const h = r[0]; return r.slice(1).map((row) => Object.fromEntries(h.map((k, i) => [k, row[i] ?? ""]))); }

// the 6 target Customer IDs from the dry-run plan
const targets = dict(join(HOME, "sway-mindbody-migration", "enrollment-plan.csv"))
  .filter((r) => r.Note === "NOT_IN_MINDBODY")
  .map((r) => ({ cid: r.CustomerID.trim(), email: r.Email.trim(), site: r.Site.trim(), start: r.StartDate.trim() }));

// join full profile from fresh customers file
const profiles = {};
for (const r of dict(join(HOME, "report-customers-details (2).csv"))) profiles[r["Customer ID"].trim()] = r;

async function getToken(siteId) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", { method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }) });
  const d = await r.json(); if (!r.ok) throw new Error(`token ${siteId}: ${r.status}`); return d.AccessToken; }
async function search(siteId, token, text) {
  const url = new URL("https://api.mindbodyonline.com/public/v6/client/clients");
  url.searchParams.append("request.searchText", text); url.searchParams.append("request.limit", "20");
  const r = await fetch(url, { headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` } });
  return (await r.json().catch(() => ({}))).Clients || []; }
async function addClient(siteId, token, body) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/client/addclient", { method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId, authorization: token }, // NO Bearer
    body: JSON.stringify(body) });
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) }; }

const tokens = {}; for (const [loc, sid] of Object.entries(SITE)) tokens[loc] = await getToken(sid);
const digits = (s) => (s || "").replace(/[^\d]/g, "");
console.log(COMMIT ? "=== COMMIT MODE (creating) ===" : "=== PREVIEW (no writes; pass --commit to create) ===");

const created = [];
for (const t of targets) {
  const p = profiles[t.cid] || {};
  const sid = SITE[t.site], token = tokens[t.site];
  const phone = digits(p["Phone Number"]);
  const name = `${p["First Name"]} ${p["Last Name"]}`.trim();
  // dedup: exact email match OR same-phone match at the target site
  const byEmail = (await search(sid, token, t.email)).filter((c) => (c.Email || "").toLowerCase() === t.email.toLowerCase());
  const byPhone = phone ? (await search(sid, token, phone)).filter((c) => digits(c.MobilePhone) === phone || digits(c.HomePhone) === phone) : [];
  if (byEmail.length || byPhone.length) {
    console.log(`SKIP  ${name} <${t.email}> @ ${t.site} — possible existing match (email:${byEmail.length} phone:${byPhone.length}) ids=${[...byEmail,...byPhone].map(c=>c.Id).join(",")}`);
    continue;
  }
  const body = {
    FirstName: p["First Name"], LastName: p["Last Name"], Email: t.email, MobilePhone: phone || undefined,
    BirthDate: p["Birth Date"] || undefined,
    AddressLine1: p["Street"] || undefined, City: p["City"] || undefined, State: p["State/Province"] || undefined,
    PostalCode: p["Postal Code"] || undefined,
    SendAccountEmails: false, SendAccountTexts: false, SendScheduleEmails: false, SendScheduleTexts: false,
    SendPromotionalEmails: false, SendPromotionalTexts: false, Test: false,
  };
  if (!COMMIT) { console.log(`WOULD CREATE  ${name} <${t.email}> @ ${t.site} (phone ${phone||"none"}, start ${t.start})`); continue; }
  const res = await addClient(sid, token, body);
  if (res.ok && res.data?.Client?.Id) {
    console.log(`CREATED  ${name} -> ClientId ${res.data.Client.Id} @ ${t.site}`);
    created.push({ cid: t.cid, name, email: t.email, site: t.site, siteId: sid, newClientId: res.data.Client.Id, start: t.start });
  } else {
    console.log(`FAIL  ${name} <${t.email}> @ ${t.site}: ${res.status} ${JSON.stringify(res.data?.Error || res.data).slice(0,250)}`);
  }
}
if (COMMIT) writeFileSync(join(HOME, "sway-mindbody-migration", "created-six-clients.json"), JSON.stringify(created, null, 2));
console.log(`\n${COMMIT ? "Created" : "Would create"}: ${COMMIT ? created.length : targets.length} (see output above for skips/fails)`);
