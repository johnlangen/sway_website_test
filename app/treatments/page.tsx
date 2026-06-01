"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { resolveLocationHref } from "../components/LocationAwareHref";
import { SwayCurve } from "../components/SwayCurve";

/* ---------- DATA ---------- */

type Treatment = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  mobileImage: string | null;
  learnHref: string;
  badge?: string;
};

const treatments: Treatment[] = [
  {
    name: "Massages",
    tagline: "3 tiers · 18 treatments",
    description:
      "Signature, Deep Tissue, Sports, Salt Stone, Lymphatic Drainage, Maternity and more. 50 to 90 minutes across Essential, Premier, and Ultimate tiers.",
    image: "/assets/treatment3.jpg",
    mobileImage: null,
    learnHref: "/massages",
  },
  {
    name: "Facials",
    tagline: "3 tiers · 13 treatments",
    description:
      "Anti-aging, acne, hydration, sensitive skin, and brightening facials with dermapore technology, LED, microcurrent, and oxygen infusion. 30 to 60 minutes.",
    image: "/assets/facialExperiences.jpg",
    mobileImage: "/assets/facialExperiencesMobile.jpg",
    learnHref: "/facials",
  },
  {
    name: "Remedy Room",
    tagline: "4-modality recovery circuit",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy. 40 minutes.",
    image: "/assets/treatment2.jpg",
    mobileImage: null,
    learnHref: "/remedy-tech",
  },
  {
    name: "Aescape",
    tagline: "AI-powered robot massage",
    description:
      "Real-time 3D body mapping with personalized pressure zones. 15, 30, 45, or 60 minutes.",
    image: "/assets/aescape-treatment.jpg",
    mobileImage: "/assets/aescapeMobile.jpg",
    learnHref: "/aescape",
    badge: "Select Locations",
  },
];

const stats = [
  { value: "18", label: "Massage Types" },
  { value: "13", label: "Facial Treatments" },
  { value: "4", label: "Recovery Technologies" },
  { value: "7", label: "Boost Add-Ons" },
];

const boosts = [
  "Dermaflash",
  "LED Light Therapy",
  "Microcurrent",
  "PEMF Mat",
  "Oxygen Infusion",
  "Cupping",
  "CBD",
];

/* ---------- COMPONENT ---------- */

