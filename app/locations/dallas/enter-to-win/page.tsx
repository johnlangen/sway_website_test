"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowDown,
  Check,
  Calendar,
  MapPin,
  Trophy,
  Instagram,
} from "lucide-react";
import EnterToWinForm from "@/app/components/EnterToWinForm";

/* ------------------------------------------------------------------
   PLACEHOLDER CONTEST DETAILS — replace with sister's final answers
------------------------------------------------------------------ */
const CONTEST = {
  prizeTitle: "12 Months of Spa Services",
  prizeSubtitle: "One full year of Sway Dallas membership",
  prizeValue: "$1,200",
  prizeBreakdown: [
    "12 monthly facials or massages (Spa Club tier)",
    "Member pricing on every additional service",
    "Sway Shop discounts",
    "Bring-a-friend perks",
    "First in line on opening day",
  ],
  endDate: "Sway Dallas Opening Day", // sister to confirm specific date
  drawDate: "Announced before opening day",
  eligibility: "18+ U.S. residents",
};

/* ------------------------------------------------------------------
   ANIMATION HELPERS
------------------------------------------------------------------ */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------ */
export default function DallasEnterToWinPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoReady(true))
        .catch(() => {
          video.remove();
        });
    }
  }, []);

  const scrollToForm = () => {
    document.getElementById("enter-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* =========================================================
          SECTION 1 — HERO with video
      ========================================================= */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/background.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/background.jpg"
        >
          <source src="/assets/background2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/80" />

        <div className="relative z-10 px-6 pt-28 md:pt-36 pb-20 text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 text-xs uppercase tracking-[0.25em] backdrop-blur-md mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sway Dallas Giveaway
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base uppercase tracking-[0.2em] text-white/70 mb-5"
          >
            Knox/Henderson &middot; Dallas, TX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.05] text-white"
          >
            Win 12 Months of Sway.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            One year of spa services at Sway Dallas.{" "}
            <strong className="text-white">{CONTEST.prizeValue} value.</strong>{" "}
            Free to enter. Bonus entry on Instagram.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#113D33] font-bold rounded-full uppercase hover:bg-[#F7F4E9] transition-all text-base md:text-lg shadow-2xl shadow-black/20"
            >
              Enter to Win
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="text-xs text-white/60">
              No purchase necessary. 18+.
            </span>
          </motion.div>
        </div>

        <div className="absolute -bottom-px left-0 right-0 h-1 bg-[#F7F4E9] z-10" />
      </section>

      {/* =========================================================
          SECTION 2 — PRIZE BREAKDOWN
      ========================================================= */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4A776D] mb-3">
              The Prize
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {CONTEST.prizeTitle}
            </h2>
            <p className="text-lg text-[#113D33]/70 max-w-2xl mx-auto">
              {CONTEST.prizeSubtitle}. A full year of treatments, member
              pricing, and Sway perks at the new Knox/Henderson location.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#113D33]/10"
          >
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#113D33]/10">
              <div className="w-12 h-12 rounded-full bg-[#113D33] text-white flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold mb-1">
                  Estimated Value
                </p>
                <p className="text-3xl md:text-4xl font-bold">
                  {CONTEST.prizeValue}
                </p>
              </div>
            </div>

            <p className="font-semibold text-[#113D33] mb-4">
              The winner gets a full year of:
            </p>
            <ul className="space-y-3">
              {CONTEST.prizeBreakdown.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#113D33]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#113D33]" />
                  </div>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — ENTRY FORM (anchor)
      ========================================================= */}
      <section id="enter-form" className="px-6 py-16 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4A776D] mb-3">
              Enter the Drawing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free to enter. Takes 30 seconds.
            </h2>
            <p className="text-lg text-[#113D33]/70 max-w-2xl mx-auto">
              We&apos;ll email the winner before Sway Dallas opens. Bonus entry
              if you&apos;re following @swaywellnessclub on Instagram.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <EnterToWinForm location="dallas" source="enter-to-win" />
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — BONUS ENTRY EXPLAINER (Instagram)
      ========================================================= */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-[#113D33] text-white rounded-3xl p-8 md:p-12 text-center shadow-xl"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-5">
              <Instagram className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Double Your Chances
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6">
              Follow{" "}
              <a
                href="https://www.instagram.com/swaywellnessclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-4 hover:text-[#9CB7A9]"
              >
                @swaywellnessclub
              </a>{" "}
              on Instagram and check the bonus-entry box on your form for a
              second entry in the drawing.
            </p>
            <a
              href="https://www.instagram.com/swaywellnessclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#113D33] font-bold hover:bg-[#F7F4E9] transition shadow-lg"
            >
              <Instagram className="w-4 h-4" />
              Follow @swaywellnessclub
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 — KEY DETAILS
      ========================================================= */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-10"
          >
            The Details
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <motion.div
              {...fadeUp}
              className="bg-[#F7F4E9] rounded-2xl p-6 border border-[#113D33]/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold mb-1">
                Entry Window
              </p>
              <p className="font-bold">Now through {CONTEST.endDate}</p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="bg-[#F7F4E9] rounded-2xl p-6 border border-[#113D33]/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold mb-1">
                Winner Announced
              </p>
              <p className="font-bold">{CONTEST.drawDate}</p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="bg-[#F7F4E9] rounded-2xl p-6 border border-[#113D33]/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#113D33] text-white flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider text-[#113D33]/60 font-semibold mb-1">
                Eligibility
              </p>
              <p className="font-bold">{CONTEST.eligibility}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6 — CROSS LINK to Founding Membership
      ========================================================= */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="bg-white rounded-2xl p-6 md:p-8 border border-[#113D33]/10 shadow text-center"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#4A776D] mb-3">
              Don&apos;t want to wait?
            </p>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Lock in founding member pricing
            </h3>
            <p className="text-[#113D33]/70 mb-5 max-w-xl mx-auto">
              Reserve your spot as a Sway Dallas founding member. Exclusive
              pricing, priority booking, and VIP perks before we open. No
              charge until we open.
            </p>
            <Link
              href="/locations/dallas/founding-membership"
              className="inline-block px-6 py-3 rounded-full bg-[#113D33] text-white font-semibold hover:opacity-90 transition"
            >
              Become a Founding Member
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 7 — RULES / FINE PRINT
      ========================================================= */}
      <section className="px-6 py-12 bg-white border-t border-[#113D33]/10">
        <div className="max-w-3xl mx-auto">
          <details className="group">
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between text-sm text-[#113D33]/70 hover:text-[#113D33]">
              Official Rules
              <span className="text-lg group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <div className="mt-4 text-xs text-[#113D33]/60 space-y-3 leading-relaxed">
              <p>
                <strong>No purchase necessary.</strong> A purchase will not
                improve your chances of winning. Void where prohibited.
              </p>
              <p>
                <strong>Eligibility.</strong> Open to legal residents of the
                United States who are 18 years of age or older at the time of
                entry. Employees of Sway Wellness Spa and their immediate
                families are not eligible.
              </p>
              <p>
                <strong>How to enter.</strong> Complete the entry form on this
                page with a valid email address. Limit one (1) entry per
                person. Optional bonus entry: follow @swaywellnessclub on
                Instagram and check the bonus-entry box on the form (limit one
                bonus entry per person).
              </p>
              <p>
                <strong>Entry period.</strong> Entries accepted now through{" "}
                {CONTEST.endDate}.
              </p>
              <p>
                <strong>Prize.</strong> One (1) winner will receive twelve (12)
                months of Spa Club tier membership at Sway Dallas, beginning on
                the location&apos;s opening day. Estimated retail value:{" "}
                {CONTEST.prizeValue}. Prize is non-transferable and has no cash
                value.
              </p>
              <p>
                <strong>Winner selection &amp; notification.</strong> Winner
                will be selected at random from all eligible entries.
                Notification will be sent via email to the address provided at
                entry. If the selected winner does not respond within 7 days,
                an alternate winner may be drawn.
              </p>
              <p>
                <strong>Sponsor.</strong> Sway Wellness Spa, 1428 Larimer
                Street, Denver, CO 80202.
              </p>
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
