import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

/* Allowed main-service session-type IDs */
const ALLOWED_SERVICE_IDS = new Set([
  7, 13, 14, 15, 16, 49, // massages
  5, 6, 9, 10, 11, // facials
]);

/* Allowed add-on (boost) session-type IDs */
const ALLOWED_ADDON_IDS = new Set([
  28, // Make it 80 Minutes
  25, // Infrared PEMF Mat
  26, // Cupping
  19, // Microcurrent Full
  18, // Microcurrent Mini
  20, // LED Light Therapy Full
  31, // LED Light Therapy Mini
  21, // Hydraderm
  22, // Dermaflash
  17, // Peel
  24, // Oxygen Infusion
]);

/* Note: Time-extension vs add-on distinction no longer needed here.
 * All boosts are attached via addappointmentaddon endpoint, which
 * handles scheduling automatically (Mindbody manages the calendar). */

export async function POST(req: Request) {
  try {
    const {
      clientId,
      sessionTypeId,
      startDateTime,
      staffId,
      locationId = 1,
      addOnIds = [],
    } = await req.json();

    console.log("[SERVICE BOOK] Incoming", {
      clientId,
      sessionTypeId,
      startDateTime,
      staffId,
      addOnIds,
    });

    /* ── Validate required fields ───────────────── */

    if (!clientId || !sessionTypeId || !startDateTime || !staffId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const stid = Number(sessionTypeId);
    const sid = Number(staffId);
    // clientId can be a large number or UUID string — keep as-is
    const cid = String(clientId);

    if (!ALLOWED_SERVICE_IDS.has(stid)) {
      return NextResponse.json(
        { error: "Unsupported sessionTypeId" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(sid) || !cid) {
      return NextResponse.json(
        { error: "Invalid staffId or clientId" },
        { status: 400 }
      );
    }

    if (typeof startDateTime !== "string" || !startDateTime.includes("T")) {
      return NextResponse.json(
        { error: "Invalid startDateTime" },
        { status: 400 }
      );
    }

    /* ── Validate add-on IDs ───────────────── */

    const validAddOns: number[] = [];
    if (Array.isArray(addOnIds)) {
      for (const aid of addOnIds) {
        const n = Number(aid);
        if (!Number.isFinite(n) || !ALLOWED_ADDON_IDS.has(n)) {
          return NextResponse.json(
            { error: `Unsupported addOnId: ${aid}` },
            { status: 400 }
          );
        }
        validAddOns.push(n);
      }
    }

    /* ── Book main appointment ───────────────── */

    const token = await getMindbodyStaffToken();

    const mbHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Api-Key": process.env.MINDBODY_API_KEY!,
      SiteId: process.env.MINDBODY_SITE_ID!,
      Authorization: `Bearer ${token}`,
    };

    const mainRes = await fetch(
      "https://api.mindbodyonline.com/public/v6/appointment/addappointment",
      {
        method: "POST",
        headers: mbHeaders,
        body: JSON.stringify({
          ClientId: cid,
          SessionTypeId: stid,
          StaffId: sid,
          LocationId: Number(locationId),
          StartDateTime: startDateTime,
          ApplyPayment: false,
          SendEmail: true,
        }),
      }
    );

    const mainData = await mainRes.json();

    if (!mainRes.ok) {
      console.error("[SERVICE BOOK] Main appointment rejected", mainData);
      return NextResponse.json(
        { error: "Booking failed", details: mainData },
        { status: mainRes.status }
      );
    }

    console.log("[SERVICE BOOK] Main appointment booked", mainData);

    /* ── Attach add-ons (boosts) as enhancements ─ */

    // Use the dedicated addappointmentaddon endpoint to attach boosts
    // as enhancements on the parent appointment (instead of separate appointments).
    // This matches how Mindbody staff attach them in the UI.
    // Key: ApplyPayment must be false (no prepaid session to deduct).

    const mainApptId = mainData.Appointment?.Id;

    const addOnResults: any[] = [];

    for (const addOnId of validAddOns) {
      console.log(
        `[SERVICE BOOK] Attaching add-on ${addOnId} to appointment ${mainApptId}`
      );

      try {
        const addOnRes = await fetch(
          "https://api.mindbodyonline.com/public/v6/appointment/addappointmentaddon",
          {
            method: "POST",
            headers: mbHeaders,
            body: JSON.stringify({
              AppointmentId: mainApptId,
              SessionTypeId: addOnId,
              StaffId: sid,
              ApplyPayment: false,
            }),
          }
        );

        const addOnData = await addOnRes.json();

        if (!addOnRes.ok) {
          console.error(
            `[SERVICE BOOK] Add-on ${addOnId} failed`,
            addOnData
          );
          addOnResults.push({
            addOnId,
            success: false,
            details: addOnData,
          });
        } else {
          console.log(
            `[SERVICE BOOK] Add-on ${addOnId} attached`,
            addOnData
          );
          addOnResults.push({
            addOnId,
            success: true,
            addOnAppointmentId: addOnData.AddOnAppointmentId,
          });
        }
      } catch (addOnErr: any) {
        console.error(`[SERVICE BOOK] Add-on ${addOnId} error`, addOnErr);
        addOnResults.push({
          addOnId,
          success: false,
          error: addOnErr?.message || "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      appointment: mainData.Appointment ?? mainData,
      addOns: addOnResults,
    });
  } catch (err: any) {
    console.error("[SERVICE BOOK] Server error", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
