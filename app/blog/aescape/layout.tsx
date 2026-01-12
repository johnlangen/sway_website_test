"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AescapeBlogLayout() {
  const fadeUp = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.6 },
  } as const;

  const fadeSide = (dir: "left" | "right") =>
    ({
      initial: { opacity: 0, x: dir === "left" ? -18 : 18 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.65 },
    } as const);

  return (
    <div className="bg-[#F7F4E9] text-black font-vance min-h-[100svh] md:h-[100svh] md:overflow-y-scroll md:snap-y md:snap-mandatory overflow-x-hidden">
      {/* =========================
          SECTION 1 — HERO (snap on desktop)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex justify-center items-center px-4">
        <div className="relative w-full max-w-[420px] md:max-w-[560px] lg:max-w-[640px] aspect-[3/5] max-h-[82vh] overflow-hidden rounded-md shadow-2xl">
          <Image
            src="/assets/blog22.png"
            alt="Aescape Robot Massage at Sway"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
            <div className="flex items-center justify-between text-[10px] md:text-xs tracking-[0.25em] uppercase opacity-95">
              <span>DENVER</span>
              <span className="px-4 py-1 rounded-full border border-white/70 bg-black/15">
                RECOVERY
              </span>
              <span>LARIMER ST</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                AI Meets Recovery
                <br />
                Reset With Aescape
              </h1>

              <p className="text-sm md:text-base max-w-sm opacity-95">
                The world’s first AI-powered, fully autonomous robot massage —
                exclusively at Sway Wellness Spa in downtown Denver.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#why"
                  className="inline-flex items-center justify-center bg-[#CFE6D8] text-[#113D33] text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full hover:opacity-90 transition"
                >
                  Why It’s Different
                </a>
                <a
                  href="#flow"
                  className="inline-flex items-center justify-center border border-white/70 bg-black/25 text-white text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full hover:bg-black/35 transition"
                >
                  The Flow
                </a>
              </div>
            </div>

            <div className="text-[10px] md:text-xs tracking-[0.22em] uppercase opacity-90">
              30-minute sessions starting at $69
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 2 — INTRO (text + image)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="max-w-xl">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                THE IDEA
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                A Smarter Reset
              </p>

              <p className="mt-6 text-base lg:text-lg leading-relaxed text-[#2b2b2b]">
                Long hours of coding, product sprints, and late nights can leave
                even the most ergonomic workstation warriors with tight shoulders
                and aching lower backs. Meet your new CTO (Chief Tension Officer):{" "}
                <span className="font-semibold text-[#113D33]">Aescape</span>, the
                world’s first AI-powered, fully autonomous robot massage.
              </p>

              <div className="mt-6 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-5 py-4">
                <p className="text-sm leading-relaxed text-[#113D33]">
                  <span className="font-semibold">Exclusively at Sway Wellness Spa</span>{" "}
                  in downtown Denver — designed for people who move fast and want
                  recovery that keeps up.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeSide("right")} className="relative">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog1.png"
                  alt="Aescape robotic massage experience"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 3 — BUILT FOR (image added + better spacing)
         ========================= */}
      <section
        id="why"
        className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeSide("left")} className="relative md:order-1 order-2">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog2.png"
                  alt="Aescape detail and environment"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="max-w-xl md:order-2 order-1">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                BUILT FOR
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                Modern Professionals
              </p>

              <p className="mt-6 text-base lg:text-lg leading-relaxed text-[#2b2b2b]">
                Long hours, constant focus, and screen-heavy work strain the body
                in quiet ways. Aescape was designed for people who optimize
                performance — and understand recovery is part of the equation.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Neck and shoulder tension from screen posture",
                  "Wrist and forearm fatigue from keyboards",
                  "Elevated stress from constant context switching",
                  "Limited time between meetings and deadlines",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 rounded-xl border border-[#d7e2dc] bg-white/80 shadow-sm px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CFE6D8] text-[#113D33] text-xs font-bold">
                      +
                    </span>
                    <p className="text-sm lg:text-base text-[#2b2b2b] leading-relaxed">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 4 — WHAT IS IT (switch sides)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="max-w-xl">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                WHAT IT IS
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                Aescape, Explained
              </p>

              <p className="mt-6 text-base lg:text-lg leading-relaxed text-[#2b2b2b]">
                Aescape combines two heated robotic arms with computer-vision body
                scanning that captures{" "}
                <span className="font-semibold text-[#113D33]">
                  1.1 million data points
                </span>{" "}
                to map your musculature and tailor every stroke. It replicates
                human massage techniques and learns your preferences each session.
              </p>

              <div className="mt-6 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-5 py-4">
                <p className="text-sm leading-relaxed text-[#113D33]">
                  As featured in{" "}
                  <a
                    href="https://www.wired.com/story/hands-on-aescape-automated-massage/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    WIRED
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    Yoga + Life® Magazine
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeSide("right")} className="relative">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog3.png"
                  alt="Aescape robotic arms and scan experience"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 5 — FLOW (ONE image, not stacked)
         ========================= */}
      <section
        id="flow"
        className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeSide("left")} className="relative md:order-2 order-2">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog4.png"
                  alt="Aescape session flow and setup"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="md:order-1 order-1">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                THE FLOW
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                Your Session
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    n: "①",
                    t: "Change into Aerwear compression",
                    d: "Breathable fabric for precision contact",
                  },
                  {
                    n: "②",
                    t: "10-second 3D body scan",
                    d: "Million-point posture and muscle mapping",
                  },
                  {
                    n: "③",
                    t: "Select recovery or focus mode",
                    d: "Adaptive programs based on your needs",
                  },
                  {
                    n: "④",
                    t: "Adjust pressure in real time",
                    d: "Total control throughout the session",
                  },
                  {
                    n: "⑤",
                    t: "Save preferences for next time",
                    d: "Learns and evolves with every visit",
                  },
                  {
                    n: "⑥",
                    t: "Leave reset, not sore",
                    d: "Designed for recovery, not overwork",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-sm p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#113D33] font-bold">{s.n}</span>
                      <div>
                        <p className="text-sm lg:text-base font-semibold text-[#113D33]">
                          {s.t}
                        </p>
                        <p className="mt-1 text-xs lg:text-sm text-[#5a5a5a] leading-relaxed">
                          {s.d}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-5 py-4">
                <p className="text-sm leading-relaxed text-[#113D33]">
                  You stay in control the entire time — adjust pressure, skip
                  segments, or pause whenever you want.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 6 — BENEFITS TABLE (kept, styled)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="max-w-xl">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                BENEFITS
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                For Coders, Engineers & Designers
              </p>

              <p className="mt-6 text-base lg:text-lg leading-relaxed text-[#2b2b2b]">
                Think of it as a repeatable recovery protocol: consistent,
                controllable, and designed to fit into modern schedules.
              </p>

              <div className="mt-6 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-5 py-4">
                <p className="text-sm leading-relaxed text-[#113D33]">
                  Great between stand-ups, after a lift, before a flight, or when
                  your posture is yelling at you.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeSide("right")} className="w-full">
              <div className="rounded-2xl overflow-hidden border border-[#d7e2dc] bg-white shadow-2xl">
                <div className="px-5 py-4 bg-[#113D33] text-white">
                  <p className="text-xs tracking-[0.25em] uppercase opacity-90">
                    Key Benefits Matrix
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    Pain point → solution → why it matters
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm md:text-base">
                    <thead>
                      <tr className="bg-[#F3F7F4] text-left">
                        <th className="p-3 whitespace-nowrap">Dev Pain Point</th>
                        <th className="p-3 whitespace-nowrap">Aescape Solution</th>
                        <th className="p-3 whitespace-nowrap">Why It Matters</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#e7efe9]">
                        <td className="p-3">Text-neck & rounded shoulders</td>
                        <td className="p-3">Cervical & thoracic mobilization</td>
                        <td className="p-3">Reduces headaches, improves posture</td>
                      </tr>
                      <tr className="border-t border-[#e7efe9]">
                        <td className="p-3">Wrist & forearm fatigue</td>
                        <td className="p-3">Forearm myofascial release</td>
                        <td className="p-3">Eases carpal-tunnel–like symptoms</td>
                      </tr>
                      <tr className="border-t border-[#e7efe9]">
                        <td className="p-3">Stress-induced insomnia</td>
                        <td className="p-3">Parasympathetic pressure patterns</td>
                        <td className="p-3">Promotes sleep & recovery</td>
                      </tr>
                      <tr className="border-t border-[#e7efe9]">
                        <td className="p-3">Meeting overload</td>
                        <td className="p-3">30-minute sessions</td>
                        <td className="p-3">Fits between stand-ups and reviews</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-4 bg-white">
                  <p className="text-xs text-[#5a5a5a] leading-relaxed">
                    Note: this is a wellness experience, not medical treatment.
                    If you have an injury or condition, check with your provider.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 7 — FIRST SESSION (switch sides + image)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeSide("left")} className="relative">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog5.png"
                  alt="Aescape first session experience"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="max-w-xl">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                FIRST VISIT
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                What To Expect
              </p>

              <div className="mt-7 space-y-4">
                {[
                  {
                    t: "Stay clothed",
                    d: "Perfect for midday sessions — you’ll wear Aerwear compression.",
                  },
                  {
                    t: "Fully private",
                    d: "Quiet, clean, and focused. Let the robot do the “talking.”",
                  },
                  {
                    t: "Transparent pricing",
                    d: "Sessions start at $69 for 30 minutes.",
                  },
                ].map((i) => (
                  <div
                    key={i.t}
                    className="rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-sm p-5"
                  >
                    <p className="text-[#113D33] font-semibold">{i.t}</p>
                    <p className="mt-1 text-sm text-[#2b2b2b] leading-relaxed">
                      {i.d}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href="/book"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#113D33] text-white text-xs md:text-sm font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition"
                >
                  Schedule Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 8 — FAQ (kept, styled)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex items-start justify-center px-4 pt-16 md:pt-24">
        <div className="w-full max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
              FAQ
            </p>
            <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
              Quick Answers
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4">
            {[
              {
                q: "Is it safe?",
                a: "Yes. Emergency stop and real-time pressure controls are built in. You’re always in control.",
              },
              {
                q: "Does it replace human therapists?",
                a: "No — it complements them. Aescape is ideal for repeatable, time-efficient recovery and targeted tension work.",
              },
              {
                q: "What should I wear?",
                a: "We provide Aerwear at check-in — just bring socks.",
              },
            ].map((item) => (
              <motion.div
                key={item.q}
                {...fadeUp}
                className="rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg p-6"
              >
                <p className="text-[#113D33] font-semibold text-base">
                  {item.q}
                </p>
                <p className="mt-2 text-sm md:text-base text-[#2b2b2b] leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-10 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-6 py-5"
          >
            <p className="text-sm md:text-base text-[#113D33] leading-relaxed">
              Ready to trade bugs for back relief? Reserve your spot — sessions
              can fill quickly during busy downtown weeks.
            </p>
            <div className="mt-4">
              <a
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#113D33] bg-[#CFE6D8] text-[#113D33] text-xs md:text-sm font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition"
              >
                Book Aescape
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          FINAL CTA — SAME IMAGE AS HERO (snap on desktop)
         ========================= */}
      <section className="md:snap-start min-h-[100svh] flex justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[420px] md:max-w-[560px] lg:max-w-[640px] aspect-[3/5] max-h-[82vh] overflow-hidden rounded-md shadow-2xl"
        >
          <Image
            src="/assets/blog22.png"
            alt="Book Aescape at Sway Wellness Spa"
            fill
            priority={false}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
            <div className="flex items-center justify-between text-[10px] md:text-xs tracking-[0.25em] uppercase opacity-95">
              <span>DENVER</span>
              <span className="px-4 py-1 rounded-full border border-white/70 bg-black/15">
                AE S C A P E
              </span>
              <span>SWAY</span>
            </div>

            <div className="text-center px-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05]">
                Book Your
                <br />
                Aescape Session
              </h2>
              <p className="mt-3 text-sm md:text-base opacity-90">
                30-minute sessions starting at $69
              </p>
            </div>

            <div className="flex justify-center">
              <a
                href="/book"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/70 bg-black/35 hover:bg-black/45 transition text-xs md:text-sm font-semibold tracking-[0.18em] uppercase"
              >
                Schedule Now
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
