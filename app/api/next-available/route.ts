import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Scan forward day-by-day to find the next date with availability.
 *
 * GET /api/next-available?type=service&sessionTypeId=49&startDate=2025-02-11
 * GET /api/next-available?type=remedy&sessionTypeId=8&startDate=2025-02-11
 * GET /api/next-available?type=aescape&sessionTypeId=59&startDate=2025-02-11
 *
 * Returns { nextDate: "2025-02-16" } or { nextDate: null }
 */

const MAX_DAYS = 30;

/* Staff IDs hardcoded per service type (matches existing API routes) */
const STAFF_IDS: Record<string, string> = {
  remedy: "100000014",
  aescape: "100000040",
};

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

async function checkDateHasAvailability(
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
  url.searchParams.append("request.limit", "1"); // We only need to know if ANY exist

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

    return availabilities.length > 0;
  } catch {
    return false;
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

  // Parse start date and scan forward from the NEXT day
  const [y, m, d] = startDate.split("-").map(Number);
  const start = new Date(y, m - 1, d);

  for (let i = 1; i <= MAX_DAYS; i++) {
    const checkDate = addDays(start, i);
    const iso = formatDate(checkDate);

    const hasAvailability = await checkDateHasAvailability(
      iso,
      sessionTypeId,
      staffId,
      apiKey,
      siteId
    );

    if (hasAvailability) {
      return NextResponse.json({ nextDate: iso });
    }
  }

  return NextResponse.json({ nextDate: null });
}
