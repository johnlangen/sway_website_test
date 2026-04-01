"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown, Phone } from "lucide-react";
import GoogleReviews, {
  ReviewBadge,
  ClassPassBadge,
} from "../../../components/GoogleReviews";

/* ------------------------------------------------------------------
   TIER DATA — all treatments now have durations
------------------------------------------------------------------ */

type TreatmentItem = { name: string; duration: string };

type MembershipTier = {
  key: string;
  name: string;
  price: string;
  dropInPrice: string;
  tagline: string;
  description: string;
  mostPopular?: boolean;
  facials: TreatmentItem[];
  massages: TreatmentItem[];
};

const tiers: MembershipTier[] = [
  {
    key: "essential",
    name: "Essential",
    price: "$99",
    dropInPrice: "$139",
    tagline: "50-minute signature treatments",
    description:
      "Signature facials and massages — the perfect entry to Sway.",
    facials: [{ name: "Essential Signature Facial", duration: "50 min" }],
    massages: [
      { name: "Essential Signature Massage", duration: "50 min" },
      { name: "Essential Maternity Massage", duration: "50 min" },
    ],
  },
  {
    key: "premier",
    name: "Premier",
    price: "$129",
    dropInPrice: "$169",
    tagline: "Targeted treatments",
    description:
      "Targeted products, advanced techniques, and extended durations.",
    mostPopular: true,
    facials: [
      { name: "Forever Young Anti-Aging Facial", duration: "50 min" },
      { name: "Pore Perfection Acne Facial", duration: "50 min" },
      { name: "Sensitive Silk Facial", duration: "50 min" },
      { name: "Glow Getter Hydration Facial", duration: "50 min" },
      { name: "Dr. Dennis Gross Vitamin C Facial", duration: "50 min" },
      { name: "Basic Glow Peel", duration: "30 min" },
    ],
    massages: [
      { name: "Signature Massage", duration: "70 min" },
      { name: "Maternity Massage", duration: "70 min" },
      { name: "Deep Tissue", duration: "50 min" },
      { name: "Salt Stone Massage", duration: "50 min" },
      { name: "Sports Massage", duration: "50 min" },
      { name: "Lymphatic Drainage Massage", duration: "50 min" },
    ],
  },
  {
    key: "ultimate",
    name: "Ultimate",
    price: "$159",
    dropInPrice: "$199",
    tagline: "Tech-enhanced + longer treatments",
    description:
      "LED, microcurrent, oxygen infusion — maximum duration and results.",
    facials: [
      { name: "Illuminate LED Facial", duration: "60 min" },
      { name: "Oxygen Infusion Facial", duration: "60 min" },
      { name: "Sculpt & Lift Microcurrent Facial", duration: "60 min" },
      { name: "Hydraderm", duration: "50 min" },
      { name: "Dr. Dennis Gross Vitamin C with LED", duration: "60 min" },
      { name: "Advanced Glow Peel", duration: "40 min" },
    ],
    massages: [
      { name: "Signature Massage", duration: "90 min" },
      { name: "Deep Tissue", duration: "70 min" },
      { name: "Salt Stone Massage", duration: "70 min" },
      { name: "Sports Massage", duration: "70 min" },
      { name: "Lymphatic Drainage Massage", duration: "70 min" },
    ],
  },
];

/* ------------------------------------------------------------------
   RECOVERY MEMBERSHIPS
------------------------------------------------------------------ */

const recoveryMemberships = [
  {
    key: "aescape",
    name: "Aescape",
    price: "$99",
    description:
      "AI-powered robot massage with real-time muscle mapping and personalized pressure zones.",
    details: "4×30 min or 2×60 min sessions per month",
    highlights: [
      "Real-time muscle mapping",
      "Personalized pressure",
      "Zero-gravity positioning",
    ],
  },
  {
    key: "remedy",
    name: "Remedy Room",
    price: "$99",
    description:
      "Our full recovery circuit — everything you need to reset and recover.",
    details: "4 visits per month",
    highlights: [
      "Traditional sauna",
      "Cold plunge",
      "Lymphatic compression boots",
      "LED light therapy",
    ],
  },
];

/* ------------------------------------------------------------------
   BOOSTS DATA
------------------------------------------------------------------ */

const facialBoosts = [
  { name: "Dermaflash", price: "$10" },
  { name: "Dermaflash Plus", price: "$20", note: "+10 min" },
  { name: "LED", price: "$10" },
  { name: "LED Plus", price: "$20", note: "+10 min" },
  { name: "Oxygen", price: "$10" },
  { name: "Oxygen Plus", price: "$20", note: "+10 min" },
  { name: "Sculpt & Lift Microcurrent Pro", price: "$25", note: "+20 min" },
];

