"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SwayCurve } from "../components/SwayCurve";

/* ---------------------------------------------
   DATA
--------------------------------------------- */

// The brand mantra, reframed as the three principles of the philosophy.
const PRINCIPLES = [
  {
    word: "Pause",
    body: "An escape from the hustle. Every space is designed to slow your nervous system the moment you walk in, so the city's pace stops at the door.",
  },
  {
    word: "Breathe",
    body: "Science-backed recovery. Traditional treatments meet modern technology, from salt stone and sauna to AI-guided massage, all chosen because they work.",
  },
  {
    word: "Rediscover",
    body: "Built for the long term. Not a once-a-year treat, but a sustainable rhythm of total-body care that becomes the part of your week you can't live without.",
  },
] as const;

// Secondary background tone, matching the homepage rhythm.
const SAND = "#EBE4D1";

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

export default function SwayWayPage() {
  return (
    <div className="snap-container w-full overflow-hidden max-w-screen">
      {/* ======================================================
          1. Hero
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center relative text-white">
        <Image
          src="/assets/OG/og-home.jpg"
          alt="The Sway Way"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-20 text-center px-6 font-vance"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-white/75 mb-4">
            Our Philosophy
          </div>
          <SwayCurve
            width={170}
            strokeWidth={2.2}
            animate
            className="text-white/85 mx-auto block mb-7"
          />
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
            The Sway Way
          </h1>
          <p className="mt-5 text-base md:text-2xl font-light text-white/85 tracking-wide">
            The next wave of wellness.
          </p>
        </motion.div>

        {/* Scroll affordance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/80 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <svg
            className="w-4 h-4 scroll-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* ======================================================
          2. Manifesto: single hook
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl text-center font-vance"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
            Why We Exist
          </div>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D]/85 mx-auto block mb-7"
          />
          <p className="text-2xl md:text-4xl lg:text-5xl leading-[1.15]">
            Modern life moves fast. Wellness shouldn&apos;t ask you to keep up. We built
            a club where real recovery is{" "}
            <span className="text-[#4A776D]">accessible</span>, proven science meets
            genuine warmth, and the city finally gets a place to{" "}
            <span className="text-[#4A776D]">exhale</span>.
          </p>
        </motion.div>
      </section>

      {/* ======================================================
          3. Origin story
          ====================================================== */}
      <section
        className="snap-section h-screen flex items-center justify-center text-[#113D33] px-6 md:px-10"
        style={{ backgroundColor: SAND }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(17,61,51,0.4)]">
              <Image
                src="/assets/emily.jpg"
                alt="A new era of spa experience"
                width={640}
                height={420}
                className="w-full h-[220px] sm:h-[300px] md:h-[440px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-vance"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              A New Era
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Twenty years of wellness, reimagined
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-80 max-w-md">
              Founded by the visionaries behind Spavia Day Spa, Sway makes wellness
              accessible, innovative, and reflective of city life. With over 20
              years of experience, we drew inspiration from cultural hubs like
              Barcelona and New York to blend technology with traditional treatments,
              creating a fresh, city-driven wellness club.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          4. The principles: deep-green anchor panel
          ====================================================== */}
      <section
        className="snap-section h-screen flex items-center justify-center text-[#F7F4E9] px-6 md:px-10"
        style={{ backgroundColor: "#113D33" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl font-vance text-center"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#A9D2C5] mb-3">
            What We Believe
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Pause. Breathe. Rediscover.
          </h2>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#A9D2C5] mx-auto block mb-10 md:mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.word}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                viewport={{ once: true }}
                className="md:border-l md:border-white/15 md:pl-6"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#A9D2C5] mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  {p.word}
                </h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          5. Innovative wellness
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center w-full md:[direction:rtl]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:[direction:ltr]"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(17,61,51,0.4)]">
              <Image
                src="/assets/swayway.jpg"
                alt="Innovative wellness for a modern world"
                width={640}
                height={420}
                className="w-full h-[220px] sm:h-[300px] md:h-[440px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-vance md:[direction:ltr]"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              The Experience
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Innovative wellness for a modern world
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-80 max-w-md">
              At Sway, we believe in total body health and long-term optimization.
              Our wellness club is designed for city lifestyles, luxurious yet
              accessible. With affordability, personalized service, and
              science-backed treatments, Sway becomes the happy place you
              can&apos;t live without.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          6. Signature signoff + CTA
          ====================================================== */}
      <section
        className="snap-section h-screen flex flex-col items-center justify-center text-[#113D33] px-6"
        style={{ backgroundColor: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-xl"
        >
          <SwayCurve
            width={200}
            strokeWidth={1.5}
            animate
            className="text-[#113D33]/55 mb-10"
          />
          <p className="font-vance italic text-2xl md:text-4xl leading-[1.25] mb-8">
            This is the Sway Way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/membership"
              className="group relative bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-[#113D33]" />
              </span>
              Explore Membership
            </Link>
            <Link
              href="/offers"
              className="text-sm font-semibold text-[#113D33] underline underline-offset-4 decoration-[#113D33]/30 hover:decoration-[#113D33] transition"
            >
              New Guest Offer
            </Link>
          </div>

          <Link
            href="/own"
            className="mt-7 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#113D33]/55 hover:text-[#113D33] transition"
          >
            Bring Sway to your city · Own a Sway
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <div className="mt-9 text-xs uppercase tracking-[0.35em] text-[#4A776D]">
            Sway &nbsp;·&nbsp; Est. 2025
          </div>
        </motion.div>
      </section>
    </div>
  );
}
