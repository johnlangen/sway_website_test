"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown, Phone } from "lucide-react";
import GoogleReviews, {
  ReviewBadge,
  ClassPassBadge,
} from "../../../components/GoogleReviews";
import { SwayCurve } from "../../../components/SwayCurve";
import MembershipJoinFlow, {
  type MembershipPlan,
} from "../../../components/MembershipJoinFlow";

/* ------------------------------------------------------------------
   NATIVE JOIN FLOW: Mindbody contract IDs (verified live 2026-06-10,
   scripts/list-contracts.mjs). Purchase happens on-site via
   /api/membership/purchase — no Mindbody-hosted page.
------------------------------------------------------------------ */

const joinPlans: Record<string, MembershipPlan> = {
  essential: {
    key: "essential",
    contractId: 122,
    name: "Essential",
    price: 99,
    blurb: "1 signature facial or massage per month, plus all member perks.",
  },
  premier: {
    key: "premier",
    contractId: 123,
    name: "Premier",
    price: 129,
    blurb: "1 targeted facial or massage per month, plus all member perks.",
  },
  ultimate: {
    key: "ultimate",
    contractId: 124,
    name: "Ultimate",
    price: 159,
    blurb: "1 tech-enhanced facial or massage per month, plus all member perks.",
  },
  aescape: {
    key: "aescape",
    contractId: 111,
    name: "Aescape",
    price: 99,
    blurb: "4x30 min or 2x60 min Aescape sessions per month.",
  },
  remedy: {
    key: "remedy",
    contractId: 102,
    name: "Remedy Room",
    price: 99,
    blurb: "4 Remedy Room recovery circuit visits per month.",
  },
};

/* ------------------------------------------------------------------
   TIER DATA: all treatments now have durations
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
      "Signature facials and massages, the perfect entry to Sway.",
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
      "LED, microcurrent, oxygen infusion. Maximum duration and results.",
    facials: [
      { name: "Illuminate LED Facial", duration: "60 min" },
      { name: "Oxygen Infusion Facial", duration: "60 min" },
      { name: "Sculpt & Lift Microcurrent Facial", duration: "60 min" },
      { name: "Hydraderm", duration: "50 min" },
      { name: "Dr. Dennis Gross Vitamin C with LED", duration: "60 min" },
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
    image: "/assets/aescapeMobile.jpg",
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
    image: "/assets/remedyRoomMobile.jpg",
    price: "$99",
    description:
      "Our full recovery circuit. Everything you need to reset and recover.",
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
  { name: "CBD", price: "$10" },
  { name: "CBD Plus", price: "$20", note: "+10 min" },
  { name: "Cupping", price: "$10" },
  { name: "Cupping Plus", price: "$20", note: "+10 min" },
  { name: "PEMF", price: "$10" },
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
   DURATION PILL COLOR — graduates by length so longer = more premium
------------------------------------------------------------------ */

