"use client";

/**
 * Club hero: the sauna and the cold plunge side by side, split by a line guests can move. Contrast is
 * the whole idea of the Remedy Lounge, so the hero shows it. The line sways on its own once on load,
 * for under 5 seconds and not at all with prefers-reduced-motion. Mouse, touch and keyboard all move it.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";

type Photo = { src: string; alt: string; position: string };

export default function ClubHeroSplit({ hot, cold }: { hot: Photo; cold: Photo }) {
  const root = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const touched = useRef(false);
  const dragging = useRef(false);

  const setSplit = (value: number) => {
    const v = Math.min(92, Math.max(8, value));
    root.current?.style.setProperty("--split", `${v}%`);
    if (range.current) range.current.value = String(Math.round(v));
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const DURATION = 3400;
    const startAt = performance.now() + 500;
    let frame = 0;
    const tick = (now: number) => {
      if (touched.current) return;
      const t = (now - startAt) / DURATION;
      if (t >= 1) {
        setSplit(50);
        return;
      }
      // A swing each way that settles back to the middle
      if (t > 0) setSplit(50 + 30 * Math.sin(t * Math.PI * 2) * (1 - t * 0.6));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const fromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = root.current?.getBoundingClientRect();
    if (!box) return;
    touched.current = true;
    setSplit(((e.clientX - box.left) / box.width) * 100);
  };

  return (
    <div
      ref={root}
      className="ch-split group absolute inset-0 cursor-ew-resize touch-pan-y select-none overflow-hidden"
      style={{ "--split": "50%" } as React.CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true;
        fromPointer(e);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || dragging.current) fromPointer(e);
      }}
    >
      <Image src={cold.src} alt={cold.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="pointer-events-none object-cover" style={{ objectPosition: cold.position }} />
      <div className="ch-hot absolute inset-0">
        <Image src={hot.src} alt={hot.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="pointer-events-none object-cover" style={{ objectPosition: hot.position }} />
      </div>

      <span className="pointer-events-none absolute bottom-3 left-3 rounded-[2px] bg-[#C8552B] px-2.5 py-1 text-xs text-white md:bottom-5 md:left-5 md:text-sm">Hot</span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-[2px] bg-[#7DBAD3] px-2.5 py-1 text-xs text-[#113D33] md:bottom-5 md:right-5 md:text-sm">Cold</span>

      <div aria-hidden="true" className="ch-line pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white">
        <span className="ch-grip absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#113D33] shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 2 2 7l5 5M15 2l5 5-5 5" />
          </svg>
        </span>
      </div>

      {/* Keyboard and screen reader control. Pointers use the handlers above. */}
      <input
        ref={range}
        type="range"
        min={8}
        max={92}
        defaultValue={50}
        aria-label="Compare the sauna and the cold plunge"
        onChange={(e) => {
          touched.current = true;
          setSplit(Number(e.target.value));
        }}
        className="ch-range pointer-events-none absolute inset-x-0 bottom-0 h-px w-full opacity-0"
      />
    </div>
  );
}
