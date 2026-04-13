"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type WaitlistFormProps = {
  location: "dallas" | "georgetown";
  source?: "location-page" | "founding-membership";
  /** Compact = inline on location page hero, full = founding membership page */
  variant?: "compact" | "full";
};

export default function WaitlistForm({
  location,
  source = "location-page",
  variant = "compact",
}: WaitlistFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

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
          source,
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
        transition={{ duration: 0.3 }}
        style={{ willChange: "opacity, transform" }}
        className={
          variant === "compact"
            ? "bg-[#113D33] text-white rounded-2xl p-6 text-center"
            : "text-center py-8"
        }
      >
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
        <p className={variant === "compact" ? "text-sm opacity-80" : "text-sm opacity-70"}>
          We&apos;ll notify you when founding memberships are ready.
          {location === "dallas"
            ? " See you in Knox/Henderson."
            : " See you in Georgetown."}
        </p>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="bg-[#113D33] text-white rounded-2xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold mb-1">
          Get Notified When We Open
        </h3>
        <p className="text-sm opacity-80 mb-4">
          Join the waitlist for exclusive founding member pricing before we open.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              aria-label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="rounded-lg px-4 py-3 text-sm bg-white/10 border border-white/20 placeholder:text-white/70 focus:outline-none focus:border-white/50"
            />
            <input
              type="text"
              placeholder="Last name"
              aria-label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg px-4 py-3 text-sm bg-white/10 border border-white/20 placeholder:text-white/70 focus:outline-none focus:border-white/50"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg px-4 py-3 text-sm bg-white/10 border border-white/20 placeholder:text-white/70 focus:outline-none focus:border-white/50"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            aria-label="Phone number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg px-4 py-3 text-sm bg-white/10 border border-white/20 placeholder:text-white/70 focus:outline-none focus:border-white/50"
          />

          {status === "error" && (
            <p className="text-red-300 text-sm" role="alert">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-white text-[#113D33] font-semibold rounded-full py-3 px-6 text-sm hover:opacity-90 transition disabled:opacity-60"
          >
            {status === "submitting" ? "Joining..." : "Join the Waitlist"}
          </button>
        </form>

        <p className="text-[11px] opacity-60 mt-3 leading-relaxed">
          By signing up you agree to receive updates about Sway Wellness.
          We&apos;ll never share your info.
        </p>
      </div>
    );
  }

  // Full variant — for founding membership pages
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Jane"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm bg-[#F7F4E9] border border-[#113D33]/10 focus:outline-none focus:border-[#113D33]/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm bg-[#F7F4E9] border border-[#113D33]/10 focus:outline-none focus:border-[#113D33]/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl px-4 py-3 text-sm bg-[#F7F4E9] border border-[#113D33]/10 focus:outline-none focus:border-[#113D33]/30"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Phone <span className="text-xs opacity-70 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm bg-[#F7F4E9] border border-[#113D33]/10 focus:outline-none focus:border-[#113D33]/30"
          />
        </div>

        {status === "error" && (
          <p className="text-red-600 text-sm" role="alert">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#113D33] text-white font-semibold rounded-full py-3 px-6 hover:opacity-90 transition disabled:opacity-60"
        >
          {status === "submitting" ? "Joining..." : "Join the Waitlist"}
        </button>
      </form>

      <p className="text-[11px] opacity-60 mt-3 text-center leading-relaxed">
        By signing up you agree to receive updates about Sway Wellness.
        We&apos;ll never share your info. Membership pricing and perks are
        not yet final.
      </p>
    </div>
  );
}
