"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { resolveLocationHref } from "../components/LocationAwareHref";

/* ---------------- TYPES ---------------- */

type Facial = {
  id: number;
  name: string;
  subtitle?: string;
  time: string;
  price: string;
  description: string;
  img: string;
};

type FacialBoost = {
  id: number;
  name: string;
  tag: "Boost" | "Super Boost";
  description: string; // keep SHORT (1 sentence)
  price: string;
};

/* ---------------- HELPERS ---------------- */

const clampStyle = (lines: number) =>
  ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as const);

const getSafeVh = () => {
  if (typeof window === "undefined") return 700;
  const vv = window.visualViewport?.height;
  return Math.max(520, Math.floor(vv ?? window.innerHeight));
};

/* ---------------- PAGE ---------------- */

const FacialsPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const [bookHref, setBookHref] = useState("/book");

  // Facial carousel (mobile)
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Boost carousel (mobile)
  const boostScrollerRef = useRef<HTMLDivElement | null>(null);
  const [boostActiveIndex, setBoostActiveIndex] = useState(0);

  // Modal
  const [openId, setOpenId] = useState<number | null>(null);
  const [modalMaxH, setModalMaxH] = useState<number>(700);

  const facials: Facial[] = useMemo(
    () => [
      {
        id: 1,
        name: "Forever Young",
        subtitle: "Anti-Aging Facial",
        time: "50 minutes",
        price: "Member $99 | Drop-In $139",
        description:
          "Hydrates, brightens, and tightens the skin while supporting collagen production and circulation.",
        img: "/assets/facial2.jpg",
      },
      {
        id: 2,
        name: "Glow Getter",
        subtitle: "Hydration Facial",
        time: "50 minutes",
        price: "Member $99 | Drop-In $139",
        description:
          "Correcting peptides and antioxidants instantly smooth and firm for radiant, hydrated skin.",
        img: "/assets/facial3.jpg",
      },
      {
        id: 3,
        name: "Pore Perfection",
        subtitle: "Acne Facial",
        time: "50 minutes",
        price: "Member $99 | Drop-In $139",
        description:
          "Targets congestion, bacteria, and inflammation for clearer, healthier skin.",
        img: "/assets/facial4.jpg",
      },
      {
        id: 4,
        name: "Sensitive Silk",
        subtitle: "Soothing Facial",
        time: "50 minutes",
        price: "Member $99 | Drop-In $139",
        description:
          "Calms redness, strengthens the skin barrier, and supports sensitive skin types.",
        img: "/assets/facial5.jpg",
      },
      {
        id: 5,
        name: "Dr. Dennis Gross Vitamin C",
        subtitle: "Sway Spotlight Facial",
        time: "50 minutes",
        price: "Member $99 | Drop-In $139",
        description:
          "A brightening facial powered by Vitamin C to improve tone, clarity, and radiance.",
        img: "/assets/facial6.jpg",
      },
    ],
    []
  );

  // Super Boosts first (scan order), Microcurrent immediately after
  const boosts: FacialBoost[] = useMemo(
    () => [
      {
        id: 2,
        name: "LED Light Therapy",
        tag: "Super Boost",
        description: "Targets acne, redness, and inflammation for calmer, clearer skin.",
        price: "Member $50 | Drop-In $100",
      },
      {
        id: 1,
        name: "Microcurrent",
        tag: "Super Boost",
        description: "Tones, lifts, and supports collagen for an instantly sculpted look.",
        price: "Member $50 | Drop-In $100",
      },
      {
        id: 3,
        name: "Hydraderm",
        tag: "Boost",
        description: "Diamond microderm + serums for smoother texture and brighter tone.",
        price: "Member $50 | Drop-In $60",
      },
      {
        id: 4,
        name: "Dermaflash",
        tag: "Boost",
        description: "Exfoliates dead skin and removes peach fuzz for instant glow.",
        price: "Member $50 | Drop-In $60",
      },
      {
        id: 5,
        name: "Peel",
        tag: "Boost",
        description: "Refines pores, evens tone, and supports collagen for clearer skin.",
        price: "Member $50 | Drop-In $60",
      },
      {
        id: 6,
        name: "Oxygen Infusion",
        tag: "Boost",
        description: "Boosts hydration and helps active serums absorb more deeply.",
        price: "Member $50 | Drop-In $60",
      },
    ],
    []
  );

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";

    const resolved = resolveLocationHref({
      localPath: "/facials",
      fallbackHref: "/book",
    });

    setBookHref(resolved);
  }, []);

  // Modal max height that won't get hidden under iOS address bar / nav
  useEffect(() => {
    const update = () => setModalMaxH(getSafeVh());
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update as any);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId]);

  // Sync activeIndex (facials carousel)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      if (!cards.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll as any);
  }, []);

  // Sync activeIndex (boosts carousel)
  useEffect(() => {
    const el = boostScrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-boost-card]"));
      if (!cards.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setBoostActiveIndex(bestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll as any);
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const target = cards[idx];
    if (!target) return;

    el.scrollTo({
      left: target.offsetLeft - 16,
      behavior: "smooth",
    });
  };

  const scrollBoostToIndex = (idx: number) => {
    const el = boostScrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-boost-card]"));
    const target = cards[idx];
    if (!target) return;

    el.scrollTo({
      left: target.offsetLeft - 16,
      behavior: "smooth",
    });
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(facials.length - 1, activeIndex + 1));

  const prevBoost = () => scrollBoostToIndex(Math.max(0, boostActiveIndex - 1));
  const nextBoost = () =>
    scrollBoostToIndex(Math.min(boosts.length - 1, boostActiveIndex + 1));

  const activeFacial = openId ? facials.find((f) => f.id === openId) : null;

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO */}
      <section className="bg-[#B6CFBF]">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-14 md:pt-48 md:pb-20 text-center">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[#113D33] text-5xl md:text-7xl font-light tracking-tight"
          >
            Facial Experiences
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-[#113D33] opacity-90"
          >
            Personalized, results-driven facials designed to support healthy, radiant skin —
            customized by your esthetician.
          </motion.p>

          <div className="mt-9 flex items-center justify-center">
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-[#113D33] text-white px-8 py-4 text-[15px] font-bold rounded-xl hover:bg-[#0a2b23] transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE / TABLET: facial swipe carousel */}
      <section className="lg:hidden">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div>
            <h2 className="text-[#113D33] text-2xl font-semibold">Choose your facial</h2>
            <p className="mt-1 text-[#113D33] opacity-75">
              Swipe to browse. Tap “Customize” for high-tech upgrades and boosts.
            </p>
          </div>

          <div
            ref={scrollerRef}
            className="mt-6 flex gap-4 overflow-x-auto pb-3"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            aria-label="Facial experiences carousel"
          >
            <div className="shrink-0 w-2" aria-hidden />
            {facials.map((f) => (
              <div
                key={f.id}
                data-card
                className="shrink-0"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="w-[78vw] max-w-[360px] h-[540px] bg-white rounded-2xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
                  <div className="relative w-full h-[230px]">
                    <Image
                      src={f.img}
                      alt={f.name}
                      fill
                      sizes="(max-width: 1024px) 78vw, 360px"
                      className="object-cover"
                      priority={f.id === 1}
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="min-h-[102px]">
                      <h3 className="text-[#113D33] text-xl font-bold leading-tight">
                        {f.name}
                      </h3>
                      {f.subtitle && (
                        <p className="text-sm text-black/60 mt-1">{f.subtitle}</p>
                      )}
                      <p className="text-sm text-black/60 mt-1">{f.time}</p>
                      <p className="text-sm text-black/70 mt-1">{f.price}</p>
                    </div>

                    <p className="mt-3 text-[15px] text-black/75 leading-relaxed" style={clampStyle(4)}>
                      {f.description}
                    </p>

                    <div className="mt-auto pt-5 flex items-center justify-between">
                      <button
                        onClick={() => setOpenId(f.id)}
                        className="text-[#113D33] font-semibold text-sm underline underline-offset-4 hover:opacity-80"
                      >
                        Customize
                      </button>

                      <Link
                        href={bookHref}
                        className="inline-flex items-center justify-center bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition-all"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-2" aria-hidden />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-label="Carousel pagination">
              {facials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeIndex ? "w-8 bg-[#113D33]" : "w-2.5 bg-[#113D33]/25"
                  }`}
                  aria-label={`Go to item ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                className="h-11 w-11 rounded-full border border-[#113D33]/20 bg-white text-[#113D33] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={next}
                disabled={activeIndex === facials.length - 1}
                className="h-11 w-11 rounded-full border border-[#113D33]/20 bg-white text-[#113D33] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={bookHref}
              className="w-full inline-flex items-center justify-center bg-[#113D33] text-white px-8 py-4 text-[15px] font-bold rounded-2xl hover:bg-[#0a2b23] transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </div>
        </div>
      </section>

      {/* DESKTOP: facial grid */}
      <section className="hidden lg:block">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-[#113D33] text-3xl font-semibold">Facial menu</h2>
                <p className="mt-2 text-[#113D33] opacity-75 max-w-2xl">
                  Targeted, skin-supportive treatments tailored to your goals and skin type. Click “Customize” to explore add-ons and
                enhancements.
                </p>
              </div>
              <Link
                href={bookHref}
                className="inline-flex items-center justify-center bg-[#113D33] text-white px-7 py-3 text-[15px] font-bold rounded-xl hover:bg-[#0a2b23] transition-all shadow-lg"
              >
                Continue to Booking
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 xl:grid-cols-3 gap-8">
              {facials.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-2xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)] transition-shadow"
                >
                  <div className="relative w-full h-[220px]">
                    <Image
                      src={f.img}
                      alt={f.name}
                      fill
                      sizes="(min-width: 1280px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-[#113D33] text-xl font-bold">{f.name}</h3>
                    {f.subtitle && <p className="mt-1 text-sm text-black/60">{f.subtitle}</p>}

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-black/60">
                      <span>{f.time}</span>
                      <span className="text-black/25">•</span>
                      <span className="text-black/70">{f.price}</span>
                    </div>

                    <p className="mt-3 text-[15px] text-black/75 leading-relaxed">
                      {f.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={() => setOpenId(f.id)}
                        className="text-[#113D33] font-semibold text-sm underline underline-offset-4 hover:opacity-80"
                      >
                        Customize
                      </button>

                      <Link
                        href={bookHref}
                        className="inline-flex items-center justify-center bg-[#113D33] text-white px-4 py-2 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition-all"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Link
                href={bookHref}
                className="inline-flex items-center justify-center bg-[#113D33] text-white px-10 py-4 text-[15px] font-bold rounded-2xl hover:bg-[#0a2b23] transition-all shadow-lg"
              >
                Continue to Booking
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOSTS SECTION (mobile swipe, desktop grid) */}
      <section className="bg-[#B6CFBF]/35">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-[#113D33] text-3xl md:text-4xl font-light tracking-tight">
              Make it High Tech & Add a Boost
            </h2>
            <p className="mt-3 text-[#113D33] opacity-75 max-w-3xl mx-auto">
              Boosts are optional enhancements available during booking in Mindbody.
            </p>
          </div>

          {/* MOBILE: Boost swipe */}
          <div className="lg:hidden mt-10">
            <div
              ref={boostScrollerRef}
              className="flex gap-4 overflow-x-auto pb-3"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
              aria-label="Facial boosts carousel"
            >
              <div className="shrink-0 w-2" aria-hidden />
              {boosts.map((b) => (
                <div
                  key={b.id}
                  data-boost-card
                  className="shrink-0"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <div className="w-[78vw] max-w-[360px] h-[320px] bg-white rounded-2xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[#113D33] text-lg font-bold leading-tight">
                          {b.name}
                        </h3>
                        <span
                          className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                            b.tag === "Super Boost"
                              ? "bg-[#113D33] text-white"
                              : "bg-[#113D33]/15 text-[#113D33]"
                          }`}
                        >
                          {b.tag}
                        </span>
                      </div>

                      <p className="mt-3 text-[15px] text-black/75 leading-relaxed" style={clampStyle(3)}>
                        {b.description}
                      </p>

                      <div className="mt-auto pt-5">
                        <p className="text-sm text-black/60">{b.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-2" aria-hidden />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" aria-label="Boost carousel pagination">
                {boosts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollBoostToIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === boostActiveIndex ? "w-8 bg-[#113D33]" : "w-2.5 bg-[#113D33]/25"
                    }`}
                    aria-label={`Go to boost ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevBoost}
                  disabled={boostActiveIndex === 0}
                  className="h-11 w-11 rounded-full border border-[#113D33]/20 bg-white text-[#113D33] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                  aria-label="Previous boost"
                >
                  ‹
                </button>
                <button
                  onClick={nextBoost}
                  disabled={boostActiveIndex === boosts.length - 1}
                  className="h-11 w-11 rounded-full border border-[#113D33]/20 bg-white text-[#113D33] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                  aria-label="Next boost"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP: Boost grid */}
          <div className="hidden lg:grid mt-12 grid-cols-2 xl:grid-cols-3 gap-6">
            {boosts.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)] transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[#113D33] text-lg font-bold leading-tight">
                    {b.name}
                  </h3>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                      b.tag === "Super Boost"
                        ? "bg-[#113D33] text-white"
                        : "bg-[#113D33]/15 text-[#113D33]"
                    }`}
                  >
                    {b.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm text-black/75 leading-relaxed">{b.description}</p>
                <p className="mt-5 text-sm text-black/60">{b.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-[#113D33] text-white px-10 py-4 text-[15px] font-bold rounded-2xl hover:bg-[#0a2b23] transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-vance-bold text-[#113D33] mb-8">
            Book a Facial at a Location
          </h2>
          <Link
            href="/locations/denver-larimer/facials/"
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

      {/* CUSTOMIZE MODAL (scrollable, compact) */}
      {activeFacial && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Facial customize"
        >
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
            onClick={() => setOpenId(null)}
          />
          <div
            className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-black/5 overflow-hidden flex flex-col"
            style={{ maxHeight: Math.floor(modalMaxH * 0.88) }}
          >

            {/* header */}
            <div className="p-6 sm:p-7 border-b border-black/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[#113D33] text-2xl font-bold leading-tight">
                    {activeFacial.name}
                  </h3>
                  {activeFacial.subtitle && (
                    <p className="mt-1 text-sm text-black/60">{activeFacial.subtitle}</p>
                  )}
                  <p className="mt-1 text-sm text-black/60">
                    {activeFacial.time} • {activeFacial.price}
                  </p>
                </div>

                <button
                  onClick={() => setOpenId(null)}
                  className="h-10 w-10 rounded-full border border-black/10 text-black/70 hover:bg-black/5 active:scale-[0.98]"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <p className="mt-4 text-[15px] text-black/80 leading-relaxed" style={clampStyle(3)}>
                {activeFacial.description}
              </p>
            </div>

            {/* scrollable content */}
            <div className="px-6 sm:px-7 py-6 overflow-y-auto flex-1 min-h-0">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h4 className="text-[#113D33] text-lg font-semibold">
                    High-tech boosts
                  </h4>
                  <p className="mt-1 text-sm text-black/60">
                    Add these during booking in Mindbody.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {boosts.map((b) => (
                  <div key={b.id} className="rounded-2xl border border-black/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[#113D33] font-bold leading-tight">{b.name}</p>
                        <p className="mt-1 text-xs text-black/60">{b.price}</p>
                      </div>
                      <span
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${
                          b.tag === "Super Boost"
                            ? "bg-[#113D33] text-white"
                            : "bg-[#113D33]/15 text-[#113D33]"
                        }`}
                      >
                        {b.tag}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-black/75 leading-relaxed" style={clampStyle(2)}>
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={bookHref}
                  className="inline-flex items-center justify-center bg-[#113D33] text-white px-6 py-3 text-[15px] font-bold rounded-2xl hover:bg-[#0a2b23] transition-all"
                >
                  Continue to Booking
                </Link>
                <button
                  onClick={() => setOpenId(null)}
                  className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-bold rounded-2xl border border-[#113D33]/20 text-[#113D33] hover:bg-[#113D33]/5 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacialsPage;
