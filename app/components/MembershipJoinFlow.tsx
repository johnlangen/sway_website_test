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
import { Check, ChevronDown, Lock, X } from "lucide-react";
import { HideFloatingWidgets } from "./HideFloatingWidgets";
import { useDialogA11y } from "@/lib/useDialogA11y";

export type MembershipPlan = {
  key: "essential" | "premier" | "ultimate" | "aescape" | "remedy";
  contractId: number;
  name: string;
  price: number; // monthly USD
  blurb: string; // one-line inclusion summary shown in the flow
};

type Step = "email" | "already" | "details" | "confirm" | "done";

// Spa-tier member perks, shown on the review step as a final value reminder.
// Spa tiers only — Aescape/Remedy perks differ.
const SPA_MEMBER_PERKS = [
  "50% off all boosts",
  "50% off Remedy Room",
  "Private member lounge",
  "Bring a friend at member pricing",
  "10% off retail",
  "Rollover credits",
];

const SPA_TIER_KEYS = ["essential", "premier", "ultimate"];

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
    // Test mode (?memtest=1) is fully silent: no funnel events either, so
    // test runs never pollute GA4 once GTM tags exist for membership_*.
    if (new URLSearchParams(window.location.search).has("memtest")) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...extra });
  } catch {
    // Tracking failure must never break the flow.
  }
}

/* ── styles (mirrors the booking flow) ──────────────────────────── */

