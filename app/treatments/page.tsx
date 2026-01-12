"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { resolveLocationHref } from "../components/LocationAwareHref";

export default function TreatmentsPage() {
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const [bookHref, setBookHref] = useState("/book");

  useEffect(() => {
    const resolved = resolveLocationHref({
      localPath: "/book",
      fallbackHref: "/book",
    });

    setBookHref(resolved);
  }, []);

  const handleScroll = () => {
    treatmentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const treatments = [
    {
      id: 1,
      name: "Facials",
      img: "/assets/treatment1.png",
      learn: "/facials",
    },
    {
      id: 2,
      name: "Massages",
      img: "/assets/treatment3.png",
      learn: "/massages",
    },
    {
      id: 3,
      name: "Remedy Room",
      img: "/assets/treatment2.png",
      learn: "/remedy-tech",
    },
    {
      id: 4,
      name: "Aescape",
      img: "/assets/aescape-treatment.png",
      learn: "/aescape",
      subtitle: "Select Locations",
    },
  ];

  return (
    <div className="w-full max-w-screen overflow-hidden font-vance">
      {/* HERO */}
      <section className="bg-[#113D33] text-white flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Treatment Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-3xl leading-relaxed opacity-90"
        >
          Discover expert-led wellness experiences designed to restore, recover,
          and elevate your body and mind.
        </motion.p>

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

      {/* GRID */}
      <section
        ref={treatmentsRef}
        className="bg-[#F7F4E9] px-6 py-16 md:py-32"
      >
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-[#113D33] mb-10 text-center md:text-left">
            Our Treatments
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              >
                <Image
                  src={t.img}
                  alt={`${t.name} at Sway Wellness Spa`}
                  width={320}
                  height={420}
                  className="rounded-lg object-cover w-full h-[380px]"
                />

                <h3 className="text-xl font-bold text-[#113D33] mt-4">
                  {t.name}
                </h3>

                {t.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{t.subtitle}</p>
                )}

                <div className="mt-6 flex flex-col gap-3 w-full">
                  <Link
                    href={t.learn}
                    className="w-full bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-md hover:bg-[#0a2b23] transition-all"
                  >
                    Learn More
                  </Link>

                  <Link
                    href={bookHref}
                    className="w-full border border-[#113D33] text-[#113D33] px-4 py-2 text-sm font-bold rounded-md hover:bg-[#113D33] hover:text-white transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#113D33] text-white flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl font-bold max-w-2xl"
        >
          Ready to Book Your Wellness Experience?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 text-sm md:text-lg max-w-3xl opacity-90"
        >
          Choose your treatment, select your location, and schedule your visit
          in just a few clicks.
        </motion.p>

        <Link
          href={bookHref}
          className="mt-6 bg-white text-[#113D33] font-bold px-6 py-3 text-lg rounded-md shadow-md hover:bg-gray-200 transition-all"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
