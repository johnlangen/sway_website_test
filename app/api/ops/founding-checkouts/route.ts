// Founding checkouts guests started at a launch site, with the furthest screen each reached, for
// the Launch Board's follow-up list in Atlas (John 11/23/2026). Contact details: ops key only,
// never shown in /ops/.
//   GET …/api/ops/founding-checkouts/?key=…[&spa=union-market]
//   {"stages": ["email","account","payment","review","joined"],
//    "rows": [{"spa","email","firstName","lastName","phone","startedAt","updatedAt","stage","plan"}, ...]}
// plan = the plan they were joining: "essential" / "premier" / "ultimate" (founding) or "remedy" (the
// Remedy Room membership, not founding). null on rows from before 11/23/2026 evening, all founding.
// CONTRACT: the same field names as the Spavia site's feed, which Atlas reads
// (spavia-analytics-pipeline api/founding_checkouts.py). Don't rename or drop one.
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";
import { FOUNDING_STAGES, foundingCheckouts, isLaunchSpa } from "@/lib/foundingCheckouts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (!opsKeyMatches(q.get("key") || (await cookies()).get(OPS_COOKIE)?.value))
    return NextResponse.json({ error: "not found" }, { status: 404 });
  const spa = (q.get("spa") || "").trim().toLowerCase();
  // Atlas's Launch Board feed (no parameters) stays launch sites only. Larimer's and the clubs'
  // checkouts (kept since 11/23/2026) come back with ?spa=<slug> or ?all=1 (scripts/ops.mjs --stopped).
  const all = q.get("all") === "1";
  const rows = (await foundingCheckouts()).filter((r) => (spa ? r.spa === spa : all || isLaunchSpa(r.spa)));
  return NextResponse.json({ stages: FOUNDING_STAGES, rows: rows.map((r) => ({ ...r, plan: r.plan ?? null })) }, { headers });
}
