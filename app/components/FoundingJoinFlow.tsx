"use client";

/**
 * Founding membership checkout for a Sway spa that isn't open yet (lib/launchSites.ts; Union Market
 * first, John 11/23/2026: "make the flow like the Spavia one but with Sway flair").
 *
 * A full page, not a pop-up, in the Spavia founding checkout's order:
 *   plan → email → (emailed code for an existing account) → your details → card → review → welcome.
 * The founder's card on the side fills in as they go: tier, then their name, then "Founding member".
 *
 * It runs on the SAME server routes as MembershipJoinFlow (email-code session, session-pinned
 * account + card routes, /api/membership/purchase with its double-charge lock), with the launch
 * site's Mindbody siteId. Nothing here talks to Mindbody directly and card fields never enter
 * React state. What is on sale, the start date and the agreement text come live from
 * /api/membership/founding/.
 *
 * Billing shown to the guest: the first month is charged today, the membership starts on the
 * contract's start date, the next charge is a month after that (Mindbody's "charged on a specific
 * date" contracts; same as Mindbody's own store).
 *
 * Tracking (lib/ops, flow "membership", location from the URL, variant = tier): every screen
 * through useFlowTrack, plus "from-founding" when the checkout opens and "founding-joined" on a real
 * sale. Those names are what the Launch Board's Founding Checkout funnel reads
 * (/api/ops/funnel/). The owner's follow-up list (who stopped where) is kept server-side
 * (lib/foundingCheckouts.ts). ?memtest=1 = Mindbody's no-charge test sale, and records nothing.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Lock } from "lucide-react";
import { trackStep, useFlowTrack } from "@/lib/ops/client";
import { SwayCurve } from "./SwayCurve";
import ArrowMark from "./ArrowMark";

export type FoundingTier = "essential" | "premier" | "ultimate";

type LivePlan = {
  tier: FoundingTier;
  contractId: number;
  price: number;
  available: boolean;
  startLabel: string | null;
  fixedStart: boolean;
  nextChargeLabel: string | null;
  terms: string | null;
};

type Step = "plan" | "email" | "code" | "member" | "details" | "payment" | "review" | "done";

export type FoundingJoinProps = {
  locationKey: string; // "union-market"
  shortName: string; // "Sway Union Market"
  cityLine: string; // "Washington, DC"
  siteId: string;
  helpEmail: string;
  /** Page prices, shown until the live plans load. */
  tiers: Record<FoundingTier, { contractId: number; price: number }>;
  initialTier: FoundingTier | null;
  /** ?memtest=1: Mindbody's no-charge test sale. Nothing is recorded. */
  test: boolean;
  /** False while the founding page still takes interest only (the checkout opens with ?memtest=1). */
  salesOpen: boolean;
};

const TIER_ORDER: FoundingTier[] = ["essential", "premier", "ultimate"];
const TIER_COPY: Record<FoundingTier, { name: string; line: string }> = {
  essential: { name: "Essential", line: "One Essential massage or facial a month: our signature treatments." },
  premier: { name: "Premier", line: "One Premier massage or facial a month: targeted treatments, or more time." },
  ultimate: { name: "Ultimate", line: "One Ultimate massage or facial a month: our longest and most advanced treatments." },
};
const EVERY_MEMBERSHIP = [
  "One massage or facial every month",
  "Unused treatments roll over for 12 months while you stay active",
  "Member pricing on extra treatments",
  "Share your treatment with one family member or partner",
];
const PROGRESS: { key: Step; label: string }[] = [
  { key: "plan", label: "Plan" },
  { key: "email", label: "Email" },
  { key: "details", label: "You" },
  { key: "payment", label: "Card" },
  { key: "review", label: "Review" },
];

/* ── helpers (same validation as the booking flows) ─────────────── */
const normalizeEmail = (s: string) => (s || "").trim().toLowerCase();
const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const onlyDigits = (s: string) => (s || "").replace(/[^\d]/g, "");
function luhnCheck(cardNumber: string) {
  const digits = onlyDigits(cardNumber);
  if (digits.length < 12) return false;
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}
function detectCardType(n: string) {
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n)) return "MasterCard";
  if (/^3[47]/.test(n)) return "AmericanExpress";
  if (/^6(011|5)/.test(n) || /^64[4-9]/.test(n)) return "Discover";
  return "Visa";
}
const GA4_STREAM_SUFFIX = "V4ZXNRGV84";
function gaIdsFromCookies(): { gaClientId: string | null; gaSessionId: string | null } {
  try {
    const read = (name: string) => document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1] ?? null;
    const ga = read("_ga");
    const stream = read(`_ga_${GA4_STREAM_SUFFIX}`);
    return { gaClientId: ga ? ga.split(".").slice(-2).join(".") : null, gaSessionId: stream ? stream.split(".")[2] ?? null : null };
  } catch {
    return { gaClientId: null, gaSessionId: null };
  }
}

