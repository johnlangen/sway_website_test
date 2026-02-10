"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SaunaPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const bodyBenefits = [
    {
      title: "Improve Circulation",
      description:
        "Heat exposure increases blood flow, supporting oxygen and nutrient delivery throughout the body.",
    },
    {
      title: "Muscle Recovery",
      description:
        "Deep heat helps relax muscles and joints, easing tension after workouts or long days.",
    },
    {
      title: "Pain Relief Support",
      description:
        "Heat therapy is commonly used to support relief from stiffness and chronic soreness.",
    },
    {
      title: "Relaxation Response",
      description:
        "Sauna heat encourages a parasympathetic response, helping the body unwind.",
    },
  ];

  const mindBenefits = [
    {
      title: "Stress Reduction",
      description:
        "Quiet heat sessions help calm the nervous system and reduce mental overload.",
    },
    {
      title: "Improved Sleep",
      description:
        "Post-sauna cooldown may support deeper, more restorative sleep.",
    },
    {
      title: "Mental Reset",
      description:
        "Time in the sauna creates space for reflection, breath, and mental clarity.",
    },
    {
      title: "Mood Support",
      description:
        "Heat exposure may stimulate endorphins associated with improved mood.",
    },
  ];

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-16 pt-28 md:pt-36 pb-20 md:py-36 max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <Image
            src="/assets/sauna.png"
            alt="Traditional sauna at Sway Wellness Spa"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[300px] md:max-h-[450px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-sm text-[#113D33] uppercase tracking-widest">
            Recommended • 15–20 Minutes
          </p>

          <h1 className="text-4xl md:text-6xl font-vance-bold text-[#113D33] mt-2">
            Sauna Therapy
          </h1>

          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Drop-In $49 | Member $25
          </p>

          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
            Sauna therapy uses dry heat to support circulation, recovery, and
            deep relaxation as part of a balanced wellness routine.
          </p>

          <Link
            href="/book"
            className="mt-6 inline-block bg-[#113D33] text-white px-6 py-3 font-bold rounded-md shadow-lg hover:bg-[#0a2b23]"
          >
            Schedule Your Wellness
          </Link>
        </motion.div>
      </section>

      {/* BODY */}
      <section className="bg-[#D1E0D5] px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] text-center mb-12">
          Restore Your Body
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
          {bodyBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-[#B6CFBF] rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-vance-bold text-[#113D33]">{b.title}</h3>
              <p className="text-gray-700 mt-2 text-sm font-vance-text">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MIND */}
      <section className="bg-[#113D33] px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-vance-bold text-white text-center mb-12">
          Refresh Your Mind
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
          {mindBenefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-[#0A2B23] text-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-vance-bold">{b.title}</h3>
              <p className="mt-2 text-sm font-vance-text">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-vance-bold text-[#113D33] mb-8">
            Book Sauna at a Location
          </h2>
          <Link
            href="/locations/denver-larimer/sauna/"
            className="block rounded-2xl border border-[#113D33]/15 bg-white p-6 hover:shadow-lg hover:border-[#113D33]/30 transition-all group"
          >
            <p className="text-lg font-vance-bold text-[#113D33]">Sway Larimer</p>
            <p className="text-sm text-gray-600 mt-1">Denver, CO — Larimer Square</p>
            <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
              Book Now →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
