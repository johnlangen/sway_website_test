import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/service/staff-list?sessionTypeId=16
 *
 * Returns all staff members who have any availability for the given session
 * type within the next 7 days. Uses a single Mindbody API call with a 7-day
 * range window, then extracts unique staff from the response.
 *
 * Response: { staff: [{ id: number, name: string }] }
 */

/** Strip staff-type codes like "M - ", "M/E - " (prefix) or " M", " M/E" (suffix) */
function cleanStaffName(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let cleaned = raw.replace(/^[ME](?:\/[ME])*\s*[-–—]\s*/i, "");
  cleaned = cleaned.replace(/\s+[ME](?:\/[ME])*$/i, "");
  return cleaned.trim() || null;
}

const ALLOWED_SESSION_TYPE_IDS = new Set([
  7, 13, 14, 15, 16, 49, // massages
  5, 6, 9, 10, 11, 12,   // facials
]);

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionTypeIdRaw = searchParams.get("sessionTypeId");

  if (!sessionTypeIdRaw) {
    return NextResponse.json(
      { error: "Missing sessionTypeId" },
      { status: 400 }
    );
  }

  const sessionTypeId = Number(sessionTypeIdRaw);

  if (
    !Number.isFinite(sessionTypeId) ||
    !ALLOWED_SESSION_TYPE_IDS.has(sessionTypeId)
  ) {
    return NextResponse.json(
      { error: "Unsupported sessionTypeId" },
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

  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 14);

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );

  url.searchParams.append(
    "request.sessionTypeIds[0]",
    String(sessionTypeId)
  );
  url.searchParams.append("request.startDate", `${formatDate(today)}T00:00:00`);
  url.searchParams.append("request.endDate", `${formatDate(endDate)}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "500");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[STAFF LIST] Mindbody error", data);
      return NextResponse.json(
        { error: "Mindbody error" },
        { status: res.status }
      );
    }

    const availabilities = Array.isArray(data?.Availabilities)
      ? data.Availabilities
      : [];

    // Extract unique staff
    const staffMap = new Map<number, string>();

    for (const a of availabilities) {
      const id = a?.Staff?.Id;
      if (id == null || !Number.isFinite(Number(id))) continue;
      if (staffMap.has(Number(id))) continue;

      const name = cleanStaffName(
        a?.Staff?.DisplayName ||
          a?.Staff?.Name ||
          `${a?.Staff?.FirstName ?? ""} ${a?.Staff?.LastName ?? ""}`.trim() ||
          null
      );

      if (name) {
        staffMap.set(Number(id), name);
      }
    }

    const staff = Array.from(staffMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ staff });
  } catch (err) {
    console.error("[STAFF LIST] failure", err);
    return NextResponse.json(
      { error: "Failed to fetch staff list" },
      { status: 500 }
    );
  }
}
