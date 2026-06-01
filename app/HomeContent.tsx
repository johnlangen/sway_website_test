"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import VideoBackground from "./components/VideoBackground";
import GoogleReviews from "./components/GoogleReviews";
import ChapterRail from "./components/ChapterRail";
import { SwayCurve } from "./components/SwayCurve";
import Image from "next/image";
import Link from "next/link";

/* ---------------------------------------------
   DATA
--------------------------------------------- */

const SERVICES = [
  {
    title: "Massage",
    tagline: "Deep Tissue, Sports, CBD & more",
    description:
      "Expert therapists blend traditional techniques like deep tissue, cupping, and salt stone with recovery tools like PEMF mats. 50–90 minutes, fully customized.",
    price: "From $139",
    memberPrice: "From $99",
    image: "/assets/homepage-massage.jpg",
    mobileImage: null,
    bookHref: "/locations/denver-larimer/book?category=massage",
    learnHref: "/massages",
  },
  {
    title: "Facials",
    tagline: "Forever Young, Glow Getter & more",
    description:
      "Eminence Organics across the facial menu, plus a dedicated Dr. Dennis Gross Vitamin C option. Add LED, microcurrent, or oxygen infusion boosts.",
    price: "From $139",
    memberPrice: "From $99",
    image: "/assets/facialExperiences.jpg",
    mobileImage: "/assets/facialExperiencesMobile.jpg",
    bookHref: "/locations/denver-larimer/book?category=facial",
    learnHref: "/facials",
  },
  {
    title: "Remedy Room",
    tagline: "Sauna + cold plunge recovery",
    description:
      "Sauna, cold plunge, compression therapy, and LED light therapy. Four evidence-based modalities in one 40-minute guided circuit.",
    price: "$49",
    memberPrice: "$25",
    image: "/assets/homepage-remedy.jpg",
    mobileImage: "/assets/remedyRoomMobile.jpg",
    bookHref: "/locations/denver-larimer/book-remedy-room",
    learnHref: "/remedy-tech",
  },
  {
    title: "Aescape",
    tagline: "AI-powered precision massage",
    description:
      "AI body mapping with dual robotic arms delivers personalized pressure and real-time muscle detection. Sessions 15 to 60 minutes.",
    price: "From $49",
    memberPrice: null,
    image: "/assets/aescapeblog6.jpg",
    mobileImage: "/assets/aescapeMobile.jpg",
    bookHref: "/locations/denver-larimer/book-aescape",
    learnHref: "/aescape",
  },
] as const;

const PRICING_CARDS = [
  {
    title: "Facial",
    items: ["Forever Young", "Glow Getter", "Pore Perfection", "Sensitive Silk"],
    memberPrice: "From $99",
    dropInPrice: "From $139",
    duration: "30–60 min",
    boosts: [
      { label: "Boost", member: "$10", dropIn: "$20" },
      { label: "Boost Plus", member: "$20", dropIn: "$40" },
      { label: "Boost Pro", member: "$25", dropIn: "$50" },
    ],
  },
  {
    title: "Massage",
    items: ["Deep Tissue", "Sports", "Salt Stone", "CBD"],
    memberPrice: "From $99",
    dropInPrice: "From $139",
    duration: "50–90 min",
    boosts: [
      { label: "Boost", member: "$10", dropIn: "$20" },
      { label: "Boost Plus", member: "$20", dropIn: "$40" },
      { label: "Boost Pro", member: "$25", dropIn: "$50" },
    ],
  },
  {
    title: "Remedy Room",
    items: ["Cold Plunge", "Sauna", "Light Therapy", "Lymphatic Boots"],
    memberPrice: "$25",
    dropInPrice: "$49",
    duration: "40 min",
    boosts: [],
  },
  {
    title: "Aescape",
    items: ["AI Body Mapping", "Personalized Pressure", "Full Body", "Targeted Areas"],
    memberPrice: null,
    dropInPrice: "From $49",
    duration: "15–60 min",
    boosts: [],
  },
] as const;

