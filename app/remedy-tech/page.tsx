"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  getSelectedLocation,
  resolveLocationHref,
} from "../components/LocationAwareHref";
import { SwayCurve } from "../components/SwayCurve";

/* ------------------------------------------------------------------
   CLUB VARIANT — RiNo + Central Park have the Remedy LOUNGE, not the
   Remedy Room: self-guided 75-min sessions (up to two 25-min sauna
   windows booked in the flow), no LED — they have PEMF mats instead
   (confirmed Aug 2026; the ClubRemedyLoungeFlow "included" band is the
   source of truth). Infrared sauna language is ALLOWED for these two
   locations (Glow cabins are genuinely infrared) — never for Larimer.
   Session facts (75 min, 2×25 sauna, $49/$25/included) mirror
   ClubRemedyLoungeFlow — keep in sync if pricing changes.
------------------------------------------------------------------- */

type ClubRemedy = {
  id: number;
  name: string;
  time: string;
  description: string;
  img: string;
};

type ClubVariant = {
  name: string;
  kicker: string;
  heroImg: string;
  heroSub: string;
  srBlurb: string;
  bookHref: string;
  stats: { value: string; label: string }[];
  circuitSub: string;
  steps: { step: string; label: string; time: string; desc: string }[];
  remedies: ClubRemedy[];
  faqs: { q: string; a: string }[];
  cardTitle: string;
  cardArea: string;
};

const CLUB_STEPS_BASE = [
  {
    step: "01",
    label: "Your Session",
    time: "75 min",
    desc: "Check in and settle into the lounge. Your session gives you the full recovery floor.",
  },
  {
    step: "02",
    label: "Sauna Time",
    time: "Up to 2 × 25 min",
    desc: "Reserve traditional or infrared cabin windows when you book your session.",
  },
];

