"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import NextAvailableBanner from "../NextAvailableBanner";

/* ---------------------------------------------
   REMEDY ROOM SESSION OPTION (ID 8)
--------------------------------------------- */

const REMEDY_OPTIONS = [
  {
    id: 8,
    label: "The Remedy Room Experience",
    price: "$49",
    image: "/assets/remedy-room3.jpg",
    minutes: 40,
    bestFor: "Cold plunge • Sauna • Recovery lounge",
  },
] as const;

type RemedyOption = (typeof REMEDY_OPTIONS)[number];

/* ---------------------------------------------
   DATE HELPERS
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

/** Format "11:00 AM – 11:30 AM" from a start Date + duration in minutes */
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

function isSameDayISO(isoA: string, isoB: string) {
  return isoA === isoB;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * ✅ TIME PARSING FIX (the tricky part)
 * Mindbody sometimes returns datetimes WITHOUT a timezone offset.
 * JS Date("YYYY-MM-DDTHH:mm:ss") can be interpreted unexpectedly.
 * This forces local parsing when no offset/Z is present.
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
   GENERATE TIMES (from windows)
--------------------------------------------- */

function generateTimesFromWindows(
  windows: { start: string; bookableEnd: string }[]
) {
  const results: Date[] = [];

  windows.forEach((w) => {
    let cursor = parseMindbodyDateTime(w.start);
    const lastStart = parseMindbodyDateTime(w.bookableEnd);

    // Snap UP to the next 10-minute boundary
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

  // Ensure strict chronological order + uniqueness
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

/* ---------------------------------------------
   TIME DISPLAY (curation, but safe fallback)
--------------------------------------------- */

function minutesOf(d: Date) {
  return d.getMinutes();
}

function filterPreferredTimes(all: Date[]) {
  // Prefer :00 / :30 first
  const primary = all.filter((t) => {
    const m = minutesOf(t);
    return m === 0 || m === 30;
  });

  if (primary.length >= 8) return primary;

  // Add :15 / :45
  const secondary = all.filter((t) => {
    const m = minutesOf(t);
    return m === 15 || m === 45;
  });

  const combined = [...primary, ...secondary];

  // If still sparse, show everything
  if (combined.length < 6) return all;

  combined.sort((a, b) => a.getTime() - b.getTime());
  return combined;
}

function withSelectedTimeIncluded(displayTimes: Date[], selectedTime: Date | null) {
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
   SIMPLE CARD HELPERS (same as your page)
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
   UI ICONS (same vibe)
--------------------------------------------- */

function IconLock(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <path d="M12 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconSpark(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 7.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M6.5 5.5h11A3 3 0 0 1 20.5 8.5v10A3 3 0 0 1 17.5 21.5h-11A3 3 0 0 1 3.5 18.5v-10A3 3 0 0 1 6.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
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

/* ─── PROGRESS BAR ─── */

function ProgressBar({ step }: { step: Step }) {
  const displaySteps = ["Service", "Time", "Account", "Confirm"];

  const stepToIdx: Partial<Record<Step, number>> = {
    select: 1,
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

function ImageCarousel({ images }: { images: string[] }) {
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
            alt="Remedy Room"
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    );
  }
  

function RemedySessionCard({ option }: { option: RemedyOption }) {
    return (
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-[#113D33]/15 bg-white/70">
          {/* Image */}

          <div className="relative h-44 w-full">
            <ImageCarousel
                images={[
                "/assets/remedy-room.jpg",
                "/assets/remedy-room2.jpg",
                "/assets/remedy-room3.jpg",
                ]}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />

            {/* Selected badge */}
            <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center rounded-full bg-[#113D33] px-3 py-1 text-xs font-semibold text-white">
                Selected
                </span>
            </div>
            </div>

          {/* Content */}
          <div className="p-5 text-left">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#113D33]">
                  {option.label}
                </h3>
                <p className="text-sm text-[#113D33]/75 mt-1">
                  Cold plunge • Sauna • Recovery lounge
                </p>
              </div>
  
              <div className="text-right shrink-0">
                <div className="text-lg font-semibold text-[#113D33]">
                  {option.price}
                </div>
                <div className="text-xs text-[#113D33]/60">
                  Members $25
                </div>
              </div>
            </div>
  
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-[#113D33]/20 bg-white/60 text-xs text-[#113D33]/80">
                {option.minutes} minutes
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  }

  
export default function BookRemedyRoomPage() {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const [sessionTypeId] = useState<RemedyOption["id"]>(8);

  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [times, setTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("select");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAllTimes, setShowAllTimes] = useState(false);

  const [cardContext, setCardContext] = useState<CardContext>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [cardSaving, setCardSaving] = useState(false);

  const bookingLock = useRef(false);

  // "For someone else" state
  const [forSomeoneElse, setForSomeoneElse] = useState(false);
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isSurprise, setIsSurprise] = useState(false);

  // Notification preferences
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  // Remedy room occupancy (booked count per time slot)
  const REMEDY_MAX_CAPACITY = 3;
  const [slotOccupancy, setSlotOccupancy] = useState<Record<string, number>>({});

  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  const selectRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const confirmRef = useRef<HTMLDivElement | null>(null);
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const doneRef = useRef<HTMLDivElement | null>(null);
  const didMountRef = useRef(false);

  const selectedOption = useMemo(
    () => REMEDY_OPTIONS[0],
    []
  );

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const displayedTimes = useMemo(() => {
    const base = showAllTimes ? times : filterPreferredTimes(times);
    return withSelectedTimeIncluded(base, selectedTime);
  }, [showAllTimes, times, selectedTime]);

  const groupedTimes = useMemo(() => groupTimes(displayedTimes), [displayedTimes]);

  const mindbodyBookingUrl = useMemo(() => {
    const siteId = process.env.NEXT_PUBLIC_MINDBODY_SITE_ID;
    if (!siteId) return null;
    return `https://clients.mindbodyonline.com/classic/ws?studioid=${siteId}&stype=-9`;
  }, []);

  const stepTitle = useMemo(() => {
    if (step === "select") return "Choose your time";
    if (step === "email") return "Enter your email";
    if (step === "card") {
      return cardContext === "create_account" ? "Create your account" : "Payment details";
    }
    if (step === "confirm") return "Review and confirm";
    if (step === "booking") return "Booking your appointment";
    return "";
  }, [step, cardContext]);

  /* Disable scroll snap (same as your page) */
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

  /* Scroll to top when step changes (keeps UI centered like massage/facial flow) */
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
  }

  useEffect(() => {
    if (step !== "card") clearCardRefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

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
    if (!cardNumber || cardNumber.length < 12) return "Please enter a valid card number.";
    if (!luhnCheck(cardNumber)) return "Card number looks invalid. Please double-check.";
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

  /* ---------------------------------------------
     FETCH AVAILABILITY
  --------------------------------------------- */

  useEffect(() => {
    setLoading(true);
    setSelectedTime(null);
    setError(null);
    setShowAllTimes(false);

    fetch(
      `/api/remedy-room/availability?sessionTypeId=${sessionTypeId}&date=${selectedDate}`
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

  // Fetch booked appointments for the remedy room to compute occupancy
  useEffect(() => {
    setSlotOccupancy({});

    fetch(
      `/api/service/staff-schedule?staffId=100000014&date=${selectedDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.appointments)) return;

        // Count how many appointments overlap each 10-minute slot
        const counts: Record<string, number> = {};
        for (const appt of data.appointments) {
          // Normalize to HH:mm key
          const start = appt.start as string; // e.g. "2026-02-18T11:00:00"
          const timeKey = start.split("T")[1]?.substring(0, 5); // "11:00"
          if (timeKey) {
            counts[timeKey] = (counts[timeKey] || 0) + 1;
          }
        }
        setSlotOccupancy(counts);
      })
      .catch(() => setSlotOccupancy({}));
  }, [selectedDate]);

  /* ---------------------------------------------
     LOOKUP + BRANCH
  --------------------------------------------- */

  async function lookupClientByEmail(emailToCheck: string) {
    const res = await fetch(
      `/api/mindbody/client-lookup?email=${encodeURIComponent(emailToCheck)}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Client lookup failed.");
    return data as {
      found: boolean;
      client: { Id: string } | null;
      hasCardOnFile: boolean;
    };
  }

  /* ---------------------------------------------
     BOOKING
  --------------------------------------------- */

  async function bookWithConfirmClientId(resolvedClientId: string) {
    if (!selectedTime) {
      setError("Please select a time first.");
      setStep("select");
      return;
    }

    setStep("booking");

    /* Build guest notes if booking for someone else */
    let guestNotes: string | undefined;
    if (forSomeoneElse && guestFirstName.trim() && guestPhone.trim()) {
      const guestName = `${guestFirstName.trim()} ${guestLastName.trim()}`.trim();
      const parts = [`BOOKING FOR: ${guestName}`, `Phone: ${guestPhone.trim()}`];
      if (guestEmail.trim()) parts.push(`Email: ${guestEmail.trim()}`);
      if (isSurprise) parts.push("⚠️ SURPRISE — do not contact guest");
      guestNotes = parts.join(" | ");
    }

    const bookRes = await fetch("/api/mindbody/book-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: resolvedClientId,
        sessionTypeId,
        startDateTime: formatLocalDateTime(selectedTime),
        ...(guestNotes ? { notes: guestNotes } : {}),
      }),
    });

    const bookData = await bookRes.json();

    if (!bookRes.ok) {
      throw new Error(bookData?.error || "Booking failed. Please try again or call us.");
    }

    setStep("done");
  }

  /* ---------------------------------------------
     FUNNEL TRACKING
  --------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];

    const eventMap: Record<string, string> = {
      select: "booking_start",
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
      booking_flow: "remedy_room",
    };

    if (step === "email" && selectedTime) {
      payload.booking_date = selectedDate;
      payload.booking_time = selectedTime;
    }
    if (step === "card") {
      payload.client_type = cardContext === "create_account" ? "new" : "returning";
    }
    if (step === "done") {
      payload.service_name = "Remedy Room";
      payload.total_price = 49;
    }

    window.dataLayer.push(payload);
  }, [step]);

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
        if (!resolvedClientId) throw new Error("Account created, but client ID missing.");
      }

      if (cardContext === "add_card") {
        if (!clientId) throw new Error("Missing client ID for card update.");

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
          throw new Error(data?.error || "Unable to save your card. Please try again.");
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

      // Non-blocking: ensure existing clients have email notifications enabled
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
    if (step === "select") {
      router.push("/locations/denver-larimer/book");
      return;
    }
    if (step === "email") setStep("select");
    else if (step === "card") setStep("email");
    else if (step === "confirm") setStep("email");
  }

  const summaryText = useMemo(() => {
    if (!selectedTime) return null;
    return `${selectedOption.label} • ${formatDayLabel(
      new Date(selectedDate + "T00:00:00")
    )} • ${formatTimeRange(selectedTime, selectedOption.minutes)}`;
  }, [selectedOption.label, selectedOption.minutes, selectedDate, selectedTime]);

  const confirmDetails = useMemo(() => {
    if (!selectedTime) return null;
    return {
      session: selectedOption.label,
      price: selectedOption.price,
      minutes: selectedOption.minutes,
      bestFor: selectedOption.bestFor,
      image: selectedOption.image,
      dateLabel: formatDayLabel(new Date(selectedDate + "T00:00:00")),
      timeLabel: formatTimeRange(selectedTime, selectedOption.minutes),
    };
  }, [selectedOption, selectedDate, selectedTime]);

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
  const showHeaderBack = step === "select" || step === "email" || step === "card" || step === "confirm";

  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance snap-none">
      {showHeader && (
        <div
          data-booking-header="true"
          className="sticky top-[56px] z-30 border-b border-[#113D33]/10 bg-[#F7F4E9]/95 backdrop-blur-md"
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              {showHeaderBack ? (
                <button
                  type="button"
                  onClick={handleHeaderBack}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-[#113D33] hover:bg-[#113D33]/5 active:bg-[#113D33]/10 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#113D33]/25"
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
              <div className="text-sm font-semibold text-[#113D33]">
                {stepTitle}
              </div>
              <span className="w-16" />
            </div>
            <ProgressBar step={step} />
          </div>
        </div>
      )}

      <div className="px-4 pt-24 md:pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero + session card + summary — only on select step */}
          {step === "select" && (
            <>
              <div className="mb-8 md:mb-10">
                <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-3">
                  Book the Remedy Room
                </h1>

                <div className="hidden md:flex items-center justify-center gap-3 flex-wrap mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#113D33]/15 bg-white/60 px-4 py-2 text-sm text-[#113D33]/80">
                    <IconSpark className="w-4 h-4 text-[#113D33]/70" />
                    Cold plunge • Sauna recovery
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#113D33]/15 bg-white/60 px-4 py-2 text-sm text-[#113D33]/80">
                    <IconSpark className="w-4 h-4 text-[#113D33]/70" />
                    LED Light Therapy
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#113D33]/15 bg-white/60 px-4 py-2 text-sm text-[#113D33]/80">
                    <IconSpark className="w-4 h-4 text-[#113D33]/70" />
                    Lymphatic Compression
                  </div>
                </div>

                <p className="text-[#113D33]/80 max-w-2xl mx-auto leading-relaxed">
                  Step into the Remedy Room and experience science-backed recovery. Swimsuit or athleisure required. Sessions are shared with up to three guests. Private sessions are available upon request, please call to book.
                </p>

                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <Link
                    href="/remedy-tech"
                    className="text-[#113D33] underline underline-offset-4 opacity-80 hover:opacity-100"
                  >
                    Learn about the Remedy Room
                  </Link>
                  <Link
                    href="/offers"
                    className="text-[#113D33] underline underline-offset-4 opacity-80 hover:opacity-100"
                  >
                    View offers
                  </Link>
                </div>
              </div>

              <RemedySessionCard option={selectedOption} />

              <div className="mb-8 md:mb-10 max-w-2xl mx-auto text-left bg-white/70 border border-[#113D33]/15 rounded-2xl p-5">
                <div className="text-sm uppercase tracking-wide opacity-70 mb-1">
                  Your selection
                </div>
                <div className="font-semibold text-[#113D33]">
                  {summaryText ?? "Select a day and time to continue."}
                </div>
              </div>
            </>
          )}

          {step === "select" && (
            <div ref={selectRef}>
              {/* Day picker */}
              <section className="mb-12 md:mb-14">
                <h2 className="text-xl font-semibold mb-4">1. Choose a Day</h2>

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
                      const isTomorrow = isSameDayISO(iso, formatISO(addDays(today, 1)));
                      const weekend = isWeekend(day);
                      const selected = iso === selectedDate;

                      const label = isToday ? "Today" : isTomorrow ? "Tomorrow" : formatDayLabel(day);

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

              {/* Times */}
              <section className="mb-8 md:mb-10 text-left">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="text-xl font-semibold text-center flex-1">
                    2. Choose a Time
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

                {loading && <p className="text-center text-[#113D33]/70">Loading…</p>}
                {error && <p className="text-center text-red-700">{error}</p>}

                {!loading &&
                  !error &&
                  Object.entries(groupedTimes).map(
                    ([label, group]) =>
                      group.length > 0 && (
                        <div key={label} className="mb-6">
                          <h3 className="text-sm uppercase tracking-wide text-[#113D33]/60 mb-2">
                            {label}
                          </h3>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {group.map((time) => {
                              const isSelected = selectedTime?.getTime() === time.getTime();
                              const timeKey = `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`;
                              const booked = slotOccupancy[timeKey] || 0;
                              const spotsLeft = REMEDY_MAX_CAPACITY - booked;

                              return (
                                <button
                                  key={time.toISOString()}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-2.5 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                                    isSelected
                                      ? "bg-[#113D33] text-white border-[#113D33]"
                                      : "border-[#113D33]/25 bg-white/60 hover:bg-white text-[#113D33]"
                                  }`}
                                >
                                  <div className="font-semibold text-sm">
                                    {formatTime12h(time)}
                                  </div>
                                  {booked > 0 && (
                                    <div
                                      className={`text-[10px] mt-0.5 ${
                                        isSelected
                                          ? spotsLeft === 1
                                            ? "text-amber-200"
                                            : "text-white/60"
                                          : spotsLeft === 1
                                            ? "text-amber-600"
                                            : "text-[#113D33]/40"
                                      }`}
                                    >
                                      {spotsLeft === 1
                                        ? "1 spot left"
                                        : `${booked}/${REMEDY_MAX_CAPACITY} booked`}
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )
                  )}

                {!loading && !error && times.length === 0 && (
                  <div className="text-center text-[#113D33]/70">
                    <p>No times available for this day.</p>
                    <NextAvailableBanner
                      type="remedy"
                      sessionTypeId={8}
                      currentDate={selectedDate}
                      onJumpToDate={(iso) => {
                        const [y, m, d] = iso.split("-").map(Number);
                        const target = new Date(y, m - 1, d);
                        setSelectedDate(iso);
                        setWeekStart(target);
                      }}
                    />
                  </div>
                )}
              </section>

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
                  <a className="underline underline-offset-4" href="tel:3034766150">
                    Call (303) 476-6150
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* EMAIL */}
          {step === "email" && (
            <div ref={emailRef} className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">Enter your email to reserve</h2>
                <p className="text-sm text-[#113D33]/75 mb-4 text-center">
                  This helps us find (or create) your Mindbody account.
                </p>

                <div className="rounded-xl border border-[#113D33]/15 bg-white/70 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <IconLock className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <p className="text-sm text-[#113D33]/80 leading-relaxed">
                      We only use your email for booking confirmation and account lookup.
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

          {/* CARD */}
          {step === "card" && (
            <div ref={cardRef} className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">
                  {cardContext === "create_account" ? "Create your account" : "Add a card to your account"}
                </h2>

                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 p-4 mb-5">
                  <div className="flex items-start gap-3">
                    <IconLock className="w-5 h-5 text-[#113D33]/70 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#113D33]/80 leading-relaxed">
                        No charge today — your card is only used to{" "}
                        <span className="font-semibold">hold the reservation</span> for late cancellation or no-show protection.
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
                    <span>We don’t charge today — this only reserves your slot.</span>
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

          {/* CONFIRM */}
          {step === "confirm" && (
            <div ref={confirmRef} className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-2 text-center">Confirm your booking</h2>

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
                    <div className="text-sm uppercase tracking-wide opacity-70 mb-2">Summary</div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-[#113D33]">{confirmDetails?.session}</div>
                        <div className="text-sm text-[#113D33]/80 mt-1">
                          {confirmDetails?.dateLabel} • {confirmDetails?.timeLabel}
                        </div>
                        <div className="text-sm text-[#113D33]/70 mt-1">
                          {confirmDetails?.bestFor} • {confirmDetails?.minutes} min
                        </div>
                      </div>
                      <div className="text-right text-[#113D33]">
                        <div className="text-sm font-semibold">$49</div>
                        <div className="text-xs opacity-70">Members $25</div>
                        </div>

                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#113D33]/80 leading-relaxed mb-4">
                  We’ll reserve this appointment under{" "}
                  <span className="font-semibold">{emailNormalized}</span>. No charge today — your
                  card is stored in Mindbody for no-show / late cancellation protection.
                </p>

                {/* ── For someone else ───────────── */}
                <div className="border-t border-[#113D33]/10 pt-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={forSomeoneElse}
                      onChange={(e) => {
                        setForSomeoneElse(e.target.checked);
                        if (!e.target.checked) {
                          setGuestFirstName("");
                          setGuestLastName("");
                          setGuestEmail("");
                          setGuestPhone("");
                          setIsSurprise(false);
                        }
                      }}
                      className="w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30"
                    />
                    <span className="text-sm text-[#113D33]/70">
                      This booking is for someone else
                    </span>
                  </label>

                  {forSomeoneElse && (
                    <div className="mt-3 space-y-2.5 animate-fade-in">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Guest first name *"
                          value={guestFirstName}
                          onChange={(e) => setGuestFirstName(e.target.value)}
                          className="rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                        />
                        <input
                          type="text"
                          placeholder="Guest last name"
                          value={guestLastName}
                          onChange={(e) => setGuestLastName(e.target.value)}
                          className="rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                        />
                      </div>
                      <input
                        type="tel"
                        placeholder="Guest phone *"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                      />
                      <input
                        type="email"
                        placeholder="Guest email (optional)"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#113D33]/20 bg-white px-3 py-2.5 text-sm text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSurprise}
                          onChange={(e) => setIsSurprise(e.target.checked)}
                          className="w-4 h-4 rounded border-[#113D33]/30 text-[#113D33] focus:ring-[#113D33]/30"
                        />
                        <span className="text-xs text-[#113D33]/60">
                          This is a surprise — don&apos;t contact the guest
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

                <button
                  onClick={handleFinalConfirmAndBook}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  disabled={bookingLock.current || (forSomeoneElse && (!guestFirstName.trim() || !guestPhone.trim()))}
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

          {/* BOOKING */}
          {step === "booking" && (
            <div ref={bookingRef} className="min-h-[calc(100vh-320px)] flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left animate-fade-in">
                <p className="text-lg font-semibold text-[#113D33]">Booking your appointment…</p>
                <p className="text-sm text-[#113D33]/70 mt-2">Please don’t close this page.</p>

                <div className="mt-5 h-2 w-full rounded-full bg-white/60 border border-[#113D33]/10 overflow-hidden">
                  <div className="h-full bg-[#113D33] animate-pulse" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <div ref={doneRef} className="max-w-md mx-auto pt-20 pb-12">
              {/* Success checkmark */}
              <div className="animate-check-pop mb-6">
                <div className="w-16 h-16 rounded-full bg-[#113D33] mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#113D33] mb-2 animate-fade-in-up">
                You&apos;re booked!
              </h2>

              {selectedTime && (
                <p className="text-[#113D33]/70 mb-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                  {selectedOption.label}
                </p>
              )}

              {selectedTime && (
                <p className="text-[#113D33]/50 text-sm mb-1 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                  {formatDayLabel(new Date(selectedDate + "T00:00:00"))} · {formatTimeRange(selectedTime, selectedOption.minutes)}
                </p>
              )}

              <p className="text-[#113D33]/50 text-sm mt-4 mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Please remember to bring a swimsuit or athleisure. Check your email for confirmation.
              </p>

              {/* Cross-sell */}
              <div className="space-y-3 mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#113D33]/40">
                  Complete your visit
                </p>
                <Link
                  href="/locations/denver-larimer/book-service"
                  className="block w-full text-center rounded-full border-2 border-[#113D33] text-[#113D33] py-3 text-base font-semibold hover:bg-[#113D33] hover:text-white active:scale-[0.98] transition-all duration-200"
                >
                  Book a Massage or Facial
                </Link>
                <Link
                  href="/locations/denver-larimer/book-aescape"
                  className="block w-full text-center rounded-full border-2 border-[#113D33] text-[#113D33] py-3 text-base font-semibold hover:bg-[#113D33] hover:text-white active:scale-[0.98] transition-all duration-200"
                >
                  Book Aescape Robot Massage
                </Link>
              </div>

              <Link
                href="/locations/denver-larimer"
                className="text-sm text-[#113D33]/50 hover:text-[#113D33] underline underline-offset-4 transition-colors"
              >
                Done — back to Sway Larimer
              </Link>

              <div className="mt-6">
                <a
                  href="tel:3034766150"
                  className="text-sm text-[#113D33]/40 hover:text-[#113D33] underline underline-offset-4 transition-colors"
                >
                  Questions? (303) 476-6150
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
