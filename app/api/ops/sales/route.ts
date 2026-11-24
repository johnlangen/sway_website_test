// Founding memberships the website sold at a launch site, for Atlas's Launch Board (John
// 11/23/2026). From the completion ledger, written after Mindbody confirms the sale. No names or
// emails: the buyer's email is a sha256 hash, to match a founder to the spa's interest list.
//   GET …/api/ops/sales/?key=…&from=2026-11-23&to=2026-11-30   (America/Denver days, max 120)
//   {"sales":[{"at","day","flow":"membership","spa","siteId","clientContractId","amount","plan",
//              "founding":true|false,"buyerEmailHash","membershipStart","attribution":{"first","last"}}]}
// Launch-site rows (union-market, knox-henderson): founding memberships (founding true) and the
// Remedy Room membership (founding false, plan "remedy"). Founding counts filter on founding === true.
//
// Since 11/23/2026 (asked by Atlas, to tell website sales from desk ones) the same list also carries
// what the site's own checkouts sold at the three OPEN spas (denver-larimer 5739770, denver-rino
// 5754020, denver-central-park 5754021), always with founding false:
//   {"at","day","flow":"gift","spa","siteId","saleId":"<Mindbody sale id>","amount",
//    "founding":false,"attribution":{"first","last"}}                      gift cards, from 10/28/2026
//   {"at","day","flow":"membership","spa","siteId","clientContractId","amount":<monthly>,"plan",
//    "founding":false,"attribution":{"first","last"}}                      memberships
// saleId / clientContractId are Mindbody's ids at that site (ids repeat across sites: pair them with
// siteId). No buyer hash on these rows. The site takes no payment for bookings, so there are no
// booking rows.
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";
import { opsDay } from "@/lib/ops/record";
import { feedDays, foundingSales, openSpaWebsiteSales } from "@/lib/ops/feeds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (!opsKeyMatches(q.get("key") || (await cookies()).get(OPS_COOKIE)?.value))
    return NextResponse.json({ error: "not found" }, { status: 404 });
  const days = feedDays(q.get("from"), q.get("to"), opsDay());
  const [launch, open] = await Promise.all([foundingSales(days), openSpaWebsiteSales(days)]);
  const sales = [...launch, ...open].sort((a, b) => a.at.localeCompare(b.at));
  return NextResponse.json(
    { tz: "America/Denver", from: days[0], to: days[days.length - 1], sales },
    { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } }
  );
}
