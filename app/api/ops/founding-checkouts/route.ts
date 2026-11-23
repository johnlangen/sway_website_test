// Founding checkouts guests started at a launch site, with the furthest screen each reached, for
// the Launch Board's follow-up list in Atlas (John 11/23/2026). Contact details: ops key only,
// never shown in /ops/.
//   GET …/api/ops/founding-checkouts/?key=…[&spa=union-market]
//   {"stages": ["email","account","payment","review","joined"],
//    "rows": [{"spa","email","firstName","lastName","phone","startedAt","updatedAt","stage"}, ...]}
// CONTRACT: the same field names as the Spavia site's feed, which Atlas reads
// (spavia-analytics-pipeline api/founding_checkouts.py). Don't rename or drop one.
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";
import { FOUNDING_STAGES, foundingCheckouts } from "@/lib/foundingCheckouts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (!opsKeyMatches(q.get("key") || (await cookies()).get(OPS_COOKIE)?.value))
    return NextResponse.json({ error: "not found" }, { status: 404 });
  const spa = (q.get("spa") || "").trim().toLowerCase();
  const rows = (await foundingCheckouts()).filter((r) => !spa || r.spa === spa);
  return NextResponse.json({ stages: FOUNDING_STAGES, rows }, { headers });
}
