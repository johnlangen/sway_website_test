"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ColdPlungePage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const bodyBenefits = [
    {
      title: "Wake Up!",
      description:
        "Cold exposure triggers adrenaline and endorphins to elevate energy, boost alertness, and invigorate your body.",
    },
    {
      title: "Detox",
      description:
        "Stimulates the lymphatic system and improves circulation to flush toxins and deliver oxygen-rich blood.",
    },
    {
      title: "Rapid Recovery",
      description:
        "Constricts blood vessels to reduce swelling, then delivers nutrient-rich blood on warm-up for faster healing.",
    },
    {
      title: "Strengthen Immunity",
      description:
        "Supports white blood cell production and enhances the lymphatic system to build stronger immunity.",
    },
  ];

  const mindBenefits = [
    {
      title: "Reduce Stress",
      description: "Lowers cortisol and promotes relaxation, leaving you calmer after each session.",
    },
    {
      title: "Tranquil Sleep",
      description: "Improves sleep quality by reducing stress hormones and boosting endorphins.",
    },
    {
      title: "Enhance Mood",
      description:
        "Cold water increases norepinephrine, improving focus, mood, and overall well-being.",
    },
    {
      title: "Mental Clarity",
      description:
        "Boosts dopamine and circulation for sharper thinking, improved alertness, and clear focus.",
    },
  ];

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance">
      {/* ✅ Hero Section */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-16 pt-28 md:pt-36 pb-20 md:py-36 max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <Image
            src="/assets/cold_plunge.png"
            alt="Cold plunge therapy pool at Sway Wellness Spa"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[300px] md:max-h-[450px] md:w-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-sm text-[#113D33] uppercase tracking-widest">
            Recommended 5 Min
          </p>
          <h1 className="text-4xl md:text-6xl font-vance-bold text-[#113D33] mt-2">
            Cold Plunge
          </h1>
          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Drop-In $49 | Member $25
          </p>
          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
            A powerful wellness ritual: reduce inflammation, improve sleep, relieve pain,
            boost energy, and elevate your mood in just five minutes.
          </p>

          <h2 className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-6">
            Recommended for:
          </h2>
          <ul className="text-md md:text-lg text-gray-700 mt-3 space-y-2 font-vance-text">
            <li>+ Reducing Stress and Anxiety</li>
            <li>+ Improving Skin Health</li>
            <li>+ Arthritis Relief</li>
            <li>+ Detoxification</li>
            <li>+ Muscle Pain and Joint Stiffness</li>
          </ul>

          <Link
            href="/book"
            target="_blank"
            className="mt-6 inline-block bg-[#113D33] text-white px-6 py-3 text-md font-bold rounded-md hover:bg-[#0a2b23] transition-all shadow-lg"
          >
            Schedule Your Wellness
          </Link>
        </motion.div>
      </section>

      {/* ✅ Restore Your Body */}
      <section className="bg-[#D1E0D5] px-6 py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] text-center mb-12">
          Restore Your Body
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px]">
          {bodyBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#B6CFBF] rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-lg font-vance-bold text-[#113D33]">{b.title}</h3>
              <p className="text-gray-700 mt-2 text-sm font-vance-text">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Refresh Your Mind */}
      <section className="bg-[#113D33] px-6 py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-white text-center mb-12">
          Refresh Your Mind
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px]">
          {mindBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A2B23] text-white rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-lg font-vance-bold">{b.title}</h3>
              <p className="mt-2 text-sm font-vance-text">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
