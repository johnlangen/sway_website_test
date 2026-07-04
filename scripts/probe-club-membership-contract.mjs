// Read-only probe: dump full JSON for the Premier Remedy Lounge Membership
// contract (143) on both club sites, plus its pricing-option details, so the
// website membership pages + purchase whitelist are built from verified data.
// Usage: node scripts/probe-club-membership-contract.mjs
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const API_KEY = env.MINDBODY_API_KEY;
const SITES = [
  { label: "RiNo", siteId: "5754020" },
  { label: "Central Park", siteId: "5754021" },
];
const CONTRACT_ID = 143;

async function getToken(siteId) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`token failed for ${siteId}: ${JSON.stringify(d)}`);
  return d.AccessToken;
}

async function mbGet(path, siteId, token, params = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const r = await fetch(url, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
  });
  return r.json().catch(() => ({}));
}

for (const site of SITES) {
  console.log(`\n========== ${site.label} (site ${site.siteId}) ==========`);
  const token = await getToken(site.siteId);
  const data = await mbGet("sale/contracts", site.siteId, token, {
    "request.contractIds": String(CONTRACT_ID),
    "request.locationId": "1",
  });
  const contracts = data?.Contracts ?? [];
  if (!contracts.length) {
    console.log("  NOT FOUND at locationId=1; retrying without location filter…");
    const d2 = await mbGet("sale/contracts", site.siteId, token, { "request.contractIds": String(CONTRACT_ID) });
    contracts.push(...(d2?.Contracts ?? []));
  }
  for (const c of contracts) {
    console.log(JSON.stringify(c, null, 2));
  }
}