const CLUB_VARIANTS: Record<string, ClubVariant> = {
  "denver-rino": {
    name: "The Remedy Lounge",
    kicker: "Sauna · Cold Plunge · Compression · PEMF",
    heroImg: "/assets/rino1.jpeg",
    heroSub:
      "A 75-minute self-guided recovery session. Reserve your sauna time, then move through cold plunge, compression, and PEMF at your own pace.",
    srBlurb:
      "The Remedy Lounge at Sway Wellness Club RiNo is a 75-minute self-guided recovery session combining traditional and infrared saunas, cold plunge, compression therapy, and PEMF mats. Located at 3636 Blake St in Denver's RiNo Arts District. $49 drop-in, $25 first visit for locals (code FTVORL), unlimited with the $129/month Remedy Lounge membership. Book at swaywellnessspa.com.",
    bookHref: "/locations/denver-rino/book-remedy-lounge",
    stats: [
      { value: "5", label: "Recovery Modalities" },
      { value: "75", label: "Minute Session" },
      { value: "$25", label: "First Visit \u00b7 Locals" },
      { value: "$49", label: "Drop-In" },
    ],
    circuitSub:
      "One 75-minute session, self-guided at your own pace. Reserve your sauna time; everything else is open throughout.",
    steps: [
      ...CLUB_STEPS_BASE,
      {
        step: "03",
        label: "Cold Plunge",
        time: "Open access",
        desc: "Alternate sauna heat with cold immersion at whatever pace feels right.",
      },
      {
        step: "04",
        label: "Compression + PEMF",
        time: "Included",
        desc: "Compression boots and PEMF mats are open throughout your session.",
      },
    ],
    remedies: [
      {
        id: 1,
        name: "Traditional Sauna",
        time: "Reserved window",
        description:
          "Deep dry heat therapy supporting recovery, circulation, stress relief, and overall wellness.",
        img: "/assets/rino2.jpeg",
      },
      {
        id: 2,
        name: "Infrared Sauna",
        time: "Reserved window",
        description:
          "Private infrared cabins with gentle radiant heat for a deeper, slower warm-up.",
        img: "/assets/insidesauna.jpg",
      },
      {
        id: 3,
        name: "Cold Plunge",
        time: "Open access",
        description:
          "Cold water therapy proven to elevate energy, improve mood, relieve soreness, and support immunity.",
        img: "/assets/rino1.jpeg",
      },
      {
        id: 4,
        name: "Compression Therapy",
        time: "Open access",
        description:
          "Compression therapy boosts circulation, supports lymphatic drainage, and reduces muscle soreness.",
        img: "/assets/compression_therapy.jpg",
      },
      {
        id: 5,
        name: "PEMF Mats",
        time: "Open access",
        description:
          "Pulsed electromagnetic field mats that support circulation and deep relaxation while you rest.",
        img: "/assets/pemf.jpg",
      },
    ],
    faqs: [
      {
        q: "What is the Remedy Lounge?",
        a: "The Remedy Lounge at Sway RiNo is a 75-minute self-guided recovery session combining traditional and infrared saunas, cold plunge, compression therapy, and PEMF mats. Reserve your sauna time; everything else is open throughout your visit.",
      },
      {
        q: "What's included in a session?",
        a: "Every session includes up to two 25-minute sauna reservations in a traditional or infrared cabin, plus open access to the cold plunge, compression therapy, and PEMF mats for your full 75 minutes.",
      },
      {
        q: "Do I need experience?",
        a: "No. The lounge is self-guided, and our team will walk you through the space on your first visit. Alternate heat and cold at whatever pace feels right.",
      },
      {
        q: "How much does the Remedy Lounge cost?",
        a: "Sessions are $49 for drop-in guests. Local first-time guests get their first session for $25 with code FTVORL. Remedy Lounge members enjoy unlimited sessions, and memberships are $129/month.",
      },
    ],
    cardTitle: "Sway RiNo",
    cardArea: "3636 Blake St · RiNo Arts District, Denver",
  },
  "denver-central-park": {
    name: "The Remedy Lounge",
    kicker: "Sauna · Cold Plunge · Warm Soak · Compression · PEMF",
    heroImg: "/assets/centralpark1.jpg",
    heroSub:
      "A 75-minute self-guided recovery session. Reserve your sauna time, then move through cold plunges, the warm soak, compression, and PEMF at your own pace.",
    // FTVORL-CP-PAUSE (Sept 2026): $25 first-visit mentions removed while
    // the CP cold plunge is under maintenance. Restore when back.
    srBlurb:
      "The Remedy Lounge at Sway Wellness Club Central Park is a 75-minute self-guided recovery session combining traditional and infrared saunas, cold plunges, a warm soak, compression therapy, and PEMF mats. Located at 2271 Clinton St in Aurora, minutes from Central Park. $49 drop-in, unlimited with the $129/month Remedy Lounge membership. Book at swaywellnessspa.com.",
    bookHref: "/locations/denver-central-park/book-remedy-lounge",
    stats: [
      { value: "6", label: "Recovery Modalities" },
      { value: "75", label: "Minute Session" },
      { value: "$49", label: "Drop-In Session" },
      { value: "$49", label: "Drop-In" },
    ],
    circuitSub:
      "One 75-minute session, self-guided at your own pace. Reserve your sauna time; everything else is open throughout.",
    steps: [
      ...CLUB_STEPS_BASE,
      {
        step: "03",
        label: "Cold & Warm Soak",
        time: "Open access",
        desc: "Alternate sauna heat with the cold plunges, or ease in with the warm soak.",
      },
      {
        step: "04",
        label: "Compression + PEMF",
        time: "Included",
        desc: "Compression boots and PEMF mats are open throughout your session.",
      },
    ],
    remedies: [
      {
        id: 1,
        name: "Traditional Sauna",
        time: "Reserved window",
        description:
          "Deep dry heat therapy supporting recovery, circulation, stress relief, and overall wellness.",
        img: "/assets/sauna.jpg",
      },
      {
        id: 2,
        name: "Infrared Sauna",
        time: "Reserved window",
        description:
          "Private infrared cabins with gentle radiant heat for a deeper, slower warm-up.",
        img: "/assets/insidesauna.jpg",
      },
      {
        id: 3,
        name: "Cold Plunges & Warm Soak",
        time: "Open access",
        description:
          "Cold water therapy to elevate energy and reduce soreness, plus a warm soak to ease into contrast or unwind between rounds.",
        img: "/assets/centralpark1.jpg",
      },
      {
        id: 4,
        name: "Compression Therapy",
        time: "Open access",
        description:
          "Compression therapy boosts circulation, supports lymphatic drainage, and reduces muscle soreness.",
        img: "/assets/compression_therapy.jpg",
      },
      {
        id: 5,
        name: "PEMF Mats",
        time: "Open access",
        description:
          "Pulsed electromagnetic field mats that support circulation and deep relaxation while you rest.",
        img: "/assets/pemf.jpg",
      },
    ],
    faqs: [
      {
        q: "What is the Remedy Lounge?",
        a: "The Remedy Lounge at Sway Central Park is a 75-minute self-guided recovery session combining traditional and infrared saunas, cold plunges, a warm soak, compression therapy, and PEMF mats. Reserve your sauna time; everything else is open throughout your visit.",
      },
      {
        q: "What's included in a session?",
        a: "Every session includes up to two 25-minute sauna reservations in a traditional or infrared cabin, plus open access to the cold plunges, warm soak, compression therapy, and PEMF mats for your full 75 minutes.",
      },
      {
        q: "Do I need experience?",
        a: "No. The lounge is self-guided, and our team will walk you through the space on your first visit. Alternate heat and cold at whatever pace feels right.",
      },
      {
        q: "How much does the Remedy Lounge cost?",
        a: "Sessions are $49 for drop-in guests. Remedy Lounge members enjoy unlimited sessions, and memberships are $129/month.",
      },
    ],
    cardTitle: "Sway Central Park",
    cardArea: "2271 Clinton St · Aurora, near Central Park",
  },
};

const RemedyRoomPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const servicesRef = useRef<HTMLDivElement>(null);

  const [saunaHref, setSaunaHref] = useState("/sauna");
  const [coldPlungeHref, setColdPlungeHref] = useState("/cold-plunge");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // Null = Larimer / default render (also what SEO and first paint see).
  // Set after mount from the saved nav location, same pattern as the hrefs.
  const [club, setClub] = useState<ClubVariant | null>(null);

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

    const loc = getSelectedLocation();
    if (loc?.slug && CLUB_VARIANTS[loc.slug]) {
      setClub(CLUB_VARIANTS[loc.slug]);
    }
  }, []);

  const handleScroll = () => {
    if (!servicesRef.current) return;

    const yOffset =
      servicesRef.current.getBoundingClientRect().top +
      window.scrollY -
      80;

    window.scrollTo({ top: yOffset, behavior: "smooth" });
  };

  const larimerRemedies = [
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
        "Compression therapy boosts circulation, supports lymphatic drainage, and reduces muscle soreness.",
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

  // Club cards deliberately all link to the club booking flow — the /sauna,
  // /cold-plunge, /led-light-therapy detail pages describe Larimer's spa.
  const remedies = club
    ? club.remedies.map((r) => ({ ...r, link: club.bookHref }))
    : larimerRemedies;

  const bookHref = club
    ? club.bookHref
    : "/locations/denver-larimer/book-remedy-room";

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO: art-directed background (homepage remedy photos) */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <picture className="block w-full h-full">
            {!club && (
              <source
                media="(max-width: 767px)"
                srcSet="/assets/remedyRoomMobile.jpg"
              />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={club ? club.heroImg : "/assets/homepage-remedy.jpg"}
              alt={
                club
                  ? "The Remedy Lounge at Sway Wellness Club"
                  : "The Remedy Room at Sway Wellness Spa"
              }
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-14 md:pt-48 md:pb-20 text-center">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4"
          >
            {club ? club.kicker : "Sauna · Cold Plunge · Compression · LED"}
          </motion.p>

          <SwayCurve
            width={150}
            strokeWidth={2.2}
            animate
            className="text-[#A9D2C5] mx-auto block mb-6"
          />

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.02]"
          >
            {club ? club.name : "The Remedy Room"}
          </motion.h1>

          <p className="sr-only">
            {club
              ? club.srBlurb
              : "The Remedy Room at Sway Wellness Spa is a guided 40-minute recovery circuit combining 4 evidence-based modalities: 20 minutes of sauna, 5 minutes of cold plunge, 15 minutes of compression therapy, and LED light therapy. Located at 1428 Larimer St. on Larimer Square in Denver. $25 for members, $49 drop-in. Pair with any of Sway's 18 massage types or 13 facial treatments. Open Mon–Fri 10 AM–8 PM, Sat 9 AM–6 PM, Sun 11 AM–6 PM. Book at swaywellnessspa.com or call (303) 476-6150."}
          </p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-white/85"
          >
            {club
              ? club.heroSub
              : "A guided 40-minute recovery circuit designed to restore your body and reset your nervous system."}
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
            Voted #4 Best Day Spa in America &middot; USA Today 10Best <span className="sr-only">(opens in new tab)</span>
          </motion.a>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-9 flex items-center justify-center"
          >
            <a
              href={bookHref}
              className="group relative inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-100 transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
              </span>
              {club ? "Book Remedy Lounge" : "Book Remedy Room"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-white px-6 py-8 md:py-10 border-b border-[#113D33]/8">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {(club
            ? club.stats
            : [
                { value: "4", label: "Recovery Modalities" },
                { value: "40", label: "Minute Circuit" },
                { value: "$25", label: "Member Pricing" },
                { value: "$49", label: "Drop-In" },
              ]
          ).map((s) => (
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

      {/* THE CIRCUIT: visual flow section */}
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
              {club
                ? club.circuitSub
                : "Four evidence-based modalities in one guided session. No experience needed. Just show up and follow the circuit."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(club
              ? club.steps
              : [
                  { step: "01", label: "Compression + LED", time: "15 min", desc: "Start with compression sleeves and LED light therapy working simultaneously." },
                  { step: "02", label: "Sauna", time: "20 min", desc: "Move into the sauna for deep heat therapy supporting recovery and circulation." },
                  { step: "03", label: "Cold Plunge", time: "5 min", desc: "Finish with cold water immersion to elevate energy and reduce inflammation." },
                  { step: "04", label: "Recover", time: "∞", desc: "Relax in the lounge. Pair with a massage or facial for a complete visit." },
                ]
            ).map((s, i) => (
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

      {/* TECHNOLOGIES: dark section with glass cards */}
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
            {club
              ? "Each modality is backed by science and chosen for its role in your recovery session."
              : "Each modality is backed by science and chosen for its role in the recovery circuit."}
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
                  {club ? "Book a Session" : "Learn More"}
                  <span className="sr-only"> about {remedy.name}</span>
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

          {(club ? club.faqs : [
            {
              q: "What is the Remedy Room?",
              a: "The Remedy Room is a guided 40-minute recovery circuit at Sway that combines four modalities: sauna, cold plunge, compression therapy, and LED light therapy. It's designed to restore your body and reset your nervous system in a single session.",
            },
            {
              q: "Who is the Remedy Room for?",
              a: "Anyone. Athletes use it for post-workout recovery. Remote workers use it to reset after long days. No experience needed, no special clothing required. Just show up and follow the guided circuit.",
            },
            {
              q: "What's included in a Remedy Room session?",
              a: "Every session follows a guided circuit: 15 minutes of compression therapy with LED light therapy, 20 minutes of sauna, and 5 minutes of cold plunge. Total session time is 40 minutes.",
            },
            {
              q: "Can I combine the Remedy Room with a massage or facial?",
              a: "Yes, many Sway members pair a Remedy Room session with a massage or facial for a complete wellness experience. Recovery before a massage can help your muscles release tension more effectively.",
            },
            {
              q: "How much does the Remedy Room cost?",
              a: "The Remedy Room is $49 per session for drop-in guests and just $25 for Sway members. Memberships start at $99/month and include savings on all treatments, boosts, and recovery sessions.",
            },
          ]).map((item, i) => (
            <div key={i} className="border-b border-black/10">
              <button
                aria-expanded={openFaq === i}
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

      {/* EXPLORE MORE — Larimer only: massage/facial pages describe the spa,
          and treatments haven't launched at the clubs yet. */}
      {!club && (
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
                desc: "Results-driven skincare with Eminence Organics, a dedicated Dr. Dennis Gross Vitamin C facial, and high-tech boosts.",
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
                  className="block rounded-2xl bg-[#F7F4E9] p-6 shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)] hover:shadow-[0_22px_45px_-18px_rgba(17,61,51,0.3)] hover:scale-[1.02] transition-all duration-300 group h-full"
                >
                  <h3 className="text-lg font-semibold text-[#113D33]">{s.name}</h3>
                  <p className="mt-2 text-sm text-[#113D33]/70 leading-relaxed">{s.desc}</p>
                  <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
                    Learn More<span className="sr-only"> about {s.name}</span> →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            {club ? "Book Remedy Lounge" : "Book Remedy Room at a Location"}
          </h2>
          <Link
            href={club ? club.bookHref : "/locations/denver-larimer/book-remedy-room/"}
            className="block rounded-2xl bg-white p-6 shadow-[0_10px_30px_-18px_rgba(17,61,51,0.18)] hover:shadow-[0_22px_45px_-18px_rgba(17,61,51,0.3)] hover:scale-[1.01] transition-all duration-300 group"
          >
            <p className="text-lg font-semibold text-[#113D33]">
              {club ? club.cardTitle : "Sway Larimer"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {club ? club.cardArea : "Denver, CO · Larimer Square"}
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
              Book Now →
            </span>
          </Link>
          {club && (
            <p className="mt-4 text-sm text-[#113D33]/60">
              Visiting downtown?{" "}
              <Link
                href="/locations/denver-larimer/book-remedy-room/"
                className="underline underline-offset-4 font-semibold hover:text-[#113D33]"
              >
                Explore the Remedy Room at Sway Larimer
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RemedyRoomPage;
