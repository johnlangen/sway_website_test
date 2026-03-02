"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { resolveLocationHref } from "../components/LocationAwareHref";
import { ArrowRight } from "lucide-react";

/* ---------- DATA ---------- */

const treatments = [
  {
    name: "Massages",
    tagline: "6 expert-led experiences",
    description:
      "Deep Tissue, Sports, CBD, Himalayan Salt Stone, Lymphatic Drainage, and Relaxation — each customized by licensed therapists. Extend to 80 minutes or add boosts like infrared PEMF, cupping, and scalp massage.",
    price: "From $99",
    priceSuffix: " members",
    image: "/assets/treatment3.jpg",
    learnHref: "/massages",
  },
  {
    name: "Facials",
    tagline: "6 results-driven treatments",
    description:
      "Forever Young, Glow Getter, Pore Perfection, Vitamin C, Sensitive Silk, and Express — powered by Eminence Organics and Dr. Dennis Gross. Boost with LED, microcurrent, oxygen infusion, or chemical peel.",
    price: "From $99",
    priceSuffix: " members",
    image: "/assets/treatment1.jpg",
    learnHref: "/facials",
  },
  {
    name: "Remedy Room",
    tagline: "4-modality recovery circuit",
    description:
      "A guided 40-minute circuit through infrared sauna, cold plunge, Normatec compression therapy, and LED light therapy. Designed for full-body recovery, inflammation reduction, and deep relaxation.",
    price: "From $25",
    priceSuffix: " members",
    image: "/assets/treatment2.jpg",
    learnHref: "/remedy-tech",
  },
  {
    name: "Aescape",
    tagline: "AI-powered robot massage",
    description:
      "The world's first fully autonomous massage robot. Real-time 3D body mapping, personalized pressure zones, and consistent precision — available in 15, 30, and 60-minute sessions.",
    price: "From $49",
    priceSuffix: "",
    image: "/assets/aescape-treatment.jpg",
    learnHref: "/aescape",
    badge: "Colorado Exclusive",
  },
];

const stats = [
  { value: "6", label: "Massage Types" },
  { value: "6", label: "Facial Treatments" },
  { value: "4", label: "Recovery Technologies" },
  { value: "10+", label: "Boost Add-Ons" },
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
    <div className="w-full bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* ---------- HERO ---------- */}
      <section className="bg-[#113D33] text-white px-6 pt-28 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-light tracking-tight"
          >
            Treatment Experiences
          </motion.h1>

          <p className="sr-only">
            Sway Wellness Spa treatments: 6 massage types (Deep Tissue, Sports,
            CBD, Himalayan Salt Stone, Lymphatic Drainage, Relaxation), 6 facial
            treatments (Forever Young, Glow Getter, Pore Perfection, Vitamin C,
            Sensitive Silk, Express) using Eminence Organics and Dr. Dennis Gross
            products, 4 recovery technologies in the Remedy Room (infrared
            sauna, cold plunge, Normatec compression, LED light therapy), and
            Aescape AI-powered robot massage (15, 30, 60-minute sessions). Over
            10 boost add-ons including microcurrent, oxygen infusion, chemical
            peel, cupping, infrared PEMF mat, and scalp massage. Massages and
            facials are 50 minutes (extendable to 80). Remedy Room is a guided
            40-minute circuit. Member pricing from $99 per treatment. Located at
            1428 Larimer St. on Larimer Square in Denver, CO 80202. Voted #4
            Best Day Spa in America by USA Today 10Best. Book at
            swaywellnessspa.com or call (303) 476-6150.
          </p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-base md:text-lg opacity-80 max-w-2xl mx-auto"
          >
            Massage, facials, recovery technology, and AI-powered robot massage
            — all under one roof at Denver&apos;s award-winning wellness club.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 text-sm opacity-50"
          >
            Voted #4 Best Day Spa in America — USA Today 10Best
          </motion.p>
        </div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="bg-white px-6 py-8 md:py-10 border-b border-[#113D33]/8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#113D33]">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#113D33]/50 font-semibold mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TREATMENT SECTIONS ---------- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
          {treatments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Image */}
              <div
                className={`relative rounded-2xl overflow-hidden ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="relative h-[300px] md:h-[420px]">
                  <Image
                    src={t.image}
                    alt={`${t.name} at Sway Wellness Spa`}
                    fill
                    className="object-cover"
                  />
                  {t.badge && (
                    <span className="absolute top-4 left-4 bg-[#113D33] text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide">
                      {t.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-xs uppercase tracking-[0.15em] text-[#113D33]/45 font-semibold">
                  {t.tagline}
                </p>

                <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                  {t.name}
                </h2>

                <p className="mt-4 text-base leading-relaxed opacity-75">
                  {t.description}
                </p>

                <p className="mt-4 text-lg font-bold text-[#113D33]">
                  {t.price}
                  {t.priceSuffix && (
                    <span className="text-sm font-normal opacity-50">
                      {t.priceSuffix}
                    </span>
                  )}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={t.learnHref}
                    className="inline-flex items-center justify-center bg-[#113D33] text-white px-6 py-3 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href={bookHref}
                    className="inline-flex items-center justify-center border-2 border-[#113D33]/20 text-[#113D33] px-6 py-3 text-sm font-bold rounded-xl hover:border-[#113D33]/40 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- BOOSTS CALLOUT ---------- */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Enhance Any Treatment
          </h2>
          <p className="mt-4 text-base opacity-70 max-w-2xl mx-auto leading-relaxed">
            Add a boost to your massage or facial for a deeper, more targeted
            experience. Choose from 10+ options designed to complement your
            treatment.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "LED Light Therapy",
              "Microcurrent",
              "Oxygen Infusion",
              "Chemical Peel",
              "Cupping",
              "Infrared PEMF Mat",
              "Scalp Massage",
              "Hydraderm",
              "Dermaflash",
              "Extended Time",
            ].map((boost) => (
              <div
                key={boost}
                className="rounded-xl border border-[#113D33]/10 bg-[#F7F4E9] px-4 py-3 text-sm font-medium text-[#113D33]"
              >
                {boost}
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm opacity-50">
            Members save 50% on all boosts and super boosts.
          </p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[#113D33] text-white px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Ready to Book Your Experience?
          </h2>
          <p className="mt-4 text-base opacity-80">
            Choose your treatment and schedule your visit at Denver&apos;s
            modern wellness club on Larimer Square.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-3.5 text-sm font-bold rounded-xl hover:bg-white/90 transition-all"
            >
              Book Now
            </Link>
            <Link
              href="/membership"
              className="inline-flex items-center text-sm text-white/70 hover:text-white transition underline underline-offset-4"
            >
              Explore Memberships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
