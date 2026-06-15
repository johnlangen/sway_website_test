"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SwayCurve } from "../components/SwayCurve";

const FRANCHISE_URL = "https://www.spaviafranchise.com/";

// Secondary background tone, matching the homepage rhythm.
const SAND = "#EBE4D1";

const WHY_SPAVIA = [
  {
    title: "Recurring Membership Model",
    text: "A loyal member base creates predictable revenue and long-term stability.",
  },
  {
    title: "Multiple Revenue Streams",
    text: "Massage, facials, recovery tech, retail, and gift cards diversify income.",
  },
  {
    title: "Premium Yet Approachable",
    text: "Resort-inspired design with pricing that supports broad community adoption.",
  },
  {
    title: "100+ Years of Leadership Experience",
    text: "Backed by a franchise team with deep spa and wellness industry expertise.",
  },
  {
    title: "Comprehensive Training & Support",
    text: "From site selection to grand opening and beyond, with ongoing operational guidance.",
  },
  {
    title: "Community Impact",
    text: "Spavia Cares brings wellness to those in need, making your business a force for good.",
  },
];

const STATS = [
  { label: "Median Gross Sales (Spavia system)*", value: "$1,110,481" },
  { label: "Owners Achieving $1M+ Revenue*", value: "1 in 2" },
  { label: "Spavia Franchise Locations", value: "63" },
  { label: "Initial Investment Range**", value: "$479K – $885K" },
];

const SWAY_DIFFERENCE = [
  {
    title: "Recovery Technology",
    text: "Sauna, cold plunge, compression therapy, and LED light therapy in a guided Remedy Room circuit.",
  },
  {
    title: "AI-Powered Aescape Massage",
    text: "The first AI-powered robot massage with body mapping and personalized pressure, a differentiated offering for tech-forward consumers.",
  },
  {
    title: "Modern Club Design",
    text: "City-inspired interiors designed for repeat visits. Private member lounges, curated retail, and a premium yet welcoming atmosphere.",
  },
  {
    title: "Science-Backed Skincare",
    text: "Eminence Organics and Dr. Dennis Gross protocols with high-tech boosts like microcurrent, LED, and oxygen infusion.",
  },
  {
    title: "Expert Massage Therapists",
    text: "Six customizable massage experiences from Deep Tissue to CBD, with add-ons like infrared PEMF mats and cupping.",
  },
  {
    title: "Award-Winning Results",
    text: "Voted #4 Best Day Spa in America by USA Today 10Best and Best U.S. Day Spa by TZR Readers' Choice 2026.",
  },
];

const PATH_STEPS = [
  "Introductory Call",
  "Brand Presentation",
  "Financial Review",
  "Meet the Team Day",
  "Validation Calls",
  "Franchise Awarded",
];

export default function OwnASwayPage() {
  return (
    <div className="w-full bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* ---------- HERO ---------- */}
      <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden text-white">
        <Image
          src="/assets/OG/og-home.jpg"
          alt="Sway Wellness Spa interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="text-xs uppercase tracking-[0.35em] text-white/75 mb-4">
              Franchise Opportunity
            </div>
            <SwayCurve
              width={170}
              strokeWidth={2.2}
              animate
              className="text-white/85 mx-auto block mb-7"
            />
            <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
              Own a Sway
            </h1>
            <p className="mt-5 text-base md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Sway is the next evolution of{" "}
              <a
                href={FRANCHISE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Spavia Day Spa <span className="sr-only">(opens in new tab)</span>
              </a>
              , a premium design concept built on 20+ years of franchise success
              and 63 locations nationwide.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={FRANCHISE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-white text-[#113D33] px-7 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-100 transition shadow-sm"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                  <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
                </span>
                Explore Franchise Ownership
                <ExternalLink className="ml-2 h-4 w-4" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <a
                href="#about"
                className="text-sm font-semibold text-white/85 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition"
              >
                Learn more<span className="sr-only"> about Sway and Spavia</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- SWAY x SPAVIA RELATIONSHIP ---------- */}
      <section id="about" className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              Sway &times; Spavia
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Sway is a Spavia Concept
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#4A776D]/85 mx-auto block mt-4 mb-8"
            />
            <p className="text-base md:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              Spavia Day Spa has spent 20+ years building a proven franchise
              model with 63 locations across the country. Sway is the premium,
              next-generation design concept within the Spavia franchise
              system, blending technology-forward wellness with modern design for
              today&apos;s urban consumer.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              When you open a Sway, you&apos;re opening a Spavia franchise with
              the Sway design package: the same proven operational model,
              membership structure, and corporate support, wrapped in a modern
              wellness club experience featuring recovery tech, AI-powered
              massage, and curated aesthetics.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              Sway operates three locations in Denver, on Larimer Square, in
              RiNo, and in Central Park, with new locations coming soon to
              Georgetown (Washington, D.C.) and Dallas, TX.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- WHY OWN A SWAY ---------- */}
      <section className="px-6 py-16 md:py-24" style={{ backgroundColor: SAND }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              The Opportunity
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Why Entrepreneurs Choose Spavia
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#4A776D]/85 mx-auto block mt-4"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHY_SPAVIA.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)]"
              >
                <div className="mb-3 h-1.5 w-12 rounded-full bg-[#9ABFB3]" />
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm opacity-70 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NUMBERS ---------- */}
      <section className="bg-[#113D33] text-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-[#A9D2C5] mb-3">
              By the Numbers
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Spavia Franchise at a Glance
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#A9D2C5] mx-auto block mt-4"
            />
            <p className="mt-4 text-sm text-white/60">
              Figures below reflect the Spavia franchise system as a whole.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/[0.06] border border-white/12 p-6"
              >
                <div className="text-sm text-white/60">{s.label}</div>
                <div className="mt-1 text-2xl font-semibold">{s.value}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/50 max-w-3xl">
            *Median gross sales source: 2026 Spavia FDD, Item 19, Part III (44
            reporting locations, 2025 measurement period). **Initial investment
            source: 2026 Spavia FDD, Item 7. Reflects system-wide Spavia
            performance. Individual results vary. This page is for informational
            purposes only.
          </p>

          <div className="mt-8 flex justify-center md:justify-start">
            <a
              href={FRANCHISE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-white text-[#113D33] px-7 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-100 transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
              </span>
              View Full Franchise Details
              <ExternalLink className="ml-2 h-4 w-4" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- THE SWAY DIFFERENCE ---------- */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              The Difference
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              What Makes the Sway Concept Unique
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#4A776D]/85 mx-auto block mt-4"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SWAY_DIFFERENCE.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)]"
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm opacity-70 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PATH TO OWNERSHIP ---------- */}
      <section className="px-6 py-16 md:py-24" style={{ backgroundColor: SAND }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
              How It Works
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Path to Ownership
            </h2>
            <SwayCurve
              width={150}
              strokeWidth={2.4}
              animate
              className="text-[#4A776D]/85 mx-auto block mt-4"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {PATH_STEPS.map((s, i) => (
              <div
                key={s}
                className="rounded-2xl bg-white p-5 text-center shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)]"
              >
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#113D33] text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{s}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={FRANCHISE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-[#113D33] text-white px-8 py-4 text-sm font-semibold rounded-full hover:bg-[#0a2b23] transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-[#113D33]" />
              </span>
              Start Exploring Ownership
              <ExternalLink className="ml-2 h-4 w-4" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