const CONNECT_ITEMS = [
  {
    image: "/assets/homepage_photo13.jpg",
    label: "@SWAYWELLNESSCLUB",
    href: "https://www.instagram.com/swaywellnessclub/",
    external: true,
  },
  {
    image: "/assets/homepage_photo11.jpg",
    label: "SWAY ON TIKTOK",
    href: "https://www.tiktok.com/@swaywellnessclub",
    external: true,
  },
  {
    image: "/assets/homepage_photo12.jpg",
    label: "IN THE PRESS",
    href: "/press",
    external: false,
  },
  {
    image: "/assets/homepage_photo14.png",
    label: "OWN A SWAY",
    href: "/own",
    external: false,
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "What is the Remedy Room?",
    a: "The Remedy Room is a guided 40-minute recovery circuit combining sauna, cold plunge, compression therapy, and LED light therapy. It's $49 per session or $25 for members.",
  },
  {
    q: "What is Aescape?",
    a: "Aescape is an AI-powered robot massage that uses body mapping and dual robotic arms to deliver personalized pressure. You control pressure, target zones, and ambience in real time. Sessions run 15 to 60 minutes.",
  },
  {
    q: "Do you offer memberships?",
    a: "Yes. Memberships start at $99/month and include massages and facials from $99 (regularly from $139) across three tiers: Essential, Premier, and Ultimate. Members also get 50% off all boosts and Remedy Room sessions, plus private lounge access and rollover credits.",
  },
  {
    q: "What should I book for a first visit?",
    a: "Most guests start with an Essential tier massage or facial (50 minutes, from $99 member / $139 drop-in). If you want recovery-focused benefits, the Remedy Room pairs well. Many members do both in one visit.",
  },
  {
    q: "How do I book?",
    a: "Book online anytime at swaywellnessspa.com or call (303) 476-6150. We recommend booking ahead during evenings and weekends.",
  },
] as const;

const PRESS_LOGOS = [
  {
    src: "/assets/usa_today.png",
    alt: "USA Today 10Best",
    href: "https://10best.usatoday.com/awards/sway-denver-colorado/",
  },
  {
    src: "/assets/tzr.png",
    alt: "The Zoe Report",
    href: "https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa",
  },
  {
    src: "/assets/post.png",
    alt: "The Denver Post",
    href: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
  },
  {
    src: "/assets/5280.jpg",
    alt: "5280 Magazine",
    href: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
  },
  {
    src: "/assets/athletech2.jpg",
    alt: "Athletech",
    href: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
  },
];

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */

// Secondary background tone — used to break up the long cream stretch.
const SAND = "#EBE4D1";

