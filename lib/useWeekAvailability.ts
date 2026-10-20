"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Week-strip availability dots (pattern from Spavia's BookingCalendar).
 *
 * `loader` fetches the shown week in ONE request (the availability routes
 * take ?days=7) and resolves to { "YYYY-MM-DD": true | false }. A day that's
 * missing from the map is unknown and shows no dot (never a wrong "booked").
 * Results are cached per `key` (week + service + filters), so paging back
 * and forth or tapping days doesn't re-hit Mindbody. Stale responses for a
 * week the guest already left are dropped.
 */
export type DayAvailability = Record<string, boolean>;

export function useWeekAvailability(
  key: string | null,
  loader: () => Promise<DayAvailability | null>
): DayAvailability {
  const cache = useRef(new Map<string, DayAvailability>());
  const [map, setMap] = useState<DayAvailability>({});
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    if (!key) {
      setMap({});
      return;
    }
    const hit = cache.current.get(key);
    if (hit) {
      setMap(hit);
      return;
    }
    setMap({});
    let stale = false;
    loaderRef
      .current()
      .then((result) => {
        if (stale || !result) return;
        cache.current.set(key, result);
        setMap(result);
      })
      .catch(() => {});
    return () => {
      stale = true;
    };
  }, [key]);

  return map;
}

/** The 7 ISO dates starting at weekStart (local calendar days). */
export function weekIsoDays(weekStart: Date, days = 7): string[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
}

/**
 * Build the day map from per-day "has something" sets. When the response was
 * partial (Mindbody paginated), days with nothing are left unknown.
 */
export function toDayAvailability(isoDays: string[], open: Set<string>, partial: boolean): DayAvailability {
  const out: DayAvailability = {};
  for (const iso of isoDays) {
    if (open.has(iso)) out[iso] = true;
    else if (!partial) out[iso] = false;
  }
  return out;
}
