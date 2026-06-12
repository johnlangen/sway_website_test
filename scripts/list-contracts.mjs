// Read-only probe: list Mindbody contracts (memberships/autopays) available
// for sale at each site, per location. No writes.
// Usage: node scripts/list-contracts.mjs
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const API_KEY = env.MINDBODY_API_KEY;

const SITES = [
  // Local .env.local MINDBODY_STAFF_USER/PASS are stale for Larimer (403); USER3/PASS3 works.
  { label: "Larimer", siteId: env.MINDBODY_SITE_ID, user: env.MINDBODY_STAFF_USER3, pass: env.MINDBODY_STAFF_PASS3 },
  { label: "RiNo", siteId: "5754020", user: env.MINDBODY_STAFF_USER2, pass: env.MINDBODY_STAFF_PASS2 },
  { label: "Central Park", siteId: "5754021", user: env.MINDBODY_STAFF_USER2, pass: env.MINDBODY_STAFF_PASS2 },
];

async function mb(path, siteId, token, params = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Api-Key": API_KEY,
      SiteId: siteId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function getToken(siteId, user, pass) {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: user, Password: pass }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token ${siteId}: ${res.status} ${JSON.stringify(data)}`);
  return data.AccessToken;
}

const money = (m) => (m && m.Total != null ? `$${m.Total}` : "?");

for (const site of SITES) {
  console.log(`\n========== ${site.label} (site ${site.siteId}) ==========`);
  let token;
  try {
    token = await getToken(site.siteId, site.user, site.pass);
  } catch (e) {
    console.log(`  TOKEN FAILED: ${e.message}`);
    continue;
  }

  const locs = await mb("site/locations", site.siteId, token, { limit: "10" });
  const locations = locs.data.Locations || [];
  if (!locations.length) {
    console.log(`  locations ERROR ${locs.status}: ${JSON.stringify(locs.data).slice(0, 200)}`);
    continue;
  }

  for (const loc of locations) {
    console.log(`\n  -- Location ${loc.Id}: "${loc.Name}" --`);
    const r = await mb("sale/contracts", site.siteId, token, {
      "request.locationId": String(loc.Id),
      "request.limit": "100",
    });
    if (!r.ok) {
      console.log(`  contracts ERROR ${r.status}: ${JSON.stringify(r.data?.Error || r.data).slice(0, 300)}`);
      continue;
    }
    const contracts = r.data.Contracts || [];
    if (!contracts.length) {
      console.log("  (no contracts)");
      continue;
    }
    for (const c of contracts) {
      const sched = c.AutopaySchedule
        ? `${c.AutopaySchedule.FrequencyType}/${c.AutopaySchedule.FrequencyValue} ${c.AutopaySchedule.FrequencyTimeUnit}`
        : "none";
      console.log(
        `  [${c.Id}] "${c.Name}" — soldOnline=${c.SoldOnline} | first=${money(c.FirstPaymentAmount)} recurring=${money(c.RecurringPaymentAmount)} | autopay=${sched} x${c.NumberOfAutopays ?? "?"} → ${c.ActionUponCompletionOfAutopays ?? "?"}`
      );
      console.log(
        `        intro=${c.IntroOffer ?? "?"} chargedOn=${c.ClientsChargedOn ?? "?"} deposit=${c.DepositAmount ?? 0} firstFree=${c.FirstAutopayFree ?? false} eConfirm=${c.RequiresElectronicConfirmation ?? false} terminateOnline=${c.ClientTerminateOnline ?? false} agreementTerms=${c.AgreementTerms ? `${String(c.AgreementTerms).length} chars` : "none"}`
      );
      for (const item of c.ContractItems || []) {
        console.log(`        item: [${item.Id}] "${item.Name}" type=${item.Type} price=$${item.Price} qty=${item.Quantity}${item.OneTimeItem ? " (one-time)" : ""}`);
      }
    }
  }
}
