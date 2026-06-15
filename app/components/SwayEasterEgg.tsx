"use client";

import { useEffect, useMemo } from "react";

// Hidden Sway one-liners. Picked at random when the egg opens.
const QUOTES = [
  "The pause is the practice.",
  "Be where your feet are.",
  "Slow is the new fast.",
  "Stay grounded.",
  "Wellness is a verb.",
  "Sway with the rhythm of your day.",
  "Breath first. Everything else after.",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SwayEasterEgg({ open, onClose }: Props) {
  // Pick a quote each time the egg opens (stable for the lifetime of the
  // open state via useMemo keyed on `open`).
  const quote = useMemo(() => {
    if (!open) return "";
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, [open]);

  // Auto-dismiss after 4.5 seconds. Also close on Escape.
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 4500);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="A note from Sway"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#113D33]/95 backdrop-blur-sm cursor-pointer animate-egg-fade"
    >
      {/* Animated sine wave drawing across the screen */}
      <svg
        viewBox="0 0 800 120"
        className="w-[80%] max-w-2xl h-auto mb-12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 Q100,0 200,60 T400,60 T600,60 T800,60"
          stroke="#EBE4D1"
          strokeWidth="2"
          strokeLinecap="round"
          className="egg-wave-draw"
        />
      </svg>

      {/* Quote */}
      <p className="egg-quote font-vance text-3xl md:text-5xl lg:text-6xl text-[#F7F4E9] text-center px-8 max-w-3xl leading-[1.15]">
        {quote}
      </p>

      {/* Sway signoff */}
      <p className="egg-quote-sub mt-8 text-[10px] uppercase tracking-[0.4em] text-[#EBE4D1]/70">
        — Sway
      </p>

      {/* Dismiss hint */}
      <p className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-[#EBE4D1]/40">
        Tap anywhere
      </p>
    </div>
  );
}
