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
    !cardHolder
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

    return NextResponse.json({
      success: true,
      clientId: data?.Client?.Id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
