"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PeekData {
  nextTime: string | null;
  day?: "today" | "tomorrow";
}

export default function BookingPeek() {
  const [data, setData] = useState<PeekData | null>(null);

  useEffect(() => {
    // Fire-and-forget. /api/homepage-peek is route-cached for 10 minutes so
    // the upstream Mindbody call is only made once per cache window.
    fetch("/api/homepage-peek")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: PeekData | null) => setData(d))
      .catch(() => setData(null));
  }, []);

  // Hide entirely if no slot is bookable (Mindbody down, fully booked, etc).
  // Better to show nothing than a "no availability" message.
  if (!data?.nextTime) return null;

  return (
    <Link
      href="/locations/denver-larimer/book?category=massage"
      className="inline-flex items-center gap-2.5 mt-4 text-xs md:text-sm text-white/90 hover:text-white transition group"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#9ABFB3] opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9ABFB3]" />
      </span>
      <span className="font-vance">
        Next available: {data.day} {data.nextTime}
      </span>
      <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
        →
      </span>
    </Link>
  );
}
