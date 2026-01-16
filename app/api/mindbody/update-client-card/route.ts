import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

function detectCardType(cardNumber: string) {
  if (/^3[47]/.test(cardNumber)) return "AmericanExpress";
  if (/^4/.test(cardNumber)) return "Visa";
  if (/^5[1-5]/.test(cardNumber)) return "MasterCard";
  if (/^6/.test(cardNumber)) return "Discover";
  return "Unknown";
}

export async function POST(req: Request) {
  const {
    clientId,
    cardNumber,
    expMonth,
    expYear,
    postalCode,
    cardHolder,
  } = await req.json();

  if (
    !clientId ||
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
    const cardType = detectCardType(cardNumber);

    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/client/updateclient",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Api-Key": process.env.MINDBODY_API_KEY!,
          SiteId: process.env.MINDBODY_SITE_ID!,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Client: {
            Id: clientId,
            ClientCreditCard: {
              CardNumber: cardNumber,
              ExpMonth: expMonth,
              ExpYear: expYear,
              PostalCode: postalCode,
              CardHolder: cardHolder,
              CardType: cardType,
            },
          },
          Test: false,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update client", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      clientId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
