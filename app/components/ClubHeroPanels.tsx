"use client";

/**
 * Club hero once massage + facials are live (club.servicesLive, RiNo 11/18/2026). Four equal panels,
 * one per way to recover: Hot (sauna), Cold (plunge), Still (massage), Glow (facial). The active panel
 * opens wide and carries its booking link; the others stay as slim slices with a vertical label, so
 * all four read as equals. Replaces ClubHeroSplit (hot vs cold), which only told the Lounge's story.
 *
 * Motion: one pass through the panels on load (about 4.5 s, under the WCAG 2.2.2 five-second line),
 * none with prefers-reduced-motion. Hover, focus and tap open a panel and stop the pass.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowMark from "./ArrowMark";

export type HeroPanel = {
  key: string;
  state: string; // Hot, Cold, Still, Glow
  name: string; // what it is
  color: string; // the chip's fill
  ink: string; // the chip's text, chosen to pass AA on that fill
  photo: { src: string; alt: string; position: string };
  href: string;
  cta: string;
  track: string;
};

const SEQUENCE = [0, 1, 2, 3, 2]; // ends on Still (massage)
const STEP_MS = 900;

export default function ClubHeroPanels({ panels }: { panels: HeroPanel[] }) {
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(2);
      return;
    }
    const timers = SEQUENCE.map((idx, i) =>
      window.setTimeout(() => {
        if (!touched.current) setActive(idx);
      }, 500 + i * STEP_MS),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const open = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  return (
    <div className="absolute inset-0 flex gap-[3px] bg-[#F7F4E9]" role="group" aria-label="Four ways to recover">
      {panels.map((p, i) => {
        const isOpen = i === active;
        return (
          <div
            key={p.key}
            className="relative min-w-0 overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ flexGrow: isOpen ? 5 : 1, flexBasis: 0 }}
            onPointerEnter={(e) => { if (e.pointerType === "mouse") open(i); }}
          >
            <Image
              src={p.photo.src}
              alt={p.photo.alt}
              fill
              priority={i < 2}
              sizes="(min-width: 768px) 700px, 100vw"
              className={`object-cover transition-transform duration-700 motion-reduce:transition-none ${isOpen ? "scale-100" : "scale-110"}`}
              style={{ objectPosition: p.photo.position }}
            />
            <div aria-hidden="true" className={`absolute inset-0 transition-colors duration-700 ${isOpen ? "bg-gradient-to-t from-black/55 via-black/0 to-black/0" : "bg-black/30"}`} />

            {/* The whole panel opens it */}
            <button
              type="button"
              aria-pressed={isOpen}
              aria-label={`${p.state}: ${p.name}`}
              onClick={() => open(i)}
              onFocus={() => open(i)}
              className="absolute inset-0 z-0 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/80"
            />

            {/* Closed: a vertical label in the panel's color */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rotate-180 rounded-[2px] px-1.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 [writing-mode:vertical-rl] md:bottom-5 md:text-xs ${isOpen ? "opacity-0" : "opacity-100"}`}
              style={{ background: p.color, color: p.ink }}
            >
              {p.state}
            </span>

            {/* Open: state chip, what it is, and its booking link */}
            <div className={`absolute inset-x-0 bottom-0 z-10 p-4 transition-opacity duration-500 md:p-6 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <span className="inline-block rounded-[2px] px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] md:text-[13px]" style={{ background: p.color, color: p.ink }}>
                {p.state}
              </span>
              <p className="mt-2 text-xl font-semibold leading-tight text-white md:text-3xl">{p.name}</p>
              <Link
                href={p.href}
                data-track={p.track}
                tabIndex={isOpen ? 0 : -1}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:no-underline md:text-base"
              >
                {p.cta} <span aria-hidden="true"><ArrowMark /></span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
