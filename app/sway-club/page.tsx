"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Trophy, ArrowRight } from "lucide-react";

type LocationPref = "denver-rino" | "denver-central-park" | "either";
type PlanPref = "monthly" | "annual";

export default function SwayClubPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "either" as LocationPref,
    plan: "monthly" as PlanPref,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          source: `lock-in-rate-${formData.plan}`,
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

  return (
    <div className="min-h-screen font-vance bg-[#F7F4E9] text-[#113D33]">
      {/* ===========================
          HERO
      =========================== */}
      <section className="px-6 pt-20 md:pt-28 pb-12 max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#113D33]/20 bg-white text-xs uppercase tracking-[0.2em] mb-6"
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
          Lock in $99/month before our public launch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg opacity-80 max-w-xl mx-auto leading-relaxed"
        >
          Unlimited recovery at Sway Wellness Club — RiNo + Central Park.
          Sauna, cold plunge, compression, red light. Massage opens
          mid-to-late June. Our standard rate after public launch is{" "}
          <b>$129/month</b>.
        </motion.p>
      </section>

      {/* ===========================
          OFFER CARD
      =========================== */}
      <section className="px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#113D33]/10 p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">
                Your locked rate
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl md:text-6xl font-bold">$99</span>
                <span className="text-base opacity-70">/ month</span>
              </div>
              <div className="text-sm opacity-70">
                Or <b>$1,188</b> annual ($99/mo prepaid)
              </div>
              <div className="text-xs opacity-60 mt-3">
                12-month commitment. Auto-renews at $99 at end of year.
                Standard rate (non-locked) becomes $129/mo after public launch.
              </div>
            </div>

            <ul className="space-y-2.5 text-sm">
              {[
                "Unlimited Remedy Lounge access — sauna, cold plunge, compression, red light",
                "Massage at member rates when suites open mid-to-late June",
                "Access at both RiNo and Central Park",
                "Phase 2 services (facials, Aescape robot massage) included when added",
                "$40 off your first visit at Sway Larimer right now",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#113D33]" />
                  <span className="opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ===========================
          TRUST
      =========================== */}
      <section className="px-6 mb-12">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center text-sm opacity-80">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>
              <b>#4 Best Day Spa in America</b> — USA Today 10Best
            </span>
          </div>
          <span className="hidden md:inline opacity-40">·</span>
          <div>
            <b>Best U.S. Day Spa</b> — The Zoe Report 2026 Readers&apos; Choice
          </div>
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
              className="bg-white rounded-2xl border-2 border-[#113D33] p-8 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#113D33] flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">You&apos;re on the list.</h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Your $99/month rate is locked. We&apos;ll reach out the week of
                May 25 to activate your membership in our new system. No card
                charged yet.
              </p>
              <p className="text-xs opacity-60 mt-4">
                Questions in the meantime? Reply to the email from Heather, or
                email hello@swaywellnessspa.com.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[#113D33]/10 p-6 md:p-8 space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold mb-1">Lock in your rate</h2>
                <p className="text-sm opacity-70 mb-4">
                  Sign up by <b>June 30, 2026</b> to claim the $99/month rate.
                  No card needed today — we&apos;ll reach out to activate when
                  our system goes live.
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
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "denver-rino" as const, label: "RiNo" },
                    { val: "denver-central-park" as const, label: "Central Park" },
                    { val: "either" as const, label: "Either" },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.val}
                      onClick={() => setFormData({ ...formData, location: opt.val })}
                      className={`px-3 py-2.5 rounded-lg border-2 text-xs font-semibold transition-colors ${
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Plan preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      val: "monthly" as const,
                      label: "Monthly",
                      sub: "$99/mo · 12-mo commitment",
                    },
                    {
                      val: "annual" as const,
                      label: "Annual prepay",
                      sub: "$1,188 once · same $99/mo rate",
                    },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.val}
                      onClick={() => setFormData({ ...formData, plan: opt.val })}
                      className={`px-3 py-3 rounded-lg border-2 text-left transition-colors ${
                        formData.plan === opt.val
                          ? "border-[#113D33] bg-[#113D33] text-white"
                          : "border-[#113D33]/15 bg-[#F7F4E9]/50 hover:border-[#113D33]/40"
                      }`}
                    >
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          formData.plan === opt.val ? "opacity-80" : "opacity-60"
                        }`}
                      >
                        {opt.sub}
                      </div>
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
                membership the week of May 25. You can decline activation with
                no obligation.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ===========================
          FOOTER
      =========================== */}
      <footer className="px-6 py-8 border-t border-[#113D33]/10 text-center text-xs opacity-70">
        <div className="max-w-3xl mx-auto">
          <p>
            Sway Wellness Club opens June 1 at{" "}
            <b>3636 Blake St, Denver (RiNo)</b> and{" "}
            <b>2271 Clinton St, Aurora (Central Park)</b>.
          </p>
          <p className="mt-2">
            Already a member of Upswell at one of these locations? Your
            membership is automatically rolling over — no action needed. This
            page is for new members only.
          </p>
        </div>
      </footer>
    </div>
  );
}
