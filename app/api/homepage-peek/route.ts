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
 */

// Essential Basic Massage — broadest, most-booked service; mirrors what's in
// app/api/service/availability/route.ts allowlist.
const SESSION_TYPE_ID = 88;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseMindbodyDateTime(raw: string | undefined | null): Date | null {
  if (!raw) return null;
  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, ss);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${pad(m)} ${ampm}`;
}

export async function GET() {
  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json({ nextTime: null });
  }

  const now = new Date();
  const today = formatDate(now);
  const tomorrow = formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );
  url.searchParams.append("request.sessionTypeIds[0]", String(SESSION_TYPE_ID));
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
    const availabilities: any[] = Array.isArray(data?.Availabilities)
      ? data.Availabilities
      : [];

    // Find earliest window start that's strictly in the future.
    let earliest: Date | null = null;
    for (const a of availabilities) {
      const start = parseMindbodyDateTime(a?.StartDateTime);
      if (!start) continue;
      if (start > now && (!earliest || start < earliest)) {
        earliest = start;
      }
    }

    if (!earliest) {
      return NextResponse.json({ nextTime: null });
    }

    return NextResponse.json({
      nextTime: formatTime(earliest),
      day: isSameDay(earliest, now) ? "today" : "tomorrow",
    });
  } catch {
    return NextResponse.json({ nextTime: null });
  }
}