const massageBoosts = [
  { name: "CauseMedic CBD", price: "$10" },
  { name: "CauseMedic CBD Plus", price: "$20", note: "+10 min" },
  { name: "Cupping", price: "$10" },
  { name: "Cupping Plus", price: "$20", note: "+10 min" },
  { name: "PEMF Recovery", price: "$10" },
];

/* ------------------------------------------------------------------
   MEMBER PERKS
------------------------------------------------------------------ */

const memberPerks = [
  "50% off all boosts",
  "50% off Remedy Room",
  "Private member lounge",
  "Bring a friend at member pricing",
  "10% off retail",
  "Rollover credits",
];

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------ */

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState("premier");
  const [boostsOpen, setBoostsOpen] = useState(false);
  const treatmentRef = useRef<HTMLDivElement>(null);

  const activeTier = tiers.find((t) => t.key === selectedTier)!;

  const handleTierSelect = (key: string) => {
    setSelectedTier(key);
    // On mobile, scroll to treatment details after selecting a card
    if (window.innerWidth < 768 && treatmentRef.current) {
      setTimeout(() => {
        treatmentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* HERO + LOCK-IN CTA */}
      <section className="px-6 pt-28 md:pt-36 pb-6 text-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4"
        >
          Sway Larimer — Denver, CO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
        >
          The Sway Membership
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-6"
        >
          Three tiers of wellness — from signature treatments to tech-enhanced
          experiences. Find the membership that fits your lifestyle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <a
            href="tel:+13034766150"
            className="inline-flex items-center gap-2 text-[#9ABFB3] hover:text-white transition text-sm"
          >
            <Phone className="w-4 h-4" />
            (303) 476-6150
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <ReviewBadge />
          <span className="hidden sm:block opacity-30">|</span>
          <ClassPassBadge />
        </motion.div>

        <p className="sr-only">
          Sway Wellness Spa Larimer memberships: three tiers — Essential
          ($99/month), Premier ($129/month), Ultimate ($159/month) — plus
          Aescape robot massage ($99/month), Remedy Room recovery circuit
          ($99/month), and Ultimate Tech Recovery package ($99/month). All
          members get 50% off boosts, private lounge access, bring a friend at
          member pricing, 10% off retail, and rollover credits. Located at 1428
          Larimer St. on Larimer Square in Denver, CO 80202. Voted #4 Best Day
          Spa in America by USA Today 10Best. Call (303) 476-6150 or visit
          swaywellnessspa.com.
        </p>
      </section>

      {/* ============================================================
          SPA MEMBERSHIPS — 3 COMPACT CARDS + TREATMENT DETAIL PANEL
      ============================================================ */}
      <section className="px-4 sm:px-6 pt-10 pb-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Spa Memberships
          </h2>
        </div>

        {/* Tier cards — compact, equal height, clickable */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => {
            const isSelected = selectedTier === tier.key;
            return (
              <motion.button
                key={tier.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => handleTierSelect(tier.key)}
                className={`relative bg-white text-[#113D33] rounded-2xl p-5 md:p-6 text-center text-left transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-[#9ABFB3] shadow-2xl scale-[1.02]"
                    : "shadow-lg hover:shadow-xl"
                }`}
              >
                {tier.mostPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap uppercase">
                    Most Popular
                  </span>
                )}

                <p className="text-[10px] uppercase tracking-[0.15em] text-[#4A776D] mb-1 text-center">
                  {tier.tagline}
                </p>
                <h3 className="text-xl font-bold uppercase tracking-wide text-center">
                  {tier.name}
                </h3>

                <div className="mt-3 mb-2 text-center">
                  <span className="text-3xl md:text-4xl font-bold">
                    {tier.price}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">/ month</span>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  <span className="line-through">{tier.dropInPrice}</span>{" "}
                  drop-in
                </p>

                <p className="text-xs text-gray-500 mt-3 leading-relaxed text-center">
                  1 facial or massage/month
                </p>

                <div className="mt-4 pt-3 border-t border-[#113D33]/10">
                  <a
                    href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block w-full py-2.5 rounded-full bg-[#113D33] text-white text-sm font-semibold hover:bg-[#0e3029] transition text-center"
                  >
                    Join — {tier.price}/mo
                  </a>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Treatment detail panel — shows selected tier's treatments */}
      <section ref={treatmentRef} className="px-4 sm:px-6 pb-6 scroll-mt-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 p-5 md:p-8">
            {/* Tier switcher pills */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white/10 rounded-full p-1 gap-0.5">
                {tiers.map((tier) => (
                  <button
                    key={tier.key}
                    onClick={() => setSelectedTier(tier.key)}
                    className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                      selectedTier === tier.key
                        ? "bg-white text-[#113D33] shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Treatment lists */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTier}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {/* Facials */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#9ABFB3] uppercase tracking-wider mb-3">
                      Facials ({activeTier.facials.length})
                    </h4>
                    <ul className="space-y-2.5">
                      {activeTier.facials.map((t, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="flex items-center gap-2 text-gray-200">
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0" />
                            {t.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2 shrink-0">
                            {t.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Massages */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#9ABFB3] uppercase tracking-wider mb-3">
                      Massages ({activeTier.massages.length})
                    </h4>
                    <ul className="space-y-2.5">
                      {activeTier.massages.map((t, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="flex items-center gap-2 text-gray-200">
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0" />
                            {t.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2 shrink-0">
                            {t.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ALL-MEMBER PERKS — always visible */}
      <section className="px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-wider text-gray-500 mb-3">
            Every member gets
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {memberPerks.map((perk, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 rounded-full px-3 py-1.5"
              >
                <Check className="w-3 h-3 text-[#4A776D]" />
                {perk}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          RECOVERY & TECH MEMBERSHIPS
      ============================================================ */}
      <section className="px-4 sm:px-6 pt-10 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Recovery & Tech
          </h2>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {recoveryMemberships.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">{m.price}</span>
                <span className="text-sm text-gray-400 ml-1">/ month</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                {m.description}
              </p>
              <ul className="space-y-1.5 mb-3">
                {m.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <Check className="w-3 h-3 text-[#4A776D] shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-[#9ABFB3] uppercase tracking-wider">
                {m.details}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================
          BOOSTS — COLLAPSED
      ============================================================ */}
      <section className="px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setBoostsOpen(!boostsOpen)}
            className="w-full flex items-center justify-center gap-2 text-sm md:text-base text-[#9ABFB3] hover:text-white transition py-3"
          >
            <span className="font-semibold">
              Boosts — Members Save 50%
            </span>
            <motion.span
              animate={{ rotate: boostsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
          <AnimatePresence>
            {boostsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-4 pt-4 pb-2">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-[#9ABFB3] uppercase tracking-wider mb-3">
                      Facial Boosts
                    </h4>
                    <ul className="space-y-2">
                      {facialBoosts.map((b, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-300">
                            {b.name}
                            {b.note && (
                              <span className="text-gray-500 ml-1 text-xs">
                                {b.note}
                              </span>
                            )}
                          </span>
                          <span className="font-semibold text-white">
                            {b.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-[#9ABFB3] uppercase tracking-wider mb-3">
                      Massage Boosts
                    </h4>
                    <ul className="space-y-2">
                      {massageBoosts.map((b, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-300">
                            {b.name}
                            {b.note && (
                              <span className="text-gray-500 ml-1 text-xs">
                                {b.note}
                              </span>
                            )}
                          </span>
                          <span className="font-semibold text-white">
                            {b.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center pb-2">
                  Member prices shown. Drop-in rates are 2× listed price.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PHONE CTA BAR */}
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10">
          <p className="text-sm text-[#9ABFB3] uppercase tracking-widest mb-2">
            Have questions?
          </p>
          <a
            href="tel:+13034766150"
            className="text-2xl md:text-3xl font-bold text-white hover:text-[#9ABFB3] transition inline-flex items-center gap-3"
          >
            <Phone className="w-6 h-6" />
            (303) 476-6150
          </a>
          <p className="text-sm text-gray-400 mt-2">
            Call to learn more or sign up over the phone
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20 text-[#113D33]">
        <GoogleReviews />
      </section>

      {/* BRAND SECTION */}
      <section className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/assets/membership_background_logo.jpg"
          alt="The Sway Way"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Sway Way
          </h2>
          <p className="max-w-2xl text-base md:text-lg mb-6 text-gray-200">
            An inclusive club built around recovery, longevity, and feeling
            good in your body.
          </p>
          <a
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#D7E5DD] text-[#113D33] font-bold rounded-full uppercase hover:bg-white transition"
          >
            Join the Club
          </a>
        </div>
      </section>
    </div>
  );
}
