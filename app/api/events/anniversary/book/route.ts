import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

const EVENT_DATE = "2026-02-28";
const EVENT_SESSION_TYPE_IDS = new Set([68, 69, 70, 71]);

function isoDateOnly(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export async function POST(req: Request) {
  try {
    const {
      clientId,
      sessionTypeId,
      startDateTime,
      staffId,
      locationId = 1,
    } = await req.json();

    console.log("[EVENT BOOK] Incoming", {
      clientId,
      sessionTypeId,
      startDateTime,
      staffId,
    });

    if (!clientId || !sessionTypeId || !startDateTime || !staffId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const stid = Number(sessionTypeId);
    const sid = Number(staffId);
    const cid = Number(clientId);

    if (!EVENT_SESSION_TYPE_IDS.has(stid)) {
      return NextResponse.json(
        { error: "Unsupported sessionTypeId" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(sid) || !Number.isFinite(cid)) {
      return NextResponse.json(
        { error: "Invalid staffId or clientId" },
        { status: 400 }
      );
    }

    const dt = new Date(startDateTime);
    if (Number.isNaN(dt.getTime())) {
      return NextResponse.json(
        { error: "Invalid startDateTime" },
        { status: 400 }
      );
    }

    if (isoDateOnly(dt) !== EVENT_DATE) {
      return NextResponse.json(
        { error: "Invalid booking date" },
        { status: 400 }
      );
    }

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
          ClientId: cid,
          SessionTypeId: stid,
          StaffId: sid,
          LocationId: Number(locationId),
          StartDateTime: startDateTime, // EXACT value from availability
          ApplyPayment: false,
          SendEmail: true,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("[EVENT BOOK] Mindbody rejected", data);
      return NextResponse.json(
        { error: "Booking failed", details: data },
        { status: res.status }
      );
    }

    console.log("[EVENT BOOK] Success", data);

    return NextResponse.json({
      success: true,
      appointment: data.Appointment ?? data,
    });
  } catch (err: any) {
    console.error("[EVENT BOOK] Server error", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
