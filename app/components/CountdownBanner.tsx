"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function getDaysUntilApril1(): number {
  const target = new Date("2026-04-01T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/** Pages where the banner should not appear (booking flows, landing pages) */
const HIDDEN_PATHS = ["/book-aescape", "/book-service", "/book-remedy-room", "/book", "/themavenhotel"];

export default function CountdownBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setDaysLeft(getDaysUntilApril1());
  }, []);

  // Hydration-safe: null on server, then real value on client
  // Auto-hides after April 1 (daysLeft = 0)
  if (daysLeft === null || daysLeft <= 0) return null;

  // Hide on booking flows and partner landing pages
  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p) || pathname.includes(p))) return null;

  return (
    <>
      {/* Fixed banner pinned below navbar */}
      <div className="fixed top-[56px] left-0 right-0 z-40 bg-[#113D33] border-b border-[#9ABFB3]/20 px-4 py-2.5 text-center">
        <Link
          href="/locations/denver-larimer/membership"
          className="text-xs md:text-sm font-semibold text-white hover:text-[#9ABFB3] transition"
        >
          New memberships launching April 1 —{" "}
          <span className="text-[#9ABFB3]">
            {daysLeft} {daysLeft === 1 ? "day" : "days"} left
          </span>{" "}
          to lock in $99/month
        </Link>
      </div>
      {/* Spacer to prevent content from hiding behind fixed banner */}
      <div className="h-[36px]" aria-hidden="true" />
    </>
  );
}
