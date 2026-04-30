"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { resolveLocationHref } from "../components/LocationAwareHref";

/* ---------------- TIER DATA ---------------- */

type Treatment = { name: string; duration: string; description: string };

type FacialTier = {
  key: string;
  name: string;
  treatments: Treatment[];
};

const TIER_PRICING: Record<string, { member: number; dropIn: number }> = {
  essential: { member: 99, dropIn: 139 },
  premier: { member: 129, dropIn: 169 },
  ultimate: { member: 159, dropIn: 199 },
};

const facialTiers: FacialTier[] = [
  {
    key: "essential",
    name: "Essential",
    treatments: [
      {
        name: "Signature Facial",
        duration: "50 min",
        description:
          "A classic facial customized to your skin type: cleanse, exfoliate, extract, and hydrate.",
      },
    ],
  },
  {
    key: "premier",
    name: "Premier",
    treatments: [
      {
        name: "Forever Young Anti-Aging Facial",
        duration: "50 min",
        description:
          "Hydrates, brightens, and tightens the skin while supporting collagen production and circulation.",
      },
      {
        name: "Pore Perfection Acne Facial",
        duration: "50 min",
        description:
          "Targets congestion, bacteria, and inflammation for clearer, healthier skin.",
      },
      {
        name: "Sensitive Silk Facial",
        duration: "50 min",
        description:
          "Calms redness, strengthens the skin barrier, and supports sensitive skin types.",
      },
      {
        name: "Glow Getter Hydration Facial",
        duration: "50 min",
        description:
          "Correcting peptides and antioxidants instantly smooth and firm for radiant, hydrated skin.",
      },
      {
        name: "Dr. Dennis Gross Vitamin C Facial",
        duration: "50 min",
        description:
          "A brightening facial powered by Vitamin C to improve tone, clarity, and radiance.",
      },
    ],
  },
  {
    key: "ultimate",
    name: "Ultimate",
    treatments: [
      {
        name: "Illuminate LED Facial",
        duration: "60 min",
        description:
          "An advanced, glow-focused facial infused with LED light therapy to brighten, even skin tone, and support collagen production.",
      },
      {
        name: "Oxygen Infusion Facial",
        duration: "60 min",
        description:
          "A high-performance oxygenating facial designed to deeply hydrate, plump, and revitalize the skin.",
      },
      {
        name: "Sculpt & Lift Microcurrent Facial",
        duration: "60 min",
        description:
          "Microcurrent technology works at the cellular level to re-educate muscles, smooth fine lines, and restore your skin\u2019s natural energy.",
      },
      {
        name: "Hydraderm",
        duration: "50 min",
        description:
          "Advanced technology resurfaces your skin while delivering intensive hydration using result-driven serums.",
      },
      {
        name: "Dr. Dennis Gross Vitamin C Facial w/ LED",
        duration: "60 min",
        description:
          "A result-driven Vitamin C facial enhanced with LED light therapy to brighten, even tone, and support collagen production.",
      },
    ],
  },
];

/* ---------------- BOOSTS DATA ---------------- */

type BoostColumn = {
  tier: string;
  memberPrice: string;
  dropInPrice: string;
  timeNote: string;
  items: string[];
};

const facialBoostColumns: BoostColumn[] = [
  {
    tier: "Boost",
    memberPrice: "$10",
    dropInPrice: "$20 Drop-In",
    timeNote: "No Time Added",
    items: ["Dermaflash Boost", "LED Boost", "Oxygen Boost"],
  },
  {
    tier: "Boost Plus",
    memberPrice: "$20",
    dropInPrice: "$40 Drop-In",
    timeNote: "Adds 10 Min",
    items: ["Dermaflash Boost Plus", "LED Boost Plus", "Oxygen Boost Plus"],
  },
  {
    tier: "Boost Pro",
    memberPrice: "$25",
    dropInPrice: "$50 Drop-In",
    timeNote: "Adds 20 Min",
    items: ["Sculpt & Lift Microcurrent Boost Pro"],
  },
];

/* ---------------- PAGE ---------------- */

const FacialsPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const [bookHref, setBookHref] = useState("/book");
  const [selectedTier, setSelectedTier] = useState("premier");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeTier = facialTiers.find((t) => t.key === selectedTier)!;

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";

    const resolved = resolveLocationHref({
      localPath: "/facials",
      fallbackHref: "/book",
    });

    setBookHref(resolved);
  }, []);

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO — background image */}
      <section className="relative h-[45vh] min-h-[280px] md:h-[60vh] md:min-h-[400px] max-h-[600px]">
        <Image
          src="/assets/facialExperiences.png"
          alt="Facial Experiences at Sway Wellness Spa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative h-full flex items-center justify-center px-6 text-center">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white text-5xl md:text-7xl font-light tracking-tight"
          >
            Facial Experiences
          </motion.h1>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-[#F7F4E9] px-6 py-10 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-[#113D33]/80"
          >
            Personalized, result-driven facials designed to support healthy,
            radiant skin — customized by your esthetician.
          </motion.p>

          <motion.a
            href="https://10best.usatoday.com/awards/sway-denver-colorado/"
            target="_blank"
            rel="noopener noreferrer"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-block mt-5 text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#113D33]/40 border border-[#113D33]/15 rounded-full px-4 py-1.5 hover:border-[#113D33]/30 transition"
          >
            Voted #4 Best Day Spa in America — USA Today 10Best
          </motion.a>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-9"
          >
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-[#113D33] text-white px-8 py-4 text-[15px] font-bold rounded-xl hover:bg-[#0a2b23] transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </motion.div>
        </div>

        <p className="sr-only">
          Sway Wellness Spa offers facial treatments at 1428 Larimer St. in
          Denver across three tiers: Essential (Signature Facial), Premier
          (Forever Young, Pore Perfection, Sensitive Silk, Glow Getter, Dr.
          Dennis Gross Vitamin C), and Ultimate (Illuminate LED, Oxygen
          Infusion, Sculpt &amp; Lift Microcurrent, Hydraderm, Dr. Dennis Gross
          Vitamin C with LED). All facials use Eminence Organics and Dr. Dennis
          Gross skincare. Enhance any facial with boosts: Dermaflash, LED, Oxygen,
          and Sculpt &amp; Lift Microcurrent — members save 50%. Open Mon–Fri
          10 AM–8 PM, Sat 9 AM–6 PM, Sun 11 AM–6 PM. Book online at
          swaywellnessspa.com or call (303) 476-6150.
        </p>
      </section>

      {/* ============================================================
          FACIAL MENU — Tier toggle + treatment list
      ============================================================ */}
      <section className="bg-[#F7F4E9] px-4 sm:px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl border border-[#113D33]/10 shadow-sm overflow-hidden">
              {/* Header bar */}
              <div className="bg-[#F7F4E9] px-6 py-5 border-b border-[#113D33]/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-[#113D33] text-2xl font-semibold">
                      Facial menu
                    </h2>
                    <p className="mt-1 text-sm text-[#113D33]/60">
                      Targeted, skin-supportive treatments tailored to your
                      goals and skin type.
                    </p>
                  </div>
                  <Link
                    href={bookHref}
                    className="inline-flex items-center justify-center bg-[#113D33] text-white px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition-all shrink-0"
                  >
                    Continue to Booking
                  </Link>
                </div>
              </div>

              {/* Tier toggle */}
              <div className="px-6 pt-5">
                <div className="flex bg-[#113D33]/10 rounded-full p-1 gap-0.5 w-full sm:w-auto sm:inline-flex">
                  {facialTiers.map((tier) => (
                    <button
                      key={tier.key}
                      onClick={() => setSelectedTier(tier.key)}
                      className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        selectedTier === tier.key
                          ? "bg-[#113D33] text-white shadow-sm"
                          : "text-[#113D33]/60 hover:text-[#113D33]"
                      }`}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier pricing */}
              <div className="px-6 pt-4 text-center">
                <p className="text-sm text-[#113D33]/60">
                  <span className="font-semibold text-[#4A776D]">${TIER_PRICING[selectedTier].member}/mo</span>
                  <span className="mx-1.5">·</span>
                  <span>${TIER_PRICING[selectedTier].dropIn} drop-in</span>
                </p>
              </div>

              {/* Treatment list */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTier}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {activeTier.treatments.map((t, idx) => (
                      <div
                        key={idx}
                        className="border border-[#113D33]/8 rounded-xl p-4 hover:border-[#113D33]/15 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[#113D33] font-bold text-base">
                            {t.name}
                          </h3>
                          <span className="text-xs text-[#113D33]/50 shrink-0 mt-0.5">
                            {t.duration}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-[#113D33]/65 leading-relaxed">
                          {t.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          BOOSTS — 3 columns (Boost / Boost Plus / Boost Pro)
      ============================================================ */}
      <section className="bg-[#113D33] overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#9ABFB3] mb-3">
              Wellness Boosts : Save 50% on Any Boost
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight">
              High-Tech Boosts
            </h2>
            <p className="mt-3 text-white/55 max-w-2xl mx-auto">
              Enhance any facial with targeted technology. Add during checkout —
              members save 50% on every boost.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facialBoostColumns.map((col, i) => (
              <motion.div
                key={col.tier}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/[0.07] border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-white text-xl font-bold uppercase tracking-wide">
                  {col.memberPrice} {col.tier}
                </h3>
                <p className="text-sm text-white/40 mt-1">{col.dropInPrice}</p>
                <p className="text-sm text-[#9ABFB3] mt-3 font-semibold">
                  {col.timeNote}
                </p>
                <ul className="mt-4 space-y-2">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-white/70 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-white text-[#113D33] px-10 py-4 text-[15px] font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </div>
        </div>
      </section>

      {/* SKINCARE BRANDS */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33]">
              Powered by Two Leading Skincare Brands
            </h2>
            <p className="mt-3 text-[#113D33]/60 max-w-2xl mx-auto">
              Every facial at Sway uses products and protocols from these
              industry-leading skincare lines.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-8"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] font-semibold">
                Organic &middot; Farm-Fresh
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#113D33]">
                Eminence Organics
              </h3>
              <p className="mt-3 text-sm text-[#113D33]/70 leading-relaxed">
                Award-winning organic skincare from Hungary, crafted with
                farm-fresh ingredients. Known for result-driven formulas that
                nourish, protect, and transform the skin naturally.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-8"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] font-semibold">
                Clinical-Grade &middot; Dermatologist-Developed
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#113D33]">
                Dr. Dennis Gross
              </h3>
              <p className="mt-3 text-sm text-[#113D33]/70 leading-relaxed">
                Clinical-grade skincare developed by a board-certified
                dermatologist. Famous for Alpha Beta&reg; and Vitamin C
                formulas that deliver visible, science-backed results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "What makes Sway\u2019s facials different?",
              a: "Sway pairs clean, organic Eminence Organics skincare with clinical-grade Dr. Dennis Gross protocols, then layers on science-backed boosts like LED light therapy, microcurrent for lifting and toning, and oxygen infusion for deep hydration. Every session is customized by your esthetician.",
            },
            {
              q: "What are the facial membership tiers?",
              a: "Essential ($99/mo) includes our Signature Facial. Premier ($129/mo) includes targeted treatments like Forever Young, Pore Perfection, Glow Getter, Sensitive Silk, and Dr. Dennis Gross Vitamin C. Ultimate ($159/mo) includes tech-enhanced facials like Illuminate LED, Oxygen Infusion, Sculpt & Lift Microcurrent, Hydraderm, and Dr. Dennis Gross Vitamin C with LED.",
            },
            {
              q: "What boosts can I add to my facial?",
              a: "Choose from Dermaflash, LED, and Oxygen boosts (no extra time), Plus versions that add 10 minutes, or the Sculpt & Lift Microcurrent Boost Pro that adds 20 minutes. Members save 50% on all boosts.",
            },
            {
              q: "How long is a facial session?",
              a: "Essential and Premier facials are 50 minutes. Ultimate facials are 50\u201360 minutes depending on the treatment. Boosts can add additional time.",
            },
            {
              q: "What skincare brands does Sway use?",
              a: "Sway uses Eminence Organics, a leader in organic, result-driven skincare, and Dr. Dennis Gross, known for clinical-grade formulas. Both brands are selected for their efficacy and clean ingredients.",
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-black/10">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-[#113D33]">{item.q}</span>
                <svg
                  className={`w-4 h-4 shrink-0 text-[#113D33] opacity-40 transition-transform duration-200 ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-[#113D33]/80 leading-relaxed pr-8">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-10 text-center">
            Explore More at Sway
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Massages",
                desc: "Deep Tissue, Sports, Salt Stone, and more. Customized by expert therapists with high-tech boosts.",
                href: "/massages",
              },
              {
                name: "Remedy Room",
                desc: "Sauna, cold plunge, compression, and LED light therapy in a 40-minute recovery circuit.",
                href: "/remedy-tech",
              },
              {
                name: "Aescape Robot Massage",
                desc: "AI-powered precision massage with personalized pressure mapping.",
                href: "/aescape",
              },
            ].map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="block rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-6 hover:shadow-md hover:border-[#113D33]/25 transition-all group"
              >
                <h3 className="text-lg font-semibold text-[#113D33]">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-[#113D33]/70 leading-relaxed">
                  {s.desc}
                </p>
                <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            Book a Facial at a Location
          </h2>
          <Link
            href="/locations/denver-larimer/facials/"
            className="block rounded-2xl border border-[#113D33]/15 bg-white p-6 hover:shadow-lg hover:border-[#113D33]/30 transition-all group"
          >
            <p className="text-lg font-vance-bold text-[#113D33]">
              Sway Larimer
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Denver, CO — Larimer Square
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
              Book Now &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FacialsPage;
