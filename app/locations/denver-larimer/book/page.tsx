"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewBadge, ClassPassBadge } from "@/app/components/GoogleReviews";
import NextAvailableBanner from "../NextAvailableBanner";
import { getClosingHour } from "@/lib/locationHours";

/* ================================================================
   NEW TIER-AWARE BOOKING FLOW
   Steps: category → treatment → boosts → time → account → confirm → booking → done

   Key design decisions:
   - No email gate before browsing — zero friction to explore treatments
   - Optional "Sway member?" shortcut on treatment step for returning members
   - Email collected at account step (after time selection — user is invested)
   - Silent membership check personalizes account + confirm steps
   - Card skipped entirely if member has card on file
   - Treatments organized by Essential / Premier / Ultimate with "All" default
   - Uses new Mindbody session type IDs (75-108)
================================================================ */

type Step =
  | "welcome"
  | "category"
  | "treatment"
  | "boosts"
  | "time"
  | "account"
  | "confirm"
  | "booking"
  | "done";

type Category = "massage" | "facial";
type MembershipTier = "essential" | "premier" | "ultimate" | null;

/* ----------------------------------------------------------------
   TREATMENT & BOOST DATA
---------------------------------------------------------------- */

type Treatment = {
  id: number;
  name: string;
  duration: string;
  durationMinutes: number;
  description: string;
  tier: "essential" | "premier" | "ultimate";
  image: string;
  concerns?: string[];
};

type Boost = {
  id: number;
  name: string;
  type: "boost" | "boost_plus" | "boost_pro";
  addsMinutes: number;
  memberPrice: string;
  dropInPrice: string;
  description: string;
  resourceId?: number;
};

const FACIAL_TREATMENTS: Treatment[] = [
  // Essential — 50 min, $99 member / $139 drop-in
  { id: 75, name: "Essential Signature Facial", duration: "50 min", durationMinutes: 50, description: "A classic facial customized to your skin type: cleanse, exfoliate, extract, and hydrate.", tier: "essential", image: "/assets/facial1.jpg", concerns: ["hydration", "sensitive", "brightening", "acne", "anti-aging"] },
  // Premier — 50 min, $129 member / $169 drop-in. Value add: targeted products + dermapore technology
  { id: 78, name: "Premier Forever Young Anti-Aging Facial", duration: "50 min", durationMinutes: 50, description: "Hydrates, brightens, and tightens the skin while supporting collagen production.", tier: "premier", image: "/assets/facial2.jpg", concerns: ["anti-aging", "hydration"] },
  { id: 80, name: "Premier Pore Perfection Acne Facial", duration: "50 min", durationMinutes: 50, description: "Targets congestion, bacteria, and inflammation for clearer, healthier skin.", tier: "premier", image: "/assets/facial4.jpg", concerns: ["acne", "texture"] },
  { id: 81, name: "Premier Sensitive Silk Facial", duration: "50 min", durationMinutes: 50, description: "Calms redness, strengthens the skin barrier, and supports sensitive skin types.", tier: "premier", image: "/assets/facial5.jpg", concerns: ["sensitive"] },
  { id: 79, name: "Premier Glow Getter Hydration Facial", duration: "50 min", durationMinutes: 50, description: "Correcting peptides and antioxidants instantly smooth and firm for radiant, hydrated skin.", tier: "premier", image: "/assets/facial3.jpg", concerns: ["hydration", "anti-aging", "brightening"] },
  { id: 77, name: "Premier Dr. Dennis Gross Vitamin C Facial", duration: "50 min", durationMinutes: 50, description: "A brightening facial powered by Vitamin C to improve tone, clarity, and radiance.", tier: "premier", image: "/assets/facial6.jpg", concerns: ["brightening", "anti-aging"] },
  // Ultimate — 50–60 min, $159 member / $199 drop-in. Value add: +10 min, tech + scalp/hand
  { id: 85, name: "Ultimate Illuminate LED Facial", duration: "60 min", durationMinutes: 60, description: "An advanced facial infused with LED light therapy to brighten, even skin tone, and support collagen.", tier: "ultimate", image: "/assets/facial2.jpg", concerns: ["brightening", "anti-aging"] },
  { id: 82, name: "Ultimate Oxygen Infusion Facial", duration: "60 min", durationMinutes: 60, description: "A high-performance oxygenating facial to deeply hydrate, plump, and revitalize.", tier: "ultimate", image: "/assets/facial3.jpg", concerns: ["hydration", "anti-aging"] },
  { id: 103, name: "Ultimate Sculpt & Lift Microcurrent Facial", duration: "60 min", durationMinutes: 60, description: "Microcurrent technology to re-educate muscles, smooth fine lines, and restore natural energy.", tier: "ultimate", image: "/assets/facial5.jpg", concerns: ["anti-aging"] },
  { id: 104, name: "Ultimate Hydraderm", duration: "50 min", durationMinutes: 50, description: "Advanced technology resurfaces your skin while delivering intensive hydration using result-driven serums.", tier: "ultimate", image: "/assets/facial4.jpg", concerns: ["hydration", "texture"] },
  { id: 84, name: "Ultimate Dr. Dennis Gross Vitamin C w/ LED", duration: "60 min", durationMinutes: 60, description: "A result-driven Vitamin C facial enhanced with LED light therapy for brightening and collagen support.", tier: "ultimate", image: "/assets/facial6.jpg", concerns: ["brightening", "anti-aging"] },
];

const MASSAGE_TREATMENTS: Treatment[] = [
  // Essential — 50 min, $99 member / $139 drop-in
  { id: 88, name: "Essential Signature Massage", duration: "50 min", durationMinutes: 50, description: "A foundational full-body massage tailored to your needs.", tier: "essential", image: "/assets/massage7.jpg", concerns: ["relaxation", "pain-relief"] },
  { id: 116, name: "Essential Maternity Massage", duration: "50 min", durationMinutes: 50, description: "A gentle prenatal massage designed for expectant mothers.", tier: "essential", image: "/assets/massage5.jpg", concerns: ["prenatal"] },
  // Premier — $129 member / $169 drop-in. Value add: +20 min for swedish, or advanced techniques
  { id: 98, name: "Premier Signature Massage", duration: "70 min", durationMinutes: 70, description: "Extended full-body massage for a deeply relaxing experience.", tier: "premier", image: "/assets/massage7.jpg", concerns: ["relaxation"] },
  { id: 99, name: "Premier Maternity Massage", duration: "70 min", durationMinutes: 70, description: "Extended prenatal massage with additional time for comfort and relief.", tier: "premier", image: "/assets/massage5.jpg", concerns: ["prenatal"] },
  { id: 100, name: "Premier Deep Tissue Massage", duration: "50 min", durationMinutes: 50, description: "Corrective massage to release deep muscle tension and restore balance.", tier: "premier", image: "/assets/massage2.jpg", concerns: ["pain-relief", "recovery"] },
  { id: 101, name: "Premier Salt Stone Massage", duration: "50 min", durationMinutes: 50, description: "Warm Himalayan salt stones melt tension and promote deep relaxation.", tier: "premier", image: "/assets/massage4.jpg", concerns: ["relaxation", "pain-relief"] },
  { id: 102, name: "Premier Sports Massage", duration: "50 min", durationMinutes: 50, description: "Supports recovery, range of motion, and reduces fatigue.", tier: "premier", image: "/assets/massage5.jpg", concerns: ["recovery", "pain-relief"] },
  { id: 89, name: "Premier Lymphatic Drainage Massage", duration: "50 min", durationMinutes: 50, description: "Gentle techniques to stimulate lymph flow and support detoxification.", tier: "premier", image: "/assets/massage6.jpg", concerns: ["detox", "recovery"] },
  // Ultimate — $159 member / $199 drop-in. Value add: +20 min to advanced techniques
  { id: 105, name: "Ultimate Signature Massage", duration: "90 min", durationMinutes: 90, description: "Our longest full-body massage for complete relaxation and restoration.", tier: "ultimate", image: "/assets/massage7.jpg", concerns: ["relaxation"] },
  { id: 106, name: "Ultimate Deep Tissue Massage", duration: "70 min", durationMinutes: 70, description: "Extended deep tissue for full recovery and rebalancing.", tier: "ultimate", image: "/assets/massage2.jpg", concerns: ["pain-relief", "recovery"] },
  { id: 107, name: "Ultimate Salt Stone Massage", duration: "70 min", durationMinutes: 70, description: "Extended salt stone therapy for deep penetration and release.", tier: "ultimate", image: "/assets/massage4.jpg", concerns: ["relaxation", "pain-relief"] },
  { id: 108, name: "Ultimate Sports Massage", duration: "70 min", durationMinutes: 70, description: "Extended sports therapy with stretching and deep kneading.", tier: "ultimate", image: "/assets/massage5.jpg", concerns: ["recovery", "pain-relief"] },
  { id: 90, name: "Ultimate Lymphatic Drainage Massage", duration: "70 min", durationMinutes: 70, description: "Extended lymphatic therapy for deeper detoxification and recovery.", tier: "ultimate", image: "/assets/massage6.jpg", concerns: ["detox", "recovery"] },
];

