"use client";

/**
 * The membership checkout page. One flow for every membership the site sells (John 11/23/2026:
 * "with all our memberships we should implement this new page and flow ... and have extremely
 * thorough tracking on it"): Larimer's memberships, the clubs' Remedy Lounge and founding
 * memberships, and a launch site's founding membership (Union Market, where this flow started as
 * FoundingJoinFlow). What it sells and how it words things comes from lib/membershipOffers.ts.
 *
 * A full page, not a pop-up:
 *   (plan) → email → (emailed code for an existing account) → your details → card → review → welcome.
 * The member card on the side fills in as they go: what the plan is, then their name.
 *
 * It runs on the SAME server routes the pop-up (MembershipJoinFlow) uses: email-code session,
 * session-pinned account + card routes, /api/membership/purchase with its double-charge lock.
 * Nothing here talks to Mindbody directly and card fields never enter React state. Larimer sends no
 * siteId, exactly as the pop-up did. A launch site reads price, start date and terms live from
 * /api/membership/founding/; everyone else reads the agreement from /api/membership/contracts/.
 *
 * TRACKING (lib/ops; nothing in test mode, nothing while a founding offer is closed):
 *  - Screens: flow "membership", one step per screen (plan, email, code, member, details, payment,
 *    review, done), plus "opened" when the page loads and "joined" on a real sale. Variant = plan.
 *    A launch site's FOUNDING checkout also sends "from-founding" / "founding-joined" (the Launch
 *    Board reads those). Its Remedy Room membership (?tier=remedy) does not: it is not founding,
 *    and its screens are recorded under variant "remedy", which the Launch Board feed leaves out.
 *  - Detail: flow "checkout", one count per thing that happened (see ev() calls): where they came
 *    from, new vs returning guest, code sent / resent / wrong, saved card vs new card, which card
 *    field failed, declines, plan switches, terms opened, time spent on each screen (bucketed) and
 *    the screen they left from. Read: node scripts/ops.mjs --funnel checkout
 *  - Every message shown to the guest is counted by useFlowTrack (the "messages guests saw" list).
 *  - GA4 dataLayer: the same membership_* events the pop-up fired (they have GTM tags), with
 *    membership_checkout: "page". Google Ads conversions on a real join are unchanged per site.
 *  - Who stopped where (email, furthest screen): kept server-side for the spa's follow-up
 *    (lib/foundingCheckouts.ts); the email screen says so.
 *  - The sale itself is recorded by the purchase route after Mindbody confirms (the /ops ledger).
 * ?memtest=1 = Mindbody's no-charge test sale. ?memtest=1&preview=welcome opens on the welcome screen.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Lock } from "lucide-react";
import { trackStep, useFlowTrack } from "@/lib/ops/client";
import { fireClubAdsConversionBySite } from "@/lib/clubAds";
import type { CheckoutConfig, CheckoutPlan } from "@/lib/membershipOffers";
import { SwayCurve } from "./SwayCurve";
import ArrowMark from "./ArrowMark";
import FoundingCelebration from "./FoundingCelebration";
import { HideFloatingWidgets } from "./HideFloatingWidgets";

type LivePlan = {
  tier: string;
  contractId: number;
  price: number;
  available: boolean;
  startLabel: string | null;
  fixedStart: boolean;
  nextChargeLabel: string | null;
  terms: string | null;
};

type Step = "plan" | "email" | "code" | "member" | "details" | "payment" | "review" | "done";

export type MembershipCheckoutProps = {
  config: CheckoutConfig;
  initialPlan: string | null;
  /** ?memtest=1: Mindbody's no-charge test sale. Nothing is recorded. */
  test: boolean;
  /** ?memtest=1&preview=welcome: open on the welcome screen (test mode only; nothing is sent). */
  previewWelcome?: boolean;
  /** ?from=…: which button opened the checkout. */
  from?: string | null;
};

const LARIMER_PHONE = "(303) 476-6150";
// Entry points the pages send (?from=). Anything else counts as "other" so a URL can't invent a step name.
const SOURCES = ["hero", "tier", "card", "compare", "sticky", "bar", "final", "founding", "membership", "offer", "location"];

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
/** Time on a screen, in a handful of buckets (never the raw number). */
const timeBucket = (ms: number) => (ms < 10_000 ? "under-10s" : ms < 30_000 ? "10-30s" : ms < 60_000 ? "30-60s" : ms < 180_000 ? "1-3m" : "over-3m");
/** Which card field a validation message is about (for the card-invalid count). */
const cardField = (msg: string) =>
  /name on the card/i.test(msg) ? "name" : /card number/i.test(msg) ? "number" : /expir/i.test(msg) ? "expiry" : /street/i.test(msg) ? "address" : /city/i.test(msg) ? "city" : /state/i.test(msg) ? "state" : /zip/i.test(msg) ? "zip" : "other";

const inputClass =
  "w-full rounded-[3px] border border-[#113D33]/30 bg-white px-4 py-3 text-base text-[#113D33] placeholder:text-[#113D33]/55 focus:border-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/25";
const labelClass = "mb-1.5 block text-sm font-medium";
const primaryBtn = "sway-button w-full justify-center !gap-3 text-[15px] disabled:cursor-not-allowed disabled:opacity-40";
const quietLink = "text-sm underline underline-offset-4 hover:no-underline disabled:opacity-40";
const h1Class = "cf-title text-[34px] leading-[1.05] focus:outline-none md:text-5xl";

