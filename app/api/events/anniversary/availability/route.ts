import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Slot = {
    startDateTime: string;
    staffId: number | null;
    staffName: string | null;
  };
  
/** Strip staff-type codes like "M - ", "M/E - " (prefix) or " M", " M/E" (suffix) */
function cleanStaffName(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let cleaned = raw.replace(/^[ME](?:\/[ME])*\s*[-–—]\s*/i, "");
  cleaned = cleaned.replace(/\s+[ME](?:\/[ME])*$/i, "");
  return cleaned.trim() || null;
}

const EVENT_DATE = "2026-02-28";
const EVENT_SESSION_TYPE_IDS = new Set([68, 69, 70, 71]);

function isValidISODate(iso: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso);
}

/**
 * Mindbody sometimes returns datetimes WITHOUT timezone (local).
 * This parser treats "no TZ" as local time.
 */
function parseMindbodyDateTime(raw: string) {
  const hasTZ =
    raw.endsWith("Z") ||
    /[+-]\d{2}:\d{2}$/.test(raw) ||
    /[+-]\d{4}$/.test(raw);

  if (hasTZ) return new Date(raw);

  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);

  return new Date(y, m - 1, d, hh, mm, ss);
}

/**
 * Format local Date -> "YYYY-MM-DDTHH:mm:ss" (no Z)
 * This prevents accidental UTC shifts when Mindbody expects local.
 */
function formatLocalNaive(dt: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(
    dt.getHours()
  )}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
}

/**
 * Expand a Mindbody availability window into discrete starts.
 * We step by the session length (usually 30 for your event).
 *
 * IMPORTANT:
 * - We DO NOT snap to :00/:30 (that can hide real availability for massage/facial)
 * - We return exact times we computed from Mindbody's own window.
 */
function expandAvailabilityWindow(a: any) {
  const slots: {
    startDateTime: string;
    staffId: number | null;
    staffName: string | null;
  }[] = [];

  const rawStart = a?.StartDateTime;
  if (!rawStart) return slots;

  const rawEnd = a?.BookableEndDateTime ?? a?.EndDateTime;
  if (!rawEnd) return slots;

  const start = parseMindbodyDateTime(rawStart);
  const end = parseMindbodyDateTime(rawEnd);

  // Prefer StaffTimeLength if present; fallback to 30
  const minutes =
    Number(a?.SessionType?.StaffTimeLength) ||
    Number(a?.SessionType?.Length) ||
    30;

  if (!Number.isFinite(minutes) || minutes <= 0) return slots;

  // Safety cap to avoid runaway loops if Mindbody sends weird data
  const maxSteps = 500;

  let cursor = new Date(start);
  let steps = 0;

  while (cursor <= end && steps < maxSteps) {
    slots.push({
      startDateTime: formatLocalNaive(cursor),
      staffId:
        a?.Staff?.Id != null && Number.isFinite(Number(a.Staff.Id))
          ? Number(a.Staff.Id)
          : null,
      staffName: cleanStaffName(
        a?.Staff?.DisplayName ||
          a?.Staff?.Name ||
          `${a?.Staff?.FirstName ?? ""} ${a?.Staff?.LastName ?? ""}`.trim() ||
          null
      ),
    });

    cursor = new Date(cursor.getTime() + minutes * 60 * 1000);
    steps++;
  }

  return slots;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sessionTypeIdRaw = searchParams.get("sessionTypeId");
  const date = searchParams.get("date") ?? EVENT_DATE;

  // Optional: allow frontend to narrow staff for fixed resources
  // (Aescape/Remedy). For massage/facial you typically omit this.
  const staffIdRaw = searchParams.get("staffId");

  if (!sessionTypeIdRaw) {
    return NextResponse.json(
      { error: "Missing sessionTypeId" },
      { status: 400 }
    );
  }

  const sessionTypeId = Number(sessionTypeIdRaw);

  if (!Number.isFinite(sessionTypeId) || !EVENT_SESSION_TYPE_IDS.has(sessionTypeId)) {
    return NextResponse.json(
      { error: "Unsupported sessionTypeId" },
      { status: 400 }
    );
  }

  if (!isValidISODate(date) || date !== EVENT_DATE) {
    return NextResponse.json(
      { error: `Unsupported date (locked to ${EVENT_DATE})` },
      { status: 400 }
    );
  }

  const apiKey = process.env.MINDBODY_API_KEY;
  const siteId = process.env.MINDBODY_SITE_ID;

  if (!apiKey || !siteId) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );

  url.searchParams.append("request.sessionTypeIds[0]", String(sessionTypeId));
  url.searchParams.append("request.startDate", `${EVENT_DATE}T00:00:00`);
  url.searchParams.append("request.endDate", `${EVENT_DATE}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "200");

  if (staffIdRaw && Number.isFinite(Number(staffIdRaw))) {
    url.searchParams.append("request.staffIds[0]", String(Number(staffIdRaw)));
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

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Mindbody error", details: data },
        { status: res.status }
      );
    }

    const availabilities = Array.isArray(data?.Availabilities) ? data.Availabilities : [];
    const slots: Slot[] = availabilities.flatMap(expandAvailabilityWindow);


    // Dedup (sometimes you can get duplicates across windows)
    const seen = new Set<string>();
    const unique = slots.filter((s) => {
      const key = `${s.startDateTime}|${s.staffId ?? "null"}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    unique.sort((a, b) => {
      const da = parseMindbodyDateTime(a.startDateTime).getTime();
      const db = parseMindbodyDateTime(b.startDateTime).getTime();
      return da - db;
    });

    return NextResponse.json({ slots: unique });
  } catch (err) {
    console.error("[EVENT AVAILABILITY] failure", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
