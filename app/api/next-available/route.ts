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

    // Extract the earliest date from all availability windows
    let earliest: string | null = null;

    for (const a of availabilities) {
      const dt = a.StartDateTime; // e.g. "2025-02-16T09:00:00"
      if (!dt) continue;
      const dateOnly = dt.split("T")[0]; // "2025-02-16"
      if (!earliest || dateOnly < earliest) {
        earliest = dateOnly;
      }
    }

    return earliest;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type"); // service | remedy | aescape
  const sessionTypeId = searchParams.get("sessionTypeId");
  const startDate = searchParams.get("startDate");

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

  // Determine staff ID filter
  const staffId = STAFF_IDS[type] ?? null;

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
      return NextResponse.json({ nextDate: earliest });
    }

    scanned += windowSize;
  }

  return NextResponse.json({ nextDate: null });
}
