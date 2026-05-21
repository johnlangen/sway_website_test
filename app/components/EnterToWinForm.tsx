"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Sparkles } from "lucide-react";

type EnterToWinFormProps = {
  location?: "dallas" | "georgetown";
  /** Used so we can filter contest entries in Upstash */
  source?: string;
};

const INSTAGRAM_URL = "https://www.instagram.com/swaywellnessclub/";

export default function EnterToWinForm({
  location = "dallas",
  source = "enter-to-win",
}: EnterToWinFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [igBonus, setIgBonus] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    // Tracking: GTM event for contest entry
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "enter_to_win_submit",
        location,
        ig_bonus: igBonus,
      });
    }

    try {
      const res = await fetch("/api/founding-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          location,
          // Embed bonus + marketing flags in the source string so they
          // appear in the Upstash list without changing the API contract
          source: `${source}${igBonus ? "+ig" : ""}${marketingOptIn ? "+mkt" : ""}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl p-8 md:p-10 text-center shadow-xl border border-[#113D33]/10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#113D33] text-white mb-5">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#113D33] mb-3">
          You&apos;re entered!
        </h3>
        <p className="text-base text-[#113D33]/70 mb-6 max-w-md mx-auto">
          We&apos;ll email the winner before Sway Dallas opens. Good luck.
        </p>

        {!igBonus && (
          <div className="bg-[#F7F4E9] border border-[#113D33]/15 rounded-xl p-5 max-w-md mx-auto">
            <p className="font-semibold text-[#113D33] mb-2">
              Want a bonus entry?
            </p>
            <p className="text-sm text-[#113D33]/70 mb-4">
              Follow @swaywellnessclub on Instagram for an extra entry in the drawing.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#113D33] text-white font-semibold hover:opacity-90 transition"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </a>
          </div>
        )}

        {igBonus && (
          <div className="bg-[#F7F4E9] border border-[#113D33]/15 rounded-xl p-5 max-w-md mx-auto">
            <p className="font-semibold text-[#113D33] mb-2">
              Bonus entry locked in.
            </p>
            <p className="text-sm text-[#113D33]/70 mb-4">
              Thanks for following @swaywellnessclub. See you at Sway Dallas.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#113D33] font-semibold hover:underline"
            >
              <Instagram className="w-4 h-4" />
              @swaywellnessclub
            </a>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-[#113D33]/10 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="etw-firstname"
            className="block text-sm font-semibold text-[#113D33] mb-1.5"
          >
            First name
          </label>
          <input
            id="etw-firstname"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
          />
        </div>
        <div>
          <label
            htmlFor="etw-lastname"
            className="block text-sm font-semibold text-[#113D33] mb-1.5"
          >
            Last name
          </label>
          <input
            id="etw-lastname"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="etw-email"
          className="block text-sm font-semibold text-[#113D33] mb-1.5"
        >
          Email
        </label>
        <input
          id="etw-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
        />
      </div>

      <div>
        <label
          htmlFor="etw-phone"
          className="block text-sm font-semibold text-[#113D33] mb-1.5"
        >
          Mobile phone <span className="font-normal text-[#113D33]/50">(optional)</span>
        </label>
        <input
          id="etw-phone"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
        />
      </div>

      {/* Bonus entry block */}
      <div className="rounded-xl bg-[#F7F4E9] border border-[#113D33]/15 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={igBonus}
            onChange={(e) => setIgBonus(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30"
          />
          <span className="flex-1">
            <span className="flex items-center gap-1.5 font-semibold text-[#113D33]">
              <Instagram className="w-4 h-4" />
              Bonus entry: I&apos;m following @swaywellnessclub
            </span>
            <span className="block text-xs text-[#113D33]/70 mt-1">
              Get a second entry in the drawing.{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#113D33]"
              >
                Follow @swaywellnessclub
              </a>{" "}
              first if you haven&apos;t.
            </span>
          </span>
        </label>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30"
        />
        <span className="text-xs text-[#113D33]/70">
          Email me Sway Dallas updates, opening news, and exclusive offers.
        </span>
      </label>

      {status === "error" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#113D33] text-white py-4 text-lg font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Entering&hellip;
          </span>
        ) : (
          "Enter to Win"
        )}
      </button>

      <p className="text-[11px] text-[#113D33]/50 text-center leading-relaxed">
        No purchase necessary. Must be 18+. One entry per email. Bonus entry
        requires following @swaywellnessclub on Instagram. See full rules
        below.
      </p>
    </form>
  );
}
