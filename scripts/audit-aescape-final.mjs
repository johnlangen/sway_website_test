// READ-ONLY final audit: Aescape blocks Jul 1 -> Oct 31 vs standardized durations,
// plus close-time math check on future bookable windows for all 4 session types.
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")).trim(),l.slice(l.indexOf("=")+1).trim()]));
const {MINDBODY_API_KEY:API_KEY,MINDBODY_STAFF_USER3:USER,MINDBODY_STAFF_PASS3:PASS}=env;
const SITE="5739770", STAFF=100000040;
const EXPECTED={93:80,94:60,92:50,95:30};
const NAMES={93:"60min",94:"45min",92:"30min",95:"15min",47:"charity",58:"team"};

async function mb(path,token,params={}) {
  const url=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for(const[k,v]of Object.entries(params)) url.searchParams.append(k,v);
  const r=await fetch(url,{headers:{Accept:"application/json","Api-Key":API_KEY,SiteId:SITE,...(token?{Authorization:`Bearer ${token}`}:{})}});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>({}))};
}
const tr=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE},body:JSON.stringify({Username:USER,Password:PASS})});
const token=(await tr.json()).AccessToken;

// paginate staffappointments
let all=[], offset=0;
while(true){
  const r=await mb("appointment/staffappointments",token,{"request.staffIds[0]":String(STAFF),"request.startDate":"2026-07-01T00:00:00","request.endDate":"2026-10-31T23:59:59","request.limit":"200","request.offset":String(offset)});
  const chunk=r.data.Appointments||[];
  all.push(...chunk);
  const total=r.data.PaginationResponse?.TotalResults??chunk.length;
  offset+=chunk.length;
  if(offset>=total||chunk.length===0) break;
}
const appts=all.filter(a=>a.Status!=="Cancelled").sort((a,b)=>a.StartDateTime.localeCompare(b.StartDateTime));
const counts={};
const bad=[];
for(const a of appts){
  const mins=(new Date(a.EndDateTime)-new Date(a.StartDateTime))/60000;
  const key=`${NAMES[a.SessionTypeId]??a.SessionTypeId}:${mins}m`;
  counts[key]=(counts[key]||0)+1;
  if(EXPECTED[a.SessionTypeId] && mins!==EXPECTED[a.SessionTypeId]) bad.push({a,mins});
}
console.log(`Jul 1 -> Oct 31: ${appts.length} non-cancelled Aescape appointments`);
console.log("\nBlock-length distribution:");
for(const [k,v] of Object.entries(counts).sort()) console.log(`  ${k}: ${v}`);
console.log(`\nNon-standard blocks: ${bad.length}`);
for(const {a,mins} of bad){
  const note=(a.Notes||"").replace(/\s+/g," ").slice(0,70);
  console.log(`  ⚠️ ${a.StartDateTime.slice(0,16).replace("T"," ")} ${NAMES[a.SessionTypeId]} ${mins}m (exp ${EXPECTED[a.SessionTypeId]}m) id=${a.Id} status=${a.Status} note="${note}"`);
}

// forward config check: last bookable start + expected block should equal close on several dates
console.log("\nForward window math (token-free, last-start + block vs close):");
for(const DAY of ["2026-09-05","2026-09-26","2026-10-15"]){
  const parts=[];
  for(const st of [93,94,92,95]){
    const bi=await mb("appointment/bookableitems",null,{"request.sessionTypeIds[0]":String(st),"request.locationIds[0]":"1","request.staffIds[0]":String(STAFF),"request.startDate":`${DAY}T00:00:00`,"request.endDate":`${DAY}T23:59:59`,"request.limit":"5"});
    const w=(bi.data.Availabilities||[])[0];
    if(!w){parts.push(`ST${st}:none`);continue;}
    const lastStart=new Date(w.BookableEndDateTime);
    const impliedEnd=new Date(lastStart.getTime()+EXPECTED[st]*60000);
    parts.push(`ST${st} last-start ${w.BookableEndDateTime.slice(11,16)} +${EXPECTED[st]}m => ${impliedEnd.toISOString().slice(11,16)}`);
  }
  console.log(`  ${DAY}: ${parts.join(" | ")}`);
}
