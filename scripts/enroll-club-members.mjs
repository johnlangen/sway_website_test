// REAL enrollment: sell the $99 Founding [100] contract to READY club members
// with a DEFERRED July StartDate (FirstPaymentOccurs:StartDate → $0 today, first
// charge on their anniversary). Idempotent: skips anyone who already has an
// active Founding contract. No member notifications.
//
//   node scripts/enroll-club-members.mjs            preview (no writes)
//   node scripts/enroll-club-members.mjs --pilot    enroll the 3 earliest anniversaries
//   node scripts/enroll-club-members.mjs --all      enroll all READY members
import { readFileSync, appendFileSync, existsSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const MODE = process.argv.includes("--all") ? "all" : process.argv.includes("--pilot") ? "pilot" : "preview";
const HOME = homedir();
const env = Object.fromEntries(
  readFileSync(join(process.cwd(), ".env.local"), "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API_KEY = env.MINDBODY_API_KEY;
const SITE = { "RiNo Station": "5754020", "Central Park": "5754021" };
const CONTRACT = "100"; // Founding Membership $99/mo (both club sites)

function parseCSV(t){const r=[];let row=[],c="",q=false;for(let i=0;i<t.length;i++){const ch=t[i];if(q){if(ch=='"'&&t[i+1]=='"'){c+='"';i++;}else if(ch=='"')q=false;else c+=ch;}else{if(ch=='"')q=true;else if(ch==",")
{row.push(c);c="";}else if(ch=="\n"){row.push(c);r.push(row);row=[];c="";}else if(ch=="\r"){}else c+=ch;}}if(c||row.length){row.push(c);r.push(row);}return r;}
function dict(p){const r=parseCSV(readFileSync(p,"utf8"));const h=r[0];return r.slice(1).map((row)=>Object.fromEntries(h.map((k,i)=>[k,row[i]??""])));}

let ready = dict(join(HOME, "sway-mindbody-migration", "enrollment-plan.csv")).filter((r) => r.Note === "READY");
ready.sort((a, b) => a.StartDate.localeCompare(b.StartDate));
const targets = MODE === "pilot" ? ready.slice(0, 3) : ready;
console.log(`Mode: ${MODE.toUpperCase()} | READY total: ${ready.length} | enrolling this run: ${MODE === "preview" ? 0 : targets.length}`);

async function getToken(siteId){const r=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:siteId},body:JSON.stringify({Username:env.MINDBODY_STAFF_USER2,Password:env.MINDBODY_STAFF_PASS2})});const d=await r.json();if(!r.ok)throw new Error(`token ${siteId}`);return d.AccessToken;}
async function mbGet(path,siteId,token,params){const u=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);for(const[k,v]of Object.entries(params))u.searchParams.append(k,v);const r=await fetch(u,{headers:{Accept:"application/json","Api-Key":API_KEY,SiteId:siteId,Authorization:`Bearer ${token}`}});return r.json().catch(()=>({}));}
async function purchase(siteId,token,clientId,lastFour,startDate){const r=await fetch("https://api.mindbodyonline.com/public/v6/sale/purchasecontract",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","Api-Key":API_KEY,SiteId:siteId,Authorization:`Bearer ${token}`},body:JSON.stringify({Test:false,SendNotifications:false,LocationId:1,ClientId:clientId,ContractId:CONTRACT,StartDate:startDate,FirstPaymentOccurs:"StartDate",StoredCardInfo:{LastFour:String(lastFour)}})});return r.json().catch(()=>({}));}

const tokens = {}; for (const [loc, sid] of Object.entries(SITE)) tokens[loc] = await getToken(sid);

const logPath = join(HOME, "sway-mindbody-migration", "enrolled.csv");
if (MODE !== "preview" && !existsSync(logPath)) writeFileSync(logPath, "Timestamp,CustomerID,Email,Site,ClientId,ClientContractId,StartDate,Total,Status\n");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const t = { enrolled: 0, skipped: 0, failed: 0 };
for (const m of targets) {
  const sid = SITE[m.Site], token = tokens[m.Site];
  if (MODE === "preview") { console.log(`  WOULD ENROLL ${m.Email} @ ${m.Site} clientId=${m.ClientId} start=${m.StartDate}`); continue; }
  // re-fetch card + idempotency check
  const cl = ((await mbGet("client/clients", sid, token, { "request.clientIds": m.ClientId })).Clients || [])[0];
  const lastFour = cl?.ClientCreditCard?.LastFour;
  if (!lastFour) { t.skipped++; console.log(`  SKIP ${m.Email}: no card now`); continue; }
  const existing = ((await mbGet("client/clientcontracts", sid, token, { "request.clientId": m.ClientId })).Contracts || [])
    .filter((c) => /founding/i.test(c.ContractName ?? c.Name ?? "") && c.IsActive !== false && !(c.TerminationDate && !String(c.TerminationDate).startsWith("0001") && new Date(c.TerminationDate) < new Date()));
  if (existing.length) { t.skipped++; console.log(`  SKIP ${m.Email}: already has Founding contract`); continue; }
  const res = await purchase(sid, token, m.ClientId, lastFour, m.StartDate);
  const ccId = res?.ClientContractId ?? null, total = res?.Totals?.Total;
  const ok = ccId != null && Number(total) === 0;
  const status = ok ? "ENROLLED" : `FAIL:${res?.Error?.Message || `total=${total}`}`;
  appendFileSync(logPath, `${new Date().toISOString?.() ?? ""},${m.CustomerID},${m.Email},${m.Site},${m.ClientId},${ccId ?? ""},${m.StartDate},${total ?? ""},${status}\n`);
  if (ok) { t.enrolled++; console.log(`  ENROLLED ${m.Email} @ ${m.Site} -> ClientContractId ${ccId} (start ${m.StartDate}, $0 today)`); }
  else { t.failed++; console.log(`  FAIL ${m.Email}: ${status}`); }
  await sleep(150);
}
if (MODE !== "preview") console.log(`\n===== ${MODE.toUpperCase()} DONE =====\n  enrolled: ${t.enrolled} | skipped: ${t.skipped} | failed: ${t.failed}\n  log: ${logPath}`);
