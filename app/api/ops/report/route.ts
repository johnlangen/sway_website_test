import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OPS_COOKIE, opsKeyMatches, opsReport } from "@/lib/ops/report";

/**
 * GET /api/ops/report/?key=…&days=7&loc=denver-rino&to=2026-10-22&page=/aescape/
 * The same data as the /ops/ dashboard, as JSON (for Claude, Atlas, scripts). Counts and
 * non-personal ledger rows only. Key via ?key= or the dashboard cookie; wrong key → 404.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") || (await cookies()).get(OPS_COOKIE)?.value;
  if (!opsKeyMatches(key)) return NextResponse.json({ error: "not found" }, { status: 404 });
  const report = await opsReport({
    to: url.searchParams.get("to") || undefined,
    days: Number(url.searchParams.get("days")) || 1,
    loc: url.searchParams.get("loc") || undefined,
    page: url.searchParams.get("page") || undefined,
  });
  return NextResponse.json(report, { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
