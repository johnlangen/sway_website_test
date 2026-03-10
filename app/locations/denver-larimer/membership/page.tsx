"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown, Phone, Clock } from "lucide-react";
import GoogleReviews, {
  ReviewBadge,
  ClassPassBadge,
} from "../../../components/GoogleReviews";

/* ------------------------------------------------------------------
   COUNTDOWN HELPER
------------------------------------------------------------------ */

function getDaysUntilApril1(): number {
  const target = new Date("2026-04-01T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/* ------------------------------------------------------------------
   TIER DATA
------------------------------------------------------------------ */

type TreatmentItem = { name: string; duration?: string };

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
    tagline: "50-minute treatments",
    description:
      "Signature facials and massages — the perfect entry to Sway.",
    facials: [{ name: "Essential Signature Facial" }],
    massages: [
      { name: "Essential Signature Massage" },
      { name: "Essential Maternity Massage" },
    ],
  },
  {
    key: "premier",
    name: "Premier",
    price: "$129",
    dropInPrice: "$169",
    tagline: "Enhanced treatments",
    description:
      "Targeted products, advanced techniques, and extended durations.",
    mostPopular: true,
    facials: [
      { name: "Forever Young Anti-Aging Facial" },
      { name: "Pore Perfection Acne Facial" },
      { name: "Sensitive Silk Facial" },
      { name: "Glow Getter Hydration Facial" },
      { name: "Dr. Dennis Gross Vitamin C Facial" },
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
    tagline: "Tech-enhanced premium",
    description:
      "LED, microcurrent, oxygen infusion — maximum duration and results.",
    facials: [
      { name: "Illuminate LED Facial" },
      { name: "Oxygen Infusion Facial" },
      { name: "Sculpt & Lift Microcurrent Facial" },
      { name: "Hydraderm", duration: "50 min" },
      { name: "Dr. Dennis Gross Vitamin C with LED" },
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

const additionalMemberships = [
  {
    key: "aescape",
    name: "Aescape Premier",
    price: "$99",
    period: "/ month",
    description: "AI-powered robot massage — choose 4×30 min or 2×60 min sessions per month.",
  },
  {
    key: "remedy",
    name: "Remedy Room",
    price: "$99",
    period: "/ month",
    description: "4 monthly recovery circuit visits — sauna, cold plunge, compression, LED light therapy.",
  },
  {
    key: "recovery",
    name: "Ultimate Tech Recovery",
    price: "$99",
    period: "/ month",
    description: "1×30 min robot massage + 1×40 min Remedy Room experience per month.",
  },
];

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
   ALL-MEMBER PERKS
------------------------------------------------------------------ */

const memberPerks = [
  "50% off all boosts",
  "Private member lounge",
  "Bring a friend at member pricing (once/month)",
  "10% off retail products",
  "Unused credits roll over",
];

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------ */

export default function MembershipPage() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [boostsOpen, setBoostsOpen] = useState(false);
  const [perksOpen, setPerksOpen] = useState(false);

  useEffect(() => {
    setDaysLeft(getDaysUntilApril1());
  }, []);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const showCountdown = daysLeft !== null && daysLeft > 0;

  return (
    <div className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* COUNTDOWN BANNER */}
      {showCountdown && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-[#B8860B]/20 to-[#DAA520]/15 border-b border-[#DAA520]/30 px-4 py-3 text-center mt-[72px] md:mt-[80px]"
        >
          <p className="text-sm md:text-base font-semibold flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#DAA520]" />
            <span>
              New memberships launching April 1 —{" "}
              <span className="text-[#DAA520]">
                {daysLeft} {daysLeft === 1 ? "day" : "days"} left
              </span>{" "}
              to lock in $99/month
            </span>
          </p>
        </motion.div>
      )}

      {/* HERO + LOCK-IN CTA */}
      <section
        className={`px-6 ${showCountdown ? "pt-10 md:pt-14" : "pt-28 md:pt-36"} pb-6 text-center max-w-5xl mx-auto`}
      >
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
          Lock In $99/Month
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-6"
        >
          Join now at $99/month and keep Premier-level access for a full year
          after our new membership tiers launch April 1.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <a
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full font-semibold py-3 px-8 bg-white text-[#113D33] hover:bg-gray-100 transition text-base"
          >
            Join the Club — $99/month
          </a>
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
          Sway Wellness Spa Larimer memberships launching April 1, 2026: three
          tiers — Essential ($99/month), Premier ($129/month), Ultimate
          ($159/month) — plus Aescape robot massage ($99/month), Remedy Room
          recovery circuit ($99/month), and Ultimate Tech Recovery package
          ($99/month). All members get 50% off boosts, private lounge access,
          bring a friend at member pricing, 10% off retail, and rollover
          credits. Lock in $99/month now and keep Premier access for a year.
          Located at 1428 Larimer St. on Larimer Square in Denver, CO 80202.
          Voted #4 Best Day Spa in America by USA Today 10Best. Call
          (303) 476-6150 or visit swaywellnessspa.com.
        </p>
      </section>

      {/* NEW TIER PREVIEW CARDS */}
      <section className="px-4 sm:px-6 pt-10 pb-6">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.15em] text-[#9ABFB3] mb-2">
            Launching April 1
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            New Membership Tiers
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative bg-white text-[#113D33] rounded-2xl p-6 md:p-7 shadow-xl flex flex-col border ${
                tier.mostPopular
                  ? "ring-2 ring-[#4A776D] border-[#4A776D]/20"
                  : "border-[#113D33]/8"
              }`}
            >
              {tier.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap">
                  MOST POPULAR
                </span>
              )}

              {/* Launching badge */}
              <span className="inline-block self-start text-[10px] uppercase tracking-wider bg-[#DAA520]/15 text-[#8B6914] px-3 py-1 rounded-full font-semibold mb-4">
                April 1
              </span>

              {/* Header */}
              <div className="mb-4 text-center">
                <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                  {tier.tagline}
                </p>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
                  {tier.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-4 text-center">
                <span className="text-4xl md:text-5xl font-bold">
                  {tier.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">/ month</span>
                <p className="text-xs text-gray-400 mt-1">
                  <span className="line-through">{tier.dropInPrice}</span>{" "}
                  drop-in
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-5 leading-relaxed text-center">
                {tier.description}
              </p>

              {/* Expandable: Facials */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleSection(`${tier.key}-facials`)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-[#113D33] py-2"
                >
                  <span>
                    Facials ({tier.facials.length})
                  </span>
                  <motion.span
                    animate={{
                      rotate: expandedSections[`${tier.key}-facials`]
                        ? 180
                        : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[#4A776D]" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedSections[`${tier.key}-facials`] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-1.5 pb-3">
                        {tier.facials.map((t, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0 mt-0.5" />
                            <span>
                              {t.name}
                              {t.duration && (
                                <span className="text-gray-400 ml-1">
                                  ({t.duration})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Expandable: Massages */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleSection(`${tier.key}-massages`)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-[#113D33] py-2"
                >
                  <span>
                    Massages ({tier.massages.length})
                  </span>
                  <motion.span
                    animate={{
                      rotate: expandedSections[`${tier.key}-massages`]
                        ? 180
                        : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[#4A776D]" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedSections[`${tier.key}-massages`] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-1.5 pb-3">
                        {tier.massages.map((t, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0 mt-0.5" />
                            <span>
                              {t.name}
                              {t.duration && (
                                <span className="text-gray-400 ml-1">
                                  ({t.duration})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALL-MEMBER PERKS */}
      <section className="px-4 sm:px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setPerksOpen(!perksOpen)}
            className="w-full flex items-center justify-center gap-2 text-sm text-[#9ABFB3] hover:text-white transition py-3"
          >
            <span>All members also get</span>
            <motion.span
              animate={{ rotate: perksOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
          <AnimatePresence>
            {perksOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-3 pb-4">
                  {memberPerks.map((perk, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-sm text-gray-300 bg-white/5 rounded-full px-4 py-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#4A776D]" />
                      {perk}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ADDITIONAL MEMBERSHIPS */}
      <section className="px-4 sm:px-6 pt-6 pb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">
            More Ways to Sway
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {additionalMemberships.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
            >
              <span className="inline-block text-[10px] uppercase tracking-wider bg-[#DAA520]/15 text-[#DAA520] px-3 py-1 rounded-full font-semibold mb-3">
                April 1
              </span>
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">{m.price}</span>
                <span className="text-sm text-gray-400 ml-1">{m.period}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOOSTS — COLLAPSED BY DEFAULT */}
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
                  {/* Facial Boosts */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-[#9ABFB3] uppercase tracking-wider mb-3">
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

                  {/* Massage Boosts */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-[#9ABFB3] uppercase tracking-wider mb-3">
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

      {/* LOWER IMAGE / BRAND SECTION */}
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
            Join Now — $99/month
          </a>
        </div>
      </section>
    </div>
  );
}
