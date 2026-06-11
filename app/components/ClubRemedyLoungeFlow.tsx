"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SwayCurve } from "./SwayCurve";
import { ReviewBadge } from "./GoogleReviews";
import {
  getClubLocation,
  type ClubLocationKey,
  type SaunaKey,
} from "@/lib/clubLocations";
import { parseWall, peakOverlap, type ApptInterval } from "@/lib/clubOccupancy";

/* ---------------------------------------------
   Sway Wellness Club — Remedy Lounge booking flow
   (RiNo + Central Park). Modeled on the Larimer
   Remedy Room flow, adapted for the 75-min Lounge
   with optional 25-min sauna sub-sessions (max 2)
   that run DURING the 75. Every Mindbody call is
   scoped to the club's own SiteId.
--------------------------------------------- */

/* ── DATE HELPERS ── */

function formatISO(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime12h(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function formatTimeRange(start: Date, minutes: number) {
  const end = new Date(start.getTime() + minutes * 60_000);
  return `${formatTime12h(start)} – ${formatTime12h(end)}`;
}

function formatLocalDateTime(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

/**
 * Mindbody sometimes returns datetimes WITHOUT a timezone offset. Force local
 * parsing when no offset/Z is present (same approach as the Larimer flow).
 */
function parseMindbodyDateTime(raw: string) {
  const hasTZ =
    raw.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(raw) || /[+-]\d{4}$/.test(raw);
  if (hasTZ) return new Date(raw);
  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map((n) => Number(n));
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map((n) => Number(n));
  return new Date(y, (m || 1) - 1, d || 1, hh, mm, ss, 0);
}

function groupTimes(dates: Date[]) {
  const groups = {
    Morning: [] as Date[],
    Midday: [] as Date[],
    Afternoon: [] as Date[],
    Evening: [] as Date[],
  };
  dates.forEach((d) => {
    const h = d.getHours();
    if (h < 12) groups.Morning.push(d);
    else if (h < 14) groups.Midday.push(d);
    else if (h < 17) groups.Afternoon.push(d);
    else groups.Evening.push(d);
  });
  return groups;
}

/**
 * Build 15-min-interval Lounge start times from availability windows (degraded
 * fallback when the server couldn't gate by occupancy). bookableEnd IS the last
 * valid start: the windows come from a token-free bookableitems call, where
 * Mindbody already subtracts the service length (see lib/clubOccupancy.ts —
 * do not subtract the service block again).
 */
function generateTimesFromWindows(
  windows: { start: string; bookableEnd: string }[]
) {
  const results: Date[] = [];
  windows.forEach((w) => {
    const cursor = parseMindbodyDateTime(w.start);
    const lastStart = parseMindbodyDateTime(w.bookableEnd);

    const minutes = cursor.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) cursor.setMinutes(minutes + (15 - remainder), 0, 0);
    else cursor.setSeconds(0, 0);

    while (cursor <= lastStart) {
      results.push(new Date(cursor));
      cursor.setMinutes(cursor.getMinutes() + 15);
    }
  });

  results.sort((a, b) => a.getTime() - b.getTime());
  const unique: Date[] = [];
  const seen = new Set<number>();
  for (const t of results) {
    const key = t.getTime();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(t);
    }
  }
  return unique;
}

/* ── EMAIL + CARD HELPERS ── */

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}
function isValidEmail(raw: string) {
  const e = normalizeEmail(raw);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
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
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n)) return "MasterCard";
  if (/^3[47]/.test(n)) return "AmericanExpress";
  if (/^6(011|5)/.test(n) || /^64[4-9]/.test(n)) return "Discover";
  return "Visa";
}

/* ── ICONS ── */

function IconLock(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v6A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-6A2.5 2.5 0 0 1 6.5 10Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconSpark(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function CardBrandPills() {
  const pill = "px-2.5 py-1 rounded-full border border-[#113D33]/20 bg-white/60 text-xs text-[#113D33]/80";
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className={pill}>Visa</span>
      <span className={pill}>Mastercard</span>
      <span className={pill}>AmEx</span>
      <span className={pill}>Discover</span>
    </div>
  );
}

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, images.length]);
  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}

type Step = "select" | "sauna" | "email" | "name" | "card" | "confirm" | "booking" | "done";
type CardContext = "create_account" | "add_card" | null;

