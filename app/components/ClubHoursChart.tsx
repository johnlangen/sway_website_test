"use client";

/**
 * The club week on one clock. Clubs close midday on some days, which a list makes hard to read and bars
 * make obvious. The text under each bar carries the hours for everyone, including screen readers.
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

const START = 6 * 60;
const END = 20 * 60;
const pct = (mins: number) => ((mins - START) / (END - START)) * 100;
const AXIS = [
  { at: 6 * 60, label: "6 AM" },
  { at: 10 * 60, label: "10 AM" },
  { at: 14 * 60, label: "2 PM" },
  { at: 20 * 60, label: "8 PM" },
];

export default function ClubHoursChart({ week }: { week: WeekHours }) {
  const [now, setNow] = useState<{ weekday: string; mins: number } | null>(null);

  useEffect(() => {
    const read = () => {
      const { hour, minute, weekday } = getDenverTimeParts();
      setNow({ weekday, mins: hour * 60 + minute });
    };
    read();
    const timer = setInterval(read, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div aria-hidden="true" className="relative ml-[52px] h-4 text-[11px] text-[#113D33]/70">
        {AXIS.map((a, i) => (
          <span
            key={a.label}
            className={`absolute ${i === AXIS.length - 1 ? "-translate-x-full" : ""}`}
            style={{ left: `${pct(a.at)}%` }}
          >
            {a.label}
          </span>
        ))}
      </div>
      <ul className="mt-1">
        {DAYS.map((d) => {
          const segments = week[d.key] ?? [];
          const today = now?.weekday === d.key;
          const showNow = today && now && now.mins >= START && now.mins <= END;
          return (
            <li key={d.key} className="grid grid-cols-[52px_minmax(0,1fr)] py-1.5">
              <span className={`pt-1 text-sm ${today ? "font-semibold" : ""}`}>
                <span aria-hidden="true">{d.key}</span>
                <span className="sr-only">{d.name}{today ? " (today)" : ""}</span>
              </span>
              <div>
                <div aria-hidden="true" className="relative h-6 rounded-[2px] bg-[#113D33]/[0.07]">
                  {segments.map((s) => (
                    <div
                      key={s.opens}
                      className={`absolute inset-y-0 rounded-[2px] ${today ? "bg-[#113D33]" : "bg-[#BFD3C6]"}`}
                      style={{ left: `${pct(s.opens)}%`, width: `${pct(s.closes) - pct(s.opens)}%` }}
                    />
                  ))}
                  {showNow && (
                    <span className="absolute -inset-y-1 w-0.5 rounded-full bg-[#C8552B]" style={{ left: `${pct(now.mins)}%` }} />
                  )}
                </div>
                <p className="mt-1 text-xs text-[#113D33]/85">
                  {segments.map((s) => `${clockLabel(s.opens)} to ${clockLabel(s.closes)}`).join(", ")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      {now && now.mins >= START && now.mins <= END && (
        <p aria-hidden="true" className="mt-2 flex items-center gap-2 text-xs text-[#113D33]/80">
          <span className="inline-block h-3 w-0.5 rounded-full bg-[#C8552B]" /> Right now in Denver
        </p>
      )}
    </div>
  );
}
