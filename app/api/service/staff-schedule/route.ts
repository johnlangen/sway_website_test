import { NextResponse } from "next/server";
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";

export const runtime = "nodejs";

/**
 * Returns booked appointment windows for a given staff member on a date.
 * Used by the frontend to determine how much free time exists after a
 * selected slot, so we can warn if time-extension boosts won't fit.
 *
 * GET /api/service/staff-schedule?staffId=100000008&date=2026-02-13
 *
 * Response: { appointments: [{ start: "...", end: "..." }, ...] }
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const staffIdRaw = searchParams.get("staffId");
  const date = searchParams.get("date");

  if (!staffIdRaw || !date) {
    return NextResponse.json(
      { error: "Missing staffId or date" },
      { status: 400 }
    );
  }

  const staffId = Number(staffIdRaw);
  if (!Number.isFinite(staffId)) {
    return NextResponse.json(
      { error: "Invalid staffId" },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date format (expected YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  try {
    const token = await getMindbodyStaffToken();

    const url = new URL(
      "https://api.mindbodyonline.com/public/v6/appointment/staffappointments"
    );
    url.searchParams.append("staffIds", String(staffId));
    url.searchParams.append("startDate", `${date}T00:00:00`);
    url.searchParams.append("endDate", `${date}T23:59:59`);
    url.searchParams.append("locationIds", "1");

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[STAFF SCHEDULE] Mindbody error", data);
      return NextResponse.json(
        { error: "Mindbody error", details: data },
        { status: res.status }
      );
    }

    const appts = data?.Appointments ?? data?.StaffAppointments ?? [];

    // Return only start/end times — no sensitive data
    const appointments = (Array.isArray(appts) ? appts : [])
      .filter((a: any) => a.Status === "Booked" || a.Status === "Confirmed")
      .map((a: any) => ({
        start: a.StartDateTime,
        end: a.EndDateTime,
      }));

    return NextResponse.json({ appointments });
  } catch (err: any) {
    console.error("[STAFF SCHEDULE] Server error", err);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}
