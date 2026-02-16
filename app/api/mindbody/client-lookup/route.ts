// /api/mindbody/client-lookup/route.ts
import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const token = await getMindbodyStaffToken();

    const url = new URL(
      "https://api.mindbodyonline.com/public/v6/client/clients"
    );
    url.searchParams.append("request.searchText", email);
    url.searchParams.append("request.includeInactive", "false");
    url.searchParams.append("request.limit", "1");

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: process.env.MINDBODY_SITE_ID!,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Mindbody error", details: data },
        { status: res.status }
      );
    }

    const client = data.Clients?.[0] ?? null;

    return NextResponse.json({
      found: Boolean(client),
      client,
      hasCardOnFile: Boolean(client?.ClientCreditCard),
      sendScheduleEmails: client?.SendScheduleEmails ?? null,
      sendScheduleTexts: client?.SendScheduleTexts ?? null,
      sendPromotionalEmails: client?.SendPromotionalEmails ?? null,
      sendPromotionalTexts: client?.SendPromotionalTexts ?? null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
