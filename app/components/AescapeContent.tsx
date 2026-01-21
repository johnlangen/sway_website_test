"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BOOK_URL = "/locations/denver-larimer/book-aescape/";


const pressArticles = [
  {
    title: "I Got a Robot Massage and It Was Actually Kind of Great",
    source: "Vogue",
    url: "https://www.vogue.com/article/robot-massage",
  },
  {
    title: "OK, this luxury AI robot is kind of revolutionary.",
    source: "Mashable",
    url: "https://mashable.com/article/aescape-ai-robot-massage",
  },
  {
    title: "I fear robots, but love a good back rub.",
    source: "Popular Science",
    url: "https://www.popsci.com/technology/robot-massage-aescape/",
  },
  {
    title:
      "How Apple and Uber alums designed this high-tech massage machine to feel human-like",
    source: "Fast Company",
    url: "https://www.fastcompany.com/91056222/how-apple-and-uber-alums-designed-this-new-high-tech-massage-machine-to-feel-undeniably-human-like",
  },
];

const faqs = [
  {
    question: "How does the Aescape massage work?",
    answer: (
      <>
        <p>
          Aescape is a fully interactive massage robot that adapts to your body
          and preferences for a truly personalized experience.
        </p>
        <p className="mt-4">
          Before starting, you’ll adjust the bolster, headrest, and armrest for
          comfort. Then, using the touchscreen (Aerview), you can customize
          pressure, target muscle zones, and tweak the music and lighting. Every
          setting is remembered for your next visit.
        </p>
      </>
    ),
  },
  {
    question: "Are there different massage programs to choose from?",
    answer: (
      <>
        <p>
          Yes. Aescape at Sway offers programs focused on the upper body and
          glutes. Each session runs 15–60 minutes, delivering the benefits of a
          full hour of human massage thanks to synchronized dual robotic arms.
        </p>
        <p className="mt-4">
          Longer sessions (up to 120 minutes) will roll out in the future.
        </p>
      </>
    ),
  },
  {
    question: "Can I control the massage settings?",
    answer: (
      <>
        <p>
          Absolutely. You can control pressure, music, ambience, and visuals
          directly from the Aerview console. Preferences are saved for your next
          visit.
        </p>
      </>
    ),
  },
  {
    question: "Is the Aescape massage experience safe?",
    answer: (
      <>
        <p>
          Yes. Our Aescape tables at Sway are equipped with real-time pressure
          sensors, emergency stop functionality, and advanced safety logic.
        </p>
        <p className="mt-4">
          Please review the{" "}
          <a
            href="https://www.aescape.com/contraindications"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-[#113D33] hover:opacity-80 transition"
          >
            full list of contraindications
          </a>{" "}
          before booking.
        </p>
      </>
    ),
  },
  {
    question:
      "What steps do I need to take to ensure a safe and optimal massage experience?",
    answer: (
      <>
        <p>
          You must wear Aerwear—special compression apparel designed for the
          Aescape system. Sizes are provided at check-in.
        </p>
        <p className="mt-4">
          Please also tie up long hair so it’s off the neck—we’ll provide a
          headband if needed.
        </p>
      </>
    ),
  },
];

export default function AescapeContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fadeUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.6 },
    }),
    []
  );

  const fadeSide = useMemo(
    () => (dir: "left" | "right") => ({
      initial: { opacity: 0, x: dir === "left" ? -18 : 18 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.65 },
    }),
    []
  );

  const steps = useMemo(
    () => [
      {
        n: "①",
        t: "Change into Aerwear",
        d: "Compression apparel for precise contact (provided at check-in).",
      },
      {
        n: "②",
        t: "Quick body scan",
        d: "Maps your posture and helps tailor the session to you.",
      },
      {
        n: "③",
        t: "Pick your focus",
        d: "Upper body, glutes, or targeted zones depending on availability.",
      },
      {
        n: "④",
        t: "Adjust in real time",
        d: "Pressure, zones, ambience, and visuals—fully controlled by you.",
      },
      {
        n: "⑤",
        t: "Save preferences",
        d: "Your settings are remembered for next time.",
      },
      {
        n: "⑥",
        t: "Leave reset",
        d: "A consistent, repeatable recovery session—no guesswork.",
      },
    ],
    []
  );

  return (
    <div className="bg-[#F4F4F2] text-black font-vance overflow-x-hidden md:h-[100svh] md:overflow-y-scroll md:snap-y md:snap-mandatory md:scroll-pb-24">
      {/* ======================================================
          HERO (snap on desktop)
          Fix: push content down so it clears the nav on desktop + mobile
      ======================================================= */}
      <section className="relative min-h-[92svh] md:min-h-[100svh] md:snap-start overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/aescape.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/og-aescape.jpg"
        />

        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />


        <div className="relative z-10 h-full">
          <div className="max-w-6xl mx-auto h-full px-5 md:px-10">
            {/* top padding clears sticky nav; keeps hero content lower */}
            <div className="h-full flex items-start pt-28 sm:pt-32 md:pt-40 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-[720px]"
              >
                <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs tracking-[0.22em] uppercase text-white/90">
                  <span className="px-3 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur">
                    Denver
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur">
                    Larimer St
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur">
                    Sway Wellness Spa
                  </span>
                </div>

                <h1 className="mt-6 text-white font-light leading-[1.02] text-4xl md:text-6xl">
                  Aescape Robot Massage
                  <br />
                  in Denver
                </h1>

                <p className="mt-4 text-white/90 text-base md:text-lg italic">
                  Massage reimagined—quiet, controlled, and repeatable.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { k: "Control", v: "Adjust pressure & zones live" },
                    { k: "Private", v: "Fully personal session" },
                    { k: "Consistent", v: "Same quality every visit" },
                  ].map((chip) => (
                    <div
                      key={chip.k}
                      className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-4 py-3"
                    >
                      <p className="text-white text-sm font-semibold">{chip.k}</p>
                      <p className="mt-1 text-white/75 text-xs leading-relaxed">
                        {chip.v}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm md:text-base font-semibold tracking-wide hover:opacity-90 transition"
                  >
                    Book Now
                  </Link>

                  <a
                    href="#idea"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/35 bg-black/25 text-white text-sm md:text-base font-semibold tracking-wide hover:bg-black/35 transition"
                  >
                    Why It&apos;s Different
                  </a>

                  <a
                    href="https://www.aescape.com/technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/35 bg-black/10 text-white text-sm md:text-base font-semibold tracking-wide hover:bg-black/25 transition"
                  >
                    Aescape Tech
                  </a>
                </div>

                <p className="mt-6 text-white/65 text-xs md:text-sm tracking-wide">
                  Sessions 15–60 minutes • Aerwear provided 
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SECTION: THE IDEA (snap on desktop)
          Fix: scroll-mt prevents anchor from hiding under nav
      ======================================================= */}
      <section
        id="idea"
        className="scroll-mt-28 md:snap-start min-h-[100svh] flex items-start justify-center px-5 md:px-10 pt-16 md:pt-24"
      >
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
                Aescape blends robotics and AI with a calm, spa-grade environment
                to deliver a massage experience that&apos;s{" "}
                <span className="font-semibold text-[#113D33]">
                  controlled, consistent, and repeatable
                </span>
                . You guide the session—pressure, zones, ambience—without the
                awkwardness of “is that too much?”
              </p>

              <div className="mt-6 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-5 py-4">
                <p className="text-sm leading-relaxed text-[#113D33]">
                  Best for: busy professionals who want recovery that fits into
                  real schedules.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#113D33] text-white text-xs md:text-sm font-semibold tracking-[0.14em] uppercase hover:opacity-90 transition"
                >
                  Book Aescape
                </Link>
                <a
                  href="#flow"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#113D33]/25 bg-white text-[#113D33] text-xs md:text-sm font-semibold tracking-[0.14em] uppercase hover:bg-white/70 transition"
                >
                  See The Flow
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeSide("right")} className="relative">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog2.png"
                  alt="Aescape robotic massage experience"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { t: "Real-time control", d: "Pressure & target zones" },
                  { t: "Private experience", d: "Quiet, focused session" },
                  { t: "Repeatable results", d: "Same quality every time" },
                  { t: "Remembered prefs", d: "Saves your settings" },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-sm px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-[#113D33]">
                      {c.t}
                    </p>
                    <p className="mt-1 text-xs text-[#5a5a5a] leading-relaxed">
                      {c.d}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SECTION: THE FLOW (snap on desktop)
      ======================================================= */}
      <section
        id="flow"
        className="scroll-mt-28 md:snap-start min-h-[100svh] flex items-start justify-center px-5 md:px-10 pt-16 md:pt-24"
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeSide("left")} className="relative md:order-2">
              <div className="relative w-full aspect-[16/12] md:aspect-[16/13] overflow-hidden rounded-2xl shadow-2xl bg-white">
                <Image
                  src="/assets/aescapeblog4.png"
                  alt="Aescape session flow and setup"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="md:order-1">
              <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                THE FLOW
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                Your Session
              </p>

              <p className="mt-6 text-base lg:text-lg leading-relaxed text-[#2b2b2b]">
                The experience is designed to feel simple, calm, and on your
                terms. You’re in control from start to finish.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {steps.map((s) => (
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

              <div className="mt-7 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-5 py-4">
                <p className="text-sm leading-relaxed text-[#113D33]">
                  Tip: If you’re new to Aescape, start moderate and adjust up as
                  you learn what you like.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FAQ (snap on desktop)
      ======================================================= */}
      <section className="md:snap-start min-h-[100svh] flex items-start justify-center px-5 md:px-10 pt-16 md:pt-24 pb-20">
        <div className="w-full max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
              FAQ
            </p>
            <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
              Quick Answers
            </p>
          </motion.div>

          <div className="mt-10 rounded-3xl border border-[#d7e2dc] bg-white/85 shadow-2xl overflow-hidden">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `aescape-faq-panel-${i}`;
              const buttonId = `aescape-faq-button-${i}`;

              return (
                <div
                  key={i}
                  className={i === 0 ? "" : "border-t border-[#e7efe9]"}
                >
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left px-6 md:px-8 py-6 flex items-start justify-between gap-6"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    <div>
                      <p className="text-base md:text-lg font-semibold text-[#113D33]">
                        {faq.question}
                      </p>
                      <p className="mt-2 text-sm text-[#5a5a5a]">
                        Tap to {isOpen ? "close" : "open"}
                      </p>
                    </div>

                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e2dc] bg-white text-[#113D33] text-xl">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 md:px-8 pb-6 overflow-hidden"
                      >
                        <div className="text-[15px] md:text-base text-[#2b2b2b] leading-relaxed">
                          {faq.answer}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            href={BOOK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#113D33] text-white text-xs md:text-sm font-semibold tracking-[0.14em] uppercase hover:opacity-90 transition"
                          >
                            Book Now
                          </Link>
                          <a
                            href="https://www.aescape.com/technology"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#113D33]/25 bg-white text-[#113D33] text-xs md:text-sm font-semibold tracking-[0.14em] uppercase hover:bg-white/70 transition"
                          >
                            Learn More
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-10 rounded-2xl border border-[#d7e2dc] bg-white/85 shadow-lg px-6 py-5"
          >
            <p className="text-sm md:text-base text-[#113D33] leading-relaxed">
              Ready to try it? Aescape sessions can fill quickly during busy
              downtown weeks.
            </p>
            <div className="mt-4">
              <Link
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#CFE6D8] text-[#113D33] text-xs md:text-sm font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition"
              >
                Reserve Your Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          PRESS
          Fix: make this a snap section + full viewport so it can't "snap back"
      ======================================================= */}
      <section className="md:snap-start min-h-[100svh] bg-[#113D33] text-white">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-20">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold">
              What the Press Is Saying
            </h2>
            <p className="mt-3 text-white/80 text-sm md:text-base">
              Independent coverage on Aescape and the future of massage.
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {pressArticles.map((article, i) => (
              <motion.a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp}
                className="block rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-6 py-6 hover:bg-white/10 transition"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-white/70">
                  {article.source}
                </p>
                <h3 className="mt-3 text-lg md:text-xl font-semibold leading-snug">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm text-white/75">Open article →</p>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-[#113D33] text-xs md:text-sm font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition"
            >
              Book Aescape
            </Link>
          </div>

          {/* extra breathing room so last section feels complete inside scroll container */}
          <div className="h-10" />
        </div>
      </section>
    </div>
  );
}
