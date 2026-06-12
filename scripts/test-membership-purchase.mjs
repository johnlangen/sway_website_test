// Membership purchase verification probe (Larimer).
// 1) Finds (or creates) a clearly-labeled TEST client with the 4242 test card.
// 2) Runs POST /sale/purchasecontract with Test:true (documented dry-run —
//    "validates input information, but does not commit it").
// The only real write is the one-time test client creation.
// Usage: node scripts/test-membership-purchase.mjs
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const API_KEY = env.MINDBODY_API_KEY;
const SITE_ID = env.MINDBODY_SITE_ID; // Larimer
// .env.local USER/PASS are stale for Larimer; USER3/PASS3 is the working login.
const USER = env.MINDBODY_STAFF_USER3;
const PASS = env.MINDBODY_STAFF_PASS3;

const TEST_EMAIL = "testswaymembership@spavia.com";
const TEST_CARD = "4242424242424242";

async function getToken() {
  const res = await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": API_KEY, SiteId: SITE_ID },
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
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Api-Key": API_KEY,
      SiteId: SITE_ID,
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

const token = await getToken();

// --- 1) find or create test client ---
let client;
const found = await mb("GET", "client/clients", token, {
  params: { "request.searchText": TEST_EMAIL, "request.limit": "1" },
});
client = found.data.Clients?.[0];

if (client) {
  console.log(`Found existing test client ${client.Id} (${client.FirstName} ${client.LastName})`);
} else {
  console.log("No test client found — creating one (REAL write, clearly labeled TEST)...");
  const created = await mb("POST", "client/addclient", token, {
    body: {
      FirstName: "Test",
      LastName: "SwayMembership",
      Email: TEST_EMAIL,
      MobilePhone: "3035550199",
      ClientCreditCard: {
        CardNumber: TEST_CARD,
        ExpMonth: 12,
        ExpYear: 2030,
        PostalCode: "80202",
        CardHolder: "Test SwayMembership",
        CardType: "Visa",
        Address: "1428 Larimer St",
        City: "Denver",
        State: "CO",
      },
      SendAccountEmails: false,
      SendAccountTexts: false,
      SendScheduleEmails: false,
      SendScheduleTexts: false,
      SendPromotionalEmails: false,
      SendPromotionalTexts: false,
      Test: false,
    },
  });
  if (!created.ok) {
    console.log(`addclient FAILED ${created.status}: ${JSON.stringify(created.data).slice(0, 500)}`);
    process.exit(1);
  }
  client = created.data.Client;
  console.log(
    `Created client ${client.Id} — mbStatus=${created.data.Status} cardLastFour=${client.ClientCreditCard?.LastFour ?? "NOT SAVED"}`
  );
}

const lastFour = client.ClientCreditCard?.LastFour ?? TEST_CARD.slice(-4);
console.log(`Client ${client.Id}, stored card last four: ${client.ClientCreditCard?.LastFour ?? "(none on record yet)"}`);

// --- 2) Test:true purchasecontract dry-runs ---
const attempts = [
  {
    label: "Essential [122] via StoredCardInfo",
    body: {
      Test: true,
      LocationId: 1,
      ClientId: String(client.Id),
      ContractId: 122,
      StartDate: new Date().toISOString().slice(0, 10),
      FirstPaymentOccurs: "Instant",
      SendNotifications: false,
      StoredCardInfo: { LastFour: lastFour },
    },
  },
  {
    label: "Essential [122] via CreditCardInfo (fresh card)",
    body: {
      Test: true,
      LocationId: 1,
      ClientId: String(client.Id),
      ContractId: 122,
      StartDate: new Date().toISOString().slice(0, 10),
      FirstPaymentOccurs: "Instant",
      SendNotifications: false,
      CreditCardInfo: {
        CreditCardNumber: TEST_CARD,
        ExpMonth: 12,
        ExpYear: 2030,
        BillingName: "Test SwayMembership",
        BillingAddress: "1428 Larimer St",
        BillingCity: "Denver",
        BillingState: "CO",
        BillingPostalCode: "80202",
        SaveInfo: true,
      },
    },
  },
  {
    label: "Remedy Room [102] via StoredCardInfo",
    body: {
      Test: true,
      LocationId: 1,
      ClientId: String(client.Id),
      ContractId: 102,
      StartDate: new Date().toISOString().slice(0, 10),
      FirstPaymentOccurs: "Instant",
      SendNotifications: false,
      StoredCardInfo: { LastFour: lastFour },
    },
  },
];

for (const a of attempts) {
  const r = await mb("POST", "sale/purchasecontract", token, { body: a.body });
  console.log(`\n--- ${a.label} ---`);
  console.log(`HTTP ${r.status} ${r.ok ? "OK" : "FAIL"}`);
  console.log(JSON.stringify(r.data, null, 2).slice(0, 1500));
}
