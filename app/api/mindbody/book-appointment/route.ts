// /api/mindbody/book-appointment/route.ts

import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { recordBookingAttribution } from "@/lib/adAttribution";

/**
 * Maps SessionTypeId -> StaffId
 *
 * IMPORTANT:
 * - Availability staff MUST match booking staff in Mindbody
 * - Do NOT accept staffId from the frontend
 */
function resolveStaffId(sessionTypeId: number): number | null {
  // Remedy Room
  if ([96, 97].includes(sessionTypeId)) {
    return 100000014;
  }

  // Aescape sessions
  if ([92, 93, 94, 95].includes(sessionTypeId)) {
    return 100000040;
  }

  return null;
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    clientId,
    sessionTypeId,
    startDateTime,
    locationId = 1,
    notes,
    // Google Ads click id captured at landing (lib/gclid.ts). Optional and
    // purely for attribution, never affects booking behaviour.
    gclid,
  } = body;

  if (!clientId || !sessionTypeId || !startDateTime) {
    return NextResponse.json(
      { error: "Missing required booking fields" },
      { status: 400 }
    );
  }

  const resolvedStaffId = resolveStaffId(Number(sessionTypeId));

  if (!resolvedStaffId) {
    return NextResponse.json(
      { error: `Unsupported session type: ${sessionTypeId}` },
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
          StaffId: resolvedStaffId,
          LocationId: locationId,
          StartDateTime: startDateTime,
          ApplyPayment: false,
          SendEmail: true,
          ...(typeof notes === "string" && notes.trim()
            ? { Notes: notes.trim() }
            : {}),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Booking failed",
          details: data,
        },
        { status: res.status }
      );
    }

    // Attribution only: remember which ad click produced this appointment
    // (same store as /api/service/book). Runs after Mindbody confirmed the
    // booking and fails open, so it can never fail a booking.
    const apptId = data?.Appointment?.Id;
    if (typeof gclid === "string" && gclid && apptId) {
      await recordBookingAttribution({
        gclid,
        appointmentId: apptId,
        clientId,
        sessionTypeId,
        startDateTime: data.Appointment?.StartDateTime ?? startDateTime,
        siteId: process.env.MINDBODY_SITE_ID ?? null,
      });
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
