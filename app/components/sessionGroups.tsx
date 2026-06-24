import type { ReactNode } from "react";

/**
 * Shared time-of-day grouping for every booking flow's session/time picker
 * (Larimer service / remedy room / aescape, and the club Remedy Lounge /
 * service flows). Standardizes the buckets, labels, and the sun→moon icons so
 * every "choose a time" screen looks identical. The icons originated in the
 * Larimer service flow; they're stroke-based, so they inherit the heading's
 * text color.
 */

export type PartOfDayKey = "morning" | "midday" | "afternoon" | "evening";

const PARTS: { key: PartOfDayKey; label: string; maxHour: number }[] = [
  { key: "morning", label: "Morning", maxHour: 12 },
  { key: "midday", label: "Midday", maxHour: 14 },
  { key: "afternoon", label: "Afternoon", maxHour: 17 },
  { key: "evening", label: "Evening", maxHour: 24 },
];

const PART_ICONS: Record<PartOfDayKey, ReactNode> = {
  morning: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 18v4M17.24 17.24l2.83 2.83M18 12h4M17.24 6.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  midday: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  afternoon: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 10V2M18.4 6.6L12 10M5.6 6.6L12 10" />
      <circle cx="12" cy="10" r="4" />
      <path d="M2 18h20" />
    </svg>
  ),
  evening: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

function partForHour(hour: number): PartOfDayKey {
  for (const p of PARTS) if (hour < p.maxHour) return p.key;
  return "evening";
}

/**
 * Bucket items into the non-empty part-of-day groups, in chronological order.
 * The caller supplies how to read the start hour from each item (a Date, a
 * Mindbody datetime string, a slot object, etc.).
 */
export function groupByPartOfDay<T>(
  items: T[],
  getHour: (item: T) => number
): { key: PartOfDayKey; label: string; items: T[] }[] {
  return PARTS.map((p) => ({
    key: p.key,
    label: p.label,
    items: items.filter((it) => partForHour(getHour(it)) === p.key),
  })).filter((g) => g.items.length > 0);
}

/**
 * Standard "icon + label" group heading. `dark` themes it for the green
 * backgrounds (Remedy Room / Remedy Lounge); the default suits light pages.
 */
export function PartOfDayHeading({
  part,
  dark = false,
  className = "",
}: {
  part: { key: PartOfDayKey; label: string };
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold ${
        dark ? "text-[#9ABFB3]" : "text-[#113D33]/60"
      } ${className}`}
    >
      {PART_ICONS[part.key]}
      {part.label}
    </div>
  );
}