const inputClass =
  "w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-2.5 text-[#113D33] placeholder:text-[#113D33]/60 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-base transition-shadow duration-200";

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
  // Modal a11y: trap focus, move focus in on open, Escape to close, restore
  // focus to trigger on close (WCAG 2.4.3 / 2.1.2). Don't allow close mid-charge.
  const loadingRef = useRef(false);
  const dialogRef = useDialogA11y<HTMLDivElement>(true, () => {
    if (!loadingRef.current) onClose();
  });
  const [step, setStep] = useState<Step>("email");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

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
  const [termsOpen, setTermsOpen] = useState(false);
  // Set when the email already carries an equivalent active membership
  // (local or cross-regional, e.g. a Spavia home spa). We warn before they
  // buy a duplicate — memberships work at all Sway/Spavia locations.
  const [existingMembership, setExistingMembership] = useState<{
    label: string;
    homeLocation: string | null;
  } | null>(null);
  const [stepAfterAlready, setStepAfterAlready] = useState<Step>("confirm");
  // Returning members with a card on file skip the details step; the
  // progress indicator collapses to match (steps must map 1:1 to reality).
  const [showDetailsStep, setShowDetailsStep] = useState(true);
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
      // Account lookup + membership check in parallel. The membership check
      // is cross-regional: it catches active memberships whose home spa is
      // another Sway/Spavia location (memberships work everywhere), so we can
      // warn before someone buys a duplicate. Best-effort — if it fails, the
      // join proceeds normally.
      const [res, checkData] = await Promise.all([
        fetch(`/api/mindbody/client-lookup?email=${encodeURIComponent(normalized)}`),
        fetch(`/api/membership/check?email=${encodeURIComponent(normalized)}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Lookup failed.");

      // Plan-aware duplicate detection: only warn when the existing
      // membership is the same family as what they're buying (a spa member
      // buying an Aescape membership is a legitimate second purchase).
      const duplicate =
        (SPA_TIER_KEYS.includes(plan.key) && checkData?.isMember && checkData?.tier
          ? `${String(checkData.tier).charAt(0).toUpperCase()}${String(checkData.tier).slice(1)} membership`
          : null) ??
        (plan.key === "aescape" && checkData?.hasAescapeMembership
          ? "Aescape membership"
          : null) ??
        (plan.key === "remedy" && checkData?.hasRemedyMembership
          ? "Remedy Room membership"
          : null);

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

        const target: Step = !missingName && !missingCard ? "confirm" : "details";
        if (target === "confirm") setShowDetailsStep(false);
        setShowNameFields(missingName);
        setShowCardFields(missingCard);
        setCardContext(missingCard ? "add_card" : null);

        if (duplicate) {
          setExistingMembership({
            label: duplicate,
            homeLocation: checkData?.isLocalMember ? null : checkData?.homeLocation ?? null,
          });
          setStepAfterAlready(target);
          trackMembership("membership_existing_member_detected", {
            membership_tier: plan.key,
            cross_regional: !checkData?.isLocalMember,
          });
          setStep("already");
          return;
        }

        setStep(target);
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
        // Card on file missing or declined: send them straight to the card
        // step to try another card. Name/phone state is preserved.
        if (data?.code === "no_card" || data?.code === "card_failed") {
          setShowCardFields(true);
          setCardContext("add_card");
          setShowDetailsStep(true);
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
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center font-vance focus:outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Join ${plan.name} membership`}
    >
      {/* Chat bubble + offer chip float above the modal otherwise. */}
      <HideFloatingWidgets />
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

        {/* Progress indicator: labeled steps, current highlighted, completed
            email step tappable to start over. Hidden on the success screen. */}
        {step !== "done" && step !== "already" && (
          <div className="flex items-center justify-center gap-1.5 px-5 pt-4 text-[11px]">
            {(
              [
                { key: "email" as Step, label: "Account" },
                ...(showDetailsStep
                  ? [{ key: "details" as Step, label: "Details" }]
                  : []),
                { key: "confirm" as Step, label: "Review" },
              ] as { key: Step; label: string }[]
            ).map((s, i, steps) => {
              const currentIdx = steps.findIndex((x) => x.key === step);
              const isCurrent = s.key === step;
              const isPast = i < currentIdx;
              // Only the email step is safely revisitable (card inputs are
              // intentionally not kept in state, so details can't re-render
              // filled-in).
              const canGoBack = isPast && s.key === "email";
              return (
                <div key={s.key} className="flex items-center gap-1.5">
                  {i > 0 && <span className="h-px w-5 bg-[#113D33]/15" />}
                  <button
                    aria-current={isCurrent ? "step" : undefined}
                    type="button"
                    disabled={!canGoBack || loading}
                    onClick={() => canGoBack && setStep("email")}
                    className={`flex items-center gap-1.5 rounded-full px-2 py-1 transition ${
                      canGoBack ? "hover:bg-[#113D33]/5 cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[9px] font-bold ${
                        isCurrent
                          ? "bg-[#113D33] text-white"
                          : isPast
                          ? "bg-[#4A776D] text-white"
                          : "bg-[#113D33]/10 text-[#113D33]/50"
                      }`}
                    >
                      {isPast ? <Check className="w-2.5 h-2.5" /> : i + 1}
                    </span>
                    <span
                      className={
                        isCurrent
                          ? "font-semibold text-[#113D33]"
                          : "text-[#113D33]/50"
                      }
                    >
                      {s.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

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
                      aria-label="Email"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-[#113D33]/55">
                    We&apos;ll check if you already have a Sway account. Joining
                    takes about 2 minutes.
                  </p>
                  <button onClick={handleEmailContinue} disabled={loading} className={primaryBtn}>
                    {loading ? "Checking…" : "Continue"}
                  </button>
                </div>
              )}

              {/* ── ALREADY A MEMBER ── */}
              {step === "already" && existingMembership && (
                <div className="text-center space-y-4 py-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#9ABFB3]/30 flex items-center justify-center">
                    <Check className="w-7 h-7 text-[#113D33]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {firstName ? `${firstName}, you're` : "You're"} already a
                      member.
                    </h3>
                    <p className="mt-2 text-sm text-[#113D33]/70">
                      {existingMembership.homeLocation
                        ? `Your ${existingMembership.label} from ${existingMembership.homeLocation} already works at every Sway and Spavia location, including Sway Larimer. There's no need to buy a second one.`
                        : `You already have an active ${existingMembership.label} here at Sway Larimer.`}
                    </p>
                  </div>
                  <a href={firstVisitHref} className={`${primaryBtn} block text-center`}>
                    Book with my membership
                  </a>
                  <button
                    onClick={() => setStep(stepAfterAlready)}
                    className="text-xs text-[#113D33]/55 underline hover:text-[#113D33] transition"
                  >
                    I want to purchase an additional membership anyway
                  </button>
                </div>
              )}

              {/* ── DETAILS ── */}
              {step === "details" && (
                <div className="space-y-3">
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
                            aria-label="First name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Last name</label>
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClass}
                            autoComplete="family-name"
                            aria-label="Last name"
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
                          aria-label="Mobile phone"
                        />
                      </div>
                      {showCardFields && <hr className="border-[#113D33]/10" />}
                    </>
                  )}

                  {showCardFields && (
                    <>
                      {/* Card fields in a visually distinct secure panel,
                          ordered like the physical card (number, expiry,
                          name). Perceived-security pattern: encapsulated
                          card section + padlock inside the panel. */}
                      <div className="rounded-xl border border-[#113D33]/15 bg-[#113D33]/[0.03] p-3.5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-[#113D33]">
                            <Lock className="w-3.5 h-3.5 text-[#4A776D]" />
                            Card details
                          </span>
                          <span className="text-[10px] text-[#113D33]/50">
                            Secure, encrypted
                          </span>
                        </div>
                        <div>
                          <label className="block text-xs text-[#113D33]/65 mb-1">Card number</label>
                          <input
                            ref={cardNumberRef}
                            className={inputClass}
                            autoComplete="cc-number"
                            inputMode="numeric"
                            aria-label="Card number"
                            data-lpignore="true"
                            data-1p-ignore="true"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-[#113D33]/65 mb-1">Month</label>
                            <select ref={expMonthRef} className={inputClass} defaultValue="" aria-label="Expiration month">
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
                            <select ref={expYearRef} className={inputClass} defaultValue="" aria-label="Expiration year">
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
                          <label className="block text-xs text-[#113D33]/65 mb-1">Name on card</label>
                          <input
                            ref={cardHolderRef}
                            className={inputClass}
                            autoComplete="cc-name"
                            aria-label="Name on card"
                            data-lpignore="true"
                            data-1p-ignore="true"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#4A776D] mb-2">
                          Billing address
                        </p>
                        <div className="space-y-3">
                          <input
                            ref={billingAddressRef}
                            className={inputClass}
                            autoComplete="billing street-address"
                            placeholder="Street address"
                            aria-label="Billing street address"
                          />
                          <div className="grid grid-cols-4 gap-3">
                            <input
                              ref={billingCityRef}
                              className={`${inputClass} col-span-2`}
                              autoComplete="billing address-level2"
                              placeholder="City"
                              aria-label="Billing city"
                            />
                            <input
                              ref={billingStateRef}
                              className={inputClass}
                              autoComplete="billing address-level1"
                              maxLength={2}
                              placeholder="CO"
                              aria-label="Billing state"
                            />
                            <input
                              ref={postalCodeRef}
                              className={inputClass}
                              autoComplete="billing postal-code"
                              inputMode="numeric"
                              placeholder="ZIP"
                              aria-label="Billing ZIP code"
                            />
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[#113D33]/55">
                        Nothing is charged yet. You&apos;ll review everything on
                        the next step before your membership starts.
                      </p>
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
                      on this date. Your membership renews automatically until you
                      cancel.
                    </p>
                  </div>

                  {SPA_TIER_KEYS.includes(plan.key) && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                      {SPA_MEMBER_PERKS.map((perk) => (
                        <span
                          key={perk}
                          className="flex items-center gap-1.5 text-[11px] text-[#113D33]/70"
                        >
                          <Check className="w-3 h-3 text-[#4A776D] shrink-0" />
                          {perk}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Terms behind a disclosure, not a forced wall of legalese
                      at the decision point (clickwrap pattern: terms one tap
                      away before agreeing is enough — almost nobody reads
                      them, but the block itself adds commitment anxiety). */}
                  {terms && (
                    <div className="rounded-xl border border-[#113D33]/10">
                      <button
                        type="button"
                        onClick={() => setTermsOpen(!termsOpen)}
                        aria-expanded={termsOpen}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-semibold text-[#4A776D]"
                      >
                        View membership terms
                        <motion.span
                          animate={{ rotate: termsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {termsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="max-h-40 overflow-y-auto border-t border-[#113D33]/10 p-3 text-[11px] leading-relaxed text-[#113D33]/70 whitespace-pre-wrap">
                              {terms}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                      `Start my membership · $${plan.price}/mo`
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#113D33]/55">
                    {SPA_TIER_KEYS.includes(plan.key)
                      ? "No enrollment fee · Treatments roll over · Pause up to 3 months a year"
                      : "No enrollment fee · Secure Mindbody checkout"}
                  </p>
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
