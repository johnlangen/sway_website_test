"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";

const FRANCHISE_URL = "https://www.spaviafranchise.com/";

export default function OwnASwayPage() {
  return (
    <div className="w-full bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* ---------- HERO ---------- */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <Image
          src="/assets/OG/og-home.jpg"
          alt="Sway Wellness Spa interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center text-white"
          >
            <h1 className="text-3xl md:text-6xl font-light tracking-tight">
              Own a Sway
            </h1>
            <p className="mt-4 text-base md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Sway is the next evolution of{" "}
              <a
                href={FRANCHISE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Spavia Day Spa
              </a>
              {" "}&mdash; a premium design concept built on 20+ years of
              franchise success and 60+ locations nationwide.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={FRANCHISE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-[#113D33] px-7 py-3.5 text-sm font-bold rounded-xl hover:bg-white/90 transition-all"
              >
                Explore Franchise Ownership
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center text-sm text-white/80 hover:text-white transition"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
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
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Sway is a Spavia Concept
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              Spavia Day Spa has spent 20+ years building a proven franchise
              model with 60+ locations across the country. Sway is the premium,
              next-generation design concept within the Spavia franchise
              system &mdash; blending technology-forward wellness with modern
              design for today&apos;s urban consumer.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              When you open a Sway, you&apos;re opening a Spavia franchise with
              the Sway design package: the same proven operational model,
              membership structure, and corporate support &mdash; wrapped in a
              modern wellness club experience featuring recovery tech, AI-powered
              massage, and curated aesthetics.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
              Sway currently has one flagship location on Larimer Square in
              Denver, CO &mdash; with new locations coming soon to Georgetown
              (Washington, D.C.) and Dallas, TX.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- WHY OWN A SWAY ---------- */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            Why Entrepreneurs Choose Spavia
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
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
                text: "From site selection to grand opening and beyond — ongoing operational guidance.",
              },
              {
                title: "Community Impact",
                text: "Spavia Cares brings wellness to those in need, making your business a force for good.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-6"
              >
                <div className="mb-3 h-1.5 w-12 rounded-full bg-[#113D33]" />
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm opacity-70">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NUMBERS ---------- */}
      <section className="bg-[#113D33] text-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Spavia Franchise at a Glance
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Figures below reflect the Spavia franchise system as a whole.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Avg. Gross Sales (Spavia system)*", value: "$1.14M" },
              { label: "Spavia Locations Exceeding $1M+", value: "1 in 2" },
              { label: "Spavia Franchise Locations", value: "60+" },
              { label: "Initial Investment Range*", value: "$496K – $796K" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 p-6"
              >
                <div className="text-sm text-white/60">{s.label}</div>
                <div className="mt-1 text-2xl font-semibold">{s.value}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/50">
            *Figures from the Spavia Franchise Disclosure Document (Item 19).
            Reflects system-wide Spavia performance. Individual results vary.
            This page is for informational purposes only.
          </p>

          <div className="mt-8">
            <a
              href={FRANCHISE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-[#113D33] px-7 py-3.5 text-sm font-bold rounded-xl hover:bg-white/90 transition-all"
            >
              View Full Franchise Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- THE SWAY DIFFERENCE ---------- */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            What Makes the Sway Concept Unique
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Recovery Technology",
                text: "Sauna, cold plunge, Normatec compression, and LED light therapy in a guided Remedy Room circuit.",
              },
              {
                title: "AI-Powered Aescape Massage",
                text: "The first AI-powered robot massage with body mapping and personalized pressure — a differentiated offering for tech-forward consumers.",
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
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[#113D33]/10 bg-white p-6"
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm opacity-70">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PATH TO OWNERSHIP ---------- */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            Path to Ownership
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              "Introductory Call",
              "Brand Presentation",
              "Financial Review",
              "Meet the Team Day",
              "Validation Calls",
              "Franchise Awarded",
            ].map((s, i) => (
              <div
                key={s}
                className="rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-5 text-center"
              >
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#113D33] text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{s}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={FRANCHISE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#113D33] text-white px-8 py-4 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition-all"
            >
              Start Exploring Ownership
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
