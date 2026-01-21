"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/* ---------------------------------------------
   AESCAPE SESSION OPTIONS
--------------------------------------------- */

const AESCAPE_OPTIONS = [
  {
    id: 59,
    label: "15 Minute Express",
    price: "$49",
    image: "/assets/aescapeblog6.jpg",
    minutes: 15,
    bestFor: "Quick reset ",
  },
  {
    id: 60,
    label: "30 Minute Full Body",
    price: "$69",
    image: "/assets/aescapeblog2.jpg",
    minutes: 30,
    bestFor: "Full-body refresh",
  },
  {
    id: 61,
    label: "45 Minute Full Body",
    price: "$99",
    image: "/assets/aescapeblog3.jpg",
    minutes: 45,
    bestFor: "Deep recovery",
  },
  {
    id: 62,
    label: "60 Minute Full Body",
    price: "$139",
    image: "/assets/aescapeblog7.jpg",
    minutes: 60,
    bestFor: "Maximum results",
  },
] as const;

const MOST_POPULAR_ID: (typeof AESCAPE_OPTIONS)[number]["id"] = 62;

/* ---------------------------------------------
   DATE HELPERS
--------------------------------------------- */

function formatISO(date: Date) {
  return date.toISOString().split("T")[0];
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

function formatLocalDateTime(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

function isSameDayISO(isoA: string, isoB: string) {
  return isoA === isoB;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}




/* ---------------------------------------------
   GROUP TIMES
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

/* ---------------------------------------------
   GENERATE TIMES
--------------------------------------------- */

function generateTimesFromWindows(
  windows: { start: string; bookableEnd: string }[]
) {
  const results: Date[] = [];

  windows.forEach((w) => {
    let cursor = new Date(w.start);
    const lastStart = new Date(w.bookableEnd);

    // ✅ Snap UP to the next 10-minute boundary (never backwards)
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
   TIME DISPLAY (UI ONLY)
--------------------------------------------- */

function minutesOf(d: Date) {
  return d.getMinutes();
}

function filterPreferredTimes(all: Date[]) {
  // Prefer clean times first: :00 and :30 (premium/curated feel)
  const primary = all.filter((t) => {
    const m = minutesOf(t);
    return m === 0 || m === 30;
  });

  // If we have enough, use them.
  if (primary.length >= 8) return primary;

  // Otherwise, add :15 and :45
  const secondary = all.filter((t) => {
    const m = minutesOf(t);
    return m === 15 || m === 45;
  });

  const combined = [...primary, ...secondary];

  // If still sparse, show everything (never “hide” availability)
  if (combined.length < 6) return all;

  // Sort to keep chronological order
  combined.sort((a, b) => a.getTime() - b.getTime());
  return combined;
}

function withSelectedTimeIncluded(
  displayTimes: Date[],
  selectedTime: Date | null
) {
  if (!selectedTime) return displayTimes;
  const exists = displayTimes.some((t) => t.getTime() === selectedTime.getTime());
  if (exists) return displayTimes;
  const merged = [...displayTimes, selectedTime];
  merged.sort((a, b) => a.getTime() - b.getTime());
  return merged;
}

/* ---------------------------------------------
   EMAIL HELPERS
--------------------------------------------- */

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

function isValidEmail(raw: string) {
  const e = normalizeEmail(raw);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/* ---------------------------------------------
   SIMPLE CARD HELPERS (UX-only, not "validation")
--------------------------------------------- */

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

/**
 * Minimal card brand detection for Mindbody's CardType field.
 * (You can expand later; this is enough for Visa/MC/Amex/Discover.)
 */
function detectCardType(cardNumberDigits: string) {
  const n = onlyDigits(cardNumberDigits);

  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n))
    return "MasterCard";
  if (/^3[47]/.test(n)) return "AmericanExpress";
  if (/^6(011|5)/.test(n) || /^64[4-9]/.test(n)) return "Discover";

  // Safe fallback (Mindbody may still accept if number is valid)
  return "Visa";
}

/* ---------------------------------------------
   UI: SMALL ICONS (NO LIBS)
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

function IconCalendar(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 3v3M17 3v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.5 7.5h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 5.5h11A3 3 0 0 1 20.5 8.5v10A3 3 0 0 1 17.5 21.5h-11A3 3 0 0 1 3.5 18.5v-10A3 3 0 0 1 6.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 12h3M8 16h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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
   PAGE
--------------------------------------------- */

type Step = "select" | "email" | "card" | "confirm" | "booking" | "done";
type CardContext = "create_account" | "add_card" | null;

export default function BookAescapePage() {
  const today = useMemo(() => new Date(), []);

  const [sessionTypeId, setSessionTypeId] = useState<
    (typeof AESCAPE_OPTIONS)[number]["id"]
  >(60);

  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [times, setTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("select");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI only: “recommended times” toggle
  const [showAllTimes, setShowAllTimes] = useState(false);

  // Card/account context
  const [cardContext, setCardContext] = useState<CardContext>(null);
  const [clientId, setClientId] = useState<number | null>(null);

  // Basic identity (required for AddClient; optional for UpdateClient)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  // Card flow flag
  const [cardSaving, setCardSaving] = useState(false);

  // Booking lock to prevent double booking on rapid clicks
  const bookingLock = useRef(false);

  // Uncontrolled card input refs (so card data is never in React state)
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  // Step refs (for mobile scroll anchoring)
  const selectRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const confirmRef = useRef<HTMLDivElement | null>(null);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const doneRef = useRef<HTMLDivElement | null>(null);
  const didMountRef = useRef(false);

  const selectedOption = useMemo(
    () =>
      AESCAPE_OPTIONS.find((o) => o.id === sessionTypeId) ??
      AESCAPE_OPTIONS[1],
    [sessionTypeId]
  );

  function reportPurchaseConversion() {
    if (typeof window === "undefined") return;
  
    // Google Ads conversion (keep this)
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17421817568/T3o8CK-LoukbEOCtr_NA",
      });
    }
  
    // GTM / GA4 visibility
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "aescape_booking_complete",
      session_type: selectedOption.label,
      session_minutes: selectedOption.minutes,
      price: selectedOption.price,
    });
  }

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

  const mindbodyBookingUrl = useMemo(() => {
    const siteId = process.env.NEXT_PUBLIC_MINDBODY_SITE_ID;
    if (!siteId) return null;
    return `https://clients.mindbodyonline.com/classic/ws?studioid=${siteId}&stype=-9`;
  }, []);

  const stepTitle = useMemo(() => {
    if (step === "select") return "Choose your session";
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

  /* ---------------------------------------------
     DISABLE GLOBAL SCROLL-SNAP ON THIS PAGE (mobile fix)
  --------------------------------------------- */

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlSnap = html.style.scrollSnapType;
    const prevBodySnap = body.style.scrollSnapType;

    // Prevent “snapping” into footer/other sections if your site uses scroll-snap globally.
    html.style.scrollSnapType = "none";
    body.style.scrollSnapType = "none";

    return () => {
      html.style.scrollSnapType = prevHtmlSnap;
      body.style.scrollSnapType = prevBodySnap;
    };
  }, []);

  /* ---------------------------------------------
     MOBILE STEP SCROLL (UI ONLY)
  --------------------------------------------- */

  function scrollToStep(ref: React.RefObject<HTMLDivElement | null>) {
    if (!ref.current) return;

    const headerEl = document.querySelector(
      '[data-booking-header="true"]'
    ) as HTMLElement | null;

    const headerH = headerEl?.offsetHeight ?? 0;

    const rect = ref.current.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY;

    // Center the card within the usable viewport (below sticky header)
    const usableHeight = Math.max(0, window.innerHeight - headerH);
    const centerOffset = Math.max(0, (usableHeight - rect.height) / 2);

    const targetY = Math.max(0, absoluteY - headerH - centerOffset);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    // Avoid scrolling on initial mount (only when user advances steps)
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const map: Record<Step, React.RefObject<HTMLDivElement | null>> = {
      select: selectRef,
      email: emailRef,
      card: cardRef,
      confirm: confirmRef,
      booking: bookingRef,
      done: doneRef,
    };

    const target = map[step];

    // Scroll after render/layout settles (and after images/layout have a moment)
    requestAnimationFrame(() => {
      setTimeout(() => scrollToStep(target), 0);
    });
  }, [step]);

  /* ---------------------------------------------
     CARD FIELD CLEARING (important for safety)
  --------------------------------------------- */

  function clearCardRefs() {
    if (cardHolderRef.current) cardHolderRef.current.value = "";
    if (cardNumberRef.current) cardNumberRef.current.value = "";
    if (expMonthRef.current) expMonthRef.current.value = "";
    if (expYearRef.current) expYearRef.current.value = "";
    if (postalCodeRef.current) postalCodeRef.current.value = "";
  }

  // Clear card inputs whenever you leave the card step (back/confirm/etc.)
  useEffect(() => {
    if (step !== "card") {
      clearCardRefs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function getCardPayloadFromRefs() {
    const cardHolder = (cardHolderRef.current?.value || "").trim();
    const cardNumberRaw = cardNumberRef.current?.value || "";
    const cardNumber = onlyDigits(cardNumberRaw);
    const expMonthRaw = (expMonthRef.current?.value || "").trim();
    const expYearRaw = (expYearRef.current?.value || "").trim();
    const postalCode = (postalCodeRef.current?.value || "").trim();

    const expMonth = expMonthRaw.padStart(2, "0"); // Mindbody can be picky
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
    // Force full year UX (e.g. 2028) via dropdown, but keep the same payload fields/format
    if (!expYear || expYear.length < 4)
      return "Please select an expiration year (e.g., 2028).";

      // Expired card check (month-level, year may still be current)
      const now = new Date();
      const expY = Number(expYear);
      const expM = Number(expMonth);

      if (
        expY === now.getFullYear() &&
        expM < now.getMonth() + 1
      ) {
        return "This card appears to be expired.";
      }

    if (!postalCode || postalCode.length < 3)
      return "Please enter a valid ZIP/postal code.";

    return null;
  }

  /* ---------------------------------------------
     FETCH AVAILABILITY
  --------------------------------------------- */

  useEffect(() => {
    setLoading(true);
    setSelectedTime(null);
    setError(null);
    setShowAllTimes(false); // UI-only: reset “recommended” view when day/session changes

    fetch(
      `/api/aescape/availability?sessionTypeId=${sessionTypeId}&date=${selectedDate}`
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
  }, [sessionTypeId, selectedDate]);

  /* ---------------------------------------------
     LOOKUP + BRANCH
  --------------------------------------------- */

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
      client: { Id: number } | null;
      hasCardOnFile: boolean;
    };
  }

  /* ---------------------------------------------
     BOOKING
  --------------------------------------------- */

  async function bookWithConfirmClientId(resolvedClientId: number) {
    if (!selectedTime) {
      setError("Please select a time first.");
      setStep("select");
      return;
    }

    setStep("booking");

    const bookRes = await fetch("/api/mindbody/book-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: resolvedClientId,
        sessionTypeId,
        startDateTime: formatLocalDateTime(selectedTime),
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

  /* ---------------------------------------------
     STEP HANDLERS
  --------------------------------------------- */

  async function handleConfirmBooking() {
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

    try {
      const lookup = await lookupClientByEmail(normalized);

      // CASE B: email exists but no card -> updateclient route
      if (lookup.found && !lookup.hasCardOnFile) {
        setCardContext("add_card");
        setClientId(Number(lookup.client!.Id));
        setStep("card");
        return;
      }

      // CASE A: no account -> addclient route
      if (!lookup.found) {
        setCardContext("create_account");
        setClientId(null);
        setStep("card");
        return;
      }

      // Already has account + card -> go to confirm
      setClientId(Number(lookup.client!.Id));
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

    // Read card values once (uncontrolled -> one-shot)
    const { cardHolder, cardNumber, expMonth, expYear, postalCode, cardType } =
      getCardPayloadFromRefs();

    setCardSaving(true);

    try {
      let resolvedClientId: number | null = null;

      if (cardContext === "create_account") {
        if (!firstName.trim() || !lastName.trim()) {
          throw new Error("Please enter your first and last name.");
        }

        const res = await fetch("/api/mindbody/add-client-with-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalized,
            mobilePhone: mobilePhone.trim() || undefined,
            cardNumber,
            expMonth,
            expYear,
            postalCode,
            cardHolder,
            cardType, // ✅ important for Mindbody reliability
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error ||
              "Unable to create your account. Please double-check your details."
          );
        }

        resolvedClientId = Number(data.clientId);
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
            cardType, // ✅ important for Mindbody reliability
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error || "Unable to save your card. Please try again."
          );
        }

        resolvedClientId = Number(clientId);
      }

      // Clear card fields immediately
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
    } catch (err: any) {
      setError(err.message || "Booking failed. Please try again or call us.");
      setStep("confirm");
    } finally {
      bookingLock.current = false;
    }
  }

  function handleHeaderBack() {
    setError(null);
    if (step === "email") {
      setStep("select");
    } else if (step === "card") {
      setStep("email");
    } else if (step === "confirm") {
      setStep("email");
    }
  }

  /* ---------------------------------------------
     RENDER HELPERS
  --------------------------------------------- */

  const summaryText = useMemo(() => {
    if (!selectedTime) return null;
    return `${selectedOption.label} • ${formatDayLabel(
      new Date(selectedDate + "T00:00:00")
    )} • ${formatTime12h(selectedTime)}`;
  }, [selectedOption.label, selectedDate, selectedTime]);

  const confirmDetails = useMemo(() => {
    if (!selectedTime) return null;
    return {
      session: selectedOption.label,
      price: selectedOption.price,
      minutes: selectedOption.minutes,
      bestFor: selectedOption.bestFor,
      image: selectedOption.image,
      dateLabel: formatDayLabel(new Date(selectedDate + "T00:00:00")),
      timeLabel: formatTime12h(selectedTime),
    };
  }, [selectedOption, selectedDate, selectedTime]);

  const emailNormalized = useMemo(() => normalizeEmail(email), [email]);

  // Exp dropdown options (UI-only; does not change payload format)
  const expMonthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );
  const expYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(currentYear + i));
  }, []);

  /* ---------------------------------------------
     RENDER
  --------------------------------------------- */

  const showHeader = step !== "done";

  const showHeaderBack =
    step === "email" || step === "card" || step === "confirm";

  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance snap-none">
      {/* Sticky top flow header */}
      {showHeader && (
        <div
          data-booking-header="true"
          className="sticky top-0 z-30 border-b border-[#113D33]/10 bg-[#F7F4E9]/95 backdrop-blur"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
            {showHeaderBack ? (
              <button
                type="button"
                onClick={handleHeaderBack}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#113D33] hover:bg-white/60 active:bg-white/80 transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/25"
                aria-label="Go back"
              >
                <span className="text-lg leading-none">←</span>
                <span className="font-semibold">Back</span>
              </button>
            ) : (
              <span className="w-16" />
            )}

            <div className="text-sm md:text-base font-semibold text-[#113D33]">
              {stepTitle}
            </div>

            <span className="w-16" />
          </div>
        </div>
      )}

      <div className="px-4 pt-10 md:pt-16 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header / Hero */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-3">
              Book Your Aescape Robot Massage
            </h1>

            {/* Chips hidden on mobile to save vertical space */}
            <div className="hidden md:flex items-center justify-center gap-3 flex-wrap mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#113D33]/15 bg-white/60 px-4 py-2 text-sm text-[#113D33]/80">
                <IconSpark className="w-4 h-4 text-[#113D33]/70" />
                AI-guided • Personalized pressure
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#113D33]/15 bg-white/60 px-4 py-2 text-sm text-[#113D33]/80">
                <IconLock className="w-4 h-4 text-[#113D33]/70" />
                Calm, secure booking
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#113D33]/15 bg-white/60 px-4 py-2 text-sm text-[#113D33]/80">
                <IconCalendar className="w-4 h-4 text-[#113D33]/70" />
                Reserve in under a minute
              </div>
            </div>

            <p className="text-[#113D33]/80 max-w-2xl mx-auto leading-relaxed">
              Choose your session, pick a time, and we’ll reserve it for you. If
              this is your first booking, Mindbody requires an account and a
              payment method on file for late cancellations or no-shows (you
              won’t be charged today).
            </p>

            {/* Optional: Learn links */}
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <Link
                href="/aescape"
                className="text-[#113D33] underline underline-offset-4 opacity-80 hover:opacity-100"
              >
                Learn about Aescape
              </Link>
              <Link
                href="/blog/aescape"
                className="text-[#113D33] underline underline-offset-4 opacity-80 hover:opacity-100"
              >
                Read the blog
              </Link>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mb-8 md:mb-10 max-w-2xl mx-auto text-left bg-white/70 border border-[#113D33]/15 rounded-2xl p-5">
            <div className="text-sm uppercase tracking-wide opacity-70 mb-1">
              Your selection
            </div>
            <div className="font-semibold text-[#113D33]">
              {summaryText ?? "Select a session and time to continue."}
            </div>
          </div>

          {step === "select" && (
            <div ref={selectRef}>
              {/* SESSION */}
              <section className="mb-12 md:mb-14">
                <h2 className="text-xl font-semibold mb-4">
                  1. Choose Your Session
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {AESCAPE_OPTIONS.map((opt) => {
                    const selected = sessionTypeId === opt.id;
                    const isPopular = opt.id === MOST_POPULAR_ID;

                    const pct = Math.max(
                      22,
                      Math.min(100, (opt.minutes / 60) * 100)
                    );

                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSessionTypeId(opt.id)}
                        className={`relative overflow-hidden rounded-3xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                          selected
                            ? "border-[#113D33] bg-white shadow-lg"
                            : "border-[#113D33]/20 bg-white/60 hover:bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="relative h-44 w-full">
                          <Image
                            src={opt.image}
                            alt={opt.label}
                            fill
                            className="object-cover"
                            priority={opt.id === 60}
                          />
                          <div className="absolute inset-0 bg-black/20" />

                          {isPopular && (
                            <div className="absolute top-4 left-4 bg-white/90 text-[#113D33] text-xs px-3 py-1 rounded-full border border-[#113D33]/15">
                              Most popular
                            </div>
                          )}

                          {selected && (
                            <div className="absolute top-4 right-4 bg-[#113D33] text-white text-xs px-3 py-1 rounded-full">
                              Selected
                            </div>
                          )}
                        </div>

                        <div className="p-5 text-left">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold text-[#113D33]">
                                {opt.label}
                              </div>
                              <div className="text-sm text-[#113D33]/70 mt-1">
                                {opt.bestFor}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm opacity-80">
                                {opt.price}
                              </div>
                              <div className="text-xs text-[#113D33]/60 mt-1">
                                {opt.minutes} min
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="h-1.5 rounded-full bg-[#113D33]/10 overflow-hidden">
                              <div
                                className="h-full bg-[#113D33]/60"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* DAY PICKER */}
              <section className="mb-12 md:mb-14">
                <h2 className="text-xl font-semibold mb-4">2. Choose a Day</h2>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setWeekStart(addDays(weekStart, -7))}
                    className="px-3 py-2 rounded-xl border border-[#113D33]/25 bg-white/70 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    aria-label="Previous week"
                  >
                    ←
                  </button>

                  <div className="flex gap-2 overflow-x-auto py-1 px-1">
                    {weekDays.map((day) => {
                      const iso = formatISO(day);
                      const isToday = isSameDayISO(iso, formatISO(today));
                      const isTomorrow = isSameDayISO(
                        iso,
                        formatISO(addDays(today, 1))
                      );
                      const weekend = isWeekend(day);
                      const selected = iso === selectedDate;

                      const label = isToday
                        ? "Today"
                        : isTomorrow
                        ? "Tomorrow"
                        : formatDayLabel(day);

                      return (
                        <button
                          key={iso}
                          onClick={() => setSelectedDate(iso)}
                          className={`px-4 py-3 rounded-xl whitespace-nowrap transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                            selected
                              ? "bg-[#113D33] text-white"
                              : "border border-[#113D33]/25 bg-white/70 hover:bg-white text-[#113D33]"
                          }`}
                        >
                          <div className="flex flex-col items-center leading-none">
                            <div className="text-sm font-semibold">{label}</div>
                            <div
                              className={`text-[11px] mt-2 ${
                                selected ? "text-white/80" : "text-[#113D33]/60"
                              }`}
                            >
                              {weekend ? "Weekend" : " "}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setWeekStart(addDays(weekStart, 7))}
                    className="px-3 py-2 rounded-xl border border-[#113D33]/25 bg-white/70 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    aria-label="Next week"
                  >
                    →
                  </button>
                </div>
              </section>

              {/* TIMES */}
              <section className="mb-8 md:mb-10 text-left">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-semibold text-center flex-1">
                    3. Choose a Time
                  </h2>

                  {!loading && !error && times.length > 0 && (
                    <button
                      onClick={() => setShowAllTimes((v) => !v)}
                      className="text-sm px-4 py-2 rounded-full border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    >
                      {showAllTimes ? "Show recommended" : "Show all times"}
                    </button>
                  )}
                </div>

                {loading && (
                  <p className="text-center text-[#113D33]/70">Loading…</p>
                )}
                {error && <p className="text-center text-red-700">{error}</p>}

                {!loading &&
                  !error &&
                  Object.entries(groupedTimes).map(
                    ([label, group]) =>
                      group.length > 0 && (
                        <div key={label} className="mb-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm uppercase tracking-wide text-[#113D33]/60 mb-2">
                              {label}
                            </h3>
      
                          </div>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {group.map((time) => (
                              <button
                                key={time.toISOString()}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2.5 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                                  selectedTime?.getTime() === time.getTime()
                                    ? "bg-[#113D33] text-white border-[#113D33]"
                                    : "border-[#113D33]/25 bg-white/60 hover:bg-white text-[#113D33]"
                                }`}
                              >
                                {formatTime12h(time)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                  )}

                {!loading && !error && times.length === 0 && (
                  <div className="text-center text-[#113D33]/70">
                    No times available for this day.
                  </div>
                )}
              </section>

              {/* Primary CTA (now visible on mobile too; no bottom bar) */}
              <div className="max-w-md mx-auto">
                <button
                  disabled={!selectedTime}
                  onClick={() => {
                    setError(null);
                    setStep("email");
                  }}
                  className="w-full py-3.5 rounded-full bg-[#113D33] text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Continue
                </button>

                <div className="mt-5 text-center text-xs text-[#113D33]/60">
                  Prefer to book with staff?{" "}
                  <a
                    className="underline underline-offset-4"
                    href="tel:3034766150"
                  >
                    Call (303) 476-6150
                  </a>
                </div>
              </div>
            </div>
          )}

          {step === "email" && (
            <div
              ref={emailRef}
              className="min-h-[calc(100vh-320px)] flex items-start justify-center"
            >
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
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
                      We only use your email for booking confirmation and account
                      lookup.
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
                    setStep("select");
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "card" && (
            <div
              ref={cardRef}
              className="min-h-[calc(100vh-320px)] flex items-start justify-center"
            >
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
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

                {/* Card fields (uncontrolled) */}
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
                    {/* Month dropdown (UI-only; still read via ref) */}
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

                    {/* Year dropdown (forces full year, e.g. 2028) */}
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

                {/* Trust microcopy (simplified) */}
                <div className="rounded-xl border border-[#113D33]/10 bg-white/60 p-4 mb-4">
                  <div className="flex items-start gap-3 text-sm text-[#113D33]/80">
                    <IconSpark className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <span>We don’t charge today — this only reserves your slot.</span>
                  </div>
                </div>

                {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

                <button
                  onClick={handleSaveCardAndContinue}
                  disabled={cardSaving}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  {cardSaving ? "Saving…" : "Save & continue"}
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
                  Using: <span className="font-semibold">{emailNormalized}</span>
                </p>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div
              ref={confirmRef}
              className="min-h-[calc(100vh-320px)] flex items-start justify-center"
            >
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  Confirm your booking
                </h2>

                {/* Visual summary */}
                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 overflow-hidden mb-4">
                  <div className="relative h-40 w-full">
                    <Image
                      src={confirmDetails?.image || selectedOption.image}
                      alt={confirmDetails?.session || selectedOption.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#113D33]/15 px-3 py-1 text-xs text-[#113D33]">
                        <IconSpark className="w-4 h-4" />
                        You’re almost done
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
                          {confirmDetails?.dateLabel} • {confirmDetails?.timeLabel}
                        </div>
                        <div className="text-sm text-[#113D33]/70 mt-1">
                          {confirmDetails?.bestFor} • {confirmDetails?.minutes} min
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
                  We’ll reserve this appointment under{" "}
                  <span className="font-semibold">{emailNormalized}</span>. No
                  charge today — your card is stored in Mindbody for no-show /
                  late cancellation protection.
                </p>

                {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

                <button
                  onClick={handleFinalConfirmAndBook}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  disabled={bookingLock.current}
                >
                  Confirm & book
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

                {mindbodyBookingUrl && (
                  <a
                    href={mindbodyBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    Manage or book in Mindbody
                  </a>
                )}
              </div>
            </div>
          )}

          {step === "booking" && (
            <div
              ref={bookingRef}
              className="min-h-[calc(100vh-320px)] flex items-start justify-center"
            >
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <p className="text-lg font-semibold text-[#113D33]">
                  Booking your appointment…
                </p>
                <p className="text-sm text-[#113D33]/70 mt-2">
                  Please don’t close this page.
                </p>

                <div className="mt-5 h-2 w-full rounded-full bg-white/60 border border-[#113D33]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#113D33] animate-pulse"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === "done" && (
            <div
              ref={doneRef}
              className="min-h-[calc(100vh-320px)] flex items-start justify-center"
            >
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <h2 className="text-2xl font-bold mb-2 text-[#113D33]">
                  You’re booked!
                </h2>
                <p className="text-[#113D33]/80">
                  Check your email for confirmation. We’ll see you soon.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  {mindbodyBookingUrl && (
                    <a
                      href={mindbodyBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center px-6 py-3 rounded-full bg-[#113D33] text-white font-semibold hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    >
                      Manage booking in Mindbody
                    </a>
                  )}

                  <Link
                    href="/aescape"
                    className="inline-block w-full text-center px-6 py-3 rounded-full border-2 border-[#113D33] text-[#113D33] font-semibold hover:bg-[#113D33] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    What to expect from Aescape
                  </Link>

                  <Link
                    href="/blog/aescape"
                    className="inline-block w-full text-center px-6 py-3 rounded-full border border-[#113D33]/25 bg-white/60 text-[#113D33] font-semibold hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    Read the blog
                  </Link>
                </div>

                <div className="mt-6 text-xs text-[#113D33]/60 text-center">
                  Need anything?{" "}
                  <a
                    className="underline underline-offset-4"
                    href="tel:3034766150"
                  >
                    Call (303) 476-6150
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
