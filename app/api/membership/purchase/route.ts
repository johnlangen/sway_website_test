import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { checkCardRateLimit, RATE_LIMIT_RESPONSE } from "@/lib/cardRateLimit";
import { isClubSiteId } from "@/lib/clubLocations";

export const runtime = "nodejs";

/**
 * POST /api/membership/purchase
 *
 * Purchases a Mindbody autopay membership contract for an existing client
 * using their stored card. The client must already exist at the site with a
 * card on file (created/updated via /api/mindbody/add-client-with-card or
 * /api/mindbody/update-client-card upstream in the join flow).
 *
 * Body: { clientId, contractId, test?, siteId? }
 * - test: true runs Mindbody's documented dry-run (validates everything,
 *   commits nothing, charges nothing). Verified live 2026-06-10.
 * - siteId: optional Mindbody site override for the Sway Wellness Club
 *   locations (RiNo 5754020 / Central Park 5754021). Defaults to Larimer.
 *
 * Contract IDs are whitelisted server-side PER SITE so this route can only
 * sell the memberships we actually offer on the website. Contract ids
 * collide across sites (the club sites were cloned from Larimer, so e.g.
 * id 122 means different agreements on each) — never share one whitelist.
 */

type SellableContract = { key: string; name: string; monthly: number };

const LARIMER_CONTRACTS: Record<number, SellableContract> = {
  122: { key: "essential", name: "Essential Membership", monthly: 99 },
  123: { key: "premier", name: "Premier Membership", monthly: 129 },
  124: { key: "ultimate", name: "Ultimate Membership", monthly: 159 },
  // Aescape sells as TWO new-menu contracts (guest picks a format). The old
  // generic 111 "Aescape Robot Membership" is deliberately NOT sellable —
  // pre-menu-switch product (Jocelyn incident, July 2026).
  119: { key: "aescape30", name: "Aescape 4x30 Membership", monthly: 99 },
  120: { key: "aescape60", name: "Aescape 2x60 Membership", monthly: 99 },
  102: { key: "remedy", name: "Remedy Room Membership", monthly: 99 },
};

// Both club sites sell exactly one membership online: unlimited Remedy
// Lounge (contract 143 on each site, verified live 2026-07-04 via
// scripts/probe-club-membership-contract.mjs). SoldOnline=false in Mindbody
// is intentional — it keeps the contract out of the Mindbody consumer store;
// the purchasecontract API sells it regardless (proven by the July 1
// enrollment run on contract 100).
const CLUB_CONTRACTS: Record<number, SellableContract> = {
  143: {
    key: "club_lounge",
    name: "Premier Remedy Lounge Membership",
    monthly: 129,
  },
};

function sellableContractsForSite(
  siteId: string
): Record<number, SellableContract> | null {
  if (siteId === process.env.MINDBODY_SITE_ID) return LARIMER_CONTRACTS;
  if (isClubSiteId(siteId)) return CLUB_CONTRACTS;
  return null; // unknown site: refuse rather than guess
}

