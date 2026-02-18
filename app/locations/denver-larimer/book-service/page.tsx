"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getClosingHour } from "@/lib/locationHours";
import NextAvailableBanner from "../NextAvailableBanner";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type Category = "massage" | "facial";

type Service = {
  id: number;
  category: Category;
  name: string;
  subtitle?: string;
  minutes: number;
  price: string;
  memberPrice: number;
  dropInPrice: number;
  image: string;
  description: string;
};

type BoostType = "time_extension" | "add_on";

type Boost = {
  id: number;
  category: Category;
  name: string;
  tag: "Super Boost" | "Boost";
  type: BoostType;
  minutesAdded: number;
  price: string;
  memberPrice: number;
  dropInPrice: number;
  description: string;
  detail?: string;
};

type DisplaySlot = {
  startDateTime: string;
  staffId: number;
  staffName: string;
};

type Step =
  | "category"
  | "service"
  | "boosts"
  | "time"
  | "email"
  | "card"
  | "confirm"
  | "booking"
  | "done";

type CardContext = "create_account" | "add_card" | null;

/* ─────────────────────────────────────────────
   SERVICE CATALOG
───────────────────────────────────────────── */

const MASSAGES: Service[] = [
  {
    id: 16,
    category: "massage",
    name: "Basic Massage",
    minutes: 50,
    price: "Member $89 | Drop-In $129",
    memberPrice: 89,
    dropInPrice: 129,
    image: "/assets/massage7.jpg",
    description:
      "A relaxing Swedish-style massage to ease tension and promote overall well-being.",
  },
  {
    id: 7,
    category: "massage",
    name: "Deep Tissue",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/massage2.jpg",
    description:
      "Corrective massage designed to release deep muscle tension, relieve pain, and restore mobility.",
  },
  {
    id: 14,
    category: "massage",
    name: "Salt Stone",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/massage4.jpg",
    description:
      "Warm Himalayan salt stones help melt tension, improve circulation, and promote deep relaxation.",
  },
  {
    id: 13,
    category: "massage",
    name: "CBD CauseMedic",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/massage3.jpg",
    description:
      "CBD-infused relief cream provides cooling comfort while supporting muscle recovery and relaxation.",
  },
  {
    id: 15,
    category: "massage",
    name: "Sports Massage",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/massage5.jpg",
    description:
      "Ideal for active lifestyles. Supports recovery, improves range of motion, and reduces muscle fatigue.",
  },
  {
    id: 49,
    category: "massage",
    name: "Lymphatic Drainage Detox",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/massage6.jpg",
    description:
      "Gentle rhythmic techniques stimulate lymph flow, reduce swelling, and support natural detoxification.",
  },
];

const FACIALS: Service[] = [
  {
    id: 12,
    category: "facial",
    name: "Basic Facial",
    minutes: 50,
    price: "Member $89 | Drop-In $129",
    memberPrice: 89,
    dropInPrice: 129,
    image: "/assets/facial1.jpg",
    description:
      "A classic facial customized to your skin type — cleanse, exfoliate, extract, and hydrate.",
  },
  {
    id: 5,
    category: "facial",
    name: "Forever Young",
    subtitle: "Anti-Aging Facial",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/facial2.jpg",
    description:
      "Hydrates, brightens, and tightens the skin while supporting collagen production and circulation.",
  },
  {
    id: 6,
    category: "facial",
    name: "Glow Getter",
    subtitle: "Hydration Facial",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/facial3.jpg",
    description:
      "Correcting peptides and antioxidants instantly smooth and firm for radiant, hydrated skin.",
  },
  {
    id: 9,
    category: "facial",
    name: "Pore Perfection",
    subtitle: "Acne Facial",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/facial4.jpg",
    description:
      "Targets congestion, bacteria, and inflammation for clearer, healthier skin.",
  },
  {
    id: 10,
    category: "facial",
    name: "Sensitive Silk",
    subtitle: "Soothing Facial",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/facial5.jpg",
    description:
      "Calms redness, strengthens the skin barrier, and supports sensitive skin types.",
  },
  {
    id: 11,
    category: "facial",
    name: "Dr. Dennis Gross Vitamin C",
    subtitle: "Sway Spotlight Facial",
    minutes: 50,
    price: "Member $99 | Drop-In $139",
    memberPrice: 99,
    dropInPrice: 139,
    image: "/assets/facial6.jpg",
    description:
      "A brightening facial powered by Vitamin C to improve tone, clarity, and radiance.",
  },
];

/* ─────────────────────────────────────────────
   BOOST CATALOG
───────────────────────────────────────────── */

const MASSAGE_BOOSTS: Boost[] = [
  {
    id: 28,
    category: "massage",
    name: "Make it 80 Minutes",
    tag: "Super Boost",
    type: "time_extension",
    minutesAdded: 30,
    price: "Member $50 | Drop-In $100",
    memberPrice: 50,
    dropInPrice: 100,
    description: "Add 30 minutes of focused massage time.",
  },
  {
    id: 25,
    category: "massage",
    name: "Infrared PEMF Mat",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "Deep recovery + better sleep.",
  },
  {
    id: 26,
    category: "massage",
    name: "Cupping",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "Release tension + boost circulation.",
  },
];

