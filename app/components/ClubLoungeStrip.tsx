"use client";

/**
 * The Remedy Lounge is contrast: hot, then cold, then rest. This draws a 75-minute session to scale and
 * colored by temperature. Blue and ember are off-palette on purpose, because here color IS the meaning.
 * Up to two 25-minute sauna windows is the real rule; the rest of the plan is an example, and says so.
 *
 * Motion (app/editorial.css, .ls-*, skipped with prefers-reduced-motion): the first time it scrolls into
 * view, a playhead runs across and reveals the session. Switching plans reshapes the same five slots, so
 * each block slides and changes temperature instead of being replaced.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LoungeStep } from "@/lib/clubLocationPages";

const HEAT: Record<LoungeStep["heat"], { color: string; text: string }> = {
  hot: { color: "#C8552B", text: "#FFFFFF" },
  warm: { color: "#E2A25A", text: "#113D33" },
  rest: { color: "#EBE4D1", text: "#113D33" },
  cold: { color: "#7DBAD3", text: "#113D33" },
};

// The longest plan has five steps. Keeping five slots is what lets blocks morph between plans.
const SLOTS = [0, 1, 2, 3, 4];

export default function ClubLoungeStrip({ hasWarmSoak, plungeLabel }: { hasWarmSoak: boolean; plungeLabel: string }) {
  const plunge = plungeLabel.replace(/s$/, "");
  const plans: { id: string; label: string; steps: LoungeStep[] }[] = [
    {
      id: "contrast",
      label: "Full contrast",
      steps: [
        { label: "Traditional sauna", minutes: 25, heat: "hot" },
        { label: plunge, minutes: 5, heat: "cold" },
        { label: "Compression + PEMF", minutes: 15, heat: "rest" },
        { label: "Infrared sauna", minutes: 25, heat: "warm" },
        { label: plunge, minutes: 5, heat: "cold" },
      ],
    },
    {
      id: "easy",
      label: "Slow and easy",
      steps: hasWarmSoak
        ? [
            { label: "Infrared sauna", minutes: 25, heat: "warm" },
            { label: "Warm soak", minutes: 15, heat: "warm" },
            { label: plunge, minutes: 5, heat: "cold" },
            { label: "Compression + PEMF", minutes: 30, heat: "rest" },
          ]
        : [
            { label: "Infrared sauna", minutes: 25, heat: "warm" },
            { label: plunge, minutes: 5, heat: "cold" },
            { label: "Compression + PEMF", minutes: 45, heat: "rest" },
          ],
    },
  ];
  const [planId, setPlanId] = useState("contrast");
  const plan = plans.find((p) => p.id === planId) ?? plans[0];

  const stripRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!stripRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#113D33] py-12 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="sway-eyebrow text-[#D7E5DD]">The Remedy Lounge · 75 minutes, self-guided</p>
        <h2 className="mt-3 text-[46px] leading-[1.02] md:mt-4 md:text-8xl">
          <span className="text-[#E9A06B]">Hot.</span> <span className="text-[#9CCFE3]">Cold.</span> Repeat.
        </h2>
        <p className="mt-3 max-w-xl text-base text-white/85 md:mt-5 md:text-lg">
          Your session, your order. Book up to two 25-minute sauna windows, and use everything else as you like. Here are two ways it could go.
        </p>

        <fieldset className="mt-6 md:mt-9">
          <legend className="sr-only">Choose an example session</legend>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {plans.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={planId === p.id}
                onClick={() => setPlanId(p.id)}
                className={`min-h-11 rounded-[3px] border px-4 py-2 text-sm transition md:text-base ${
                  planId === p.id ? "border-white bg-white font-semibold text-[#113D33]" : "border-white/35 text-white hover:border-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* The session, to scale */}
        <div ref={stripRef} aria-hidden="true" className={`ls-strip mt-6 md:mt-10 ${inView ? "is-in" : ""}`}>
          <div className="relative">
            <div className="ls-reveal flex h-20 overflow-hidden rounded-[4px] md:h-32">
              {SLOTS.map((slot) => {
                const s = plan.steps[slot];
                return (
                  <div
                    key={slot}
                    className="ls-slot flex min-w-0 items-end overflow-hidden"
                    style={{
                      flexBasis: 0,
                      flexGrow: s?.minutes ?? 0,
                      backgroundColor: s ? HEAT[s.heat].color : "transparent",
                      color: s ? HEAT[s.heat].text : "transparent",
                      borderLeftWidth: s && slot > 0 ? 3 : 0,
                    }}
                  >
                    {s && s.minutes >= 15 && (
                      <span key={`${plan.id}-${slot}`} className="ls-label hidden whitespace-nowrap p-3 text-sm leading-tight md:block">
                        {s.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <span className="ls-playhead" />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-white/70">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75 min</span>
          </div>
        </div>

        <ol key={plan.id} className={`ls-list mt-5 grid gap-x-8 md:mt-8 md:grid-cols-2 lg:grid-cols-3 ${inView ? "is-in" : ""}`}>
          {plan.steps.map((s, i) => (
            <li
              key={i}
              className="ls-row flex items-center justify-between gap-3 border-t border-white/20 py-2.5 text-[15px] md:text-base"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: HEAT[s.heat].color }} />
                {s.label}
              </span>
              <span className="shrink-0 text-white/85">{s.minutes} min</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
