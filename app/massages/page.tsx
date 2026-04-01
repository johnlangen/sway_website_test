"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { resolveLocationHref } from "../components/LocationAwareHref";

/* ---------------- TIER DATA ---------------- */

type Treatment = { name: string; duration: string; description: string };

type MassageTier = {
  key: string;
  name: string;
  treatments: Treatment[];
};

const massageTiers: MassageTier[] = [
  {
    key: "essential",
    name: "Essential",
    treatments: [
      {
        name: "Signature Massage",
        duration: "50 min",
        description:
          "A foundational full-body massage tailored to your needs. Ideal for relaxation, tension relief, and overall wellness.",
      },
      {
        name: "Maternity Massage",
        duration: "50 min",
        description:
          "A gentle, nurturing massage designed for expectant mothers. Eases tension, reduces swelling, and promotes relaxation.",
      },
    ],
  },
  {
    key: "premier",
    name: "Premier",
    treatments: [
      {
        name: "Signature Massage",
        duration: "70 min",
        description:
          "An extended full-body massage with your choice of aromatic massage lotion for a deeply relaxing, personalized experience.",
      },
      {
        name: "Maternity Massage",
        duration: "70 min",
        description:
          "Extended prenatal massage with extra time to address the unique needs of expectant mothers.",
      },
      {
        name: "Deep Tissue Massage",
        duration: "50 min",
        description:
          "Corrective massage designed to release deep muscle tension, relieve pain, and restore mobility.",
      },
      {
        name: "Salt Stone Massage",
        duration: "50 min",
        description:
          "Warm Himalayan salt stones help melt tension, improve circulation, and promote deep relaxation.",
      },
      {
        name: "Sports Massage",
        duration: "50 min",
        description:
          "Ideal for active lifestyles. Supports recovery, improves range of motion, and reduces muscle fatigue.",
      },
      {
        name: "Lymphatic Drainage Massage",
        duration: "50 min",
        description:
          "Gentle rhythmic techniques stimulate lymph flow, reduce swelling, and support natural detoxification.",
      },
    ],
  },
  {
    key: "ultimate",
    name: "Ultimate",
    treatments: [
      {
        name: "Signature Massage",
        duration: "90 min",
        description:
          "Our longest full-body massage. Long fluid movements grace the body, gently stretching muscles and relieving tension for total relaxation.",
      },
      {
        name: "Deep Tissue Massage",
        duration: "70 min",
        description:
          "Extended deep tissue work to release tension, knots, and rebalance muscles for full recovery.",
      },
      {
        name: "Salt Stone Massage",
        duration: "70 min",
        description:
          "Extended warm salt stone therapy that deeply penetrates tense muscles, releasing toxins and restoring balance.",
      },
      {
        name: "Sports Massage",
        duration: "70 min",
        description:
          "Extended sports therapy with stretching and deep kneading to ease tension, stimulate healing, and speed recovery.",
      },
      {
        name: "Lymphatic Drainage Massage",
        duration: "70 min",
        description:
          "Extended lymphatic therapy for deeper detoxification, reduced inflammation, and enhanced immune support.",
      },
    ],
  },
];

/* ---------------- BOOSTS DATA ---------------- */

type BoostColumn = {
  tier: string;
  memberPrice: string;
  dropInPrice: string;
  timeNote: string;
  items: string[];
};

const massageBoostColumns: BoostColumn[] = [
  {
    tier: "Boost",
    memberPrice: "$10",
    dropInPrice: "$20 Drop-In",
    timeNote: "No Time Added",
    items: ["CauseMedic CBD Boost", "Cupping Boost", "PEMF Recovery Boost"],
  },
  {
    tier: "Boost Plus",
    memberPrice: "$20",
    dropInPrice: "$40 Drop-In",
    timeNote: "Adds 10 Min",
    items: ["CauseMedic CBD Boost Plus", "Cupping Boost Plus"],
  },
];

/* ---------------- PAGE ---------------- */

const MassagesPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const [bookHref, setBookHref] = useState("/book");
  const [selectedTier, setSelectedTier] = useState("premier");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeTier = massageTiers.find((t) => t.key === selectedTier)!;

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#F7F4E9";
    document.body.style.backgroundColor = "#F7F4E9";

    const resolved = resolveLocationHref({
      localPath: "/massage",
      fallbackHref: "/book",
    });

    setBookHref(resolved);
  }, []);

  return (
    <div className="w-full bg-[#F7F4E9] font-vance">
      {/* HERO */}
      <section className="bg-[#113D33]">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-14 md:pt-48 md:pb-20 text-center">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-white text-5xl md:text-7xl font-light tracking-tight"
          >
            Massage Experiences
          </motion.h1>

          <p className="sr-only">
            Sway Wellness Spa offers massage treatments at 1428 Larimer St. in
            Denver across three tiers: Essential (Signature and Maternity
            Massage), Premier (Signature, Maternity, Deep Tissue, Salt Stone,
            Sports, and Lymphatic Drainage), and Ultimate (extended duration
            versions of Signature, Deep Tissue, Salt Stone, Sports, and
            Lymphatic Drainage). Enhance any massage with boosts: CauseMedic
            CBD, Cupping, and PEMF Recovery — members save 50%. Open Mon–Fri
            10 AM–8 PM, Sat 9 AM–6 PM, Sun 11 AM–6 PM. Book online at
            swaywellnessspa.com or call (303) 476-6150.
          </p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-white/85"
          >
            A curated selection of massage experiences designed to release
            tension held in the body, leaving you feeling restored.
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
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-4 text-[15px] font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          MASSAGE MENU — Tier toggle + treatment list
      ============================================================ */}
      <section className="bg-[#F7F4E9] px-4 sm:px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl border border-[#113D33]/10 shadow-sm overflow-hidden">
              {/* Header bar */}
              <div className="bg-[#F7F4E9] px-6 py-5 border-b border-[#113D33]/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-[#113D33] text-2xl font-semibold">
                      Massage menu
                    </h2>
                    <p className="mt-1 text-sm text-[#113D33]/60">
                      A curated selection of massage experiences, each
                      customized by your therapist.
                    </p>
                  </div>
                  <Link
                    href={bookHref}
                    className="inline-flex items-center justify-center bg-[#113D33] text-white px-6 py-2.5 text-sm font-bold rounded-xl hover:bg-[#0a2b23] transition-all shrink-0"
                  >
                    Continue to Booking
                  </Link>
                </div>
              </div>

              {/* Tier toggle */}
              <div className="px-6 pt-5">
                <div className="inline-flex bg-[#113D33]/10 rounded-full p-1 gap-0.5">
                  {massageTiers.map((tier) => (
                    <button
                      key={tier.key}
                      onClick={() => setSelectedTier(tier.key)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        selectedTier === tier.key
                          ? "bg-[#113D33] text-white shadow-sm"
                          : "text-[#113D33]/60 hover:text-[#113D33]"
                      }`}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatment list */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTier}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {activeTier.treatments.map((t, idx) => (
                      <div
                        key={idx}
                        className="border border-[#113D33]/8 rounded-xl p-4 hover:border-[#113D33]/15 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[#113D33] font-bold text-base">
                            {t.name}
                          </h3>
                          <span className="text-xs text-[#113D33]/50 shrink-0 mt-0.5">
                            {t.duration}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-[#113D33]/65 leading-relaxed">
                          {t.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          BOOSTS — 2 columns (Boost / Boost Plus)
      ============================================================ */}
      <section className="bg-[#113D33] overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#9ABFB3] mb-3">
              Wellness Boosts : Save 50% on Any Boost
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight">
              Elevate Your Massage
            </h2>
            <p className="mt-3 text-white/55 max-w-2xl mx-auto">
              Add a boost during checkout for deeper focus and faster recovery —
              members save 50% on every add-on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {massageBoostColumns.map((col, i) => (
              <motion.div
                key={col.tier}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/[0.07] border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-white text-xl font-bold uppercase tracking-wide">
                  {col.memberPrice} {col.tier}
                </h3>
                <p className="text-sm text-white/40 mt-1">{col.dropInPrice}</p>
                <p className="text-sm text-[#9ABFB3] mt-3 font-semibold">
                  {col.timeNote}
                </p>
                <ul className="mt-4 space-y-2">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-white/70 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={bookHref}
              className="inline-flex items-center justify-center bg-white text-[#113D33] px-10 py-4 text-[15px] font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg"
            >
              Continue to Booking
            </Link>
          </div>
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
              q: "What makes Sway\u2019s massages different?",
              a: "Sway\u2019s massage therapists combine traditional hands-on techniques with modern wellness technology. You can add science-backed boosts like PEMF mats for deeper recovery or cupping for targeted tension release. After your session, the Remedy Room (sauna, cold plunge, Normatec compression) and result-driven facials with Eminence Organics are all available under one roof.",
            },
            {
              q: "What are the massage membership tiers?",
              a: "Essential ($99/mo) includes Signature and Maternity Massage at 50 minutes. Premier ($129/mo) adds Deep Tissue, Salt Stone, Sports, and Lymphatic Drainage, plus extends Signature and Maternity to 70 minutes. Ultimate ($159/mo) extends all advanced massages to 70 minutes and Signature to 90 minutes.",
            },
            {
              q: "Can I add anything to my massage?",
              a: "Yes. Choose from CauseMedic CBD, Cupping, and PEMF Recovery boosts (no extra time), or Plus versions of CBD and Cupping that add 10 minutes. Members save 50% on all boosts.",
            },
            {
              q: "How long is a massage session?",
              a: "Durations vary by tier: Essential massages are 50 minutes, Premier offers 50\u201370 minutes depending on the treatment, and Ultimate massages are 70\u201390 minutes.",
            },
            {
              q: "Do I need a membership to book a massage?",
              a: "No, anyone can book a massage at Sway at drop-in pricing. Members save on every visit and get 50% off boosts. Memberships start at $99/month.",
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
                name: "Facials",
                desc: "Result-driven skincare with Eminence Organics, Dr. Dennis Gross, and high-tech boosts.",
                href: "/facials",
              },
              {
                name: "Remedy Room",
                desc: "Sauna, cold plunge, compression, and LED light therapy in a 40-minute recovery circuit.",
                href: "/remedy-tech",
              },
              {
                name: "Aescape Robot Massage",
                desc: "AI-powered precision massage with personalized pressure mapping.",
                href: "/aescape",
              },
            ].map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="block rounded-2xl border border-[#113D33]/10 bg-[#F7F4E9] p-6 hover:shadow-md hover:border-[#113D33]/25 transition-all group"
              >
                <h3 className="text-lg font-semibold text-[#113D33]">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-[#113D33]/70 leading-relaxed">
                  {s.desc}
                </p>
                <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            Book a Massage at a Location
          </h2>
          <Link
            href="/locations/denver-larimer/massage/"
            className="block rounded-2xl border border-[#113D33]/15 bg-white p-6 hover:shadow-lg hover:border-[#113D33]/30 transition-all group"
          >
            <p className="text-lg font-semibold text-[#113D33]">
              Sway Larimer
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Denver, CO — Larimer Square
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-[#113D33] group-hover:underline">
              Book Now &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MassagesPage;
