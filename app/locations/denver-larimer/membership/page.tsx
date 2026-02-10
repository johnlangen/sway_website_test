"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const benefitData = {
  spa: [
    {
      title: "Preferred Pricing",
      content:
        "Unlimited facials or massages at $99 each (normally $139).\n\n50% off all Boosts & Super Boosts\n50% off the Remedy Room",
    },
    {
      title: "Member Lounge Access",
      content: "Private mezzanine with complimentary tea and snacks.",
    },
    {
      title: "Bring a Friend",
      content: "One guest per month at member pricing.",
    },
    {
      title: "Family Sharing",
      content: "Share credits or rollovers with family.",
    },
    {
      title: "Retail Discount",
      content: "10% off Eminence, Dr. Dennis Gross, DedCool & more.",
    },
    {
      title: "Rollover Benefits",
      content: "Unused credits roll over — no pressure.",
    },
  ],
  remedy: [
    {
      title: "4 Monthly Visits",
      content:
        "Cold plunge, sauna, red light therapy, compression boots, lymphatic drainage.",
    },
    {
      title: "Preferred Pricing",
      content: "Additional visits just $25 each.",
    },
    {
      title: "Bonus Spa Savings",
      content: "$99 facial or massage + 50% off boosts.",
    },
  ],
  aescape: [
    {
      title: "2 Monthly Sessions",
      content: "60-minute AI-powered robot massages.",
    },
    {
      title: "Precision Recovery",
      content:
        "Personalized pressure using real-time muscle mapping and data.",
    },
  ],
} as const;

export default function MembershipPage() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const memberships = [
    {
      title: "Remedy Room",
      price: "$99",
      period: "/ month",
      visits: "4 monthly visits",
      description: "Sauna, cold plunge, red light & compression in one session.",
      key: "remedy",
    },
    {
      title: "Spa Club",
      price: "$99",
      period: "/ month",
      visits: "1 facial or massage",
      description: "Unlimited treatments at member pricing, plus exclusive perks.",
      mostPopular: true,
      key: "spa",
    },
    {
      title: "Aescape Robot",
      price: "$99",
      period: "/ month",
      visits: "2 × 60-min sessions",
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
          {memberships.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`
                relative rounded-2xl p-6 md:p-7 shadow-xl flex flex-col text-center
                ${
                  m.mostPopular
                    ? "bg-white text-[#113D33] ring-2 ring-[#4A776D] md:scale-[1.03] md:-my-2"
                    : "bg-[#F7F4E9] text-[#113D33]"
                }
              `}
            >
              {m.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#4A776D] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap">
                  MOST POPULAR
                </span>
              )}

              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold uppercase mb-1 tracking-wide">
                  {m.title}
                </h3>
                <p className="text-sm text-gray-500">{m.visits}</p>
              </div>

              <div className="mb-4">
                <span className="text-4xl md:text-5xl font-bold">{m.price}</span>
                <span className="text-sm text-gray-500 ml-1">{m.period}</span>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                {m.description}
              </p>

              <a
                href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  block rounded-full font-semibold py-3 px-6 transition mb-4
                  ${
                    m.mostPopular
                      ? "bg-[#113D33] hover:bg-[#0a2b23] text-white"
                      : "bg-[#4A776D] hover:bg-[#3a5f56] text-white"
                  }
                `}
              >
                Join the Club
              </a>

              <button
                onClick={() =>
                  setOpenGroup(openGroup === m.key ? null : m.key)
                }
                className="text-sm text-[#4A776D] hover:text-[#113D33] transition-colors flex items-center justify-center gap-1"
              >
                <span>{openGroup === m.key ? "Hide benefits" : "View benefits"}</span>
                <motion.span
                  animate={{ rotate: openGroup === m.key ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {openGroup === m.key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200 mt-4 text-left space-y-3">
                      {benefitData[m.key as keyof typeof benefitData].map(
                        (b, idx) => (
                          <div key={idx} className="text-sm">
                            <p className="font-semibold text-[#113D33]">{b.title}</p>
                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">{b.content}</p>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOWER IMAGE / BRAND SECTION */}
      <section className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/assets/membership_background_logo.png"
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
