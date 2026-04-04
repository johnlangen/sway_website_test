"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------------------------------------------
   MAVEN HOTEL × SWAY — AESCAPE OPTIONS
--------------------------------------------- */

const MAVEN_SESSIONS = [
  {
    id: 92,
    label: "30-Minute Full Body Massage",
    shortLabel: "30 Minutes",
    price: "$69",
    priceNum: 69,
    minutes: 30,
    image: "/assets/aescapeblog2.jpg",
    bestFor: "Quick reset between meetings or exploring",
  },
  {
    id: 93,
    label: "60-Minute Full Body Massage",
    shortLabel: "60 Minutes",
    price: "$139",
    priceNum: 139,
    minutes: 60,
    image: "/assets/aescapeblog7.jpg",
    bestFor: "Full recovery after a day of travel",
    popular: true,
  },
] as const;

type MavenSession = (typeof MAVEN_SESSIONS)[number];

// Defaults for landing page display
const SESSION_IMAGE = "/assets/aescapeblog7.jpg";

/* ---------------------------------------------
   DATE / TIME HELPERS
--------------------------------------------- */

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
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
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

function parseMindbodyDateTime(raw: string) {
  const hasTZ =
    raw.endsWith("Z") ||
    /[+-]\d{2}:\d{2}$/.test(raw) ||
    /[+-]\d{4}$/.test(raw);

  if (hasTZ) return new Date(raw);

  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);

  return new Date(y, m - 1, d, hh, mm, ss);
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/* ---------------------------------------------
   GENERATE TIMES FROM AVAILABILITY WINDOWS
--------------------------------------------- */

function generateTimesFromWindows(
  windows: { start: string; bookableEnd: string }[]
) {
  const results: Date[] = [];

  windows.forEach((w) => {
    let cursor = parseMindbodyDateTime(w.start);
    const lastStart = parseMindbodyDateTime(w.bookableEnd);

    const minutes = cursor.getMinutes();
    const remainder = minutes % 10;

    if (remainder !== 0) {
      cursor.setMinutes(minutes + (10 - remainder), 0, 0);
    } else {
      cursor.setSeconds(0, 0);
    }

    while (cursor <= lastStart) {
      results.push(new Date(cursor));
      cursor.setMinutes(cursor.getMinutes() + 10);
    }
  });

  return results;
}

/* ---------------------------------------------
   GROUP TIMES BY PERIOD
--------------------------------------------- */

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

function filterPreferredTimes(all: Date[]) {
  const primary = all.filter((t) => {
    const m = t.getMinutes();
    return m === 0 || m === 30;
  });

  if (primary.length >= 8) return primary;

  const secondary = all.filter((t) => {
    const m = t.getMinutes();
    return m === 15 || m === 45;
  });

  const combined = [...primary, ...secondary];
  if (combined.length < 6) return all;

  combined.sort((a, b) => a.getTime() - b.getTime());
  return combined;
}

function withSelectedTimeIncluded(
  displayTimes: Date[],
  selectedTime: Date | null
) {
  if (!selectedTime) return displayTimes;
  const exists = displayTimes.some(
    (t) => t.getTime() === selectedTime.getTime()
  );
  if (exists) return displayTimes;
  const merged = [...displayTimes, selectedTime];
  merged.sort((a, b) => a.getTime() - b.getTime());
  return merged;
}

/* ---------------------------------------------
   EMAIL + CARD HELPERS
--------------------------------------------- */

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
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n))
    return "MasterCard";
  if (/^3[47]/.test(n)) return "AmericanExpress";
  if (/^6(011|5)/.test(n) || /^64[4-9]/.test(n)) return "Discover";

  return "Visa";
}

/* ---------------------------------------------
   UI ICONS
--------------------------------------------- */

