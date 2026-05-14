import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

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
  const {
    firstName,
    lastName,
    email,
    mobilePhone,
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
  } = await req.json();

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
    const token = await getMindbodyStaffToken();

    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/client/addclient",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Api-Key": process.env.MINDBODY_API_KEY!,
          SiteId: process.env.MINDBODY_SITE_ID!,
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

    console.log("[add-client-with-card] MB result:", {
      httpStatus: res.status,
      mbStatus: data?.Status,
      clientId: createdClientId,
      cardSaved,
      lastFour: data?.Client?.ClientCreditCard?.LastFour ?? null,
      errors: data?.Errors ?? null,
    });

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
