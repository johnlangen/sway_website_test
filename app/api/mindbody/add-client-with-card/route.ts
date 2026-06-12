import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { checkCardRateLimit, RATE_LIMIT_RESPONSE } from "@/lib/cardRateLimit";

export const runtime = "nodejs";

function detectCardType(cardNumber: string): string {
  if (/^3[47]/.test(cardNumber)) return "AmericanExpress";
  if (/^4/.test(cardNumber)) return "Visa";
  if (/^5[1-5]/.test(cardNumber)) return "MasterCard";
  if (/^2[2-7]/.test(cardNumber)) return "MasterCard";
  if (/^6/.test(cardNumber)) return "Discover";
  return "Visa"; // fallback
}

export async function POST(req: Request) {
  // Card-testing protection: velocity-limit raw card submissions per IP
  const rl = await checkCardRateLimit(req);
  if (!rl.allowed) {
    return NextResponse.json(RATE_LIMIT_RESPONSE, { status: 429 });
  }

  const rawBody = await req.json();
  const {
    email,
    cardNumber,
    expMonth,
    expYear,
    postalCode,
    cardHolder,
    cardType,
    // Billing address — required by Mindbody when AVS Address verification is enabled
    address,
    city,
    state,
    // Optional notification preferences
    sendScheduleEmails = true,
    sendScheduleTexts = true,
    sendPromotionalEmails = false,
    sendPromotionalTexts = false,
  } = rawBody;

  // Defensive trim on identity fields. Frontend already trims, but a
  // bypassed-frontend submission with whitespace-only names ("  ") would
  // otherwise pass the truthy check below and land in Mindbody as a blank
  // name. This is the same failure mode that produced the May 15 and May
  // 19 nameless client creations.
  const firstName = typeof rawBody.firstName === "string" ? rawBody.firstName.trim() : "";
  const lastName = typeof rawBody.lastName === "string" ? rawBody.lastName.trim() : "";
  const mobilePhone = typeof rawBody.mobilePhone === "string" ? rawBody.mobilePhone.trim() : "";

  // Optional siteId override for the Sway Wellness Club locations. Defaults to Larimer.
  const siteId = (typeof rawBody.siteId === "string" && rawBody.siteId) || process.env.MINDBODY_SITE_ID!;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobilePhone ||
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

    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/client/addclient",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Api-Key": process.env.MINDBODY_API_KEY!,
          SiteId: siteId,
          // ⚠️ IMPORTANT: NO "Bearer"
          authorization: token,
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          MobilePhone: mobilePhone,

          ClientCreditCard: {
            CardNumber: cardNumber,
            ExpMonth: expMonth,
            ExpYear: expYear,
            PostalCode: postalCode,
            CardHolder: cardHolder,
            CardType: cardType || detectCardType(cardNumber),
            // AVS Address fields — required when Mindbody has AVS Address enabled.
            // Without these, Mindbody silently drops the card (HTTP 200 + Status: PartialSuccess).
            Address: address,
            City: city,
            State: state,
          },

          // Notification preferences
          SendAccountEmails: true,
          SendAccountTexts: true,
          SendScheduleEmails: sendScheduleEmails,
          SendScheduleTexts: sendScheduleTexts,
          SendPromotionalEmails: sendPromotionalEmails,
          SendPromotionalTexts: sendPromotionalTexts,

          Test: false,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Mindbody AddClient error:", data);
      const mbMessage = data?.Error?.Message;
      const userMessage = mbMessage
        ? `Account creation failed: ${mbMessage}`
        : "Unable to create your account. Please double-check your details or call us at (303) 476-6150.";
      return NextResponse.json(
        { error: userMessage, details: data },
        { status: res.status }
      );
    }

    // SAFETY NET: Mindbody can return HTTP 200 with Status: "PartialSuccess" when the
    // client was created but the credit card silently failed (e.g. AVS mismatch, declined,
    // expired). We MUST detect this — otherwise the user proceeds to book without a card
    // on file, breaking no-show protection.
    const cardSaved = !!(
      data?.Status !== "PartialSuccess" &&
      (!Array.isArray(data?.Errors) || data.Errors.length === 0) &&
      data?.Client?.ClientCreditCard &&
      (data.Client.ClientCreditCard.LastFour ||
        data.Client.ClientCreditCard.CardNumber)
    );

    const createdClientId = data?.Client?.Id != null ? String(data.Client.Id) : null;

    // SAFETY NET #2: Verify Mindbody actually persisted the name fields.
    // Same pattern as cardSaved — Mindbody can return 200 + Client.Id with
    // FirstName/LastName silently dropped (special chars, email dedup
    // merge into a stub record, etc.). Without this check we report success
    // and the booking proceeds with a nameless client. May 15 and May 19
    // pre-fix cases hit this path.
    const returnedFirst =
      typeof data?.Client?.FirstName === "string" ? data.Client.FirstName.trim() : "";
    const returnedLast =
      typeof data?.Client?.LastName === "string" ? data.Client.LastName.trim() : "";
    const namesPersisted = !!(returnedFirst && returnedLast);

    console.log("[add-client-with-card] MB result:", {
      httpStatus: res.status,
      mbStatus: data?.Status,
      clientId: createdClientId,
      cardSaved,
      namesPersisted,
      lastFour: data?.Client?.ClientCreditCard?.LastFour ?? null,
      errors: data?.Errors ?? null,
    });

    // If names didn't persist, log the request payload + Mindbody response
    // for debugging next time, and return a friendly error. Server-side
    // log only — does not leak to the browser.
    if (!namesPersisted) {
      console.error("[add-client-with-card] Names NOT persisted in Mindbody", {
        sentFirstName: firstName,
        sentLastName: lastName,
        clientId: createdClientId,
        returnedFirstName: data?.Client?.FirstName ?? null,
        returnedLastName: data?.Client?.LastName ?? null,
        mbStatus: data?.Status,
        mbErrors: data?.Errors ?? null,
      });
      return NextResponse.json(
        {
          error:
            "We couldn't save your name to your account. Please try again or call (303) 476-6150.",
          clientId: createdClientId,
        },
        { status: 400 }
      );
    }

    if (!cardSaved) {
      const firstError = Array.isArray(data?.Errors) ? data.Errors[0] : null;
      const mbErrMsg: string = firstError?.Message ?? "";

      // Map common Mindbody error patterns to friendly user-facing messages
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
          // Pass clientId back so the frontend can retry via /update-client-card
          // (the client was created in Mindbody — only the card failed).
          clientId: createdClientId,
          mbError: mbErrMsg || null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      clientId: createdClientId,
      lastFour: data?.Client?.ClientCreditCard?.LastFour ?? null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
