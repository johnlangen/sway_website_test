"use client";

import { getAttribution } from "../../lib/attribution";
import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Sparkles } from "lucide-react";

type EnterToWinFormProps = {
  location?: "dallas" | "georgetown";
  /** Used so we can filter contest entries in Upstash */
  source?: string;
};

const INSTAGRAM_URL = "https://www.instagram.com/swaywellnessclub/";

/**
 * TCPA + CAN-SPAM compliant bundled consent.
 *
 * Bumping the version string changes the audit-trail tag saved with each
 * entry. If the disclosure copy changes, bump CONSENT_VERSION and update
 * CONSENT_TEXT so we have a clean record of what each entrant agreed to.
 *
 * v1 named the sender "Sway Dallas"; v2 renames it to "Sway Knox/Henderson"
 * (same entity, same scope of consent).
 */
const CONSENT_VERSION = "v2-2026-07-13";
const CONSENT_TEXT =
  "By clicking Enter to Win, you agree to receive recurring automated marketing emails and text messages from Sway Knox/Henderson at the email and number you provide. Consent is not a condition of entry. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg and data rates may apply. See our Terms and Privacy Policy.";

export default function EnterToWinForm({
  location = "dallas",
  source = "enter-to-win",
}: EnterToWinFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [igBonus, setIgBonus] = useState(false);
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
          ...getAttribution(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          location,
          // Bundled consent: submitting the form IS the express written
          // consent for marketing emails AND texts (matches Attentive's
          // popup pattern). Source string just tracks IG bonus.
          source: `${source}${igBonus ? "+ig" : ""}`,
          consentVersion: CONSENT_VERSION,
          consentText: CONSENT_TEXT,
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
          We&apos;ll email the winner after Sway Knox/Henderson opens. Good luck.
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
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        )}

        {igBonus && (
          <div className="bg-[#F7F4E9] border border-[#113D33]/15 rounded-xl p-5 max-w-md mx-auto">
            <p className="font-semibold text-[#113D33] mb-2">
              Bonus entry locked in.
            </p>
            <p className="text-sm text-[#113D33]/70 mb-4">
              Thanks for following @swaywellnessclub. See you at Sway Knox/Henderson.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#113D33] font-semibold hover:underline"
            >
              <Instagram className="w-4 h-4" />
              @swaywellnessclub
              <span className="sr-only">(opens in new tab)</span>
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
          Mobile phone
        </label>
        <input
          id="etw-phone"
          type="tel"
          inputMode="tel"
          required
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
                Follow @swaywellnessclub <span className="sr-only">(opens in new tab)</span>
              </a>{" "}
              first if you haven&apos;t.
            </span>
          </span>
        </label>
      </div>

      {status === "error" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {/* TCPA + CAN-SPAM bundled consent disclosure — sits directly above
          the submit button so the button click is the express consent. */}
      <p className="text-[11px] text-[#113D33]/65 leading-relaxed">
        By clicking <strong>Enter to Win</strong>, you agree to receive
        recurring automated marketing emails and text messages from Sway
        Dallas at the email and number you provide. Consent is not a
        condition of entry. Reply HELP for help and STOP to cancel. Msg
        frequency varies. Msg and data rates may apply. See our{" "}
        <a
          href="/terms-and-conditions"
          className="underline underline-offset-2 hover:text-[#113D33]"
        >
          Terms and Privacy Policy
        </a>
        .
      </p>

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

      <p className="text-[11px] text-[#113D33]/45 text-center leading-relaxed">
        No purchase necessary. Must be 18+. One entry per email. Bonus entry
        requires following @swaywellnessclub on Instagram. See full rules
        below.
      </p>
    </form>
  );
}
