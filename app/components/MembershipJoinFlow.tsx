"use client";

/**
 * MembershipJoinFlow — native membership purchase modal.
 *
 * Sells Mindbody autopay contracts directly on the site:
 *   email lookup → (account / card details if needed) → review + agree → purchase.
 *
 * Reuses the battle-tested client routes from the booking flows
 * (/api/mindbody/client-lookup, add-client-with-card, update-client-card,
 * update-client) and finishes with POST /api/membership/purchase
 * (Mindbody sale/purchasecontract via stored card).
 *
 * Test mode: open the page with ?memtest=1 and the purchase fires Mindbody's
 * documented Test:true dry-run — everything validates, nothing commits,
 * nothing is charged. A badge shows when active.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, X } from "lucide-react";

export type MembershipPlan = {
  key: "essential" | "premier" | "ultimate" | "aescape" | "remedy";
  contractId: number;
  name: string;
  price: number; // monthly USD
  blurb: string; // one-line inclusion summary shown in the flow
};

type Step = "email" | "details" | "confirm" | "done";

/* ── helpers (same validation as the booking flows) ─────────────── */

function normalizeEmail(s: string) {
  return (s || "").trim().toLowerCase();
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

function onlyDigits(s: string) {
  return (s || "").replace(/[^\d]/g, "");
}

function luhnCheck(cardNumber: string) {
  const digits = onlyDigits(cardNumber);
  if (digits.length < 12) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function detectCardType(cardNumberDigits: string) {
  const n = onlyDigits(cardNumberDigits);
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n))
    return "MasterCard";
  if (/^3[47]/.test(n)) return "AmericanExpress";
  if (/^6(011|5)/.test(n) || /^64[4-9]/.test(n)) return "Discover";
  return "Visa";
}

function trackMembership(event: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...extra });
  } catch {
    // Tracking failure must never break the flow.
  }
}

/* ── styles (mirrors the booking flow) ──────────────────────────── */

const inputClass =
  "w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/60 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-base transition-shadow duration-200";

const primaryBtn =
  "w-full rounded-full bg-[#113D33] text-white py-3.5 text-base font-semibold hover:bg-[#0e3029] active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:active:scale-100 shadow-lg";

/* ── component ──────────────────────────────────────────────────── */

