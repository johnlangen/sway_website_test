"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LarimerColdPlungePage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";
  }, []);

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
            src="/assets/cold_plunge.jpg"
            alt="Cold plunge at Sway Wellness Spa in Larimer Square Denver"
            width={650}
            height={450}
            className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[320px] md:max-h-[480px]"
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
            Cold Plunge in Denver
          </h1>

          <p className="text-lg md:text-2xl font-vance-bold text-[#113D33] mt-2">
            Drop-In $49 | Member $25
          </p>

          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed font-vance-text">
            Experience cold plunge therapy at Sway Wellness Spa in downtown Denver.
            Sessions are short, controlled, and supervised for comfort and safety.
          </p>

          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            <Link
              href="/locations/denver-larimer/book-remedy-room"
              className="bg-[#113D33] text-white px-6 py-3 font-bold rounded-md shadow-lg hover:bg-[#0a2b23]"
            >
              Book Remedy Room
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SAFETY & RESEARCH */}
      <section className="bg-[#F7F4E9] px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-vance-bold text-[#113D33] mb-4">
            Cold Plunge Safety & Research
          </h2>

          <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto mb-10">
            Cold water immersion has been studied for recovery, stress response,
            and mental alertness. Benefits may vary by individual and should be
            approached with care and moderation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://health.clevelandclinic.org/what-to-know-about-cold-plunges"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <p className="text-xs uppercase tracking-wider text-[#4A776D] font-semibold">
                Cleveland Clinic
              </p>
              <h3 className="text-lg font-vance-bold text-[#113D33] mt-2">
                Benefits & risks of cold plunges
              </h3>
            </a>

            <a
              href="https://mcpress.mayoclinic.org/healthy-aging/the-science-behind-ice-baths-for-recovery/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <p className="text-xs uppercase tracking-wider text-[#4A776D] font-semibold">
                Mayo Clinic Press
              </p>
              <h3 className="text-lg font-vance-bold text-[#113D33] mt-2">
                Science behind ice baths
              </h3>
            </a>

            <a
              href="https://www.health.harvard.edu/staying-healthy/research-highlights-health-benefits-from-cold-water-immersions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <p className="text-xs uppercase tracking-wider text-[#4A776D] font-semibold">
                Harvard Health
              </p>
              <h3 className="text-lg font-vance-bold text-[#113D33] mt-2">
                Cold-water immersion overview
              </h3>
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-10 max-w-3xl mx-auto">
            Cold plunge therapy is intended for generally healthy adults.
            Guests with cardiovascular conditions, pregnancy, or medical concerns
            should consult a healthcare professional before use.
          </p>
        </div>
      </section>
    </div>
  );
}
