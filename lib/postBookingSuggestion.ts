/**
 * Post-booking "complete your visit" suggestion for the Larimer /book
 * confirmation screen. Read-only availability checks, first fit wins:
 *
 *   massage booked:  1. 15-min Aescape warm-up BEFORE (start 30-60 min
 *                       before, closest to 45)
 *                    2. Remedy Room AFTER (start 15-60 min after the massage
 *                       ends, earliest: time to change into a swimsuit)
 *                    3. a facial the same day, before or after
 *   facial booked:   2. Remedy Room after, then 3. a massage the same day
 *
 * No fit -> null (the screen falls back to its plain buttons).
 *
 * Times are naive Mindbody local times ("YYYY-MM-DDTHH:MM:SS", Denver), the
 * same as the booking flows use. Candidate grids mirror the destination
 * pages (Aescape + Remedy Room: 10-min steps from each window's start) so the
 * time we name is one the guest will actually see there.
 */

export type SuggestionKind = "aescape_warmup" | "remedy_room_after" | "facial_same_day" | "massage_same_day";

export type PostBookingSuggestion = {
  kind: SuggestionKind;
  date: string; // YYYY-MM-DD
  at: string; // HH:MM
  label: string; // "1:50 PM"
  relation: "before" | "after";
};

const MIN = 60_000;
const AESCAPE_EXPRESS_ID = 95;
const REMEDY_ROOM_ID = 96;
const REMEDY_ROOM_STAFF_ID = 100000014;
// Mirrors book-remedy-room: 40-min session + 10-min buffer, 3 per start time.
const REMEDY_BLOCK_MINUTES = 50;
const REMEDY_MAX_CAPACITY = 3;
// Representative 50-min services for the same-day check.
const ESSENTIAL_FACIAL_ID = 75;
const ESSENTIAL_MASSAGE_ID = 2816;
const SAME_DAY_SERVICE_MINUTES = 50;
const SAME_DAY_GAP_MINUTES = 10;

function parse(raw: string): Date {
  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, ss);
}

function hhmm(d: Date) {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function label12(d: Date) {
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
}

function gridTimes(windows: { start: string; bookableEnd: string }[]): Date[] {
  const out: Date[] = [];
  for (const w of windows) {
    const cursor = parse(w.start);
    const last = parse(w.bookableEnd);
    const rem = cursor.getMinutes() % 10;
    cursor.setMinutes(cursor.getMinutes() + (rem ? 10 - rem : 0), 0, 0);
    for (; cursor <= last; cursor.setMinutes(cursor.getMinutes() + 10)) out.push(new Date(cursor));
  }
  return out;
}

async function getJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function denverNow(): Date {
  return parse(new Date().toLocaleString("sv-SE", { timeZone: "America/Denver" }).replace(" ", "T"));
}

async function aescapeBefore(date: string, start: Date, earliest: Date): Promise<Date | null> {
  const data = await getJson(`/api/aescape/availability?sessionTypeId=${AESCAPE_EXPRESS_ID}&date=${date}`);
  if (!Array.isArray(data?.windows)) return null;
  let best: Date | null = null;
  let bestGap = Infinity;
  for (const t of gridTimes(data.windows)) {
    const lead = (start.getTime() - t.getTime()) / MIN;
    if (lead < 30 || lead > 60 || t < earliest) continue;
    const gap = Math.abs(lead - 45);
    if (gap < bestGap || (gap === bestGap && best && t > best)) {
      best = t;
      bestGap = gap;
    }
  }
  return best;
}

async function remedyAfter(date: string, end: Date, earliest: Date): Promise<Date | null> {
  const [avail, sched] = await Promise.all([
    getJson(`/api/remedy-room/availability?sessionTypeId=${REMEDY_ROOM_ID}&date=${date}`),
    getJson(`/api/service/staff-schedule?staffId=${REMEDY_ROOM_STAFF_ID}&date=${date}`),
  ]);
  if (!Array.isArray(avail?.windows) || !Array.isArray(sched?.appointments)) return null;
  const appts: { start: number; end: number }[] = sched.appointments.map((a: { start: string }) => {
    const s = parse(a.start).getTime();
    return { start: s, end: s + REMEDY_BLOCK_MINUTES * MIN };
  });
  // Same rule as book-remedy-room's filterAvailableSlots: no overlap with a
  // different start time, and fewer than 3 at the same start.
  const open = (t: Date) => {
    const s = t.getTime();
    const e = s + REMEDY_BLOCK_MINUTES * MIN;
    let same = 0;
    for (const a of appts) {
      if (a.start === s) same++;
      else if (a.start < e && a.end > s) return false;
    }
    return same < REMEDY_MAX_CAPACITY;
  };
  for (const t of gridTimes(avail.windows)) {
    const after = (t.getTime() - end.getTime()) / MIN;
    if (after < 15 || after > 60 || t < earliest) continue;
    if (open(t)) return t; // earliest fit
  }
  return null;
}

async function sameDay(
  sessionTypeId: number,
  date: string,
  start: Date,
  end: Date,
  earliest: Date
): Promise<{ t: Date; relation: "before" | "after" } | null> {
  const data = await getJson(`/api/service/availability?sessionTypeId=${sessionTypeId}&date=${date}`);
  const slots: { startDateTime: string }[] = Array.isArray(data?.slots) ? data.slots : [];
  let best: { t: Date; relation: "before" | "after"; distance: number } | null = null;
  for (const s of slots) {
    const t = parse(s.startDateTime);
    if (t < earliest) continue;
    const tEnd = t.getTime() + SAME_DAY_SERVICE_MINUTES * MIN;
    let relation: "before" | "after" | null = null;
    let distance = 0;
    if (tEnd + SAME_DAY_GAP_MINUTES * MIN <= start.getTime()) {
      relation = "before";
      distance = start.getTime() - tEnd;
    } else if (t.getTime() >= end.getTime() + SAME_DAY_GAP_MINUTES * MIN) {
      relation = "after";
      distance = t.getTime() - end.getTime();
    }
    if (relation && (!best || distance < best.distance)) best = { t, relation, distance };
  }
  // Only worth suggesting if it's reasonably close to their visit (2 hours).
  return best && best.distance <= 120 * MIN ? { t: best.t, relation: best.relation } : null;
}

export async function findPostBookingSuggestion(opts: {
  category: "massage" | "facial";
  startDateTime: string; // booked service start
  totalMinutes: number; // service + boosts, as shown on the confirmation
}): Promise<PostBookingSuggestion | null> {
  const date = opts.startDateTime.slice(0, 10);
  const start = parse(opts.startDateTime);
  const end = new Date(start.getTime() + opts.totalMinutes * MIN);
  const earliest = new Date(denverNow().getTime() + 15 * MIN);
  const make = (kind: SuggestionKind, t: Date, relation: "before" | "after"): PostBookingSuggestion => ({
    kind,
    date,
    at: hhmm(t),
    label: label12(t),
    relation,
  });

  // Each step fails soft: an API hiccup just moves on to the next option.
  if (opts.category === "massage") {
    const a = await aescapeBefore(date, start, earliest).catch(() => null);
    if (a) return make("aescape_warmup", a, "before");
  }
  const r = await remedyAfter(date, end, earliest).catch(() => null);
  if (r) return make("remedy_room_after", r, "after");
  const other = opts.category === "massage" ? ESSENTIAL_FACIAL_ID : ESSENTIAL_MASSAGE_ID;
  const s = await sameDay(other, date, start, end, earliest).catch(() => null);
  if (s) return make(opts.category === "massage" ? "facial_same_day" : "massage_same_day", s.t, s.relation);
  return null;
}