export default function TreatmentsPage() {
  const [bookHref, setBookHref] = useState("/book");

  useEffect(() => {
    const resolved = resolveLocationHref({
      localPath: "/book",
      fallbackHref: "/book",
    });
    setBookHref(resolved);
  }, []);

  return (
    <div className="snap-container w-full overflow-hidden max-w-screen font-vance">
      {/* ======================================================
          1. Hero (snap)
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center relative bg-[#113D33] text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-[#A9D2C5] mb-4">
            Our Treatments
          </div>
          <SwayCurve
            width={170}
            strokeWidth={2.2}
            animate
            className="text-white/85 mx-auto block mb-7"
          />
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
            Treatment Experiences
          </h1>

          <p className="sr-only">
            Sway Wellness Spa treatments across 3 membership tiers: Essential,
            Premier, and Ultimate. 18 massage types including Signature, Deep
            Tissue, Sports, Salt Stone, Lymphatic Drainage, and Maternity
            (50 to 90 minutes). 13 facial treatments including
            Forever Young Anti-Aging, Pore Perfection Acne, Glow Getter
            Hydration, Sensitive Silk, Dr. Dennis Gross Vitamin C, Illuminate
            LED, Oxygen Infusion, Sculpt &amp; Lift Microcurrent, and Hydraderm
            (30 to 60 minutes). 4 recovery technologies in the Remedy Room (sauna,
            cold plunge, compression therapy, LED light therapy, 40 minutes).
            Aescape AI-powered robot massage at select locations (15 to 60
            minute sessions). 7 boost add-ons: Dermaflash, LED light
            therapy, microcurrent, PEMF mat, oxygen infusion, cupping,
            and CBD. Locations in Denver CO,
            Dallas TX, and Washington DC. Voted #4 Best Day Spa in America
            by USA Today 10Best. Book at swaywellnessspa.com.
          </p>

          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Massage, facials, recovery technology, and AI-powered robot massage,
            all under one roof at Sway&apos;s award-winning wellness clubs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/60 font-semibold mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* scroll affordance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 flex flex-col items-center gap-2 pointer-events-none"
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
          2-5. Treatment frames (full-bleed, snap)
          ====================================================== */}
      {treatments.map((t, i) => {
        const captionTop = i % 2 === 1;
        return (
          <section
            key={t.name}
            className="snap-section h-screen relative overflow-hidden text-white"
          >
            <div className="absolute inset-0 ken-burns">
              <picture className="block w-full h-full">
                {t.mobileImage && (
                  <source media="(max-width: 767px)" srcSet={t.mobileImage} />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={`${t.name} at Sway Wellness Spa`}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>

            {/* Gradient overlay for readability */}
            <div
              className={`absolute inset-0 ${
                captionTop
                  ? "bg-gradient-to-b from-black/85 via-black/35 to-transparent"
                  : "bg-gradient-to-t from-black/85 via-black/35 to-transparent"
              }`}
            />

            {/* Chapter eyebrow pill */}
            <div className="absolute top-20 md:top-24 left-6 md:left-12 z-10">
              <div className="inline-flex items-center gap-3 text-white/95 text-[10px] uppercase tracking-[0.25em] bg-black/45 border border-white/15 px-3.5 py-2 rounded-full">
                <span className="font-semibold">0{i + 1} / 04</span>
                <span className="opacity-40">|</span>
                <span>{t.tagline}</span>
              </div>
            </div>

            {/* Badge (Aescape) */}
            {t.badge && (
              <div className="absolute top-20 md:top-24 right-6 md:right-12 z-10">
                <span className="bg-white/90 text-[#113D33] text-[10px] px-3 py-1.5 rounded-full font-semibold tracking-wide backdrop-blur-sm uppercase">
                  {t.badge}
                </span>
              </div>
            )}

            {/* Caption (alternates top / bottom, always left) */}
            <div
              className={`absolute inset-x-0 z-10 px-6 md:px-12 flex justify-start ${
                captionTop ? "top-32 md:top-40" : "bottom-0 pb-14 md:pb-20"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-md text-left"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 leading-[1.02]">
                  {t.name}
                </h2>
                <p className="text-sm sm:text-base text-white/85 mb-6 leading-relaxed">
                  {t.description}
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <Link
                    href={t.learnHref}
                    className="bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition shadow-lg"
                  >
                    Learn More
                  </Link>
                  <Link
                    href={bookHref}
                    className="text-sm font-medium text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition"
                  >
                    Book
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ======================================================
          6. Boosts callout (snap)
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-center font-vance"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
            Add-Ons
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Enhance Any Treatment
          </h2>
          <SwayCurve
            width={150}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D]/85 mx-auto block mt-4 mb-6"
          />
          <p className="text-base opacity-70 max-w-2xl mx-auto leading-relaxed">
            Add a boost to your massage or facial for a deeper, more targeted
            experience, designed to complement your treatment.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {boosts.map((boost) => (
              <span
                key={boost}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#113D33] shadow-[0_10px_30px_-18px_rgba(17,61,51,0.25)]"
              >
                {boost}
              </span>
            ))}
          </div>

          <p className="mt-7 text-sm opacity-50">
            Members save 50% on all boosts and super boosts.
          </p>
        </motion.div>
      </section>

      {/* ======================================================
          7. CTA (snap)
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#113D33] text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Ready to Book Your Experience?
          </h2>
          <SwayCurve
            width={150}
            strokeWidth={2.4}
            animate
            className="text-[#A9D2C5] mx-auto block mt-4 mb-5"
          />
          <p className="text-base text-white/80 max-w-lg mx-auto">
            Choose your treatment and schedule your visit at Denver&apos;s
            modern wellness club on Larimer Square.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={bookHref}
              className="group relative inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-100 transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
              </span>
              Book Now
            </Link>
            <Link
              href="/membership"
              className="text-sm font-semibold text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition"
            >
              Explore Memberships
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