export default function MembershipCheckout({ config: cfg, initialPlan, test, previewWelcome: previewProp, from }: MembershipCheckoutProps) {
  const { shortName, cityLine, siteId, help } = cfg;
  const previewWelcome = Boolean(previewProp && test);
  const single = cfg.plans.length === 1;

  const [planKey, setPlanKey] = useState<string | null>(initialPlan ?? (previewWelcome || single ? cfg.plans[0].key : null));
  const [step, setStep] = useState<Step>(previewWelcome ? "done" : initialPlan || single ? "email" : "plan");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState<{ checkoutReady: boolean; plans: LivePlan[] } | null>(null);
  const [liveFailed, setLiveFailed] = useState(false);
  const [terms, setTerms] = useState<string | null>(null);

  /** A launch site's founding checkout (not its Remedy Room membership, which is a regular membership). */
  const foundingLaunch = cfg.launch && cfg.offer === "founding";
  /** "founding membership" / "Remedy Room membership", for the sentences a launch site shows. */
  const thisMembership = cfg.offer === "founding" ? "founding membership" : cfg.label;

  const plan: CheckoutPlan | null = planKey ? cfg.plans.find((p) => p.key === planKey) ?? null : null;
  const livePlan = plan && cfg.launch ? live?.plans.find((p) => p.tier === plan.key) ?? null : null;
  const price = plan ? livePlan?.price ?? plan.price : null;
  /** Can this plan be bought right now? A launch site waits for its live check. */
  const sellable = Boolean(plan) && (!cfg.launch || Boolean(livePlan?.available));
  const agreement = cfg.launch ? livePlan?.terms ?? null : terms;

  /* ── tracking ─────────────────────────────────────────────────── */
  // A test run, or a visit while the offer is closed, reports nothing: the funnel is real guests only.
  const counted = cfg.salesOpen && !test;
  useFlowTrack("membership", counted ? step : "", planKey, error, price ?? undefined);
  const planRef = useRef(planKey);
  planRef.current = planKey;
  /** One count in the checkout detail stream. Variant defaults to the plan. */
  const ev = (name: string, variant?: string) => {
    if (counted) trackStep("checkout", name, variant ?? planRef.current ?? undefined);
  };
  // GA4 funnel (the membership_* events already have GTM tags). Never in test mode.
  const track = (event: string, extra: Record<string, unknown> = {}) => {
    if (!counted) return;
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event,
        membership_location: cfg.analyticsKey,
        membership_checkout: "page",
        ...(cfg.offer === "founding" ? { membership_founding: true } : {}),
        ...extra,
      });
    } catch {
      /* tracking never breaks the checkout */
    }
  };

  // Came from booking's "Become a member" (sessionStorage flag set on the booking page).
  const fromBookingRef = useRef(false);
  useEffect(() => {
    if (counted) {
      trackStep("membership", "opened", initialPlan ?? undefined);
      if (foundingLaunch) trackStep("membership", "from-founding", initialPlan ?? undefined);
      try {
        fromBookingRef.current = sessionStorage.getItem("sway_join_from") === "booking";
      } catch {}
      if (fromBookingRef.current) trackStep("membership", "from-booking", initialPlan ?? undefined);
      const src = fromBookingRef.current ? "booking" : from ? (SOURCES.includes(from) ? from : "other") : "direct";
      ev(`from-${src}`);
    }
    track("membership_start", { membership_tier: initialPlan ?? "none", membership_price: price ?? undefined });

    if (cfg.launch) {
      fetch(`/api/membership/founding/?location=${encodeURIComponent(cfg.locationKey)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) =>
          setLive({
            // Founding needs every founding tier on sale; the Remedy Room membership only needs itself.
            checkoutReady: Boolean(foundingLaunch ? d?.checkoutReady : d?.remedyReady),
            plans: [...(Array.isArray(d?.plans) ? d.plans : []), ...(d?.remedy ? [d.remedy] : [])],
          })
        )
        .catch(() => setLiveFailed(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The agreement for the chosen plan (launch sites get it with their live plans).
  useEffect(() => {
    if (cfg.launch || !plan) return;
    let stale = false;
    setTerms(null);
    fetch(`/api/membership/contracts${siteId ? `?siteId=${encodeURIComponent(siteId)}` : ""}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const match = data?.contracts?.find((c: { id: number }) => c.id === plan.contractId);
        if (!stale && match?.agreementTerms) setTerms(match.agreementTerms);
      })
      .catch(() => {});
    return () => {
      stale = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan?.contractId]);

  // Time on each screen, and the screen a guest leaves from.
  const stepRef = useRef<Step>(step);
  const enteredAt = useRef(Date.now());
  const leftSent = useRef(false);
  useEffect(() => {
    const prev = stepRef.current;
    if (prev === step) return;
    if (prev !== "done") ev(`time-${prev}`, timeBucket(Date.now() - enteredAt.current));
    stepRef.current = step;
    enteredAt.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  useEffect(() => {
    const onHide = () => {
      if (stepRef.current === "done" || leftSent.current) return;
      leftSent.current = true;
      ev(`left-${stepRef.current}`, timeBucket(Date.now() - enteredAt.current));
    };
    const onShow = () => {
      leftSent.current = false;
    };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("pageshow", onShow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── state ────────────────────────────────────────────────────── */
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(cfg.marketingDefault);
  const [clientId, setClientId] = useState<string | null>(null);
  /** "create" = no account yet (made together with the card). "card" = account exists, needs a card. */
  const [cardContext, setCardContext] = useState<"create" | "card">("create");
  const [savedLastFour, setSavedLastFour] = useState<string | null>(null);
  const [existing, setExisting] = useState<{ label: string; home: string | null } | null>(null);
  const [afterMember, setAfterMember] = useState<Step>("details");
  const [termsOpen, setTermsOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [chargedToday, setChargedToday] = useState<number | null>(null);
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

  /** The shared routes word their help line with Larimer's phone. Say this spa's own contact instead. */
  const local = (msg: string) => {
    if (help.email && !help.phone)
      return msg
        .replace(/call(?: us at)? \(303\) 476-6150/gi, `email ${help.email}`)
        .replace(/Call \(303\) 476-6150/g, `Email ${help.email}`)
        .replace(/\(303\) 476-6150/g, help.email);
    if (help.phone && help.phone !== LARIMER_PHONE) return msg.replace(/\(303\) 476-6150/g, help.phone);
    return msg;
  };
  const fail = (msg: string) => setError(local(msg));
  const helpAsk = help.phone ? `call ${help.phone}` : `email ${help.email}`;

  const post = (url: string, body: Record<string, unknown>) =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, ...(siteId ? { siteId } : {}) }) });
  const siteQuery = siteId ? `&siteId=${encodeURIComponent(siteId)}` : "";

  /** Tell the server which screen was reached, for the spa's follow-up list. Never awaited. */
  const note = (stage: "payment" | "review") => {
    if (!cfg.followUp) return;
    void fetch("/api/membership/founding/progress/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ stage, firstName: firstName.trim(), lastName: lastName.trim(), phone: mobilePhone.trim(), test, plan: planRef.current ?? undefined }),
    }).catch(() => {});
  };
  const go = (next: Step) => {
    setError(null);
    setNotice(null);
    if (next === "payment" || next === "review") note(next);
    setStep(next);
  };

  /* ── plan ─────────────────────────────────────────────────────── */
  function choosePlan(key: string) {
    if (planKey && planKey !== key) ev("plan-switch", key);
    setPlanKey(key);
    setAgree(false);
    // Changing plans from the review screen comes straight back to it.
    go(clientId && savedLastFour ? "review" : "email");
  }

  /* ── email → code ─────────────────────────────────────────────── */
  async function requestCode(address: string): Promise<"new" | "code_sent" | null> {
    const res = await post("/api/membership/verify/start", { email: address, test, followUp: cfg.followUp, plan: planRef.current ?? undefined });
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
    track("membership_email_entered", { membership_tier: planKey, client_type: "new" });
    ev("guest-new");
    setClientId(null);
    setCardContext("create");
    go("details");
  }

  async function submitEmail() {
    setError(null);
    const address = normalizeEmail(email);
    if (!isValidEmail(address)) return fail("Please enter a valid email address.");
    setLoading(true);
    try {
      // The membership check is cross-regional: it finds an active membership whose home spa is
      // another Sway or Spavia location, so we can say so before someone buys a second one.
      const [status, check] = await Promise.all([
        requestCode(address),
        fetch(`/api/membership/check?email=${encodeURIComponent(address)}${siteQuery}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);
      checkRef.current = check;
      if (!status) return;
      if (status === "new") return startNewGuest();
      track("membership_email_entered", { membership_tier: planKey, client_type: "returning" });
      ev("guest-returning");
      ev("code-sent");
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
        ev("code-resent");
        setCode("");
        setNotice(`New code sent to ${normalizeEmail(email)}.`);
      } else if (status === "new") startNewGuest();
    } finally {
      setLoading(false);
    }
  }

  /** Plan-aware duplicate check (the pop-up's rule): only the same kind of membership is a duplicate. */
  function duplicateLabel(check: any): string | null {
    if (!plan) return null;
    if (plan.family === "spa" && check?.isMember && check?.tier)
      return `${String(check.tier).charAt(0).toUpperCase()}${String(check.tier).slice(1)} membership`;
    if (plan.family === "aescape" && check?.hasAescapeMembership) return "Aescape membership";
    if (plan.family === "remedy" && check?.hasRemedyMembership) return "Remedy Room membership";
    // Any active club membership already includes the Remedy Lounge (migrated founding / legacy
    // members and members of the other club). A local massage or facial member has no Lounge.
    if (plan.family === "club_lounge" && (check?.hasRemedyMembership || (check?.isMember && !check?.isLocalMember))) return "Remedy Lounge membership";
    return null;
  }

  async function submitCode(value = code) {
    setError(null);
    setNotice(null);
    const digits = onlyDigits(value);
    if (digits.length !== 6) return fail("Please enter the 6-digit code from your email.");
    setLoading(true);
    try {
      const res = await post("/api/membership/verify/confirm", { email: normalizeEmail(email), code: digits, test, followUp: cfg.followUp, plan: planRef.current ?? undefined });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        ev("code-wrong");
        setCode("");
        return fail(data?.error || "That code didn't work. Please try again.");
      }
      if (data.status !== "verified" || !data.client) return startNewGuest();

      const c = data.client;
      const first = (c.firstName ?? "").trim();
      const last = (c.lastName ?? "").trim();
      track("membership_code_verified", { membership_tier: planKey, client_type: "returning" });
      ev("code-ok");
      setClientId(String(c.id));
      setFirstName(first);
      setLastName(last);
      setMobilePhone((c.mobilePhone ?? "").trim());
      setSavedLastFour(c.hasCardOnFile ? c.lastFour ?? null : null);
      setCardContext("card");
      const missingName = !first || !last;
      const next: Step = missingName ? "details" : c.hasCardOnFile ? "review" : "payment";
      if (!missingName && c.hasCardOnFile) ev("card-on-file");

      // Already on a membership that covers this: say so before they buy a second one.
      const check = checkRef.current;
      const duplicate = duplicateLabel(check);
      if (duplicate) {
        setExisting({ label: duplicate, home: check?.isLocalMember ? null : check?.homeLocation ?? null });
        setAfterMember(next);
        track("membership_existing_member_detected", { membership_tier: planKey, cross_regional: !check?.isLocalMember });
        ev("already-member", check?.isLocalMember ? "local" : "other-location");
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
    ev("session-expired", stepRef.current);
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
    if (problem) {
      ev("card-invalid", cardField(problem));
      return fail(problem);
    }
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
          }
          ev("card-rejected", "new-account");
          return fail(data?.error || "We couldn't create your account.");
        }
        setClientId(String(data.clientId));
        setCardContext("card");
        setSavedLastFour(data.lastFour ?? card.cardNumber.slice(-4));
        ev("account-created", marketingOptIn ? "opted-in" : "no-marketing");
      } else {
        const res = await post("/api/membership/account/card", {
          clientId,
          ...card,
          // Names go along so a stub record (blank name) doesn't fail Mindbody's whole-object check.
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        });
        const data = await res.json().catch(() => ({}));
        if (sessionLost(data)) return;
        if (!res.ok) {
          ev("card-rejected", "existing-account");
          return fail(data?.error || "We couldn't save your card.");
        }
        setSavedLastFour(data.lastFour ?? card.cardNumber.slice(-4));
      }
      track("membership_card_entered", { membership_tier: planKey, client_type: cardContext === "create" ? "new" : "returning" });
      ev("card-saved");
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
    if (!plan || !sellable || price === null) return fail("Please choose a membership first.");
    if (!agree) return fail("Please agree to the membership terms to continue.");
    if (!clientId) return fail("Something went wrong. Please start again with your email.");
    setLoading(true);
    ev("submit");
    try {
      const res = await post("/api/membership/purchase", { clientId, contractId: plan.contractId, test, ...gaIdsFromCookies() });
      const data = await res.json().catch(() => null);
      if (!data) {
        // No readable answer: the charge may or may not have happened. Never invite a blind retry.
        setBlocked(true);
        ev("uncertain");
        return fail(`We couldn't confirm whether your membership went through. Please don't try again yet: check your email for a confirmation from Sway, or ${helpAsk} and we'll check for you.`);
      }
      if (sessionLost(data)) return;
      if (data?.code === "in_progress" || data?.code === "uncertain") {
        setBlocked(true);
        ev("uncertain", data.code);
      }
      if (!res.ok) {
        ev("join-failed", typeof data?.code === "string" ? data.code : "other");
        if (data?.code === "no_card" || data?.code === "card_failed") {
          ev("declined", data.code);
          setSavedLastFour(null);
          setCardContext("card");
          setStep("payment");
        } else if (data?.code === "off_sale") ev("off-sale");
        return fail(data?.error || "We couldn't complete your membership.");
      }
      setChargedToday(typeof data?.totals?.Total === "number" ? data.totals.Total : null);
      if (counted) {
        trackStep("membership", "joined", plan.key, { value: price });
        if (foundingLaunch) trackStep("membership", "founding-joined", plan.key);
        track("membership_purchase_complete", { membership_tier: plan.key, membership_price: price, value: price, currency: "USD" });
        // Google Ads, unchanged from the pop-up. Larimer: the main "All Purchases" conversion plus
        // the "Membership Signup" secondary action. A club: its OWN "Membership Join" action
        // (lib/clubAds.ts; nothing where the club has no label), never Larimer's. Launch sites: none.
        if (cfg.ads === "club" && siteId) {
          fireClubAdsConversionBySite(siteId, "membership", { value: price, transactionId: `${cfg.analyticsKey}-${plan.key}-${Date.now()}` });
        } else if (cfg.ads === "larimer") {
          const gtag = (window as any).gtag;
          if (typeof gtag === "function") {
            gtag("event", "conversion", { send_to: "AW-17421817568/T3o8CK-LoukbEOCtr_NA", value: price, currency: "USD" });
            gtag("event", "conversion", { send_to: "AW-17421817568/zgrgCKjdvtccEOCtr_NA", value: price, currency: "USD" });
          }
        }
        if (fromBookingRef.current) {
          trackStep("membership", "joined-from-booking", plan.key);
          try {
            sessionStorage.removeItem("sway_join_from");
          } catch {}
        }
      }
      go("done");
    } catch (err: any) {
      fail(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  /* ── render ───────────────────────────────────────────────────── */
  const fullName = `${firstName} ${lastName}`.trim();
  const progress: { key: Step; label: string }[] = [
    ...(single ? [] : [{ key: "plan" as Step, label: "Plan" }]),
    { key: "email", label: "Email" },
    { key: "details", label: "You" },
    { key: "payment", label: "Card" },
    { key: "review", label: "Review" },
  ];
  const progressKey: Step = step === "code" || step === "member" ? "email" : step;
  const progressIdx = progress.findIndex((p) => p.key === progressKey);
  const notReady = cfg.launch && live !== null && !live.checkoutReady;
  const closed = (!cfg.salesOpen && !test) || notReady || (cfg.launch && liveFailed);
  const fixedStart = Boolean(livePlan?.startLabel && livePlan.fixedStart);
  const billing =
    price === null
      ? null
      : fixedStart
        ? `Your first month, $${price}, is charged today. Your membership starts ${livePlan!.startLabel}. Your next charge is ${livePlan!.nextChargeLabel}, then $${price} on the same day each month.`
        : `$${price} is charged today, then $${price} on the same day each month.`;

  const MemberCard = (
    <div className="relative overflow-hidden rounded-[6px] bg-[#113D33] p-6 text-[#F7F4E9] shadow-[0_22px_45px_-22px_rgba(17,61,51,0.6)] md:p-7" aria-hidden="true">
      <SwayCurve width={220} strokeWidth={1.4} animate={step === "done"} className="pointer-events-none absolute -right-10 top-6 text-[#B6CFBF]/35" />
      {step === "done" && <span className="cf-sheen" />}
      <p className="sway-eyebrow text-[#B6CFBF]">{step === "done" ? cfg.memberLabel : cfg.label}</p>
      <p className={`cf-title mt-8 min-h-[2.2em] break-words text-[26px] leading-tight md:text-[30px] ${step === "done" ? "cf-name-in" : ""}`}>{fullName || (plan ? plan.headline : cfg.memberLabel)}</p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#F7F4E9]/20 pt-4">
        <div>
          <p className="text-[15px]">{shortName}</p>
          <p className="text-xs text-[#F7F4E9]/75">{cityLine}</p>
        </div>
        <p className="text-right text-[15px]">
          {plan?.name ?? "Choose a plan"}
          {price !== null && <span className="block text-xs text-[#F7F4E9]/75">${price} a month</span>}
        </p>
      </div>
    </div>
  );

  /** The price against what it would otherwise cost. Only where the plan has a comparison price. */
  const PriceLadder =
    plan && plan.visit !== undefined && price !== null ? (
      <dl className="mt-4 space-y-1 border-y border-[#113D33]/15 py-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-[#113D33]/80">Single visit</dt>
          <dd className="text-[#113D33]/80 line-through decoration-[#113D33]/50">${plan.visit}</dd>
        </div>
        {plan.regular !== undefined && (
          <div className="flex justify-between gap-3">
            <dt className="text-[#113D33]/80">Regular membership</dt>
            <dd className="text-[#113D33]/80 line-through decoration-[#113D33]/50">${plan.regular} a month</dd>
          </div>
        )}
        <div className="flex justify-between gap-3 font-semibold">
          <dt>{plan.regular !== undefined ? "Founding rate" : "Member rate"}</dt>
          <dd>${price} a month</dd>
        </div>
      </dl>
    ) : null;

  return (
    <div className="club-founding min-h-screen bg-[#F7F4E9] pb-16 pt-24 text-[#113D33] md:pt-32" data-ops-private>
      {/* The chat bubble and offer chip would sit on top of the Continue button on phones. */}
      <HideFloatingWidgets />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[minmax(0,1fr)_380px] md:gap-14 md:px-6">
        <div className="min-w-0">
          <Link href={cfg.back.href} data-track="checkout-back" className="text-sm underline underline-offset-4 hover:no-underline">
            {cfg.back.label}
          </Link>
          <p className="sway-eyebrow mt-6 text-[#4A776D]">
            {shortName} · {cfg.label}
            {test && <span className="ml-2 rounded-[2px] bg-[#EBE4D1] px-1.5 py-0.5 normal-case tracking-normal text-[#113D33]">Test mode, no charge</span>}
          </p>

          {step !== "done" && !closed && (
            <ol className="mt-4 flex gap-1.5" aria-label="Checkout steps">
              {progress.map((p, i) => (
                <li key={p.key} className="flex-1" aria-current={i === progressIdx ? "step" : undefined}>
                  <span className={`block h-[3px] rounded-full ${i <= progressIdx ? "bg-[#113D33]" : "bg-[#113D33]/15"}`} />
                  <span className={`mt-1.5 block text-xs ${i === progressIdx ? "font-semibold" : "text-[#113D33]/75"}`}>
                    <span className="sr-only">Step {i + 1} of {progress.length}: </span>
                    {p.label}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {/* The member card rides along on phones, above the form */}
          {step !== "done" && !closed && (
            <div className="mt-6 md:hidden">
              {MemberCard}
              {plan && (
                <p className="mt-3 text-sm text-[#113D33]/85">
                  {plan.short}, every month
                  {plan.visit !== undefined && price !== null ? `. $${plan.visit - price} less than a single visit.` : "."}
                </p>
              )}
            </div>
          )}

          <div className="mt-7 md:mt-9" aria-live="polite">
            {closed ? (
              <section>
                <h1 ref={headingRef} tabIndex={-1} className={h1Class}>
                  Online signup opens soon.
                </h1>
                <p className="mt-4 max-w-md text-base text-[#113D33]/85">
                  {cfg.launch && liveFailed
                    ? "We couldn't load the plans just now. Please try again in a few minutes."
                    : `Online signup for this membership at ${shortName} isn't open right now.`}
                </p>
                <Link href={cfg.back.href} data-track="checkout-closed-back" className="sway-button mt-6">
                  {cfg.back.label} <span aria-hidden="true"><ArrowMark /></span>
                </Link>
              </section>
            ) : (
              <>
                {step === "plan" && (
                  <section>
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>Choose your membership.</h1>
                    <ul className="mt-6 space-y-3">
                      {cfg.plans.map((p) => {
                        const lp = cfg.launch ? live?.plans.find((x) => x.tier === p.key) : undefined;
                        const off = lp ? !lp.available : false;
                        const shown = lp?.price ?? p.price;
                        return (
                          <li key={p.key}>
                            <button
                              type="button"
                              disabled={off}
                              onClick={() => choosePlan(p.key)}
                              data-track={`checkout-plan-${p.key}`}
                              aria-pressed={planKey === p.key}
                              className="group flex w-full items-center justify-between gap-4 rounded-[4px] border border-[#113D33]/25 bg-white p-5 text-left transition hover:border-[#113D33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D33] disabled:opacity-50"
                            >
                              <span>
                                <span className="block text-xl">{p.name}</span>
                                <span className="mt-1 block text-sm text-[#113D33]/85">{off ? "Not available online right now." : p.line}</span>
                              </span>
                              <span className="shrink-0 text-right">
                                <span className="cf-num block text-3xl">${shown}</span>
                                <span className="text-xs text-[#113D33]/75">a month</span>
                                {p.visit !== undefined && <span className="block text-xs text-[#113D33]/75"><s>${p.visit}</s> single visit</span>}
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
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>Start with your email.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">We&apos;ll check if you already have a Sway account. If you do, we&apos;ll email you a quick code to confirm it&apos;s you.</p>
                    <label htmlFor="mc-email" className={`${labelClass} mt-6`}>Email</label>
                    <input
                      id="mc-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !loading && submitEmail()}
                      className={inputClass}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      autoFocus
                    />
                    <button type="button" onClick={submitEmail} disabled={loading} data-track="checkout-email-continue" className={`${primaryBtn} mt-5`}>
                      {loading ? "Checking…" : "Continue"}
                    </button>
                    {cfg.followUp && (
                      <p className="mt-4 text-xs text-[#113D33]/75">
                        If you don&apos;t finish, {shortName} may reach out to help you {cfg.offer === "founding" ? "lock in your founding rate" : "finish joining"}.
                      </p>
                    )}
                  </section>
                )}

                {step === "code" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>Check your email.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">
                      Enter the code we sent to <span className="break-all font-semibold">{normalizeEmail(email)}</span>. It expires in 10 minutes.
                    </p>
                    <label htmlFor="mc-code" className={`${labelClass} mt-6`}>6-digit code</label>
                    <input
                      id="mc-code"
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
                    <button type="button" onClick={() => submitCode()} disabled={loading || code.length !== 6} data-track="checkout-code-continue" className={`${primaryBtn} mt-5`}>
                      {loading ? "Checking…" : "Continue"}
                    </button>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      <button type="button" onClick={resend} disabled={resendIn > 0 || loading} data-track="checkout-code-resend" className={quietLink}>
                        {resendIn > 0 ? `Send a new code in ${resendIn}s` : "Send a new code"}
                      </button>
                      <button type="button" onClick={() => { ev("email-change"); go("email"); }} disabled={loading} data-track="checkout-code-change-email" className={quietLink}>
                        Use a different email
                      </button>
                    </div>
                  </section>
                )}

                {step === "member" && existing && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>{firstName ? `${firstName}, you're` : "You're"} already a member.</h1>
                    {cfg.launch ? (
                      <>
                        <p className="mt-3 text-base text-[#113D33]/85">
                          This email has an active {existing.label}
                          {existing.home ? ` at ${existing.home}` : ""}. A {thisMembership} here would be a second membership, billed on its own.
                        </p>
                        <p className="mt-3 text-base text-[#113D33]/85">Want to move your membership to {shortName} instead? Email <a className="underline underline-offset-4" href={`mailto:${help.email}`}>{help.email}</a> and we&apos;ll help.</p>
                      </>
                    ) : (
                      <p className="mt-3 text-base text-[#113D33]/85">
                        {existing.home
                          ? `Your ${existing.label} from ${existing.home} already works at every Sway and Spavia location, including ${shortName}. There's no need to buy a second one.`
                          : `You already have an active ${existing.label} that covers you here at ${shortName}. There's no need to buy a second one.`}
                      </p>
                    )}
                    {!cfg.launch && plan && (
                      <Link href={plan.doneCta.href} onClick={() => ev("already-book")} data-track="checkout-member-book" className={`${primaryBtn} mt-6`}>
                        Book with my membership
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => { ev("already-continue"); go(afterMember); }}
                      data-track="checkout-member-continue"
                      className={cfg.launch ? `${primaryBtn} mt-6` : `${quietLink} mt-5 block`}
                    >
                      {cfg.launch ? `Add a ${thisMembership} anyway` : "I want to purchase an additional membership anyway"}
                    </button>
                    {cfg.launch && (
                      <Link href={cfg.back.href} data-track="checkout-member-back" className={`${quietLink} mt-4 inline-block`}>
                        {cfg.back.label}
                      </Link>
                    )}
                  </section>
                )}

                {step === "details" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>Tell us who you are.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">This is the name on your membership.</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="mc-first" className={labelClass}>First name</label>
                        <input id="mc-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} autoComplete="given-name" autoFocus />
                      </div>
                      <div>
                        <label htmlFor="mc-last" className={labelClass}>Last name</label>
                        <input id="mc-last" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} autoComplete="family-name" />
                      </div>
                    </div>
                    <label htmlFor="mc-phone" className={`${labelClass} mt-4`}>Mobile phone</label>
                    <input id="mc-phone" type="tel" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitDetails()} className={inputClass} autoComplete="tel" inputMode="tel" placeholder="(555) 555-0123" />
                    {cardContext === "create" && (
                      <label className="mt-4 flex items-start gap-3 text-sm">
                        <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#113D33]" />
                        <span>Keep me updated on promotions and specials</span>
                      </label>
                    )}
                    <button type="button" onClick={submitDetails} disabled={loading} data-track="checkout-details-continue" className={`${primaryBtn} mt-6`}>
                      {loading ? "Saving…" : cardContext === "create" || !savedLastFour ? "Continue to card" : "Continue"}
                    </button>
                  </section>
                )}

                {step === "payment" && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>Add your card.</h1>
                    <p className="mt-3 text-base text-[#113D33]/85">Nothing is charged on this screen. You&apos;ll review everything before you join.</p>
                    <div className="mt-6 rounded-[4px] border border-[#113D33]/20 bg-white p-4 md:p-5">
                      <p className="flex items-center gap-2 text-xs text-[#113D33]/75"><Lock className="h-3.5 w-3.5" aria-hidden="true" /> Sent securely to Mindbody, Sway&apos;s booking system. We never store your card number.</p>
                      <label htmlFor="mc-cc-number" className={`${labelClass} mt-4`}>Card number</label>
                      <input id="mc-cc-number" ref={cardNumberRef} className={inputClass} inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" data-ops-ignore />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="mc-cc-month" className={labelClass}>Month</label>
                          <select id="mc-cc-month" ref={expMonthRef} className={inputClass} autoComplete="cc-exp-month" defaultValue="">
                            <option value="" disabled>MM</option>
                            {months.map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="mc-cc-year" className={labelClass}>Year</label>
                          <select id="mc-cc-year" ref={expYearRef} className={inputClass} autoComplete="cc-exp-year" defaultValue="">
                            <option value="" disabled>YYYY</option>
                            {years.map((y) => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                      </div>
                      <label htmlFor="mc-cc-name" className={`${labelClass} mt-3`}>Name on card</label>
                      <input id="mc-cc-name" ref={cardHolderRef} className={inputClass} autoComplete="cc-name" defaultValue={fullName} />
                      <label htmlFor="mc-cc-address" className={`${labelClass} mt-3`}>Billing street address</label>
                      <input id="mc-cc-address" ref={addressRef} className={inputClass} autoComplete="billing address-line1" />
                      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_72px_104px] gap-3">
                        <div>
                          <label htmlFor="mc-cc-city" className={labelClass}>City</label>
                          <input id="mc-cc-city" ref={cityRef} className={inputClass} autoComplete="billing address-level2" />
                        </div>
                        <div>
                          <label htmlFor="mc-cc-state" className={labelClass}>State</label>
                          <input id="mc-cc-state" ref={stateRef} className={inputClass} autoComplete="billing address-level1" maxLength={2} />
                        </div>
                        <div>
                          <label htmlFor="mc-cc-zip" className={labelClass}>ZIP</label>
                          <input id="mc-cc-zip" ref={zipRef} className={inputClass} autoComplete="billing postal-code" inputMode="numeric" />
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={submitCard} disabled={loading} data-track="checkout-card-continue" className={`${primaryBtn} mt-6`}>
                      {loading ? "Saving your card…" : "Review my membership"}
                    </button>
                  </section>
                )}

                {step === "review" && plan && (
                  <section className="max-w-md">
                    <h1 ref={headingRef} tabIndex={-1} className={h1Class}>Review and join.</h1>
                    <dl className="mt-6 divide-y divide-[#113D33]/15 border-y border-[#113D33]/15 text-[15px]">
                      <div className="flex justify-between gap-4 py-3">
                        <dt>Membership</dt>
                        <dd className="text-right">
                          {plan.name}
                          {!single && (
                            <button type="button" onClick={() => { ev("plan-change-open"); go("plan"); }} disabled={loading} data-track="checkout-review-change-plan" className={`${quietLink} ml-3`}>Change</button>
                          )}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4 py-3"><dt>Member</dt><dd className="break-all text-right">{fullName || normalizeEmail(email)}</dd></div>
                      <div className="flex justify-between gap-4 py-3">
                        <dt>Card</dt>
                        <dd className="text-right">
                          {savedLastFour ? `Ending in ${savedLastFour}` : "On file"}
                          <button type="button" onClick={() => { ev("card-change"); setCardContext("card"); go("payment"); }} disabled={loading || blocked} data-track="checkout-review-change-card" className={`${quietLink} ml-3`}>Use a different card</button>
                        </dd>
                      </div>
                      {fixedStart && <div className="flex justify-between gap-4 py-3"><dt>Membership starts</dt><dd className="text-right">{livePlan!.startLabel}</dd></div>}
                      <div className="flex items-baseline justify-between gap-4 py-3"><dt className="font-semibold">Due today</dt><dd className="cf-num text-3xl">${price}</dd></div>
                    </dl>
                    {billing && <p className="mt-4 text-sm text-[#113D33]/85">{billing}</p>}
                    <p className="mt-2 text-sm text-[#113D33]/85">{cfg.renewal}</p>

                    {agreement && (
                      <div className="mt-5 rounded-[4px] border border-[#113D33]/20 bg-white">
                        <button
                          type="button"
                          onClick={() => { if (!termsOpen) ev("terms-open"); setTermsOpen((o) => !o); }}
                          aria-expanded={termsOpen}
                          data-track="checkout-review-terms"
                          className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium"
                        >
                          Membership agreement
                          <ChevronDown className={`h-4 w-4 transition ${termsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                        {termsOpen && <div className="max-h-64 overflow-y-auto whitespace-pre-wrap border-t border-[#113D33]/15 px-4 py-3 text-[13px] leading-relaxed text-[#113D33]/85">{agreement}</div>}
                      </div>
                    )}
                    <label className="mt-5 flex items-start gap-3 text-sm">
                      <input type="checkbox" checked={agree} onChange={(e) => { if (e.target.checked) ev("agree-checked"); setAgree(e.target.checked); }} className="mt-0.5 h-5 w-5 shrink-0 accent-[#113D33]" />
                      <span>I agree to the membership {agreement ? "agreement" : "terms"} and authorize {shortName} to charge my card ${price} today and ${price} each month as described above.</span>
                    </label>
                    <button type="button" onClick={join} disabled={loading || blocked || !sellable} data-track="checkout-join-submit" className={`${primaryBtn} mt-6`}>
                      {loading ? "Joining…" : test ? "Run test (no charge)" : `${cfg.joinVerb} · $${price} today`}
                    </button>
                    {cfg.launch && !livePlan && <p className="mt-3 text-sm text-[#113D33]/75">Loading your plan…</p>}
                    {cfg.finePrint && <p className="mt-4 text-xs text-[#113D33]/75">{cfg.finePrint}</p>}
                  </section>
                )}

                {step === "done" && plan && (
                  <section>
                    <FoundingCelebration />
                    <p className="cf-rise flex items-center gap-2 text-sm font-semibold text-[#2F5D50]"><Check className="h-4 w-4" aria-hidden="true" /> {previewWelcome ? "Preview of the welcome screen. Nothing was charged and no membership was created." : test ? "Test passed. Nothing was charged and no membership was created." : "You're in."}</p>
                    <h1 ref={headingRef} tabIndex={-1} className="cf-title cf-rise mt-3 text-[38px] leading-[1.02] focus:outline-none md:text-6xl" style={{ ["--cf-d" as string]: "0.08s" }}>{cfg.welcome}</h1>
                    <div className="cf-card-in mt-7 max-w-sm">{MemberCard}</div>
                    <ul className="cf-rise mt-7 max-w-md space-y-3 text-base" style={{ ["--cf-d" as string]: "0.95s" }}>
                      {!test && (
                        <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />
                          {fixedStart ? "" : `Your ${plan.name} membership is active${chargedToday != null ? `, and $${chargedToday} was charged today` : ""}. `}A confirmation is on its way to {normalizeEmail(email)}.
                        </li>
                      )}
                      {fixedStart && <li className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />Your membership starts {livePlan!.startLabel}. Your next charge is {livePlan!.nextChargeLabel}.</li>}
                      {(plan.doneNotes ?? []).map((n) => (
                        <li key={n} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />{n}</li>
                      ))}
                    </ul>
                    <Link href={plan.doneCta.href} data-track="checkout-done-next" className="sway-button cf-rise mt-8" style={{ ["--cf-d" as string]: "1.1s" }}>
                      {plan.doneCta.label} <span aria-hidden="true"><ArrowMark /></span>
                    </Link>
                  </section>
                )}

                {error && (
                  <p role="alert" className="mt-5 max-w-md rounded-[4px] border border-[#8A2B1D]/40 bg-[#FBEDEA] px-4 py-3 text-sm text-[#7A2418]">
                    {error}
                  </p>
                )}

                {step !== "done" && (
                  <p className="mt-6 max-w-md text-xs text-[#113D33]/75">
                    Questions?{" "}
                    {help.phone ? (
                      <>Call <a href={`tel:+1${help.phone.replace(/\D/g, "")}`} data-track="checkout-help-call" className="underline underline-offset-2">{help.phone}</a></>
                    ) : (
                      <>Email <a href={`mailto:${help.email}`} data-track="checkout-help-email" className="underline underline-offset-2">{help.email}</a></>
                    )}{" "}
                    and we&apos;ll help you sign up.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Desktop: the member card and what this plan is, alongside the form */}
        {step !== "done" && !closed && (
          <aside className="hidden md:block">
            <div className="sticky top-28">
              {MemberCard}
              {plan && (
                <div className="mt-6">
                  <p className="sway-eyebrow text-[#4A776D]">{plan.name} · {plan.chooseLabel}</p>
                  <ul className="mt-3 space-y-1.5 text-[15px] leading-snug">
                    {plan.choose.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#4A776D]" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  {PriceLadder}
                </div>
              )}
              {cfg.perks.length > 0 && (
                <>
                  {cfg.perksLabel && <p className="sway-eyebrow mt-6 text-[#4A776D]">{cfg.perksLabel}</p>}
                  <ul className="mt-3 space-y-2.5 text-[15px]">
                    {cfg.perks.map((line) => (
                      <li key={line} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-[#4A776D]" aria-hidden="true" />{line}</li>
                    ))}
                  </ul>
                </>
              )}
              {billing && <p className="mt-5 border-t border-[#113D33]/15 pt-4 text-sm text-[#113D33]/85">{billing}</p>}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
