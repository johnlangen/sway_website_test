// Founding memberships the website sold at a launch site, for Atlas's Launch Board (John
// 11/23/2026). From the completion ledger, written after Mindbody confirms the sale. No names or
// emails: the buyer's email is a sha256 hash, to match a founder to the spa's interest list.
//   GET …/api/ops/sales/?key=…&from=2026-11-23&to=2026-11-30   (America/Denver days, max 120)
//   {"sales":[{"at","day","flow":"membership","spa","siteId","clientContractId","amount","plan",
//              "founding":true,"buyerEmailHash","membershipStart","attribution":{"first","last"}}]}
// Launch-site founding sales ONLY (not Larimer or club joins).
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";
import { opsDay } from "@/lib/ops/record";
import { feedDays, foundingSales } from "@/lib/ops/feeds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (!opsKeyMatches(q.get("key") || (await cookies()).get(OPS_COOKIE)?.value))
    return NextResponse.json({ error: "not found" }, { status: 404 });
  const days = feedDays(q.get("from"), q.get("to"), opsDay());
  const sales = await foundingSales(days);
  return NextResponse.json(
    { tz: "America/Denver", from: days[0], to: days[days.length - 1], sales },
    { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } }
  );
}
