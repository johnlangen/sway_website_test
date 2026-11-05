"use client";

/**
 * "How much time do you have?" Every session length at Sway Larimer on one shared 90-minute scale.
 * Picking a time lights up what fits and shows where to book it. The chart is a picture of the same
 * information as the buttons and results, so it is hidden from screen readers.
 *
 * Lengths: massage 50/70/90 (no 80), facials 50 to 60, Remedy Room 40, Aescape 15/30/45/60.
 */

import { useState } from "react";
import Link from "next/link";
import ArrowMark from "@/app/components/ArrowMark";

const SCALE = 90;
const TIMES = [15, 30, 40, 45, 50, 60, 70, 90];
const AXIS = [15, 30, 45, 60, 75, 90];

const SERVICES = [
  {
    name: "Aescape",
    action: "Book Aescape",
    line: "Robot massage with AI body mapping",
    minutes: [15, 30, 45, 60],
    href: "/locations/denver-larimer/book-aescape",
  },
  {
    name: "Remedy Room",
    action: "Book the Remedy Room",
    line: "Sauna, cold plunge, compression and LED",
    minutes: [40],
    href: "/locations/denver-larimer/book-remedy-room",
  },
  {
    name: "Massage",
    action: "Book a massage",
    line: "With a licensed massage therapist",
    minutes: [50, 70, 90],
    href: "/locations/denver-larimer/book/?category=massage",
  },
  {
    name: "Facials",
    action: "Book a facial",
    line: "Eminence Organics and Dr. Dennis Gross",
    minutes: [50, 60],
    href: "/locations/denver-larimer/book/?category=facial",
  },
];

const left = (minutes: number) => `${(minutes / SCALE) * 100}%`;

export default function LarimerTimePicker() {
  const [time, setTime] = useState(50);
  const fits = SERVICES.filter((s) => s.minutes.includes(time));

  return (
    <section className="bg-[#113D33] py-12 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="sway-eyebrow text-[#D7E5DD]">Massage, facials and recovery, under one roof</p>
        <h2 className="mt-3 text-[38px] leading-[1.05] md:mt-4 md:text-7xl">How much time do you have?</h2>

        <fieldset className="mt-6 md:mt-10">
          <legend className="sr-only">Choose how many minutes you have</legend>
          <div className="grid grid-cols-4 gap-1.5 md:flex md:gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={time === t}
                onClick={() => setTime(t)}
                className={`min-h-11 rounded-[3px] border px-3 py-2 text-sm transition md:min-w-[76px] md:text-base ${
                  time === t
                    ? "border-[#F3C998] bg-[#F3C998] font-semibold text-[#113D33]"
                    : "border-white/35 text-white hover:border-white"
                }`}
              >
                {t}
                <span className="text-xs"> min</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-7 md:mt-12 md:gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Every session, to scale */}
          <div aria-hidden="true">
            <div className="grid grid-cols-[92px_minmax(0,1fr)] md:grid-cols-[124px_minmax(0,1fr)]">
              <div />
              <div className="relative h-5 text-[11px] text-white/70">
                {AXIS.map((a) => (
                  <span key={a} className="absolute -translate-x-full" style={{ left: left(a) }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative grid grid-cols-[92px_minmax(0,1fr)] md:grid-cols-[124px_minmax(0,1fr)]">
              {SERVICES.map((s) => {
                const on = s.minutes.includes(time);
                return (
                  <div key={s.name} className="contents">
                    <div className={`flex h-14 items-center border-t border-white/20 text-sm transition md:h-[72px] md:text-base ${on ? "text-[#F3C998]" : "text-white/85"}`}>
                      {s.name}
                    </div>
                    <div className="relative h-14 border-t border-white/20 md:h-[72px]">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
                      {on && (
                        <div
                          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#F3C998] transition-[width] duration-300 motion-reduce:transition-none"
                          style={{ width: left(time) }}
                        />
                      )}
                      {s.minutes.map((m) => (
                        <span
                          key={m}
                          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                            m === time ? "h-5 w-5 bg-[#F3C998] shadow-[0_0_18px_4px_rgba(243,201,152,0.55)]" : "h-2.5 w-2.5 bg-white/75"
                          }`}
                          style={{ left: left(m) }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 border-t border-white/20 pt-2 text-right text-[11px] text-white/70">minutes</p>
          </div>

          {/* What fits */}
          <div aria-live="polite">
            <p className="cf-title text-[28px] leading-tight md:text-4xl">In {time} minutes:</p>
            <ul className="mt-3 md:mt-5">
              {fits.map((s) => (
                <li key={s.name} className="border-t border-white/25 py-3 md:py-4">
                  <Link href={s.href} className="group flex items-center justify-between gap-4">
                    <span className="min-w-0">
                      <span className="cf-label block text-lg md:text-xl">{s.action}</span>
                      <span className="block text-sm leading-snug text-white/85">{s.line}</span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1"><ArrowMark /></span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="border-t border-white/25 pt-3 text-sm text-white/85">Plus 15 minutes to arrive and settle in.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
