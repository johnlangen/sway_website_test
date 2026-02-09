"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LarimerMassagePage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

  const benefits = [
    {
      title: "Relieve Muscle Tension",
      description:
        "Target tight muscles and chronic tension with personalized massage techniques tailored to your body.",
    },
    {
      title: "Reduce Stress",
      description:
        "Massage therapy helps calm the nervous system, reduce cortisol, and promote deep relaxation.",
    },
    {
      title: "Improve Circulation",
      description:
        "Hands-on therapy supports blood flow and oxygen delivery throughout the body.",
    },
    {
      title: "Support Recovery",
      description:
        "Ideal for athletes, active professionals, or anyone needing physical and mental reset.",
    },
  ];

  return (
    <div className="w-full max-w-screen bg-[#F7F4E9] font-vance">
      {/* HERO */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-16 pt-28 md:pt-36 pb-20 md:py-36 max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <Image
            src="/assets/massage2.png"
            alt="Massage therapy at Sway Wellness Spa in Denver (Larimer Square)"
            width={650}
            height={450}
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[320px] md:max-h-[480px] md:w-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <p className="text-sm text-[#113D33] uppercase tracking-widest">
            Denver – Larimer Square
          </p>

          <h1 className="text-4xl md:text-6xl font-vance-bold text-[#113D33] mt-2">
            Massage in Denver
          </h1>

          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Member $99 | Drop-In $139
          </p>

          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
            Experience professional massage therapy at Sway Wellness Spa in
            downtown Denver. Our licensed therapists customize every session to
            meet your body’s unique needs.
          </p>

          {/* ✅ CTA STACK */}
          <div className="mt-8 flex flex-col items-center md:items-start gap-3">
            <Link
              href="/locations/denver-larimer/book-service?category=massage"
              className="bg-[#113D33] text-white px-6 py-3 text-md font-bold rounded-md hover:bg-[#0a2b23] transition-all shadow-lg text-center w-full sm:w-auto"
            >
              Book a Massage at Larimer Square
            </Link>

            <a
              href="tel:+13034766150"
              className="text-sm text-gray-600 hover:text-[#113D33] transition"
            >
              or call <span className="font-semibold">(303) 476-6150</span>
            </a>

            <Link
              href="/remedy-tech"
              className="underline text-[#113D33] text-sm mt-1"
            >
              Explore the Remedy Room
            </Link>
          </div>
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#D1E0D5] px-6 py-16 md:py-24">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] text-center mb-12">
            Why Choose Massage at Sway
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#B6CFBF] rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-vance-bold text-[#113D33]">
                  {b.title}
                </h3>
                <p className="text-gray-700 mt-2 text-sm font-vance-text">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/locations/denver-larimer/book-service?category=massage"
              className="inline-block bg-[#4A776D] hover:bg-[#3a5f56] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Schedule Your Massage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
