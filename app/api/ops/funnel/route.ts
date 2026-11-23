// Unique guests per day at each step of a launch site's founding checkout, for Atlas's Launch
// Board (John 11/23/2026). Same shape as the Spavia site's feed. Counts only. Ops key; wrong key 404.
//   GET …/api/ops/funnel/?key=…&from=2026-11-23&to=2026-11-30   (America/Denver days, max 120)
//   {"tz","steps":{"membership":[…],"remedy":[…]},"sourceSteps":{"remedy":[…]},"sideSteps":[…],
//    "rows":[{"day","spa","flow","step","guests"}]}
// flow "membership" = the founding checkout (unchanged). flow "remedy" = the launch site's Remedy
// Room membership checkout, which is not founding: its screens (steps.remedy) and which page sent
// the guest (sourceSteps.remedy). The two never share a row.
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";
import { opsDay } from "@/lib/ops/record";
import { FOUNDING_SIDE_STEPS, FOUNDING_STEPS, REMEDY_SOURCE_STEPS, REMEDY_STEPS, feedDays, launchFunnelRows } from "@/lib/ops/feeds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (!opsKeyMatches(q.get("key") || (await cookies()).get(OPS_COOKIE)?.value))
    return NextResponse.json({ error: "not found" }, { status: 404 });
  const days = feedDays(q.get("from"), q.get("to"), opsDay());
  const rows = await launchFunnelRows(days);
  return NextResponse.json(
    { tz: "America/Denver", from: days[0], to: days[days.length - 1], steps: { membership: FOUNDING_STEPS, remedy: REMEDY_STEPS }, sourceSteps: { remedy: REMEDY_SOURCE_STEPS }, sideSteps: FOUNDING_SIDE_STEPS, rows },
    { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } }
  );
}