function ProgressBar({ step, dark = false }: { step: Step; dark?: boolean }) {
  const displaySteps = ["Time", "Sauna", "Account", "Confirm"];
  const stepToIdx: Partial<Record<Step, number>> = {
    select: 0,
    sauna: 1,
    email: 2,
    card: 2,
    name: 2,
    confirm: 3,
  };
  if (step === "booking" || step === "done") return null;
  const displayIdx = stepToIdx[step] ?? 0;
  const pct = ((displayIdx + 1) / displaySteps.length) * 100;
  return (
    <div className="animate-fade-in">
      <div className={`h-1 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-[#113D33]/8"}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${dark ? "bg-white" : "bg-[#113D33]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="hidden sm:flex justify-between mt-2">
        {displaySteps.map((label, i) => (
          <span
            key={label}
            className={`text-[10px] uppercase tracking-wider transition-colors duration-300 ${
              dark
                ? i <= displayIdx ? "text-white font-semibold" : "text-white/25"
                : i <= displayIdx ? "text-[#113D33] font-semibold" : "text-[#113D33]/25"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ClubRemedyLoungeFlow({ clubKey }: { clubKey: ClubLocationKey }) {
  const router = useRouter();
  const club = getClubLocation(clubKey);

  // Config should always resolve for a valid club key; guard anyway.
  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4E9] text-[#113D33]">
        <p>This location is not available for online booking yet.</p>
      </div>
    );
  }

  const SITE_ID = club.siteId;
  const LOUNGE_ST = club.remedyLounge.sessionTypeId;
  const SERVICE_MIN = club.remedyLounge.serviceMinutes; // 75
  const SUB_SLOT_MIN = 25;
  const SUB_SLOTS = Math.floor(SERVICE_MIN / SUB_SLOT_MIN); // 3
  const basePath = `/locations/${club.key}`;
  const phoneDigits = club.phone.replace(/[^\d]/g, "");

  const today = useMemo(() => new Date(), []);

  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [times, setTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // Lounge occupancy for display ("N left"), keyed by slot epoch ms.
  const [slotMeta, setSlotMeta] = useState<
    Record<number, { booked: number; capacity: number }>
  >({});
  // Per-sauna booked windows + seat capacity, for gating the 25-min add-ons.
  const [saunaData, setSaunaData] = useState<
    Record<number, { capacity: number; appointments: ApptInterval[] }>
  >({});
  // False when the availability route couldn't read live occupancy (degraded to
  // ungated times). Drives a soft, non-blocking notice on the time picker.
  const [occupancyKnown, setOccupancyKnown] = useState(true);
  // Bumped to force an availability re-fetch (e.g. after a slot fills mid-booking).
  const [availabilityNonce, setAvailabilityNonce] = useState(0);

  // Per sub-slot sauna choice: null | sauna key. Length === SUB_SLOTS.
  const [saunaChoices, setSaunaChoices] = useState<(SaunaKey | null)[]>(
    () => Array.from({ length: SUB_SLOTS }, () => null)
  );

  // Sauna add-on labels the booking route reported as failed (Lounge still booked).
  // Used to avoid claiming a sauna landed when it didn't.
  const [failedSaunaLabels, setFailedSaunaLabels] = useState<string[]>([]);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("select");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cardContext, setCardContext] = useState<CardContext>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [cardSaving, setCardSaving] = useState(false);

  const [needsNameUpdate, setNeedsNameUpdate] = useState(false);
  const [nameSaving, setNameSaving] = useState(false);

  const bookingLock = useRef(false);

  const [forSomeoneElse, setForSomeoneElse] = useState(false);
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isSurprise, setIsSurprise] = useState(false);

  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const SAVED_EMAIL_KEY = `sway_club_${club.key}_email`;
  const [isMember, setIsMember] = useState(false);
  const [memberTier, setMemberTier] = useState<string | null>(null);
  const [memberFirstName, setMemberFirstName] = useState<string | null>(null);
  const [hasRemedyMembership, setHasRemedyMembership] = useState(false);
  const [hasCardOnFile, setHasCardOnFile] = useState(false);
  const [homeLocation, setHomeLocation] = useState<string | null>(null);
  const [memberCheckDone, setMemberCheckDone] = useState(false);
  const [autoCheckDone, setAutoCheckDone] = useState(false);

  const saveEmail = (e: string) => { try { localStorage.setItem(SAVED_EMAIL_KEY, e); } catch {} };
  const clearSavedEmail = () => { try { localStorage.removeItem(SAVED_EMAIL_KEY); } catch {} };
  const handleSwitchAccount = () => {
    clearSavedEmail();
    setEmail(""); setClientId(null); setIsMember(false); setMemberTier(null);
    setMemberFirstName(null); setHasRemedyMembership(false); setHasCardOnFile(false);
    setHomeLocation(null); setMemberCheckDone(false); setCardContext(null);
    setStep("select");
  };

  // Pricing: club Unlimited members (Remedy membership on this site) have the
  // Lounge included; spa-tier members (e.g. Larimer) pay the member rate;
  // everyone else pays the drop-in rate.
  const includedWithMembership = hasRemedyMembership;
  const displayPrice = includedWithMembership
    ? "Included"
    : isMember
    ? club.remedyLounge.memberPrice
    : club.remedyLounge.price;
  const bookingValue = includedWithMembership ? 0 : isMember ? 25 : 49;

  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);
  const billingAddressRef = useRef<HTMLInputElement | null>(null);
  const billingCityRef = useRef<HTMLInputElement | null>(null);
  const billingStateRef = useRef<HTMLInputElement | null>(null);
  const didMountRef = useRef(false);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const displayedTimes = times;
  const groupedTimes = useMemo(() => groupTimes(displayedTimes), [displayedTimes]);

  const mindbodyBookingUrl = useMemo(
    () => `https://clients.mindbodyonline.com/classic/ws?studioid=${SITE_ID}&stype=-9`,
    [SITE_ID]
  );

  const selectedSaunaCount = useMemo(
    () => saunaChoices.filter((c) => c !== null).length,
    [saunaChoices]
  );

  const stepTitle = useMemo(() => {
    if (step === "select") return "Choose your time";
    if (step === "sauna") return "Add sauna (optional)";
    if (step === "email") return "Enter your email";
    if (step === "name") return "Confirm your name";
    if (step === "card") return cardContext === "create_account" ? "Create your account" : "Payment details";
    if (step === "confirm") return "Review and confirm";
    if (step === "booking") return "Booking your appointment";
    return "";
  }, [step, cardContext]);

  /* Disable scroll snap */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlSnap = html.style.scrollSnapType;
    const prevBodySnap = body.style.scrollSnapType;
    html.style.scrollSnapType = "none";
    body.style.scrollSnapType = "none";
    return () => {
      html.style.scrollSnapType = prevHtmlSnap;
      body.style.scrollSnapType = prevBodySnap;
    };
  }, []);

  /* Auto-check saved email on mount */
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(SAVED_EMAIL_KEY) : null;
    if (!saved || autoCheckDone) return;
    setAutoCheckDone(true);
    setEmail(saved);
    setLoading(true);
    const url = `/api/membership/check?email=${encodeURIComponent(saved)}&siteId=${SITE_ID}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.multipleClients || !data || !data.found) { clearSavedEmail(); setEmail(""); setLoading(false); return; }
        setClientId(data.clientId ?? null);
        setIsMember(data.isMember ?? false);
        setMemberTier(data.tier ?? null);
        setMemberFirstName(data.firstName ?? null);
        setHasRemedyMembership(data.hasRemedyMembership ?? false);
        setHasCardOnFile(data.hasCardOnFile ?? false);
        setHomeLocation(data.homeLocation ?? null);
        setMemberCheckDone(true);
        const lookedUpFirst = (data.firstName ?? "").trim();
        const lookedUpLast = (data.lastName ?? "").trim();
        if (!lookedUpFirst || !lookedUpLast) {
          setFirstName(lookedUpFirst);
          setLastName(lookedUpLast);
          setNeedsNameUpdate(true);
        }
      })
      .catch(() => { clearSavedEmail(); setEmail(""); })
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Scroll to top when step changes */
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function clearCardRefs() {
    if (cardHolderRef.current) cardHolderRef.current.value = "";
    if (cardNumberRef.current) cardNumberRef.current.value = "";
    if (expMonthRef.current) expMonthRef.current.value = "";
    if (expYearRef.current) expYearRef.current.value = "";
    if (postalCodeRef.current) postalCodeRef.current.value = "";
    if (billingAddressRef.current) billingAddressRef.current.value = "";
    if (billingCityRef.current) billingCityRef.current.value = "";
    if (billingStateRef.current) billingStateRef.current.value = "";
  }

  useEffect(() => {
    if (step !== "card") clearCardRefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

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
    return { cardHolder, cardNumber, expMonth, expYear, postalCode, cardType, address, city, state };
  }

  function validateCardFields() {
    const { cardHolder, cardNumber, expMonth, expYear, postalCode, address, city, state } = getCardPayloadFromRefs();
    if (!cardHolder) return "Please enter the name on the card.";
    if (!cardNumber || cardNumber.length < 12) return "Please enter a valid card number.";
    if (!luhnCheck(cardNumber)) return "Card number looks invalid. Please double-check.";
    if (!expMonth || Number(expMonth) < 1 || Number(expMonth) > 12) return "Please select a valid expiration month.";
    if (!expYear || expYear.length < 4) return "Please select an expiration year (e.g., 2028).";
    const now = new Date();
    if (Number(expYear) === now.getFullYear() && Number(expMonth) < now.getMonth() + 1) {
      return "This card appears to be expired.";
    }
    if (!address) return "Please enter your billing street address.";
    if (!city) return "Please enter your billing city.";
    if (!state) return "Please enter your billing state.";
    if (!postalCode || postalCode.length < 3) return "Please enter a valid ZIP/postal code.";
    return null;
  }

  /* ── FETCH AVAILABILITY (Lounge) ── */
  useEffect(() => {
    setLoading(true);
    setSelectedTime(null);
    setSaunaChoices(Array.from({ length: SUB_SLOTS }, () => null));
    setSlotMeta({});
    setSaunaData({});
    setOccupancyKnown(true);
    setError(null);
    fetch(`/api/club/availability?siteId=${SITE_ID}&sessionTypeId=${LOUNGE_ST}&date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        // Preferred path: occupancy-gated slots (rolling-occupancy model).
        if (Array.isArray(data.slots)) {
          setOccupancyKnown(data.occupancyKnown !== false);
          const meta: Record<number, { booked: number; capacity: number }> = {};
          const available: Date[] = [];
          data.slots.forEach(
            (s: { start: string; booked: number; capacity: number; available: boolean }) => {
              const d = parseMindbodyDateTime(s.start);
              meta[d.getTime()] = { booked: s.booked, capacity: s.capacity };
              if (s.available) available.push(d);
            }
          );
          setSlotMeta(meta);
          setTimes(available);
          // saunas: { [sessionTypeId]: { capacity, appointments } }
          const sd: Record<number, { capacity: number; appointments: ApptInterval[] }> = {};
          if (data.saunas && typeof data.saunas === "object") {
            for (const [k, v] of Object.entries(data.saunas)) {
              sd[Number(k)] = v as { capacity: number; appointments: ApptInterval[] };
            }
          }
          setSaunaData(sd);
          return;
        }
        // Fallback: ungated windows (degraded — book route still guards capacity).
        if (Array.isArray(data.windows)) {
          setOccupancyKnown(false);
          setTimes(generateTimesFromWindows(data.windows));
          return;
        }
        setTimes([]);
        setError("No availability for this day.");
      })
      .catch(() => {
        setTimes([]);
        setError("Unable to load availability.");
      })
      .finally(() => setLoading(false));
  }, [SITE_ID, LOUNGE_ST, SUB_SLOTS, selectedDate, availabilityNonce]);

  /* ── LOOKUP ── */
  async function lookupClientByEmail(emailToCheck: string) {
    const res = await fetch(
      `/api/membership/check?email=${encodeURIComponent(emailToCheck)}&siteId=${SITE_ID}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Client lookup failed.");
    let missingName = false;
    if (data.found) {
      setIsMember(data.isMember ?? false);
      setMemberTier(data.tier ?? null);
      setMemberFirstName(data.firstName ?? null);
      setHasRemedyMembership(data.hasRemedyMembership ?? false);
      setHasCardOnFile(data.hasCardOnFile ?? false);
      setHomeLocation(data.homeLocation ?? null);
      setMemberCheckDone(true);
      const lookedUpFirst = (data.firstName ?? "").trim();
      const lookedUpLast = (data.lastName ?? "").trim();
      missingName = !lookedUpFirst || !lookedUpLast;
      if (missingName) {
        setFirstName(lookedUpFirst);
        setLastName(lookedUpLast);
        setNeedsNameUpdate(true);
      } else {
        setNeedsNameUpdate(false);
      }
    }
    return {
      found: data.found ?? false,
      client: data.clientId ? { Id: data.clientId } : null,
      hasCardOnFile: data.hasCardOnFile ?? false,
      missingName,
    };
  }

  /* ── SAUNA OCCUPANCY (per 25-min window) ── */
  // Capacity comes from config (always available); booked count from the live
  // appointments returned by the availability route. No data => treat as open.
  function saunaBookedAt(sessionTypeId: number, windowStart: Date): number {
    const appts = saunaData[sessionTypeId]?.appointments;
    if (!appts || appts.length === 0) return 0;
    const s = parseWall(formatLocalDateTime(windowStart));
    return peakOverlap(appts, s, s + SUB_SLOT_MIN * 60_000);
  }

  /* ── BOOKING ── */
  function buildSaunaPayload() {
    if (!selectedTime) return [];
    const out: { sessionTypeId: number; startDateTime: string }[] = [];
    saunaChoices.forEach((choice, i) => {
      if (!choice) return;
      const sauna = club!.saunas.find((s) => s.key === choice);
      if (!sauna) return;
      const start = new Date(selectedTime.getTime() + i * SUB_SLOT_MIN * 60_000);
      out.push({ sessionTypeId: sauna.sessionTypeId, startDateTime: formatLocalDateTime(start) });
    });
    return out;
  }

  async function bookWithConfirmClientId(resolvedClientId: string) {
    if (!selectedTime) {
      setError("Please select a time first.");
      setStep("select");
      return;
    }
    setStep("booking");

    const fn = firstName.trim();
    const ln = lastName.trim();
    const bookerLabel = fn && ln ? `${fn} ${ln}` : email.trim() || "(unknown)";
    const bookedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Denver",
      month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
    });
    const saunaLabels = saunaChoices
      .map((c, i) => (c ? `${club!.saunas.find((s) => s.key === c)?.label} (slot ${i + 1})` : null))
      .filter(Boolean)
      .join(", ");
    const noteParts: string[] = [
      `Booked: ${bookerLabel} · ${bookedAt} MT — Remedy Lounge (${club!.label})`,
    ];
    if (saunaLabels) noteParts.push(`Sauna: ${saunaLabels}`);
    if (forSomeoneElse && guestFirstName.trim() && guestPhone.trim()) {
      const guestName = `${guestFirstName.trim()} ${guestLastName.trim()}`.trim();
      noteParts.push(`BOOKING FOR: ${guestName}`, `Phone: ${guestPhone.trim()}`);
      if (guestEmail.trim()) noteParts.push(`Email: ${guestEmail.trim()}`);
      if (isSurprise) noteParts.push("⚠️ SURPRISE — do not contact guest");
    }
    const bookingNotes = noteParts.join(" | ");

    const bookRes = await fetch("/api/club/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId: SITE_ID,
        clientId: resolvedClientId,
        startDateTime: formatLocalDateTime(selectedTime),
        saunas: buildSaunaPayload(),
        notes: bookingNotes,
      }),
    });

    const bookData = await bookRes.json();
    if (!bookRes.ok) {
      // The Lounge window filled between loading availability and booking. Send
      // the guest back to time selection and refresh so the full slot drops out,
      // rather than stranding them on the confirm step.
      if (bookRes.status === 409 && bookData?.loungeFull) {
        setSelectedTime(null);
        setError(bookData?.error || "That time just filled up. Please pick another time.");
        setAvailabilityNonce((n) => n + 1);
        setStep("select");
        return false;
      }
      throw new Error(bookData?.error || `Booking failed. Please try again or call us at ${club!.phone}.`);
    }
    if (bookData?.partial && Array.isArray(bookData.failedSaunas) && bookData.failedSaunas.length) {
      // Lounge is booked; a sauna add-on didn't take. Don't block the booking,
      // but record the failures so the success screen doesn't claim they landed.
      console.warn("[club-book] sauna add-on(s) failed:", bookData.failedSaunas);
      setFailedSaunaLabels(bookData.failedSaunas.map((s: unknown) => String(s)));
    } else {
      setFailedSaunaLabels([]);
    }

    reportPurchaseConversion();
    setStep("done");
    return true;
  }

  function reportPurchaseConversion() {
    if (typeof window === "undefined") return;
    const w = window as any;
    // No Google Ads conversion fired for club locations yet (no campaigns).
    // dataLayer only, with a club-specific flow + location for clean separation.
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "remedy_lounge_booking_complete",
      service_name: "Remedy Lounge",
      booking_location: club!.label,
      price: bookingValue,
      is_member: isMember || hasRemedyMembership,
      value: bookingValue,
      currency: "USD",
    });
  }

  /* ── FUNNEL TRACKING ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    const eventMap: Record<string, string> = {
      select: "booking_start",
      sauna: "booking_addons_selected",
      email: "booking_time_selected",
      card: "booking_email_entered",
      confirm: "booking_card_entered",
      booking: "booking_confirmed",
      done: "booking_complete",
    };
    const eventName = eventMap[step];
    if (!eventName) return;
    const payload: Record<string, unknown> = {
      event: eventName,
      booking_flow: "remedy_lounge",
      booking_location: club!.label,
    };
    if (step === "done") {
      payload.service_name = "Remedy Lounge";
      payload.total_price = bookingValue;
      payload.is_member = isMember || hasRemedyMembership;
    }
    w.dataLayer.push(payload);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── STEP HANDLERS ── */
  function advanceFromSauna() {
    setError(null);
    if (memberCheckDone && clientId && needsNameUpdate) {
      if (!hasCardOnFile) setCardContext("add_card");
      setStep("name");
      return;
    }
    if (memberCheckDone && hasCardOnFile && clientId) { setStep("confirm"); return; }
    if (memberCheckDone && clientId && !hasCardOnFile) {
      setCardContext("add_card");
      setStep("card");
      return;
    }
    setStep("email");
  }

  async function handleConfirmEmail() {
    setError(null);
    if (!selectedTime) {
      setError("Please select a time first.");
      setStep("select");
      return;
    }
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }
    saveEmail(normalized);
    try {
      const lookup = await lookupClientByEmail(normalized);
      if (!lookup.found) {
        setCardContext("create_account");
        setClientId(null);
        setStep("card");
        return;
      }
      setClientId(String(lookup.client!.Id));
      if (lookup.missingName) {
        if (!lookup.hasCardOnFile) setCardContext("add_card");
        setStep("name");
        return;
      }
      if (!lookup.hasCardOnFile) {
        setCardContext("add_card");
        setStep("card");
        return;
      }
      setStep("confirm");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStep("email");
    }
  }

  async function handleSaveNameAndContinue() {
    setError(null);
    if (!clientId) {
      setError("Missing client ID. Please start again.");
      setStep("email");
      return;
    }
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    if (!trimmedFirst || !trimmedLast) {
      setError("Please enter your first and last name.");
      return;
    }
    setNameSaving(true);
    try {
      const res = await fetch("/api/mindbody/update-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, firstName: trimmedFirst, lastName: trimmedLast, siteId: SITE_ID }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "We couldn't save your name. Please try again.");
      setMemberFirstName(trimmedFirst);
      setNeedsNameUpdate(false);
      if (hasCardOnFile) setStep("confirm");
      else { setCardContext("add_card"); setStep("card"); }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setNameSaving(false);
    }
  }

  async function handleSaveCardAndContinue() {
    setError(null);
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      setStep("email");
      return;
    }
    if (!cardContext) {
      setError("Missing setup context. Please start again.");
      setStep("email");
      return;
    }
    const cardError = validateCardFields();
    if (cardError) {
      setError(cardError);
      return;
    }
    const { cardHolder, cardNumber, expMonth, expYear, postalCode, cardType, address, city, state } = getCardPayloadFromRefs();
    setCardSaving(true);
    try {
      let resolvedClientId: string | null = null;
      if (cardContext === "create_account") {
        if (!firstName.trim() || !lastName.trim()) throw new Error("Please enter your first and last name.");
        if (!mobilePhone.trim()) throw new Error("Please enter your mobile phone number.");
        const res = await fetch("/api/mindbody/add-client-with-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalized,
            mobilePhone: mobilePhone.trim(),
            cardNumber, expMonth, expYear, postalCode, cardHolder, cardType, address, city, state,
            sendPromotionalEmails: marketingOptIn,
            sendPromotionalTexts: marketingOptIn,
            siteId: SITE_ID,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (data?.cardSaveFailed && data?.clientId) {
            setClientId(String(data.clientId));
            setCardContext("add_card");
          }
          throw new Error(data?.error || "Unable to create your account. Please double-check your details.");
        }
        resolvedClientId = data.clientId != null ? String(data.clientId) : null;
        if (!resolvedClientId) throw new Error("Account created, but client ID missing.");
      }
      if (cardContext === "add_card") {
        if (!clientId) throw new Error("Missing client ID for card update.");
        const res = await fetch("/api/mindbody/update-client-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId, cardNumber, expMonth, expYear, postalCode, cardHolder, cardType, address, city, state,
            firstName: firstName.trim(), lastName: lastName.trim(), siteId: SITE_ID,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to save your card. Please try again.");
        resolvedClientId = String(clientId);
      }
      clearCardRefs();
      setClientId(resolvedClientId);
      setStep("confirm");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setCardSaving(false);
    }
  }

  async function handleFinalConfirmAndBook() {
    setError(null);
    if (!clientId) {
      setError("Missing client information. Please start again.");
      setStep("email");
      return;
    }
    if (bookingLock.current) return;
    bookingLock.current = true;
    try {
      const booked = await bookWithConfirmClientId(clientId);
      if (booked && cardContext !== "create_account" && clientId) {
        fetch("/api/mindbody/update-client-notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, sendScheduleEmails: true, sendAccountEmails: true, siteId: SITE_ID }),
        }).catch(() => console.error("Failed to update notification preferences"));
      }
    } catch (err: any) {
      setError(err.message || `Booking failed. Please try again or call us at ${club!.phone}.`);
      setStep("confirm");
    } finally {
      bookingLock.current = false;
    }
  }

  function handleHeaderBack() {
    setError(null);
    if (step === "select") { router.push(basePath); return; }
    if (step === "sauna") { setStep("select"); return; }
    if (step === "email") { setStep("sauna"); return; }
    if (step === "name") { setStep(memberCheckDone && clientId ? "sauna" : "email"); return; }
    if (step === "card") { setStep(memberCheckDone && clientId ? "sauna" : "email"); return; }
    if (step === "confirm") { setStep(memberCheckDone && hasCardOnFile && clientId ? "sauna" : "email"); return; }
  }

  const summaryText = useMemo(() => {
    if (!selectedTime) return null;
    const saunaBit = selectedSaunaCount ? ` • ${selectedSaunaCount} sauna add-on${selectedSaunaCount > 1 ? "s" : ""}` : "";
    return `Remedy Lounge • ${formatDayLabel(new Date(selectedDate + "T00:00:00"))} • ${formatTimeRange(selectedTime, SERVICE_MIN)}${saunaBit}`;
  }, [selectedDate, selectedTime, SERVICE_MIN, selectedSaunaCount]);

  const emailNormalized = useMemo(() => normalizeEmail(email), [email]);

  const expMonthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );
  const expYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(currentYear + i));
  }, []);

  const showHeader = step !== "done";
  const showHeaderBack = ["select", "sauna", "email", "name", "card", "confirm"].includes(step);
  const isDarkStep = step === "select" || step === "sauna";

  return (
    <div className={`min-h-screen font-vance snap-none ${isDarkStep ? "bg-gradient-to-b from-[#0e2b24] via-[#113D33] to-[#0b1f1a]" : "bg-[#F7F4E9]"}`}>
      {showHeader && (
        <div
          data-booking-header="true"
          className={`sticky top-[56px] z-30 border-b backdrop-blur-md ${isDarkStep ? "border-white/10 bg-[#113D33]/90" : "border-[#113D33]/10 bg-[#F7F4E9]/95"}`}
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              {showHeaderBack ? (
                <button
                  type="button"
                  onClick={handleHeaderBack}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${isDarkStep ? "text-white hover:bg-white/10 active:bg-white/15 focus:ring-white/25" : "text-[#113D33] hover:bg-[#113D33]/5 active:bg-[#113D33]/10 focus:ring-[#113D33]/25"}`}
                  aria-label="Go back"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Back</span>
                </button>
              ) : (
                <span className="w-16" />
              )}
              <div className={`text-sm font-semibold ${isDarkStep ? "text-white" : "text-[#113D33]"}`}>{stepTitle}</div>
              <span className="w-16" />
            </div>
            <ProgressBar step={step} dark={isDarkStep} />
          </div>
        </div>
      )}

      <div className="px-4 pt-24 md:pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Identity banner */}
          {memberCheckDone && clientId && ["select", "sauna", "email", "name", "card", "confirm"].includes(step) && (
            <div className={`mb-4 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 ${
              isMember || hasRemedyMembership
                ? isDarkStep ? "bg-white/10 border border-white/15 text-white" : "bg-[#113D33] text-white"
                : isDarkStep ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-[#113D33]/10 text-[#113D33]"
            }`}>
              {(isMember || hasRemedyMembership) && <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              <p className="text-sm">
                <span className="font-bold">{memberFirstName ?? email}</span>
                {hasRemedyMembership && <> · <span className="font-semibold">Remedy Member</span></>}
                {isMember && !hasRemedyMembership && <> · <span className="capitalize font-semibold">{memberTier}</span> Member</>}
                {homeLocation && <span className={isDarkStep ? "text-white/50 ml-1" : isMember ? "text-white/60 ml-1" : "text-[#113D33]/60 ml-1"}>· {homeLocation}</span>}
              </p>
              <button onClick={handleSwitchAccount} className={`text-xs underline underline-offset-2 ml-2 ${isDarkStep ? "text-white/40 hover:text-white" : isMember ? "text-white/50 hover:text-white" : "text-[#113D33]/60 hover:text-[#113D33]"}`}>Switch</button>
            </div>
          )}

          {/* SELECT */}
          {step === "select" && (
            <>
              <div className="mb-10 md:mb-12">
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#9ABFB3] mb-4">
                  Sway Wellness Club · {club.label}
                </p>
                <SwayCurve width={150} strokeWidth={2.2} animate className="text-[#A9D2C5] mx-auto block mb-5" />
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
                  The Remedy Lounge
                </h1>
                <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-4">
                  Your 75-minute recovery ritual. Cold plunge, recovery lounge, and optional 25-minute sauna sessions, all in one shared sanctuary.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 text-white">
                  <ReviewBadge />
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
                  {["Cold Plunge", "Traditional Sauna", "Infrared Sauna", "Recovery Lounge"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 text-xs text-white/80">
                      <IconSpark className="w-3 h-3 text-[#9ABFB3]" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="max-w-lg mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="relative h-48 w-full">
                    <ImageCarousel images={club.loungeImages} alt={`Remedy Lounge ${club.label}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div className="text-left">
                        <div className="text-white font-semibold text-lg">Remedy Lounge</div>
                        <div className="text-white/70 text-sm">{SERVICE_MIN} min • Shared session</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">{displayPrice}</div>
                        {includedWithMembership ? (
                          <div className="text-[#9ABFB3] text-xs font-semibold">With your membership</div>
                        ) : isMember ? (
                          <div className="text-[#9ABFB3] text-xs font-semibold">Member price</div>
                        ) : (
                          <div className="text-white/60 text-xs">Included with membership</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-white/40">
                  Want the space to yourself?{" "}
                  <a href={`tel:${phoneDigits}`} className="underline underline-offset-4 hover:text-white/60 transition">
                    Call {club.phone}
                  </a>{" "}
                  to ask about private sessions.
                </p>
              </div>

              <div className="mb-8 md:mb-10 max-w-lg mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                <div className="text-xs uppercase tracking-wider text-[#9ABFB3] mb-1">Your selection</div>
                <div className="font-semibold text-white">{summaryText ?? "Select a day and time to continue."}</div>
              </div>

              {/* Day picker */}
              <section className="mb-10 md:mb-12">
                <h2 className="text-lg font-semibold text-white/90 mb-1">Choose a Day</h2>
                <p className="text-sm text-white/40 mb-4">
                  {addDays(weekStart, 3).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => setWeekStart(addDays(weekStart, -7))} disabled={weekStart <= today} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all duration-150" aria-label="Previous week">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-1">
                    {weekDays.map((day) => {
                      const iso = formatISO(day);
                      const isPast = day < today && iso !== formatISO(today);
                      const selected = iso === selectedDate;
                      const dayName = day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
                      return (
                        <button
                          key={iso}
                          disabled={isPast}
                          onClick={() => setSelectedDate(iso)}
                          className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 min-w-[52px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 ${selected ? "bg-white text-[#113D33] shadow-lg" : isPast ? "opacity-25 cursor-not-allowed" : "bg-white/5 text-white hover:bg-white/10 hover:-translate-y-0.5"}`}
                        >
                          <span className="text-[10px] font-semibold tracking-wider">{dayName}</span>
                          <span className="text-lg font-bold leading-tight">{day.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="p-2 rounded-full hover:bg-white/10 transition-all duration-150" aria-label="Next week">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </section>

              {/* Times */}
              <section className="mb-8 md:mb-10 text-left">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white/90 text-center">Choose a Time</h2>
                </div>
                {!loading && !error && !occupancyKnown && displayedTimes.length > 0 && (
                  <p className="mb-4 text-center text-[11px] text-amber-300/80">
                    Live availability is updating. These times may fill up. We&apos;ll confirm your spot at booking.
                  </p>
                )}
                {loading && <p className="text-center text-white/50">Loading…</p>}
                {error && <p className="text-center text-red-400">{error}</p>}
                {!loading && !error && Object.entries(groupedTimes).map(([label, group]) =>
                  group.length > 0 ? (
                    <div key={label} className="mb-6">
                      <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-2">{label}</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                        {group.map((time) => {
                          const isSelected = selectedTime?.getTime() === time.getTime();
                          const meta = slotMeta[time.getTime()];
                          const left = meta ? meta.capacity - meta.booked : null;
                          const lowLeft = left != null && left <= 4 ? left : null;
                          return (
                            <button
                              key={time.toISOString()}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 ${isSelected ? "bg-white text-[#113D33] border-white shadow-lg shadow-white/10 scale-[1.02]" : "border-white/15 bg-white/5 hover:bg-white/10 text-white hover:-translate-y-0.5"}`}
                            >
                              <div className="font-semibold text-sm">{formatTime12h(time)}</div>
                              {lowLeft != null && (
                                <div className={`text-[10px] mt-0.5 ${isSelected ? "text-[#B4541B]" : "text-amber-300/80"}`}>
                                  {lowLeft} left
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null
                )}
                {!loading && !error && displayedTimes.length === 0 && (
                  <div className="text-center text-white/50">
                    <p>No times available for this day.</p>
                    <p className="mt-3 text-xs text-white/30">Try another day, or <a href={`tel:${phoneDigits}`} className="underline hover:text-white/60 transition">call {club.phone}</a>.</p>
                  </div>
                )}
              </section>

              <div className="max-w-md mx-auto">
                <button
                  disabled={!selectedTime}
                  onClick={() => { setError(null); setStep("sauna"); }}
                  className="w-full py-3.5 rounded-full bg-white text-[#113D33] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
                >
                  Continue
                </button>
                <div className="mt-5 text-center text-xs text-white/40">
                  Prefer to book with staff?{" "}
                  <a className="underline underline-offset-4 hover:text-white/70 transition" href={`tel:${phoneDigits}`}>Call {club.phone}</a>
                </div>
              </div>
            </>
          )}

          {/* SAUNA (optional add-ons during the 75) */}
          {step === "sauna" && (
            <div className="max-w-lg mx-auto text-left">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Add a sauna to your 75</h2>
                <p className="text-sm text-white/60">
                  Saunas run <span className="text-white/90 font-semibold">during</span> your Remedy Lounge session. Pick a 25-minute window for each sauna you want, up to 2 per visit. This step is optional.
                </p>
                {selectedTime && (
                  <p className="text-xs text-[#9ABFB3] mt-2">
                    Your session: {formatTimeRange(selectedTime, SERVICE_MIN)}
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {Array.from({ length: SUB_SLOTS }, (_, i) => {
                  const slotStart = selectedTime ? new Date(selectedTime.getTime() + i * SUB_SLOT_MIN * 60_000) : null;
                  const choice = saunaChoices[i];
                  return (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-white">
                          Window {i + 1}
                          {slotStart && (
                            <span className="text-white/50 font-normal ml-2">
                              {formatTimeRange(slotStart, SUB_SLOT_MIN)}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setSaunaChoices((prev) => prev.map((c, j) => (j === i ? null : c)))}
                          className={`py-2.5 rounded-xl text-sm font-medium border transition ${choice === null ? "bg-white text-[#113D33] border-white" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}
                        >
                          None
                        </button>
                        {club.saunas.map((s) => {
                          const booked = slotStart ? saunaBookedAt(s.sessionTypeId, slotStart) : 0;
                          const isChosen = choice === s.key;
                          const full = booked >= s.capacity;
                          // Cap at 2 sauna sessions per visit (locked Lounge model).
                          // Windows that already have a choice stay swappable.
                          const capReached = selectedSaunaCount >= 2 && choice === null;
                          const seatsLeft = Math.max(0, s.capacity - booked);
                          const blocked = (full || capReached) && !isChosen;
                          return (
                            <button
                              key={s.key}
                              disabled={blocked}
                              onClick={() => setSaunaChoices((prev) => prev.map((c, j) => (j === i ? s.key : c)))}
                              className={`py-2.5 rounded-xl text-sm font-medium border transition ${isChosen ? "bg-white text-[#113D33] border-white" : blocked ? "border-white/10 bg-white/5 text-white/30 cursor-not-allowed" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}
                            >
                              <div>{s.key === "traditional" ? "Traditional" : "Infrared"}</div>
                              <div className="text-[10px] font-normal mt-0.5 opacity-70">
                                {full ? "Full" : capReached && !isChosen ? "Max 2 per visit" : `${seatsLeft} left`}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="max-w-md mx-auto">
                <button
                  onClick={advanceFromSauna}
                  className="w-full py-3.5 rounded-full bg-white text-[#113D33] font-semibold hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
                >
                  {selectedSaunaCount > 0 ? `Continue with ${selectedSaunaCount} sauna${selectedSaunaCount > 1 ? "s" : ""}` : "Skip, no sauna"}
                </button>
                <p className="mt-4 text-center text-xs text-white/40">
                  Sauna availability is confirmed at booking. If a window is full, we&apos;ll keep your Lounge session and let you know.
                </p>
              </div>
            </div>
          )}

          {/* EMAIL */}
          {step === "email" && (
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">Enter your email to reserve</h2>
                <p className="text-sm text-[#113D33]/75 mb-4 text-center">This helps us find (or create) your account.</p>
                <div className="rounded-xl border border-[#113D33]/15 bg-white/70 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <IconLock className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <p className="text-sm text-[#113D33]/80 leading-relaxed">We only use your email for booking confirmation and account lookup.</p>
                  </div>
                </div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" autoComplete="email" aria-label="Email address" name="email" placeholder="you@email.com" className="w-full px-4 py-3 border rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                {error && <p className="text-red-700 text-sm mb-3" role="alert">{error}</p>}
                <button disabled={!selectedTime || !isValidEmail(email)} onClick={handleConfirmEmail} className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">Continue</button>
                <button onClick={() => { setError(null); setStep("sauna"); }} className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">Back</button>
              </div>
            </div>
          )}

          {/* NAME */}
          {step === "name" && (
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up space-y-4">
                <h2 className="text-xl font-semibold text-center">Confirm your name</h2>
                <p className="text-sm text-[#113D33]/70">We found your account but we&apos;re missing your name. Please add it so your appointment is on file correctly.</p>
                <div>
                  <label className="block text-sm font-medium text-[#113D33] mb-1">First name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-base" autoComplete="given-name" autoFocus />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#113D33] mb-1">Last name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-base" autoComplete="family-name" />
                </div>
                {error && <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
                <button disabled={nameSaving || !firstName.trim() || !lastName.trim()} onClick={handleSaveNameAndContinue} className="w-full rounded-full bg-[#113D33] text-white py-4 text-lg font-semibold hover:bg-[#0e3029] active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:active:scale-100 shadow-lg">
                  {nameSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving…
                    </span>
                  ) : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* CARD */}
          {step === "card" && (
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">{cardContext === "create_account" ? "Create your account" : "Add a card to your account"}</h2>
                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 p-4 mb-5">
                  <div className="flex items-start gap-3">
                    <IconLock className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#113D33]/80 leading-relaxed">No charge today. Your card is only used to <span className="font-semibold">hold the reservation</span> for late cancellation or no-show protection.</p>
                      <div className="mt-3"><CardBrandPills /></div>
                    </div>
                  </div>
                </div>
                {cardContext === "create_account" && (
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" name="firstName" placeholder="First name" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" name="lastName" placeholder="Last name" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                    <input value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} inputMode="tel" autoComplete="tel" name="mobilePhone" placeholder="Mobile phone" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <input ref={cardHolderRef} autoComplete="off" name="cc-name" data-lpignore="true" data-1p-ignore placeholder="Name on card" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                  <input ref={cardNumberRef} autoComplete="off" name="cc-number" data-lpignore="true" data-1p-ignore inputMode="numeric" placeholder="Card number" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                  <div className="grid grid-cols-2 gap-3">
                    <select ref={expMonthRef} name="cc-exp-month" autoComplete="off" data-lpignore="true" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" defaultValue="" aria-label="Expiration month">
                      <option value="" disabled>MM</option>
                      {expMonthOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select ref={expYearRef} name="cc-exp-year" autoComplete="off" data-lpignore="true" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" defaultValue="" aria-label="Expiration year">
                      <option value="" disabled>YYYY</option>
                      {expYearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <input ref={billingAddressRef} autoComplete="billing street-address" data-lpignore="true" data-1p-ignore placeholder="Billing street address" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                  <div className="grid grid-cols-3 gap-3">
                    <input ref={billingCityRef} autoComplete="billing address-level2" data-lpignore="true" data-1p-ignore placeholder="City" className="col-span-2 w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                    <input ref={billingStateRef} autoComplete="billing address-level1" data-lpignore="true" data-1p-ignore placeholder="State" maxLength={2} className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                  </div>
                  <input ref={postalCodeRef} autoComplete="billing postal-code" name="postalCode" data-lpignore="true" data-1p-ignore placeholder="ZIP" className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                </div>
                <div className="rounded-xl border border-[#113D33]/10 bg-white/60 p-4 mb-4">
                  <div className="flex items-start gap-3 text-sm text-[#113D33]/80">
                    <IconSpark className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <span>We don&apos;t charge today. This only reserves your slot.</span>
                  </div>
                </div>
                {cardContext === "create_account" && (
                  <label className="flex items-center gap-2 cursor-pointer mb-3">
                    <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30" />
                    <span className="text-sm text-[#113D33]/70">Keep me updated on promotions and specials</span>
                  </label>
                )}
                {error && <p className="text-red-700 text-sm mb-3" role="alert">{error}</p>}
                <button onClick={handleSaveCardAndContinue} disabled={cardSaving} className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">{cardSaving ? "Saving…" : "Save & continue"}</button>
                <button onClick={() => { setError(null); clearCardRefs(); setStep(memberCheckDone && clientId ? "sauna" : "email"); }} className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">Back</button>
                <a href={`tel:${phoneDigits}`} className="block w-full text-center mt-3 py-3 rounded-xl border-2 border-[#113D33] text-[#113D33] font-semibold hover:bg-[#113D33] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">Call to book: {club.phone}</a>
                <p className="text-xs opacity-60 mt-4 text-center">Using: <span className="font-semibold">{emailNormalized}</span></p>
              </div>
            </div>
          )}

          {/* CONFIRM */}
          {step === "confirm" && (
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">Confirm your booking</h2>
                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 overflow-hidden mb-4">
                  <div className="relative h-40 w-full">
                    <Image src={club.loungeImages[0]} alt={`Remedy Lounge ${club.label}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#113D33]/15 px-3 py-1 text-xs text-[#113D33]">
                        <IconSpark className="w-4 h-4" />
                        You&apos;re almost done
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm uppercase tracking-wide opacity-70 mb-2">Summary</div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-[#113D33]">Remedy Lounge · {club.label}</div>
                        {selectedTime && (
                          <div className="text-sm text-[#113D33]/80 mt-1">
                            {formatDayLabel(new Date(selectedDate + "T00:00:00"))} • {formatTimeRange(selectedTime, SERVICE_MIN)}
                          </div>
                        )}
                        <div className="text-sm text-[#113D33]/70 mt-1">{SERVICE_MIN} min</div>
                        {selectedSaunaCount > 0 && (
                          <ul className="mt-2 space-y-0.5">
                            {saunaChoices.map((c, i) => c ? (
                              <li key={i} className="text-xs text-[#4A776D] font-medium">
                                + {club.saunas.find((s) => s.key === c)?.label}
                                {selectedTime && ` · ${formatTime12h(new Date(selectedTime.getTime() + i * SUB_SLOT_MIN * 60_000))}`}
                              </li>
                            ) : null)}
                          </ul>
                        )}
                      </div>
                      <div className="text-right text-[#113D33]">
                        <div className="text-sm font-semibold">{displayPrice}</div>
                        {includedWithMembership ? (
                          <div className="text-xs text-[#4A776D] font-semibold">With your membership</div>
                        ) : isMember ? (
                          <div className="text-xs text-[#4A776D] font-semibold">Member price</div>
                        ) : (
                          <div className="text-xs opacity-70">Included with membership</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#113D33]/80 leading-relaxed mb-4">
                  We&apos;ll reserve this appointment under <span className="font-semibold">{emailNormalized}</span>. No charge today. Your card is stored for no-show / late cancellation protection.
                </p>

                <div className="border-t border-[#113D33]/10 pt-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={forSomeoneElse} onChange={(e) => { setForSomeoneElse(e.target.checked); if (!e.target.checked) { setGuestFirstName(""); setGuestLastName(""); setGuestEmail(""); setGuestPhone(""); setIsSurprise(false); } }} className="w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30" />
                    <span className="text-sm text-[#113D33]/70">This booking is for someone else</span>
                  </label>
                  {forSomeoneElse && (
                    <div className="mt-3 space-y-2.5 animate-fade-in">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Guest first name *" value={guestFirstName} onChange={(e) => setGuestFirstName(e.target.value)} className="rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                        <input type="text" placeholder="Guest last name" value={guestLastName} onChange={(e) => setGuestLastName(e.target.value)} className="rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                      </div>
                      <input type="tel" placeholder="Guest phone *" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="w-full rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                      <input type="email" placeholder="Guest email (optional)" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="w-full rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={isSurprise} onChange={(e) => setIsSurprise(e.target.checked)} className="w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30" />
                        <span className="text-xs text-[#113D33]/60">This is a surprise · don&apos;t contact the guest</span>
                      </label>
                    </div>
                  )}
                </div>

                {error && <p className="text-red-700 text-sm mb-3" role="alert">{error}</p>}
                <button onClick={handleFinalConfirmAndBook} className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/30" disabled={bookingLock.current || (forSomeoneElse && (!guestFirstName.trim() || !guestPhone.trim()))}>Confirm & book</button>
                <button onClick={() => { setError(null); setStep(memberCheckDone && hasCardOnFile && clientId ? "sauna" : "email"); }} className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">Back</button>
                <a href={mindbodyBookingUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30">Manage or book in Mindbody</a>
              </div>
            </div>
          )}

          {/* BOOKING */}
          {step === "booking" && (
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in">
                <p className="text-lg font-semibold text-[#113D33]">Booking your appointment…</p>
                <p className="text-sm text-[#113D33]/70 mt-2">Please don&apos;t close this page.</p>
                <div className="mt-5 h-2 w-full rounded-full bg-white/60 border border-[#113D33]/10 overflow-hidden">
                  <div className="h-full bg-[#113D33] animate-pulse" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <div className="max-w-md mx-auto pt-10 pb-12">
              <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-in">
                <div className="relative h-48 w-full">
                  <Image src={club.loungeImages[0]} alt={`Remedy Lounge ${club.label}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#113D33] via-[#113D33]/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="animate-check-pop mb-3">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white animate-fade-in-up">You&apos;re booked!</h2>
                  </div>
                </div>
              </div>
              {selectedTime && (
                <>
                  <p className="text-[#113D33] font-semibold text-lg mb-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>Remedy Lounge · {club.label}</p>
                  <p className="text-[#113D33]/60 text-sm mb-1 animate-fade-in-up" style={{ animationDelay: "150ms" }}>{formatDayLabel(new Date(selectedDate + "T00:00:00"))} · {formatTimeRange(selectedTime, SERVICE_MIN)}</p>
                  {selectedSaunaCount > 0 && (() => {
                    // Selected sauna labels in order. Remove any the route reported as
                    // failed (one removal per failure, to preserve multiplicity when the
                    // same sauna is picked for two slots), so we never claim a sauna
                    // landed when it didn't.
                    const selectedLabels = saunaChoices
                      .filter(Boolean)
                      .map((c) => club.saunas.find((s) => s.key === c)?.label)
                      .filter((l): l is string => Boolean(l));
                    const remaining = [...failedSaunaLabels];
                    const confirmedLabels = selectedLabels.filter((label) => {
                      const i = remaining.indexOf(label);
                      if (i !== -1) { remaining.splice(i, 1); return false; }
                      return true;
                    });
                    return (
                      <>
                        {confirmedLabels.length > 0 && (
                          <p className="text-[#4A776D] text-sm mb-1 animate-fade-in-up" style={{ animationDelay: "175ms" }}>
                            {confirmedLabels.join(" + ")}
                          </p>
                        )}
                        {failedSaunaLabels.length > 0 && (
                          <p className="text-[#B4541B] text-sm mb-1 animate-fade-in-up" style={{ animationDelay: "175ms" }}>
                            We couldn&apos;t confirm your {failedSaunaLabels.join(" + ")} add-on. Your Remedy Lounge is booked. Call us at {club.phone} and we&apos;ll get the sauna added.
                          </p>
                        )}
                      </>
                    );
                  })()}
                </>
              )}
              <p className="text-[#113D33]/65 text-sm mt-4 mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>Please bring a swimsuit or athleisure. Check your email for confirmation details.</p>
              <Link href={basePath} className="text-sm text-[#113D33]/65 hover:text-[#113D33] underline underline-offset-4 transition-colors">Done. Back to Sway {club.label}</Link>
              <div className="mt-6">
                <a href={`tel:${phoneDigits}`} className="text-sm text-[#113D33]/60 hover:text-[#113D33] underline underline-offset-4 transition-colors">Questions? {club.phone}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