export default function HomeContent() {
  // Global cursor tracking → CSS vars on <body>. Service panels read these
  // for the warm spotlight overlay. rAF-throttled so it can't fire faster
  // than the browser can paint.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices — no cursor, no spotlight.
    if (!window.matchMedia("(hover: hover)").matches) return;

    let raf: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.body.style.setProperty("--mx", `${e.clientX}px`);
        document.body.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Console easter egg — for the curious who open dev tools.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line no-console
    console.log(
      "%cSway",
      "font-family: Georgia, serif; font-style: italic; font-size: 42px; color: #113D33; letter-spacing: -0.02em; padding: 4px 0;"
    );
    // eslint-disable-next-line no-console
    console.log(
      "%c~  pause.  breathe.  rediscover.  ~",
      "color: #4A776D; font-size: 12px; letter-spacing: 0.3em; font-family: Georgia, serif; padding: 2px 0 8px;"
    );
    // eslint-disable-next-line no-console
    console.log(
      "%cBuilt for the long pause.",
      "color: #4A776D; opacity: 0.6; font-size: 11px; padding-bottom: 4px;"
    );
  }, []);

  return (
    <>
      <ChapterRail />
      <div className="snap-container w-full overflow-hidden max-w-screen">
      {/* ======================================================
          1. Hero Video (+ scroll affordance)
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center relative">
        <h1 className="sr-only">
          Sway Wellness Spa – Modern Wellness Club in Denver
        </h1>
        <p className="sr-only">
          Sway Wellness Spa is a modern wellness club at 1428 Larimer St. on
          Larimer Square in Denver, CO. Voted #4 Best Day Spa in America by
          USA Today 10Best and Best U.S. Day Spa by TZR 2026 Readers&apos; Choice
          Awards. Sway offers 18 massage types across 3 tiers, 13 facial
          treatments across 3 tiers using 2 premium skincare brands (Eminence
          Organics, Dr. Dennis Gross), 4 recovery technologies in the Remedy
          Room, and AI-powered Aescape robot massage. Massage therapy starts
          at $99/session for members ($139 drop-in). Facials from $99 member
          ($139 drop-in). The Remedy Room 40-minute recovery circuit with
          sauna, cold plunge, compression therapy, and LED light therapy is
          $25 member ($49 drop-in). Aescape sessions from $49 (15 to 60
          minutes). Over 10 optional boost add-ons across services. Members
          save 50% on all boosts. Open Mon–Fri 10 AM–8 PM, Sat 9 AM–6 PM,
          Sun 11 AM–6 PM. Memberships from $99/month. Book online at
          swaywellnessspa.com or call (303) 476-6150.
        </p>
        <VideoBackground />

        {/* Scroll affordance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/85 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <svg
            className="w-4 h-4 scroll-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* ======================================================
          2. Brand Statement — single hook
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl text-center font-vance"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
            A Modern Wellness Club
          </div>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D]/85 mx-auto block mb-7"
          />

          <p className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] mb-10">
            Ever feel like you need an escape from the hustle and bustle of the
            city? We created a wellness club where you can{" "}
            <span className="text-[#4A776D]">pause, breathe, and rediscover</span>{" "}
            yourself.
          </p>

          <a
            href="https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#113D33]/70 border border-[#113D33]/20 rounded-full px-4 py-1.5 mb-8 hover:border-[#113D33]/40 transition"
          >
            Voted Best U.S. Day Spa &middot; TZR Readers&apos; Choice
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/offers"
              className="group relative bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-[#113D33]" />
              </span>
              New Guest Offer
            </Link>
            <Link
              href="/membership"
              className="text-sm font-semibold text-[#113D33] underline underline-offset-4 decoration-[#113D33]/30 hover:decoration-[#113D33] transition"
            >
              Explore Membership
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          3. In the Press — pull quote + logo strip
          ====================================================== */}
      <section
        className="snap-section h-screen flex items-center justify-center text-[#113D33] px-6"
        style={{ backgroundColor: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-4xl text-center font-vance"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-[#4A776D] mb-3">
            In the press
          </div>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D]/85 mx-auto block mb-8"
          />

          <blockquote className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-5 max-w-3xl mx-auto font-semibold">
            <span className="text-[#4A776D]/60">&ldquo;</span>
            #4 Best Day Spa in America.
            <span className="text-[#4A776D]/60">&rdquo;</span>
          </blockquote>
          <p className="text-sm md:text-base text-[#4A776D] italic mb-14">
            USA Today 10Best
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-7 max-w-4xl mx-auto">
            {PRESS_LOGOS.map((logo) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={48}
                  className="h-7 md:h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          4a–4d. Services — full-bleed TikTok-style frames
          ====================================================== */}
      {SERVICES.map((service, i) => {
        const isDarkVibe = service.title === "Aescape";
        // Alternate caption anchor (bottom-left vs upper-left) so the four
        // frames don't read as one repeated template. Never bottom-right:
        // that corner holds the persistent Bowtie chat widget.
        const captionTop = i % 2 === 1;
        return (
          <section
            key={service.title}
            className="snap-section h-screen relative overflow-hidden text-white"
          >
            {/* Background image with slow Ken Burns zoom (CSS, GPU-driven).
                <picture> serves a portrait-framed mobile image where one
                exists (Remedy Room, Aescape) — the desktop horizontal
                shots don't crop well on portrait phones. */}
            <div className="absolute inset-0 ken-burns">
              <picture className="block w-full h-full">
                {service.mobileImage && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={service.mobileImage}
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
              </picture>
            </div>

            {/* Gradient overlay for text readability */}
            <div
              className={`absolute inset-0 ${
                captionTop
                  ? isDarkVibe
                    ? "bg-gradient-to-b from-black/90 via-black/55 to-black/30"
                    : "bg-gradient-to-b from-black/85 via-black/35 to-transparent"
                  : isDarkVibe
                    ? "bg-gradient-to-t from-black/90 via-black/55 to-black/30"
                    : "bg-gradient-to-t from-black/85 via-black/35 to-transparent"
              }`}
            />

            {/* Warm cursor-following spotlight (desktop only). Reads CSS vars
                set by the global mousemove listener above. */}
            <div className="cursor-spotlight hidden md:block" aria-hidden="true" />

            {/* Chapter eyebrow — TikTok metadata pill */}
            <div className="absolute top-20 md:top-24 left-6 md:left-12 z-10">
              <div className="inline-flex items-center gap-3 text-white/95 text-[10px] uppercase tracking-[0.25em] bg-black/45 border border-white/15 px-3.5 py-2 rounded-full">
                <span className="font-semibold">0{i + 1} / 04</span>
                <span className="opacity-40">|</span>
                <span className="hidden sm:inline">{service.tagline}</span>
                <span className="sm:hidden">{service.title}</span>
              </div>
            </div>

            {/* Caption — alternates upper-left / bottom-left per frame, always
                left-aligned so it never collides with the persistent
                bottom-right chat widget (Bowtie). */}
            <div
              className={`absolute inset-x-0 z-10 px-6 md:px-12 flex justify-start ${
                captionTop ? "top-32 md:top-40" : "bottom-0 pb-14 md:pb-20"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="font-vance max-w-md text-left"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 leading-[1.02]">
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base text-white/85 mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Pricing line */}
                <div className="flex items-baseline gap-3 mb-6 text-sm">
                  <span className="font-semibold">{service.price}</span>
                  {service.memberPrice && (
                    <>
                      <span className="opacity-40">|</span>
                      <span className="text-[#A9D2C5] font-semibold">
                        {service.memberPrice} member
                      </span>
                    </>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-5">
                  <Link
                    href={service.bookHref}
                    className="bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition shadow-lg"
                  >
                    Book {service.title}
                  </Link>
                  <Link
                    href={service.learnHref}
                    className="text-sm font-medium text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition"
                  >
                    Learn more
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ======================================================
          5. Google Reviews
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-4 pt-20 md:pt-0">
        <GoogleReviews />
      </section>

      {/* ======================================================
          6. First-Time Offer
          ====================================================== */}
      <section
        className="snap-section h-screen flex items-center justify-center text-[#113D33] px-6"
        style={{ backgroundColor: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <Link
            href="/offers"
            className="group block rounded-3xl bg-[#113D33] text-white p-8 sm:p-10 md:p-14 hover:bg-[#0c2a23] transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
                  For Our Denver Neighbors
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-vance mb-3">
                  $40 Off Your First Massage or Facial
                </h2>
                <p className="text-white/75 text-sm sm:text-base max-w-lg">
                  Enjoy a 50-minute massage or facial for just $99 (regularly
                  $139). Use code <strong>FTVO40</strong>. For Denver-area locals. No membership required.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold group-hover:gap-3 transition-all">
                  Book Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ======================================================
          7. Experiences & Pricing  (deep-green bg anchors this panel —
             the white pricing cards pop against it)
          ====================================================== */}
      <section
        className="snap-section h-screen flex items-center justify-center text-[#F7F4E9] px-4 md:px-8"
        style={{ backgroundColor: "#113D33" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl font-vance"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-3">
            Experiences &amp; Pricing
          </h2>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#A9D2C5] mx-auto block mb-3"
          />
          <p className="text-center text-sm md:text-base opacity-60 mb-4 md:mb-10">
            Member pricing vs drop-in. No contracts required.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 [perspective:1200px]">
            {PRICING_CARDS.map((card, idx) => (
              // Two-element pattern (entry on outer, all visual styling on
              // inner) so framer-motion's transform animation cannot collide
              // with the CSS transition on the inner card. Pre-fix the inner
              // card was a single motion.div carrying transition-all +
              // hover:[transform:...] + a transform driven by framer-motion
              // — the conflict caused a flash when framer-motion released
              // its inline style at animation end.
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: "easeOut" }}
                viewport={{ once: true, margin: "-5%" }}
                className="[transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                style={{ willChange: "transform, opacity" }}
              >
              <div
                className="group relative rounded-2xl bg-gradient-to-b from-white to-white/60 text-[#113D33] p-3 md:p-6 flex flex-col shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)] hover:shadow-[0_28px_55px_-15px_rgba(17,61,51,0.32)] hover:[transform:translateY(-8px)_rotateX(3deg)] transition-[box-shadow,transform] duration-300 ease-out [transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] h-full"
              >
                {/* Card index — small dimensional accent */}
                <span className="absolute top-3 right-3 text-[9px] md:text-[10px] font-semibold tracking-[0.2em] text-[#113D33]/30">
                  0{idx + 1}
                </span>

                <h3 className="text-sm md:text-lg font-semibold mb-0.5">
                  {card.title}
                </h3>
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider opacity-70 mb-2 md:mb-3">
                  {card.duration}
                </p>

                {/* Treatment list */}
                <ul className="text-[11px] md:text-xs opacity-70 space-y-0.5 md:space-y-1 mb-3 md:mb-4">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span className="text-[#9ABFB3]">&#x2713;</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mt-auto space-y-1 md:space-y-1.5 pt-2 md:pt-3 border-t border-[#113D33]/10">
                  {card.memberPrice && (
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] md:text-xs opacity-60">Member</span>
                      <span className="text-sm md:text-base font-bold text-[#4A776D]">
                        {card.memberPrice}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] md:text-xs opacity-60">
                      {card.memberPrice ? "Drop-In" : "Price"}
                    </span>
                    <span className="text-sm md:text-base font-semibold">
                      {card.dropInPrice}
                    </span>
                  </div>
                </div>

                {/* Boosts — compact teaser on mobile, full breakdown on desktop */}
                {card.boosts.length > 0 && (
                  <>
                    <div className="md:hidden mt-2 pt-2 border-t border-[#113D33]/10 text-[10px] opacity-60 flex justify-between">
                      <span>Boosts</span>
                      <span>from {card.boosts[0]?.member}</span>
                    </div>
                    <div className="hidden md:block mt-3 pt-2 border-t border-[#113D33]/10 space-y-0.5">
                      {card.boosts.map((boost) => (
                        <div
                          key={boost.label}
                          className="flex justify-between text-[10px] opacity-60"
                        >
                          <span>{boost.label}</span>
                          <span>
                            {boost.member} / {boost.dropIn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 md:mt-8 flex justify-center">
            <Link
              href="/locations/denver-larimer/book"
              className="group relative bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
              </span>
              Schedule Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          8. Connect / Social
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl font-vance text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Connect with Sway
          </h2>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D]/85 mx-auto block mb-4"
          />
          <p className="text-sm md:text-base opacity-60 mb-8 md:mb-12">
            Follow along, read the press, or find us on the app.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CONNECT_ITEMS.map((item) => {
              const inner = (
                <div className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-square mb-3">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              );

              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          9. FAQ
          ====================================================== */}
      <section
        className="snap-section h-screen flex items-center justify-center text-[#113D33] px-6"
        style={{ backgroundColor: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl font-vance"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4">
            Questions, Answered
          </h2>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-[#4A776D]/85 mx-auto block mb-10"
          />


          <div>
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="border-b border-black/10 py-4 group"
              >
                <summary className="cursor-pointer font-medium flex items-center justify-between gap-4">
                  <span className="text-sm md:text-base">{item.q}</span>
                  <svg
                    className="w-4 h-4 shrink-0 opacity-40 transition-transform duration-200 group-open:rotate-45"
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
                </summary>
                <p className="mt-3 text-sm opacity-80 leading-relaxed pr-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-sm font-medium underline underline-offset-4 opacity-70 hover:opacity-100 transition"
            >
              See all FAQs
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          10. Membership CTA
          ====================================================== */}
      <section className="snap-section h-screen flex items-center justify-center bg-[#F7F4E9] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl rounded-3xl bg-[#113D33] text-white p-10 sm:p-14 text-center font-vance"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Join the Wellness Club &amp; Start Saving Today
          </h2>
          <SwayCurve
            width={160}
            strokeWidth={2.4}
            animate
            className="text-white/75 mx-auto block mb-4"
          />
          <p className="mt-2 text-white/75 max-w-lg mx-auto mb-7 text-sm md:text-base">
            Monthly treatments, half-off boosts, and exclusive perks designed
            for real life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition shadow-sm"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 sway-cta-flourish pointer-events-none">
                <SwayCurve width={40} strokeWidth={1.4} className="text-white" />
              </span>
              Become a Member
            </a>
            <Link
              href="/gift-cards"
              className="text-sm font-semibold text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition"
            >
              Gift Cards
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ======================================================
          11. Signature Signoff — closing brand moment.
              The Sway curve, the brand line, the place.
          ====================================================== */}
      <section
        className="snap-section h-screen flex flex-col items-center justify-center text-[#113D33] px-6 relative"
        style={{ backgroundColor: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <SwayCurve
            width={200}
            strokeWidth={1.5}
            animate
            className="text-[#113D33]/55 mb-10"
          />
          <p className="font-vance italic text-2xl md:text-4xl leading-[1.25] text-[#113D33] mb-7">
            Pause. Breathe. Rediscover.
          </p>
          <div className="text-xs uppercase tracking-[0.35em] text-[#4A776D]">
            Sway &nbsp;·&nbsp; Est. 2025
          </div>
        </motion.div>
      </section>
      </div>
    </>
  );
}
