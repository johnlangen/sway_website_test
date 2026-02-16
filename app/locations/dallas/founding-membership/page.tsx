"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Sparkles,
  ArrowDown,
  Trophy,
} from "lucide-react";

/* ------------------------------------------------------------------
   ANIMATED COUNTER HOOK
------------------------------------------------------------------ */

function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------ */

const memberships = [
  {
    key: "remedy" as const,
    title: "Remedy Room",
    regularPrice: "$99",
    foundingPrice: "$89",
    visits: "4 monthly visits",
    tagline: "Recovery circuit",
    description:
      "Sauna, cold plunge, red light therapy, and Normatec compression in one 40-minute session.",
    benefits: [
      "4 monthly Remedy Room visits",
      "Additional visits just $20 each",
      "$89 facials & massages",
      "50% off Boosts & Super Boosts",
    ],
    foundingPerks: [
      "Rate locked at $89/mo forever",
      "Priority booking before launch",
      "Founding member events",
    ],
  },
  {
    key: "spa" as const,
    title: "Spa Club",
    regularPrice: "$99",
    foundingPrice: "$89",
    visits: "1 facial or massage / month",
    tagline: "Full spa access",
    description:
      "Unlimited facials and massages at founding member pricing, plus exclusive perks and the member lounge.",
    mostPopular: true,
    benefits: [
      "1 facial or massage included",
      "Unlimited treatments at $89 each",
      "50% off Remedy Room",
      "50% off Boosts & Super Boosts",
      "Member lounge access",
      "Bring a friend at member pricing",
      "10% off retail products",
      "Unused credits roll over",
    ],
    foundingPerks: [
      "Rate locked at $89/mo forever",
      "Priority booking before launch",
      "Founding member events",
      "Complimentary guest pass monthly",
    ],
  },
  {
    key: "aescape" as const,
    title: "Aescape Robot",
    regularPrice: "$99",
    foundingPrice: "$89",
    visits: "2 × 60-min sessions / month",
    tagline: "AI-powered massage",
    description:
      "Personalized pressure mapping, real-time muscle detection — the future of massage, tailored to your body.",
    benefits: [
      "2 monthly 60-min sessions",
      "Real-time muscle mapping",
      "Personalized pressure zones",
      "Private, consistent sessions",
    ],
    foundingPerks: [
      "Rate locked at $89/mo forever",
      "First in line when Aescape arrives",
      "Founding member events",
    ],
  },
];

const pressLogos = [
  {
    src: "/assets/tzr.png",
    alt: "The Zoe Report",
    href: "https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa",
  },
  {
    src: "/assets/salontoday.png",
    alt: "Salon Today",
    href: "https://www.bluetoad.com/publication/?i=854210&p=8&view=issueViewer",
  },
  {
    src: "/assets/post.png",
    alt: "The Denver Post",
    href: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
  },
  {
    src: "/assets/athletech2.jpg",
    alt: "Athletech",
    href: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
  },
  {
    src: "/assets/5280.jpg",
    alt: "5280 Magazine",
    href: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
  },
  {
    src: "/assets/dbj.jpg",
    alt: "Denver Business Journal",
    href: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
  },
  {
    src: "/assets/yoga.jpg",
    alt: "Yoga + Life",
    href: "https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/",
  },
];

const testimonials = [
  {
    quote:
      "Sway is where it's at. It's like a cooler, truly wellness based spa. The membership is 100% worth it. I can't wait to keep coming here.",
    name: "Maddie B.",
    location: "Denver Member",
  },
  {
    quote:
      "I'm obsessed with this spa! Everyone is so kind and welcoming, and the whole place feels clean, calming, and luxurious without being pretentious.",
    name: "Destiny A.",
    location: "Denver",
  },
  {
    quote:
      "This was my first time getting a massage and it couldn't have been a better experience. The ambience was perfect and every detail was spot on!",
    name: "Bradford R.",
    location: "Denver",
  },
];

const treatments = [
  {
    image: "/assets/massage3.jpg",
    title: "Massage",
    tagline: "Deeply Effective",
    items: [
      { name: "Deep Tissue", time: "50 min" },
      { name: "Sports Recovery", time: "50 min" },
      { name: "CBD Recovery", time: "50 min" },
      { name: "Himalayan Salt Stone", time: "50 min" },
    ],
  },
  {
    image: "/assets/facial5.jpg",
    title: "Facials",
    tagline: "Targeted Results",
    items: [
      { name: "Forever Young Anti-Aging", time: "50 min" },
      { name: "Pore Perfection", time: "50 min" },
      { name: "Vitamin C Glow", time: "50 min" },
      { name: "Glow Getter Brightening", time: "50 min" },
    ],
  },
  {
    image: "/assets/cold_plunge.jpg",
    title: "Remedy Room",
    tagline: "40-Min Recovery Circuit",
    items: [
      { name: "Sauna", time: "20 min" },
      { name: "Cold Plunge", time: "5 min" },
      { name: "Compression Therapy", time: "15 min" },
      { name: "LED Light Therapy", time: "15 min" },
    ],
  },
  {
    image: "/assets/aescapeblog6.jpg",
    title: "Aescape",
    tagline: "AI-Powered Robot Massage",
    items: [
      { name: "Full Body Precision", time: "60 min" },
      { name: "Targeted Recovery", time: "30 min" },
      { name: "Express Reset", time: "15 min" },
    ],
  },
];

