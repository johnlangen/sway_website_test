"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function Treatments() {
  const treatmentsRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    treatmentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full overflow-hidden max-w-screen">
      {/* ✅ Updated Top Section Text */}
      <section className="snap-section bg-[#113D33] text-white flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold font-vance"
        >
          TREATMENT EXPERIENCES
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-3xl leading-relaxed opacity-90"
        >
          Experience the wellness you've been longing for. 
          Transform your health and confidence with our expert-led facials, massages, 
          and science-backed remedy technologies.
        </motion.p>

        {/* Down Arrow Button */}
        <motion.button
          onClick={handleScroll}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 text-white text-2xl animate-bounce"
        >
          ⬇
        </motion.button>
      </section>

      {/* ✅ Treatments List - Fixed Spacing on Mobile */}
      <section
        ref={treatmentsRef}
        className="w-full flex flex-col items-center bg-[#f6f4e8] text-[#113D33] px-6 lg:px-16 py-16 md:py-32"
      >
        <div className="w-full max-w-[1300px] mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold font-vance text-center md:text-left">
            Our Treatments
          </h2>

          {/* ✅ Increased space between cards on mobile (gap-6 sm:gap-8 lg:gap-8) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 mt-8">
            {[
              { id: 1, name: "Facials", img: "/assets/treatment1.png", link: "/facials" },
              { id: 2, name: "Massages", img: "/assets/treatment3.png", link: "/massages" },
              { id: 3, name: "Remedy Room", img: "/assets/treatment2.png", link: "/remedy-tech" },
              { id: 4, name: "Aescape", img: "/assets/aescape-treatment.png", link: "/aescape" },
            ].map((treatment) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform hover:scale-105 
                w-full sm:w-[280px] lg:w-[320px] h-auto mx-auto"
              >
                {/* ✅ Clickable Image */}
                <Link href={treatment.link} className="w-full flex flex-col items-center">
                  <Image
                    src={treatment.img}
                    alt={treatment.name}
                    width={280}
                    height={350}
                    className="rounded-lg object-cover w-[280px] h-[350px] sm:w-[280px] sm:h-[350px] lg:w-[320px] lg:h-[400px]"
                  />
                </Link>

                <h3 className="text-xl font-bold mt-4">{treatment.name}</h3>

                {/* ✅ Clickable Button */}
                <Link
                  href={treatment.link}
                  className="mt-4 bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-[#0a2b23] transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Book Now Section (UNCHANGED) */}
      <section className="snap-section w-full bg-[#113D33] text-white flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl font-bold font-vance max-w-2xl"
        >
          Ready to Book Your Wellness Experience?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-3xl leading-relaxed opacity-90"
        >
          Click below to schedule your treatment and start your journey to relaxation.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=-9"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-white text-[#113D33] font-bold px-6 py-3 text-lg rounded-md shadow-md hover:bg-gray-200 transition-all"
        >
          Book Now
        </motion.a>
      </section>
    </div>
  );
}
