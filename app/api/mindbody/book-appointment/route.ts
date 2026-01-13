// /api/mindbody/book-appointment/route.ts
import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    clientId,
    sessionTypeId,
    startDateTime,
    staffId = 100000040,
    locationId = 1,
  } = body;

  if (!clientId || !sessionTypeId || !startDateTime) {
    return NextResponse.json(
      { error: "Missing required booking fields" },
      { status: 400 }
    );
  }

  try {
    const token = await getMindbodyStaffToken();

    const res = await fetch(
      "https://api.mindbodyonline.com/public/v6/appointment/addappointment",
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
          ClientId: clientId,
          SessionTypeId: sessionTypeId,
          StaffId: staffId,
          LocationId: locationId,
          StartDateTime: startDateTime,
          ApplyPayment: false,
          SendEmail: true,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Booking failed", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      appointment: data.Appointment ?? data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
