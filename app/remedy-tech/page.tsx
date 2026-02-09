"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { resolveLocationHref } from "../components/LocationAwareHref";

const RemedyRoomPage = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  const [saunaHref, setSaunaHref] = useState("/sauna");
  const [coldPlungeHref, setColdPlungeHref] = useState("/cold-plunge");

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";

    // Resolve location-aware links
    const resolvedSauna = resolveLocationHref({
      localPath: "/sauna",
      fallbackHref: "/sauna",
    });

    const resolvedColdPlunge = resolveLocationHref({
      localPath: "/cold-plunge",
      fallbackHref: "/cold-plunge",
    });

    setSaunaHref(resolvedSauna);
    setColdPlungeHref(resolvedColdPlunge);
  }, []);

  const handleScroll = () => {
    if (!servicesRef.current) return;

    const yOffset =
      servicesRef.current.getBoundingClientRect().top +
      window.scrollY -
      80;

    window.scrollTo({ top: yOffset, behavior: "smooth" });
  };

  const remedies = [
    {
      id: 1,
      name: "Sauna",
      time: "20 MINUTES",
      description:
        "Heat therapy designed to support recovery, circulation, stress relief, and overall wellness.",
      img: "/assets/sauna.png",
      link: saunaHref,
    },
    {
      id: 2,
      name: "Cold Plunge",
      time: "5 MINUTES",
      description:
        "Cold water therapy proven to elevate energy, improve mood, relieve soreness, and support immunity.",
      img: "/assets/cold_plunge.png",
      link: coldPlungeHref,
    },
    {
      id: 3,
      name: "Compression Therapy",
      time: "15 MINUTES",
      description:
        "Normatec compression boosts circulation, supports lymphatic drainage, and reduces muscle soreness.",
      img: "/assets/compression_therapy.png",
      link: "/compression-therapy",
    },
    {
      id: 4,
      name: "LED Light Therapy",
      time: "15 MINUTES",
      description:
        "Medical-grade LED light therapy to support skin health, cellular repair, and recovery.",
      img: "/assets/led_light_therapy.png",
      link: "/led-light-therapy",
    },
  ];

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 pt-28 pb-20 md:pt-40 md:pb-28">
        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#113D33] text-4xl md:text-6xl font-vance-bold"
        >
          REMEDY ROOM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 max-w-3xl text-base md:text-xl text-[#113D33] opacity-90"
        >
          A guided recovery experience combining sauna, cold plunge, compression,
          and LED light therapy — designed to restore your body and reset your
          nervous system.
        </motion.p>

        {/* Pricing */}
        <div className="mt-6 text-[#113D33]">
          <p className="text-lg font-vance-bold">
            Member $25 <span className="opacity-60">|</span> Drop-In $49
          </p>
          <p className="text-sm text-gray-700 mt-2">
            40-minute guided session includes:
          </p>
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            <li>• 15 min Normatec + LED Light Therapy</li>
            <li>• 20 min Sauna</li>
            <li>• 5 min Cold Plunge</li>
          </ul>
        </div>

        {/* CTA */}
        <a
          href="/locations/denver-larimer/book-remedy-room"
          className="mt-8 inline-block bg-[#113D33] text-white px-10 py-4 text-sm font-bold rounded-md hover:bg-[#0a2b23] transition-all"
        >
          Book Remedy Room
        </a>

        {/* Scroll cue */}
        <button
          onClick={handleScroll}
          className="mt-10 flex flex-col items-center text-[#113D33] opacity-70 hover:opacity-100 transition"
        >
          <span className="text-xs uppercase tracking-widest mb-2">
            Explore Technologies
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* TECHNOLOGIES */}
      <section
        ref={servicesRef}
        className="bg-white px-6 py-24 md:py-32 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-vance-bold text-[#113D33] mb-16 text-center">
          DISCOVER OUR REMEDY TECHNOLOGIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1300px] w-full">
          {remedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * remedy.id }}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
              <Image
                src={remedy.img}
                alt={remedy.name}
                width={500}
                height={300}
                className="w-full md:w-1/2 h-[240px] object-cover"
              />

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest text-[#113D33] font-vance-bold">
                  {remedy.time}
                </p>
                <h3 className="text-2xl font-vance-bold text-[#113D33] mt-1">
                  {remedy.name}
                </h3>
                <p className="text-gray-700 mt-3 text-sm md:text-base">
                  {remedy.description}
                </p>

                <Link
                  href={remedy.link}
                  className="mt-4 inline-block w-fit bg-[#113D33] text-white px-5 py-2 text-sm font-bold rounded-md hover:bg-[#0a2b23] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RemedyRoomPage;