const inputClass =
  "w-full rounded-[3px] border border-[#113D33]/30 bg-white px-4 py-3 text-base text-[#113D33] placeholder:text-[#113D33]/55 focus:border-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/25";
const labelClass = "mb-1.5 block text-sm font-medium";
const primaryBtn =
  "sway-button w-full justify-center !gap-3 text-[15px] disabled:cursor-not-allowed disabled:opacity-40";
const quietLink = "text-sm underline underline-offset-4 hover:no-underline disabled:opacity-40";

export default function FoundingJoinFlow(props: FoundingJoinProps) {
  const { locationKey, shortName, cityLine, siteId, helpEmail, test, salesOpen } = props;
  const base = `/locations/${locationKey}`;

  const [tier, setTier] = useState<FoundingTier | null>(props.initialTier);
  const [step, setStep] = useState<Step>(props.initialTier ? "email" : "plan");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState<{ checkoutReady: boolean; plans: LivePlan[] } | null>(null);
  const [liveFailed, setLiveFailed] = useState(false);

  const price = tier ? live?.plans.find((p) => p.tier === tier)?.price ?? props.tiers[tier].price : null;
  const plan = tier ? live?.plans.find((p) => p.tier === tier) ?? null : null;

  // First-party funnel. A test run, or a visit while sales are still closed, reports nothing
  // (an empty step is skipped by the hook): the Launch Board's funnel is real guests only.
  const counted = salesOpen && !test;
  useFlowTrack("membership", counted ? step : "", tier, error, price ?? undefined);
  useEffect(() => {
    if (counted) trackStep("membership", "from-founding", props.initialTier ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GA4 funnel (the membership_* events already have GTM tags). Never in test mode.
  const track = (event: string, extra: Record<string, unknown> = {}) => {
    if (!counted) return;
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, membership_location: locationKey.replace(/-/g, "_"), membership_founding: true, ...extra });
    } catch {
      /* tracking never breaks the checkout */
    }
  };

  useEffect(() => {
    track("membership_start", { membership_tier: props.initialTier ?? "none" });
    fetch(`/api/membership/founding/?location=${encodeURIComponent(locationKey)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setLive({ checkoutReady: Boolean(d?.checkoutReady), plans: Array.isArray(d?.plans) ? d.plans : [] }))
      .catch(() => setLiveFailed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  /** "create" = no account yet (made together with the card). "card" = account exists, needs a card. */
  const [cardContext, setCardContext] = useState<"create" | "card">("create");
  const [needsName, setNeedsName] = useState(true);
  const [savedLastFour, setSavedLastFour] = useState<string | null>(null);
  const [existing, setExisting] = useState<{ label: string; home: string | null } | null>(null);
  const [afterMember, setAfterMember] = useState<Step>("details");
  const [termsOpen, setTermsOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const checkRef = useRef<any>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Card inputs are uncontrolled, as in every Sway flow: card data stays out of React state.
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  const zipRef = useRef<HTMLInputElement | null>(null);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")), []);
  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(y + i));
  }, []);

  // Each new screen starts at its heading (keyboard and screen reader users land in the right place).
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  /** The shared routes word their help line for Larimer. This spa has no phone line yet. */
  const local = (msg: string) =>
    msg
      .replace(/call(?: us at)? \(303\) 476-6150/gi, `email ${helpEmail}`)
      .replace(/Call \(303\) 476-6150/g, `Email ${helpEmail}`)
      .replace(/\(303\) 476-6150/g, helpEmail);
  const fail = (msg: string) => setError(local(msg));

  const post = (url: string, body: Record<string, unknown>) =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, siteId }) });

  /** Tell the server which screen was reached, for the owner's follow-up list. Never awaited. */
  const note = (stage: "payment" | "review") => {
    void fetch("/api/membership/founding/progress/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ stage, firstName: firstName.trim(), lastName: lastName.trim(), phone: mobilePhone.trim(), test }),
    }).catch(() => {});
  };
  const go = (next: Step) => {
    setError(null);
    setNotice(null);
    if (next === "payment" || next === "review") note(next);
    setStep(next);
  };

  /* ── plan ─────────────────────────────────────────────────────── */
  function choosePlan(t: FoundingTier) {
    setTier(t);
    // Changing plans from the review screen comes straight back to it.
    go(clientId && savedLastFour ? "review" : "email");
  }

  /* ── email → code ─────────────────────────────────────────────── */
  async function requestCode(address: string): Promise<"new" | "code_sent" | null> {
    const res = await post("/api/membership/verify/start", { email: address, test });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (data?.code === "cooldown" && typeof data?.retryAfter === "number") setResendIn(data.retryAfter);
      fail(data?.error || "Something went wrong. Please try again.");
      return null;
    }
    if (data.status === "code_sent") setResendIn(typeof data.resendAfter === "number" ? data.resendAfter : 30);
    return data.status === "new" ? "new" : "code_sent";
  }

  function startNewGuest() {
    track("membership_email_entered", { membership_tier: tier, client_type: "new" });
    setClientId(null);
    setCardContext("create");
    setNeedsName(true);
    go("details");
  }

  async function submitEmail() {
    setError(null);
    const address = normalizeEmail(email);
    if (!isValidEmail(address)) return fail("Please enter a valid email address.");
    setLoading(true);
    try {
      const [status, check] = await Promise.all([
        requestCode(address),
        fetch(`/api/membership/check?email=${encodeURIComponent(address)}&siteId=${encodeURIComponent(siteId)}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);
      checkRef.current = check;
      if (!status) return;
      if (status === "new") return startNewGuest();
      track("membership_email_entered", { membership_tier: tier, client_type: "returning" });
      setCode("");
      go("code");
    } catch (err: any) {
      fail(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    if (resendIn > 0 || loading) return;
    setError(null);
    setLoading(true);
    try {
      const status = await requestCode(normalizeEmail(email));
      if (status === "code_sent") {
        setCode("");
        setNotice(`New code sent to ${normalizeEmail(email)}.`);
      } else if (status === "new") startNewGuest();
    } finally {
      setLoading(false);
    }
  }

  async function submitCode(value = code) {
    setError(null);
    setNotice(null);
    const digits = onlyDigits(value);
    if (digits.length !== 6) return fail("Please enter the 6-digit code from your email.");
    setLoading(true);
    try {
      const res = await post("/api/membership/verify/confirm", { email: normalizeEmail(email), code: digits, test });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCode("");
        return fail(data?.error || "That code didn't work. Please try again.");
      }
      if (data.status !== "verified" || !data.client) return startNewGuest();

      const c = data.client;
      const first = (c.firstName ?? "").trim();
      const last = (c.lastName ?? "").trim();
      track("membership_code_verified", { membership_tier: tier, client_type: "returning" });
      setClientId(String(c.id));
      setFirstName(first);
      setLastName(last);
      setMobilePhone((c.mobilePhone ?? "").trim());
      setSavedLastFour(c.hasCardOnFile ? c.lastFour ?? null : null);
      setCardContext("card");
      const missingName = !first || !last;
      setNeedsName(missingName);
      const next: Step = missingName ? "details" : c.hasCardOnFile ? "review" : "payment";

      // Already on a membership somewhere at Sway or Spavia: say so before they buy a second one.
      const check = checkRef.current;
      if (check?.isMember && check?.tier) {
        setExisting({
          label: `${String(check.tier).charAt(0).toUpperCase()}${String(check.tier).slice(1)} membership`,
          home: check.isLocalMember ? null : check.homeLocation ?? null,
        });
        setAfterMember(next);
        track("membership_existing_member_detected", { membership_tier: tier, cross_regional: !check.isLocalMember });
        return go("member");
      }
      go(next);
    } catch (err: any) {
      fail(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function sessionLost(data: any): boolean {
    if (data?.code !== "verify_required") return false;
    setClientId(null);
    setCode("");
    setAgree(false);
    setStep("email");
    setError("For your security, your email confirmation expired. Please continue with your email again.");
    return true;
  }

  /* ── your details ─────────────────────────────────────────────── */
  async function submitDetails() {
    setError(null);
    if (!firstName.trim() || !lastName.trim()) return fail("Please enter your first and last name.");
    if (cardContext === "create" && onlyDigits(mobilePhone).length < 10) return fail("Please enter a valid mobile phone number.");
    if (cardContext === "create") return go("payment"); // the account is made with the card, next screen
    // An existing account with a blank name: save it now.
    setLoading(true);
    try {
      const res = await post("/api/membership/account/name", {
        clientId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobilePhone: mobilePhone.trim() || undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (sessionLost(data)) return;
      if (!res.ok) return fail(data?.error || "We couldn't save your name.");
      setNeedsName(false);
      go(savedLastFour ? "review" : "payment");
    } catch (err: any) {
      fail(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── card ─────────────────────────────────────────────────────── */
  function cardFromRefs() {
    const cardNumber = onlyDigits(cardNumberRef.current?.value || "");
    const expYearRaw = (expYearRef.current?.value || "").trim();
    return {
      cardHolder: (cardHolderRef.current?.value || "").trim(),
      cardNumber,
      expMonth: (expMonthRef.current?.value || "").trim().padStart(2, "0"),
      expYear: expYearRaw.length === 2 ? `20${expYearRaw}` : expYearRaw,
      postalCode: (zipRef.current?.value || "").trim(),
      cardType: detectCardType(cardNumber),
      address: (addressRef.current?.value || "").trim(),
      city: (cityRef.current?.value || "").trim(),
      state: (stateRef.current?.value || "").trim(),
    };
  }
  function cardProblem(): string | null {
    const c = cardFromRefs();
    if (!c.cardHolder) return "Please enter the name on the card.";
    if (c.cardNumber.length < 12) return "Please enter a valid card number.";
    if (!luhnCheck(c.cardNumber)) return "Card number looks invalid. Please double-check.";
    if (!c.expMonth || Number(c.expMonth) < 1 || Number(c.expMonth) > 12) return "Please select an expiration month.";
    if (c.expYear.length < 4) return "Please select an expiration year.";
    const now = new Date();
    if (Number(c.expYear) === now.getFullYear() && Number(c.expMonth) < now.getMonth() + 1) return "This card appears to be expired.";
    if (!c.address) return "Please enter your billing street address.";
    if (!c.city) return "Please enter your billing city.";
    if (!c.state) return "Please enter your billing state.";
    if (c.postalCode.length < 3) return "Please enter a valid ZIP code.";
    return null;
  }

  async function submitCard() {
    setError(null);
    const problem = cardProblem();
    if (problem) return fail(problem);
    setLoading(true);
    try {
      const card = cardFromRefs();
      if (cardContext === "create") {
        const res = await post("/api/membership/account/create", {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: normalizeEmail(email),
          mobilePhone: mobilePhone.trim(),
          ...card,
          sendPromotionalEmails: marketingOptIn,
          sendPromotionalTexts: marketingOptIn,
        });
        const data = await res.json().catch(() => ({}));
        if (sessionLost(data)) return;
        if (!res.ok) {
          // The account was made but the card wasn't saved: retry as "add a card", never a second account.
          if (data?.cardSaveFailed && data?.clientId) {
            setClientId(String(data.clientId));
            setCardContext("card");
            setNeedsName(false);
          }
          return fail(data?.error || "We couldn't create your account.");
        }
        setClientId(String(data.clientId));
        setCardContext("card");
        setSavedLastFour(data.lastFour ?? card.cardNumber.slice(-4));
      } else {
        const res = await post("/api/membership/account/card", {
          clientId,
          ...card,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        });
        const data = await res.json().catch(() => ({}));
        if (sessionLost(data)) return;
        if (!res.ok) return fail(data?.error || "We couldn't save your card.");
        setSavedLastFour(data.lastFour ?? card.cardNumber.slice(-4));
      }
      track("membership_card_entered", { membership_tier: tier });
      go("review");
    } catch (err: any) {
      fail(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── review → join ────────────────────────────────────────────── */
  async function join() {
    setError(null);
    if (!tier || !plan) return fail("Please choose a membership first.");
    if (!agree) return fail("Please agree to the membership terms to continue.");
    if (!clientId) return fail("Something went wrong. Please start again with your email.");
    setLoading(true);
    try {
      const res = await post("/api/membership/purchase", { clientId, contractId: plan.contractId, test, ...gaIdsFromCookies() });
      const data = await res.json().catch(() => null);
      if (!data) {
        // No readable answer: the charge may or may not have happened. Never invite a blind retry.
        setBlocked(true);
        return fail(`We couldn't confirm whether your membership went through. Please don't try again yet: check your email for a confirmation from Sway, or email ${helpEmail} and we'll check for you.`);
      }
      if (sessionLost(data)) return;
      if (data?.code === "in_progress" || data?.code === "uncertain") setBlocked(true);
      if (!res.ok) {
        if (data?.code === "no_card" || data?.code === "card_failed") {
          setSavedLastFour(null);
          setCardContext("card");
          setStep("payment");
        }
        return fail(data?.error || "We couldn't complete your membership.");
      }
      if (counted) {
        trackStep("membership", "founding-joined", tier);
        track("membership_purchase_complete", { membership_tier: tier, membership_price: plan.price, value: plan.price, currency: "USD" });
      }
      go("done");
    } catch (err: any) {
      fail(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── render ───────────────────────────────────────────────────── */
  const tierName = tier ? TIER_COPY[tier].name : null;
  const fullName = `${firstName} ${lastName}`.trim();
  const progressKey: Step = step === "code" || step === "member" ? "email" : step;
  const progressIdx = PROGRESS.findIndex((p) => p.key === progressKey);
  const notReady = live !== null && !live.checkoutReady;
  const closed = (!salesOpen && !test) || notReady || liveFailed;
  const billing = plan?.startLabel
    ? plan.fixedStart
      ? `Your first month, $${plan.price}, is charged today. Your membership starts ${plan.startLabel}. Your next charge is ${plan.nextChargeLabel}, then $${plan.price} on the same day each month.`
      : `$${plan.price} is charged today, then $${plan.price} on the same day each month.`
    : null;

  const FounderCard = (
    <div className="relative overflow-hidden rounded-[6px] bg-[#113D33] p-6 text-[#F7F4E9] shadow-[0_22px_45px_-22px_rgba(17,61,51,0.6)] md:p-7" aria-hidden="true">
      <SwayCurve width={220} strokeWidth={1.4} className="pointer-events-none absolute -right-10 top-6 text-[#B6CFBF]/35" />
      <p className="sway-eyebrow text-[#B6CFBF]">{step === "done" ? "Founding member" : "Founding membership"}</p>
      <p className="cf-title mt-8 min-h-[2.2em] break-words text-[26px] leading-tight md:text-[30px]">{fullName || "Your name here"}</p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#F7F4E9]/20 pt-4">
        <div>
          <p className="text-[15px]">{shortName}</p>
          <p className="text-xs text-[#F7F4E9]/75">{cityLine}</p>
        </div>
        <p className="text-right text-[15px]">
          {tierName ?? "Choose a plan"}
          {price !== null && <span className="block text-xs text-[#F7F4E9]/75">${price} a month</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="club-founding min-h-screen bg-[#F7F4E9] pb-16 pt-24 text-[#113D33] md:pt-32" data-ops-private>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[minmax(0,1fr)_380px] md:gap-14 md:px-6">
        <div className="min-w-0">
          <Link href={`${base}/founding-membership/`} data-track="founding-join-back" className="text-sm underline underline-offset-4 hover:no-underline">
            Back to founding membership
          </Link>
          <p className="sway-eyebrow mt-6 text-[#4A776D]">
            {shortName} · Founding membership
            {test && <span className="ml-2 rounded-[2px] bg-[#EBE4D1] px-1.5 py-0.5 normal-case tracking-normal text-[#113D33]">Test mode, no charge</span>}
          </p>

          {step !== "done" && !closed && (
            <ol className="mt-4 flex gap-1.5" aria-label="Checkout steps">
              {PROGRESS.map((p, i) => (
                <li key={p.key} className="flex-1" aria-current={i === progressIdx ? "step" : undefined}>
                  <span className={`block h-[3px] rounded-full ${i <= progressIdx ? "bg-[#113D33]" : "bg-[#113D33]/15"}`} />
                  <span className={`mt-1.5 block text-xs ${i === progressIdx ? "font-semibold" : "text-[#113D33]/75"}`}>
                    <span className="sr-only">Step {i + 1} of {PROGRESS.length}: </span>
                    {p.label}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {/* The founder's card rides along on phones, above the form */}
          {step !== "done" && !closed && <div className="mt-6 md:hidden">{FounderCard}</div>}

          <div className="mt-7 md:mt-9" aria-live="polite">
            {closed ? (
              <section>
                <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">
                  Founding checkout opens soon.
                </h1>
                <p className="mt-4 max-w-md text-base text-[#113D33]/85">
                  {liveFailed
                    ? "We couldn't load the founding plans just now. Please try again in a few minutes."
                    : `Online signup for ${shortName} isn't open yet. Leave your name on the founding page and you'll be the first to hear when it is.`}
                </p>
                <Link href={`${base}/founding-membership/#reserve`} data-track="founding-join-closed-reserve" className="sway-button mt-6">
                  Reserve my spot <span aria-hidden="true"><ArrowMark /></span>
                </Link>
              </section>
            ) : (
              <>
                {step === "plan" && (
                  <section>
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">Choose your membership.</h1>
                    <p className="mt-3 max-w-md text-base text-[#113D33]/85">Three tiers, each with one massage or facial a month.</p>
                    <ul className="mt-6 space-y-3">
                      {TIER_ORDER.map((t) => {
                        const p = live?.plans.find((x) => x.tier === t);
                        const off = p ? !p.available : false;
                        return (
                          <li key={t}>
                            <button
                              type="button"
                              disabled={off}
                              onClick={() => choosePlan(t)}
                              data-track={`founding-plan-${t}`}
                              aria-pressed={tier === t}
                              className="group flex w-full items-center justify-between gap-4 rounded-[4px] border border-[#113D33]/25 bg-white p-5 text-left transition hover:border-[#113D33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D33] disabled:opacity-50"
                            >
                              <span>
                                <span className="block text-xl">{TIER_COPY[t].name}</span>
                                <span className="mt-1 block text-sm text-[#113D33]/85">{off ? "Not available online right now." : TIER_COPY[t].line}</span>
                              </span>
                              <span className="shrink-0 text-right">
                                <span className="cf-num block text-3xl">${p?.price ?? props.tiers[t].price}</span>
                                <span className="text-xs text-[#113D33]/75">a month</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}

                {step === "email" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">Start with your email.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">We&apos;ll check if you already have a Sway account. If you do, we&apos;ll email you a quick code to confirm it&apos;s you.</p>
                    <label htmlFor="fj-email" className={`${labelClass} mt-6`}>Email</label>
                    <input id="fj-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitEmail()} className={inputClass} placeholder="you@example.com" autoComplete="email" autoFocus />
                    <button type="button" onClick={submitEmail} disabled={loading} data-track="founding-email-continue" className={`${primaryBtn} mt-5`}>
                      {loading ? "Checking…" : "Continue"}
                    </button>
                    <p className="mt-4 text-xs text-[#113D33]/75">If you don&apos;t finish, {shortName} may reach out to help you lock in your founding rate.</p>
                  </section>
                )}

                {step === "code" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">Check your email.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">
                      Enter the code we sent to <span className="break-all font-semibold">{normalizeEmail(email)}</span>. It expires in 10 minutes.
                    </p>
                    <label htmlFor="fj-code" className={`${labelClass} mt-6`}>6-digit code</label>
                    <input
                      id="fj-code"
                      value={code}
                      onChange={(e) => {
                        const digits = onlyDigits(e.target.value).slice(0, 6);
                        setCode(digits);
                        if (digits.length === 6 && !loading) submitCode(digits);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && submitCode()}
                      className={`${inputClass} text-center text-2xl tracking-[0.4em]`}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      autoFocus
                    />
                    {notice && <p className="mt-2 text-sm text-[#2F5D50]">{notice}</p>}
                    <button type="button" onClick={() => submitCode()} disabled={loading || code.length !== 6} data-track="founding-code-continue" className={`${primaryBtn} mt-5`}>
                      {loading ? "Checking…" : "Continue"}
                    </button>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      <button type="button" onClick={resend} disabled={resendIn > 0 || loading} data-track="founding-code-resend" className={quietLink}>
                        {resendIn > 0 ? `Send a new code in ${resendIn}s` : "Send a new code"}
                      </button>
                      <button type="button" onClick={() => go("email")} disabled={loading} data-track="founding-code-change-email" className={quietLink}>
                        Use a different email
                      </button>
                    </div>
                  </section>
                )}

                {step === "member" && existing && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">You&apos;re already a member.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">
                      This email has an active {existing.label}
                      {existing.home ? ` at ${existing.home}` : ""}. A founding membership here would be a second membership, billed on its own.
                    </p>
                    <p className="mt-3 text-base text-[#113D33]/85">Want to move your membership to {shortName} instead? Email <a className="underline underline-offset-4" href={`mailto:${helpEmail}`}>{helpEmail}</a> and we&apos;ll help.</p>
                    <button type="button" onClick={() => go(afterMember)} data-track="founding-member-continue" className={`${primaryBtn} mt-6`}>
                      Add a founding membership anyway
                    </button>
                    <Link href={`${base}/`} data-track="founding-member-back" className={`${quietLink} mt-4 inline-block`}>
                      Back to {shortName}
                    </Link>
                  </section>
                )}

                {step === "details" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">Tell us who you are.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">This is the name on your membership.</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="fj-first" className={labelClass}>First name</label>
                        <input id="fj-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} autoComplete="given-name" autoFocus />
                      </div>
                      <div>
                        <label htmlFor="fj-last" className={labelClass}>Last name</label>
                        <input id="fj-last" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} autoComplete="family-name" />
                      </div>
                    </div>
                    <label htmlFor="fj-phone" className={`${labelClass} mt-4`}>Mobile phone</label>
                    <input id="fj-phone" type="tel" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitDetails()} className={inputClass} autoComplete="tel" inputMode="tel" placeholder="(202) 555-0123" />
                    {cardContext === "create" && (
                      <label className="mt-4 flex items-start gap-3 text-sm">
                        <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#113D33]" />
                        <span>Keep me updated on promotions and specials</span>
                      </label>
                    )}
                    <button type="button" onClick={submitDetails} disabled={loading} data-track="founding-details-continue" className={`${primaryBtn} mt-6`}>
                      {loading ? "Saving…" : "Continue to card"}
                    </button>
                  </section>
                )}

                {step === "payment" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">Add your card.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">Nothing is charged on this screen. You&apos;ll review everything before you join.</p>
                    <div className="mt-6 rounded-[4px] border border-[#113D33]/20 bg-white p-4 md:p-5">
                      <p className="flex items-center gap-2 text-xs text-[#113D33]/75"><Lock className="h-3.5 w-3.5" aria-hidden="true" /> Sent securely to Mindbody, Sway&apos;s booking system. We never store your card number.</p>
                      <label htmlFor="fj-cc-number" className={`${labelClass} mt-4`}>Card number</label>
                      <input id="fj-cc-number" ref={cardNumberRef} className={inputClass} inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" data-ops-ignore />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="fj-cc-month" className={labelClass}>Month</label>
                          <select id="fj-cc-month" ref={expMonthRef} className={inputClass} autoComplete="cc-exp-month" defaultValue="">
                            <option value="" disabled>MM</option>
                            {months.map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="fj-cc-year" className={labelClass}>Year</label>
                          <select id="fj-cc-year" ref={expYearRef} className={inputClass} autoComplete="cc-exp-year" defaultValue="">
                            <option value="" disabled>YYYY</option>
                            {years.map((y) => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                      </div>
                      <label htmlFor="fj-cc-name" className={`${labelClass} mt-3`}>Name on card</label>
                      <input id="fj-cc-name" ref={cardHolderRef} className={inputClass} autoComplete="cc-name" defaultValue={fullName} />
                      <label htmlFor="fj-cc-address" className={`${labelClass} mt-3`}>Billing street address</label>
                      <input id="fj-cc-address" ref={addressRef} className={inputClass} autoComplete="billing address-line1" />
                      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_72px_104px] gap-3">
                        <div>
                          <label htmlFor="fj-cc-city" className={labelClass}>City</label>
                          <input id="fj-cc-city" ref={cityRef} className={inputClass} autoComplete="billing address-level2" />
                        </div>
                        <div>
                          <label htmlFor="fj-cc-state" className={labelClass}>State</label>
                          <input id="fj-cc-state" ref={stateRef} className={inputClass} autoComplete="billing address-level1" maxLength={2} placeholder="DC" />
                        </div>
                        <div>
                          <label htmlFor="fj-cc-zip" className={labelClass}>ZIP</label>
                          <input id="fj-cc-zip" ref={zipRef} className={inputClass} autoComplete="billing postal-code" inputMode="numeric" />
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={submitCard} disabled={loading} data-track="founding-card-continue" className={`${primaryBtn} mt-6`}>
                      {loading ? "Saving your card…" : "Review my membership"}
                    </button>
                  </section>
                )}

                {step === "review" && tier && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl">Review and join.</h1>
                    <dl className="mt-6 divide-y divide-[#113D33]/15 border-y border-[#113D33]/15 text-[15px]">
                      <div className="flex justify-between gap-4 py-3"><dt>Membership</dt><dd className="text-right">Founding {tierName}<button type="button" onClick={() => go("plan")} disabled={loading} data-track="founding-review-change-plan" className={`${quietLink} ml-3`}>Change</button></dd></div>
                      <div className="flex justify-between gap-4 py-3"><dt>Member</dt><dd className="break-all text-right">{fullName || normalizeEmail(email)}</dd></div>
                      <div className="flex justify-between gap-4 py-3"><dt>Card</dt><dd className="text-right">{savedLastFour ? `Ending in ${savedLastFour}` : "On file"}<button type="button" onClick={() => { setCardContext("card"); go("payment"); }} disabled={loading} data-track="founding-review-change-card" className={`${quietLink} ml-3`}>Use a different card</button></dd></div>
                      {plan?.startLabel && plan.fixedStart && <div className="flex justify-between gap-4 py-3"><dt>Membership starts</dt><dd className="text-right">{plan.startLabel}</dd></div>}
                      <div className="flex items-baseline justify-between gap-4 py-3"><dt className="font-semibold">Due today</dt><dd className="cf-num text-3xl">${price}</dd></div>
                    </dl>
                    {billing && <p className="mt-4 text-sm text-[#113D33]/85">{billing}</p>}
                    <p className="mt-2 text-sm text-[#113D33]/85">Your membership renews every 12 months until you cancel. To cancel, contact the spa by phone or email.</p>

                    {plan?.terms && (
                      <div className="mt-5 rounded-[4px] border border-[#113D33]/20 bg-white">
                        <button type="button" onClick={() => setTermsOpen((o) => !o)} aria-expanded={termsOpen} data-track="founding-review-terms" className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium">
                          Membership agreement
                          <ChevronDown className={`h-4 w-4 transition ${termsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                        {termsOpen && <div className="max-h-64 overflow-y-auto whitespace-pre-wrap border-t border-[#113D33]/15 px-4 py-3 text-[13px] leading-relaxed text-[#113D33]/85">{plan.terms}</div>}
                      </div>
                    )}
                    <label className="mt-5 flex items-start gap-3 text-sm">
                      <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#113D33]" />
                      <span>I agree to the membership agreement and authorize {shortName} to charge my card ${price} today and ${price} each month as described above.</span>
                    </label>
                    <button type="button" onClick={join} disabled={loading || blocked || !plan?.available} data-track="founding-join-submit" className={`${primaryBtn} mt-6`}>
                      {loading ? "Joining…" : test ? "Run test (no charge)" : `Become a founding member · $${price} today`}
                    </button>
                    {!plan && <p className="mt-3 text-sm text-[#113D33]/75">Loading your plan…</p>}
                  </section>
                )}

                {step === "done" && tier && (
                  <section>
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#2F5D50]"><Check className="h-4 w-4" aria-hidden="true" /> {test ? "Test passed. Nothing was charged and no membership was created." : "You're in."}</p>
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title mt-3 text-[38px] leading-[1.02] focus:outline-none md:text-6xl">Welcome, founding member.</h1>
                    <div className="mt-7 max-w-sm">{FounderCard}</div>
                    <ul className="mt-7 max-w-md space-y-3 text-base">
                      {!test && <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />A confirmation is on its way to {normalizeEmail(email)}.</li>}
                      {plan?.startLabel && plan.fixedStart && <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />Your membership starts {plan.startLabel}. Your next charge is {plan.nextChargeLabel}.</li>}
                      <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />We&apos;ll email you as soon as booking opens.</li>
                    </ul>
                    <Link href={`${base}/`} data-track="founding-done-back" className="sway-button mt-8">
                      Back to {shortName} <span aria-hidden="true"><ArrowMark /></span>
                    </Link>
                  </section>
                )}

                {error && (
                  <p role="alert" className="mt-5 max-w-md rounded-[4px] border border-[#8A2B1D]/40 bg-[#FBEDEA] px-4 py-3 text-sm text-[#7A2418]">
                    {error}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Desktop: the founder's card and what every membership includes, alongside the form */}
        {step !== "done" && !closed && (
          <aside className="hidden md:block">
            <div className="sticky top-28">
              {FounderCard}
              <ul className="mt-6 space-y-2.5 text-[15px]">
                {EVERY_MEMBERSHIP.map((line) => (
                  <li key={line} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />{line}</li>
                ))}
              </ul>
              {billing && <p className="mt-5 border-t border-[#113D33]/15 pt-4 text-sm text-[#113D33]/85">{billing}</p>}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
