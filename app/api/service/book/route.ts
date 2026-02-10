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

/* Time-extension boosts must be booked as SEPARATE appointments
 * immediately after the main appointment (they occupy real schedule time).
 * True add-ons (PEMF, Cupping, etc.) are attached via addappointmentaddon
 * as enhancements (no extra schedule time). */
const TIME_EXTENSION_IDS = new Set([
  28, // Make it 80 Minutes (massage +30 min)
  19, // Microcurrent Full (facial +30 min)
  20, // LED Light Therapy Full (facial +30 min)
]);

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

    /* ── Attach boosts ─────────────────────────── */

    const mainApptId = mainData.Appointment?.Id;
    const mainEndDateTime = mainData.Appointment?.EndDateTime;

    const addOnResults: any[] = [];

    // Split boosts into time-extensions (separate appointments) vs
    // true add-ons (enhancements via addappointmentaddon)
    const timeExtensions = validAddOns.filter((id) => TIME_EXTENSION_IDS.has(id));
    const trueAddOns = validAddOns.filter((id) => !TIME_EXTENSION_IDS.has(id));

    // 1) Time-extension boosts → book as separate appointments chained after main
    //    These occupy real schedule time (e.g., 30 min block after the 50 min service)
    //    Multiple extensions are chained: main → ext1 → ext2

    /* ── Book time-extension appointments ──
     * Strategy: try WITHOUT a resource first (works for massage extensions).
     * If Mindbody rejects with InvalidResource (needs a room), retry with
     * each esty table until one succeeds. This handles both:
     *   - Massage "Make it 80 Min" → no resource needed
     *   - Facial Super Boosts → require an esty table resource */

    // Esty table resource IDs to try when a resource IS required
    const ESTY_TABLE_IDS = [7, 6, 2, 5, 4]; // Esty Table 1–5

    let nextExtStart = mainEndDateTime;

    for (const extId of timeExtensions) {
      console.log(
        `[SERVICE BOOK] Booking time-extension ${extId} at ${nextExtStart}`
      );

      if (!nextExtStart) {
        console.error("[SERVICE BOOK] No start time for time extension, cannot schedule");
        addOnResults.push({ addOnId: extId, success: false, error: "Missing start time for extension" });
        continue;
      }

      let booked = false;

      // First: try without any resource
      try {
        console.log(`[SERVICE BOOK] Trying extension ${extId} without resource at ${nextExtStart}`);

        const extRes = await fetch(
          "https://api.mindbodyonline.com/public/v6/appointment/addappointment",
          {
            method: "POST",
            headers: mbHeaders,
            body: JSON.stringify({
              ClientId: cid,
              SessionTypeId: extId,
              StaffId: sid,
              LocationId: Number(locationId),
              StartDateTime: nextExtStart,
              ApplyPayment: false,
              SendEmail: false,
            }),
          }
        );

        const extData = await extRes.json();

        if (extRes.ok) {
          console.log(`[SERVICE BOOK] Time-extension ${extId} booked (no resource needed)`, extData);
          addOnResults.push({
            addOnId: extId,
            success: true,
            appointmentId: extData.Appointment?.Id,
          });
          nextExtStart = extData.Appointment?.EndDateTime ?? null;
          booked = true;
        } else if (extData?.Error?.Code === "InvalidResource") {
          // Needs a resource — fall through to esty table retry below
          console.log(`[SERVICE BOOK] Extension ${extId} requires a resource, trying esty tables...`);
        } else {
          // Some other error — report and move on
          console.error(`[SERVICE BOOK] Time-extension ${extId} failed`, extData);
          addOnResults.push({ addOnId: extId, success: false, details: extData });
          booked = true; // stop retrying
        }
      } catch (extErr: any) {
        console.error(`[SERVICE BOOK] Time-extension ${extId} error`, extErr);
        addOnResults.push({ addOnId: extId, success: false, error: extErr?.message || "Unknown error" });
        booked = true;
      }

      // Second: if it needs a resource, try each esty table
      if (!booked) {
        for (const resourceId of ESTY_TABLE_IDS) {
          try {
            console.log(`[SERVICE BOOK] Trying extension ${extId} with esty table ${resourceId}`);

            const extRes = await fetch(
              "https://api.mindbodyonline.com/public/v6/appointment/addappointment",
              {
                method: "POST",
                headers: mbHeaders,
                body: JSON.stringify({
                  ClientId: cid,
                  SessionTypeId: extId,
                  StaffId: sid,
                  LocationId: Number(locationId),
                  StartDateTime: nextExtStart,
                  ResourceIds: [resourceId],
                  ApplyPayment: false,
                  SendEmail: false,
                }),
              }
            );

            const extData = await extRes.json();

            if (extRes.ok) {
              console.log(
                `[SERVICE BOOK] Time-extension ${extId} booked on esty table ${resourceId}`,
                extData
              );
              addOnResults.push({
                addOnId: extId,
                success: true,
                appointmentId: extData.Appointment?.Id,
              });
              nextExtStart = extData.Appointment?.EndDateTime ?? null;
              booked = true;
              break;
            }

            // Resource unavailable → try next table
            const errCode = extData?.Error?.Code;
            if (errCode === "InvalidResource") {
              console.log(
                `[SERVICE BOOK] Esty table ${resourceId} unavailable for extension ${extId}, trying next...`
              );
              continue;
            }

            // Any other error → stop retrying
            console.error(`[SERVICE BOOK] Time-extension ${extId} failed`, extData);
            addOnResults.push({ addOnId: extId, success: false, details: extData });
            booked = true;
            break;
          } catch (extErr: any) {
            console.error(`[SERVICE BOOK] Time-extension ${extId} error`, extErr);
            addOnResults.push({ addOnId: extId, success: false, error: extErr?.message || "Unknown error" });
            booked = true;
            break;
          }
        }
      }

      if (!booked) {
        console.error(`[SERVICE BOOK] Time-extension ${extId} failed on all resources`);
        addOnResults.push({
          addOnId: extId,
          success: false,
          error: "No available resource (all rooms occupied)",
        });
      }
    }

    // 2) True add-ons (PEMF, Cupping, etc.) → attach as enhancements
    //    These don't occupy extra schedule time — attached to the parent appointment.
    for (const addOnId of trueAddOns) {
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
