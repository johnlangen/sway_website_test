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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      img: "/assets/sauna.jpg",
      link: saunaHref,
    },
    {
      id: 2,
      name: "Cold Plunge",
      time: "5 MINUTES",
      description:
        "Cold water therapy proven to elevate energy, improve mood, relieve soreness, and support immunity.",
      img: "/assets/cold_plunge.jpg",
      link: coldPlungeHref,
    },
    {
      id: 3,
      name: "Compression Therapy",
      time: "15 MINUTES",
      description:
        "Normatec compression boosts circulation, supports lymphatic drainage, and reduces muscle soreness.",
      img: "/assets/compression_therapy.jpg",
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
          and LED light therapy. Designed to restore your body and reset your
          nervous system.
        </motion.p>

        <motion.a
          href="https://10best.usatoday.com/awards/sway-denver-colorado/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="inline-block mt-4 text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#113D33]/70 border border-[#113D33]/20 rounded-full px-4 py-1.5 hover:border-[#113D33]/40 transition"
        >
          Voted #4 Best Day Spa in America — USA Today 10Best
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 text-sm md:text-base max-w-2xl text-[#113D33]/70 leading-relaxed"
        >
          Recovery built on science. Infrared sauna, cold plunge, Normatec
          compression, and LED light therapy: four evidence-based modalities
          in one 40-minute guided circuit. Used by athletes, remote workers,
          and anyone who takes recovery seriously.
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

      {/* FAQ */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-vance-bold text-[#113D33] mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "What is the Remedy Room?",
              a: "The Remedy Room is a guided 40-minute recovery circuit at Sway that combines four modalities: infrared sauna, cold plunge, Normatec compression therapy, and LED light therapy. It's designed to restore your body and reset your nervous system in a single session.",
            },
            {
              q: "Who is the Remedy Room for?",
              a: "Anyone. Athletes use it for post-workout recovery. Remote workers use it to reset after long days. No experience needed, no special clothing required. Just show up and follow the guided circuit.",
            },
            {
              q: "What's included in a Remedy Room session?",
              a: "Every session follows a guided circuit: 15 minutes of Normatec compression therapy with LED light therapy, 20 minutes of infrared sauna, and 5 minutes of cold plunge. Total session time is 40 minutes.",
            },
            {
              q: "Can I combine the Remedy Room with a massage or facial?",
              a: "Yes, many Sway members pair a Remedy Room session with a massage or facial for a complete wellness experience. Recovery before a massage can help your muscles release tension more effectively.",
            },
            {
              q: "How much does the Remedy Room cost?",
              a: "The Remedy Room is $49 per session for drop-in guests and just $25 for Sway members. Memberships start at $99/month and include savings on all treatments, boosts, and recovery sessions.",
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-black/10">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-[#113D33]">{item.q}</span>
                <svg
                  className={`w-4 h-4 shrink-0 text-[#113D33] opacity-40 transition-transform duration-200 ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              {openFaq === i && (
                <p className="pb-5 text-sm text-[#113D33]/80 leading-relaxed pr-8">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-vance-bold text-[#113D33] mb-10 text-center">
            Explore More at Sway
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Massages",
                desc: "Deep Tissue, Sports, CBD, and more. Customized by expert therapists with high-tech boosts.",
                href: "/massages",
              },
              {
                name: "Facials",
                desc: "Results-driven skincare with Eminence Organics, Dr. Dennis Gross, and high-tech boosts.",
                href: "/facials",
              },
              {
                name: "Aescape Robot Massage",
                desc: "AI-powered precision massage with personalized pressure mapping. Select locations.",
                href: "/aescape",
              },
            ].map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="block rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-6 hover:shadow-md hover:border-[#113D33]/25 transition-all group"
              >
                <h3 className="text-lg font-semibold text-[#113D33]">{s.name}</h3>
                <p className="mt-2 text-sm text-[#113D33]/70 leading-relaxed">{s.desc}</p>
                <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-vance-bold text-[#113D33] mb-8">
            Book Remedy Room at a Location
          </h2>
          <Link
            href="/locations/denver-larimer/book-remedy-room/"
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
};

export default RemedyRoomPage;
