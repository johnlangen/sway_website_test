"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TREATMENTS = [
  {
    key: "essential",
    label: "Essential",
    price: "$99/mo",
    dropIn: "$139",
    items: [
      { name: "Signature Massage", duration: "50 min" },
      { name: "Maternity Massage", duration: "50 min" },
    ],
  },
  {
    key: "premier",
    label: "Premier",
    price: "$129/mo",
    dropIn: "$169",
    items: [
      { name: "Signature Massage", duration: "70 min" },
      { name: "Maternity Massage", duration: "70 min" },
      { name: "Deep Tissue", duration: "50 min" },
      { name: "Salt Stone Massage", duration: "50 min" },
      { name: "Sports Massage", duration: "50 min" },
      { name: "Lymphatic Drainage", duration: "50 min" },
    ],
  },
  {
    key: "ultimate",
    label: "Ultimate",
    price: "$159/mo",
    dropIn: "$199",
    items: [
      { name: "Signature Massage", duration: "90 min" },
      { name: "Deep Tissue", duration: "70 min" },
      { name: "Salt Stone Massage", duration: "70 min" },
      { name: "Sports Massage", duration: "70 min" },
      { name: "Lymphatic Drainage", duration: "70 min" },
    ],
  },
];

const BENEFITS = [
  { title: "Relieve Muscle Tension", description: "Target tight muscles and chronic tension with personalized massage techniques tailored to your body." },
  { title: "Reduce Stress", description: "Massage therapy helps calm the nervous system, reduce cortisol, and promote deep relaxation." },
  { title: "Improve Circulation", description: "Hands-on therapy supports blood flow and oxygen delivery throughout the body." },
  { title: "Support Recovery", description: "Ideal for athletes, active professionals, or anyone needing physical and mental reset." },
];

export default function LarimerMassagePage() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedTier, setSelectedTier] = useState("premier");

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const activeTier = TREATMENTS.find((t) => t.key === selectedTier)!;

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[340px] max-h-[520px]">
        <Image
          src="/assets/massage2.jpg"
          alt="Massage therapy at Sway Wellness Spa, Larimer Square Denver"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#113D33]/55 via-[#113D33]/50 to-[#113D33]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white/70 text-xs uppercase tracking-widest mb-3"
          >
            Denver – Larimer Square
          </motion.p>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white text-4xl md:text-6xl font-light tracking-tight"
          >
            Massage in Denver
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 mt-2 text-sm"
          >
            From $99/mo · $139 drop-in
          </motion.p>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 items-center"
          >
            <Link
              href="/locations/denver-larimer/book/?category=massage"
              className="bg-white text-[#113D33] font-bold px-7 py-3 rounded-full hover:bg-white/90 transition shadow-lg text-sm"
            >
              Book a Massage
            </Link>
            <Link
              href="/locations/denver-larimer/membership/"
              className="border border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition text-sm"
            >
              View Membership
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TIER STRIP ── */}
      <div className="bg-[#113D33]">
        <div className="max-w-3xl mx-auto px-6 py-4 grid grid-cols-3 gap-3 text-center">
          {TREATMENTS.map((t) => (
            <div key={t.key}>
              <p className="text-white font-bold text-base md:text-lg">{t.price}</p>
              <p className="text-white/55 text-xs">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TREATMENT MENU ── */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl border border-[#113D33]/10 shadow-sm overflow-hidden">
              <div className="bg-[#F7F4E9] px-6 py-5 border-b border-[#113D33]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-[#113D33] text-xl font-semibold">Massage menu</h2>
                  <p className="text-sm text-[#113D33]/60 mt-0.5">Choose your tier to see available treatments</p>
                </div>
                <Link
                  href="/locations/denver-larimer/book/?category=massage"
                  className="inline-flex items-center justify-center bg-[#113D33] text-white px-5 py-2.5 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition shrink-0"
                >
                  Book Now
                </Link>
              </div>

              {/* Tier toggle */}
              <div className="px-6 pt-5">
                <div className="flex bg-[#113D33]/10 rounded-full p-1 gap-0.5 w-full">
                  {TREATMENTS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setSelectedTier(t.key)}
                      className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        selectedTier === t.key
                          ? "bg-[#113D33] text-white shadow-sm"
                          : "text-[#113D33]/60 hover:text-[#113D33]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="px-6 pt-3 text-center">
                <p className="text-sm text-[#113D33]/60">
                  <span className="font-semibold text-[#4A776D]">{activeTier.price}</span>
                  <span className="mx-1.5">·</span>
                  <span>{activeTier.dropIn} drop-in</span>
                </p>
              </div>

              {/* Treatment list */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTier}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {activeTier.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-[#F7F4E9] rounded-xl px-4 py-3"
                      >
                        <span className="text-sm font-medium text-[#113D33]">{item.name}</span>
                        <span className="text-xs text-[#113D33]/50 ml-3 shrink-0">{item.duration}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="bg-[#D1E0D5] px-6 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-vance-bold text-[#113D33] text-center mb-8">
            Why Choose Massage at Sway
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-[#B6CFBF] rounded-xl p-5"
              >
                <h3 className="text-sm font-vance-bold text-[#113D33]">{b.title}</h3>
                <p className="text-gray-700 mt-1.5 text-xs leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/locations/denver-larimer/book/?category=massage"
              className="inline-block bg-[#113D33] hover:bg-[#0a2b23] text-white px-8 py-3.5 rounded-full font-semibold transition shadow-lg"
            >
              Book a Massage at Larimer Square
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              or call{" "}
              <a href="tel:+13034766150" className="font-semibold hover:text-[#113D33] transition">
                (303) 476-6150
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── BOOSTS CALLOUT ── */}
      <section className="bg-[#113D33] px-6 py-12 text-center">
        <p className="text-sm uppercase tracking-widest text-[#9ABFB3] mb-2">Members save 50%</p>
        <h2 className="text-white text-2xl md:text-3xl font-light">Add a Boost to Your Massage</h2>
        <p className="text-white/60 mt-2 max-w-lg mx-auto text-sm">
          CBD, cupping, or PEMF recovery — science-backed add-ons that deepen your results. Members save 50% on every boost.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          {["CauseMedic CBD", "Cupping", "PEMF Recovery"].map((b) => (
            <span key={b} className="bg-white/10 border border-white/15 text-white/80 px-4 py-2 rounded-full">{b}</span>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/locations/denver-larimer/book/?category=massage"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition"
          >
            Book Now
          </Link>
          <Link
            href="/locations/denver-larimer/membership/"
            className="inline-block border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition"
          >
            Join the Club
          </Link>
        </div>
      </section>

    </div>
  );
}
