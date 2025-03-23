"use client";

import { motion } from "framer-motion";

export default function MembershipPage() {
  const memberships = [
    {
      title: "Remedy Room Membership",
      price: "$99/month",
      description:
        "Includes 4 Remedy Room sessions per month ($49 each, a $200 value). Experience 40-minute recovery sessions designed to energize and heal.",
      flex: true,
    },
    {
      title: "Founding Membership",
      price: "$99/month",
      description:
        "Includes one $99 treatment every month. Enjoy exclusive access to our Member Lounge, 10% off The Sway Shop, and much more.",
      flex: true,
    },
    {
      title: "Aescape Membership",
      price: "$99/month",
      description:
        "Includes two 30-minute Aescape Robot Massages per month. Enjoy futuristic, AI-powered massage precision for deep relaxation and recovery.",
    },
  ];

  const benefits = [
    {
      title: "Preferred Pricing",
      details:
        "Your price: $99 per treatment per month. Their price: $139. Unlimited treatments at $99 each (excluding boosts).",
    },
    {
      title: "Access to Member Lounge",
      details:
        "A private mezzanine for relaxation. Complimentary tea and snacks included.",
    },
    {
      title: "Bring Your Bestie",
      details: "Bring a friend for $99/treatment once per month.",
    },
    {
      title: "Family Share Account",
      details: "Your family can use your membership credits.",
    },
    {
      title: "10% Off at The Sway Shop",
      details:
        "Get 10% off all retail items, including premium wellness brands.",
    },
    {
      title: "Member-Only Events",
      details:
        "Join exclusive gatherings with like-minded members to inspire wellness.",
    },
    {
      title: "Benefit Rollover",
      details: "Unused benefits roll over so you never lose your value.",
    },
  ];

  return (
    <div className="bg-[#F4F4F2] text-black px-4 pt-32 md:pt-40 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl font-vance text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Sway Memberships
        </motion.h1>

        {/* Membership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {memberships.map((m, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div>
                <h2 className="text-xl md:text-2xl font-vance font-bold mb-2">
                  {m.title}
                </h2>
                <p className="text-md md:text-lg text-[#4A776D] mb-3 font-semibold">
                  {m.price}
                </p>
                <p className="font-vance font-light text-sm md:text-base leading-relaxed mb-5">
                  {m.description}
                </p>
                {m.flex && (
                  <p className="text-xs text-gray-600 font-vance italic">
                    Also available as 3, 6, 9, or 12-month Flex Packages
                  </p>
                )}
              </div>
              <a
                href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-center px-6 py-2 bg-[#4A776D] text-white rounded-full font-vance hover:bg-[#3a5f56]"
              >
                Join Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* Membership Benefits */}
        <motion.section
          className="pt-32 md:pt-44 pb-32 md:pb-44"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-vance font-bold mb-12">
            Membership Includes:
          </h2>

          <div className="space-y-12 mb-28 md:mb-0">
            <div className="space-y-12">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  className={`border-b border-gray-300 pb-6 mt-8 ${
                    i === benefits.length - 1 ? "mb-32 md:mb-0" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <h3 className="text-md md:text-lg font-semibold text-[#113D33] font-vance">
                    {b.title}
                  </h3>
                  <p className="text-sm font-vance text-gray-800 mt-3">
                    {b.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="h-24 md:hidden" /> {/* Mobile bottom spacer */}
      </div>
    </div>
  );
}
