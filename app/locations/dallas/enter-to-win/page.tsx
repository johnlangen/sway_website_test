"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Instagram } from "lucide-react";
import EnterToWinForm from "@/app/components/EnterToWinForm";

/* ------------------------------------------------------------------
   PLACEHOLDER CONTEST DETAILS — replace with sister's final answers
------------------------------------------------------------------ */
const CONTEST = {
  prizeTitle: "A Year of Wellness at Sway Knox/Henderson",
  prizeSummary:
    "Receive a monthly massage or facial for 12 months at Sway Knox/Henderson in Dallas.",
  prizeValue: "$1,700",
  endDate: "Sway Knox/Henderson Opening Day", // sister to confirm specific date
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
    <div className="bg-[#F7F4E9] text-[#113D33] font-vance">
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base uppercase tracking-[0.2em] text-white/70 mb-6"
          >
            Knox/Henderson &middot; Dallas, TX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.05] text-white"
          >
            Win a year of wellness.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Receive a monthly massage or facial for 12 months.{" "}
            <strong className="text-white">{CONTEST.prizeValue} value.</strong>
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
          SECTION 2 — ENTRY FORM (anchor)
      ========================================================= */}
      <section id="enter-form" className="px-6 py-16 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Enter to Win
            </h2>
            <p className="text-base text-[#113D33]/70">
              A monthly massage or facial for 12 months.{" "}
              {CONTEST.prizeValue} value.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <EnterToWinForm location="dallas" source="enter-to-win" />
          </motion.div>

          <motion.p
            {...fadeUp}
            className="text-center text-xs text-[#113D33]/55 mt-6"
          >
            Open through {CONTEST.endDate} &middot; {CONTEST.eligibility} &middot;{" "}
            Winner emailed before opening day
          </motion.p>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — BONUS ENTRY EXPLAINER (Instagram)
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
                @swaywellnessclub <span className="sr-only">(opens in new tab)</span>
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
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — RULES / FINE PRINT
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
                <strong>Eligibility.</strong> Open to residents of the United
                States 18 years of age or older.
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
                <strong>Prize.</strong> One (1) winner will receive one (1)
                monthly facial or massage for 12 months at Sway Knox/Henderson,
                beginning on the location&apos;s opening day. Estimated retail
                value: {CONTEST.prizeValue}. Prize is non-transferable and has
                no cash value.
              </p>
              <p>
                <strong>Winner selection &amp; notification.</strong> Winner
                will be selected after our grand opening and announced via
                email and Instagram. If the selected winner does not respond
                within 7 days, an alternate winner may be drawn.
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
