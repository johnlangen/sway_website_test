"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { resolveLocationHref } from "../components/LocationAwareHref";

const RemedyRoomPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const servicesRef = useRef<HTMLDivElement>(null);

  const [saunaHref, setSaunaHref] = useState("/sauna");
  const [coldPlungeHref, setColdPlungeHref] = useState("/cold-plunge");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";

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
      time: "20 min",
      description:
        "Heat therapy designed to support recovery, circulation, stress relief, and overall wellness.",
      img: "/assets/sauna.jpg",
      link: saunaHref,
    },
    {
      id: 2,
      name: "Cold Plunge",
      time: "5 min",
      description:
        "Cold water therapy proven to elevate energy, improve mood, relieve soreness, and support immunity.",
      img: "/assets/cold_plunge.jpg",
      link: coldPlungeHref,
    },
    {
      id: 3,
      name: "Compression Therapy",
      time: "15 min",
      description:
        "Normatec compression boosts circulation, supports lymphatic drainage, and reduces muscle soreness.",
      img: "/assets/compression_therapy.jpg",
      link: "/compression-therapy",
    },
    {
      id: 4,
      name: "LED Light Therapy",
      time: "15 min",
      description:
        "Medical-grade LED light therapy to support skin health, cellular repair, and recovery.",
      img: "/assets/led_light_therapy.png",
      link: "/led-light-therapy",
    },
  ];

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO */}
      <section className="bg-[#113D33]">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-14 md:pt-48 md:pb-20 text-center">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4"
          >
            Sauna · Cold Plunge · Compression · LED
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-white text-5xl md:text-7xl font-light tracking-tight"
          >
            The Remedy Room
          </motion.h1>

          <p className="sr-only">
            The Remedy Room at Sway Wellness Spa is a guided 40-minute recovery
            circuit combining 4 evidence-based modalities: 20 minutes of
            sauna, 5 minutes of cold plunge, 15 minutes of Normatec compression
            therapy, and LED light therapy. Located at 1428 Larimer St. on Larimer
            Square in Denver. $25 for members, $49 drop-in. Pair with any of
            Sway&apos;s 6 massage types or 6 facial treatments. Open Mon–Fri 10 AM–8
            PM, Sat 9 AM–6 PM, Sun 11 AM–6 PM. Book at swaywellnessspa.com or
            call (303) 476-6150.
          </p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-white/85"
          >
            A guided 40-minute recovery circuit designed to restore your body
            and reset your nervous system.
          </motion.p>

          <motion.a
            href="https://10best.usatoday.com/awards/sway-denver-colorado/"
            target="_blank"
            rel="noopener noreferrer"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-block mt-5 text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/50 border border-white/20 rounded-full px-4 py-1.5 hover:border-white/40 transition"
          >
            Voted #4 Best Day Spa in America — USA Today 10Best
          </motion.a>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-9 flex items-center justify-center"
          >
            <a
              href="/locations/denver-larimer/book-remedy-room"
              className="inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-4 text-[15px] font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg"
            >
              Book Remedy Room
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white px-6 py-8 md:py-10 border-b border-[#113D33]/8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: "4", label: "Recovery Modalities" },
            { value: "40", label: "Minute Circuit" },
            { value: "$25", label: "Member Pricing" },
            { value: "$49", label: "Drop-In" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#113D33]">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#113D33]/50 font-semibold mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE CIRCUIT — visual flow section */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-[#113D33]">
              How It Works
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#113D33]/70 max-w-2xl mx-auto">
              Four evidence-based modalities in one guided session. No experience
              needed — just show up and follow the circuit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", label: "Compression + LED", time: "15 min", desc: "Start with Normatec compression sleeves and LED light therapy working simultaneously." },
              { step: "02", label: "Sauna", time: "20 min", desc: "Move into the sauna for deep heat therapy supporting recovery and circulation." },
              { step: "03", label: "Cold Plunge", time: "5 min", desc: "Finish with cold water immersion to elevate energy and reduce inflammation." },
              { step: "04", label: "Recover", time: "∞", desc: "Relax in the lounge. Pair with a massage or facial for a complete visit." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-300"
              >
                <span className="text-4xl font-bold text-[#113D33]/10">{s.step}</span>
                <h3 className="text-lg font-semibold text-[#113D33] mt-2">{s.label}</h3>
                <p className="text-xs uppercase tracking-[0.1em] text-[#9ABFB3] font-semibold mt-1">{s.time}</p>
                <p className="text-sm text-[#113D33]/70 mt-3 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES — dark section with glass cards */}
      <section
        ref={servicesRef}
        className="bg-[#113D33] px-6 py-20 md:py-28"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Recovery Technologies
          </h2>
          <p className="mt-3 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Each modality is backed by science and chosen for its role in the
            recovery circuit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {remedies.map((remedy, i) => (
            <motion.div
              key={remedy.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:bg-white/[0.12] hover:border-white/20 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative w-full md:w-1/2 h-[220px] md:h-auto overflow-hidden">
                <Image
                  src={remedy.img}
                  alt={remedy.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                <p className="text-xs uppercase tracking-widest text-[#9ABFB3] font-semibold">
                  {remedy.time}
                </p>
                <h3 className="text-2xl font-semibold text-white mt-1">
                  {remedy.name}
                </h3>
                <p className="text-white/70 mt-3 text-sm md:text-base leading-relaxed">
                  {remedy.description}
                </p>

                <Link
                  href={remedy.link}
                  className="mt-5 inline-flex items-center gap-2 w-fit text-sm font-bold text-white border border-white/20 rounded-lg px-5 py-2.5 hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  Learn More
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="mt-14 text-center">
          <button
            onClick={handleScroll}
            className="inline-flex flex-col items-center text-white/50 hover:text-white/80 transition"
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
              className="w-5 h-5 animate-bounce"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "What is the Remedy Room?",
              a: "The Remedy Room is a guided 40-minute recovery circuit at Sway that combines four modalities: sauna, cold plunge, Normatec compression therapy, and LED light therapy. It's designed to restore your body and reset your nervous system in a single session.",
            },
            {
              q: "Who is the Remedy Room for?",
              a: "Anyone. Athletes use it for post-workout recovery. Remote workers use it to reset after long days. No experience needed, no special clothing required. Just show up and follow the guided circuit.",
            },
            {
              q: "What's included in a Remedy Room session?",
              a: "Every session follows a guided circuit: 15 minutes of Normatec compression therapy with LED light therapy, 20 minutes of sauna, and 5 minutes of cold plunge. Total session time is 40 minutes.",
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
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    key={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-[#113D33]/80 leading-relaxed pr-8">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-10 text-center">
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
            ].map((s, i) => (
              <motion.div
                key={s.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={s.href}
                  className="block rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-6 hover:shadow-md hover:border-[#113D33]/25 hover:scale-[1.02] transition-all duration-300 group h-full"
                >
                  <h3 className="text-lg font-semibold text-[#113D33]">{s.name}</h3>
                  <p className="mt-2 text-sm text-[#113D33]/70 leading-relaxed">{s.desc}</p>
                  <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
                    Learn More →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            Book Remedy Room at a Location
          </h2>
          <Link
            href="/locations/denver-larimer/book-remedy-room/"
            className="block rounded-2xl border border-[#113D33]/15 bg-white p-6 hover:shadow-lg hover:border-[#113D33]/30 hover:scale-[1.01] transition-all duration-300 group"
          >
            <p className="text-lg font-semibold text-[#113D33]">Sway Larimer</p>
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
