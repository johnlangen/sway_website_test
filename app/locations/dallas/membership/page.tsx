"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { ReviewBadge } from "@/app/components/GoogleReviews";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

type TreatmentItem = { name: string; duration?: string };

const tiers: {
  key: string;
  name: string;
  tagline: string;
  description: string;
  mostPopular?: boolean;
  facials: TreatmentItem[];
  massages: TreatmentItem[];
}[] = [
  {
    key: "essential",
    name: "Essential",
    tagline: "50-minute treatments",
    description: "Signature facials and massages — your entry to Sway.",
    facials: [{ name: "Essential Signature Facial" }],
    massages: [
      { name: "Essential Signature Massage" },
      { name: "Essential Maternity Massage" },
    ],
  },
  {
    key: "premier",
    name: "Premier",
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

export default function DallasMembershipPage() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://swaywellnessspa.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://swaywellnessspa.com/locations/" },
          { "@type": "ListItem", position: 3, name: "Dallas", item: "https://swaywellnessspa.com/locations/dallas/" },
          { "@type": "ListItem", position: 4, name: "Membership", item: "https://swaywellnessspa.com/locations/dallas/membership/" },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f4f4f1] text-[#113D33] px-4 pt-32 md:pt-40 pb-20 min-h-screen font-vance">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeUp}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest mb-4 uppercase">
            Sway Dallas Memberships
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-3">
            Three membership tiers — pricing announced at launch
          </p>
          <div className="flex justify-center mb-4">
            <ReviewBadge />
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Essential, Premier, and Ultimate tiers will be available at our
            Knox/Henderson location. Join the waitlist to be first in line for
            founding member pricing.
          </p>
        </motion.div>

        {/* Membership Tier Previews */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              className={`bg-white rounded-2xl p-6 md:p-7 shadow-lg relative flex flex-col border ${
                tier.mostPopular
                  ? "ring-2 ring-[#4A776D] border-[#4A776D]/20"
                  : "border-transparent"
              }`}
              {...fadeUp}
            >
              {tier.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold">
                  MOST POPULAR
                </span>
              )}

              <div className="mb-4 text-center">
                <p className="text-xs uppercase tracking-widest text-[#4A776D] mb-1">
                  {tier.tagline}
                </p>
                <h2 className="text-xl md:text-2xl font-bold">{tier.name}</h2>
              </div>

              <p className="text-sm text-gray-600 mb-5 text-center leading-relaxed">
                {tier.description}
              </p>

              {/* Expandable: Facials */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleSection(`${tier.key}-facials`)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-[#113D33] py-2"
                >
                  <span>Facials ({tier.facials.length})</span>
                  <motion.span
                    animate={{
                      rotate: expandedSections[`${tier.key}-facials`] ? 180 : 0,
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
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0 mt-0.5" />
                            <span>
                              {t.name}
                              {t.duration && (
                                <span className="text-gray-400 ml-1">({t.duration})</span>
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
                  <span>Massages ({tier.massages.length})</span>
                  <motion.span
                    animate={{
                      rotate: expandedSections[`${tier.key}-massages`] ? 180 : 0,
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
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-3.5 h-3.5 text-[#4A776D] shrink-0 mt-0.5" />
                            <span>
                              {t.name}
                              {t.duration && (
                                <span className="text-gray-400 ml-1">({t.duration})</span>
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

        {/* FAQ */}
        <motion.div className="max-w-2xl mx-auto" {...fadeUp}>
          <h2 className="text-xl font-bold text-center mb-6">Membership FAQs</h2>
          <div className="space-y-3">
            <details className="bg-white rounded-xl p-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                What membership tiers will be available?
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Sway Dallas will offer three tiers: Essential (signature 50-minute treatments), Premier (enhanced products and extended durations), and Ultimate (tech-enhanced premium treatments with LED, microcurrent, and more). Additional Remedy Room and Aescape robot massage memberships will also be available.
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                Will there be founding member pricing?
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Yes. Founding members will receive exclusive pricing before Sway Dallas opens. Join the waitlist to be notified when founding memberships become available.
              </p>
            </details>
            <details className="bg-white rounded-xl p-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                When does Sway Dallas open?
                <span className="text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                We&apos;re opening at 2323 Henderson Ave in the Knox/Henderson neighborhood. Waitlist members will be the first to know the exact date and will get priority access.
              </p>
            </details>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-12" {...fadeUp}>
          <Link
            href="/locations/dallas/founding-membership"
            className="inline-block bg-[#113D33] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition"
          >
            Join the Waitlist
          </Link>
          <p className="text-sm text-gray-500 mt-3">Be first in line for founding member pricing</p>
        </motion.div>
      </div>
    </div>
  );
}
