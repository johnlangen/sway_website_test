// READ-ONLY / Test:true. Diagnose two things on RiNo (5754020) for 6/26:
//  (a) why the 2nd infrared sauna window (6:55) fails while the 1st (6:30) works
//  (b) whether RiNo now has infrared cabin Resources + can we pin one
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")).trim(),l.slice(l.indexOf("=")+1).trim()]));
const {MINDBODY_API_KEY:API_KEY,MINDBODY_STAFF_USER2:USER,MINDBODY_STAFF_PASS2:PASS}=env;
const SITE="5754020";
const INFRARED_ST=134, INFRARED_STAFF=100000006, DAY="2026-06-26";

async function mb(method,path,token,{params={},body}={}) {
  const url=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for(const[k,v]of Object.entries(params)) url.searchParams.append(k,v);
  const r=await fetch(url,{method,headers:{Accept:"application/json","Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE,...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>({}))};
}
const tr=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE},body:JSON.stringify({Username:USER,Password:PASS})});
const token=(await tr.json()).AccessToken;

console.log("=== RiNo resources ===");
const rs=await mb("GET","site/resources",token,{params:{limit:"200"}});
const infraRooms=(rs.data.Resources||[]).filter(r=>/infrared/i.test(r.Name));
for(const r of rs.data.Resources||[]) console.log(`  Resource ${r.Id}: "${r.Name}"`);

console.log("\n=== ST 134 (infrared) ResourceRequired ===");
const st=await mb("GET","site/sessiontypes",token,{params:{limit:"200"}});
const t=(st.data.SessionTypes||[]).find(s=>s.Id===INFRARED_ST);
console.log(`  ST 134 "${t?.Name}" ResourceRequired=${t?.ResourceRequired}`);

console.log("\n=== infrared bookableitems windows (token-free vs staff-token) ===");
for(const [label,tok] of [["token-free",null],["staff-token",token]]) {
  const bi=await mb("GET","appointment/bookableitems",tok,{params:{"request.sessionTypeIds[0]":String(INFRARED_ST),"request.locationIds[0]":"1","request.staffIds[0]":String(INFRARED_STAFF),"request.startDate":`${DAY}T00:00:00`,"request.endDate":`${DAY}T23:59:59`,"request.limit":"10"}});
  const w=(bi.data.Availabilities||[]).map(a=>`${a.StartDateTime}->${a.BookableEndDateTime}`).join("  |  ");
  console.log(`  ${label}: ${w||"(none)"}`);
}

// find a RiNo client to use for Test:true (no commit)
const search=await mb("GET","client/clients",token,{params:{"request.searchText":"langen","request.limit":"5"}});
const client=(search.data.Clients||[])[0];
console.log(`\n=== using client ${client?.Id} (${client?.FirstName} ${client?.LastName}) for Test:true probes ===`);

async function tryBook(label, start, end, extra={}) {
  const r=await mb("POST","appointment/addappointment",token,{body:{Test:true,ClientId:String(client.Id),SessionTypeId:INFRARED_ST,StaffId:INFRARED_STAFF,LocationId:1,StartDateTime:start,EndDateTime:end,ApplyPayment:false,SendEmail:false,...extra}});
  const appt=r.data?.Appointment??r.data;
  console.log(`  ${label}: ok=${r.ok} status=${r.status}` + (r.ok?`  Resources=${JSON.stringify(appt?.Resources??"(none)")}`:`  ERROR: ${JSON.stringify(r.data?.Error??r.data).slice(0,260)}`));
}

console.log("\n=== Test:true infrared bookings (no commit) ===");
await tryBook("window1 6:30-6:55", `${DAY}T06:30:00`, `${DAY}T06:55:00`);
await tryBook("window2 6:55-7:20", `${DAY}T06:55:00`, `${DAY}T07:20:00`);
await tryBook("window3 7:20-7:45", `${DAY}T07:20:00`, `${DAY}T07:45:00`);

if(infraRooms.length) {
  console.log("\n=== Test:true with a pinned cabin Resource ===");
  await tryBook(`window1 + Resource ${infraRooms[0].Id} "${infraRooms[0].Name}"`, `${DAY}T06:30:00`, `${DAY}T06:55:00`, {Resources:[{Id:infraRooms[0].Id}]});
}
