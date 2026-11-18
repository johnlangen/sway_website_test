"use client";

/**
 * Club hours as a plain list, the way people read hours on Google (John 11/18/2026: the bar chart
 * read as confusing once RiNo moved to one block a day). Days with the same hours are grouped
 * ("Tue to Thu"), today's line is bold, and split days still read naturally ("8 AM to 11 AM, 4 PM to 8 PM").
 */

import { useEffect, useState } from "react";
import { clockLabel, type WeekHours } from "@/lib/clubLocationPages";
import { getDenverTimeParts } from "@/lib/larimerHours";

const DAYS = [
  { key: "Mon", name: "Monday" },
  { key: "Tue", name: "Tuesday" },
  { key: "Wed", name: "Wednesday" },
  { key: "Thu", name: "Thursday" },
  { key: "Fri", name: "Friday" },
  { key: "Sat", name: "Saturday" },
  { key: "Sun", name: "Sunday" },
];

function hoursText(week: WeekHours, day: string): string {
  const segments = week[day] ?? [];
  if (segments.length === 0) return "Closed";
  return segments.map((s) => `${clockLabel(s.opens)} to ${clockLabel(s.closes)}`).join(", ");
}

/** Consecutive days with identical hours become one row. */
function groupDays(week: WeekHours) {
  const rows: { days: typeof DAYS; text: string }[] = [];
  for (const d of DAYS) {
    const text = hoursText(week, d.key);
    const last = rows[rows.length - 1];
    if (last && last.text === text) last.days.push(d);
    else rows.push({ days: [d], text });
  }
  return rows.map((r) => {
    const first = r.days[0];
    const lastDay = r.days[r.days.length - 1];
    const label =
      r.days.length === 1 ? first.key : r.days.length === 2 ? `${first.key} and ${lastDay.key}` : `${first.key} to ${lastDay.key}`;
    const spoken =
      r.days.length === 1 ? first.name : r.days.length === 2 ? `${first.name} and ${lastDay.name}` : `${first.name} to ${lastDay.name}`;
    return { keys: r.days.map((d) => d.key), label, spoken, text: r.text };
  });
}

export default function ClubHoursChart({ week }: { week: WeekHours }) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setToday(getDenverTimeParts().weekday);
    read();
    const timer = setInterval(read, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <dl className="max-w-md divide-y divide-[#113D33]/10 border-y border-[#113D33]/10">
      {groupDays(week).map((row) => {
        const isToday = !!today && row.keys.includes(today);
        return (
          <div key={row.label} className={`flex items-baseline justify-between gap-4 py-3 text-[15px] md:text-base ${isToday ? "font-semibold" : ""}`}>
            <dt>
              <span aria-hidden="true">{row.label}</span>
              <span className="sr-only">{row.spoken}</span>
              {isToday && <span className="ml-2 rounded-full bg-[#113D33] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">Today</span>}
            </dt>
            <dd className="text-right">{row.text}</dd>
          </div>
        );
      })}
    </dl>
  );
}
