import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const {
    clientId,
    sendAccountEmails,
    sendAccountTexts,
    sendScheduleEmails,
    sendScheduleTexts,
    sendPromotionalEmails,
    sendPromotionalTexts,
  } = await req.json();

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing clientId" },
      { status: 400 }
    );
  }

  // Build only the fields that were explicitly provided
  const updates: Record<string, boolean> = {};
  if (typeof sendAccountEmails === "boolean")
    updates.SendAccountEmails = sendAccountEmails;
  if (typeof sendAccountTexts === "boolean")
    updates.SendAccountTexts = sendAccountTexts;
  if (typeof sendScheduleEmails === "boolean")
    updates.SendScheduleEmails = sendScheduleEmails;
  if (typeof sendScheduleTexts === "boolean")
    updates.SendScheduleTexts = sendScheduleTexts;
  if (typeof sendPromotionalEmails === "boolean")
    updates.SendPromotionalEmails = sendPromotionalEmails;
  if (typeof sendPromotionalTexts === "boolean")
    updates.SendPromotionalTexts = sendPromotionalTexts;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No notification preferences provided" },
      { status: 400 }
    );
  }

  try {
    const token = await getMindbodyStaffToken();

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
            ...updates,
          },
          CrossRegionalUpdate: false,
          Test: false,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Mindbody UpdateClient (notifications) error:", data);
      return NextResponse.json(
        { error: "Failed to update notification preferences", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, clientId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
