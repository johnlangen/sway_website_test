"use client";

/**
 * The Remedy Lounge is contrast: hot, then cold, then rest. This draws a 75-minute session to scale and
 * colored by temperature. Blue and ember are off-palette on purpose, because here color IS the meaning.
 * Up to two 25-minute sauna windows is the real rule; the rest of the plan is an example, and says so.
 */

import { useState } from "react";
import type { LoungeStep } from "@/lib/clubLocationPages";

const TOTAL = 75;
const HEAT: Record<LoungeStep["heat"], { bar: string; dot: string; text: string }> = {
  hot: { bar: "bg-[#C8552B]", dot: "bg-[#C8552B]", text: "text-white" },
  warm: { bar: "bg-[#E2A25A]", dot: "bg-[#E2A25A]", text: "text-[#113D33]" },
  rest: { bar: "bg-[#EBE4D1]", dot: "bg-[#EBE4D1]", text: "text-[#113D33]" },
  cold: { bar: "bg-[#7DBAD3]", dot: "bg-[#7DBAD3]", text: "text-[#113D33]" },
};

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
        <div aria-hidden="true" className="mt-6 md:mt-10">
          <div className="flex h-20 gap-[3px] overflow-hidden rounded-[4px] md:h-32">
            {plan.steps.map((s, i) => (
              <div
                key={`${plan.id}-${i}`}
                className={`flex min-w-0 items-end p-2 transition-[flex-grow] duration-500 motion-reduce:transition-none md:p-3 ${HEAT[s.heat].bar} ${HEAT[s.heat].text}`}
                style={{ flexGrow: s.minutes, flexBasis: 0 }}
              >
                {s.minutes >= 15 && (
                  <span className="hidden truncate text-sm leading-tight md:block">{s.label}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-white/70">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75 min</span>
          </div>
        </div>

        <ol className="mt-5 grid gap-x-8 md:mt-8 md:grid-cols-2 lg:grid-cols-3">
          {plan.steps.map((s, i) => (
            <li key={`${plan.id}-step-${i}`} className="flex items-center justify-between gap-3 border-t border-white/20 py-2.5 text-[15px] md:text-base">
              <span className="flex min-w-0 items-center gap-2.5">
                <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-full ${HEAT[s.heat].dot}`} />
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
