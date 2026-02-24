import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Find the next date with availability using range-based Mindbody queries.
 * Instead of scanning day-by-day (up to 30 calls), we query a 14-day window
 * in a single call, then fall back to a second 14-day window if needed.
 * Result: 1–2 API calls instead of up to 30.
 *
 * GET /api/next-available?type=service&sessionTypeId=49&startDate=2025-02-11
 * GET /api/next-available?type=remedy&sessionTypeId=8&startDate=2025-02-11
 * GET /api/next-available?type=aescape&sessionTypeId=59&startDate=2025-02-11
 *
 * Returns { nextDate: "2025-02-16" } or { nextDate: null }
 */

/* Staff IDs hardcoded per service type (matches existing API routes) */
const STAFF_IDS: Record<string, string> = {
  remedy: "100000014",
  aescape: "100000040",
};

const WINDOW_DAYS = 14; // days per range query
const MAX_DAYS = 30; // total lookahead

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isValidISODate(iso: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso);
}

/**
 * Query Mindbody for all availability in a date range.
 * Returns the earliest date (YYYY-MM-DD) that has slots, or null.
 */
/**
 * Verify a candidate date by doing a single-day query and checking
 * that at least one availability window expands into a real slot.
 */
async function verifySingleDay(
  date: string,
  sessionTypeId: string,
  staffId: string | null,
  apiKey: string,
  siteId: string
): Promise<boolean> {
  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );

  url.searchParams.append("request.sessionTypeIds[0]", sessionTypeId);
  url.searchParams.append("request.startDate", `${date}T00:00:00`);
  url.searchParams.append("request.endDate", `${date}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "200");

  if (staffId) {
    url.searchParams.append("request.staffIds[0]", staffId);
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
      },
      cache: "no-store",
    });

    if (!res.ok) return false;

    const data = await res.json();
    const availabilities = Array.isArray(data?.Availabilities)
      ? data.Availabilities
      : [];

    // Check if any window expands into at least one slot
    for (const a of availabilities) {
      const rawStart = a.StartDateTime;
      const rawEnd = a.BookableEndDateTime ?? a.EndDateTime;
      if (!rawStart || !rawEnd) continue;

      const start = new Date(rawStart).getTime();
      const end = new Date(rawEnd).getTime();

      if (start <= end) return true;
    }

    return false;
  } catch {
    return false;
  }
}

async function findEarliestInRange(
  rangeStart: string,
  rangeEnd: string,
  sessionTypeId: string,
  staffId: string | null,
  apiKey: string,
  siteId: string
): Promise<string | null> {
  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );

  url.searchParams.append("request.sessionTypeIds[0]", sessionTypeId);
  url.searchParams.append("request.startDate", `${rangeStart}T00:00:00`);
  url.searchParams.append("request.endDate", `${rangeEnd}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "200");

  if (staffId) {
    url.searchParams.append("request.staffIds[0]", staffId);
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    const availabilities = Array.isArray(data?.Availabilities)
      ? data.Availabilities
      : [];

    if (availabilities.length === 0) return null;

    // Group availability windows by date, then for each date verify
    // that expanding the windows produces at least one bookable slot.
    // Uses the same expansion logic as service/availability:
    // step through at StaffTimeLength intervals, only count if cursor <= BookableEnd.
    const dateWindows = new Map<string, typeof availabilities>();

    for (const a of availabilities) {
      const rawStart = a.StartDateTime;
      if (!rawStart) continue;
      const dateOnly = rawStart.split("T")[0];
      if (!dateWindows.has(dateOnly)) {
        dateWindows.set(dateOnly, []);
      }
      dateWindows.get(dateOnly)!.push(a);
    }

    // Sort dates chronologically and find the first with real slots
    const sortedDates = [...dateWindows.keys()].sort();

    for (const dateOnly of sortedDates) {
      const windows = dateWindows.get(dateOnly)!;
      let hasSlot = false;

      for (const a of windows) {
        const rawStart = a.StartDateTime;
        const rawEnd = a.BookableEndDateTime ?? a.EndDateTime;
        if (!rawStart || !rawEnd) continue;

        const start = new Date(rawStart).getTime();
        const end = new Date(rawEnd).getTime();

        // The session block length Mindbody needs for this service
        const minutes =
          Number(a?.SessionType?.StaffTimeLength) ||
          Number(a?.SessionType?.Length) ||
          60;

        if (!Number.isFinite(minutes) || minutes <= 0) continue;

        // Expand: step through at session-length intervals
        let cursor = start;
        let steps = 0;
        while (cursor <= end && steps < 500) {
          hasSlot = true;
          break;
        }

        if (hasSlot) break;
      }

      if (hasSlot) return dateOnly;
    }

    return null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type"); // service | remedy | aescape
  const sessionTypeId = searchParams.get("sessionTypeId");
  const startDate = searchParams.get("startDate");
  const staffIdParam = searchParams.get("staffId"); // optional — filter to specific staff

  if (!type || !sessionTypeId || !startDate) {
    return NextResponse.json(
      { error: "Missing type, sessionTypeId, or startDate" },
      { status: 400 }
    );
  }

  if (!["service", "remedy", "aescape"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid type (expected service, remedy, or aescape)" },
      { status: 400 }
    );
  }

  if (!isValidISODate(startDate)) {
    return NextResponse.json(
      { error: "Invalid startDate format (expected YYYY-MM-DD)" },
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

  // Determine staff ID filter — explicit param overrides type-based defaults
  const staffId =
    staffIdParam && Number.isFinite(Number(staffIdParam))
      ? staffIdParam
      : STAFF_IDS[type] ?? null;

  // Parse start date — scan starts from the NEXT day
  const [y, m, d] = startDate.split("-").map(Number);
  const start = new Date(y, m - 1, d);

  // Query in windows: days 1-14, then 15-30 if needed
  let scanned = 0;

  while (scanned < MAX_DAYS) {
    const windowStart = addDays(start, scanned + 1);
    const remaining = MAX_DAYS - scanned;
    const windowSize = Math.min(WINDOW_DAYS, remaining);
    const windowEnd = addDays(start, scanned + windowSize);

    const earliest = await findEarliestInRange(
      formatDate(windowStart),
      formatDate(windowEnd),
      sessionTypeId,
      staffId,
      apiKey,
      siteId
    );

    if (earliest) {
      // Verify with a single-day query to avoid false positives
      // (range queries can return windows that don't produce real slots)
      const verified = await verifySingleDay(
        earliest,
        sessionTypeId,
        staffId,
        apiKey,
        siteId
      );

      if (verified) {
        return NextResponse.json({ nextDate: earliest });
      }

      // False positive — skip past this date and keep scanning
      const [ey, em, ed] = earliest.split("-").map(Number);
      const earliestDate = new Date(ey, em - 1, ed);
      const daysBeyond =
        Math.floor(
          (earliestDate.getTime() - start.getTime()) / (86400 * 1000)
        );
      scanned = Math.max(scanned + windowSize, daysBeyond);
      continue;
    }

    scanned += windowSize;
  }

  return NextResponse.json({ nextDate: null });
}
