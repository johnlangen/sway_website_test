"use client";

import { useEffect, useState } from "react";

// Section labels for the homepage chapter rail. Order MUST match the
// .snap-section order rendered in HomeContent.tsx.
const SECTIONS = [
  "Sway",
  "Story",
  "Press",
  "Massage",
  "Facials",
  "Remedy",
  "Aescape",
  "Reviews",
  "Offer",
  "Pricing",
  "Follow",
  "FAQ",
  "Join",
];

export default function ChapterRail() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".snap-container");
    if (!container) return;

    const sections = Array.from(container.querySelectorAll(".snap-section"));
    if (sections.length === 0) return;

    // IntersectionObserver scoped to the snap-container's own scroll viewport.
    // The section with the highest intersection ratio (>0.5) wins.
    const observer = new IntersectionObserver(
      (entries) => {
        let best = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const idx = sections.indexOf(entry.target as Element);
            if (idx >= 0) best = idx;
          }
        });
        if (best >= 0 && bestRatio > 0.5) setActiveIdx(best);
      },
      { root: container, threshold: [0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (idx: number) => {
    const container = document.querySelector(".snap-container");
    const sections = container?.querySelectorAll(".snap-section");
    sections?.[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      // mix-blend-mode: difference keeps the rail legible against any
      // background — cream, sand, dark green, or full-bleed photography —
      // without per-section styling.
      className="hidden md:flex fixed top-1/2 right-5 -translate-y-1/2 z-[60] flex-col items-end gap-2 pointer-events-none"
      style={{ mixBlendMode: "difference" }}
      aria-label="Page sections"
    >
      {SECTIONS.map((label, idx) => {
        const active = idx === activeIdx;
        return (
          <button
            key={label}
            onClick={() => jumpTo(idx)}
            className="group relative flex items-center justify-end h-6 cursor-pointer pointer-events-auto"
            aria-label={`Go to ${label}`}
            aria-current={active ? "true" : undefined}
          >
            <span
              className={`absolute right-full mr-3 text-[10px] uppercase tracking-[0.25em] text-white whitespace-nowrap pointer-events-none transition-all duration-300 ${
                active
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-1 group-hover:opacity-90 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>
            <span
              className={`block w-[3px] rounded-full bg-white transition-all duration-300 ${
                active
                  ? "h-6 opacity-100"
                  : "h-[3px] opacity-50 group-hover:opacity-90"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
