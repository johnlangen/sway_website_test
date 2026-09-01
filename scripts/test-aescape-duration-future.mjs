// READ-ONLY / Test:true only (no commits, no emails).
// What duration does Mindbody assign a NEW Aescape booking right now?
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")).trim(),l.slice(l.indexOf("=")+1).trim()]));
const {MINDBODY_API_KEY:API_KEY,MINDBODY_STAFF_USER3:USER,MINDBODY_STAFF_PASS3:PASS}=env;
const SITE="5739770", STAFF=100000040, DAY="2026-09-15";

async function mb(method,path,token,{params={},body}={}) {
  const url=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for(const[k,v]of Object.entries(params)) url.searchParams.append(k,v);
  const r=await fetch(url,{method,headers:{Accept:"application/json","Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE,...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>({}))};
}
const tr=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE},body:JSON.stringify({Username:USER,Password:PASS})});
const token=(await tr.json()).AccessToken;

console.log(`=== bookableitems windows on ${DAY} (token-free, as the website sees) ===`);
for(const st of [93,94,92]) {
  const bi=await mb("GET","appointment/bookableitems",null,{params:{"request.sessionTypeIds[0]":String(st),"request.locationIds[0]":"1","request.staffIds[0]":String(STAFF),"request.startDate":`${DAY}T00:00:00`,"request.endDate":`${DAY}T23:59:59`,"request.limit":"20"}});
  const w=(bi.data.Availabilities||[]).map(a=>`${a.StartDateTime.slice(11,16)}->${(a.BookableEndDateTime||"").slice(11,16)}`).join(" | ");
  console.log(`  ST ${st}: ${w||"(none)"}`);
}

const search=await mb("GET","client/clients",token,{params:{"request.searchText":"langen","request.limit":"5"}});
const client=(search.data.Clients||[])[0];
console.log(`\n=== Test:true probes with client ${client?.Id} (${client?.FirstName} ${client?.LastName}) — nothing is committed ===`);

async function probe(label, st, start, extra={}) {
  const r=await mb("POST","appointment/addappointment",token,{body:{Test:true,ClientId:String(client.Id),SessionTypeId:st,StaffId:STAFF,LocationId:1,StartDateTime:start,ApplyPayment:false,SendEmail:false,...extra}});
  const a=r.data?.Appointment??r.data;
  if(r.ok){
    const mins=(new Date(a.EndDateTime)-new Date(a.StartDateTime))/60000;
    console.log(`  ${label}: ${a.StartDateTime?.slice(11,16)}-${a.EndDateTime?.slice(11,16)} => ${mins} min block`);
  } else {
    console.log(`  ${label}: FAILED ${r.status} ${JSON.stringify(r.data?.Error??r.data).slice(0,200)}`);
  }
}
await probe("ST 93 (60-min robot), no EndDateTime", 93, `${DAY}T10:00:00`);
await probe("ST 94 (45-min robot), no EndDateTime", 94, `${DAY}T10:00:00`);
await probe("ST 92 (30-min robot), no EndDateTime", 92, `${DAY}T10:00:00`);
// can an explicit short EndDateTime force a 60-min block for ST 93? (how an integration could create the stubs)
await probe("ST 93 with EXPLICIT 60-min EndDateTime", 93, `${DAY}T13:00:00`, {EndDateTime:`${DAY}T14:00:00`});
