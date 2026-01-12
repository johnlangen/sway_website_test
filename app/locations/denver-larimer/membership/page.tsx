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
      price: "$99 / month",
      visits: "4 monthly visits",
      key: "remedy",
    },
    {
      title: "Spa Club",
      price: "$99 / month",
      visits: "1 facial or massage",
      mostPopular: true,
      key: "spa",
    },
    {
      title: "Aescape Robot Massage",
      price: "$99 / month",
      visits: "2 × 60-min sessions",
      key: "aescape",
    },
  ];

  return (
    <div className="min-h-screen font-vance bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a] text-white">
      {/* HERO */}
      <section className="px-6 pt-28 md:pt-32 pb-16 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-3"
        >
          Inclusive Club. Exclusive Perks.
        </motion.h1>

        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
          Three memberships. One elevated way to care for your body.
        </p>
      </section>

      {/* MEMBERSHIP CARDS */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberships.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="
                rounded-2xl
                bg-[#F7F4E9]
                text-[#113D33]
                p-6
                shadow-xl
                flex
                flex-col
                justify-between
                text-center
              "
            >
              {m.mostPopular && (
                <span className="mx-auto mb-3 text-xs bg-[#113D33] text-white px-3 py-1 rounded-full font-semibold">
                  MOST POPULAR
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold uppercase mb-1">
                  {m.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{m.visits}</p>
                <p className="text-xl font-semibold mb-4">{m.price}</p>
              </div>

              <button
                onClick={() =>
                  setOpenGroup(openGroup === m.key ? null : m.key)
                }
                className="text-sm underline underline-offset-4 mb-4"
              >
                {openGroup === m.key
                  ? "Hide membership benefits"
                  : "View membership benefits"}
              </button>

              <AnimatePresence>
                {openGroup === m.key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-gray-700 whitespace-pre-line mb-4"
                  >
                    {benefitData[m.key as keyof typeof benefitData].map(
                      (b, idx) => (
                        <div key={idx} className="mb-3">
                          <strong>{b.title}</strong>
                          <p>{b.content}</p>
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-2
                  inline-block
                  rounded-full
                  bg-[#4A776D]
                  hover:bg-[#3a5f56]
                  text-white
                  font-semibold
                  py-3
                  transition
                "
              >
                Join the Club
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOWER IMAGE / BRAND SECTION */}
      <section className="relative h-[50vh] mt-10">
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
          <p className="max-w-2xl text-base md:text-lg mb-6">
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
