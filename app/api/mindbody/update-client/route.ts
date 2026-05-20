import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

/**
 * POST /api/mindbody/update-client
 *
 * Patches FirstName / LastName (and optional MobilePhone) on an existing
 * Mindbody client. Used to backfill names on stub records created by
 * third-party integrations (ClassPass, ResortPass, etc.) before booking,
 * so appointments never land in Mindbody with a blank name.
 */
export async function POST(req: Request) {
  const { clientId, firstName, lastName, mobilePhone } = await req.json();

  if (!clientId || !firstName || !lastName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const trimmedFirst = String(firstName).trim();
  const trimmedLast = String(lastName).trim();

  if (!trimmedFirst || !trimmedLast) {
    return NextResponse.json(
      { error: "First and last name are required." },
      { status: 400 }
    );
  }

  try {
    const token = await getMindbodyStaffToken();

    const clientPayload: Record<string, unknown> = {
      Id: clientId,
      FirstName: trimmedFirst,
      LastName: trimmedLast,
    };

    if (mobilePhone && String(mobilePhone).trim()) {
      clientPayload.MobilePhone = String(mobilePhone).trim();
    }

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
          Client: clientPayload,
          Test: false,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("[update-client] Mindbody UpdateClient error:", data);
      return NextResponse.json(
        {
          error: data?.Error?.Message || "Failed to update client details.",
          details: data,
        },
        { status: res.status }
      );
    }

    const updatedFirst = data?.Client?.FirstName ?? null;
    const updatedLast = data?.Client?.LastName ?? null;

    // Mindbody can occasionally return PartialSuccess or silently ignore fields.
    // Verify the names actually persisted before reporting success.
    const namesPersisted =
      typeof updatedFirst === "string" &&
      updatedFirst.trim() !== "" &&
      typeof updatedLast === "string" &&
      updatedLast.trim() !== "";

    console.log("[update-client] MB result:", {
      httpStatus: res.status,
      mbStatus: data?.Status,
      clientId,
      namesPersisted,
      firstName: updatedFirst,
      lastName: updatedLast,
    });

    if (!namesPersisted) {
      return NextResponse.json(
        {
          error:
            "We couldn't save your name to your account. Please call (303) 476-6150 so we can help.",
          details: data,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      clientId,
      firstName: updatedFirst,
      lastName: updatedLast,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
