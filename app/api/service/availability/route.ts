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
  // Prefix pattern: "M - Holly", "M/E - Holly", "E - Sarah"
  let cleaned = raw.replace(/^[ME](?:\/[ME])*\s*[-–—]\s*/i, "");
  // Suffix pattern: "Holly M", "Holly M/E"
  cleaned = cleaned.replace(/\s+[ME](?:\/[ME])*$/i, "");
  return cleaned.trim() || null;
}

/* Allowed session-type IDs (massages + facials) */
const ALLOWED_SESSION_TYPE_IDS = new Set([
  // Massages
  7, // Deep Tissue
  13, // CauseMedic
  14, // Salt Stone
  15, // Sports
  16, // Basic
  49, // Lymphatic Drainage Detox

  // Facials
  5, // Forever Young
  6, // Glow Getter
  9, // Pore Perfection Acne
  10, // Sensitive Silk
  11, // Dr. Dennis Gross Vitamin C
  12, // Basic Facial
]);

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
 * Prevents accidental UTC shifts when Mindbody expects local.
 */
function formatLocalNaive(dt: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
    dt.getDate()
  )}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
}

/**
 * Expand a Mindbody availability window into discrete start times.
 * Steps by session length (typically 60 for massage/facial).
 *
 * Does NOT snap to :00/:30 — returns exact Mindbody-computed times.
 */
function expandAvailabilityWindow(a: any): Slot[] {
  const slots: Slot[] = [];

  const rawStart = a?.StartDateTime;
  if (!rawStart) return slots;

  const rawEnd = a?.BookableEndDateTime ?? a?.EndDateTime;
  if (!rawEnd) return slots;

  const start = parseMindbodyDateTime(rawStart);
  const end = parseMindbodyDateTime(rawEnd);

  const minutes =
    Number(a?.SessionType?.StaffTimeLength) ||
    Number(a?.SessionType?.Length) ||
    60;

  if (!Number.isFinite(minutes) || minutes <= 0) return slots;

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
  const date = searchParams.get("date");
  const staffIdRaw = searchParams.get("staffId");

  if (!sessionTypeIdRaw || !date) {
    return NextResponse.json(
      { error: "Missing sessionTypeId or date" },
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

  if (!isValidISODate(date)) {
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

  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/bookableitems"
  );

  url.searchParams.append(
    "request.sessionTypeIds[0]",
    String(sessionTypeId)
  );
  url.searchParams.append("request.startDate", `${date}T00:00:00`);
  url.searchParams.append("request.endDate", `${date}T23:59:59`);
  url.searchParams.append("request.includeResourceAvailability", "true");
  url.searchParams.append("request.limit", "200");

  if (staffIdRaw && Number.isFinite(Number(staffIdRaw))) {
    url.searchParams.append(
      "request.staffIds[0]",
      String(Number(staffIdRaw))
    );
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
      console.error("[SERVICE AVAILABILITY] Mindbody error", data);
      return NextResponse.json(
        { error: "Mindbody error", details: data },
        { status: res.status }
      );
    }

    const availabilities = Array.isArray(data?.Availabilities)
      ? data.Availabilities
      : [];
    const slots: Slot[] = availabilities.flatMap(expandAvailabilityWindow);

    // Dedup (sometimes duplicates across windows)
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
    console.error("[SERVICE AVAILABILITY] failure", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
