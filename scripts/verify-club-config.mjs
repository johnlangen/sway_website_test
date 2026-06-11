// Read-only verification of club Mindbody config (RiNo + Central Park).
// Checks: session type names, resource "staff" names, and bookableitems for
// each lounge/sauna pairing. No writes.
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const API_KEY = env.MINDBODY_API_KEY;
const USER = env.MINDBODY_STAFF_USER2;
const PASS = env.MINDBODY_STAFF_PASS2;

const CLUBS = [
  {
    label: "RiNo",
    siteId: "5754020",
    lounge: { st: 132, staff: 100000004 },
    saunas: [
      { key: "traditional", st: 133, staff: 100000005 },
      { key: "infrared", st: 134, staff: 100000006 },
    ],
  },
  {
    label: "Central Park",
    siteId: "5754021",
    lounge: { st: 132, staff: 100000002 },
    saunas: [
      { key: "traditional", st: 134, staff: 100000004 },
      { key: "infrared", st: 133, staff: 100000003 },
    ],
  },
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

async function getToken(siteId) {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: siteId },
    body: JSON.stringify({ Username: USER, Password: PASS }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token ${siteId}: ${res.status} ${JSON.stringify(data)}`);
  return data.AccessToken;
}

const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

for (const club of CLUBS) {
  console.log(`\n========== ${club.label} (site ${club.siteId}) ==========`);
  const token = await getToken(club.siteId);

  const st = await mb("site/sessiontypes", club.siteId, token, { limit: "100" });
  const types = (st.data.SessionTypes || []).filter((t) =>
    [132, 133, 134].includes(t.Id)
  );
  for (const t of types) {
    console.log(
      `  ST ${t.Id}: "${t.Name}" — ${t.DefaultTimeLength} min, type=${t.Type}, programId=${t.ProgramId}`
    );
  }

  const staff = await mb("staff/staff", club.siteId, token, { limit: "200" });
  const wanted = new Set([
    club.lounge.staff,
    ...club.saunas.map((s) => s.staff),
  ]);
  for (const s of staff.data.StaffMembers || []) {
    if (wanted.has(s.Id)) {
      console.log(`  Staff ${s.Id}: "${s.FirstName} ${s.LastName}" appt=${s.AppointmentInstructor}`);
    }
  }

  // bookableitems per pairing for tomorrow
  const pairings = [
    { name: "lounge", st: club.lounge.st, staff: club.lounge.staff },
    ...club.saunas.map((s) => ({ name: s.key, st: s.st, staff: s.staff })),
  ];
  for (const p of pairings) {
    const r = await mb("appointment/bookableitems", club.siteId, token, {
      "request.sessionTypeIds[0]": String(p.st),
      "request.locationIds[0]": "1",
      "request.startDate": `${tomorrow}T00:00:00`,
      "request.endDate": `${tomorrow}T23:59:59`,
      "request.staffIds[0]": String(p.staff),
      "request.limit": "10",
    });
    const av = r.data.Availabilities || [];
    const first = av[0];
    console.log(
      `  bookableitems ${p.name} (ST ${p.st} × staff ${p.staff}): ${r.ok ? `${av.length} windows` : `ERROR ${r.status} ${JSON.stringify(r.data?.Error || r.data).slice(0, 200)}`}` +
        (first
          ? ` — first: ${first.StartDateTime} → ${first.BookableEndDateTime} (staff ${first.Staff?.Id} "${first.Staff?.FirstName} ${first.Staff?.LastName}")`
          : "")
    );
  }
}