const FACIAL_BOOSTS: Boost[] = [
  { id: 74, name: "LED Boost", type: "boost", addsMinutes: 0, memberPrice: "$10", dropInPrice: "$20", description: "Red light therapy.", resourceId: 6 },
  { id: 86, name: "Oxygen Boost", type: "boost", addsMinutes: 0, memberPrice: "$10", dropInPrice: "$20", description: "Cooling oxygen infusion.", resourceId: 4 },
  { id: 115, name: "Dermaflash Boost", type: "boost", addsMinutes: 0, memberPrice: "$10", dropInPrice: "$20", description: "Exfoliates and removes peach fuzz.", resourceId: 5 },
  { id: 73, name: "LED Boost Plus", type: "boost_plus", addsMinutes: 10, memberPrice: "$20", dropInPrice: "$40", description: "Extended LED therapy.", resourceId: 6 },
  { id: 87, name: "Oxygen Boost Plus", type: "boost_plus", addsMinutes: 10, memberPrice: "$20", dropInPrice: "$40", description: "Extended oxygen infusion.", resourceId: 4 },
  { id: 109, name: "Dermaflash Boost Plus", type: "boost_plus", addsMinutes: 10, memberPrice: "$20", dropInPrice: "$40", description: "Extended dermaflash.", resourceId: 5 },
  { id: 117, name: "Sculpt & Lift Microcurrent Pro", type: "boost_pro", addsMinutes: 20, memberPrice: "$25", dropInPrice: "$50", description: "Full-face microcurrent sculpting.", resourceId: 7 },
];

const MASSAGE_BOOSTS: Boost[] = [
  // Boost — $10 member / $20 drop-in, no time added
  { id: 111, name: "CauseMedic Muscle Cream Boost", type: "boost", addsMinutes: 0, memberPrice: "$10", dropInPrice: "$20", description: "Soothing muscle cream for deep relaxation and recovery." },
  { id: 113, name: "Cupping Boost", type: "boost", addsMinutes: 0, memberPrice: "$10", dropInPrice: "$20", description: "Suction therapy for deep tension release." },
  { id: 91, name: "PEMF Recovery Boost", type: "boost", addsMinutes: 0, memberPrice: "$10", dropInPrice: "$20", description: "Electromagnetic field therapy for recovery." },
  // Boost Plus — $20 member / $40 drop-in, +10 min
  { id: 112, name: "CauseMedic Muscle Cream Boost Plus", type: "boost_plus", addsMinutes: 10, memberPrice: "$20", dropInPrice: "$40", description: "Extended muscle cream treatment for deeper recovery." },
  { id: 114, name: "Cupping Boost Plus", type: "boost_plus", addsMinutes: 10, memberPrice: "$20", dropInPrice: "$40", description: "Extended cupping therapy for full-body tension release." },
];

/* ----------------------------------------------------------------
   PRICING
---------------------------------------------------------------- */

const TIER_PRICING = {
  essential: { member: 99, dropIn: 139 },
  premier: { member: 129, dropIn: 169 },
  ultimate: { member: 159, dropIn: 199 },
};

const TIER_RANK = { essential: 1, premier: 2, ultimate: 3 };
const BOOST_LIMITS: Record<string, number> = { essential: 2, premier: 1, ultimate: 0 };

const FACIAL_CONCERNS = [
  { id: "acne", label: "Acne" },
  { id: "anti-aging", label: "Anti-Aging" },
  { id: "hydration", label: "Hydration" },
  { id: "sensitive", label: "Sensitive" },
  { id: "brightening", label: "Brightening" },
  { id: "texture", label: "Texture" },
];

const MASSAGE_CONCERNS = [
  { id: "relaxation", label: "Relaxation" },
  { id: "pain-relief", label: "Pain Relief" },
  { id: "prenatal", label: "Prenatal" },
  { id: "recovery", label: "Recovery" },
  { id: "detox", label: "Detox" },
];

function getTreatmentPrice(tier: "essential" | "premier" | "ultimate", isMember: boolean, memberTier: MembershipTier): number {
  if (isMember && memberTier && TIER_RANK[memberTier] >= TIER_RANK[tier]) return TIER_PRICING[tier].member;
  return TIER_PRICING[tier].dropIn;
}

/* ----------------------------------------------------------------
   HELPERS
---------------------------------------------------------------- */

function formatISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function addDays(d: Date, n: number): Date { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function parseMindbodyDateTime(raw: string) {
  const hasTZ = raw.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(raw) || /[+-]\d{4}$/.test(raw);
  if (hasTZ) return new Date(raw);
  const [datePart, timePart = "00:00:00"] = raw.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 0, mm = 0, ss = 0] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, ss);
}
function formatTime12h(raw: string): string {
  const d = parseMindbodyDateTime(raw);
  let h = d.getHours(); const m = String(d.getMinutes()).padStart(2, "0"); const ampm = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
function formatTimeRange(raw: string, minutes: number): string {
  const s = parseMindbodyDateTime(raw); const e = new Date(s.getTime() + minutes * 60000);
  const fmt = (d: Date) => { let h = d.getHours(); const m = String(d.getMinutes()).padStart(2, "0"); const a = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return `${h}:${m} ${a}`; };
  return `${fmt(s)} \u2013 ${fmt(e)}`;
}
function normalizeEmail(raw: string): string { return raw.trim().toLowerCase(); }
function isValidEmail(raw: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw); }
function onlyDigits(s: string): string { return s.replace(/\D/g, ""); }
function luhnCheck(num: string): boolean {
  let sum = 0; let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) { let d = parseInt(num[i], 10); if (dbl) { d *= 2; if (d > 9) d -= 9; } sum += d; dbl = !dbl; }
  return sum % 10 === 0;
}
function detectCardType(digits: string): string {
  if (/^3[47]/.test(digits)) return "AmEx"; if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits)) return "MasterCard"; if (/^6(?:011|5)/.test(digits)) return "Discover"; return "Unknown";
}

type DisplaySlot = { startDateTime: string; staffId: number | null; staffName: string | null; availableResourceIds: number[] };

/* ----------------------------------------------------------------
   PROGRESS BAR — matches book-service exactly
---------------------------------------------------------------- */

