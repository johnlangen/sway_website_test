"use client";

import { useEffect, useState } from "react";

type Props = {
  type: "service" | "remedy" | "aescape";
  sessionTypeId: number;
  currentDate: string; // YYYY-MM-DD — the empty day
  onJumpToDate: (iso: string) => void;
  staffId?: number | null; // optional — filter to a specific staff member
  staffName?: string | null; // optional — display name for the banner text
};

/**
 * Shown when the current day has no availability.
 * Fires a server-side scan to find the next date with slots,
 * then renders a tappable banner to jump there.
 */
export default function NextAvailableBanner({
  type,
  sessionTypeId,
  currentDate,
  onJumpToDate,
  staffId,
  staffName,
}: Props) {
  const [status, setStatus] = useState<
    "searching" | "found" | "none" | "error"
  >("searching");
  const [nextDate, setNextDate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("searching");
    setNextDate(null);

    const staffParam = staffId ? `&staffId=${staffId}` : "";
    fetch(
      `/api/next-available?type=${type}&sessionTypeId=${sessionTypeId}&startDate=${currentDate}${staffParam}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.nextDate) {
          setNextDate(data.nextDate);
          setStatus("found");
        } else {
          setStatus("none");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [type, sessionTypeId, currentDate, staffId]);

  if (status === "error") return null; // fail silently

  if (status === "searching") {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#113D33]/50 animate-pulse">
        <div className="w-4 h-4 rounded-full border-2 border-[#113D33]/20 border-t-[#113D33]/50 animate-spin" />
        Searching for next availability...
      </div>
    );
  }

  if (status === "none") {
    return (
      <p className="mt-4 text-sm text-[#113D33]/40 text-center">
        {staffName
          ? `No availability for ${staffName} in the next 30 days.`
          : "No availability in the next 30 days."}
      </p>
    );
  }

  // status === "found"
  const label = formatDateLabel(nextDate!);

  return (
    <button
      onClick={() => onJumpToDate(nextDate!)}
      className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-[#4A776D]/30 bg-[#4A776D]/5 hover:bg-[#4A776D]/10 px-4 py-3 text-sm font-semibold text-[#113D33] transition focus:outline-none focus:ring-2 focus:ring-[#4A776D]/30"
    >
      <span>
        {staffName ? `${staffName} — next` : "Next"} available:{" "}
        <span className="text-[#4A776D]">{label}</span>
      </span>
      <span className="text-[#4A776D]">&rarr;</span>
    </button>
  );
}

/** Format "2025-02-16" → "Sun, Feb 16" */
function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
