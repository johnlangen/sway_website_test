// READ-ONLY. Diagnose Aescape appointment durations at Larimer (5739770).
// Compare booked block length (Start->End) per appointment vs the SessionType's configured duration,
// for today and a couple future dates.
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")).trim(),l.slice(l.indexOf("=")+1).trim()]));
const {MINDBODY_API_KEY:API_KEY,MINDBODY_STAFF_USER3:USER,MINDBODY_STAFF_PASS3:PASS}=env;
const SITE="5739770";

async function mb(method,path,token,{params={},body}={}) {
  const url=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for(const[k,v]of Object.entries(params)) url.searchParams.append(k,v);
  const r=await fetch(url,{method,headers:{Accept:"application/json","Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE,...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>({}))};
}
const tr=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE},body:JSON.stringify({Username:USER,Password:PASS})});
const token=(await tr.json()).AccessToken;
if(!token){console.error("no token");process.exit(1);}

// 1) Session types: anything robot/aescape
const st=await mb("GET","site/sessiontypes",token,{params:{limit:"200"}});
const robot=(st.data.SessionTypes||[]).filter(s=>/robot|aescape|touchless/i.test(s.Name));
console.log("=== Robot/Aescape SessionTypes (configured durations) ===");
for(const s of robot) console.log(`  ST ${s.Id}: "${s.Name}"  NumDeducted=${s.NumDeducted} DefaultTimeLength=${s.DefaultTimeLength ?? "?"} Type=${s.Type}  raw=${JSON.stringify(s)}`);

// 2) Find Aescape staff id
const staff=await mb("GET","staff/staff",token,{params:{limit:"200"}});
const aes=(staff.data.StaffMembers||[]).filter(s=>/aescape/i.test(`${s.FirstName} ${s.LastName}`));
console.log("\n=== Aescape staff ===");
for(const s of aes) console.log(`  Staff ${s.Id}: ${s.FirstName} ${s.LastName}`);
const staffId=aes[0]?.Id;

// 3) Appointments today + a future day, on Aescape staff
for(const DAY of ["2026-08-28","2026-08-29","2026-09-15"]) {
  const ap=await mb("GET","appointment/staffappointments",token,{params:{"request.staffIds[0]":String(staffId),"request.startDate":`${DAY}T00:00:00`,"request.endDate":`${DAY}T23:59:59`,"request.limit":"100"}});
  const appts=(ap.data.Appointments||[]).sort((a,b)=>a.StartDateTime.localeCompare(b.StartDateTime));
  console.log(`\n=== ${DAY}: ${appts.length} appointments on Aescape ===`);
  for(const a of appts) {
    const mins=(new Date(a.EndDateTime)-new Date(a.StartDateTime))/60000;
    console.log(`  ${a.StartDateTime.slice(11,16)}-${a.EndDateTime.slice(11,16)} (${mins}m) ST=${a.SessionTypeId} "${a.SessionTypeName??""}" client=${a.ClientId} status=${a.Status} id=${a.Id}`);
  }
}
