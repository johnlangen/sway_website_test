import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { checkCardRateLimit, RATE_LIMIT_RESPONSE } from "@/lib/cardRateLimit";

export const runtime = "nodejs";

function detectCardType(cardNumber: string) {
  if (/^3[47]/.test(cardNumber)) return "AmericanExpress";
  if (/^4/.test(cardNumber)) return "Visa";
  if (/^5[1-5]/.test(cardNumber)) return "MasterCard";
  if (/^6/.test(cardNumber)) return "Discover";
  return "Unknown";
}

export async function POST(req: Request) {
  // Card-testing protection: velocity-limit raw card submissions per IP
  const rl = await checkCardRateLimit(req);
  if (!rl.allowed) {
    return NextResponse.json(RATE_LIMIT_RESPONSE, { status: 429 });
  }

  const rawBody = await req.json();
  const {
    clientId,
    cardNumber,
    expMonth,
    expYear,
    postalCode,
    cardHolder,
    // Billing address — required by Mindbody when AVS Address verification is enabled
    address,
    city,
    state,
  } = rawBody;

  // Mindbody's UpdateClient endpoint validates the ENTIRE client object even on
  // partial updates. If the existing client record has blank FirstName/LastName
  // (very common: Consumer Identity Service stubs created when anyone with a
  // universal Mindbody account first touches Sway), the call rejects with
  // 400 ValidationFailed — "Client first name is required."
  //
  // We accept optional firstName/lastName from the frontend (pre-filled from
  // /api/membership/check or collected via the "name" step). If not provided,
  // we GET the existing client and use whatever's on file. If those are still
  // blank, the existing failure mode persists (handled by the name-collection
  // step upstream).
  const requestFirstName = typeof rawBody.firstName === "string" ? rawBody.firstName.trim() : "";
  const requestLastName = typeof rawBody.lastName === "string" ? rawBody.lastName.trim() : "";

  // Optional siteId override for the Sway Wellness Club locations. Defaults to Larimer.
  const siteId = (typeof rawBody.siteId === "string" && rawBody.siteId) || process.env.MINDBODY_SITE_ID!;

  if (
    !clientId ||
    !cardNumber ||
    !expMonth ||
    !expYear ||
    !postalCode ||
    !cardHolder ||
    !address ||
    !city ||
    !state
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const token = await getMindbodyStaffToken(siteId);
    const cardType = detectCardType(cardNumber);
    const submittedLastFour = String(cardNumber).slice(-4);

    // Read-after-write verification: returns the stored LastFour when the card
    // Mindbody has on file matches THIS submission, else null. The club sites
    // intermittently return 500 "Something went wrong / Code: Unknown" AFTER
    // persisting the card (cross-regional propagation flake, July 2026 —
    // Kimberly Bringas incident), and PaymentAlreadyExists just means the card
    // is already stored. The response status can lie; the client record can't.
    async function cardActuallyOnFile(): Promise<string | null> {
      try {
        const verifyUrl = new URL(
          "https://api.mindbodyonline.com/public/v6/client/clients"
        );
        verifyUrl.searchParams.set("request.clientIds", String(clientId));
        verifyUrl.searchParams.set("request.limit", "1");
        const verifyRes = await fetch(verifyUrl.toString(), {
          headers: {
            Accept: "application/json",
            "Api-Key": process.env.MINDBODY_API_KEY!,
            SiteId: siteId,
            Authorization: `Bearer ${token}`,
          },
        });
        if (!verifyRes.ok) return null;
        const verifyData = await verifyRes.json();
        const stored = verifyData?.Clients?.[0]?.ClientCreditCard;
        if (!stored?.LastFour) return null;
        const sameCard =
          String(stored.LastFour) === submittedLastFour &&
          parseInt(String(stored.ExpMonth), 10) === parseInt(String(expMonth), 10) &&
          parseInt(String(stored.ExpYear), 10) === parseInt(String(expYear), 10);
        return sameCard ? String(stored.LastFour) : null;
      } catch {
        return null;
      }
    }

    // Resolve names: prefer request payload, fall back to a GetClient lookup.
    let resolvedFirst = requestFirstName;
    let resolvedLast = requestLastName;
    if (!resolvedFirst || !resolvedLast) {
      try {
        const lookupUrl = new URL(
          "https://api.mindbodyonline.com/public/v6/client/clients"
        );
        lookupUrl.searchParams.set("request.clientIds", String(clientId));
        lookupUrl.searchParams.set("request.limit", "1");
        const lookupRes = await fetch(lookupUrl.toString(), {
          headers: {
            Accept: "application/json",
            "Api-Key": process.env.MINDBODY_API_KEY!,
            // Must match the site the token was issued for (club override or
            // Larimer default). A token is rejected on a mismatched site, so
            // hardcoding the default broke this lookup for RiNo / Central Park.
            SiteId: siteId,
            Authorization: `Bearer ${token}`,
          },
        });
        if (lookupRes.ok) {
          const lookupData = await lookupRes.json();
          const existing = Array.isArray(lookupData?.Clients) ? lookupData.Clients[0] : null;
          const existingFirst = typeof existing?.FirstName === "string" ? existing.FirstName.trim() : "";
          const existingLast = typeof existing?.LastName === "string" ? existing.LastName.trim() : "";
          if (!resolvedFirst) resolvedFirst = existingFirst;
          if (!resolvedLast) resolvedLast = existingLast;
        }
      } catch (lookupErr) {
        console.warn("[update-client-card] GetClient lookup for name fallback failed:", lookupErr);
      }
    }

    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/client/updateclient",
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
          Client: {
            Id: clientId,
            // Include name fields whenever we have them. Mindbody validates the
            // whole client object; sending blanks against a stub will still fail
            // (caller should run /api/mindbody/update-client first).
            ...(resolvedFirst ? { FirstName: resolvedFirst } : {}),
            ...(resolvedLast ? { LastName: resolvedLast } : {}),
            ClientCreditCard: {
              CardNumber: cardNumber,
              ExpMonth: expMonth,
              ExpYear: expYear,
              PostalCode: postalCode,
              CardHolder: cardHolder,
              CardType: cardType,
              // AVS Address fields — required when Mindbody has AVS Address enabled.
              // Without these, Mindbody silently drops the card (HTTP 200 + Status: PartialSuccess).
              Address: address,
              City: city,
              State: state,
            },
          },
          // A stored card is per-site merchant data — propagating the update
          // across the cross-regional network (Larimer + clubs + Spavia) buys
          // nothing and is the suspected source of the intermittent
          // "Something went wrong / Code: Unknown" partial-write failures.
          CrossRegionalUpdate: false,
          Test: false,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      // Before surfacing the failure, check whether the card landed anyway —
      // Mindbody can error after persisting the write.
      const recoveredLastFour = await cardActuallyOnFile();
      if (recoveredLastFour) {
        console.log("[update-client-card] MB errored but card verified on file:", {
          httpStatus: res.status,
          clientId,
          siteId,
          lastFour: recoveredLastFour,
          mbError: data?.Error ?? data?.Errors ?? null,
        });
        return NextResponse.json({
          success: true,
          clientId,
          lastFour: recoveredLastFour,
          recovered: true,
        });
      }
      console.error("Mindbody UpdateClient error:", { clientId, siteId }, data);
      return NextResponse.json(
        { error: "Failed to update client", details: data },
        { status: res.status }
      );
    }

    // SAFETY NET: Mindbody can return HTTP 200 with Status: "PartialSuccess" when the
    // card update silently failed (e.g. AVS mismatch, declined). Detect it so the user
    // doesn't proceed to book without a card on file.
    const cardSaved = !!(
      data?.Status !== "PartialSuccess" &&
      (!Array.isArray(data?.Errors) || data.Errors.length === 0) &&
      data?.Client?.ClientCreditCard &&
      (data.Client.ClientCreditCard.LastFour ||
        data.Client.ClientCreditCard.CardNumber)
    );

    console.log("[update-client-card] MB result:", {
      httpStatus: res.status,
      mbStatus: data?.Status,
      clientId,
      cardSaved,
      lastFour: data?.Client?.ClientCreditCard?.LastFour ?? null,
      errors: data?.Errors ?? null,
    });

    if (!cardSaved) {
      // Same partial-write defense as the !res.ok path: PartialSuccess or a
      // response missing the card does not prove the card isn't stored.
      const recoveredLastFour = await cardActuallyOnFile();
      if (recoveredLastFour) {
        console.log("[update-client-card] PartialSuccess but card verified on file:", {
          clientId,
          siteId,
          lastFour: recoveredLastFour,
          mbStatus: data?.Status,
          errors: data?.Errors ?? null,
        });
        return NextResponse.json({
          success: true,
          clientId,
          lastFour: recoveredLastFour,
          recovered: true,
        });
      }

      const firstError = Array.isArray(data?.Errors) ? data.Errors[0] : null;
      const mbErrMsg: string = firstError?.Message ?? "";

      let userMessage =
        "We couldn't save your card. Please double-check your card number, expiration, and billing address — or try a different card. Call (303) 476-6150 if this keeps happening.";

      const lowerErr = mbErrMsg.toLowerCase();
      if (lowerErr.includes("street address") || lowerErr.includes("avs address")) {
        userMessage =
          "Your billing street address is required. Please re-enter it exactly as it appears on your card statement.";
      } else if (lowerErr.includes("postal") || lowerErr.includes("zip")) {
        userMessage =
          "Your billing ZIP code doesn't match what's on file with your card. Please double-check and try again.";
      } else if (lowerErr.includes("declined")) {
        userMessage =
          "Your card was declined. Please try a different card or call (303) 476-6150 for help.";
      } else if (lowerErr.includes("expired")) {
        userMessage =
          "This card appears to be expired. Please try a different card.";
      }

      return NextResponse.json(
        {
          error: userMessage,
          cardSaveFailed: true,
          clientId,
          mbError: mbErrMsg || null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      clientId,
      lastFour: data?.Client?.ClientCreditCard?.LastFour ?? null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
