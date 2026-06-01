import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Cache the response for 10 minutes at the CDN/route level. Mindbody is hit
// at most ~6 times/hour from this endpoint regardless of homepage traffic.
export const revalidate = 600;

/**
 * GET /api/homepage-peek
 *
 * Returns the next available Essential Massage slot today or tomorrow, used
 * by the homepage hero to show a small "Next available: today 6:15 PM" cue.
 *
 * Returns:
 *   { nextTime: "6:15 PM", day: "today" | "tomorrow" }   on success
 *   { nextTime: null }                                    when nothing bookable
 *
 * IMPORTANT — timezone:
 * Vercel runs in UTC. Naive date math (new Date().getDate() etc) returns UTC
 * values, which after ~6 PM Denver makes the server think "today" is already
 * tomorrow. That causes the route to query Mindbody for the wrong day and
 * label the result wrong. All date/time work below is anchored to Denver via
 * Intl.DateTimeFormat so the user sees real Denver-local results.
 */

// Essential Basic Massage — broadest, most-booked service; mirrors what's in
// app/api/service/availability/route.ts allowlist.
const SESSION_TYPE_ID = 88;

// Property timezone. All Mindbody dates are wall-clock in this zone.
const TZ = "America/Denver";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Return Denver-local Y/M/D/H/M/S components for an absolute Date. */
function partsInDenver(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) =>
    parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") % 24, // Intl can emit "24" for midnight on some engines
    minute: get("minute"),
    second: get("second"),
  };
}

/** Denver-local "YYYY-MM-DD" for an absolute Date. */
function denverDateString(d: Date): string {
  const p = partsInDenver(d);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

/** Add `days` calendar days to a Denver-local date string. */
function addDaysDenver(dateStr: string, days: number): string {
  // Anchor at noon Denver to avoid DST-transition edge cases (no day in DEN
  // ever has a missing or duplicated noon).
  const [y, m, d] = dateStr.split("-").map(Number);
  const anchor = parseDenverWallClock(`${dateStr}T12:00:00`);
  if (!anchor) {
    // Fallback: naive UTC math (good enough — only used if Intl is broken)
    const fallback = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
    return denverDateString(fallback);
  }
  const next = new Date(anchor.getTime() + days * 24 * 60 * 60 * 1000);
  return denverDateString(next);
}

/**
 * Parse a Mindbody wall-clock string ("YYYY-MM-DDTHH:mm:ss") as Denver-local
 * time and return the corresponding absolute Date. Handles MDT/MST DST
 * automatically by asking Intl what Denver shows for a UTC guess and shifting
 * by the difference.
 */
function parseDenverWallClock(raw: string | undefined | null): Date | null {
  if (!raw) return null;
  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);
  if (!y || !m || !d) return null;

  // Treat input as UTC first.
  const guessUtcMs = Date.UTC(y, m - 1, d, hh, mm, ss);
  const guess = new Date(guessUtcMs);

  // What does Denver show for that UTC moment?
  const shown = partsInDenver(guess);
  const shownUtcMs = Date.UTC(
    shown.year,
    shown.month - 1,
    shown.day,
    shown.hour,
    shown.minute,
    shown.second
  );

  // Difference between the wall-clock we wanted in Denver and what Denver
  // actually shows for the UTC guess gives the offset we need to apply.
  const offsetMs = guessUtcMs - shownUtcMs;
  return new Date(guessUtcMs + offsetMs);
}

/** Format an absolute Date as a Denver-local "h:mm AM/PM" string. */
function formatTimeInDenver(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

/** True if two absolute Dates fall on the same Denver-local calendar date. */
function isSameDenverDay(a: Date, b: Date): boolean {
  return denverDateString(a) === denverDateString(b);
}

export async function GET() {
  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json({ nextTime: null });
  }

  const now = new Date();
  const today = denverDateString(now);
  const tomorrow = addDaysDenver(today, 1);

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );
  url.searchParams.append("request.sessionTypeIds[0]", String(SESSION_TYPE_ID));
  // Mindbody interprets these in the property's local TZ (Denver) — exactly
  // what we want now that today/tomorrow are Denver-local strings.
  url.searchParams.append("request.startDate", `${today}T00:00:00`);
  url.searchParams.append("request.endDate", `${tomorrow}T23:59:59`);
  url.searchParams.append("request.limit", "200");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Api-Key": apiKey,
        SiteId: siteId,
      },
      // Route-level revalidate already caches; this hint reinforces it at the
      // platform fetch layer (Vercel data cache).
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json({ nextTime: null });
    }

    const data = await res.json();
    const availabilities: Array<{ StartDateTime?: string }> = Array.isArray(
      data?.Availabilities
    )
      ? data.Availabilities
      : [];

    // Find earliest window start that's strictly in the future (absolute time
    // comparison — both sides are real moments, TZ no longer matters here).
    let earliest: Date | null = null;
    for (const a of availabilities) {
      const start = parseDenverWallClock(a?.StartDateTime);
      if (!start) continue;
      if (start > now && (!earliest || start < earliest)) {
        earliest = start;
      }
    }

    if (!earliest) {
      return NextResponse.json({ nextTime: null });
    }

    return NextResponse.json({
      nextTime: formatTimeInDenver(earliest),
      day: isSameDenverDay(earliest, now) ? "today" : "tomorrow",
    });
  } catch {
    return NextResponse.json({ nextTime: null });
  }
}