function ProgressBarNew({ step }: { step: Step }) {
  const displaySteps = ["Type", "Service", "Boosts", "Time", "Account", "Confirm"];
  const stepToIdx: Partial<Record<Step, number>> = {
    category: 0,
    treatment: 1,
    boosts: 2,
    time: 3,
    account: 4,
    confirm: 5,
  };
  if (step === "welcome" || step === "booking" || step === "done") return null;
  const displayIdx = stepToIdx[step] ?? 0;
  const pct = ((displayIdx + 1) / displaySteps.length) * 100;
  return (
    <div className="animate-fade-in">
      <div className="h-1 rounded-full bg-[#113D33]/8 overflow-hidden">
        <div className="h-full bg-[#113D33] rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <div className="hidden sm:flex justify-between mt-2">
        {displaySteps.map((label, i) => (
          <span key={label} className={`text-[10px] uppercase tracking-wider transition-colors duration-300 ${i <= displayIdx ? "text-[#113D33] font-semibold" : "text-[#113D33]/25"}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   COMPONENT
================================================================ */

const SAVED_EMAIL_KEY = "sway_booking_email";

export default function NewBookingFlow() {
  const [step, setStep] = useState<Step>("welcome");
  // Scroll to top on step change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>("massage");
  const [autoCheckDone, setAutoCheckDone] = useState(false);

  // Email & membership
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState<string | null>(null);
  const [memberTier, setMemberTier] = useState<MembershipTier>(null);
  const [isMember, setIsMember] = useState(false);
  const [memberFirstName, setMemberFirstName] = useState<string | null>(null);
  const [hasCardOnFile, setHasCardOnFile] = useState(false);
  const [homeLocation, setHomeLocation] = useState<string | null>(null);

  // Auto-check saved email on mount
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(SAVED_EMAIL_KEY) : null;
    if (!saved || autoCheckDone) return;
    setAutoCheckDone(true);
    setEmail(saved);
    setLoading(true);
    fetch(`/api/membership/check?email=${encodeURIComponent(saved)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data || !data.found) { setLoading(false); return; }
        setClientId(data.clientId ?? null);
        setIsMember(data.isMember ?? false);
        setMemberTier(data.tier ?? null);
        setMemberFirstName(data.firstName ?? null);
        setHasCardOnFile(data.hasCardOnFile ?? false);
        setHomeLocation(data.homeLocation ?? null);
        setMemberCheckDone(true);
        if (data.isMember && data.tier) setTreatmentTierFilter(data.tier);
        setStep("category"); // skip welcome
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Treatment
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [treatmentTierFilter, setTreatmentTierFilter] = useState<"essential" | "premier" | "ultimate">("premier");
  const [expandedTreatmentId, setExpandedTreatmentId] = useState<number | null>(null);
  const [activeConcern, setActiveConcern] = useState<string | null>(null);
  const [showMemberInput, setShowMemberInput] = useState(false);
  const [memberCheckDone, setMemberCheckDone] = useState(false);

  // Boosts
  const [selectedBoosts, setSelectedBoosts] = useState<Boost[]>([]);

  // Time
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [slots, setSlots] = useState<DisplaySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<DisplaySlot | null>(null);
  const [filteredTherapist, setFilteredTherapist] = useState<number | null>(null);
  const [allTherapists, setAllTherapists] = useState<{ id: number; name: string }[]>([]);

  // Card
  const [cardContext, setCardContext] = useState<"create_account" | "add_card" | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [cardSaving, setCardSaving] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  // Confirm/booking
  const [boostWarning, setBoostWarning] = useState<string | null>(null);
  const bookingLock = useRef(false);

  // For someone else
  const [forSomeoneElse, setForSomeoneElse] = useState(false);
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isSurprise, setIsSurprise] = useState(false);

  /* -- helpers -- */
  const saveEmail = (e: string) => { try { localStorage.setItem(SAVED_EMAIL_KEY, e); } catch {} };
  const clearSavedEmail = () => { try { localStorage.removeItem(SAVED_EMAIL_KEY); } catch {} };
  const handleSwitchAccount = () => {
    clearSavedEmail();
    setEmail(""); setClientId(null); setIsMember(false); setMemberTier(null);
    setMemberFirstName(null); setHasCardOnFile(false); setHomeLocation(null);
    setMemberCheckDone(false); setWelcomeShowEmail(false); setWelcomeResult(null);
    setSelectedTreatment(null); setSelectedBoosts([]); setSelectedSlot(null);
    setStep("welcome");
  };

  /* -- computed -- */
  const treatments = category === "facial" ? FACIAL_TREATMENTS : MASSAGE_TREATMENTS;
  const boosts = category === "facial" ? FACIAL_BOOSTS : MASSAGE_BOOSTS;
  const filteredTreatments = treatments.filter((t) => t.tier === treatmentTierFilter);
  const selectedPrice = selectedTreatment ? getTreatmentPrice(selectedTreatment.tier, isMember, memberTier) : 0;

  useEffect(() => { if (memberTier) setTreatmentTierFilter(memberTier); }, [memberTier]);

  // Welcome step: member check then advance to category
  const [welcomeShowEmail, setWelcomeShowEmail] = useState(false);
  const [welcomeResult, setWelcomeResult] = useState<"found" | "not_found" | null>(null);
  const handleWelcomeMemberCheck = async () => {
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) { setError("Please enter a valid email address"); return; }
    setLoading(true); setError(null); setWelcomeResult(null);
    try {
      const res = await fetch(`/api/membership/check?email=${encodeURIComponent(normalized)}`);
      const data = res.ok ? await res.json() : {};
      setClientId(data.clientId ?? null);
      setIsMember(data.isMember ?? false);
      setMemberTier(data.tier ?? null);
      setMemberFirstName(data.firstName ?? null);
      setHasCardOnFile(data.hasCardOnFile ?? false);
      setHomeLocation(data.homeLocation ?? null);
      setMemberCheckDone(true);
      if (data.isMember && data.tier) {
        saveEmail(normalized);
        setTreatmentTierFilter(data.tier);
        setWelcomeResult("found");
        setTimeout(() => setStep("category"), 1500);
      } else {
        setWelcomeResult("not_found");
      }
    } catch {
      setWelcomeResult("not_found");
    }
    setLoading(false);
  };

  // Optional member check from treatment step shortcut
  const handleMemberCheck = async () => {
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) { setError("Please enter a valid email address"); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/membership/check?email=${encodeURIComponent(normalized)}`);
      if (!res.ok) { setMemberCheckDone(true); setShowMemberInput(false); setLoading(false); return; }
      const data = await res.json();
      setClientId(data.clientId ?? null);
      setIsMember(data.isMember ?? false);
      setMemberTier(data.tier ?? null);
      setMemberFirstName(data.firstName ?? null);
      setHasCardOnFile(data.hasCardOnFile ?? false);
      setHomeLocation(data.homeLocation ?? null);
      setMemberCheckDone(true);
      setShowMemberInput(false);
      if (data.isMember && data.tier) setTreatmentTierFilter(data.tier);
    } catch {
      setMemberCheckDone(true);
      setShowMemberInput(false);
    }
    finally { setLoading(false); }
  };

  /* -- availability -- */
  const [staffSchedules, setStaffSchedules] = useState<Record<number, { start: string; end: string }[]>>({});
  const [schedulesLoaded, setSchedulesLoaded] = useState(false);
  useEffect(() => {
    if (step !== "time" || !selectedTreatment) return;
    let cancelled = false;
    setLoading(true); setSlots([]); setSelectedSlot(null); setStaffSchedules({}); setSchedulesLoaded(false);
    fetch(`/api/service/availability?sessionTypeId=${selectedTreatment.id}&date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const newSlots: DisplaySlot[] = data.slots ?? [];
        setSlots(newSlots);
        const seen = new Map<number, string>();
        for (const s of newSlots) { if (s.staffId && s.staffName && !seen.has(s.staffId)) seen.set(s.staffId, s.staffName); }
        setAllTherapists(Array.from(seen.entries()).map(([id, name]) => ({ id, name })));
        // Fetch staff schedules for time-extension filtering
        const staffIds = [...new Set(newSlots.map((s) => s.staffId).filter((id): id is number => id !== null))];
        if (staffIds.length > 0) {
          Promise.all(staffIds.map((sid) =>
            fetch(`/api/service/staff-schedule?staffId=${sid}&date=${selectedDate}`)
              .then((r) => r.json()).then((d) => ({ staffId: sid, appointments: Array.isArray(d.appointments) ? d.appointments : [] }))
              .catch(() => ({ staffId: sid, appointments: [] as { start: string; end: string }[] }))
          )).then((results) => {
            if (cancelled) return;
            const map: Record<number, { start: string; end: string }[]> = {};
            for (const r of results) map[r.staffId] = r.appointments;
            setStaffSchedules(map);
            setSchedulesLoaded(true);
          });
        } else {
          setSchedulesLoaded(true);
        }
      })
      .catch(() => { if (!cancelled) setError("Failed to load availability. Please try again or call (303) 476-6150."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [step, selectedTreatment, selectedDate]);

  /* -- time-extension filtering + displayed slots -- */
  const totalExtMinutes = selectedBoosts.reduce((sum, b) => sum + b.addsMinutes, 0);
  const displayedSlots = (() => {
    // Wait for staff schedules before showing slots when boosts add time
    if (totalExtMinutes > 0 && !schedulesLoaded) return [];
    let s = slots;

    // Filter out slots where time-extension boosts won't fit
    if (totalExtMinutes > 0 && selectedTreatment) {
      const staffLastSlot: Record<number, Date> = {};
      for (const sl of slots) {
        if (sl.staffId === null) continue;
        const t = parseMindbodyDateTime(sl.startDateTime);
        if (!staffLastSlot[sl.staffId] || t > staffLastSlot[sl.staffId]) staffLastSlot[sl.staffId] = t;
      }

      s = s.filter((slot) => {
        const slotStart = parseMindbodyDateTime(slot.startDateTime);
        const serviceEnd = new Date(slotStart);
        serviceEnd.setMinutes(serviceEnd.getMinutes() + selectedTreatment.durationMinutes);
        const extensionsEnd = new Date(serviceEnd);
        extensionsEnd.setMinutes(extensionsEnd.getMinutes() + totalExtMinutes);

        // Don't allow if extensions run past closing time
        const closingHour = getClosingHour("denver-larimer", slotStart.getDay());
        const closing = new Date(slotStart);
        closing.setHours(closingHour, 0, 0, 0);
        if (extensionsEnd > closing) return false;

        // Don't allow if extensions run past therapist's shift end
        if (slot.staffId !== null) {
          const lastSlot = staffLastSlot[slot.staffId];
          if (lastSlot) {
            const shiftEnd = new Date(lastSlot);
            shiftEnd.setMinutes(shiftEnd.getMinutes() + selectedTreatment.durationMinutes);
            if (extensionsEnd > shiftEnd) return false;
          }

          // Check against staff's next booked appointment
          const appts = staffSchedules[slot.staffId];
          if (appts && appts.length > 0) {
            const nextAppt = appts.map((a) => parseMindbodyDateTime(a.start)).filter((start) => start > serviceEnd).sort((a, b) => a.getTime() - b.getTime())[0];
            if (nextAppt && extensionsEnd > nextAppt) return false;
          }
        }
        return true;
      });
    }

    if (filteredTherapist !== null) s = s.filter((sl) => sl.staffId === filteredTherapist);
    const req = selectedBoosts.map((b) => b.resourceId).filter((r): r is number => r !== undefined);
    const hasResourceData = s.some((sl) => sl.availableResourceIds.length > 0);
    if (req.length > 0 && hasResourceData) s = s.filter((sl) => req.every((r) => sl.availableResourceIds.includes(r)));
    return s;
  })();

  const grouped = (() => {
    const g: Record<string, DisplaySlot[]> = { morning: [], midday: [], afternoon: [], evening: [] };
    for (const s of displayedSlots) {
      const h = parseMindbodyDateTime(s.startDateTime).getHours();
      if (h < 12) g.morning.push(s); else if (h < 14) g.midday.push(s); else if (h < 17) g.afternoon.push(s); else g.evening.push(s);
    }
    return g;
  })();

  /* ----------------------------------------------------------------
     HANDLERS
  ---------------------------------------------------------------- */

  const handleCategorySelect = (cat: Category) => { setCategory(cat); setSelectedTreatment(null); setSelectedBoosts([]); setActiveConcern(null); setStep("treatment"); window.dataLayer?.push({ event: "booking_start", booking_flow: cat }); };


  const handleTreatmentSelect = (t: Treatment) => { setSelectedTreatment(t); setSelectedBoosts([]); window.dataLayer?.push({ event: "booking_service_selected", booking_flow: category, service_name: t.name, service_tier: t.tier }); setStep(BOOST_LIMITS[t.tier] === 0 ? "time" : "boosts"); };
  const boostLimit = selectedTreatment ? BOOST_LIMITS[selectedTreatment.tier] ?? 2 : 2;
  const handleBoostToggle = (boost: Boost) => {
    setSelectedBoosts((prev) => {
      const alreadySelected = prev.find((b) => b.id === boost.id);
      if (alreadySelected) return prev.filter((b) => b.id !== boost.id);
      if (prev.length >= boostLimit) return prev; // at limit
      return [...prev, boost];
    });
  };
  const handleBoostsContinue = () => { window.dataLayer?.push({ event: "booking_boosts_done", booking_flow: category, boosts: selectedBoosts.map((b) => b.name) }); setStep("time"); };

  const handleTimeContinue = () => {
    if (!selectedSlot) return;
    window.dataLayer?.push({ event: "booking_time_selected", booking_flow: category, booking_date: selectedDate });
    // If member already identified via shortcut and has card on file, skip to confirm
    if (memberCheckDone && hasCardOnFile && clientId) {
      setStep("confirm");
      return;
    }
    // If member identified but no card, go to account with card form
    if (memberCheckDone && clientId) {
      setCardContext("add_card");
      setStep("account");
      return;
    }
    // If member identified but new client
    if (memberCheckDone && !clientId) {
      setCardContext("create_account");
      setStep("account");
      return;
    }
    // Default: go to account for email entry
    setCardContext(null);
    setStep("account");
  };

  // Account step: email check + card handling
  const handleAccountEmailSubmit = async () => {
    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) { setError("Please enter a valid email address"); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/membership/check?email=${encodeURIComponent(normalized)}`);
      if (res.ok) {
        const data = await res.json();
        setClientId(data.clientId ?? null);
        setIsMember(data.isMember ?? false);
        setMemberTier(data.tier ?? null);
        setMemberFirstName(data.firstName ?? null);
        setHasCardOnFile(data.hasCardOnFile ?? false);
        setHomeLocation(data.homeLocation ?? null);
        setMemberCheckDone(true);
        saveEmail(normalized);
        window.dataLayer?.push({ event: "booking_email_entered", booking_flow: category, client_type: data.found ? "returning" : "new", is_member: data.isMember ?? false });
        // If member with card on file — skip straight to confirm
        if (data.hasCardOnFile && data.clientId) {
          setCardContext(null);
          setStep("confirm");
          return;
        }
        // Known client but no card
        if (data.clientId) {
          setCardContext("add_card");
        } else {
          setCardContext("create_account");
        }
      } else {
        // API error — continue as unknown
        setCardContext("create_account");
        setMemberCheckDone(true);
      }
    } catch {
      setCardContext("create_account");
      setMemberCheckDone(true);
    }
    finally { setLoading(false); }
  };

  const clearCardRefs = () => {
    if (cardHolderRef.current) cardHolderRef.current.value = "";
    if (cardNumberRef.current) cardNumberRef.current.value = "";
    if (expMonthRef.current) expMonthRef.current.value = "";
    if (expYearRef.current) expYearRef.current.value = "";
    if (postalCodeRef.current) postalCodeRef.current.value = "";
  };

  const validateCardFields = (): string | null => {
    const holder = cardHolderRef.current?.value?.trim() ?? "";
    const digits = onlyDigits(cardNumberRef.current?.value ?? "");
    const month = expMonthRef.current?.value ?? "";
    const year = expYearRef.current?.value ?? "";
    const postal = postalCodeRef.current?.value?.trim() ?? "";
    if (!holder) return "Name on card is required";
    if (digits.length < 13 || digits.length > 19) return "Invalid card number";
    if (!luhnCheck(digits)) return "Invalid card number";
    if (!month || !year) return "Expiration date is required";
    if (new Date(parseInt(year), parseInt(month), 0) < new Date()) return "Card is expired";
    if (postal.length < 3) return "Postal code is required";
    return null;
  };

  const handleSaveCardAndContinue = async () => {
    const err = validateCardFields();
    if (err) { setError(err); return; }
    setCardSaving(true); setError(null);
    const cardHolder = cardHolderRef.current?.value?.trim() ?? "";
    const digits = onlyDigits(cardNumberRef.current?.value ?? "");
    const expMonth = expMonthRef.current?.value ?? "";
    const expYear = expYearRef.current?.value ?? "";
    const postalCode = postalCodeRef.current?.value?.trim() ?? "";
    const cardType = detectCardType(digits);
    try {
      if (cardContext === "create_account") {
        if (!firstName.trim() || !lastName.trim() || !mobilePhone.trim()) { setError("First name, last name, and phone are required"); setCardSaving(false); return; }
        const res = await fetch("/api/mindbody/add-client-with-card", { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), email: normalizeEmail(email), mobilePhone: mobilePhone.trim(), cardNumber: digits, expMonth, expYear, postalCode, cardHolder, cardType, sendPromotionalEmails: marketingOptIn, sendPromotionalTexts: marketingOptIn }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to create account");
        setClientId(data.clientId);
      } else {
        const res = await fetch("/api/mindbody/update-client-card", { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, cardNumber: digits, expMonth, expYear, postalCode, cardHolder, cardType }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to save card");
      }
      clearCardRefs();
      window.dataLayer?.push({ event: "booking_card_entered", booking_flow: category });
      setStep("confirm");
    } catch (e: any) { setError(e?.message ? `${e.message} Call (303) 476-6150 for help.` : "Failed to save card. Call (303) 476-6150 for help."); }
    finally { setCardSaving(false); }
  };

  const handleFinalConfirmAndBook = async () => {
    if (bookingLock.current) return;
    bookingLock.current = true;
    window.dataLayer?.push({ event: "booking_confirmed", booking_flow: category });
    setStep("booking"); setError(null);
    try {
      const noteParts = [`Booked online \u2014 ${selectedTreatment?.name}`];
      if (forSomeoneElse && guestFirstName && guestPhone) {
        noteParts.push(`BOOKING FOR: ${[guestFirstName, guestLastName].filter(Boolean).join(" ")}`, `Phone: ${guestPhone}`);
        if (guestEmail) noteParts.push(`Email: ${guestEmail}`);
        if (isSurprise) noteParts.push("\u26A0\uFE0F SURPRISE \u2014 do not contact guest");
      }
      const res = await fetch("/api/service/book", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, sessionTypeId: selectedTreatment!.id, startDateTime: selectedSlot!.startDateTime, staffId: selectedSlot!.staffId, staffRequested: filteredTherapist !== null, addOnIds: selectedBoosts.map((b) => b.id), notes: noteParts.join(" | ") }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      if (data.addOns?.some((a: any) => !a.success)) setBoostWarning("Some boosts couldn\u2019t be added automatically. Call (303) 476-6150 to add them.");
      // Fire conversions
      const gtagFn = (window as any).gtag;
      if (typeof gtagFn === "function") {
        gtagFn("event", "conversion", { send_to: "AW-17421817568/T3o8CK-LoukbEOCtr_NA", transaction_id: `${clientId}-${Date.now()}` });
        gtagFn("event", "conversion", { send_to: "AW-17421817568/ArEMCLWJ0P0bEOCtr_NA", transaction_id: `${clientId}-${Date.now()}-svc` });
      }
      window.dataLayer?.push({ event: "service_booking_complete", booking_flow: category, service_name: selectedTreatment?.name, service_tier: selectedTreatment?.tier, member_tier: memberTier ?? "none", is_member: isMember });
      setStep("done");
    } catch (e: any) { setError(e?.message ? `${e.message} Call (303) 476-6150 to complete your booking.` : "Booking failed. Call (303) 476-6150 to complete your booking."); setStep("confirm"); }
    finally { bookingLock.current = false; }
  };

  const handleBack = () => {
    setError(null);
    if (step === "account" && cardContext) {
      // If on card form within account, go back to email portion
      setCardContext(null);
      return;
    }
    const map: Partial<Record<Step, Step>> = { category: "welcome", treatment: "category", boosts: "treatment", time: "boosts", account: "time", confirm: "account" };
    let prev = map[step];
    // Skip boosts step for Ultimate (0 boosts allowed)
    if (prev === "boosts" && selectedTreatment && BOOST_LIMITS[selectedTreatment.tier] === 0) prev = "treatment";
    if (prev) setStep(prev);
  };

  /* -- styles (matched to book-service) -- */
  const inputClass = "w-full rounded-xl border border-[#113D33]/20 bg-white px-4 py-3 text-[#113D33] placeholder:text-[#113D33]/40 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-base transition-shadow duration-200";
  const primaryBtn = "w-full rounded-full bg-[#113D33] text-white py-4 text-lg font-semibold hover:bg-[#0e3029] active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:active:scale-100 shadow-lg";
  const secondaryBtn = "w-full rounded-full border-2 border-[#113D33] text-[#113D33] py-3 text-base font-semibold hover:bg-[#113D33] hover:text-white active:scale-[0.98] transition-all duration-200";

  /* (progress bar is rendered by ProgressBarNew component) */

  /* ================================================================
     RENDER
  ================================================================ */

  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance">
      {/* Sticky header — matches book-service: top-[56px] to sit below nav */}
      {step !== "welcome" && step !== "done" && (
        <div
          data-booking-header="true"
          className="sticky top-[56px] z-30 border-b border-[#113D33]/10 bg-[#F7F4E9]/95 backdrop-blur-md"
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              {step !== "booking" && step !== "category" ? (
                <button
                  type="button"
                  onClick={handleBack}
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
                {step === "category" ? "" :
                 step === "treatment" ? "" :
                 step === "boosts" ? "Customize with boosts" :
                 step === "time" ? "Pick your therapist & time" :
                 step === "account" ? (cardContext ? (cardContext === "create_account" ? "Create your account" : "Payment details") : "Your account") :
                 step === "confirm" ? "Review and confirm" :
                 step === "booking" ? "Booking your appointment" : ""}
              </div>
              <span className="w-16" />
            </div>
            {step !== "booking" && (
              <ProgressBarNew step={step} />
            )}
          </div>
        </div>
      )}

      <div className={`px-4 pb-20 ${step === "welcome" ? "pt-16 md:pt-20" : "pt-24 md:pt-28"}`}>
        <div className={`mx-auto ${step === "welcome" || step === "category" || step === "treatment" ? "max-w-3xl" : "max-w-xl"}`}>
        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm flex items-start justify-between gap-2">
              <span dangerouslySetInnerHTML={{ __html: error.replace(/\(303\) 476-6150/g, '<a href="tel:+13034766150" class="underline font-semibold">(303) 476-6150</a>') }} />
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 shrink-0">&times;</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent identity banner — members + remembered guests */}
        {memberCheckDone && clientId && ["category", "treatment", "boosts", "time", "account", "confirm"].includes(step) && (
          <div className={`mb-4 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 ${isMember ? "bg-[#113D33] text-white" : "bg-white border border-[#113D33]/10 text-[#113D33]"}`}>
            {isMember && <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            <p className="text-sm">
              <span className="font-bold">{memberFirstName ?? email}</span>
              {isMember && <> · <span className="capitalize font-semibold">{memberTier}</span> Member</>}
              {homeLocation && <span className={isMember ? "text-white/60 ml-1" : "text-[#113D33]/40 ml-1"}>· {homeLocation}</span>}
            </p>
            <button onClick={handleSwitchAccount} className={`text-xs underline underline-offset-2 ml-2 ${isMember ? "text-white/50 hover:text-white" : "text-[#113D33]/40 hover:text-[#113D33]"}`}>Switch</button>
          </div>
        )}

        {/* ===== WELCOME ===== */}
        {step === "welcome" && loading && (
          <div className="text-center pt-24">
            <div className="inline-block w-8 h-8 border-3 border-[#113D33]/20 border-t-[#113D33] rounded-full animate-spin" />
            <p className="mt-3 text-sm text-[#113D33]/50">Loading your account...</p>
          </div>
        )}
        {step === "welcome" && !loading && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-8 md:pt-12">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#4A776D] mb-4">Sway Wellness Spa</p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-3 leading-tight">Book Your Experience</h1>
            <p className="text-base md:text-lg text-[#113D33]/60 max-w-md mx-auto mb-10">How would you like to get started?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Member card */}
              <div className="bg-white rounded-2xl border border-[#113D33]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {!welcomeShowEmail ? (
                  <button onClick={() => setWelcomeShowEmail(true)} className="w-full p-6 text-left">
                    <div className="w-10 h-10 rounded-full bg-[#113D33] flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#113D33] mb-1">I&apos;m a Member</h3>
                    <p className="text-sm text-[#113D33]/50">Sign in for your member pricing &amp; perks</p>
                  </button>
                ) : welcomeResult === "found" ? (
                  <div className="p-6 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#4A776D]/10 flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-[#4A776D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#113D33]">Welcome back, {memberFirstName}!</h3>
                    <p className="text-sm text-[#4A776D] font-semibold capitalize">{memberTier} Member</p>
                    {homeLocation && <p className="text-xs text-[#113D33]/50 mt-1">{homeLocation}</p>}
                  </div>
                ) : welcomeResult === "not_found" ? (
                  <div className="p-6 space-y-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                      <p className="text-sm text-amber-800">We didn&apos;t find a membership with this email.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setWelcomeResult(null); setEmail(""); }}
                        className="flex-1 py-3 rounded-xl border border-[#113D33]/15 text-sm font-semibold text-[#113D33] hover:bg-[#113D33]/5 transition-colors">
                        Try another email
                      </button>
                      <button onClick={() => setStep("category")}
                        className="flex-1 py-3 rounded-xl bg-[#113D33] text-white text-sm font-semibold hover:bg-[#0e3029] transition-colors">
                        Continue as guest
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#113D33]">Enter your email</h3>
                      <button onClick={() => { setWelcomeShowEmail(false); setError(null); setWelcomeResult(null); }} className="text-xs text-[#113D33]/40 hover:text-[#113D33]">✕</button>
                    </div>
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleWelcomeMemberCheck()}
                      placeholder="you@example.com" className={inputClass} autoFocus
                    />
                    <button onClick={handleWelcomeMemberCheck} disabled={loading || !email.trim()}
                      className="w-full py-3 bg-[#113D33] text-white rounded-xl text-sm font-semibold disabled:opacity-30 transition-opacity">
                      {loading ? "Checking..." : "Continue"}
                    </button>
                  </div>
                )}
              </div>

              {/* New guest card */}
              <button onClick={() => setStep("category")}
                className="bg-white rounded-2xl border border-[#113D33]/10 p-6 text-left shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#4A776D]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#4A776D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#113D33] mb-1">Continue as Guest</h3>
                <p className="text-sm text-[#113D33]/50">Browse treatments &amp; book your visit</p>
              </button>
            </div>

            {/* Phone CTA */}
            <p className="mt-8 text-sm text-[#113D33]/40">
              Prefer to call? <a href="tel:+13034766150" className="text-[#4A776D] underline underline-offset-2 font-medium">(303) 476-6150</a>
            </p>
          </motion.div>
        )}

        {/* ===== CATEGORY ===== */}
        {step === "category" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            {/* Location pill */}
            <div className="inline-flex items-center gap-2 bg-[#113D33]/5 rounded-full px-5 py-2 mb-5">
              <svg className="w-4 h-4 text-[#113D33]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold text-[#113D33]">Sway Larimer</span>
              <span className="text-[#113D33]/30">|</span>
              <Link href="/locations" className="text-sm text-[#4A776D] hover:text-[#113D33] transition-colors font-medium">
                Switch location
              </Link>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-4 leading-tight">
              Book Your Experience
            </h1>
            <p className="text-base md:text-lg text-[#113D33]/60 max-w-xl mx-auto">
              Choose your treatment to get started.
            </p>
            <p className="text-[11px] text-[#113D33]/40 mt-3 uppercase tracking-wider">
              Voted #4 Best Day Spa in America — USA Today 10Best
            </p>

            {/* Main category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              {([
                { cat: "massage" as Category, label: "Massage", img: "/assets/massage2.jpg", sub: "Deep Tissue, Sports, Salt Stone & more", price: "From $139", dur: "50 min" },
                { cat: "facial" as Category, label: "Facial", img: "/assets/facialExperiences.png", sub: "Forever Young, LED, Microcurrent & more", price: "From $139", dur: "50 min" },
              ]).map((item) => (
                <button key={item.cat} onClick={() => handleCategorySelect(item.cat)}
                  className="group relative overflow-hidden rounded-2xl bg-white/70 border border-[#113D33]/10 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 text-left">
                  <div className="relative h-44 md:h-52 w-full overflow-hidden">
                    <Image src={item.img} alt={item.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-white/95 rounded-lg px-3 py-1.5 text-right">
                        <div className="text-sm font-bold text-[#113D33]">{item.price}</div>
                        <div className="text-[10px] text-[#113D33]/50">{item.dur}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold leading-tight text-[#113D33]">{item.label}</h2>
                        <p className="text-sm text-[#113D33]/50 mt-0.5">{item.sub}</p>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#113D33]/5 flex items-center justify-center group-hover:bg-[#113D33]/10 transition-colors">
                        <svg className="w-4 h-4 text-[#113D33] transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Aescape & Remedy Room — link to their booking flows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 mb-12">
              {([
                { label: "Aescape Robot Massage", img: "/assets/aescape-treatment.jpg", sub: "AI-powered precision massage", price: "From $139", dur: "30 min", href: "/locations/denver-larimer/book-aescape/" },
                { label: "Remedy Room", img: "/assets/remedy-room.jpg", sub: "Sauna, cold plunge, compression & LED", price: "$99", dur: "40 min", href: "/locations/denver-larimer/book-remedy-room/" },
              ]).map((item) => (
                <Link key={item.label} href={item.href}
                  className="group relative overflow-hidden rounded-2xl bg-white/70 border border-[#113D33]/10 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left">
                  <div className="relative h-36 md:h-44 w-full overflow-hidden">
                    <Image src={item.img} alt={item.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-white/95 rounded-lg px-3 py-1.5 text-right">
                        <div className="text-sm font-bold text-[#113D33]">{item.price}</div>
                        <div className="text-[10px] text-[#113D33]/50">{item.dur}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-base font-semibold leading-tight text-[#113D33]">{item.label}</h2>
                        <p className="text-sm text-[#113D33]/50 mt-0.5">{item.sub}</p>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#113D33]/5 flex items-center justify-center group-hover:bg-[#113D33]/10 transition-colors">
                        <svg className="w-4 h-4 text-[#113D33] transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="bg-[#113D33] rounded-2xl p-6 md:p-8 text-center text-white">
              <p className="text-base md:text-lg mb-2">Prefer to book with staff?</p>
              <a href="tel:3034766150" className="text-2xl md:text-3xl font-bold hover:opacity-80 transition">(303) 476-6150</a>
            </div>
          </motion.div>
        )}

        {/* ===== EMAIL ===== */}
        {/* ===== TREATMENT ===== */}
        {step === "treatment" && (() => {
          const activePricingTier = treatmentTierFilter;
          const tierIncluded = isMember && memberTier && TIER_RANK[memberTier] >= TIER_RANK[treatmentTierFilter];
          const savings = TIER_PRICING[activePricingTier].dropIn - TIER_PRICING[activePricingTier].member;
          return (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Hero — compact for members, full for guests */}
            <div className="text-center mb-2">
              {!isMember && (
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#4A776D] mb-4">
                  Sway Wellness Spa
                </p>
              )}
              <h1 className={`font-bold text-[#113D33] leading-tight ${isMember ? "text-2xl md:text-3xl mb-2" : "text-3xl md:text-5xl mb-4"}`}>
                {category === "massage" ? "Massage" : "Facial"}
              </h1>
              {!isMember && (
                <>
                  <p className="text-base md:text-lg text-[#113D33]/60 max-w-xl mx-auto mb-4">
                    {category === "massage"
                      ? "Expert therapists, personalized pressure, total relaxation."
                      : "Personalized, result-driven facials designed to support healthy, radiant skin — customized by your esthetician."}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
                    <ReviewBadge />
                    <span className="hidden sm:block opacity-30">|</span>
                    <ClassPassBadge />
                  </div>
                </>
              )}
            </div>

            {/* Tier toggle */}
            <div className="flex justify-center">
              <div className="inline-flex bg-[#113D33]/10 rounded-full p-1 gap-0.5">
                {(["essential", "premier", "ultimate"] as const).map((tier) => {
                  const isActive = treatmentTierFilter === tier;
                  const isMyTier = isMember && memberTier === tier;
                  return (
                    <button key={tier} onClick={() => { setTreatmentTierFilter(tier); setExpandedTreatmentId(null); setActiveConcern(null); }}
                      className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${isActive ? "bg-[#113D33] text-white shadow-sm" : "text-[#113D33]/60 hover:text-[#113D33]"} ${isMyTier && !isActive ? "ring-1 ring-[#9ABFB3]" : ""}`}>
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      {isMyTier && <span className="ml-1 text-xs">{isActive ? " ✓" : ""}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animated price + concern filters + cards — all keyed to tier */}
            <AnimatePresence mode="wait">
              <motion.div
                key={treatmentTierFilter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Concern filters — hide when tier has ≤3 treatments */}
                {filteredTreatments.length > 3 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {(category === "facial" ? FACIAL_CONCERNS : MASSAGE_CONCERNS).map((c) => {
                      const isActive = activeConcern === c.id;
                      const matchCount = filteredTreatments.filter((t) => t.concerns?.includes(c.id)).length;
                      if (matchCount === 0) return null;
                      return (
                        <button
                          key={c.id}
                          onClick={() => { setActiveConcern(isActive ? null : c.id); setExpandedTreatmentId(null); }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-[#4A776D] text-white shadow-sm"
                              : "bg-[#113D33]/[0.06] text-[#113D33]/60 hover:bg-[#113D33]/[0.1] hover:text-[#113D33]"
                          }`}>
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                )}
                {/* Pricing / included info */}
                <div className="text-center mb-4">
                  {tierIncluded ? (
                    <p className="text-sm text-[#4A776D] font-medium">
                      <svg className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Included in your {memberTier} membership · {category === "facial" ? (
                        treatmentTierFilter === "essential" ? "50 min" :
                        treatmentTierFilter === "premier" ? "50 min + dermapore technology" :
                        "50–60 min + tech enhancements"
                      ) : (
                        treatmentTierFilter === "essential" ? "50 min" :
                        treatmentTierFilter === "premier" ? "50–70 min + advanced techniques" :
                        "70–90 min + advanced techniques"
                      )}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-[#113D33]/60">${TIER_PRICING[treatmentTierFilter].dropIn} drop-in · <span className="text-[#4A776D] font-semibold">${TIER_PRICING[treatmentTierFilter].member}/mo as member</span></p>
                      <p className="text-xs text-[#113D33]/40 mt-1.5 max-w-lg mx-auto">
                        {category === "facial" ? (
                          treatmentTierFilter === "essential" ? "50-minute customized facial" :
                          treatmentTierFilter === "premier" ? "50 min — targeted products for your skin concern + dermapore technology" :
                          "50–60 min — tech enhancements + scalp/hand treatment"
                        ) : (
                          treatmentTierFilter === "essential" ? "50-minute customized massage" :
                          treatmentTierFilter === "premier" ? "+20 min duration for swedish, or advanced techniques for targeted results" :
                          "+20 min duration added to advanced technique massages"
                        )}
                      </p>
                    </>
                  )}
                </div>

                {/* Treatment cards — expandable, tier-distinct */}
                <div className="space-y-2.5">
                  {filteredTreatments.map((t, i) => {
                    const isUltimate = t.tier === "ultimate";
                    const isPremier = t.tier === "premier";
                    const isExpanded = expandedTreatmentId === t.id;
                    const matchesConcern = !activeConcern || (t.concerns?.includes(activeConcern) ?? false);
                    return (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: matchesConcern ? 1 : 0.35, y: 0, scale: matchesConcern ? 1 : 0.98 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                      className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                        isUltimate
                          ? "bg-[#113D33]/[0.04] border-[#113D33]/15"
                          : isPremier
                          ? "bg-white border-l-[3px] border-l-[#4A776D] border-[#113D33]/10"
                          : "bg-white border-[#113D33]/8"
                      } ${isExpanded ? "shadow-md" : "hover:shadow-sm"}`}>
                      {/* Collapsed row — always visible */}
                      <button
                        onClick={() => setExpandedTreatmentId(isExpanded ? null : t.id)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            {isUltimate && <span className="text-[#4A776D] text-xs">✦</span>}
                            <h3 className="font-semibold text-[15px] text-[#113D33] leading-tight">{t.name}</h3>
                          </div>
                          <p className="text-[13px] text-[#113D33]/40 mt-0.5">{t.duration}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            {tierIncluded ? (
                              <span className="text-sm font-bold text-[#4A776D]">Included</span>
                            ) : (
                              <span className="text-sm font-bold text-[#113D33]">${TIER_PRICING[t.tier].dropIn}</span>
                            )}
                          </div>
                          <svg className={`w-4 h-4 text-[#113D33]/30 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      {/* Expanded details */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden">
                            <div className="px-5 pb-4 pt-0">
                              <p className="text-sm text-[#113D33]/60 leading-relaxed mb-4">{t.description}</p>
                              <button
                                onClick={() => handleTreatmentSelect(t)}
                                className="w-full bg-[#113D33] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#0a2b23] transition-colors">
                                Select {t.name.replace(/^(Essential |Premier |Ultimate )/, "")}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          );
        })()}

        {/* ===== BOOSTS ===== */}
        {step === "boosts" && (() => {
          const boostGroups = [
            { key: "boost", label: "Boost", subtitle: "No extra time", price: isMember ? "$10" : "$20", items: boosts.filter((b) => b.type === "boost") },
            { key: "boost_plus", label: "Boost Plus", subtitle: "+10 minutes", price: isMember ? "$20" : "$40", items: boosts.filter((b) => b.type === "boost_plus") },
            { key: "boost_pro", label: "Boost Pro", subtitle: "+20 minutes", price: isMember ? "$25" : "$50", items: boosts.filter((b) => b.type === "boost_pro") },
          ].filter((g) => g.items.length > 0);

          return (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Service recap card */}
            {selectedTreatment && (
              <div className="bg-white rounded-2xl border border-[#113D33]/10 shadow-sm overflow-hidden">
                <div className="relative h-32 w-full">
                  <Image src={category === "facial" ? "/assets/facialExperiences.png" : "/assets/massage2.jpg"} alt={selectedTreatment.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 600px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-semibold text-base">{selectedTreatment.name}</p>
                    <p className="text-white/70 text-xs mt-0.5">{selectedTreatment.duration} · ${selectedPrice}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#113D33]">Customize your experience</h2>
              <p className="mt-1 text-sm text-[#113D33]/60">
                Add science-backed enhancements to your {category}.
                {boostLimit < 3 && <span className="block mt-1 text-[#4A776D] font-medium">Up to {boostLimit} boost{boostLimit > 1 ? "s" : ""} with your {selectedTreatment?.tier} treatment.</span>}
              </p>
            </div>

            {/* Member savings banner */}
            {isMember ? (
              <div className="bg-[#113D33] text-white rounded-xl px-4 py-3 text-center">
                <p className="text-sm font-semibold">50% off all boosts with your membership ✓</p>
              </div>
            ) : (
              <div className="bg-[#113D33]/5 border border-[#113D33]/10 rounded-xl px-4 py-3 text-center">
                <p className="text-sm text-[#113D33]">
                  <span className="font-bold">Members save 50%</span> on every boost.{" "}
                  <Link href="/locations/denver-larimer/membership" className="underline underline-offset-2 font-semibold text-[#4A776D]">Join the club &rarr;</Link>
                </p>
              </div>
            )}

            {/* Grouped boosts */}
            {boostGroups.map((group) => (
              <div key={group.key}>
                {/* Group header */}
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#113D33] uppercase tracking-wide">{group.label}</h3>
                      <span className="text-[11px] text-[#4A776D] font-semibold bg-[#4A776D]/10 rounded-full px-2.5 py-0.5">{group.subtitle}</span>
                    </div>
                    <p className="text-xs text-[#113D33]/40 mt-0.5">
                      {isMember ? <>{group.price} each <span className="line-through opacity-60">{group.key === "boost" ? "$20" : group.key === "boost_plus" ? "$40" : "$50"}</span></> : <>{group.price} each · {group.key === "boost" ? "$10" : group.key === "boost_plus" ? "$20" : "$25"} for members</>}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {group.items.map((b) => {
                    const sel = selectedBoosts.some((sb) => sb.id === b.id);
                    const atLimit = !sel && selectedBoosts.length >= boostLimit;
                    return (
                      <button key={b.id} onClick={() => !atLimit && handleBoostToggle(b)} disabled={atLimit}
                        className={`text-left rounded-xl border px-4 py-3.5 transition-all ${sel ? "bg-[#113D33] border-[#113D33] text-white" : atLimit ? "bg-white/50 border-[#113D33]/5 opacity-40 cursor-not-allowed" : "bg-white border-[#113D33]/10 hover:border-[#113D33]/25"}`}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className={`font-semibold text-sm leading-tight ${sel ? "text-white" : "text-[#113D33]"}`}>{b.name.replace(/ Boost$| Boost Plus$| Boost Pro$/, "")}</h4>
                            <p className={`text-xs mt-0.5 leading-snug ${sel ? "text-white/70" : "text-[#113D33]/50"}`}>{b.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition ${sel ? "bg-white border-white" : "border-[#113D33]/20"}`}>
                            {sel && <svg className="w-3 h-3 text-[#113D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button onClick={handleBoostsContinue} className={primaryBtn}>{selectedBoosts.length > 0 ? `Continue with ${selectedBoosts.length} boost${selectedBoosts.length > 1 ? "s" : ""}` : "Skip — no boosts"}</button>
          </motion.div>
          );
        })()}

        {/* ===== TIME ===== */}
        {step === "time" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Treatment recap card */}
            {selectedTreatment && (
              <div className="bg-white rounded-2xl border border-[#113D33]/10 shadow-sm overflow-hidden">
                <div className="relative h-28 w-full">
                  <Image src={category === "facial" ? "/assets/facialExperiences.png" : "/assets/massage2.jpg"} alt={selectedTreatment.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 600px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-semibold text-base">{selectedTreatment.name}</p>
                      <p className="text-white/70 text-xs mt-0.5">
                        {selectedTreatment.duration}
                        {selectedBoosts.length > 0 && ` + ${selectedBoosts.reduce((s, b) => s + b.addsMinutes, 0)} min boosts`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{isMember && memberTier && TIER_RANK[memberTier] >= TIER_RANK[selectedTreatment.tier] ? "Included" : `$${selectedPrice}`}</p>
                    </div>
                  </div>
                </div>
                {selectedBoosts.length > 0 && (
                  <div className="px-4 py-2 border-t border-[#113D33]/5 flex flex-wrap gap-2">
                    {selectedBoosts.map((b) => (
                      <span key={b.id} className="text-xs bg-[#113D33]/5 text-[#113D33]/70 rounded-full px-2.5 py-1">+ {b.name}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* "Choose a Day" header with month */}
            <div className="text-center pt-4">
              <h2 className="text-2xl font-bold text-[#113D33]">Choose a Day</h2>
              <p className="text-sm text-[#113D33]/50 mt-1">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
            {/* Week navigator */}
            <div className="bg-white/60 rounded-2xl p-3 border border-[#113D33]/5">
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => setWeekStart(addDays(weekStart, -7))} disabled={formatISO(weekStart) <= formatISO(today)} className="p-2 rounded-full hover:bg-[#113D33]/5 disabled:opacity-20 transition">
                  <svg className="w-4 h-4 text-[#113D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-1">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const d = addDays(weekStart, i); const iso = formatISO(d); const isSel = iso === selectedDate; const isToday = iso === formatISO(today);
                    return (<button key={iso} onClick={() => { setSelectedDate(iso); setSelectedSlot(null); }}
                      className={`flex flex-col items-center justify-center rounded-2xl px-3 py-2 min-w-[52px] transition-all duration-200 ${isSel ? "bg-[#113D33] text-white shadow-lg shadow-[#113D33]/20" : "bg-white text-[#113D33] shadow-sm hover:shadow-md hover:-translate-y-0.5"}`}>
                      <span className="text-[10px] font-semibold tracking-wider uppercase">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                      <span className="text-lg font-bold leading-tight">{d.getDate()}</span>
                      {isToday && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSel ? "bg-white" : "bg-[#4A776D]"}`} />}
                    </button>);
                  })}
                </div>
                <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="p-2 rounded-full hover:bg-[#113D33]/5 transition">
                  <svg className="w-4 h-4 text-[#113D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Therapist filter */}
            {allTherapists.length > 1 && (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#113D33]/40 mb-2">Therapist</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button onClick={() => setFilteredTherapist(null)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filteredTherapist === null ? "bg-[#113D33] text-white" : "bg-white text-[#113D33] border border-[#113D33]/15 hover:border-[#113D33]/30"}`}>All therapists</button>
                  {allTherapists.map((t) => (<button key={t.id} onClick={() => setFilteredTherapist(t.id)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filteredTherapist === t.id ? "bg-[#113D33] text-white" : "bg-white text-[#113D33] border border-[#113D33]/15 hover:border-[#113D33]/30"}`}>{t.name}</button>))}
                </div>
              </div>
            )}

            {/* "Pick a Time" header */}
            <h3 className="text-xl font-bold text-[#113D33] text-center">Pick a Time</h3>

            {/* Next available banner */}
            {!loading && displayedSlots.length === 0 && selectedTreatment && (
              <NextAvailableBanner
                type="service"
                sessionTypeId={selectedTreatment.id}
                currentDate={selectedDate}
                staffId={filteredTherapist}
                staffName={allTherapists.find((t) => t.id === filteredTherapist)?.name ?? null}
                onJumpToDate={(d) => { setSelectedDate(d); const jumpDate = new Date(d + "T12:00:00"); jumpDate.setHours(0,0,0,0); setWeekStart(jumpDate); }}
              />
            )}
            {/* Slots */}
            {loading || (totalExtMinutes > 0 && !schedulesLoaded) ? <div className="text-center py-12 text-[#113D33]/50">Loading availability...</div>
            : displayedSlots.length === 0 ? <div className="text-center py-12 text-[#113D33]/50"><p>No availability on this date.</p><p className="text-xs mt-1">Try another date or therapist.</p></div>
            : (
              <div className="space-y-5">
                {Object.entries(grouped).map(([period, ps]) => ps.length > 0 && (
                  <div key={period}>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#113D33]/40 mb-2 flex items-center gap-1.5">
                      {period === "morning" && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" /></svg>}
                      {period === "midday" && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" /></svg>}
                      {period === "afternoon" && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="10" r="4" /><path d="M12 2v2m0 12v2M4.93 2.93l1.41 1.41m11.32 11.32l1.41 1.41M2 10h2m16 0h2M4.93 17.07l1.41-1.41m11.32-11.32l1.41-1.41M3 18h18" /></svg>}
                      {period === "evening" && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
                      {period}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {ps.map((s, i) => {
                        const isSel = selectedSlot?.startDateTime === s.startDateTime && selectedSlot?.staffId === s.staffId;
                        return (<button key={`${s.startDateTime}-${s.staffId}-${i}`} onClick={() => setSelectedSlot(s)}
                          className={`rounded-xl py-3 px-2 text-center transition-all duration-200 ${isSel ? "bg-[#113D33] text-white shadow-lg shadow-[#113D33]/20 scale-[1.02]" : "bg-white text-[#113D33] shadow-sm hover:shadow-md hover:-translate-y-0.5"}`}>
                          <span className="font-semibold text-sm">{formatTime12h(s.startDateTime)}</span>
                          {filteredTherapist && s.staffName && <span className={`block text-xs mt-0.5 ${isSel ? "text-white/70" : "text-[#113D33]/45"}`}>{s.staffName}</span>}
                        </button>);
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Selected time confirmation card */}
            {selectedSlot && selectedTreatment && (
              <div className="bg-white/80 backdrop-blur-sm border border-[#113D33]/10 rounded-2xl p-4 text-sm text-left shadow-sm">
                <p className="text-[10px] uppercase tracking-wider text-[#113D33]/50 mb-1">Your appointment</p>
                <p className="font-semibold text-[#113D33]">{formatTimeRange(selectedSlot.startDateTime, selectedTreatment.durationMinutes + selectedBoosts.reduce((s, b) => s + b.addsMinutes, 0))}</p>
                <p className="text-xs text-[#113D33]/50 mt-0.5">
                  {selectedTreatment.name}
                  {selectedBoosts.length > 0 && ` + ${selectedBoosts.length} boost${selectedBoosts.length > 1 ? "s" : ""}`}
                  {selectedSlot.staffName && filteredTherapist ? ` with ${selectedSlot.staffName}` : ""}
                </p>
              </div>
            )}

            {selectedSlot && <button onClick={handleTimeContinue} className={primaryBtn}>Continue</button>}
          </motion.div>
        )}

        {/* ===== CARD ===== */}
        {step === "account" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Phase 1: Email entry (if not already checked) */}
            {!cardContext ? (
              <>
                <div className="text-center pt-4">
                  <h2 className="text-2xl font-bold text-[#113D33]">Almost there!</h2>
                  <p className="mt-2 text-sm text-[#113D33]/60">Enter your email to complete your booking.</p>
                </div>

                {/* Service recap */}
                {selectedTreatment && selectedSlot && (
                  <div className="bg-white/80 backdrop-blur-sm border border-[#113D33]/10 rounded-2xl p-4 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <Image src={category === "facial" ? "/assets/facialExperiences.png" : "/assets/massage2.jpg"} alt={selectedTreatment.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#113D33]">{selectedTreatment.name}</p>
                      <p className="text-xs text-[#113D33]/50">
                        {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {formatTime12h(selectedSlot.startDateTime)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
                  <label className="block text-sm font-medium text-[#113D33]">Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAccountEmailSubmit()} placeholder="you@example.com" className={inputClass} autoFocus />
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    We use your email to find or create your Mindbody account. You won&apos;t be charged today.
                  </p>
                  <button onClick={handleAccountEmailSubmit} disabled={loading || !email.trim()} className={primaryBtn}>{loading ? "Checking..." : "Continue"}</button>
                </div>
              </>
            ) : (
              /* Phase 2: Card entry (skipped if member has card on file) */
              <>
                {/* Member welcome */}
                {isMember && memberFirstName && (
                  <div className="bg-[#113D33] text-white rounded-2xl p-5 text-center">
                    <p className="text-lg font-semibold">Welcome back, {memberFirstName}!</p>
                    <p className="text-sm text-white/70 mt-1">Your <span className="font-bold capitalize">{memberTier}</span> membership pricing has been applied.</p>
                    {homeLocation && <p className="text-xs text-white/50 mt-1">Member at {homeLocation}</p>}
                  </div>
                )}

                <div className="text-center pt-2">
                  <h2 className="text-2xl font-bold text-[#113D33]">{cardContext === "create_account" ? "Create your account" : "Add payment card"}</h2>
                  <p className="mt-1 text-sm text-[#113D33]/60">Required to hold your appointment. You won&apos;t be charged today.</p>
                </div>
                <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
                  {cardContext === "create_account" && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs font-medium text-[#113D33] mb-1">First name</label><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} autoFocus /></div>
                        <div><label className="block text-xs font-medium text-[#113D33] mb-1">Last name</label><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} /></div>
                      </div>
                      <div><label className="block text-xs font-medium text-[#113D33] mb-1">Mobile phone</label><input type="tel" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} placeholder="(303) 555-1234" className={inputClass} /></div>
                      <label className="flex items-center gap-2 text-sm text-[#113D33]/70 cursor-pointer"><input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="rounded border-gray-300" />Send me wellness tips and offers</label>
                      <hr className="border-gray-100" />
                    </>
                  )}
                  <div><label className="block text-xs font-medium text-[#113D33] mb-1">Name on card</label><input ref={cardHolderRef} type="text" className={inputClass} data-lpignore="true" data-1p-ignore="true" /></div>
                  <div><label className="block text-xs font-medium text-[#113D33] mb-1">Card number</label><input ref={cardNumberRef} type="text" inputMode="numeric" className={inputClass} placeholder="•••• •••• •••• ••••" data-lpignore="true" data-1p-ignore="true" /></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className="block text-xs font-medium text-[#113D33] mb-1">Month</label><select ref={expMonthRef} className={inputClass}><option value="">MM</option>{Array.from({ length: 12 }, (_, i) => { const m = String(i + 1).padStart(2, "0"); return <option key={m} value={m}>{m}</option>; })}</select></div>
                    <div><label className="block text-xs font-medium text-[#113D33] mb-1">Year</label><select ref={expYearRef} className={inputClass}><option value="">YYYY</option>{Array.from({ length: 12 }, (_, i) => { const y = String(new Date().getFullYear() + i); return <option key={y} value={y}>{y}</option>; })}</select></div>
                    <div><label className="block text-xs font-medium text-[#113D33] mb-1">Zip code</label><input ref={postalCodeRef} type="text" className={inputClass} data-lpignore="true" data-1p-ignore="true" /></div>
                  </div>
                  <button onClick={handleSaveCardAndContinue} disabled={cardSaving} className={primaryBtn}>{cardSaving ? "Saving..." : "Save & continue"}</button>
                </div>

                {/* Non-member upsell */}
                {!isMember && selectedTreatment && (
                  <div className="bg-[#113D33]/[0.04] border border-[#113D33]/10 rounded-2xl p-4 text-center">
                    <p className="text-sm text-[#113D33]">
                      <span className="font-bold">Save ${TIER_PRICING[selectedTreatment.tier].dropIn - TIER_PRICING[selectedTreatment.tier].member}/visit</span> with a {selectedTreatment.tier} membership.{" "}
                      <Link href="/locations/denver-larimer/membership" target="_blank" className="underline underline-offset-2 font-semibold text-[#4A776D]">Learn more &rarr;</Link>
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* ===== CONFIRM ===== */}
        {step === "confirm" && selectedTreatment && selectedSlot && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center pt-4"><h2 className="text-2xl font-bold text-[#113D33]">Confirm your booking</h2></div>
            <div className="bg-white border border-[#113D33]/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              {/* Service image header */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image src={category === "facial" ? "/assets/facialExperiences.png" : "/assets/massage2.jpg"} alt={selectedTreatment.name} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-xs uppercase tracking-wider text-white/70 font-semibold capitalize">{selectedTreatment.tier} {category}</p>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">{selectedTreatment.name}</h3>
                </div>
              </div>

              <div className="p-5 text-left space-y-4">
                {selectedBoosts.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#113D33]/40 font-semibold">Boosts</p>
                    {selectedBoosts.map((b) => <div key={b.id} className="flex justify-between text-sm text-[#113D33] py-0.5"><span>+ {b.name}</span><span className="text-[#113D33]/50">{isMember ? b.memberPrice : b.dropInPrice}</span></div>)}
                  </div>
                )}

                {selectedSlot.staffName && filteredTherapist && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#113D33]/10 flex items-center justify-center"><span className="text-sm font-semibold text-[#113D33]">{selectedSlot.staffName.charAt(0)}</span></div>
                    <div><p className="text-[10px] uppercase tracking-wider text-[#113D33]/40">Therapist</p><p className="text-sm font-medium text-[#113D33]">{selectedSlot.staffName}</p></div>
                  </div>
                )}

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#113D33]/40 font-semibold">When</p>
                  <p className="text-sm font-medium text-[#113D33]">
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} &middot; {formatTimeRange(selectedSlot.startDateTime, selectedTreatment.durationMinutes + selectedBoosts.reduce((s, b) => s + b.addsMinutes, 0))}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#113D33]/10">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[#113D33]">Member</span>
                    <span className="text-2xl font-bold text-[#113D33]">${TIER_PRICING[selectedTreatment.tier].member}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-[#113D33]/40">
                    <span>Drop-in</span>
                    <span>${TIER_PRICING[selectedTreatment.tier].dropIn}</span>
                  </div>
                </div>

                <p className="text-xs text-[#113D33]/50">Reservation under <span className="font-medium text-[#113D33]/70">{email}</span></p>

                {/* Member pricing note */}
                <div className="rounded-xl bg-[#113D33]/[0.04] p-3 text-xs text-[#113D33]/70 leading-relaxed">
                  Member pricing is automatically applied at checkout. If you have a membership credit or package, it will be applied to this visit.
                </div>

                {/* Security note */}
                <div className="flex items-start gap-2.5 rounded-xl bg-[#113D33]/[0.03] p-3 text-xs text-[#113D33]/60">
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#113D33]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  No charge today — your card is stored for no-show / late cancellation protection.
                </div>
              </div>
            </div>
            {/* For someone else */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={forSomeoneElse} onChange={(e) => setForSomeoneElse(e.target.checked)} className="rounded border-gray-300" /><span className="text-sm text-[#113D33]">This booking is for someone else</span></label>
              {forSomeoneElse && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3"><input type="text" value={guestFirstName} onChange={(e) => setGuestFirstName(e.target.value)} placeholder="Their first name *" className={inputClass} /><input type="text" value={guestLastName} onChange={(e) => setGuestLastName(e.target.value)} placeholder="Last name" className={inputClass} /></div>
                  <input type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="Their phone *" className={inputClass} />
                  <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="Their email (optional)" className={inputClass} />
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isSurprise} onChange={(e) => setIsSurprise(e.target.checked)} className="rounded border-gray-300" /><span className="text-xs text-[#113D33]/60">This is a surprise — don&apos;t contact them</span></label>
                </div>
              )}
            </div>
            <button onClick={handleFinalConfirmAndBook} disabled={forSomeoneElse && (!guestFirstName.trim() || !guestPhone.trim())} className={primaryBtn}>Confirm & book</button>
            <p className="text-xs text-center text-[#113D33]/40">Your card will not be charged today. It is held to secure your appointment.</p>
          </motion.div>
        )}

        {/* ===== BOOKING (loading) ===== */}
        {step === "booking" && (
          <div className="text-center py-24">
            <div className="inline-block w-10 h-10 border-4 border-[#113D33]/20 border-t-[#113D33] rounded-full animate-spin" />
            <p className="mt-4 text-[#113D33] font-semibold">Booking your appointment...</p>
            <p className="text-sm text-[#113D33]/50 mt-1">Please don&apos;t close this page</p>
          </div>
        )}

        {/* ===== DONE ===== */}
        {step === "done" && selectedTreatment && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center pt-4 space-y-6">
            {/* Image hero with checkmark */}
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <div className="relative h-48 w-full">
                <Image src={category === "facial" ? "/assets/facialExperiences.png" : "/assets/massage2.jpg"} alt={selectedTreatment.name} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#113D33] via-[#113D33]/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">You&apos;re booked!</h2>
              </div>
            </div>

            {/* Booking details */}
            <div className="text-left space-y-1">
              <p className="text-[#113D33] font-semibold text-lg">{selectedTreatment.name}</p>
              {selectedBoosts.length > 0 && <p className="text-[#113D33]/50 text-sm">+ {selectedBoosts.map((b) => b.name).join(", ")}</p>}
              {selectedSlot && (
                <p className="text-[#113D33]/60 text-sm">
                  {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} &middot; {formatTimeRange(selectedSlot.startDateTime, selectedTreatment.durationMinutes)}
                  {selectedSlot.staffName ? ` with ${selectedSlot.staffName}` : ""}
                </p>
              )}
              <p className="text-[#113D33]/50 text-sm mt-4">A confirmation has been sent to {email}.</p>
              <p className="text-[#113D33]/50 text-sm">Please arrive 15 minutes early.</p>
            </div>

            {boostWarning && <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 leading-relaxed">{boostWarning}</div>}

            {/* Upsells */}
            <div className="pt-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-[#113D33]/40">Add another service</p>
              <Link href="/locations/denver-larimer/book-aescape" className={secondaryBtn + " inline-flex items-center justify-center"}>Book Aescape Robot Massage</Link>
              <Link href="/locations/denver-larimer/book-remedy-room" className={secondaryBtn + " inline-flex items-center justify-center"}>Book Remedy Room</Link>
              <button onClick={() => { setSelectedTreatment(null); setSelectedBoosts([]); setSelectedSlot(null); setSlots([]); setBoostWarning(null); setError(null); setCardContext(null); setForSomeoneElse(false); setStep("category"); }} className={secondaryBtn}>Book Another Massage or Facial</button>
            </div>

            <div className="pt-4 space-y-2">
              <Link href="/locations/denver-larimer" className="text-sm text-[#113D33]/50 hover:text-[#113D33] underline underline-offset-4">&larr; Back to Sway Larimer</Link>
              <a href="tel:+13034766150" className="block text-sm text-[#113D33]/40 hover:text-[#113D33]">(303) 476-6150</a>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
}
