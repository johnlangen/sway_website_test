import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { isClubSiteId } from "@/lib/clubLocations";

export const runtime = "nodejs";

/**
 * GET /api/membership/contracts?siteId=…
 *
 * Returns the membership contracts sellable on the website (whitelisted IDs,
 * per site) with their live Mindbody agreement terms. Used by the join flow
 * to show the actual contract terms before purchase. Cached for an hour —
 * terms and pricing change rarely.
 */

const WEBSITE_CONTRACT_IDS = [122, 123, 124, 111, 102];
// Club sites (RiNo / Central Park): the unlimited Remedy Lounge membership.
// Kept SoldOnline=false in Mindbody on purpose (hidden from the Mindbody
// consumer store), so the SoldOnline filter below is Larimer-only.
const CLUB_CONTRACT_IDS = [143];

// Mindbody returns AgreementTerms as HTML. The join flow renders terms as
// plain text (whitespace-pre-wrap), so convert: block-level closes become
// newlines, remaining tags are stripped, basic entities decoded.
function termsToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(div|p|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "· ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // Optional siteId override (future: clubs / Spavia). Defaults to Larimer.
  const siteIdRaw = searchParams.get("siteId");
  const siteId = (siteIdRaw && siteIdRaw.trim()) || process.env.MINDBODY_SITE_ID!;
  const isClub = isClubSiteId(siteId);
  const contractIds = isClub ? CLUB_CONTRACT_IDS : WEBSITE_CONTRACT_IDS;

  try {
    const token = await getMindbodyStaffToken(siteId);

    const url = new URL(
      "https://api.mindbodyonline.com/public/v6/sale/contracts"
    );
    url.searchParams.set("request.locationId", "1");
    url.searchParams.set("request.limit", "100");
    for (const [i, id] of contractIds.entries()) {
      url.searchParams.set(`request.contractIds[${i}]`, String(id));
    }

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: "Mindbody error", details: data?.Error ?? null },
        { status: res.status }
      );
    }

    const contracts = (Array.isArray(data?.Contracts) ? data.Contracts : [])
      .filter((c: any) => contractIds.includes(c?.Id) && (isClub || c?.SoldOnline))
      .map((c: any) => ({
        id: c.Id,
        name: c.Name,
        agreementTerms:
          typeof c.AgreementTerms === "string"
            ? termsToPlainText(c.AgreementTerms)
            : null,
      }));

    return NextResponse.json({ contracts });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