function durationClass(duration: string) {
  const mins = parseInt(duration, 10);
  if (mins >= 90) return "bg-[#113D33] text-white";
  if (mins >= 70) return "bg-[#4A776D] text-white";
  if (mins >= 60) return "bg-[#9ABFB3]/40 text-[#113D33]";
  return "bg-[#4A776D]/10 text-[#4A776D]";
}

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------ */

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState("premier");
  const [boostsOpen, setBoostsOpen] = useState(false);
  // Which membership the join modal is open for (null = closed).
  const [joinKey, setJoinKey] = useState<string | null>(null);

  const activeTier = tiers.find((t) => t.key === selectedTier)!;
  const joinPlan = joinKey ? joinPlans[joinKey] : null;

  return (
    <div className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* HERO + LOCK-IN CTA */}
      <section className="relative overflow-hidden">
        {/* Background image under a dark-green overlay, matching the other page
            heroes. Overlay fades to the page's base green so it blends into the
            Spa Memberships section below. */}
        <Image
          src="/assets/OG/og-home.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f1a]/75 via-[#113D33]/55 to-[#0b1f1a]" />

        <div className="relative px-6 pt-28 md:pt-36 pb-8 text-center max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4"
        >
          Sway Larimer &middot; Denver, CO
        </motion.p>

        <SwayCurve
          width={150}
          strokeWidth={2.2}
          animate
          className="text-[#A9D2C5] mx-auto block mb-6"
        />

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
          Three tiers of wellness, from signature treatments to tech-enhanced
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

        {/* Jump chips: surface all three membership families up top */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
        >
          <a href="#spa-memberships" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/90 hover:bg-white/10 transition">
            Massage &amp; Facial
          </a>
          <a href="#aescape" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/90 hover:bg-white/10 transition">
            Aescape
          </a>
          <a href="#remedy" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/90 hover:bg-white/10 transition">
            Remedy Room
          </a>
        </motion.div>

        <p className="sr-only">
          Sway Wellness Spa Larimer memberships: three tiers. Essential
          ($99/month), Premier ($129/month), Ultimate ($159/month), plus
          Aescape robot massage ($99/month), Remedy Room recovery circuit
          ($99/month), and Ultimate Tech Recovery package ($99/month). All
          members get 50% off boosts, private lounge access, bring a friend at
          member pricing, 10% off retail, and rollover credits. Located at 1428
          Larimer St. on Larimer Square in Denver, CO 80202. Voted #4 Best Day
          Spa in America by USA Today 10Best. Call (303) 476-6150 or visit
          swaywellnessspa.com.
        </p>
        </div>
      </section>

      {/* ============================================================
          SPA MEMBERSHIPS: 3 COMPACT CARDS + TREATMENT DETAIL PANEL
      ============================================================ */}
      <section id="spa-memberships" className="scroll-mt-28 px-4 sm:px-6 pt-10 pb-4">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9ABFB3] mb-3">
            Choose Your Tier
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Spa Memberships
          </h2>
          <SwayCurve
            width={140}
            strokeWidth={2.4}
            animate
            className="text-[#A9D2C5] mx-auto block mt-4"
          />
        </div>

        {/* One combined tabbed card: switch tier -> see price, treatments, CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="bg-white text-[#113D33] rounded-2xl shadow-2xl p-5 md:p-7">
            {/* Tier switcher with prices (comparison) */}
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#113D33]/8 p-1.5">
              {tiers.map((tier) => {
                const isSel = selectedTier === tier.key;
                return (
                  <button
                    key={tier.key}
                    onClick={() => setSelectedTier(tier.key)}
                    className={`relative rounded-xl py-2.5 px-1 text-center transition-colors duration-200 ${
                      isSel
                        ? "bg-[#113D33] text-white shadow-sm"
                        : "text-[#113D33]/60 hover:text-[#113D33]"
                    }`}
                  >
                    {tier.mostPopular && (
                      <span
                        className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide whitespace-nowrap ${
                          isSel ? "bg-[#9ABFB3] text-[#113D33]" : "bg-[#113D33] text-white"
                        }`}
                      >
                        Popular
                      </span>
                    )}
                    <span className="block text-sm font-bold">{tier.name}</span>
                    <span
                      className={`block text-[11px] ${
                        isSel ? "text-white/70" : "text-[#113D33]/45"
                      }`}
                    >
                      {tier.price}/mo
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTier}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {/* Price + what you get */}
                <div className="mt-6 text-center">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#4A776D]">
                    {activeTier.tagline}
                  </p>
                  <div className="mt-1">
                    <span className="text-4xl font-bold">{activeTier.price}</span>
                    <span className="text-sm text-gray-500 ml-1">/ month</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    <span className="line-through">{activeTier.dropInPrice}</span> drop-in
                    <span className="mx-1.5">·</span>1 facial or massage per month
                  </p>
                </div>

                {/* Treatments */}
                <div className="mt-6 grid gap-6 border-t border-[#113D33]/10 pt-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#4A776D]">
                      Facials ({activeTier.facials.length})
                    </h4>
                    <ul className="space-y-2.5">
                      {activeTier.facials.map((t, idx) => (
                        <li key={idx} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-[#113D33]/80">
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0" />
                            {t.name}
                          </span>
                          <span className={`ml-2 shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${durationClass(t.duration)}`}>
                            {t.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#4A776D]">
                      Massages ({activeTier.massages.length})
                    </h4>
                    <ul className="space-y-2.5">
                      {activeTier.massages.map((t, idx) => (
                        <li key={idx} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-[#113D33]/80">
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0" />
                            {t.name}
                          </span>
                          <span className={`ml-2 shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${durationClass(t.duration)}`}>
                            {t.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setJoinKey(activeTier.key)}
                  className="mt-6 block w-full rounded-full bg-[#113D33] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0e3029]"
                >
                  Join {activeTier.name} &middot; {activeTier.price}/mo
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ALL-MEMBER PERKS: always visible */}
      <section className="px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-wider text-gray-500 mb-3">
            Every member gets
          </p>
          <p className="text-center text-xs text-gray-400 mb-4">
            Your membership works at all Sway and Spavia locations nationwide.
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
          <p className="text-xs uppercase tracking-[0.3em] text-[#9ABFB3] mb-3">
            Beyond the Basics
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Recovery &amp; Tech
          </h2>
          <SwayCurve
            width={140}
            strokeWidth={2.4}
            animate
            className="text-[#A9D2C5] mx-auto block mt-4"
          />
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {recoveryMemberships.map((m, i) => (
            <motion.div
              key={m.key}
              id={m.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="scroll-mt-28 bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2b24]/70 to-transparent" />
              </div>
              <div className="p-5 md:p-6">
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
                <button
                  onClick={() => setJoinKey(m.key)}
                  className="mt-4 block w-full rounded-full bg-white py-2.5 text-center text-sm font-semibold text-[#113D33] transition hover:bg-gray-100"
                >
                  Become a Member &middot; {m.price}/mo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================
          BOOSTS: COLLAPSED
      ============================================================ */}
      <section className="px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setBoostsOpen(!boostsOpen)}
            className="w-full flex items-center justify-center gap-2 text-sm md:text-base text-[#9ABFB3] hover:text-white transition py-3"
          >
            <span className="font-semibold">
              Boosts &middot; Members Save 50%
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
          <SwayCurve
            width={160}
            strokeWidth={2.2}
            animate
            className="text-white/85 mb-6"
          />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Sway Way
          </h2>
          <p className="max-w-2xl text-base md:text-lg mb-7 text-gray-200">
            An inclusive club built around recovery, longevity, and feeling
            good in your body.
          </p>
          <button
            onClick={() => setJoinKey(selectedTier)}
            className="group relative px-8 py-4 bg-[#D7E5DD] text-[#113D33] font-bold rounded-full uppercase hover:bg-white transition"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
              <SwayCurve width={40} strokeWidth={1.4} className="text-[#113D33]" />
            </span>
            Join the Club
          </button>
        </div>
      </section>

      {/* Sticky mobile Join bar — keeps the join action reachable through the
          long scroll. Hidden on desktop. Right padding clears the chat widget. */}
      <div className="h-24 md:hidden" aria-hidden="true" />
      <button
        onClick={() => setJoinKey(selectedTier)}
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-3 border-t border-white/10 bg-[#0b1f1a]/95 backdrop-blur pl-4 pr-20 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-left"
      >
        <span className="leading-tight min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.15em] text-[#9ABFB3]">
            {activeTier.name} Membership
          </span>
          <span className="block text-white font-semibold text-sm">
            {activeTier.price}
            <span className="text-gray-400 font-normal"> / month</span>
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-white text-[#113D33] px-7 py-2.5 text-sm font-semibold">
          Join
        </span>
      </button>

      {/* NATIVE JOIN FLOW MODAL */}
      <AnimatePresence>
        {joinPlan && (
          <MembershipJoinFlow
            plan={joinPlan}
            onClose={() => setJoinKey(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
