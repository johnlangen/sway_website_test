"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";

const benefitData: Record<string, string[]> = {
  spa: [
    "1 facial or massage included monthly",
    "Unlimited treatments at $99 each",
    "50% off Remedy Room",
    "50% off Boosts & Super Boosts",
    "Member lounge access",
    "Bring a friend at member pricing",
    "10% off retail products",
    "Unused credits roll over",
  ],
  remedy: [
    "4 monthly visits",
    "Additional visits just $25 each",
    "$99 facials & massages",
    "50% off Boosts & Super Boosts",
  ],
  aescape: [
    "2 monthly 60-min sessions",
    "Real-time muscle mapping",
    "Personalized pressure zones",
    "Private, consistent sessions",
  ],
};

export default function MembershipPage() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const memberships = [
    {
      title: "Remedy Room",
      price: "$99",
      period: "/ month",
      visits: "4 monthly visits",
      tagline: "Recovery circuit",
      description: "Sauna, cold plunge, red light & compression in one session.",
      key: "remedy",
    },
    {
      title: "Spa Club",
      price: "$99",
      period: "/ month",
      visits: "1 facial or massage",
      tagline: "Full spa access",
      description: "Unlimited treatments at member pricing, plus exclusive perks.",
      mostPopular: true,
      key: "spa",
    },
    {
      title: "Aescape Robot",
      price: "$99",
      period: "/ month",
      visits: "2 × 60-min sessions",
      tagline: "AI-powered massage",
      description: "AI-powered precision massage tailored to your body.",
      key: "aescape",
    },
  ];

  return (
    <div className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* HERO */}
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
          Inclusive Club.
          <br />
          Exclusive Perks.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-2"
        >
          Three memberships. One elevated way to care for your body.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-sm text-gray-400"
        >
          All plans $99/month — cancel anytime
        </motion.p>
      </section>

      {/* MEMBERSHIP CARDS */}
      <section className="px-4 sm:px-6 pt-10 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {memberships.map((m, i) => {
            const isExpanded = openGroup === m.key;

            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative bg-white text-[#113D33] rounded-2xl p-6 md:p-7 shadow-xl flex flex-col text-center border ${
                  m.mostPopular
                    ? "ring-2 ring-[#4A776D] border-[#4A776D]/20"
                    : "border-[#113D33]/8"
                }`}
              >
                {m.mostPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap">
                    MOST POPULAR
                  </span>
                )}

                {/* Header */}
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                    {m.tagline}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#113D33]">
                    {m.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{m.visits}</p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <span className="text-5xl font-bold text-[#113D33]">{m.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{m.period}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                  {m.description}
                </p>

                {/* CTA */}
                <a
                  href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0a2b23] text-white"
                >
                  Join the Club
                </a>

                {/* Expandable details */}
                <button
                  onClick={() =>
                    setOpenGroup(isExpanded ? null : m.key)
                  }
                  className="text-sm text-[#4A776D] hover:text-[#113D33] transition-colors flex items-center justify-center gap-1"
                >
                  <span>
                    {isExpanded ? "Hide details" : "View all benefits"}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-100 mt-4 text-left">
                        <ul className="space-y-2">
                          {(benefitData[m.key] ?? []).map((b, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <Check className="w-4 h-4 text-[#4A776D] shrink-0 mt-0.5" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
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
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#D7E5DD] text-[#113D33] font-bold rounded-full uppercase hover:bg-white transition"
          >
            Join Now
          </a>
        </div>
      </section>
    </div>
  );
}
