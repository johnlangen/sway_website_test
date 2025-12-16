"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const benefitData = {
  spa: [
    {
      title: "Preferred Pricing",
      content: `Your price: $99 (per treatment per month)
Their price: $139 (per treatment)
Unlimited treatments at $99 each (excluding boosts)

PLUS as a Spa Club Member, you receive special pricing:
50% off ALL Boosts & Super Boosts
50% off The Remedy Room`,
    },
    {
      title: "Access to Exclusive Member-Only Lounge",
      content: `A private mezzanine for you to relax.
Complimentary tea and snacks included.`,
    },
    {
      title: "Bring your Bestie",
      content: `Bring in a friend at member pricing. Limited to 1x a month.`,
    },
    {
      title: "Family Share Account",
      content: `Your family can use your credit for the month, or any available rollovers.`,
    },
    {
      title: "10% off at The Sway Shop",
      content: `Get 10% off premium brands: Eminence, Dr. Dennis Gross, DedCool & more.`,
    },
    {
      title: "Access to Member Only Events",
      content: `Join like-minded friends for exclusive gatherings.`,
    },
    { title: "Benefits Roll Over!", content: `If you don’t use it, you don’t lose it.` },
  ],
  remedy: [
    {
      title: "Preferred Pricing",
      content: `Your Price: $99/Month (4x visits a month)
Their Price: $196/Month (4x visits a month)

If wanting to visit more, access $25/visit pricing

PLUS: $99 Facial or Massage + 50% off ALL Boosts`,
    },
    {
      title: "Bring your Bestie",
      content: `Bring a friend for $99/session. Limited to 1x/month.`,
    },
    {
      title: "Family Share Account",
      content: `Your family can use your membership credit each month.`,
    },
    {
      title: "10% off at The Sway Shop",
      content: `Shop top-tier brands with a 10% member discount.`,
    },
    {
      title: "Access to Member Only Events",
      content: `Wellness events exclusively for members.`,
    },
  ],
  aescape: [
    {
      title: "Preferred Pricing",
      content: `4x visits/month included
Their Price: $276/Month

Robot-powered relaxation, precision-tuned for your body.`,
    },
    {
      title: "Bring your Bestie",
      content: `Invite a friend to experience AI-powered massage for $99/month.`,
    },
    {
      title: "Family Share Account",
      content: `Share your sessions with your loved ones.`,
    },
    {
      title: "10% off at The Sway Shop",
      content: `Take home wellness with 10% off all retail items.`,
    },
    {
      title: "Access to Member Only Events",
      content: `Engage with fellow members at exclusive events.`,
    },
  ],
} as const;

export default function MembershipPage() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const memberships = [
    {
      title: "Remedy Room",
      price: "$99/Month",
      visits: "4 Monthly Visits",
      key: "remedy",
      details: ["Cold Plunge", "Sauna", "LED Light Therapy", "Lymphatic Drainage", "Compression Boots"],
    },
    {
      title: "Spa Club",
      price: "$99/Month",
      visits: "1 Monthly Facial or Massage",
      mostPopular: true,
      key: "spa",
      details: [
        "Facials: Forever Young, Pore Perfection, Glow Getter, Sensitive Silk, Dr. Dennis Gross, Vitamin C Facial",
        "Massage: Deep Tissue, Sports, CBD, Salt Stone",
      ],
    },
    {
      title: "Aescape Robot Massage",
      price: "$99/Month",
      visits: "4 Monthly 30 Min. Massages",
      key: "aescape",
      details: ["First-Ever Robot Massage. Enough said!"],
    },
  ];

  return (
    <div className="relative min-h-screen font-vance">
      {/* Background with texture */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/membership_background.png"
          alt="Membership background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
      </div>

      <div className="px-4 pt-32 md:pt-40 text-white max-w-6xl mx-auto text-center">
        {/* Headline */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold tracking-widest mb-4 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Inclusive Club.
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-widest mb-12 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Exclusive Perks.
        </motion.h2>

        <p className="text-2xl md:text-3xl font-semibold mb-6">
          Three memberships you can feel good about.
        </p>
        <p className="text-base md:text-lg mb-20 max-w-2xl mx-auto text-gray-200">
          No matter which membership you choose, you’ll unlock exclusive member pricing across all Sway experiences.
        </p>

        {/* Membership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
          {memberships.map((m, i) => (
            <motion.div
              key={i}
              className="bg-white text-[#113D33] rounded-xl px-6 py-10 shadow-lg flex flex-col justify-between min-h-[600px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              {m.mostPopular && (
                <div className="text-sm bg-[#113D33] text-white px-3 py-1 rounded-full font-semibold w-fit mb-4 mx-auto">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-3xl md:text-4xl font-bold uppercase mb-2">{m.title}</h3>
              <p className="text-base text-gray-600 mb-1">{m.visits}</p>
              <p className="text-2xl font-semibold mb-6">{m.price}</p>
              <ul className="text-sm mb-6 space-y-2">
                {m.details.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>

              {/* Accordion Toggle */}
              <button
                onClick={() => {
                  if (openGroup === m.key) {
                    setOpenGroup(null);
                    setOpenIndex(null);
                  } else {
                    setOpenGroup(m.key);
                    setOpenIndex(null);
                  }
                }}
                className="text-sm font-semibold text-[#113D33] underline underline-offset-4 mb-4"
              >
                {openGroup === m.key ? "Hide Benefits" : "View Membership Benefits"}
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {openGroup === m.key && (
                  <motion.div
                    key={m.key}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-left text-sm md:text-base font-vance text-[#113D33]/90 whitespace-pre-line mb-4"
                  >
                    {benefitData[m.key as "spa" | "remedy" | "aescape"].map((item, index) => (
                      <div key={index} className="border-b border-gray-300 py-2">
                        <button
                          onClick={() => setOpenIndex(openIndex === index ? null : index)}
                          className="flex justify-between items-center w-full"
                        >
                          <span className="font-semibold">{item.title}</span>
                          <span>{openIndex === index ? "−" : "+"}</span>
                        </button>
                        <AnimatePresence>
                          {openIndex === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 text-gray-700"
                            >
                              {item.content}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center px-6 py-3 rounded-full bg-[#4A776D] text-white font-bold uppercase tracking-wider hover:bg-[#3a5f56] transition"
              >
                Join the Club
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logo background CTA */}
      <div className="relative mt-20 h-[50vh]">
        <Image
          src="/assets/membership_background_logo.png"
          alt="Sway Logo Background"
          fill
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/50 -z-0" />
        <div className="relative text-center py-20 text-white max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Sway Way</h2>
          <p className="text-lg md:text-xl mb-8">
            Become part of an inclusive club with exclusive perks. Elevate your wellness today.
          </p>
          <a
            href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#D7E5DD] text-[#113D33] font-bold rounded-full uppercase tracking-wider hover:bg-white transition"
          >
            Join Now
          </a>
        </div>
      </div>
    </div>
  );
}