function IconLock(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v6A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-6A2.5 2.5 0 0 1 6.5 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 14v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpark(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 14l.9 2.9L8 18l-3.1 1.1L4 22l-.9-2.9L0 18l3.1-1.1L4 14Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardBrandPills() {
  const pill =
    "px-2.5 py-1 rounded-full border border-[#113D33]/20 bg-white/60 text-xs text-[#113D33]/80";
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className={pill}>Visa</span>
      <span className={pill}>Mastercard</span>
      <span className={pill}>AmEx</span>
      <span className={pill}>Discover</span>
    </div>
  );
}

/* ---------------------------------------------
   PROGRESS BAR
--------------------------------------------- */

type Step = "session" | "time" | "email" | "card" | "confirm" | "booking" | "done";
type CardContext = "create_account" | "add_card" | null;

function ProgressBar({ step }: { step: Step }) {
  const displaySteps = ["Session", "Time", "Account", "Confirm"];

  const stepToIdx: Partial<Record<Step, number>> = {
    session: 0,
    time: 1,
    email: 2,
    card: 2,
    confirm: 3,
  };

  if (step === "booking" || step === "done") return null;

  const displayIdx = stepToIdx[step] ?? 0;
  const pct = ((displayIdx + 1) / displaySteps.length) * 100;

  return (
    <div className="animate-fade-in">
      <div className="h-1 rounded-full bg-[#113D33]/8 overflow-hidden">
        <div
          className="h-full bg-[#113D33] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="hidden sm:flex justify-between mt-2">
        {displaySteps.map((label, i) => (
          <span
            key={label}
            className={`text-[10px] uppercase tracking-wider transition-colors duration-300 ${
              i <= displayIdx
                ? "text-[#113D33] font-semibold"
                : "text-[#113D33]/25"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   MAIN PAGE
--------------------------------------------- */

export default function MavenHotelPage() {
  const today = useMemo(() => new Date(), []);

  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [times, setTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("session");
  const [selectedSession, setSelectedSession] = useState<MavenSession>(MAVEN_SESSIONS[1]); // default 60-min

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAllTimes, setShowAllTimes] = useState(false);

  const [cardContext, setCardContext] = useState<CardContext>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  const [cardSaving, setCardSaving] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const bookingLock = useRef(false);

  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  const bookingRef = useRef<HTMLDivElement | null>(null);
  const didMountRef = useRef(false);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const displayedTimes = useMemo(() => {
    const base = showAllTimes ? times : filterPreferredTimes(times);
    return withSelectedTimeIncluded(base, selectedTime);
  }, [showAllTimes, times, selectedTime]);

  const groupedTimes = useMemo(
    () => groupTimes(displayedTimes),
    [displayedTimes]
  );

  const expMonthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );
  const expYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(currentYear + i));
  }, []);

  const summaryText = useMemo(() => {
    if (!selectedTime) return null;
    return `${selectedSession.label} · ${formatDayLabel(
      new Date(selectedDate + "T00:00:00")
    )} · ${formatTimeRange(selectedTime, selectedSession.minutes)}`;
  }, [selectedDate, selectedTime]);

  const confirmDetails = useMemo(() => {
    if (!selectedTime) return null;
    return {
      session: selectedSession.label,
      price: selectedSession.price,
      minutes: selectedSession.minutes,
      image: selectedSession.image,
      dateLabel: formatDayLabel(new Date(selectedDate + "T00:00:00")),
      timeLabel: formatTimeRange(selectedTime, selectedSession.minutes),
    };
  }, [selectedDate, selectedTime]);

  const emailNormalized = useMemo(() => normalizeEmail(email), [email]);

  const stepTitle = useMemo(() => {
    if (step === "session") return "Choose your session";
    if (step === "time") return "Choose a time";
    if (step === "email") return "Enter your email";
    if (step === "card") {
      return cardContext === "create_account"
        ? "Create your account"
        : "Payment details";
    }
    if (step === "confirm") return "Review and confirm";
    if (step === "booking") return "Booking your appointment";
    return "";
  }, [step, cardContext]);

  /* --- Disable scroll-snap + enable smooth scroll --- */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlSnap = html.style.scrollSnapType;
    const prevBodySnap = body.style.scrollSnapType;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollSnapType = "none";
    body.style.scrollSnapType = "none";
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollSnapType = prevHtmlSnap;
      body.style.scrollSnapType = prevBodySnap;
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  /* --- Scroll to booking section on step change --- */
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const bookEl = document.getElementById("book");
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  /* --- Clear card refs on leaving card step --- */
  function clearCardRefs() {
    if (cardHolderRef.current) cardHolderRef.current.value = "";
    if (cardNumberRef.current) cardNumberRef.current.value = "";
    if (expMonthRef.current) expMonthRef.current.value = "";
    if (expYearRef.current) expYearRef.current.value = "";
    if (postalCodeRef.current) postalCodeRef.current.value = "";
  }

  useEffect(() => {
    if (step !== "card") {
      clearCardRefs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  /* --- Fetch availability --- */
  useEffect(() => {
    setLoading(true);
    setSelectedTime(null);
    setError(null);
    setShowAllTimes(false);

    fetch(
      `/api/aescape/availability?sessionTypeId=${selectedSession.id}&date=${selectedDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.windows)) {
          setTimes([]);
          setError("No availability for this day.");
          return;
        }
        setTimes(generateTimesFromWindows(data.windows));
      })
      .catch(() => {
        setTimes([]);
        setError("Unable to load availability.");
      })
      .finally(() => setLoading(false));
  }, [selectedDate]);

  /* --- Card payload --- */
  function getCardPayloadFromRefs() {
    const cardHolder = (cardHolderRef.current?.value || "").trim();
    const cardNumberRaw = cardNumberRef.current?.value || "";
    const cardNumber = onlyDigits(cardNumberRaw);
    const expMonthRaw = (expMonthRef.current?.value || "").trim();
    const expYearRaw = (expYearRef.current?.value || "").trim();
    const postalCode = (postalCodeRef.current?.value || "").trim();
    const expMonth = expMonthRaw.padStart(2, "0");
    const expYear = expYearRaw.length === 2 ? `20${expYearRaw}` : expYearRaw;
    const cardType = detectCardType(cardNumber);
    return { cardHolder, cardNumber, expMonth, expYear, postalCode, cardType };
  }

  function validateCardFields() {
    const { cardHolder, cardNumber, expMonth, expYear, postalCode } =
      getCardPayloadFromRefs();

    if (!cardHolder) return "Please enter the name on the card.";
    if (!cardNumber || cardNumber.length < 12)
      return "Please enter a valid card number.";
    if (!luhnCheck(cardNumber))
      return "Card number looks invalid. Please double-check.";
    if (!expMonth || Number(expMonth) < 1 || Number(expMonth) > 12)
      return "Please select a valid expiration month.";
    if (!expYear || expYear.length < 4)
      return "Please select an expiration year (e.g., 2028).";

    const now = new Date();
    const expY = Number(expYear);
    const expM = Number(expMonth);
    if (expY === now.getFullYear() && expM < now.getMonth() + 1) {
      return "This card appears to be expired.";
    }

    if (!postalCode || postalCode.length < 3)
      return "Please enter a valid ZIP/postal code.";

    return null;
  }

  /* --- Client lookup --- */
  async function lookupClientByEmail(emailToCheck: string) {
    const res = await fetch(
      `/api/mindbody/client-lookup?email=${encodeURIComponent(emailToCheck)}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || "Client lookup failed.");
    }
    return data as {
      found: boolean;
      client: { Id: string } | null;
      hasCardOnFile: boolean;
    };
  }

  /* --- Conversion tracking --- */
  function reportPurchaseConversion() {
    if (typeof window === "undefined") return;

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17421817568/T3o8CK-LoukbEOCtr_NA",
      });
      window.gtag("event", "conversion", {
        send_to: "AW-17421817568/ZY8ECK7B0P0bEOCtr_NA",
        value: 1.0,
        currency: "USD",
      });
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "aescape_booking_complete",
      session_type: selectedSession.label,
      session_minutes: selectedSession.minutes,
      price: selectedSession.price,
      booking_source: "maven_hotel",
    });
  }

  /* --- Funnel tracking --- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];

    const eventMap: Record<string, string> = {
      time: "booking_start",
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
      booking_flow: "maven_hotel_aescape",
    };

    if (step === "email" && selectedTime) {
      payload.booking_date = selectedDate;
      payload.session_type = selectedSession.label;
      payload.session_minutes = selectedSession.minutes;
    }
    if (step === "card") {
      payload.client_type =
        cardContext === "create_account" ? "new" : "returning";
    }
    if (step === "done") {
      payload.service_name = selectedSession.label;
      payload.total_price = selectedSession.price;
    }

    window.dataLayer.push(payload);
  }, [step]);

  /* --- Booking --- */
  async function bookWithConfirmClientId(resolvedClientId: string) {
    if (!selectedTime) {
      setError("Please select a time first.");
      setStep("time");
      return;
    }

    setStep("booking");

    const notes = "MAVEN HOTEL GUEST — booked online";

    const bookRes = await fetch("/api/mindbody/book-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: resolvedClientId,
        sessionTypeId: selectedSession.id,
        startDateTime: formatLocalDateTime(selectedTime),
        notes,
      }),
    });

    const bookData = await bookRes.json();

    if (!bookRes.ok) {
      throw new Error(
        bookData?.error || "Booking failed. Please try again or call us."
      );
    }

    reportPurchaseConversion();
    setStep("done");
  }

  /* --- Step handlers --- */
  async function handleConfirmBooking() {
    setError(null);

    if (!selectedTime) {
      setError("Please select a time first.");
      setStep("time");
      return;
    }

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const lookup = await lookupClientByEmail(normalized);

      if (lookup.found && !lookup.hasCardOnFile) {
        setCardContext("add_card");
        setClientId(String(lookup.client!.Id));
        setStep("card");
        return;
      }

      if (!lookup.found) {
        setCardContext("create_account");
        setClientId(null);
        setStep("card");
        return;
      }

      setClientId(String(lookup.client!.Id));
      setStep("confirm");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStep("email");
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

    const { cardHolder, cardNumber, expMonth, expYear, postalCode, cardType } =
      getCardPayloadFromRefs();

    setCardSaving(true);

    try {
      let resolvedClientId: string | null = null;

      if (cardContext === "create_account") {
        if (!firstName.trim() || !lastName.trim()) {
          throw new Error("Please enter your first and last name.");
        }
        if (!mobilePhone.trim()) {
          throw new Error("Please enter your mobile phone number.");
        }

        const res = await fetch("/api/mindbody/add-client-with-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalized,
            mobilePhone: mobilePhone.trim(),
            cardNumber,
            expMonth,
            expYear,
            postalCode,
            cardHolder,
            cardType,
            sendPromotionalEmails: marketingOptIn,
            sendPromotionalTexts: marketingOptIn,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error ||
              "Unable to create your account. Please double-check your details."
          );
        }

        resolvedClientId = data.clientId != null ? String(data.clientId) : null;
        if (!resolvedClientId) {
          throw new Error(
            "Account created, but client ID was missing. Please try again."
          );
        }
      }

      if (cardContext === "add_card") {
        if (!clientId) {
          throw new Error("Missing client ID for card update.");
        }

        const res = await fetch("/api/mindbody/update-client-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            cardNumber,
            expMonth,
            expYear,
            postalCode,
            cardHolder,
            cardType,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error || "Unable to save your card. Please try again."
          );
        }

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
      await bookWithConfirmClientId(clientId);

      if (cardContext !== "create_account" && clientId) {
        fetch("/api/mindbody/update-client-notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            sendScheduleEmails: true,
            sendAccountEmails: true,
          }),
        }).catch(() =>
          console.error("Failed to update notification preferences")
        );
      }
    } catch (err: any) {
      setError(err.message || "Booking failed. Please try again or call us.");
      setStep("confirm");
    } finally {
      bookingLock.current = false;
    }
  }

  function handleHeaderBack() {
    setError(null);
    if (step === "session") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else if (step === "time") {
      setStep("session");
    } else if (step === "email") {
      setStep("time");
    } else if (step === "card") {
      setStep("email");
    } else if (step === "confirm") {
      setStep("email");
    }
  }

  /* --- Show booking header (hide on time step since landing is visible above) --- */
  const showHeader = step !== "session" && step !== "done";

  /* =============================================
     RENDER
  ============================================= */

  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance snap-none">
      {/* ── Sticky booking header (visible in booking steps only) ── */}
      {showHeader && (
        <div
          data-booking-header="true"
          className="sticky top-[56px] z-30 border-b border-[#113D33]/10 bg-[#F7F4E9]/95 backdrop-blur-md"
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={handleHeaderBack}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-[#113D33] hover:bg-[#113D33]/5 active:bg-[#113D33]/10 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#113D33]/25"
                aria-label="Go back"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="font-medium">Back</span>
              </button>
              <div className="text-sm font-semibold text-[#113D33]">
                {stepTitle}
              </div>
              <span className="w-16" />
            </div>
            <ProgressBar step={step} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          LANDING SECTION (always visible)
      ══════════════════════════════════════════ */}

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/assets/maven-hotel.jpg"
            alt="The Maven Hotel at Dairy Block, Denver"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 w-full px-4 pb-10 md:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 font-medium">
                The Maven Hotel
              </span>
              <span className="text-white/30">&times;</span>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 font-medium">
                Sway Wellness Spa
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              AI-Powered Massage{" "}
              <span className="text-[#9ABFB3]">on Larimer Square</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-8">
              Book a 30 or 60-minute AI-powered Aescape massage at Sway
              Wellness Spa — just 0.6 miles from The Maven Hotel. Walk,
              scooter, or drive over in minutes.
            </p>

            <a
              href="#book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#113D33] font-semibold text-lg hover:bg-[#9ABFB3] hover:text-[#113D33] active:scale-[0.97] transition-all duration-200 shadow-xl"
            >
              Book Your Massage
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

          {/* Details section */}
          <section className="px-4 py-16 md:py-24 bg-[#F7F4E9]">
            <div className="max-w-4xl mx-auto">
              {/* The experience */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={SESSION_IMAGE}
                    alt="Aescape robot massage at Sway Wellness Spa"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#4A776D] mb-3 font-medium">
                    The Maven Hotel &times; Sway Wellness
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#113D33] mb-4 leading-tight">
                    Aescape
                    <br />
                    Robot Massage
                  </h2>
                  <p className="text-[#113D33]/70 leading-relaxed mb-6">
                    Aescape uses real-time body mapping and AI to deliver a
                    personalized massage tailored to your tension points.
                    Zero-gravity positioning, warm touch, and adaptive pressure
                    — all without the need for a human therapist.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      "Real-time muscle mapping and AI adaptation",
                      "Personalized pressure for every body type",
                      "Zero-gravity heated positioning",
                      "No tipping, no awkward small talk",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#113D33] flex items-center justify-center mt-0.5 shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-[#113D33]/80 text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-bold text-[#113D33]">
                      $69
                    </span>
                    <span className="text-[#113D33]/50 text-sm">
                      / 30 min
                    </span>
                    <span className="text-[#113D33]/30">|</span>
                    <span className="text-2xl font-bold text-[#113D33]">
                      $139
                    </span>
                    <span className="text-[#113D33]/50 text-sm">
                      / 60 min
                    </span>
                  </div>

                  <a
                    href="#book"
                    className="inline-block w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#113D33] text-white font-semibold text-center hover:bg-[#0e3029] active:scale-[0.98] transition-all duration-200 shadow-lg"
                  >
                    Reserve Your Time
                  </a>
                </div>
              </div>

              {/* How it works */}
              <div className="text-center mb-16 md:mb-24">
                <h2 className="text-2xl md:text-3xl font-bold text-[#113D33] mb-10">
                  How It Works
                </h2>
                <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  {[
                    {
                      step: "1",
                      title: "Book Online",
                      desc: "Pick your time below — reserve in under a minute",
                    },
                    {
                      step: "2",
                      title: "Head Over",
                      desc: "10-min walk or a quick scooter ride to 1428 Larimer St",
                    },
                    {
                      step: "3",
                      title: "Relax",
                      desc: "60 minutes of AI-powered recovery — no prep needed",
                    },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#113D33] text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-[#113D33] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#113D33]/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location info */}
              <div className="bg-white/70 border border-[#113D33]/10 rounded-2xl p-6 md:p-8 mb-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-[#113D33] mb-2">
                      Sway Wellness Spa — Larimer Square
                    </h3>
                    <p className="text-sm text-[#113D33]/70 mb-1">
                      1428 Larimer Street, Denver, CO 80202
                    </p>
                    <p className="text-sm text-[#113D33]/70 mb-4">
                      0.6 miles from The Maven Hotel — 10-min walk, 5-min drive, or grab a scooter
                    </p>
                    <a
                      href="tel:3034766150"
                      className="text-sm text-[#4A776D] font-medium hover:text-[#113D33] transition"
                    >
                      (303) 476-6150
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#113D33] mb-2">
                      The Maven Hotel at Dairy Block
                    </h3>
                    <p className="text-sm text-[#113D33]/70 mb-1">
                      1850 Wazee Street, Denver, CO 80202
                    </p>
                    <p className="text-sm text-[#113D33]/50 mb-4">
                      A boutique hotel in Denver&apos;s vibrant LoDo neighborhood
                    </p>
                    <a
                      href="https://www.themavenhotel.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#4A776D] font-medium hover:text-[#113D33] transition"
                    >
                      themavenhotel.com &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#113D33] text-white font-semibold text-lg hover:bg-[#0e3029] active:scale-[0.97] transition-all duration-200 shadow-lg"
                >
                  Book Your Massage
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <p className="text-xs text-[#113D33]/40 mt-4">
                  Questions? Call{" "}
                  <a
                    href="tel:3034766150"
                    className="underline hover:text-[#113D33]/60 transition"
                  >
                    (303) 476-6150
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Maven partnership footer note */}
          <section className="px-4 py-8 bg-[#113D33]">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-white/60">
                In partnership with{" "}
                <a
                  href="https://www.themavenhotel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ABFB3] hover:text-white transition underline underline-offset-4"
                >
                  The Maven Hotel at Dairy Block
                </a>{" "}
                — a boutique hotel in Denver&apos;s LoDo neighborhood.
              </p>
            </div>
          </section>

      {/* ══════════════════════════════════════════
          BOOKING SECTION (always rendered below landing)
      ══════════════════════════════════════════ */}
      <div id="book" className="scroll-mt-24">

      {/* ── SESSION SELECTION STEP ── */}
      {step === "session" && (
        <div className="px-4 pt-12 md:pt-16 pb-20">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#113D33] mb-2 font-vance">
              Choose Your Session
            </h2>
            <p className="text-sm text-[#113D33]/60 mb-8">
              AI-powered robot massage — pick your duration
            </p>

            <div className="space-y-4">
              {MAVEN_SESSIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedSession(s);
                    setSelectedTime(null);
                    setTimes([]);
                    setStep("time");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                    selectedSession.id === s.id
                      ? "border-[#113D33] shadow-lg"
                      : "border-[#113D33]/10 hover:border-[#113D33]/30"
                  }`}
                >
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={s.image}
                      alt={s.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {"popular" in s && s.popular && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-white font-bold text-lg">
                            {s.shortLabel}
                          </div>
                          <div className="text-white/70 text-sm">
                            {s.bestFor}
                          </div>
                        </div>
                        <div className="text-white font-bold text-2xl">
                          {s.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TIME SELECTION STEP ── */}
      {step === "time" && (
        <div className="px-4 pt-12 md:pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Session summary chip */}
            <div className="mb-8 max-w-lg mx-auto bg-white/80 backdrop-blur-sm border border-[#113D33]/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={selectedSession.image}
                  alt={selectedSession.label}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold text-[#113D33] text-sm">
                  {selectedSession.label}
                </div>
                <div className="text-xs text-[#113D33]/50">
                  {selectedSession.minutes} min · {selectedSession.price}
                </div>
              </div>
            </div>

            {/* Day picker */}
            <section className="mb-10 md:mb-12">
              <h2 className="text-lg font-semibold text-[#113D33]/80 mb-1">
                Choose a Day
              </h2>
              <p className="text-sm text-[#113D33]/40 mb-4">
                {addDays(weekStart, 3).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => setWeekStart(addDays(weekStart, -7))}
                  disabled={weekStart <= today}
                  className="p-2 rounded-full hover:bg-[#113D33]/5 disabled:opacity-20 transition-all duration-150"
                  aria-label="Previous week"
                >
                  <svg
                    className="w-5 h-5 text-[#113D33]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-1">
                  {weekDays.map((day) => {
                    const iso = formatISO(day);
                    const isPast = day < today && iso !== formatISO(today);
                    const selected = iso === selectedDate;
                    const dayName = day
                      .toLocaleDateString("en-US", { weekday: "short" })
                      .toUpperCase();
                    const dayNum = day.getDate();

                    return (
                      <button
                        key={iso}
                        disabled={isPast}
                        onClick={() => setSelectedDate(iso)}
                        className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 min-w-[52px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                          selected
                            ? "bg-[#113D33] text-white shadow-lg shadow-[#113D33]/20"
                            : isPast
                              ? "opacity-25 cursor-not-allowed"
                              : "bg-white text-[#113D33] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        }`}
                      >
                        <span className="text-[10px] font-semibold tracking-wider">
                          {dayName}
                        </span>
                        <span className="text-lg font-bold leading-tight">
                          {dayNum}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setWeekStart(addDays(weekStart, 7))}
                  className="p-2 rounded-full hover:bg-[#113D33]/5 transition-all duration-150"
                  aria-label="Next week"
                >
                  <svg
                    className="w-5 h-5 text-[#113D33]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </section>

            {/* Times */}
            <section className="mb-8 md:mb-10 text-left">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-[#113D33]/80 text-center flex-1">
                  Choose a Time
                </h2>

                {!loading && !error && times.length > 0 && (
                  <button
                    onClick={() => setShowAllTimes((v) => !v)}
                    className="text-xs px-3.5 py-1.5 rounded-full border border-[#113D33]/10 bg-white/70 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    {showAllTimes ? "Recommended" : "Show all"}
                  </button>
                )}
              </div>

              {loading && (
                <div className="flex items-center justify-center gap-2 py-8 text-sm text-[#113D33]/50 animate-pulse">
                  <div className="w-4 h-4 rounded-full border-2 border-[#113D33]/15 border-t-[#113D33]/40 animate-spin" />
                  Loading availability...
                </div>
              )}
              {error && <p className="text-center text-red-700">{error}</p>}

              {!loading &&
                !error &&
                Object.entries(groupedTimes).map(
                  ([label, group]) =>
                    group.length > 0 && (
                      <div key={label} className="mb-6">
                        <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#113D33]/40 mb-2.5">
                          {label}
                        </h3>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                          {group.map((time) => {
                            const isSelected =
                              selectedTime?.getTime() === time.getTime();
                            return (
                              <button
                                key={time.toISOString()}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-sm ${
                                  isSelected
                                    ? "bg-[#113D33] text-white border-[#113D33] shadow-md"
                                    : "border-[#113D33]/10 bg-white/70 hover:bg-white hover:shadow-sm hover:-translate-y-0.5 text-[#113D33]"
                                }`}
                              >
                                {formatTime12h(time)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )
                )}

              {!loading && !error && times.length === 0 && (
                <div className="text-center text-[#113D33]/60 py-8">
                  <p>No times available for this day. Try another date.</p>
                </div>
              )}
            </section>

            {/* Continue CTA */}
            <div className="max-w-md mx-auto">
              <button
                disabled={!selectedTime}
                onClick={() => {
                  setError(null);
                  setStep("email");
                }}
                className="w-full py-3.5 rounded-full bg-[#113D33] text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0e3029] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 shadow-lg"
              >
                Continue
              </button>

              <div className="mt-5 text-center text-xs text-[#113D33]/40">
                Prefer to book by phone?{" "}
                <a
                  className="underline underline-offset-4 hover:text-[#113D33]/60 transition"
                  href="tel:3034766150"
                >
                  Call (303) 476-6150
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          EMAIL STEP
      ══════════════════════════════════════════ */}
      {step === "email" && (
        <div className="px-4 pt-24 md:pt-28 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  Enter your email to reserve
                </h2>
                <p className="text-sm text-[#113D33]/75 mb-4 text-center">
                  This helps us find (or create) your Mindbody account.
                </p>

                <div className="rounded-xl border border-[#113D33]/15 bg-white/70 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <IconLock className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <p className="text-sm text-[#113D33]/80 leading-relaxed">
                      We only use your email for booking confirmation and
                      account lookup.
                    </p>
                  </div>
                </div>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  autoComplete="email"
                  name="email"
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 border rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                />

                {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

                <button
                  disabled={!selectedTime || !isValidEmail(email)}
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Continue
                </button>

                <button
                  onClick={() => {
                    setError(null);
                    setStep("time");
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          CARD STEP
      ══════════════════════════════════════════ */}
      {step === "card" && (
        <div className="px-4 pt-24 md:pt-28 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  {cardContext === "create_account"
                    ? "Create your account"
                    : "Add a card to your account"}
                </h2>

                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 p-4 mb-5">
                  <div className="flex items-start gap-3">
                    <IconLock className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#113D33]/80 leading-relaxed">
                        No charge today — your card is only used to{" "}
                        <span className="font-semibold">
                          hold the appointment
                        </span>{" "}
                        for late cancellation or no-show protection.
                      </p>
                      <div className="mt-3">
                        <CardBrandPills />
                      </div>
                    </div>
                  </div>
                </div>

                {cardContext === "create_account" && (
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      name="firstName"
                      placeholder="First name"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    />
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      name="lastName"
                      placeholder="Last name"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    />
                    <input
                      value={mobilePhone}
                      onChange={(e) => setMobilePhone(e.target.value)}
                      inputMode="tel"
                      autoComplete="tel"
                      name="mobilePhone"
                      placeholder="Mobile phone"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 mb-4">
                  <input
                    ref={cardHolderRef}
                    autoComplete="off"
                    name="cc-name"
                    data-lpignore="true"
                    data-1p-ignore
                    placeholder="Name on card"
                    className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  />

                  <input
                    ref={cardNumberRef}
                    autoComplete="off"
                    name="cc-number"
                    data-lpignore="true"
                    data-1p-ignore
                    inputMode="numeric"
                    placeholder="Card number"
                    className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <select
                      ref={expMonthRef}
                      name="cc-exp-month"
                      autoComplete="off"
                      data-lpignore="true"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                      defaultValue=""
                      aria-label="Expiration month"
                    >
                      <option value="" disabled>
                        MM
                      </option>
                      {expMonthOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>

                    <select
                      ref={expYearRef}
                      name="cc-exp-year"
                      autoComplete="off"
                      data-lpignore="true"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                      defaultValue=""
                      aria-label="Expiration year"
                    >
                      <option value="" disabled>
                        YYYY
                      </option>
                      {expYearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>

                    <input
                      ref={postalCodeRef}
                      autoComplete="off"
                      name="postalCode"
                      data-lpignore="true"
                      data-1p-ignore
                      placeholder="ZIP"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-[#113D33]/10 bg-white/60 p-4 mb-4">
                  <div className="flex items-start gap-3 text-sm text-[#113D33]/80">
                    <IconSpark className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <span>
                      We don&apos;t charge today — this only reserves your slot.
                    </span>
                  </div>
                </div>

                {cardContext === "create_account" && (
                  <label className="flex items-center gap-2 cursor-pointer mb-3">
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

                {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

                <button
                  onClick={handleSaveCardAndContinue}
                  disabled={cardSaving}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  {cardSaving ? "Saving..." : "Save & continue"}
                </button>

                <button
                  onClick={() => {
                    setError(null);
                    clearCardRefs();
                    setStep("email");
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>

                <a
                  href="tel:3034766150"
                  className="block w-full text-center mt-3 py-3 rounded-xl border-2 border-[#113D33] text-[#113D33] font-semibold hover:bg-[#113D33] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Call to book: (303) 476-6150
                </a>

                <p className="text-xs opacity-60 mt-4 text-center">
                  Using:{" "}
                  <span className="font-semibold">{emailNormalized}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          CONFIRM STEP
      ══════════════════════════════════════════ */}
      {step === "confirm" && (
        <div className="px-4 pt-24 md:pt-28 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  Confirm your booking
                </h2>

                {/* Visual summary */}
                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 overflow-hidden mb-4">
                  <div className="relative h-40 w-full">
                    <Image
                      src={confirmDetails?.image || selectedSession.image}
                      alt={confirmDetails?.session || selectedSession.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#113D33]/15 px-3 py-1 text-xs text-[#113D33]">
                        <IconSpark className="w-4 h-4" />
                        You&apos;re almost done
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-sm uppercase tracking-wide opacity-70 mb-2">
                      Summary
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-[#113D33]">
                          {confirmDetails?.session}
                        </div>
                        <div className="text-sm text-[#113D33]/80 mt-1">
                          {confirmDetails?.dateLabel} ·{" "}
                          {confirmDetails?.timeLabel}
                        </div>
                        <div className="text-sm text-[#113D33]/60 mt-1">
                          {confirmDetails?.minutes} min
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-80">
                          {confirmDetails?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#113D33]/80 leading-relaxed mb-4">
                  We&apos;ll reserve this appointment under{" "}
                  <span className="font-semibold">{emailNormalized}</span>. No
                  charge today — your card is stored in Mindbody for no-show /
                  late cancellation protection.
                </p>

                {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

                <button
                  onClick={handleFinalConfirmAndBook}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 shadow-lg"
                >
                  Confirm Booking
                </button>

                <button
                  onClick={() => {
                    setError(null);
                    setStep("email");
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          BOOKING (LOADING) STEP
      ══════════════════════════════════════════ */}
      {step === "booking" && (
        <div className="px-4 pt-32 pb-20">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full border-2 border-[#113D33]/15 border-t-[#113D33] animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#113D33] mb-2">
              Reserving your appointment...
            </h2>
            <p className="text-[#113D33]/60">
              This usually takes just a few seconds.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          DONE STEP
      ══════════════════════════════════════════ */}
      {step === "done" && (
        <div className="px-4 pt-24 md:pt-32 pb-20">
          <div className="max-w-md mx-auto text-center animate-fade-in-up">
            {/* Checkmark */}
            <div className="w-20 h-20 rounded-full bg-[#113D33] flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-[#113D33] mb-2">
              You&apos;re all set!
            </h2>
            <p className="text-[#113D33]/70 mb-2">
              Your Aescape massage has been booked.
            </p>
            <p className="text-sm text-[#113D33]/50 mb-8">
              A confirmation email has been sent to{" "}
              <span className="font-semibold">{emailNormalized}</span>.
            </p>

            {confirmDetails && (
              <div className="bg-white/70 border border-[#113D33]/10 rounded-2xl p-5 mb-8 text-left">
                <div className="text-sm uppercase tracking-wide text-[#113D33]/50 mb-2">
                  Booking Details
                </div>
                <div className="font-semibold text-[#113D33] mb-1">
                  {confirmDetails.session}
                </div>
                <div className="text-sm text-[#113D33]/70">
                  {confirmDetails.dateLabel} · {confirmDetails.timeLabel}
                </div>
                <div className="text-sm text-[#113D33]/50 mt-1">
                  Sway Wellness Spa · 1428 Larimer Street
                </div>
              </div>
            )}

            <div className="bg-[#113D33]/5 border border-[#113D33]/10 rounded-2xl p-5 mb-8 text-left">
              <h3 className="font-semibold text-[#113D33] mb-2">
                What to expect
              </h3>
              <ul className="space-y-2 text-sm text-[#113D33]/70">
                <li>
                  Arrive 15 minutes early at{" "}
                  <strong>1428 Larimer Street</strong> (10-min walk or 5-min
                  drive from The Maven)
                </li>
                <li>Check in at the front desk — no prep or changing needed</li>
                <li>
                  Wear comfortable clothing (compression apparel provided at
                  check-in)
                </li>
                <li>
                  Questions? Call{" "}
                  <a
                    href="tel:3034766150"
                    className="text-[#4A776D] underline"
                  >
                    (303) 476-6150
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 py-3 rounded-full border-2 border-[#113D33] text-[#113D33] font-semibold hover:bg-[#113D33] hover:text-white transition text-center"
              >
                Explore Sway
              </Link>
              <a
                href="https://www.themavenhotel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-full bg-[#113D33]/5 border border-[#113D33]/15 text-[#113D33] font-medium hover:bg-[#113D33]/10 transition text-center"
              >
                Back to Maven Hotel
              </a>
            </div>
          </div>
        </div>
      )}

      </div>{/* close #book */}

      {/* ── More at Sway CTA ── */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-3">
            More Wellness at Sway
          </h2>
          <p className="text-[#113D33]/60 mb-10 max-w-xl mx-auto">
            Looking for something beyond robot massage? Sway offers a full menu
            of spa treatments at our Larimer Square location.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Massages",
                desc: "Salt stone, deep tissue, Swedish & more",
                href: "/locations/denver-larimer/massage",
              },
              {
                title: "Facials",
                desc: "Anti-aging, hydration, acne & vitamin C",
                href: "/locations/denver-larimer/facials",
              },
              {
                title: "Sauna",
                desc: "Private sauna suite for deep recovery",
                href: "/locations/denver-larimer/sauna",
              },
              {
                title: "Cold Plunge",
                desc: "Cold water therapy to boost circulation",
                href: "/locations/denver-larimer/cold-plunge",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block rounded-2xl border border-[#113D33]/10 p-5 text-left hover:border-[#113D33]/25 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-[#113D33] mb-1 group-hover:text-[#4A776D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#113D33]/60">{item.desc}</p>
              </Link>
            ))}
          </div>

          <p className="text-sm text-[#113D33]/50 mt-8">
            <Link
              href="/locations/denver-larimer/book"
              className="text-[#4A776D] font-medium hover:text-[#113D33] transition underline underline-offset-2"
            >
              View all treatments & book
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7F4E9] px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#113D33] mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "How far is Sway from The Maven Hotel?",
              a: "Sway Wellness Spa is 0.6 miles from The Maven Hotel at Dairy Block — about a 10-minute walk, a 5-minute drive, or a quick scooter ride down Larimer Street. Our address is 1428 Larimer Street, Denver, CO 80202.",
            },
            {
              q: "What is an Aescape robot massage?",
              a: "Aescape is an AI-powered robotic massage system that delivers a precision full-body massage using 3D body-mapping technology. It adjusts pressure in real time based on your body, so every session is personalized. No human therapist needed — just lie down, pick your preferences, and relax for 60 minutes.",
            },
            {
              q: "How do I book from The Maven Hotel?",
              a: "You can book directly on this page — just scroll up, pick a date and time, enter your details, and you're confirmed. The whole process takes under a minute. You'll receive a confirmation email right away.",
            },
            {
              q: "Do I need to be a Maven Hotel guest to book?",
              a: "Nope! This page is available to anyone. The Maven Hotel is a proud partner of Sway, and we welcome all guests — whether you're staying at the Maven, visiting Dairy Block, or exploring Larimer Square.",
            },
            {
              q: "What should I wear? How do I prepare?",
              a: "Just show up in comfortable clothing. Compression apparel is provided at check-in — no need to change or prep beforehand. Arrive about 15 minutes early to get settled, and the Aescape system takes care of the rest.",
            },
            {
              q: "Does Sway offer other treatments besides robot massage?",
              a: "Yes! Sway is a full-service wellness spa. We offer massage therapy (salt stone, deep tissue, Swedish, and more), facials (anti-aging, hydration, vitamin C), a private sauna suite, cold plunge, LED light therapy, and compression therapy. You can explore the full menu and book at swaywellnessspa.com.",
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-black/10">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-[#113D33]">{item.q}</span>
                <svg
                  className={`w-4 h-4 shrink-0 text-[#113D33] opacity-40 transition-transform duration-200 ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-250 ease-in-out ${
                  openFaq === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm text-[#113D33]/80 leading-relaxed pr-8">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
