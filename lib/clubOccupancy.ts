/**
 * Rolling-occupancy helpers for the Sway Wellness Club Remedy Lounge.
 *
 * The Lounge is a shared room (cap 15 RiNo / 18 CP) that members enter on a
 * rolling basis, NOT in fixed waves. Mindbody only enforces capacity per exact
 * start time, so it cannot stop overlapping starts from overfilling the room.
 * These helpers compute true concurrent occupancy so we can gate bookings
 * ourselves — used both by the availability route (display) and the book route
 * (server guard).
 *
 * The pure functions (parseWall, formatWall, peakOverlap, generateSlotStarts)
 * are safe to import on the client. fetchClubAppointments is server-only.
 */

export interface ApptInterval {
  /** Mindbody wall-clock string, e.g. "2026-06-13T10:00:00" (no timezone). */
  start: string;
  end: string;
}

/**
 * Parse a Mindbody wall-clock string to a comparable number (ms).
 *
 * Timezone-agnostic on purpose: it never consults the runtime zone (Vercel runs
 * in UTC), so as long as EVERY value in a comparison is parsed the same way, the
 * arithmetic is valid wall-clock math. Do not use the result as a real instant.
 */
export function parseWall(s: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/.exec(s);
  if (!m) return NaN;
  const [, y, mo, d, hh, mm, ss] = m;
  return Date.UTC(+y, +mo - 1, +d, +hh, +mm, +(ss ?? 0));
}

/** Inverse of parseWall: format a wall-clock ms value back to "YYYY-MM-DDTHH:MM:SS". */
export function formatWall(ms: number): string {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(
    d.getUTCDate()
  )}T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

/**
 * Maximum number of intervals covering any single instant within [start, end).
 *
 * Overlap count only changes at an interval's start, so we sample `start` itself
 * plus every existing interval start that falls inside the window and take the
 * max. Boundary semantics match the room model: an interval ending exactly at
 * `start` does NOT count (e.g. > start), and one starting exactly at `start`
 * does (s <= t). `start`/`end` are in the same ms space as parseWall.
 */
export function peakOverlap(
  intervals: ApptInterval[],
  start: number,
  end: number
): number {
  const ivs = intervals
    .map((i) => ({ s: parseWall(i.start), e: parseWall(i.end) }))
    .filter(
      (i) => Number.isFinite(i.s) && Number.isFinite(i.e) && i.e > start && i.s < end
    );

  const points = [start, ...ivs.map((i) => i.s).filter((t) => t > start && t < end)];
  let peak = 0;
  for (const t of points) {
    let c = 0;
    for (const iv of ivs) if (iv.s <= t && iv.e > t) c++;
    if (c > peak) peak = c;
  }
  return peak;
}

/**
 * Lay a fixed-minute grid of start times across availability windows, snapped to
 * the step boundary relative to midnight. Returns wall-clock strings.
 */
export function generateSlotStarts(
  windows: { start: string; bookableEnd: string }[],
  stepMin: number
): string[] {
  const step = stepMin * 60_000;
  const out: number[] = [];

  for (const w of windows) {
    let cursor = parseWall(w.start);
    const last = parseWall(w.bookableEnd);
    if (!Number.isFinite(cursor) || !Number.isFinite(last)) continue;

    const dt = new Date(cursor);
    const dayStart = Date.UTC(
      dt.getUTCFullYear(),
      dt.getUTCMonth(),
      dt.getUTCDate()
    );
    const rem = (cursor - dayStart) % step;
    if (rem !== 0) cursor += step - rem;

    while (cursor <= last) {
      out.push(cursor);
      cursor += step;
    }
  }

  return Array.from(new Set(out))
    .sort((a, b) => a - b)
    .map(formatWall);
}

/**
 * Server-only: fetch a resource's booked appointments for a date, reduced to
 * {start, end} wall-clock intervals. Mirrors /api/service/staff-schedule.
 */
export async function fetchClubAppointments(opts: {
  siteId: string;
  token: string;
  staffId: number;
  locationId: number;
  date: string; // YYYY-MM-DD
}): Promise<ApptInterval[]> {
  const url = new URL(
    "https://api.mindbodyonline.com/public/v6/appointment/staffappointments"
  );
  url.searchParams.append("staffIds", String(opts.staffId));
  url.searchParams.append("startDate", `${opts.date}T00:00:00`);
  url.searchParams.append("endDate", `${opts.date}T23:59:59`);
  url.searchParams.append("locationIds", String(opts.locationId));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Api-Key": process.env.MINDBODY_API_KEY!,
      SiteId: opts.siteId,
      Authorization: `Bearer ${opts.token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`staffappointments ${res.status}`);
  }

  const data = await res.json().catch(() => ({}));
  const appts = data?.Appointments ?? data?.StaffAppointments ?? [];
  return (Array.isArray(appts) ? appts : [])
    .filter((a: any) => a.Status === "Booked" || a.Status === "Confirmed")
    .map((a: any) => ({ start: a.StartDateTime, end: a.EndDateTime }));
}