const faqs = [
  {
    question: "When does Sway Dallas open?",
    answer:
      "We're planning to open in the Knox/Henderson neighborhood. Founding members will be the first to know the exact date and will get priority access to book before we open to the public.",
  },
  {
    question: "Do I get charged before you open?",
    answer:
      "No. Your membership doesn't start billing until we open. You lock in the rate now, but pay nothing until doors open.",
  },
  {
    question: "Is the founding rate really locked in forever?",
    answer:
      "Yes. As long as your membership stays active, your $89/month founding rate never increases — even when regular pricing goes up.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. No long-term contracts. Cancel anytime after your first month — no fees, no penalties.",
  },
  {
    question: "What makes founding members different?",
    answer:
      "Founding members get a permanently lower rate ($89 vs $99/month), priority booking, exclusive event invitations, and perks that won't be available after launch.",
  },
];

/* ------------------------------------------------------------------
   JSON-LD
------------------------------------------------------------------ */

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://swaywellnessspa.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: "https://swaywellnessspa.com/locations",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Dallas",
          item: "https://swaywellnessspa.com/locations/dallas",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Founding Membership",
          item: "https://swaywellnessspa.com/locations/dallas/founding-membership",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Sway Dallas Founding Membership",
      description:
        "Founding member membership for Sway Dallas wellness spa in Knox/Henderson. Lock in $89/month for life.",
      image: "/assets/OG/og-join-the-club.jpg",
      brand: { "@type": "Brand", name: "Sway Wellness Spa" },
      offers: {
        "@type": "Offer",
        url: "https://swaywellnessspa.com/locations/dallas/founding-membership",
        availability: "https://schema.org/PreOrder",
        priceCurrency: "USD",
        price: "89",
      },
    },
  ],
};

/* ------------------------------------------------------------------
   ANIMATION VARIANTS
------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------ */

