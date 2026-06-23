// DRY-RUN probe (Test:true, no commit). Does Mindbody let us pin a specific
// infrared cabin Resource on an addappointment for CP (site 5754021)?
// Tries baseline (no resource) + two field shapes for the resource, and dumps
// what comes back. The only thing that could be a real write is test-client
// creation — this script does NOT create a client; it only searches.
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const USER = env.MINDBODY_STAFF_USER2;
const PASS = env.MINDBODY_STAFF_PASS2;
const SITE = "5754021"; // Central Park
const INFRARED_ST = 133;
const INFRARED_STAFF = 100000003;
const CABIN_RESOURCE = 9; // "Infrared Sauna 1"

async function getToken() {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST", headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE },
    body: JSON.stringify({ Username: USER, Password: PASS }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token: ${res.status} ${JSON.stringify(data)}`);
  return data.AccessToken;
}
async function mb(method, path, token, { params = {}, body } = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const res = await fetch(url, {
    method,
    headers: { Accept: "application/json", "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE, Authorization: `Bearer ${token}` },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
}

const token = await getToken();

// Find an existing TEST client (search-only, no create).
const search = await mb("GET", "client/clients", token, { params: { "request.searchText": "test", "request.limit": "10" } });
const candidates = search.data.Clients || [];
const client = candidates.find((c) => /test/i.test(`${c.FirstName} ${c.LastName} ${c.Email}`));
if (!client) {
  console.log("No existing TEST client found on CP. Candidates seen:", candidates.map((c) => `${c.Id}:${c.FirstName} ${c.LastName}`));
  console.log("Stopping — not creating a client without your OK.");
  process.exit(0);
}
console.log(`Using TEST client ${client.Id} (${client.FirstName} ${client.LastName})`);

// A valid future infrared window (yesterday's probe showed windows from 08:00).
const day = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const start = `${day}T09:00:00`;
const end = `${day}T09:25:00`;

const base = { Test: true, ClientId: String(client.Id), SessionTypeId: INFRARED_ST, StaffId: INFRARED_STAFF, LocationId: 1, StartDateTime: start, EndDateTime: end, ApplyPayment: false, SendEmail: false };

async function probe(label, extra) {
  const r = await mb("POST", "appointment/addappointment", token, { body: { ...base, ...extra } });
  const appt = r.data?.Appointment ?? r.data;
  console.log(`\n--- ${label} ---  ok=${r.ok} status=${r.status}`);
  if (!r.ok) { console.log("  error:", JSON.stringify(r.data?.Error ?? r.data).slice(0, 300)); return; }
  console.log("  Resources field:", JSON.stringify(appt?.Resources ?? "(none returned)"));
  console.log("  appt keys:", Object.keys(appt || {}).join(", "));
}

await probe("baseline (no resource)", {});
await probe("Resources:[{Id:9}]", { Resources: [{ Id: CABIN_RESOURCE }] });
await probe("ResourceIds:[9]", { ResourceIds: [CABIN_RESOURCE] });
