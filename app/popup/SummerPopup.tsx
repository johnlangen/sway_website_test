"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";

type Step = "email" | "phone" | "success";

export default function FirstVisitOfferPopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  /** Format phone display: (303) 555-1234 */
  function formatPhoneDisplay(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  /** Convert display phone → E.164 */
  function toE164(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    return `+1${digits}`;
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setIsExisting(data.existing === true);
      setStep("phone");
    } catch {
      setErrorMsg("Could not connect. Please try again.");
    }

    setSubmitting(false);
  }

  async function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setErrorMsg("Please enter a 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), phone: toE164(phone) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setStep("success");
    } catch {
      setErrorMsg("Could not connect. Please try again.");
    }

    setSubmitting(false);
  }

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 py-6">
      <div className="relative bg-[#f4f4f1] rounded-lg w-full max-w-[360px] sm:max-w-md shadow-lg text-[#113D33] font-vance max-h-[calc(100dvh-48px)] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          aria-label="Close"
          className="absolute top-2 right-2 z-10 bg-white text-gray-800 hover:bg-gray-200 rounded-full shadow-md text-2xl sm:text-3xl font-bold w-10 h-10 flex items-center justify-center"
          onClick={() => setShow(false)}
        >
          ×
        </button>

        {/* Image — fills remaining space, shrinks on short viewports */}
        <div className="relative min-h-[120px] flex-1 overflow-hidden rounded-t-lg">
          <Image
            src="/assets/eventgreen.jpg"
            alt="First Time Visit Offer"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Content — pinned to bottom, never hidden */}
        <div className="shrink-0 p-4 sm:p-5">
          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <>
              <p className="text-2xl sm:text-3xl font-extrabold text-center mb-1">
                $40 OFF
              </p>
              <p className="text-sm sm:text-base text-center mb-3">
                First visit? Enter your email to claim $40 off.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-2.5">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#113D33]/20 bg-white text-[#113D33] placeholder:text-[#113D33]/40 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 disabled:opacity-60"
                />

                {errorMsg && (
                  <p className="text-red-600 text-xs text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#113D33] text-white px-4 py-2.5 rounded-md font-semibold hover:bg-[#0a2b23] text-center disabled:opacity-60 transition-opacity"
                >
                  {submitting ? "Submitting…" : "Claim Offer"}
                </button>
              </form>

              <p className="text-[10px] text-[#113D33]/40 text-center mt-2 leading-tight">
                By submitting, you agree to receive marketing emails from Sway
                Wellness. Unsubscribe anytime.
              </p>
            </>
          )}

          {/* ── Step 2: Phone (optional) ── */}
          {step === "phone" && (
            <>
              {isExisting ? (
                <>
                  <p className="text-2xl sm:text-3xl font-extrabold text-center mb-1">
                    Welcome Back!
                  </p>
                  <p className="text-sm sm:text-base text-center mb-3">
                    You&apos;re already on the list. Add your number for
                    exclusive text-only deals.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl sm:text-3xl font-extrabold text-center mb-1">
                    One More Step
                  </p>
                  <p className="text-sm sm:text-base text-center mb-3">
                    Add your number for exclusive text-only deals.
                  </p>
                </>
              )}

              <form onSubmit={handlePhoneSubmit} className="space-y-2.5">
                <input
                  type="tel"
                  required
                  placeholder="(303) 555-1234"
                  value={phone}
                  onChange={(e) =>
                    setPhone(formatPhoneDisplay(e.target.value))
                  }
                  disabled={submitting}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#113D33]/20 bg-white text-[#113D33] placeholder:text-[#113D33]/40 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 disabled:opacity-60"
                />

                {errorMsg && (
                  <p className="text-red-600 text-xs text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#113D33] text-white px-4 py-2.5 rounded-md font-semibold hover:bg-[#0a2b23] text-center disabled:opacity-60 transition-opacity"
                >
                  {submitting ? "Submitting…" : "Get Text Deals"}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setStep("success")}
                className="w-full text-[#113D33]/50 text-xs text-center mt-2 hover:text-[#113D33]/70 transition-colors"
              >
                Skip for now
              </button>

              <p className="text-[10px] text-[#113D33]/40 text-center mt-1.5 leading-tight">
                By submitting, you agree to receive recurring marketing texts
                from Sway Wellness. Msg &amp; data rates may apply. Reply STOP
                to cancel.
              </p>
            </>
          )}

          {/* ── Step 3: Success ── */}
          {step === "success" && (
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold mb-1">
                You&apos;re In!
              </p>
              <p className="text-sm sm:text-base mb-4">
                {isExisting
                  ? "You're all set — check our latest offers below."
                  : "Check your inbox for your $40 off offer."}
              </p>
              <a
                href="/locations/denver-larimer/offers/"
                className="block bg-[#113D33] text-white px-4 py-2.5 rounded-md font-semibold hover:bg-[#0a2b23] text-center"
              >
                View Offers
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