const FACIAL_BOOSTS: Boost[] = [
  {
    id: 19,
    category: "facial",
    name: "Microcurrent Full",
    tag: "Super Boost",
    type: "time_extension",
    minutesAdded: 30,
    price: "Member $50 | Drop-In $100",
    memberPrice: 50,
    dropInPrice: 100,
    description: "A workout for your face — non-invasive lift and sculpt.",
    detail: "While traditional facials target improving the skin, microcurrent goes deeper, targeting the facial muscles beneath your skin for a non-invasive lift. Microcurrent technology works at the cellular level to actively re-educate muscles, smooth fine lines, boost collagen, reduce puffiness, and restore your skin\u2019s natural energy for real, visible results.",
  },
  {
    id: 18,
    category: "facial",
    name: "Microcurrent Mini",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "Target one area — eyes, jawline, or forehead.",
    detail: "This boost targets one area specifically to tone and lift. Choose from eye area, jawline, or forehead for focused microcurrent results.",
  },
  {
    id: 20,
    category: "facial",
    name: "LED Light Therapy Full",
    tag: "Super Boost",
    type: "time_extension",
    minutesAdded: 30,
    price: "Member $50 | Drop-In $100",
    memberPrice: 50,
    dropInPrice: 100,
    description: "Soothing light therapy for smoother, firmer skin.",
    detail: "This soothing, non-invasive technology supports cellular activity to help skin appear smoother, firmer, and more radiant. Red light works beneath the surface to soften the look of fine lines, improve tone and texture, and boost the effectiveness of your professional skincare products. With no downtime, this science-backed boost helps calm, restore, and elevate your results for a healthier-looking glow.",
  },
  {
    id: 31,
    category: "facial",
    name: "LED Light Therapy Mini",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "A targeted 10-minute LED session integrated into your facial.",
    detail: "A targeted 10-minute LED session seamlessly integrated into your facial to support cellular activity, enhance product performance, and boost visible results in tone, texture, and overall radiance.",
  },
  {
    id: 21,
    category: "facial",
    name: "Hydraderm",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "DiamondTone microdermabrasion for a brighter complexion.",
    detail: "Advanced technology meets expert skincare with our DiamondTone Microdermabrasion. This results-driven treatment gently resurfaces the skin to reveal a smoother, brighter, more youthful-looking complexion. Deeply penetrating serums help improve the look of fine lines and wrinkles, refine pores, soften the appearance of scarring, and promote a more even tone by reducing discoloration and hyperpigmentation.",
  },
  {
    id: 22,
    category: "facial",
    name: "Dermaflash",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "Sonic exfoliation for instantly smoother, brighter skin.",
    detail: "Award-winning sonic technology gently and safely exfoliates away dead skin cells while removing peach fuzz to instantly reveal smoother, brighter, more radiant skin. This treatment enhances product absorption and creates a soft, flawless finish with no downtime.",
  },
  {
    id: 17,
    category: "facial",
    name: "Peel",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "Refines pores, evens tone, and stimulates collagen.",
    detail: "Facial peels refine pores, even skin tone and can dramatically stimulate collagen production. Peels reduce the appearance of fine lines, sun damage, scars, and blemishes. Rapid exfoliation smoothes the upper layer of skin sending a signal to make new skin cells.",
  },
  {
    id: 24,
    category: "facial",
    name: "Oxygen Infusion",
    tag: "Boost",
    type: "add_on",
    minutesAdded: 0,
    price: "Member $30 | Drop-In $60",
    memberPrice: 30,
    dropInPrice: 60,
    description: "Cooling oxygen to boost hydration and serum absorption.",
    detail: "Cooling, calming oxygen infused onto the skin to aid in the absorption of serums and naturally improve skin hydration levels. This technology is used with 98% pure oxygen to ensure the deep penetration of active ingredients. Breathe life back into your skin.",
  },
];

/* ─────────────────────────────────────────────
   DATE HELPERS
───────────────────────────────────────────── */

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

