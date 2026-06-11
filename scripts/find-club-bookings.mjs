// Read-only: scan upcoming appointments at both club sites and cross-check
// lounge bookings (whose Notes record selected saunas) against actual sauna
// appointments for the same client.
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const API_KEY = env.MINDBODY_API_KEY;

const CLUBS = [
  { label: "RiNo", siteId: "5754020", staff: [100000004, 100000005, 100000006] },
  { label: "Central Park", siteId: "5754021", staff: [100000002, 100000003, 100000004] },
];

async function getToken(siteId) {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: env.MINDBODY_STAFF_USER2, Password: env.MINDBODY_STAFF_PASS2 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token ${siteId}: ${res.status}`);
  return data.AccessToken;
}

async function staffAppts(siteId, token, staffId, start, end) {
  const url = new URL("https://api.mindbodyonline.com/public/v6/appointment/staffappointments");
  url.searchParams.append("staffIds", String(staffId));
  url.searchParams.append("startDate", `${start}T00:00:00`);
  url.searchParams.append("endDate", `${end}T23:59:59`);
  url.searchParams.append("locationIds", "1");
  url.searchParams.append("limit", "200");
  const res = await fetch(url, {
    headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: siteId, Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  return data?.Appointments ?? [];
}

const start = "2026-06-08";
const end = "2026-06-22";

for (const club of CLUBS) {
  console.log(`\n========== ${club.label} ==========`);
  const token = await getToken(club.siteId);
  const all = [];
  for (const sid of club.staff) {
    const appts = await staffAppts(club.siteId, token, sid, start, end);
    all.push(...appts.map((a) => ({ ...a, _staff: sid })));
  }
  all.sort((a, b) => (a.StartDateTime < b.StartDateTime ? -1 : 1));
  for (const a of all) {
    console.log(
      `  ${a.StartDateTime} → ${a.EndDateTime} | apptId=${a.Id} | ST=${a.SessionTypeId} staff=${a._staff} | client=${a.ClientId} | status=${a.Status}` +
        (a.Notes ? `\n      notes: ${String(a.Notes).replace(/\n/g, " ")}` : "")
    );
  }
  if (!all.length) console.log("  (no appointments in range)");
}
