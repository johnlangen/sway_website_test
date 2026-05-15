"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Trophy, ArrowRight, ArrowDown } from "lucide-react";

type LocationPref = "denver-rino" | "denver-central-park" | "";

export default function SwayClubPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "" as LocationPref,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoReady(true))
        .catch(() => video.remove());
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.location) {
      setError("Please select a location");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/founding-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          source: "lock-in-rate-rino-cp",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  const scrollToForm = () => {
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-vance bg-[#F7F4E9] text-[#113D33]">
      {/* ===========================
          HERO — video background (same as homepage)
      =========================== */}
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden">
        {/* Poster for instant LCP */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/background.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[35%_center] md:object-center"
        />

        {/* Video — invisible until autoplay confirmed, removed if blocked */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-[35%_center] md:object-center transition-opacity duration-500 ${
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

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/85" />

        {/* Content */}
        <div className="relative z-10 px-6 pt-24 md:pt-32 pb-16 text-center max-w-3xl mx-auto text-white">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs uppercase tracking-[0.22em] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Limited offer — opens June 1
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5"
          >
            Lock in $99/month
            <br />
            <span className="opacity-90">before our public launch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-base md:text-lg opacity-90 max-w-xl mx-auto leading-relaxed mb-8"
          >
            Unlimited recovery at Sway Wellness Club — RiNo + Central Park.
            Traditional &amp; infrared sauna, cold plunge, PEMF mats, lymphatic
            compression boots. Standard rate after public launch:{" "}
            <b>$129/month</b>.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#113D33] rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#F7F4E9] transition-colors"
          >
            Lock in my rate
            <ArrowDown className="w-4 h-4" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm opacity-80"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" />
              <span><b>#4 Best Day Spa in America</b> · USA Today 10Best</span>
            </div>
            <span className="hidden md:inline opacity-40">·</span>
            <div><b>Best U.S. Day Spa</b> · The Zoe Report 2026</div>
          </motion.div>
        </div>
      </section>

      {/* ===========================
          OFFER CARD
      =========================== */}
      <section className="px-6 pt-16 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[#113D33]/10 p-6 md:p-10 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="md:border-r md:border-[#113D33]/10 md:pr-10">
                <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-3">
                  Your locked rate
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-bold">$99</span>
                  <span className="text-base opacity-70">/ month</span>
                </div>
                <div className="text-sm opacity-70 mb-4">
                  unlimited recovery
                </div>
                <div className="text-xs opacity-60 leading-relaxed">
                  Standard rate becomes <b>$129/month</b> at our public launch
                  on <b>June 1</b>. Sign up before then to keep your $99 rate.
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-3">
                  What&apos;s included in unlimited
                </div>
                <ul className="space-y-2.5 text-sm mb-5">
                  {[
                    "Traditional sauna",
                    "Infrared sauna",
                    "Cold plunge",
                    "PEMF mats",
                    "Lymphatic compression boots",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#113D33]" />
                      <span className="opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2 pt-2 border-t border-[#113D33]/10">
                  Also a member — booked separately
                </div>
                <ul className="space-y-2 text-xs opacity-80">
                  <li>
                    <b>Massage &amp; facial</b> at member rates — both open
                    mid-to-late June (not included in unlimited)
                  </li>
                  <li>
                    <b>$40 off</b> your first massage or facial at Sway
                    Larimer — available right now
                  </li>
                  <li>
                    Access at <b>both RiNo and Central Park</b>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===========================
          MODALITY IMAGERY STRIP — 4 tiles, what's in unlimited
      =========================== */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { img: "/assets/sauna.jpg", label: "Traditional + infrared sauna" },
              { img: "/assets/cold_plunge.jpg", label: "Cold plunge" },
              { img: "/assets/compression_therapy.jpg", label: "Compression boots" },
              { img: "/assets/recover_room.jpg", label: "PEMF mats" },
            ].map((m, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#113D33]/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.img}
                  alt={m.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs md:text-sm font-semibold">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===========================
          FORM
      =========================== */}
      <section id="reserve" className="px-6 pb-20">
        <div className="max-w-xl mx-auto">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border-2 border-[#113D33] p-8 text-center shadow-sm"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#113D33] flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">You&apos;re on the list.</h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Your $99/month rate is locked. We&apos;ll reach out the week
                of May 18 to activate your membership — recovery access starts
                as soon as you&apos;re set up. No card charged today.
              </p>
              <p className="text-xs opacity-60 mt-4">
                Questions in the meantime? Reply to Heather&apos;s email or
                reach us at hello@swaywellnessspa.com.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[#113D33]/10 p-6 md:p-8 space-y-4 shadow-sm"
            >
              <div>
                <h2 className="text-2xl font-bold mb-1">Lock in your rate</h2>
                <p className="text-sm opacity-70 mb-4">
                  Sign up by <b>June 1, 2026</b> to claim the $99/month rate
                  — that&apos;s when our public launch begins and the rate
                  goes to $129. No card today; we&apos;ll reach out the week
                  of May 18 to activate.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-[#113D33]/20 rounded-lg bg-[#F7F4E9]/50 focus:outline-none focus:border-[#113D33] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-[#113D33]/20 rounded-lg bg-[#F7F4E9]/50 focus:outline-none focus:border-[#113D33] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-[#113D33]/20 rounded-lg bg-[#F7F4E9]/50 focus:outline-none focus:border-[#113D33] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-1.5">
                  Phone <span className="font-normal opacity-60">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-[#113D33]/20 rounded-lg bg-[#F7F4E9]/50 focus:outline-none focus:border-[#113D33] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Which location?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "denver-rino" as const, label: "RiNo" },
                    { val: "denver-central-park" as const, label: "Central Park" },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.val}
                      onClick={() => setFormData({ ...formData, location: opt.val })}
                      className={`px-3 py-3 rounded-lg border-2 text-sm font-semibold transition-colors ${
                        formData.location === opt.val
                          ? "border-[#113D33] bg-[#113D33] text-white"
                          : "border-[#113D33]/15 bg-[#F7F4E9]/50 hover:border-[#113D33]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#113D33] text-white py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-[#0d2e26] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === "submitting" ? "Submitting…" : "Lock in my rate"}
                {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-[11px] opacity-60 text-center leading-relaxed pt-1">
                No charge today. Your rate is reserved until we activate your
                membership the week of May 18. You can decline activation with
                no obligation.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===========================
          FOOTER
      =========================== */}
      <footer className="px-6 py-10 border-t border-[#113D33]/10 text-center text-xs opacity-70 bg-white/30">
        <div className="max-w-3xl mx-auto space-y-2">
          <p>
            Sway Wellness Club opens June 1 at{" "}
            <b>3636 Blake St, Denver (RiNo)</b> and{" "}
            <b>2271 Clinton St, Aurora (Central Park)</b>.
          </p>
          <p>
            Already a member of Upswell at one of these locations? Your
            membership is automatically rolling over — no action needed. This
            page is for new members only.
          </p>
        </div>
      </footer>
    </div>
  );
}