export default function MembershipJoinFlow({
  plan,
  onClose,
}: {
  plan: MembershipPlan;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("email");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const [clientId, setClientId] = useState<string | null>(null);
  // Which sections the details step shows for this user.
  const [showNameFields, setShowNameFields] = useState(false);
  const [showCardFields, setShowCardFields] = useState(false);
  // "create_account" = new client (addclient), "add_card" = existing client
  // missing a card (updateclient). null = name backfill only.
  const [cardContext, setCardContext] = useState<
    "create_account" | "add_card" | null
  >(null);

  const [savedLastFour, setSavedLastFour] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [terms, setTerms] = useState<string | null>(null);
  const [purchaseTotal, setPurchaseTotal] = useState<number | null>(null);

  // ?memtest=1 anywhere in the URL = Mindbody Test:true dry-run purchases.
  const [isTest, setIsTest] = useState(false);
  useEffect(() => {
    setIsTest(new URLSearchParams(window.location.search).has("memtest"));
  }, []);

  // Card inputs are uncontrolled (refs), same as the booking flows — keeps
  // card data out of React state.
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const billingAddressRef = useRef<HTMLInputElement | null>(null);
  const billingCityRef = useRef<HTMLInputElement | null>(null);
  const billingStateRef = useRef<HTMLInputElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  const expMonthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );
  const expYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(currentYear + i));
  }, []);

  // Lock page scroll behind the modal.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Funnel start + live agreement terms for the review step.
  useEffect(() => {
    trackMembership("membership_start", {
      membership_tier: plan.key,
      membership_price: plan.price,
    });
    fetch("/api/membership/contracts")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const match = data?.contracts?.find(
          (c: { id: number }) => c.id === plan.contractId
        );
        if (match?.agreementTerms) setTerms(match.agreementTerms);
      })
      .catch(() => {
        // Terms box just stays hidden — checkbox copy stands on its own.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── step 1: email lookup ─────────────────────────────────────── */

  async function handleEmailContinue() {
    setError(null);
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/mindbody/client-lookup?email=${encodeURIComponent(normalized)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Lookup failed.");

      if (data.found && data.client) {
        const existingFirst = (data.client.FirstName ?? "").trim();
        const existingLast = (data.client.LastName ?? "").trim();
        const existingPhone = (data.client.MobilePhone ?? "").trim();
        const missingName = !existingFirst || !existingLast;
        const missingCard = !data.hasCardOnFile;

        setClientId(String(data.client.Id));
        setFirstName(existingFirst);
        setLastName(existingLast);
        setMobilePhone(existingPhone);

        trackMembership("membership_email_entered", {
          membership_tier: plan.key,
          client_type: "returning",
        });

        if (!missingName && !missingCard) {
          setStep("confirm");
          return;
        }
        setShowNameFields(missingName);
        setShowCardFields(missingCard);
        setCardContext(missingCard ? "add_card" : null);
        setStep("details");
        return;
      }

      // New client: collect name, phone, and card.
      trackMembership("membership_email_entered", {
        membership_tier: plan.key,
        client_type: "new",
      });
      setClientId(null);
      setShowNameFields(true);
      setShowCardFields(true);
      setCardContext("create_account");
      setStep("details");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── step 2: account / card details ───────────────────────────── */

  function getCardPayloadFromRefs() {
    const cardHolder = (cardHolderRef.current?.value || "").trim();
    const cardNumber = onlyDigits(cardNumberRef.current?.value || "");
    const expMonthRaw = (expMonthRef.current?.value || "").trim();
    const expYearRaw = (expYearRef.current?.value || "").trim();
    const postalCode = (postalCodeRef.current?.value || "").trim();
    const address = (billingAddressRef.current?.value || "").trim();
    const city = (billingCityRef.current?.value || "").trim();
    const state = (billingStateRef.current?.value || "").trim();
    const expMonth = expMonthRaw.padStart(2, "0");
    const expYear = expYearRaw.length === 2 ? `20${expYearRaw}` : expYearRaw;
    const cardType = detectCardType(cardNumber);
    return {
      cardHolder,
      cardNumber,
      expMonth,
      expYear,
      postalCode,
      cardType,
      address,
      city,
      state,
    };
  }

  function validateCardFields() {
    const { cardHolder, cardNumber, expMonth, expYear, postalCode, address, city, state } =
      getCardPayloadFromRefs();
    if (!cardHolder) return "Please enter the name on the card.";
    if (!cardNumber || cardNumber.length < 12)
      return "Please enter a valid card number.";
    if (!luhnCheck(cardNumber))
      return "Card number looks invalid. Please double-check.";
    if (!expMonth || Number(expMonth) < 1 || Number(expMonth) > 12)
      return "Please select a valid expiration month.";
    if (!expYear || expYear.length < 4) return "Please select an expiration year.";
    const now = new Date();
    if (
      Number(expYear) === now.getFullYear() &&
      Number(expMonth) < now.getMonth() + 1
    ) {
      return "This card appears to be expired.";
    }
    if (!address) return "Please enter your billing street address.";
    if (!city) return "Please enter your billing city.";
    if (!state) return "Please enter your billing state.";
    if (!postalCode || postalCode.length < 3)
      return "Please enter a valid ZIP/postal code.";
    return null;
  }

  async function handleDetailsContinue() {
    setError(null);

    if (showNameFields) {
      if (!firstName.trim() || !lastName.trim()) {
        setError("Please enter your first and last name.");
        return;
      }
      if (cardContext === "create_account" && onlyDigits(mobilePhone).length < 10) {
        setError("Please enter a valid mobile phone number.");
        return;
      }
    }
    if (showCardFields) {
      const cardError = validateCardFields();
      if (cardError) {
        setError(cardError);
        return;
      }
    }

    setLoading(true);
    try {
      if (cardContext === "create_account") {
        const card = getCardPayloadFromRefs();
        const res = await fetch("/api/mindbody/add-client-with-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalizeEmail(email),
            mobilePhone: mobilePhone.trim(),
            ...card,
            sendPromotionalEmails: marketingOptIn,
            sendPromotionalTexts: marketingOptIn,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          // Client was created but the card failed: flip to the update path
          // so the retry doesn't create a duplicate account.
          if (data?.cardSaveFailed && data?.clientId) {
            setClientId(String(data.clientId));
            setCardContext("add_card");
            setShowNameFields(false);
          }
          throw new Error(data?.error || "Account creation failed.");
        }
        setClientId(String(data.clientId));
        setSavedLastFour(data.lastFour ?? card.cardNumber.slice(-4));
      } else if (showCardFields) {
        // Existing client, card missing (or previous save failed).
        const card = getCardPayloadFromRefs();
        const res = await fetch("/api/mindbody/update-client-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            ...card,
            // Pass names through so stub records (blank name) don't fail
            // Mindbody's whole-object validation.
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "We couldn't save your card.");
        setSavedLastFour(data.lastFour ?? card.cardNumber.slice(-4));
      } else {
        // Existing client with a card on file but a blank name: backfill it.
        const res = await fetch("/api/mindbody/update-client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            mobilePhone: mobilePhone.trim() || undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "We couldn't save your name.");
      }

      if (showCardFields) {
        trackMembership("membership_card_entered", {
          membership_tier: plan.key,
          client_type: cardContext === "create_account" ? "new" : "returning",
        });
      }
      setStep("confirm");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── step 3: review + purchase ────────────────────────────────── */

  async function handlePurchase() {
    setError(null);
    if (!agreeTerms) {
      setError("Please agree to the membership terms to continue.");
      return;
    }
    if (!clientId) {
      setError("Something went wrong. Please start over.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/membership/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          contractId: plan.contractId,
          test: isTest,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Card on file unusable: send them back to the card step.
        if (data?.code === "no_card") {
          setShowCardFields(true);
          setCardContext("add_card");
          setStep("details");
        }
        throw new Error(data?.error || "Purchase failed.");
      }

      setPurchaseTotal(
        typeof data?.totals?.Total === "number" ? data.totals.Total : null
      );

      if (!isTest) {
        trackMembership("membership_purchase_complete", {
          membership_tier: plan.key,
          membership_price: plan.price,
          value: plan.price,
          currency: "USD",
        });
        // Google Ads main "All Purchases" conversion (same primary action the
        // booking flows fire). No membership-specific secondary label exists
        // yet — create one in Google Ads, then add it here.
        const gtag = (window as any).gtag;
        if (typeof gtag === "function") {
          gtag("event", "conversion", {
            send_to: "AW-17421817568/T3o8CK-LoukbEOCtr_NA",
            value: plan.price,
            currency: "USD",
          });
        }
      }
      setStep("done");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── render ───────────────────────────────────────────────────── */

  const firstVisitHref =
    plan.key === "aescape"
      ? "/locations/denver-larimer/book-aescape"
      : plan.key === "remedy"
      ? "/locations/denver-larimer/book-remedy-room"
      : "/locations/denver-larimer/book";

  const stepTitle =
    step === "email"
      ? "Let's find your account"
      : step === "details"
      ? cardContext === "create_account"
        ? "Create your account"
        : showCardFields
        ? "Add a card"
        : "Confirm your name"
      : step === "confirm"
      ? "Review your membership"
      : "";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center font-vance"
      role="dialog"
      aria-modal="true"
      aria-label={`Join ${plan.name} membership`}
    >
      {/* Backdrop. Plain dim, no backdrop-blur: blurring the full viewport
          (hero images + running framer animations underneath) forces
          continuous GPU compositing and visibly slowed machines in testing. */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={loading ? undefined : onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full sm:max-w-md max-h-[92dvh] overflow-y-auto bg-white text-[#113D33] rounded-t-2xl sm:rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#113D33]/10 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A776D]">
              {plan.name} Membership
              {isTest && (
                <span className="ml-2 rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[9px] font-semibold normal-case tracking-normal">
                  Test mode · no charge
                </span>
              )}
            </p>
            <p className="text-sm font-semibold">
              ${plan.price}
              <span className="text-[#113D33]/50 font-normal"> / month</span>
              {stepTitle && (
                <span className="text-[#113D33]/50 font-normal"> · {stepTitle}</span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="rounded-full p-2 text-[#113D33]/50 hover:bg-[#113D33]/5 hover:text-[#113D33] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {/* ── EMAIL ── */}
              {step === "email" && (
                <div className="space-y-4">
                  <p className="text-sm text-[#113D33]/70">{plan.blurb}</p>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleEmailContinue()}
                      className={inputClass}
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-[#113D33]/55">
                    We&apos;ll check if you already have a Sway account.
                  </p>
                  <button onClick={handleEmailContinue} disabled={loading} className={primaryBtn}>
                    {loading ? "Checking…" : "Continue"}
                  </button>
                </div>
              )}

              {/* ── DETAILS ── */}
              {step === "details" && (
                <div className="space-y-4">
                  {showNameFields && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">First name</label>
                          <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClass}
                            autoComplete="given-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Last name</label>
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClass}
                            autoComplete="family-name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Mobile phone</label>
                        <input
                          value={mobilePhone}
                          onChange={(e) => setMobilePhone(e.target.value)}
                          className={inputClass}
                          autoComplete="tel"
                          type="tel"
                        />
                      </div>
                      {showCardFields && <hr className="border-[#113D33]/10" />}
                    </>
                  )}

                  {showCardFields && (
                    <>
                      <div>
                        <label className="block text-xs text-[#113D33]/65 mb-1">Name on card</label>
                        <input
                          ref={cardHolderRef}
                          className={inputClass}
                          autoComplete="cc-name"
                          data-lpignore="true"
                          data-1p-ignore="true"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#113D33]/65 mb-1">Card number</label>
                        <input
                          ref={cardNumberRef}
                          className={inputClass}
                          autoComplete="cc-number"
                          inputMode="numeric"
                          data-lpignore="true"
                          data-1p-ignore="true"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-[#113D33]/65 mb-1">Month</label>
                          <select ref={expMonthRef} className={inputClass} defaultValue="">
                            <option value="">MM</option>
                            {expMonthOptions.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-[#113D33]/65 mb-1">Year</label>
                          <select ref={expYearRef} className={inputClass} defaultValue="">
                            <option value="">YYYY</option>
                            {expYearOptions.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#113D33]/65 mb-1">
                          Billing street address
                        </label>
                        <input
                          ref={billingAddressRef}
                          className={inputClass}
                          autoComplete="billing street-address"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-xs text-[#113D33]/65 mb-1">City</label>
                          <input
                            ref={billingCityRef}
                            className={inputClass}
                            autoComplete="billing address-level2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#113D33]/65 mb-1">State</label>
                          <input
                            ref={billingStateRef}
                            className={inputClass}
                            autoComplete="billing address-level1"
                            maxLength={2}
                            placeholder="CO"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-[#113D33]/65 mb-1">ZIP</label>
                        <input
                          ref={postalCodeRef}
                          className={inputClass}
                          autoComplete="billing postal-code"
                          inputMode="numeric"
                        />
                      </div>
                      <div className="flex items-start gap-2.5 rounded-xl bg-[#113D33]/[0.03] p-3 text-xs text-[#113D33]/60">
                        <Lock className="w-4 h-4 shrink-0 mt-0.5 text-[#113D33]/60" />
                        <span>
                          Your card is stored securely in Mindbody. Nothing is charged
                          until you review and confirm on the next step.
                        </span>
                      </div>
                    </>
                  )}

                  {cardContext === "create_account" && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingOptIn}
                        onChange={(e) => setMarketingOptIn(e.target.checked)}
                        className="w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30"
                      />
                      <span className="text-sm text-[#113D33]/70">
                        Keep me updated on promotions and specials
                      </span>
                    </label>
                  )}

                  <button onClick={handleDetailsContinue} disabled={loading} className={primaryBtn}>
                    {loading ? "Saving…" : "Save & continue"}
                  </button>
                </div>
              )}

              {/* ── CONFIRM ── */}
              {step === "confirm" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#113D33]/10 bg-[#113D33]/[0.03] p-4">
                    <div className="flex items-baseline justify-between">
                      <p className="font-semibold">{plan.name} Membership</p>
                      <p className="font-semibold">
                        ${plan.price}
                        <span className="text-[#113D33]/50 font-normal text-sm"> / mo</span>
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-[#113D33]/60">{plan.blurb}</p>
                    <p className="mt-3 text-xs text-[#113D33]/60">
                      {firstName ? `${firstName}, your` : "Your"} first payment of $
                      {plan.price} is charged today to your card on file
                      {savedLastFour ? ` ending in ${savedLastFour}` : ""}, then monthly
                      on this date.
                    </p>
                  </div>

                  {terms && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#4A776D] mb-1.5">
                        Membership terms
                      </p>
                      <div className="max-h-36 overflow-y-auto rounded-xl border border-[#113D33]/10 p-3 text-[11px] leading-relaxed text-[#113D33]/70 whitespace-pre-wrap">
                        {terms}
                      </div>
                    </div>
                  )}

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30"
                    />
                    <span className="text-xs text-[#113D33]/70">
                      I agree to the membership terms and authorize Sway Wellness Spa to
                      charge ${plan.price} per month to my card on file.
                    </span>
                  </label>

                  <button
                    onClick={handlePurchase}
                    disabled={loading || !agreeTerms}
                    className={primaryBtn}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Starting your membership…
                      </span>
                    ) : (
                      `Start membership · $${plan.price}/mo`
                    )}
                  </button>
                </div>
              )}

              {/* ── DONE ── */}
              {step === "done" && (
                <div className="text-center space-y-4 py-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#113D33] flex items-center justify-center">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Welcome to Sway{firstName ? `, ${firstName}` : ""}.
                    </h3>
                    <p className="mt-1 text-sm text-[#113D33]/70">
                      {isTest
                        ? "Test mode: everything validated, but no membership was created and nothing was charged."
                        : `Your ${plan.name} membership is active${
                            purchaseTotal != null ? ` · $${purchaseTotal} charged today` : ""
                          }. A confirmation email is on its way.`}
                    </p>
                  </div>
                  <a href={firstVisitHref} className={`${primaryBtn} block text-center`}>
                    Book your first visit
                  </a>
                  <button
                    onClick={onClose}
                    className="text-sm text-[#113D33]/60 hover:text-[#113D33] transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p className="mt-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {step !== "done" && (
            <p className="mt-4 text-center text-[11px] text-[#113D33]/45">
              Questions? Call{" "}
              <a href="tel:+13034766150" className="underline">
                (303) 476-6150
              </a>{" "}
              and we&apos;ll help you sign up.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
