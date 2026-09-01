// Read-only follow-up to churn-check: (1) visit history for the recent Larimer
// quick-cancellers, (2) bookable-slot density at Larimer for the next 14 days.
// Usage: node scripts/churn-availability-check.mjs
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const SITE_ID = env.MINDBODY_SITE_ID; // Larimer

async function getToken() {
  const r = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE_ID },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER3, Password: env.MINDBODY_STAFF_PASS3 }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`token: ${r.status}`);
  return d.AccessToken;
}

async function mb(path, token, params = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const r = await fetch(url, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: SITE_ID, Authorization: `Bearer ${token}` },
  });
  const d = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, data: d };
}

const token = await getToken();

// ---- 1. what did the quick-cancellers actually do? ----
const CANCELLERS = [
  { id: "100007108", name: "Christine Southern (Essential, joined+cancelled 8/22)" },
  { id: "100006790", name: "Lea Viglione (Premier, joined 8/24, cancelled 8/26)" },
  { id: "100006659", name: "Tanner Wilcken (Remedy Room, joined 8/3, cancelled 8/20)" },
];
for (const c of CANCELLERS) {
  console.log(`\n===== ${c.name} =====`);
  const res = await mb("client/clientvisits", token, {
    "request.clientId": c.id,
    "request.startDate": "2026-06-01",
    "request.endDate": "2026-12-31",
  });
  if (!res.ok) { console.log(`  visits fetch failed ${res.status}: ${JSON.stringify(res.data).slice(0, 300)}`); continue; }
  const visits = res.data.Visits || [];
  if (!visits.length) console.log("  NO visits/appointments Jun 1 - Dec 31");
  for (const v of visits) {
    console.log(`  ${v.StartDateTime}  ${v.Name || v.ServiceName || "?"}  signedIn=${v.SignedIn}  cancelled=${v.LateCancelled ?? "?"}  appt=${v.AppointmentStatus ?? ""}`);
  }
}

// ---- 2. availability census: next 14 days ----
const TYPES = [
  { id: "88", label: "Essential Signature Massage" },
  { id: "100", label: "Premier Deep Tissue Massage" },
  { id: "75", label: "Essential Signature Facial" },
  { id: "96", label: "Remedy Room Experience" },
];
console.log("\n===== LARIMER BOOKABLE SLOTS, next 14 days =====");
console.log("day        " + TYPES.map((t) => t.label.padStart(28)).join(""));
const today = new Date();
for (let d = 1; d <= 14; d++) {
  const day = new Date(today.getTime() + d * 86400000);
  const iso = day.toISOString().slice(0, 10);
  const dow = day.toLocaleDateString("en-US", { weekday: "short", timeZone: "America/Denver" });
  const counts = [];
  for (const t of TYPES) {
    const res = await mb("appointment/bookableitems", token, {
      "request.sessionTypeIds": t.id,
      "request.startDate": iso,
      "request.endDate": iso,
    });
    if (!res.ok) { counts.push("ERR"); continue; }
    const avails = res.data.Availabilities || [];
    // distinct start times (collapse multi-staff same-time), plus raw slot count
    const starts = new Set(avails.map((a) => a.StartDateTime));
    counts.push(`${starts.size} times/${avails.length} slots`);
  }
  console.log(`${iso} ${dow}  ` + counts.map((c) => String(c).padStart(28)).join(""));
}
