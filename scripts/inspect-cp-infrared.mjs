// READ-ONLY. Dump full ResourceAvailabilities for CP infrared (ST 133) and map
// resource ids -> names, to see if cabins 9-12 are exposed per slot.
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
const SITE = "5754021";

async function mb(path, token, params = {}) {
  const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
  const res = await fetch(url, { headers: { Accept: "application/json", "Api-Key": API_KEY, SiteId: SITE, ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
}
async function getToken() {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", { method: "POST", headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE }, body: JSON.stringify({ Username: USER, Password: PASS }) });
  const data = await res.json();
  if (!res.ok) throw new Error(`token: ${res.status}`);
  return data.AccessToken;
}

const token = await getToken();
const day = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const names = {};
const r = await mb("site/resources", token, { limit: "200" });
for (const x of r.data.Resources || []) names[x.Id] = x.Name;

const bi = await mb("appointment/bookableitems", token, {
  "request.sessionTypeIds[0]": "133",
  "request.locationIds[0]": "1",
  "request.startDate": `${day}T00:00:00`,
  "request.endDate": `${day}T23:59:59`,
  "request.includeResourceAvailability": "true",
  "request.limit": "3",
});
const av = (bi.data.Availabilities || [])[0];
console.log("ResourceAvailabilities for first infrared slot:");
for (const ra of av?.ResourceAvailabilities || []) {
  console.log(`  Resource ${ra.ResourceId} "${names[ra.ResourceId] ?? "?"}"  ${ra.StartDateTime} -> ${ra.EndDateTime}`);
}
