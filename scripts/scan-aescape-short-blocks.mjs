// READ-ONLY. Scan Aescape appointments Aug 20 -> Sep 30 and flag blocks shorter
// than the current standardized durations (ST93=80m, ST94=60m, ST92=50m, ST95=30m).
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")).trim(),l.slice(l.indexOf("=")+1).trim()]));
const {MINDBODY_API_KEY:API_KEY,MINDBODY_STAFF_USER3:USER,MINDBODY_STAFF_PASS3:PASS}=env;
const SITE="5739770", STAFF=100000040;
const EXPECTED={93:80,94:60,92:50,95:30};
const NAMES={93:"60-min",94:"45-min",92:"30-min",95:"15-min",47:"charity",58:"team"};

async function mb(method,path,token,{params={}}={}) {
  const url=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for(const[k,v]of Object.entries(params)) url.searchParams.append(k,v);
  const r=await fetch(url,{method,headers:{Accept:"application/json","Api-Key":API_KEY,SiteId:SITE,...(token?{Authorization:`Bearer ${token}`}:{})}});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>({}))};
}
const tr=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE},body:JSON.stringify({Username:USER,Password:PASS})});
const token=(await tr.json()).AccessToken;

const ap=await mb("GET","appointment/staffappointments",token,{params:{"request.staffIds[0]":String(STAFF),"request.startDate":"2026-08-20T00:00:00","request.endDate":"2026-09-30T23:59:59","request.limit":"200"}});
const appts=(ap.data.Appointments||[]).filter(a=>a.Status!=="Cancelled").sort((a,b)=>a.StartDateTime.localeCompare(b.StartDateTime));

// client names for the flagged ones
const flagged=appts.filter(a=>EXPECTED[a.SessionTypeId] && ((new Date(a.EndDateTime)-new Date(a.StartDateTime))/60000) !== EXPECTED[a.SessionTypeId]);
const clientIds=[...new Set(flagged.map(a=>String(a.ClientId)))];
const names={};
for(let i=0;i<clientIds.length;i+=10){
  const chunk=clientIds.slice(i,i+10);
  const p={}; chunk.forEach((id,j)=>p[`request.clientIds[${j}]`]=id); p["request.limit"]="20";
  const r=await mb("GET","client/clients",token,{params:p});
  for(const c of r.data.Clients||[]) names[String(c.Id)]=`${c.FirstName} ${c.LastName}`;
}

let day="";
for(const a of appts){
  const mins=(new Date(a.EndDateTime)-new Date(a.StartDateTime))/60000;
  const exp=EXPECTED[a.SessionTypeId];
  const bad=exp && mins!==exp;
  if(a.StartDateTime.slice(0,10)!==day){day=a.StartDateTime.slice(0,10);console.log(`\n--- ${day} ---`);}
  console.log(`  ${bad?"⚠️ ":"   "}${a.StartDateTime.slice(11,16)}-${a.EndDateTime.slice(11,16)} ${NAMES[a.SessionTypeId]??a.SessionTypeId} ${mins}m${exp?` (expected ${exp}m)`:""} id=${a.Id} ${bad?names[String(a.ClientId)]??("client "+a.ClientId):""} ${a.Status}`);
}
console.log(`\nTotal non-cancelled: ${appts.length}; short/nonstandard: ${flagged.length}`);