export default function DallasFoundingMembershipPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedTreatment, setExpandedTreatment] = useState<number | null>(
    null
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membership: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const membershipOptions = [
    { value: "spa-club", label: "Spa Club", desc: "Full spa access" },
    { value: "remedy-room", label: "Remedy Room", desc: "Recovery circuit" },
    { value: "aescape", label: "Aescape Robot", desc: "AI-powered massage" },
    { value: "not-sure", label: "Not sure yet", desc: "Tell me more" },
  ];

  const rankCounter = useAnimatedCounter(8, 1200);
  const spotsCounter = useAnimatedCounter(100);
  const reviewCounter = useAnimatedCounter(111);

  // TODO: Replace with Mindbody CC + account creation flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormError("");

    try {
      const res = await fetch("/api/founding-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setFormStatus("success");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setFormStatus("error");
    }
  };

  const scrollToReserve = () => {
    document
      .getElementById("reserve")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-vance bg-[#F7F4E9]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ========================================================
          SECTION 1 — HERO
      ======================================================== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Poster image for instant LCP */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/background.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/background.jpg"
        >
          <source src="/assets/background2.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — neutral black, no green tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />

        {/* Content */}
        <div className="relative z-10 px-6 pt-28 md:pt-36 pb-20 text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 text-xs uppercase tracking-[0.25em] backdrop-blur-md mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Founding Member — Limited Spots
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base uppercase tracking-[0.2em] text-white/70 mb-5"
          >
            Knox/Henderson — Dallas, TX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.05] text-white"
          >
            Lock In Your Rate.
            <br />
            Before We Open.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Founding members lock in{" "}
            <strong className="text-white">$89/month for life</strong> — plus
            priority booking, VIP events, and perks that disappear after launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={scrollToReserve}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#113D33] font-bold rounded-full uppercase hover:bg-[#F7F4E9] transition-all text-base md:text-lg shadow-2xl shadow-black/20"
            >
              Reserve Your Founding Spot
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="text-xs text-white/50">
              No charge until we open &middot; Cancel anytime
            </span>
          </motion.div>
        </div>

        {/* Clean bottom edge — soft shadow instead of gradient blend */}
        <div className="absolute -bottom-px left-0 right-0 h-1 bg-[#F7F4E9] z-10" />
      </section>

      {/* ========================================================
          SECTION 2 — STATS ROW
      ======================================================== */}
      <section className="bg-[#F7F4E9] py-16 md:py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#4A776D] mb-10 text-center">
            The Sway Community
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {/* #8 Day Spa */}
            <a
              href="https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group"
            >
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#113D33]">
                  #
                </span>
                <span
                  ref={rankCounter.ref}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#113D33] tabular-nums"
                >
                  {rankCounter.count}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 group-hover:text-[#113D33] transition-colors">
                Best Day Spa in the U.S.
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                TZR Readers&apos; Choice
              </p>
            </a>

            {/* Founding spots */}
            <div className="text-center border-x border-[#113D33]/10">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  ref={spotsCounter.ref}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#113D33] tabular-nums"
                >
                  {spotsCounter.count}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Founding Spots
              </p>
            </div>

            {/* Five-star reviews */}
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  ref={reviewCounter.ref}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#113D33] tabular-nums"
                >
                  {reviewCounter.count}
                </span>
              </div>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                5-Star Average
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-sm text-center mt-8 max-w-md mx-auto">
            Be among the first to bring Sway to Dallas.
          </p>
        </motion.div>
      </section>

      {/* ========================================================
          SECTION 3 — MEMBERSHIP CARDS
      ======================================================== */}
      <section className="bg-[#F7F4E9] px-4 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-[#113D33] mb-4"
          >
            Choose Your Membership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[#4A776D] text-sm uppercase tracking-[0.15em]"
          >
            Founding Member Pricing — Locked In For Life
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch"
        >
          {memberships.map((m) => {
            const isExpanded = expandedCard === m.key;

            return (
              <motion.div
                key={m.key}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-6 md:p-7 shadow-lg flex flex-col text-center border border-[#113D33]/8"
              >
                {m.mostPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-[#113D33] text-white px-4 py-1 rounded-full font-semibold tracking-wide whitespace-nowrap">
                    MOST POPULAR
                  </span>
                )}

                {/* Header */}
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#4A776D] mb-1">
                    {m.tagline}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#113D33] uppercase tracking-wide">
                    {m.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{m.visits}</p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-lg line-through text-gray-400">
                      {m.regularPrice}
                    </span>
                    <span className="text-5xl font-bold text-[#113D33]">
                      {m.foundingPrice}
                    </span>
                    <span className="text-sm text-gray-500">/ mo</span>
                  </div>
                  <p className="text-xs text-[#4A776D] font-semibold mt-1.5">
                    Founding rate — locked in forever
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                  {m.description}
                </p>

                {/* CTA */}
                <button
                  onClick={scrollToReserve}
                  className="block w-full rounded-full font-semibold py-3 px-6 transition mb-4 bg-[#113D33] hover:bg-[#0a2b23] text-white"
                >
                  Reserve This Plan
                </button>

                {/* Expandable details */}
                <button
                  onClick={() =>
                    setExpandedCard(isExpanded ? null : m.key)
                  }
                  className="text-sm text-[#4A776D] hover:text-[#113D33] transition-colors flex items-center justify-center gap-1"
                >
                  <span>
                    {isExpanded ? "Hide details" : "View all benefits"}
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-100 mt-4 text-left">
                        {/* Benefits */}
                        <p className="text-xs uppercase tracking-[0.1em] text-gray-400 mb-2">
                          Included
                        </p>
                        <ul className="space-y-1.5 mb-4">
                          {m.benefits.map((b, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <Check className="w-4 h-4 text-[#4A776D] shrink-0 mt-0.5" />
                              {b}
                            </li>
                          ))}
                        </ul>

                        {/* Founding perks */}
                        <p className="text-xs uppercase tracking-[0.1em] text-[#4A776D] mb-2">
                          Founding Member Only
                        </p>
                        <ul className="space-y-1.5">
                          {m.foundingPerks.map((p, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-[#113D33] font-medium"
                            >
                              <Sparkles className="w-4 h-4 text-[#4A776D] shrink-0 mt-0.5" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ========================================================
          SECTION 4 — SOCIAL PROOF
      ======================================================== */}
      <section className="bg-white py-20 px-6">
        {/* Press logos */}
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-10"
          >
            As Seen In
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-14"
          >
            {pressLogos.map((logo) => (
              <motion.a
                key={logo.alt}
                variants={fadeUp}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={56}
                  className="h-10 md:h-14 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Stars + rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[#113D33] mb-1">
            111 Reviews &middot; 5.0 Average
          </p>
          <p className="text-gray-400 text-sm">from our Denver location</p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#F7F4E9] rounded-2xl p-6 text-left"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-[#113D33]">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========================================================
          SECTION 5 — WHAT'S COMING TO DALLAS (TREATMENTS)
      ======================================================== */}
      <section className="bg-[#113D33] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4"
          >
            Coming to Knox/Henderson
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            The Full Sway Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Everything we&apos;ve perfected in Denver — every treatment,
            every detail.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {treatments.map((t, i) => {
            const isOpen = expandedTreatment === i;

            return (
              <motion.div
                key={t.title}
                variants={fadeUp}
                className="rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() =>
                  setExpandedTreatment(isOpen ? null : i)
                }
              >
                {/* Image with gradient overlay and title pinned to bottom */}
                <div className="relative h-56 md:h-64">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Title — pinned inside the image, never covered */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/60 mb-1">
                      {t.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">
                        {t.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expandable treatment list — renders BELOW the image, not overlaying */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#0b2e25] px-5 py-5 space-y-1">
                        {t.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.05 }}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#9ABFB3]" />
                              <span className="text-white/90 text-sm font-medium">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[#9ABFB3] text-xs font-medium tracking-wide">
                              {item.time}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ========================================================
          SECTION 6 — RESERVE FORM
      ======================================================== */}
      <section id="reserve" className="bg-[#F7F4E9] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-4">
              Reserve Your Founding Spot
            </h2>
            <p className="text-gray-600 mb-2 max-w-lg mx-auto leading-relaxed">
              Lock in{" "}
              <strong className="text-[#113D33]">$89/month for life</strong>.
              You&apos;ll be the first to know when doors open.
            </p>
            <p className="text-sm text-[#4A776D] mb-10">
              No charge until we open &middot; Cancel anytime
            </p>
          </motion.div>

          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white border border-[#113D33]/10 rounded-2xl p-8 md:p-10 text-center shadow-lg max-w-md mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.15,
                }}
                className="w-16 h-16 bg-[#113D33] rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#113D33] mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;ll reach out with exclusive founding member details
                before anyone else. Welcome to the Sway community.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-4"
            >
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#113D33]/15 text-[#113D33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A776D] focus:border-transparent transition shadow-sm"
              />

              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#113D33]/15 text-[#113D33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A776D] focus:border-transparent transition shadow-sm"
              />

              {/* Custom styled dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`w-full px-5 py-3.5 rounded-xl bg-white border text-left flex items-center justify-between transition shadow-sm ${
                    dropdownOpen
                      ? "border-[#4A776D] ring-2 ring-[#4A776D]"
                      : "border-[#113D33]/15"
                  }`}
                >
                  <span
                    className={
                      formData.membership
                        ? "text-[#113D33]"
                        : "text-gray-400"
                    }
                  >
                    {formData.membership
                      ? membershipOptions.find(
                          (o) => o.value === formData.membership
                        )?.label
                      : "Which membership interests you?"}
                  </span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </button>

                {/* Hidden native select for form validation */}
                <select
                  value={formData.membership}
                  onChange={() => {}}
                  required
                  tabIndex={-1}
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <option value="" />
                  {membershipOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-[#113D33]/10 shadow-xl overflow-hidden z-30"
                    >
                      {membershipOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              membership: option.value,
                            });
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 flex items-center justify-between transition-colors ${
                            formData.membership === option.value
                              ? "bg-[#113D33]/5"
                              : "hover:bg-[#F7F4E9]"
                          }`}
                        >
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                formData.membership === option.value
                                  ? "text-[#113D33]"
                                  : "text-gray-700"
                              }`}
                            >
                              {option.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {option.desc}
                            </p>
                          </div>
                          {formData.membership === option.value && (
                            <Check className="w-4 h-4 text-[#4A776D] shrink-0" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {formStatus === "error" && formError && (
                <p className="text-red-500 text-sm">{formError}</p>
              )}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full py-4 bg-[#113D33] text-white font-bold rounded-full uppercase hover:bg-[#0a2b23] transition text-base md:text-lg disabled:opacity-50 shadow-lg"
              >
                {formStatus === "submitting"
                  ? "Reserving..."
                  : "Reserve My Founding Spot"}
              </button>
            </motion.form>
          )}

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> No charge until we open
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> #8 Day Spa in the U.S.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 — FAQ (compact, below form)
      ======================================================== */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-[#113D33] text-center mb-10"
          >
            Questions? We&apos;ve got answers.
          </motion.h2>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="border-b border-gray-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-[#113D33] text-sm md:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 text-sm text-gray-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA BANNER
      ======================================================== */}
      <section className="bg-[#113D33] py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t miss the founding rate.
          </h2>
          <p className="text-white/60 mb-8">
            Limited to the first 100 members. Once they&apos;re gone,
            they&apos;re gone.
          </p>
          <button
            onClick={scrollToReserve}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#113D33] font-bold rounded-full uppercase hover:bg-[#F7F4E9] transition-all text-base md:text-lg"
          >
            Reserve Your Spot
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
