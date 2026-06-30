// Seed the Club Desk dashboard from the local Mariana Tek CSVs by POSTing to the
// deployed /api/clubdesk seed endpoint (data goes straight to Redis, never the
// repo). Reuses WAITLIST_ADMIN_SECRET from .env.local.
//
//   node scripts/seed-clubdesk.mjs                 (seeds production)
//   node scripts/seed-clubdesk.mjs http://localhost:3000
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const HOME = homedir();
const PROD = process.argv[2] || "https://swaywellnessspa.com";
const env = Object.fromEntries(
  readFileSync(join(process.cwd(), ".env.local"), "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const SECRET = process.env.SEED_SECRET || env.WAITLIST_ADMIN_SECRET;
if (!SECRET) { console.error("WAITLIST_ADMIN_SECRET missing from .env.local"); process.exit(1); }

function parseCSV(t){const r=[];let row=[],c="",q=false;for(let i=0;i<t.length;i++){const ch=t[i];if(q){if(ch=='"'&&t[i+1]=='"'){c+='"';i++;}else if(ch=='"')q=false;else c+=ch;}else{if(ch=='"')q=true;else if(ch==","){row.push(c);c="";}else if(ch=="\n"){row.push(c);r.push(row);row=[];c="";}else if(ch=="\r"){}else c+=ch;}}if(c||row.length){row.push(c);r.push(row);}return r;}
function dict(p){const r=parseCSV(readFileSync(p,"utf8"));const h=r[0];return r.slice(1).filter(row=>row.some(x=>x!=="")).map((row)=>Object.fromEntries(h.map((k,i)=>[k,(row[i]??"").trim()])));}
const money=(s)=>{const n=parseFloat((s||"0").replace(/[$,]/g,""));return Number.isFinite(n)?n:0;};

// --- gift cards: unredeemed only ---
const giftcards = dict(join(HOME, "report-gift-cards (1).csv"))
  .filter((r) => !r["Redemption Date"])
  .map((r) => ({
    id: r["Gift Card Code"],
    recipient: r["Recipient Name"] || r["Purchased By"],
    name: r["Purchased By"],
    email: r["Recipient Email"] || r["Purchased By Customer Email"],
    value: money(r["Value"]),
    balance: money(r["Value"]),
    location: r["Purchase Location"],
    type: r["Gift Card Type"],
  }));

// --- credits: recovery/modality, non-expired ---
const HONOR = ["Recovery Drop-In", "10 Modality Pack", "10 Modality Guest Pack"];
const credits = dict(join(HOME, "report-outstanding-credits.csv"))
  .filter((r) => HONOR.includes(r["Credit Package"]) && r["Is Expired"].toLowerCase() === "false")
  .map((r) => ({
    id: r["Credit Package ID"],
    name: r["Customer"],
    email: r["Customer Email"],
    package: r["Credit Package"],
    remaining: r["Credits Remaining"],
    expires: (r["Package Expiration Date"] || "").slice(0, 10),
    location: r["Purchase Location"],
  }));

// --- cards to collect: the membership no-card / new list ---
const cards = dict(join(HOME, "sway-mindbody-migration", "front-desk-collect-list.csv"))
  .map((r) => ({
    id: r["Email"],
    name: r["Name"],
    phone: r["Phone"],
    email: r["Email"],
    location: r["Location"],
    startDate: r["JulyChargeDate"],
    reason: r["Reason"],
  }));

// --- needs attention: frozen + payment-failure members ---
const attention = dict(join(HOME, "sway-mindbody-migration", "needs-attention.csv"))
  .map((r) => ({
    id: r["CustomerID"],
    name: r["Name"],
    email: r["Email"],
    status: r["Status"],
    amountOwed: r["AmountOwed"],
    since: r["Since"],
    membership: r["Membership"],
    location: r["Location"],
  }));

// --- day passes: unredeemed All Access Visit Passes (paid + comp) ---
const daypasses = dict(join(HOME, "sway-mindbody-migration", "day-passes-to-honor.csv"))
  .map((r) => ({
    id: `${r["Email"] || r["Name"]}|${r["Type"]}`,
    name: r["Name"],
    email: r["Email"],
    passes: r["Passes"],
    type: r["Type"], // "paid" | "comp"
    location: r["Location"],
  }));

// --- special arrangements: members set up differently on purpose (grandfathered
//     rate, prepaid year, deferred start) — front-desk reference, nothing to redeem ---
const arrangements = dict(join(HOME, "sway-mindbody-migration", "special-arrangements.csv"))
  .map((r) => ({
    id: r["Email"] || r["Name"],
    name: r["Name"],
    email: r["Email"],
    location: r["Location"],
    kind: r["Type"],     // "Rate" | "Prepaid" | "Deferred"
    detail: r["Detail"],
    note: r["Note"],
  }));

console.log(`Seeding -> ${PROD}`);
console.log(`  giftcards: ${giftcards.length} | credits: ${credits.length} | cards: ${cards.length} | attention: ${attention.length} | daypasses: ${daypasses.length} | arrangements: ${arrangements.length}`);

const res = await fetch(`${PROD}/api/clubdesk?action=seed&secret=${encodeURIComponent(SECRET)}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ giftcards, credits, cards, attention, daypasses, arrangements }),
});
console.log(`HTTP ${res.status}:`, await res.text());
