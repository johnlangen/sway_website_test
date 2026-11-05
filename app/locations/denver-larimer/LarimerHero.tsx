"use client";

/**
 * Larimer hero: the four things you can do here as a big menu, with the photo beside it following along.
 * It plays through once on its own, each row's line filling as its time runs, then returns to the
 * hallway and stops. Hovering, focusing or pausing takes over. No autoplay with prefers-reduced-motion.
 */

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowMark from "@/app/components/ArrowMark";

const HALLWAY = {
  src: "/assets/homepage_photo_outside.jpg",
  alt: "The lantern-lit hallway at Sway Larimer on Larimer Square in Denver",
  position: "48% 50%",
};

const ROWS = [
  {
    name: "Massage",
    detail: "50 to 90 min · From $139",
    href: "/locations/denver-larimer/book/?category=massage",
    src: "/assets/founding-massage-stone.jpg",
    position: "50% 62%",
  },
  {
    name: "Facials",
    detail: "50 to 60 min · From $139",
    href: "/locations/denver-larimer/book/?category=facial",
    src: "/assets/facialExperiences.jpg",
    position: "50% 50%",
  },
  {
    name: "Remedy Room",
    detail: "40 min · $49",
    href: "/locations/denver-larimer/book-remedy-room",
    src: "/assets/remedy-room.jpg",
    position: "55% 50%",
  },
  {
    name: "Aescape",
    detail: "15 to 60 min · From $49",
    href: "/locations/denver-larimer/book-aescape",
    src: "/assets/aescapeblog6.jpg",
    position: "50% 50%",
  },
];

const HALLWAY_MS = 2800;
const ROW_MS = 4200;

export default function LarimerHero({ intro, actions }: { intro: ReactNode; actions: ReactNode }) {
  // -1 is the hallway
  const [active, setActive] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const load = setTimeout(() => setLoadRest(true), 1200);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(true);
      setCanPlay(true);
    }
    return () => clearTimeout(load);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => {
        if (active < ROWS.length - 1) {
          setActive(active + 1);
        } else {
          setActive(-1);
          setPlaying(false);
          setCanPlay(false);
        }
      },
      active === -1 ? HALLWAY_MS : ROW_MS,
    );
    return () => clearTimeout(timer);
  }, [active, playing]);

  const choose = (i: number) => {
    setPlaying(false);
    setCanPlay(false);
    setActive(i);
  };

  return (
    <div className="grid md:min-h-[min(92vh,900px)] md:grid-cols-[minmax(0,1fr)_min(50vw,1000px)]">
      <div className="order-2 flex items-center px-6 pb-7 pt-5 md:order-1 md:py-24 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:pr-14">
        <div className="hero-rise w-full max-w-xl">
          {intro}
          <ul className="mt-4 md:mt-6">
            {ROWS.map((row, i) => (
              <li key={row.name} className="relative border-t border-[#113D33]/20">
                <Link
                  href={row.href}
                  onMouseEnter={() => choose(i)}
                  onFocus={() => choose(i)}
                  className="flex min-h-[54px] items-center justify-between gap-3 py-2 md:min-h-[68px]"
                >
                  <span className={`cf-title text-[28px] leading-none transition-colors duration-300 md:text-[44px] ${active === i ? "text-[#113D33]" : "text-[#113D33]/70"}`}>
                    {row.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-right text-xs text-[#113D33]/85 md:text-sm">
                    {row.detail}
                    <span aria-hidden="true" className={`hidden transition-transform duration-300 sm:inline ${active === i ? "translate-x-1" : ""}`}><ArrowMark /></span>
                  </span>
                </Link>
                {active === i && (
                  <span
                    key={`${i}-${playing}`}
                    aria-hidden="true"
                    className={`absolute -top-px left-0 h-0.5 bg-[#113D33] ${playing ? "lh-progress" : "w-full"}`}
                    style={playing ? { animationDuration: `${ROW_MS}ms` } : undefined}
                  />
                )}
              </li>
            ))}
          </ul>
          <div className="border-t border-[#113D33]/20 pt-4 md:pt-6">{actions}</div>
        </div>
      </div>

      <div className={`relative order-1 mt-[72px] h-[250px] overflow-hidden sm:h-[320px] md:order-2 md:h-auto ${playing ? "" : "lh-still"}`}>
        <div className={`lh-photo absolute inset-0 ${active === -1 ? "is-on" : ""}`}>
          <Image src={HALLWAY.src} alt={HALLWAY.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: HALLWAY.position }} />
        </div>
        {loadRest &&
          ROWS.map((row, i) => (
            <div key={row.name} aria-hidden="true" className={`lh-photo absolute inset-0 ${active === i ? "is-on" : ""}`}>
              <Image src={row.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: row.position }} />
            </div>
          ))}
        {canPlay && (
          <button
            type="button"
            aria-pressed={!playing}
            onClick={() => setPlaying(!playing)}
            className="absolute bottom-3 left-3 flex min-h-11 items-center rounded-[3px] bg-black/60 px-3 text-xs text-white hover:bg-black/75"
          >
            {playing ? "Pause" : "Play"}
            <span className="sr-only"> the photo slideshow</span>
          </button>
        )}
      </div>
    </div>
  );
}