function formatTime12h(raw: string) {
  const d = parseMindbodyDateTime(raw);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Format "11:00 AM – 11:50 AM" from a start datetime string + duration in minutes */
function formatTimeRange(raw: string, minutes: number) {
  const start = parseMindbodyDateTime(raw);
  const end = new Date(start.getTime() + minutes * 60_000);
  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${fmt(start)} – ${fmt(end)}`;
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

/* ─────────────────────────────────────────────
   GROUP SLOTS BY TIME OF DAY
───────────────────────────────────────────── */

function groupSlots(slots: DisplaySlot[]) {
  const groups: Record<string, DisplaySlot[]> = {
    Morning: [],
    Midday: [],
    Afternoon: [],
    Evening: [],
  };

  slots.forEach((s) => {
    const h = parseMindbodyDateTime(s.startDateTime).getHours();
    if (h < 12) groups.Morning.push(s);
    else if (h < 14) groups.Midday.push(s);
    else if (h < 17) groups.Afternoon.push(s);
    else groups.Evening.push(s);
  });

  return groups;
}

/* ─────────────────────────────────────────────
   EMAIL HELPERS
───────────────────────────────────────────── */

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(raw));
}

/* ─────────────────────────────────────────────
   CARD HELPERS
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   ICONS (no libraries)
───────────────────────────────────────────── */

function IconLock(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v6A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-6A2.5 2.5 0 0 1 6.5 10Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */

function ProgressBar({ step }: { step: Step }) {
  const displaySteps = ["Type", "Service", "Boosts", "Time", "Account", "Confirm"];

  // Map step → display index
  const stepToIdx: Partial<Record<Step, number>> = {
    category: 0,
    service: 1,
    boosts: 2,
    time: 3,
    email: 4,
    card: 4,
    confirm: 5,
  };

  // Don't show on booking or done
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

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function BookServicePageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F4E9] flex items-center justify-center font-vance text-[#113D33]/60">
          Loading…
        </div>
      }
    >
      <BookServicePage />
    </Suspense>
  );
}

function BookServicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  /* ── Core state ────────────────────────────── */

  const initialCategory = (searchParams.get("category") as Category) || null;

  // If no category param, redirect to the booking hub
  useEffect(() => {
    if (!initialCategory) {
      router.replace("/locations/denver-larimer/book");
    }
  }, [initialCategory, router]);

  const [category, setCategory] = useState<Category | null>(
    initialCategory === "massage" || initialCategory === "facial"
      ? initialCategory
      : null
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBoosts, setSelectedBoosts] = useState<Boost[]>([]);
  const [expandedBoostId, setExpandedBoostId] = useState<number | null>(null);

  const [step, setStep] = useState<Step>(
    initialCategory ? "service" : "service"
  );

  /* ── Time / therapist state ────────────────── */

  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [slots, setSlots] = useState<DisplaySlot[]>([]);
  const [filteredTherapist, setFilteredTherapist] = useState<number | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<DisplaySlot | null>(null);

  // Full staff list for this service type (fetched once via 7-day window)
  const [allTherapists, setAllTherapists] = useState<
    { id: number; name: string }[]
  >([]);

  /* ── Client state ──────────────────────────── */

  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState<string | null>(null);
  const [cardContext, setCardContext] = useState<CardContext>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  /* ── UI state ──────────────────────────────── */

  const [loading, setLoading] = useState(false);
  const [cardSaving, setCardSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boostWarning, setBoostWarning] = useState<string | null>(null);

  /* ── Refs ───────────────────────────────────── */

  const bookingLock = useRef(false);

  /* ── "For someone else" state ────────────── */
  const [forSomeoneElse, setForSomeoneElse] = useState(false);
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isSurprise, setIsSurprise] = useState(false);

  /* ── Notification preferences ────────────── */
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  /* ── Derived data ──────────────────────────── */

  const services = category === "massage" ? MASSAGES : category === "facial" ? FACIALS : [];
  const boostsForCategory =
    category === "massage"
      ? MASSAGE_BOOSTS
      : category === "facial"
        ? FACIAL_BOOSTS
        : [];

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  // Extract unique therapists from slots
  const therapists = useMemo(() => {
    const map = new Map<number, string>();
    slots.forEach((s) => {
      if (s.staffId && s.staffName && !map.has(s.staffId)) {
        map.set(s.staffId, s.staffName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [slots]);

  // Total extra minutes needed for time-extension boosts
  const totalExtMinutes = useMemo(
    () =>
      selectedBoosts
        .filter((b) => b.type === "time_extension")
        .reduce((sum, b) => sum + b.minutesAdded, 0),
    [selectedBoosts]
  );

  // Fetch staff schedules when slots load so we can filter out times
  // where extensions won't fit
  const [staffSchedules, setStaffSchedules] = useState<
    Record<number, { start: string; end: string }[]>
  >({});
  const [schedulesLoading, setSchedulesLoading] = useState(false);

  useEffect(() => {
    if (!slots.length || !selectedService) {
      setStaffSchedules({});
      setSchedulesLoading(false);
      return;
    }

    // Get unique staff IDs from slots
    const staffIds = [...new Set(slots.map((s) => s.staffId).filter(Boolean))];
    if (staffIds.length === 0) {
      setSchedulesLoading(false);
      return;
    }

    setSchedulesLoading(true);
    const dateStr = selectedDate;

    // Fetch schedule for each staff in parallel
    Promise.all(
      staffIds.map((sid) =>
        fetch(`/api/service/staff-schedule?staffId=${sid}&date=${dateStr}`)
          .then((res) => res.json())
          .then((data) => ({
            staffId: sid,
            appointments: Array.isArray(data.appointments)
              ? data.appointments
              : [],
          }))
          .catch(() => ({ staffId: sid, appointments: [] }))
      )
    ).then((results) => {
      const map: Record<number, { start: string; end: string }[]> = {};
      for (const r of results) {
        map[r.staffId] = r.appointments;
      }
      setStaffSchedules(map);
      setSchedulesLoading(false);
    });
  }, [slots, selectedDate, selectedService]);

  // Compute last available slot per staff member (= shift end boundary)
  const staffLastSlot = useMemo(() => {
    const map: Record<number, Date> = {};
    for (const s of slots) {
      const t = parseMindbodyDateTime(s.startDateTime);
      if (!map[s.staffId] || t > map[s.staffId]) {
        map[s.staffId] = t;
      }
    }
    return map;
  }, [slots]);

  // Filter slots: hide times where time-extension boosts won't fit
  const filteredSlots = useMemo(() => {
    if (totalExtMinutes === 0 || !selectedService) return slots;

    return slots.filter((slot) => {
      const slotStart = parseMindbodyDateTime(slot.startDateTime);

      const serviceEnd = new Date(slotStart);
      serviceEnd.setMinutes(serviceEnd.getMinutes() + selectedService.minutes);

      const extensionsEnd = new Date(serviceEnd);
      extensionsEnd.setMinutes(extensionsEnd.getMinutes() + totalExtMinutes);

      // Don't allow if extensions would run past closing time
      const closingHour = getClosingHour("denver-larimer", slotStart.getDay());
      const closing = new Date(slotStart);
      closing.setHours(closingHour, 0, 0, 0);
      if (extensionsEnd > closing) return false;

      // Don't allow if extensions would run past this therapist's shift end
      // (shift end = their last available slot + service duration)
      const lastSlot = staffLastSlot[slot.staffId];
      if (lastSlot) {
        const shiftEnd = new Date(lastSlot);
        shiftEnd.setMinutes(shiftEnd.getMinutes() + selectedService.minutes);
        if (extensionsEnd > shiftEnd) return false;
      }

      // Check against staff's next booked appointment
      const appts = staffSchedules[slot.staffId];
      if (!appts || appts.length === 0) return true;

      const nextAppt = appts
        .map((a) => parseMindbodyDateTime(a.start))
        .filter((start) => start > serviceEnd)
        .sort((a, b) => a.getTime() - b.getTime())[0];

      if (!nextAppt) return true;

      return extensionsEnd <= nextAppt;
    });
  }, [slots, staffSchedules, staffLastSlot, totalExtMinutes, selectedService]);

  // Filter slots by selected therapist + extension availability
  const displayedSlots = useMemo(() => {
    const base = totalExtMinutes > 0 ? filteredSlots : slots;
    if (!filteredTherapist) return base;
    return base.filter((s) => s.staffId === filteredTherapist);
  }, [slots, filteredSlots, filteredTherapist, totalExtMinutes]);

  const groupedSlots = useMemo(() => groupSlots(displayedSlots), [displayedSlots]);

  const totalMinutes = useMemo(() => {
    if (!selectedService) return 0;
    const ext = selectedBoosts
      .filter((b) => b.type === "time_extension")
      .reduce((sum, b) => sum + b.minutesAdded, 0);
    return selectedService.minutes + ext;
  }, [selectedService, selectedBoosts]);

  const totalPrice = useMemo(() => {
    if (!selectedService) return 0;
    return (
      selectedService.dropInPrice +
      selectedBoosts.reduce((sum, b) => sum + b.dropInPrice, 0)
    );
  }, [selectedService, selectedBoosts]);

  const totalMemberPrice = useMemo(() => {
    if (!selectedService) return 0;
    return (
      selectedService.memberPrice +
      selectedBoosts.reduce((sum, b) => sum + b.memberPrice, 0)
    );
  }, [selectedService, selectedBoosts]);

  const expMonthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );
  const expYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(currentYear + i));
  }, []);

  const stepTitle = useMemo(() => {
    if (step === "service")
      return category === "massage" ? "Choose your massage" : "Choose your facial";
    if (step === "boosts") return "Customize with boosts";
    if (step === "time") return "Pick your therapist & time";
    if (step === "email") return "Enter your email";
    if (step === "card")
      return cardContext === "create_account"
        ? "Create your account"
        : "Payment details";
    if (step === "confirm") return "Review and confirm";
    if (step === "booking") return "Booking your appointment";
    return "";
  }, [step, category, cardContext]);

  /* ─────────────────────────────────────────────
     EFFECTS
  ───────────────────────────────────────────── */

  // Disable global scroll-snap
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

  // Gentle scroll to top on step change
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Clear card refs when leaving card step
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

  // Fetch full staff list once when service changes (7-day window, 1 API call)
  useEffect(() => {
    if (!selectedService) {
      setAllTherapists([]);
      return;
    }

    setFilteredTherapist(null);
    fetch(`/api/service/staff-list?sessionTypeId=${selectedService.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.staff)) {
          setAllTherapists(data.staff);
        }
      })
      .catch(() => setAllTherapists([]));
  }, [selectedService]);

  // Fetch availability when service or date changes
  useEffect(() => {
    if (!selectedService) return;

    setLoading(true);
    setSelectedSlot(null);
    setError(null);

    fetch(
      `/api/service/availability?sessionTypeId=${selectedService.id}&date=${selectedDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.slots)) {
          setSlots([]);
          setError("No availability for this day.");
          return;
        }
        setSlots(data.slots);
      })
      .catch(() => {
        setSlots([]);
        setError("Unable to load availability.");
      })
      .finally(() => setLoading(false));
  }, [selectedService, selectedDate]);

  /* ─────────────────────────────────────────────
     CARD HELPERS
  ───────────────────────────────────────────── */

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
      return "Please select an expiration year.";

    const now = new Date();
    if (
      Number(expYear) === now.getFullYear() &&
      Number(expMonth) < now.getMonth() + 1
    ) {
      return "This card appears to be expired.";
    }

    if (!postalCode || postalCode.length < 3)
      return "Please enter a valid ZIP/postal code.";

    return null;
  }

  /* ─────────────────────────────────────────────
     CONVERSION TRACKING
  ───────────────────────────────────────────── */

  function reportPurchaseConversion() {
    if (typeof window === "undefined") return;
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17421817568/T3o8CK-LoukbEOCtr_NA",
      });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "service_booking_complete",
      category: category,
      service: selectedService?.name,
      boosts: selectedBoosts.map((b) => b.name),
      therapist: selectedSlot?.staffName,
      total_price: totalPrice,
    });
  }

  /* ─────────────────────────────────────────────
     FUNNEL TRACKING
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];

    const flowType = category ?? "unknown";

    const eventMap: Record<string, string> = {
      service: "booking_start",
      boosts: "booking_service_selected",
      time: "booking_boosts_done",
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
      booking_flow: flowType,
    };

    if (step === "boosts" && selectedService) {
      payload.service_name = selectedService.name;
      payload.service_price = selectedService.dropInPrice;
    }
    if (step === "email" && selectedSlot) {
      payload.booking_date = selectedSlot.startDateTime.split("T")[0];
      payload.therapist = selectedSlot.staffName;
    }
    if (step === "card") {
      payload.client_type = cardContext === "create_account" ? "new" : "returning";
    }
    if (step === "done" && selectedService) {
      payload.service_name = selectedService.name;
      payload.total_price = totalPrice;
    }

    window.dataLayer.push(payload);
  }, [step]);

  /* ─────────────────────────────────────────────
     STEP HANDLERS
  ───────────────────────────────────────────── */

  function handleSelectService(svc: Service) {
    setSelectedService(svc);
    setSelectedBoosts([]);
    setSelectedSlot(null);
    setSlots([]);
    setStep("boosts");
  }

  function handleToggleBoost(boost: Boost) {
    setSelectedBoosts((prev) => {
      const exists = prev.some((b) => b.id === boost.id);

      if (exists) {
        return prev.filter((b) => b.id !== boost.id);
      }

      // Massage: only one time-extension allowed (exclusive toggle)
      // Facial: allow both Super Boosts (Microcurrent Full + LED Full)
      if (boost.type === "time_extension" && boost.category === "massage") {
        return [...prev.filter((b) => b.type !== "time_extension"), boost];
      }

      return [...prev, boost];
    });
  }

  function handleContinueFromBoosts() {
    setStep("time");
  }

  async function handleConfirmBooking() {
    setError(null);

    if (!selectedSlot) {
      setError("Please select a time first.");
      return;
    }

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `/api/mindbody/client-lookup?email=${encodeURIComponent(normalized)}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Client lookup failed.");

      const lookup = data as {
        found: boolean;
        client: { Id: string } | null;
        hasCardOnFile: boolean;
      };

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
    } finally {
      setLoading(false);
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

    if (!clientId || !selectedSlot || !selectedService) {
      setError("Missing booking information. Please start again.");
      setStep("email");
      return;
    }

    if (bookingLock.current) return;
    bookingLock.current = true;

    try {
      setStep("booking");

      /* Build guest notes if booking for someone else */
      let notes: string | undefined;
      if (forSomeoneElse && guestFirstName.trim() && guestPhone.trim()) {
        const guestName = `${guestFirstName.trim()} ${guestLastName.trim()}`.trim();
        const parts = [`BOOKING FOR: ${guestName}`, `Phone: ${guestPhone.trim()}`];
        if (guestEmail.trim()) parts.push(`Email: ${guestEmail.trim()}`);
        if (isSurprise) parts.push("⚠️ SURPRISE — do not contact guest");
        notes = parts.join(" | ");
      }

      const res = await fetch("/api/service/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          sessionTypeId: selectedService.id,
          startDateTime: selectedSlot.startDateTime,
          staffId: selectedSlot.staffId,
          addOnIds: selectedBoosts.map((b) => b.id),
          ...(notes ? { notes } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.error || "Booking failed. Please try again or call us."
        );
      }

      // Check if any boosts failed to attach
      const failedBoosts = (data.addOns ?? []).filter(
        (a: { success: boolean }) => !a.success
      );
      if (failedBoosts.length > 0) {
        const failedNames = selectedBoosts
          .filter((b) =>
            failedBoosts.some(
              (f: { addOnId: number }) => f.addOnId === b.id
            )
          )
          .map((b) => b.name);
        setBoostWarning(
          failedNames.length > 0
            ? `Your appointment is booked, but we couldn't add: ${failedNames.join(", ")}. Please call us at (303) 476-6150 to add ${failedNames.length === 1 ? "it" : "them"} to your visit.`
            : "Your appointment is booked, but some add-ons couldn't be applied. Please call us at (303) 476-6150 to complete your booking."
        );
      }

      reportPurchaseConversion();
      setStep("done");

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
      setError(
        err.message || "Booking failed. Please try again or call us."
      );
      setStep("confirm");
    } finally {
      bookingLock.current = false;
    }
  }

  function handleHeaderBack() {
    setError(null);
    if (step === "service") {
      // Go back to the booking hub instead of the old category step
      router.push("/locations/denver-larimer/book");
      return;
    } else if (step === "boosts") setStep("service");
    else if (step === "time") setStep("boosts");
    else if (step === "email") setStep("time");
    else if (step === "card") setStep("email");
    else if (step === "confirm") setStep("email");
  }

  /* ─────────────────────────────────────────────
     SHARED UI CLASSES
  ───────────────────────────────────────────── */

  const inputClass =
    "w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-base transition-shadow duration-200";

  const primaryBtn =
    "w-full rounded-full bg-[#113D33] text-white py-4 text-lg font-semibold hover:bg-[#0e3029] active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:active:scale-100 shadow-lg";

  const secondaryBtn =
    "w-full rounded-full border-2 border-[#113D33] text-[#113D33] py-3 text-base font-semibold hover:bg-[#113D33] hover:text-white active:scale-[0.98] transition-all duration-200";

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */

  const showHeader = step !== "done";
  const showHeaderBack =
    step !== "booking" && step !== "done";

  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance">
      {/* Sticky header */}
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
          {/* Hero */}
          <div className="mb-10 md:mb-12 animate-fade-in">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#4A776D] mb-4">
              Sway Wellness Spa
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-4 leading-tight">
              {category === "massage"
                ? "Massage"
                : category === "facial"
                  ? "Facial"
                  : "Treatment"}
            </h1>
            <p className="text-base md:text-lg text-[#113D33]/60 max-w-xl mx-auto mb-6">
              {category === "massage"
                ? "Expert therapists, personalized pressure, total relaxation."
                : category === "facial"
                  ? "Clinical-grade skincare tailored to your skin."
                  : "Choose your service, pick a time, and we\u2019ll reserve it."}
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-left text-red-800 text-sm animate-slide-down backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <div className="flex-1">{error}</div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-300 hover:text-red-500 transition-colors ml-2 shrink-0"
                  aria-label="Dismiss error"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: SERVICE
          ═══════════════════════════════════════ */}
          {step === "service" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {services.map((svc, i) => {
                  const selected = selectedService?.id === svc.id;
                  return (
                    <button
                      key={svc.id}
                      onClick={() => handleSelectService(svc)}
                      className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 animate-fade-in-up ${
                        selected
                          ? "border-[#113D33] bg-white shadow-xl ring-1 ring-[#113D33]/20 scale-[1.02]"
                          : "border-[#113D33]/10 bg-white/70 hover:bg-white hover:shadow-lg hover:-translate-y-1"
                      }`}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={svc.image}
                          alt={svc.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        {selected && (
                          <div className="absolute top-3 right-3 bg-[#113D33] text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full flex items-center gap-1 animate-scale-in">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Selected
                          </div>
                        )}
                        {/* Price overlay */}
                        <div className="absolute bottom-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-right">
                            <div className="text-sm font-bold text-[#113D33]">${svc.memberPrice}<span className="font-normal text-[#113D33]/40"> / </span><span className="font-normal text-[#113D33]/50">${svc.dropInPrice}</span></div>
                            <div className="text-[10px] text-[#113D33]/50">{svc.minutes} min</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[#113D33] text-base">
                          {svc.name}
                        </div>
                        {svc.subtitle && (
                          <div className="text-xs text-[#4A776D]/70 mt-0.5">
                            {svc.subtitle}
                          </div>
                        )}
                        <p className="text-sm text-[#113D33]/50 mt-1.5 leading-relaxed">
                          {svc.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: BOOSTS
          ═══════════════════════════════════════ */}
          {step === "boosts" && (
            <div className="animate-fade-in-up">
              {/* Selected service mini-card */}
              {selectedService && (
                <div className="mb-6 bg-white/80 backdrop-blur-sm border border-[#113D33]/10 rounded-2xl p-4 text-left shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={selectedService.image}
                        alt={selectedService.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[#113D33] text-sm">
                        {selectedService.name}
                      </div>
                      <div className="text-xs text-[#113D33]/50">
                        {selectedService.minutes} min · ${selectedService.memberPrice} member / ${selectedService.dropInPrice} drop-in
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#113D33]/80 mb-1">
                  Optional Boosts
                </h2>
                <p className="text-sm text-[#113D33]/50">
                  Enhance your {category}. Super Boosts add extra time. Select any or skip.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {boostsForCategory.map((boost, i) => {
                  const selected = selectedBoosts.some(
                    (b) => b.id === boost.id
                  );

                  return (
                    <button
                      key={boost.id}
                      onClick={() => handleToggleBoost(boost)}
                      className={`rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 animate-fade-in-up ${
                        selected
                          ? "border-[#113D33] bg-white shadow-md ring-1 ring-[#113D33]/10"
                          : "border-[#113D33]/10 bg-white shadow-sm hover:shadow-md hover:border-[#113D33]/20"
                      }`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                            boost.tag === "Super Boost"
                              ? "bg-[#113D33] text-white"
                              : "bg-[#113D33]/8 text-[#113D33]/70"
                          }`}
                        >
                          {boost.tag}
                        </span>
                        {boost.minutesAdded > 0 && (
                          <span className="text-xs text-[#113D33]/50">
                            +{boost.minutesAdded} min
                          </span>
                        )}
                        <span className="ml-auto">
                          <span
                            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                              selected
                                ? "border-[#113D33] bg-[#113D33]"
                                : "border-[#113D33]/20"
                            }`}
                          >
                            {selected && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="font-semibold text-[#113D33] text-sm">
                        {boost.name}
                      </div>
                      <p className="text-xs text-[#113D33]/60 mt-1 leading-relaxed">
                        {boost.description}
                      </p>
                      {boost.detail && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedBoostId(
                              expandedBoostId === boost.id ? null : boost.id
                            );
                          }}
                          className="text-[10px] text-[#4A776D] font-medium mt-1.5 hover:underline"
                        >
                          {expandedBoostId === boost.id ? "Hide details" : "ⓘ Details"}
                        </button>
                      )}
                      {expandedBoostId === boost.id && boost.detail && (
                        <p className="text-[11px] text-[#113D33]/70 mt-2 leading-relaxed bg-[#113D33]/[0.03] rounded-lg p-2.5">
                          {boost.detail}
                        </p>
                      )}
                      <div className="text-xs text-[#113D33]/70 mt-2 font-medium">
                        {boost.price}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Summary + Continue */}
              <div className="mt-8 space-y-3 max-w-md mx-auto">
                {selectedBoosts.length > 0 && (
                  <div className="bg-white border border-[#113D33]/10 rounded-2xl p-4 text-sm text-left shadow-sm animate-scale-in">
                    <div className="text-[10px] uppercase tracking-wider text-[#113D33]/50 mb-2 font-semibold">
                      Your boosts
                    </div>
                    {selectedBoosts.map((b) => (
                      <div key={b.id} className="flex justify-between text-[#113D33] py-1">
                        <span className="font-medium">
                          {b.name}
                          {b.minutesAdded > 0 ? ` (+${b.minutesAdded} min)` : ""}
                        </span>
                        <span className="text-[#113D33]/70">${b.memberPrice} / ${b.dropInPrice}</span>
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-[#113D33]/10 flex justify-between font-semibold text-[#113D33]">
                      <span>{totalMinutes} min total</span>
                      <span>${totalMemberPrice} / ${totalPrice}</span>
                    </div>
                    <div className="text-[10px] text-[#113D33]/40 text-right mt-0.5">member / drop-in</div>
                  </div>
                )}

                <button
                  onClick={handleContinueFromBoosts}
                  className={primaryBtn}
                >
                  {selectedBoosts.length > 0
                    ? "Continue with boosts"
                    : "Continue without boosts"}
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: TIME (with therapist filter)
          ═══════════════════════════════════════ */}
          {step === "time" && (
            <div className="animate-fade-in-up">
              {/* Treatment summary */}
              {selectedService && (
                <div className="mb-6 bg-white/80 backdrop-blur-sm border border-[#113D33]/10 rounded-2xl p-4 text-left shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={selectedService.image}
                        alt={selectedService.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[#113D33] text-sm">
                        {selectedService.name}
                        {selectedBoosts.length > 0
                          ? ` + ${selectedBoosts.map((b) => b.name).join(", ")}`
                          : ""}
                      </div>
                      <div className="text-xs text-[#113D33]/50">
                        {totalMinutes} min · ${totalMemberPrice} member / ${totalPrice} drop-in
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Week navigator */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-[#113D33]/80 mb-4">Choose a Day</h2>
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => setWeekStart(addDays(weekStart, -7))}
                    disabled={weekStart <= today}
                    className="p-2 rounded-full hover:bg-[#113D33]/5 disabled:opacity-20 transition-all duration-150"
                    aria-label="Previous week"
                  >
                    <svg className="w-5 h-5 text-[#113D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-1">
                    {weekDays.map((day) => {
                      const iso = formatISO(day);
                      const isPast = day < today && iso !== formatISO(today);
                      const isSelected = iso === selectedDate;
                      const dayName = day
                        .toLocaleDateString("en-US", { weekday: "short" })
                        .toUpperCase();
                      const dayNum = day.getDate();

                      return (
                        <button
                          key={iso}
                          disabled={isPast}
                          onClick={() => setSelectedDate(iso)}
                          className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 min-w-[52px] transition-all duration-200 ${
                            isSelected
                              ? "bg-[#113D33] text-white shadow-lg shadow-[#113D33]/20"
                              : isPast
                                ? "opacity-25 cursor-not-allowed"
                                : "bg-white text-[#113D33] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                          }`}
                        >
                          <span className="text-[10px] font-semibold tracking-wider">
                            {dayName}
                          </span>
                          <span className="text-lg font-bold leading-tight">{dayNum}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setWeekStart(addDays(weekStart, 7))}
                    className="p-2 rounded-full hover:bg-[#113D33]/5 transition-all duration-150"
                    aria-label="Next week"
                  >
                    <svg className="w-5 h-5 text-[#113D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </section>

              {/* Therapist filter */}
              {allTherapists.length > 1 && (
                <section className="mb-6 animate-fade-in">
                  <div className="text-xs uppercase tracking-wider text-[#113D33]/50 mb-2 font-semibold">
                    Therapist
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => setFilteredTherapist(null)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        filteredTherapist === null
                          ? "bg-[#113D33] text-white shadow-md shadow-[#113D33]/15"
                          : "bg-white text-[#113D33] shadow-sm hover:shadow-md"
                      }`}
                    >
                      All therapists
                    </button>
                    {allTherapists.map((t) => (
                      <button
                        key={t.id}
                        onClick={() =>
                          setFilteredTherapist(
                            filteredTherapist === t.id ? null : t.id
                          )
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          filteredTherapist === t.id
                            ? "bg-[#113D33] text-white shadow-md shadow-[#113D33]/15"
                            : "bg-white text-[#113D33] shadow-sm hover:shadow-md"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Time slots */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-[#113D33]/80 mb-4">Pick a Time</h2>

                {(loading || schedulesLoading) && (
                  <div className="py-16 flex flex-col items-center gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full border-2 border-[#113D33]/20 border-t-[#113D33] animate-spin" />
                    <span className="text-sm text-[#113D33]/50">Loading times…</span>
                  </div>
                )}

                {!loading && !schedulesLoading && displayedSlots.length === 0 && (
                  <div className="py-16 text-center animate-fade-in">
                    <p className="text-[#113D33]/50">
                      {filteredTherapist
                        ? `No availability for ${allTherapists.find((t) => t.id === filteredTherapist)?.name ?? "this therapist"} on this day.`
                        : "No availability for this day."}
                    </p>
                    {selectedService && (
                      <NextAvailableBanner
                        type="service"
                        sessionTypeId={selectedService.id}
                        currentDate={selectedDate}
                        staffId={filteredTherapist}
                        staffName={
                          filteredTherapist
                            ? allTherapists.find((t) => t.id === filteredTherapist)?.name
                            : undefined
                        }
                        onJumpToDate={(iso) => {
                          const [y, m, d] = iso.split("-").map(Number);
                          const target = new Date(y, m - 1, d);
                          setSelectedDate(iso);
                          setWeekStart(target);
                        }}
                      />
                    )}
                  </div>
                )}

                {!loading && !schedulesLoading &&
                  displayedSlots.length > 0 &&
                  Object.entries(groupedSlots).map(([period, periodSlots]) => {
                    if (periodSlots.length === 0) return null;
                    return (
                      <div key={period} className="mb-5 animate-fade-in">
                        <div className="text-xs uppercase tracking-wider font-semibold text-[#113D33]/40 mb-2 text-left">
                          {period}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {periodSlots.map((slot, idx) => {
                            const isSelected =
                              selectedSlot?.startDateTime ===
                                slot.startDateTime &&
                              selectedSlot?.staffId === slot.staffId;

                            return (
                              <button
                                key={`${slot.startDateTime}-${slot.staffId}-${idx}`}
                                onClick={() => setSelectedSlot(slot)}
                                className={`rounded-xl py-3 px-2 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                                  isSelected
                                    ? "bg-[#113D33] text-white shadow-lg shadow-[#113D33]/20 scale-[1.02]"
                                    : "bg-white text-[#113D33] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                }`}
                              >
                                <div className="font-semibold text-sm">
                                  {formatTime12h(slot.startDateTime)}
                                </div>
                                {filteredTherapist && slot.staffName && (
                                  <div
                                    className={`text-xs mt-0.5 ${
                                      isSelected
                                        ? "text-white/70"
                                        : "text-[#113D33]/45"
                                    }`}
                                  >
                                    {slot.staffName}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </section>

              {/* Continue */}
              <div className="max-w-md mx-auto">
                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep("email")}
                  className={primaryBtn}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: EMAIL
          ═══════════════════════════════════════ */}
          {step === "email" && (
            <div className="max-w-md mx-auto animate-fade-in-up">
              <div className="bg-white border border-[#113D33]/10 rounded-2xl p-6 text-left shadow-sm">
                <label className="block text-sm font-medium text-[#113D33] mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                  autoComplete="email"
                  autoFocus
                />

                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#113D33]/[0.03] p-3 text-xs text-[#113D33]/60">
                  <IconLock className="w-4 h-4 shrink-0 mt-0.5 text-[#113D33]/40" />
                  <span>
                    We use your email to find or create your Mindbody account.
                    You won&apos;t be charged today.
                  </span>
                </div>

                <button
                  disabled={!isValidEmail(email) || loading}
                  onClick={handleConfirmBooking}
                  className={`${primaryBtn} mt-6`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Looking up…
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: CARD
          ═══════════════════════════════════════ */}
          {step === "card" && (
            <div className="max-w-md mx-auto animate-fade-in-up">
              <div className="bg-white border border-[#113D33]/10 rounded-2xl p-6 text-left space-y-4 shadow-sm">
                {cardContext === "create_account" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#113D33] mb-1">
                        First name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClass}
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#113D33] mb-1">
                        Last name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClass}
                        autoComplete="family-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#113D33] mb-1">
                        Mobile phone
                      </label>
                      <input
                        value={mobilePhone}
                        onChange={(e) => setMobilePhone(e.target.value)}
                        className={inputClass}
                        autoComplete="tel"
                        type="tel"
                      />
                    </div>
                    <hr className="border-[#113D33]/10" />
                  </>
                )}

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#113D33]">
                    Card details
                  </label>
                  <CardBrandPills />
                </div>

                <div>
                  <label className="block text-xs text-[#113D33]/50 mb-1">
                    Name on card
                  </label>
                  <input
                    ref={cardHolderRef}
                    className={inputClass}
                    autoComplete="cc-name"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#113D33]/50 mb-1">
                    Card number
                  </label>
                  <input
                    ref={cardNumberRef}
                    className={inputClass}
                    autoComplete="cc-number"
                    inputMode="numeric"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-[#113D33]/50 mb-1">
                      Month
                    </label>
                    <select ref={expMonthRef} className={inputClass}>
                      <option value="">MM</option>
                      {expMonthOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#113D33]/50 mb-1">
                      Year
                    </label>
                    <select ref={expYearRef} className={inputClass}>
                      <option value="">YYYY</option>
                      {expYearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#113D33]/50 mb-1">
                      ZIP
                    </label>
                    <input
                      ref={postalCodeRef}
                      className={inputClass}
                      autoComplete="postal-code"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl bg-[#113D33]/[0.03] p-3 text-xs text-[#113D33]/60">
                  <IconLock className="w-4 h-4 shrink-0 mt-0.5 text-[#113D33]/40" />
                  <span>
                    Your card is stored securely in Mindbody for no-show / late
                    cancellation protection. You won&apos;t be charged today.
                  </span>
                </div>

                {cardContext === "create_account" && (
                  <label className="flex items-center gap-2 cursor-pointer mt-1">
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

                <button
                  disabled={cardSaving}
                  onClick={handleSaveCardAndContinue}
                  className={primaryBtn}
                >
                  {cardSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving…
                    </span>
                  ) : (
                    "Save & continue"
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <a
                  href="tel:3034766150"
                  className="text-sm text-[#113D33]/50 hover:text-[#113D33] underline underline-offset-4 transition-colors"
                >
                  Prefer to book by phone? (303) 476-6150
                </a>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: CONFIRM
          ═══════════════════════════════════════ */}
          {step === "confirm" && selectedService && selectedSlot && (
            <div className="max-w-md mx-auto animate-fade-in-up">
              <div className="bg-white border border-[#113D33]/10 rounded-2xl overflow-hidden shadow-sm">
                {/* Service image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                      {category === "massage" ? "Massage" : "Facial"}
                    </div>
                    <div className="text-xl font-bold text-white drop-shadow-sm">
                      {selectedService.name}
                    </div>
                  </div>
                </div>

                <div className="p-5 text-left space-y-4">
                  {/* Boosts */}
                  {selectedBoosts.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#113D33]/40 font-semibold mb-1">
                        Boosts
                      </div>
                      {selectedBoosts.map((b) => (
                        <div key={b.id} className="flex justify-between text-sm text-[#113D33] py-0.5">
                          <span>
                            {b.name}
                            {b.minutesAdded > 0 ? ` (+${b.minutesAdded} min)` : ""}
                          </span>
                          <span className="text-[#113D33]/60">${b.memberPrice} / ${b.dropInPrice}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Therapist */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#113D33]/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-[#113D33]">
                        {selectedSlot.staffName?.charAt(0) || "?"}
                      </span>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#113D33]/40 font-semibold">
                        Therapist
                      </div>
                      <div className="text-sm font-medium text-[#113D33]">
                        {selectedSlot.staffName}
                      </div>
                    </div>
                  </div>

                  {/* Date + Time */}
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#113D33]/40 font-semibold mb-0.5">
                      When
                    </div>
                    <div className="text-sm font-medium text-[#113D33]">
                      {formatDayLabel(
                        parseMindbodyDateTime(selectedSlot.startDateTime)
                      )}{" "}
                      · {formatTimeRange(selectedSlot.startDateTime, totalMinutes)}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t border-[#113D33]/10">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-[#113D33]/60">Member</span>
                      <span className="text-2xl font-bold text-[#113D33]">
                        ${totalMemberPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mt-0.5">
                      <span className="text-sm text-[#113D33]/40">Drop-in</span>
                      <span className="text-sm text-[#113D33]/40">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="text-xs text-[#113D33]/50">
                    Reservation under{" "}
                    <span className="font-medium text-[#113D33]/70">
                      {normalizeEmail(email)}
                    </span>
                  </div>

                  {/* Member pricing note */}
                  <div className="rounded-xl bg-[#113D33]/[0.04] p-3 text-xs text-[#113D33]/70 leading-relaxed">
                    Member pricing is automatically applied at checkout.
                    If you have a membership credit or package, it will be applied to this visit.
                  </div>

                  {/* No charge notice */}
                  <div className="flex items-start gap-2.5 rounded-xl bg-[#113D33]/[0.03] p-3 text-xs text-[#113D33]/60">
                    <IconLock className="w-4 h-4 shrink-0 mt-0.5 text-[#113D33]/40" />
                    <span>
                      No charge today &mdash; your card is stored for no-show /
                      late cancellation protection.
                    </span>
                  </div>

                  {/* ── For someone else ───────────── */}
                  <div className="border-t border-[#113D33]/10 pt-4">
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

                  <button
                    onClick={handleFinalConfirmAndBook}
                    disabled={forSomeoneElse && (!guestFirstName.trim() || !guestPhone.trim())}
                    className={primaryBtn}
                  >
                    Confirm & book
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: BOOKING (processing)
          ═══════════════════════════════════════ */}
          {step === "booking" && (
            <div className="max-w-md mx-auto py-20 animate-fade-in">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#113D33]/20 border-t-[#113D33] animate-spin mx-auto" />
              </div>
              <div className="text-xl font-semibold text-[#113D33] mb-2">
                Booking your appointment…
              </div>
              <p className="text-sm text-[#113D33]/50">
                Please don&apos;t close this page.
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════════
             STEP: DONE
          ═══════════════════════════════════════ */}
          {step === "done" && (
            <div className="max-w-md mx-auto pt-10 pb-12">
              {/* Hero image with overlay */}
              <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-in">
                <div className="relative h-48 w-full">
                  {selectedService && (
                    <Image
                      src={selectedService.image}
                      alt={selectedService.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#113D33] via-[#113D33]/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="animate-check-pop mb-3">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white animate-fade-in-up">
                      You&apos;re booked!
                    </h2>
                  </div>
                </div>
              </div>

              {selectedService && selectedSlot && (
                <p className="text-[#113D33] font-semibold text-lg mb-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                  {selectedService.name} with {selectedSlot.staffName}
                </p>
              )}

              {selectedBoosts.length > 0 && (
                <p className="text-[#113D33]/50 text-sm mb-1 animate-fade-in-up" style={{ animationDelay: "125ms" }}>
                  + {selectedBoosts.map((b) => b.name).join(", ")}
                </p>
              )}

              {selectedSlot && (
                <p className="text-[#113D33]/60 text-sm mb-1 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                  {formatDayLabel(parseMindbodyDateTime(selectedSlot.startDateTime))} ·{" "}
                  {formatTimeRange(selectedSlot.startDateTime, totalMinutes)}
                </p>
              )}

              <p className="text-[#113D33]/50 text-sm mt-4 mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                Check your email for confirmation. We&apos;ll see you soon.
              </p>

              {boostWarning && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-8 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
                  <p className="text-sm text-amber-900 leading-relaxed">
                    {boostWarning}
                  </p>
                </div>
              )}

              {/* Add another service */}
              <div className="space-y-3 mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#113D33]/40">
                  Complete your visit
                </p>
                <Link
                  href="/locations/denver-larimer/book-aescape"
                  className={secondaryBtn + " block text-center"}
                >
                  Book Aescape Robot Massage
                </Link>
                <Link
                  href="/locations/denver-larimer/book-remedy-room"
                  className={secondaryBtn + " block text-center"}
                >
                  Book Remedy Room
                </Link>
                <Link
                  href="/locations/denver-larimer/book-service"
                  className={secondaryBtn + " block text-center"}
                >
                  Book Another Massage or Facial
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