// All Sway serverless functions run in UTC on Vercel. Anchor "today" to
// Denver so an evening signup doesn't get a StartDate of tomorrow.
function denverToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function POST(req: Request) {
  // Card-testing protection: velocity-limit charge attempts per IP
  const rl = await checkCardRateLimit(req);
  if (!rl.allowed) {
    return NextResponse.json(RATE_LIMIT_RESPONSE, { status: 429 });
  }

  const rawBody = await req.json();
  const clientId =
    typeof rawBody.clientId === "string" || typeof rawBody.clientId === "number"
      ? String(rawBody.clientId).trim()
      : "";
  const contractId = Number(rawBody.contractId);
  const isTest = rawBody.test === true;
  // Optional siteId override (clubs; future: Spavia). Defaults to Larimer.
  const siteId =
    (typeof rawBody.siteId === "string" && rawBody.siteId) ||
    process.env.MINDBODY_SITE_ID!;

  const sellable = sellableContractsForSite(siteId);
  const contract = sellable?.[contractId];
  if (!clientId || !contract) {
    return NextResponse.json(
      { error: "Invalid membership selection." },
      { status: 400 }
    );
  }

  try {
    const token = await getMindbodyStaffToken(siteId);

    // Look up the client's stored card server-side — purchasecontract's
    // StoredCardInfo wants the last four, and we don't trust it from the browser.
    const lookupUrl = new URL(
      "https://api.mindbodyonline.com/public/v6/client/clients"
    );
    lookupUrl.searchParams.set("request.clientIds", clientId);
    lookupUrl.searchParams.set("request.limit", "1");
    const lookupRes = await fetch(lookupUrl.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const lookupData = await lookupRes.json().catch(() => ({}));
    const client = Array.isArray(lookupData?.Clients)
      ? lookupData.Clients[0]
      : null;

    if (!lookupRes.ok || !client) {
      console.error("[membership/purchase] client lookup failed:", {
        clientId,
        status: lookupRes.status,
      });
      return NextResponse.json(
        { error: "We couldn't find your account. Please try again." },
        { status: 400 }
      );
    }

    const lastFour = client.ClientCreditCard?.LastFour;
    if (!lastFour) {
      return NextResponse.json(
        {
          error: "No card on file for this account.",
          code: "no_card",
        },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/sale/purchasecontract",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Api-Key": process.env.MINDBODY_API_KEY!,
          SiteId: siteId,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Test: isTest,
          LocationId: 1,
          ClientId: clientId,
          ContractId: contractId,
          StartDate: denverToday(),
          FirstPaymentOccurs: "Instant",
          // Mindbody emails the client a purchase confirmation on real sales.
          SendNotifications: !isTest,
          StoredCardInfo: { LastFour: String(lastFour) },
        }),
      }
    );

    const data = await res.json().catch(() => ({}));

    console.log("[membership/purchase] MB result:", {
      httpStatus: res.status,
      test: isTest,
      contractId,
      contractKey: contract.key,
      clientId,
      clientContractId: data?.ClientContractId ?? null,
      totals: data?.Totals ?? null,
      paymentFailures: data?.PaymentProcessingFailures ?? null,
      error: data?.Error ?? null,
    });

    if (!res.ok) {
      const mbMessage: string = data?.Error?.Message ?? "";
      const lowerErr = mbMessage.toLowerCase();

      // Structural errors (the contract itself, not the customer's card) — don't
      // bounce to the card step, it won't help.
      const isContractIssue =
        lowerErr.includes("contract") || lowerErr.includes("not available");

      // Everything else at the charge step is payment-related, so route the user
      // back to the card step to try another card (Baymard: the retry PATH
      // recovers ~30% of declines). We deliberately do NOT leak the specific
      // decline reason (declined / expired / insufficient) — that gives
      // card-testers an oracle. The per-IP rate limiter is the real defense.
      const code = isContractIssue ? null : "card_failed";
      const userMessage = isContractIssue
        ? "This membership isn't available for online signup right now. Please call (303) 476-6150 and we'll set you up."
        : "We couldn't process that card. Please double-check the details or try a different card. Call (303) 476-6150 if it keeps happening.";

      return NextResponse.json(
        { error: userMessage, code, mbError: mbMessage || null },
        { status: res.status }
      );
    }

    // Defensive: Mindbody can return 200 with payment failures attached
    // (EU SCA flows). We don't expect these on US cards, but never report
    // success if any are present.
    if (
      Array.isArray(data?.PaymentProcessingFailures) &&
      data.PaymentProcessingFailures.length > 0
    ) {
      console.error(
        "[membership/purchase] payment processing failures:",
        data.PaymentProcessingFailures
      );
      return NextResponse.json(
        {
          error:
            "We couldn't process that card. Please try a different card, or call (303) 476-6150 and we'll help.",
          code: "card_failed",
        },
        { status: 402 }
      );
    }

    return NextResponse.json({
      success: true,
      test: isTest,
      clientContractId: data?.ClientContractId ?? null,
      totals: data?.Totals ?? null,
      membership: contract.key,
    });
  } catch (err: any) {
    console.error("[membership/purchase] error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
