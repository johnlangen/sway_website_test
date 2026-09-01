// READ-ONLY. Pull Notes for all Aescape appointments Aug 15 -> Sep 30 and build a
// booked-at -> assigned-duration timeline (our web flow stamps "Booked: ... MT" into Notes).
import { readFileSync } from "fs";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>[l.slice(0,l.indexOf("=")).trim(),l.slice(l.indexOf("=")+1).trim()]));
const {MINDBODY_API_KEY:API_KEY,MINDBODY_STAFF_USER3:USER,MINDBODY_STAFF_PASS3:PASS}=env;
const SITE="5739770", STAFF=100000040;
const NAMES={93:"60min",94:"45min",92:"30min",95:"15min",47:"charity",58:"team"};

async function mb(path,token,params={}) {
  const url=new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
  for(const[k,v]of Object.entries(params)) url.searchParams.append(k,v);
  const r=await fetch(url,{headers:{Accept:"application/json","Api-Key":API_KEY,SiteId:SITE,...(token?{Authorization:`Bearer ${token}`}:{})}});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>({}))};
}
const tr=await fetch("https://api.mindbodyonline.com/public/v6/usertoken/issue",{method:"POST",headers:{"Content-Type":"application/json","Api-Key":API_KEY,SiteId:SITE},body:JSON.stringify({Username:USER,Password:PASS})});
const token=(await tr.json()).AccessToken;

const ap=await mb("appointment/staffappointments",token,{"request.staffIds[0]":String(STAFF),"request.startDate":"2026-08-15T00:00:00","request.endDate":"2026-09-30T23:59:59","request.limit":"200"});
const appts=(ap.data.Appointments||[]).filter(a=>a.Status!=="Cancelled");

// sort by appointment Id (creation order)
appts.sort((a,b)=>a.Id-b.Id);
console.log("id | appt date/time | type | block | booked-at (from Notes) | note snippet");
for(const a of appts){
  const mins=(new Date(a.EndDateTime)-new Date(a.StartDateTime))/60000;
  const note=(a.Notes||"").replace(/\s+/g," ").trim();
  const m=note.match(/Booked: .*? · (\d+\/\d+, [\d:]+ [AP]M) MT — ([^|.]+)/);
  const bookedAt=m?`${m[1]} via ${m[2].trim()}`:(note?"(other note)":"(no note)");
  const snip=note?note.slice(0,60):"";
  console.log(`${a.Id} | ${a.StartDateTime.slice(5,16).replace("T"," ")} | ${NAMES[a.SessionTypeId]??a.SessionTypeId} | ${String(mins).padStart(3)}m | ${bookedAt} | ${snip}`);
}
