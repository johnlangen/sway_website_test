// Read-only: any sales on the club sites (RiNo / Central Park) since the
// membership pages shipped (2026-07-04)? Surfaces contract/membership items
// and flags online/API sales. Usage: node scripts/club-membership-sales-check.mjs [startDate]
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
const START = process.argv[2] || "2026-07-04";

async function getToken(siteId) {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`token ${siteId}`);
  return d.AccessToken;
}

for (const { label, siteId } of SITES) {
  console.log(`\n===== ${label} (site ${siteId}) — sales since ${START} =====`);
  const token = await getToken(siteId);
  let offset = 0;
  let all = [];
  while (true) {
    const url = new URL("https://api.mindbodyonline.com/public/v6/sale/sales");
    url.searchParams.append("StartSaleDateTime", `${START}T00:00:00`);
    url.searchParams.append("EndSaleDateTime", "2026-12-31T00:00:00");
    url.searchParams.append("limit", "200");
    url.searchParams.append("offset", String(offset));
    const r = await fetch(url, {
      headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { console.log(`  sales fetch failed: ${r.status}`); break; }
    const sales = d?.Sales ?? [];
    all.push(...sales);
    if (sales.length < 200) break;
    offset += 200;
  }
  if (!all.length) {
    console.log("  (no sales at all in window)");
    continue;
  }
  for (const s of all) {
    const items = (s.PurchasedItems ?? [])
      .map((i) => `${i.Description ?? i.Id}${i.IsService === false ? "" : ""} $${i.TotalAmount ?? "?"}`)
      .join(" | ");
    const isMembership = (s.PurchasedItems ?? []).some((i) =>
      /membership/i.test(i.Description ?? "")
    );
    console.log(
      `  ${s.SaleDateTime}  sale#${s.Id}  client ${s.ClientId}  ${isMembership ? "** MEMBERSHIP **" : ""}  ${items}`
    );
  }
  console.log(`  total sales in window: ${all.length}`);
}
