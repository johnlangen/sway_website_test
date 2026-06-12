import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { checkCardRateLimit, RATE_LIMIT_RESPONSE } from "@/lib/cardRateLimit";

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
 *
 * Contract IDs are whitelisted server-side so this route can only sell the
 * memberships we actually offer on the website.
 */

const SELLABLE_CONTRACTS: Record<
  number,
  { key: string; name: string; monthly: number }
> = {
  122: { key: "essential", name: "Essential Membership", monthly: 99 },
  123: { key: "premier", name: "Premier Membership", monthly: 129 },
  124: { key: "ultimate", name: "Ultimate Membership", monthly: 159 },
  111: { key: "aescape", name: "Aescape Membership", monthly: 99 },
  102: { key: "remedy", name: "Remedy Room Membership", monthly: 99 },
};

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
  // Optional siteId override (future: clubs / Spavia). Defaults to Larimer.
  const siteId =
    (typeof rawBody.siteId === "string" && rawBody.siteId) ||
    process.env.MINDBODY_SITE_ID!;

  const contract = SELLABLE_CONTRACTS[contractId];
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

      // "card_failed" lets the join flow send the user back to the card step
      // with their details intact (Baymard: specific decline message + an
      // immediate try-another-card path recovers ~30% of declines).
      let code: string | null = null;
      let userMessage =
        "We couldn't complete your membership purchase. Please try again or call (303) 476-6150.";
      if (lowerErr.includes("declined")) {
        code = "card_failed";
        userMessage =
          "Your card was declined by your bank. Try a different card, or call (303) 476-6150 and we'll help.";
      } else if (lowerErr.includes("expired")) {
        code = "card_failed";
        userMessage =
          "The card on file appears to be expired. Please add a current card and try again.";
      } else if (lowerErr.includes("insufficient")) {
        code = "card_failed";
        userMessage =
          "Your card was declined for insufficient funds. Please try a different card.";
      } else if (lowerErr.includes("contract")) {
        userMessage =
          "This membership isn't available for online signup right now. Please call (303) 476-6150 and we'll set you up.";
      }

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
            "Your payment needs additional verification. Please call (303) 476-6150 to finish signing up.",
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
