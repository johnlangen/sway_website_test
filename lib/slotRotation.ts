/**
 * Deterministic tie-break for booking slots.
 *
 * Mindbody returns availability grouped by staff in ascending staff-ID
 * order, so when two therapists share an exact start time the lowest-ID
 * therapist's slot renders first and silently wins every unfiltered
 * booking. Collapse same-time slots to one and rotate the assignee by
 * (day of year + hour): stateless, splits ties ~50/50 over time, and the
 * same slot resolves to the same therapist on every render of that day.
 *
 * Depends only on staffId — never staff name prefixes like "M/E - ",
 * which don't exist at every location.
 */

type RotatableSlot = { startDateTime: string; staffId: number | null };

function dayOfYear(y: number, m: number, d: number) {
  const cumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return cumulative[m - 1] + d + (isLeap && m > 2 ? 1 : 0);
}

export function rotateSameTimeSlots<T extends RotatableSlot>(slots: T[]): T[] {
  const byTime = new Map<string, T[]>();
  for (const s of slots) {
    const group = byTime.get(s.startDateTime);
    if (group) group.push(s);
    else byTime.set(s.startDateTime, [s]);
  }

  // Map preserves insertion order, so output stays in the input's time order
  const out: T[] = [];
  for (const group of byTime.values()) {
    if (group.length === 1) {
      out.push(group[0]);
      continue;
    }

    // One candidate per staff member, sorted by ID so the rotation index is
    // stable no matter what order the API returned them in
    const byStaff = new Map<number | null, T>();
    for (const s of group) {
      if (!byStaff.has(s.staffId)) byStaff.set(s.staffId, s);
    }
    const candidates = [...byStaff.values()].sort(
      (a, b) => (a.staffId ?? 0) - (b.staffId ?? 0)
    );
    if (candidates.length === 1) {
      out.push(candidates[0]);
      continue;
    }

    // startDateTime is a naive local string "YYYY-MM-DDTHH:mm:ss"
    const m = group[0].startDateTime.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2})/);
    if (!m) {
      out.push(candidates[0]);
      continue;
    }
    const idx =
      (dayOfYear(Number(m[1]), Number(m[2]), Number(m[3])) + Number(m[4])) %
      candidates.length;
    out.push(candidates[idx]);
  }
  return out;
}
