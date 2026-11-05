"use client";

/**
 * The week at Sway Larimer as bars on one clock, with today picked out and a marker for right now in
 * Denver. The list text carries the hours for screen readers; the bars only show the same thing.
 */

import { useEffect, useState } from "react";
import { getDenverTimeParts, LARIMER_SCHEDULE } from "@/lib/larimerHours";

const DAYS = [
  { key: "Mon", name: "Monday" },
  { key: "Tue", name: "Tuesday" },
  { key: "Wed", name: "Wednesday" },
  { key: "Thu", name: "Thursday" },
  { key: "Fri", name: "Friday" },
  { key: "Sat", name: "Saturday" },
  { key: "Sun", name: "Sunday" },
];

// The clock runs from the earliest open to the latest close
const START = 9 * 60;
const END = 20 * 60;
const pct = (mins: number) => `${((mins - START) / (END - START)) * 100}%`;

export default function LarimerHours() {
  const [now, setNow] = useState<{ weekday: string; mins: number } | null>(null);

  useEffect(() => {
    const read = () => {
      const { hour, minute, weekday } = getDenverTimeParts();
      setNow({ weekday, mins: hour * 60 + minute });
    };
    read();
    const t = setInterval(read, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div aria-hidden="true" className="ml-[52px] flex justify-between text-[11px] text-[#113D33]/70 md:ml-[60px]">
        <span>9 AM</span>
        <span>Noon</span>
        <span>4 PM</span>
        <span>8 PM</span>
      </div>
      <ul className="mt-1.5">
        {DAYS.map((d) => {
          const s = LARIMER_SCHEDULE[d.key];
          const today = now?.weekday === d.key;
          const showNow = today && now && now.mins >= START && now.mins <= END;
          return (
            <li key={d.key} className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-0 py-1 md:grid-cols-[60px_minmax(0,1fr)]">
              <span className={`text-sm ${today ? "font-semibold" : ""}`}>
                <span aria-hidden="true">{d.key}</span>
                <span className="sr-only">{d.name}{today ? " (today)" : ""}: </span>
              </span>
              <div className="relative h-8 rounded-[2px] bg-[#113D33]/[0.07]">
                <div
                  className={`absolute inset-y-0 flex items-center rounded-[2px] px-2.5 text-xs md:text-[13px] ${today ? "bg-[#113D33] text-white" : "bg-[#BFD3C6] text-[#113D33]"}`}
                  style={{ left: pct(s.opens), width: `${((s.closes - s.opens) / (END - START)) * 100}%` }}
                >
                  <span className="truncate">
                    {s.label.replace(":00", "")} to {s.closesLabel.replace(":00", "")}
                  </span>
                </div>
                {showNow && (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-y-1 w-0.5 rounded-full bg-[#D9822B]"
                    style={{ left: pct(now.mins) }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {now && now.mins >= START && now.mins <= END && (
        <p aria-hidden="true" className="mt-2 flex items-center gap-2 text-xs text-[#113D33]/80">
          <span className="inline-block h-3 w-0.5 rounded-full bg-[#D9822B]" /> Right now in Denver
        </p>
      )}
    </div>
  );
}
