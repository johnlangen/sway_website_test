import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

/**
 * GET /api/membership/contracts
 *
 * Returns the membership contracts sellable on the website (whitelisted IDs)
 * with their live Mindbody agreement terms. Used by the join flow to show
 * the actual contract terms before purchase. Cached for an hour — terms and
 * pricing change rarely.
 */

const WEBSITE_CONTRACT_IDS = [122, 123, 124, 111, 102];

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

  try {
    const token = await getMindbodyStaffToken(siteId);

    const url = new URL(
      "https://api.mindbodyonline.com/public/v6/sale/contracts"
    );
    url.searchParams.set("request.locationId", "1");
    url.searchParams.set("request.limit", "100");
    for (const [i, id] of WEBSITE_CONTRACT_IDS.entries()) {
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
      .filter((c: any) => WEBSITE_CONTRACT_IDS.includes(c?.Id) && c?.SoldOnline)
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
