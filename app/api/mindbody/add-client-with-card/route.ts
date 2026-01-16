import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

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
  } = await req.json();

  if (
    !firstName ||
    !lastName ||
    !email ||
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
          MobilePhone: mobilePhone || undefined,

          ClientCreditCard: {
            CardNumber: cardNumber,
            ExpMonth: expMonth,
            ExpYear: expYear,
            PostalCode: postalCode,
            CardHolder: cardHolder,
            CardType: "Visa", // 🔴 REQUIRED (you can detect later)
          },

          Test: false,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Mindbody AddClient error:", data);
      return NextResponse.json(
        { error: "Failed to add client", details: data },
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
