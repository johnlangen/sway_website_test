"use client";

/**
 * Little floor plans for the event pages: who is in the room for each kind of event.
 * Decorative (the page copy says the same thing), so they are hidden from screen readers.
 * Motion is in app/editorial.css (.ce-room) and only runs without prefers-reduced-motion.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type EventKind = "community" | "host" | "spalebration" | "buyout";

type Point = { x: number; y: number };

// toFixed keeps the server and browser markup identical
const ring = (cx: number, cy: number, r: number, n: number, startDeg = -90): Point[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((startDeg + (360 / n) * i) * Math.PI) / 180;
    return { x: Number((cx + r * Math.cos(a)).toFixed(1)), y: Number((cy + r * Math.sin(a)).toFixed(1)) };
  });

// A room with a door gap in the bottom wall, between x=180 and x=230
const ROOM_WITH_DOOR = "M180 260 H38 a18 18 0 0 1 -18 -18 V38 a18 18 0 0 1 18 -18 H262 a18 18 0 0 1 18 18 V242 a18 18 0 0 1 -18 18 H230";
const CLOSED_ROOM = "M38 20 H262 a18 18 0 0 1 18 18 V242 a18 18 0 0 1 -18 18 H38 a18 18 0 0 1 -18 -18 V38 a18 18 0 0 1 18 -18 Z";

// Loose twos and threes, the way people actually stand around
const COMMUNITY_DOTS: Point[] = [
  { x: 66, y: 66 }, { x: 88, y: 80 }, { x: 212, y: 62 }, { x: 148, y: 116 }, { x: 170, y: 134 }, { x: 62, y: 158 },
  { x: 236, y: 128 }, { x: 108, y: 200 }, { x: 130, y: 214 }, { x: 214, y: 206 },
];

const BUYOUT_DOTS: Point[] = [46, 88, 130, 172, 214, 254].flatMap((x) =>
  [52, 98, 144, 190, 232].map((y) => ({ x, y })),
);

export default function EventRoomDiagram({
  kind,
  accent,
  animate = true,
  className = "",
}: {
  kind: EventKind;
  /** The color that stands out in this diagram: the host, the guest of honor, the door. */
  accent: string;
  animate?: boolean;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate]);

  const dot = (p: Point, i: number, extra?: { r?: number; fill?: string }) => (
    <circle
      key={`${p.x}-${p.y}`}
      className="ce-dot"
      cx={p.x}
      cy={p.y}
      r={extra?.r ?? 7}
      fill={extra?.fill ?? "currentColor"}
      style={{ "--i": i } as CSSProperties}
    />
  );

  const hostGuests = ring(150, 138, 84, 12);
  const partyGuests = ring(150, 138, 66, 8, -112);

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${animate ? "ce-room" : ""} ${inView ? "is-in" : ""} ${className}`}
    >
      {kind === "community" && (
        <>
          <path className="ce-line" d={ROOM_WITH_DOOR} pathLength={1} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
          {/* The door is propped open, and people are on their way in */}
          <path d="M230 260 L252 290" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
          <path className="ce-line ce-late" d="M28 304 C 90 318, 170 312, 205 262" pathLength={1} stroke={accent} strokeWidth={1.75} strokeLinecap="round" />
          {COMMUNITY_DOTS.map((p, i) => dot(p, i))}
          {dot({ x: 28, y: 304 }, 12, { fill: accent })}
          {dot({ x: 118, y: 311 }, 14, { fill: accent })}
          {dot({ x: 205, y: 240 }, 16, { fill: accent })}
        </>
      )}

      {kind === "host" && (
        <>
          <path className="ce-line" d={ROOM_WITH_DOOR} pathLength={1} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
          {/* One person leading, the sound carrying out to the room */}
          {[34, 58].map((r, i) => (
            <circle key={r} className="ce-ripple" cx={150} cy={138} r={r} stroke={accent} strokeWidth={1.5} style={{ "--i": i * 3 } as CSSProperties} />
          ))}
          {hostGuests.map((p, i) => dot(p, i + 2))}
          {dot({ x: 150, y: 138 }, 0, { r: 12, fill: accent })}
        </>
      )}

      {kind === "spalebration" && (
        <>
          <path className="ce-line" d={CLOSED_ROOM} pathLength={1} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
          <circle className="ce-line" cx={150} cy={138} r={34} pathLength={1} stroke="currentColor" strokeWidth={1.75} />
          {partyGuests.slice(1).map((p, i) => dot(p, i + 1))}
          {/* The guest of honor, and a bit of confetti */}
          {dot(partyGuests[0], 0, { r: 11, fill: accent })}
          {[
            "M88 46 q6 -7 12 0",
            "M150 42 q6 7 12 0",
            "M204 48 q6 -7 12 0",
            "M50 92 q6 7 12 0",
            "M240 90 q6 -7 12 0",
            "M226 214 q6 7 12 0",
            "M62 206 q6 -7 12 0",
          ].map((d, i) => (
            <path key={d} className="ce-dot" d={d} stroke={accent} strokeWidth={2.5} strokeLinecap="round" style={{ "--i": i + 9 } as CSSProperties} />
          ))}
        </>
      )}

      {kind === "buyout" && (
        <>
          <path className="ce-line" d={CLOSED_ROOM} pathLength={1} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
          {/* The door is shut: tonight this is all yours */}
          <path d="M180 260 H230" stroke={accent} strokeWidth={7} strokeLinecap="round" />
          {BUYOUT_DOTS.map((p, i) => dot(p, i * 0.6))}
        </>
      )}
    </svg>
  );
}
