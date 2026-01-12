"use client";

import React, { useMemo, useReducer } from "react";

/* ──────────────────────────────────────────────────────────────
  Structured Booking (Sway-only) — front-end mock
  - Deterministic, step-based (no chat)
  - “Have you been to Sway or Spavia before?” → simulated OAuth
  - Member tiers: good / better / best
  - Account but no membership supported
  - Category first: Massage / Facial / Remedy / Aescape
  - Tier-based service + boost gating
  - Members see “allowances/requirements”, guests see prices
  - Fake signup only for true first-timers (no prior visit)
  - Two-date time picker
────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────
   Types
────────────────────────────────────────────────────────────── */

type Step =
  | "RETURNING"
  | "OAUTH"
  | "CATEGORY"
  | "SERVICE"
  | "BOOSTS"
  | "THERAPIST"
  | "TIME"
  | "SIGNUP"
  | "CONFIRM"
  | "BOOKED";

type Tier = "guest" | "good" | "better" | "best";

type Category = "massage" | "facial" | "remedy" | "aescape";

type ProductId =
  | "massage_relax"
  | "massage_recovery"
  | "massage_pain"
  | "facial_signature"
  | "facial_glow"
  | "remedy_room"
  | "aescape_therapy";

type Boost =
  | { type: "time_extension"; minutes: 30 | 60 }
  | { type: "add_on"; id: "cbd" | "aroma" | "hot_stones" | "scalp" | "cupping" };

type TherapistChoice =
  | { type: "no_preference" }
  | { type: "gender"; value: "female" | "male" }
  | { type: "name"; value: string };

type Draft = {
  returning?: boolean; // been to Sway or Spavia before
  hasAccount?: boolean; // they can sign in
  tier?: Tier; // membership tier if any; guest if none
  category?: Category;
  productId?: ProductId;
  boosts: Boost[];
  therapist?: TherapistChoice;
  time?: { dateLabel: string; timeLabel: string };
  // Fake signup info for brand-new guests
  guestInfo?: { firstName: string; lastName: string; email: string; phone: string };
};

type State = {
  step: Step;
  draft: Draft;
  // simple UI validation feedback
  error?: string | null;
};

type Action =
  | { type: "SET_RETURNING"; returning: boolean }
  | { type: "FAKE_OAUTH_RESULT"; hasAccount: boolean; tier: Tier } // includes account/no-membership
  | { type: "SET_CATEGORY"; category: Category }
  | { type: "SET_PRODUCT"; productId: ProductId }
  | { type: "TOGGLE_TIME_BOOST"; minutes: 30 | 60 }
  | { type: "TOGGLE_ADDON"; id: Boost["type"] extends "add_on" ? never : never } // placeholder (TS)
  | { type: "TOGGLE_ADDON_ID"; id: "cbd" | "aroma" | "hot_stones" | "scalp" | "cupping" }
  | { type: "SET_THERAPIST"; therapist: TherapistChoice }
  | { type: "SET_TIME"; dateLabel: string; timeLabel: string }
  | { type: "SET_GUEST_INFO"; guestInfo: Draft["guestInfo"] }
  | { type: "BACK" }
  | { type: "NEXT"; step: Step }
  | { type: "CONFIRM" }
  | { type: "CLEAR_ERROR" };

/* ──────────────────────────────────────────────────────────────
   Mock Catalog + Rules
────────────────────────────────────────────────────────────── */

const CATEGORIES: Array<{
  id: Category;
  title: string;
  subtitle: string;
}> = [
  { id: "massage", title: "Massage", subtitle: "Relaxation, recovery, or targeted pain relief." },
  { id: "facial", title: "Facial", subtitle: "Skin reset, glow, and hydration." },
  { id: "remedy", title: "Remedy Room", subtitle: "Sauna, cold plunge, and recovery tools." },
  { id: "aescape", title: "Aescape", subtitle: "Guided robot massage experience." },
];

type Product = {
  id: ProductId;
  category: Category;
  title: string;
  desc: string;
  // Guests see prices. Members see allowances (no pricing).
  basePriceGuest: number;
  // Optional: some services may only be for certain tiers
  allowedTiers: Tier[]; // include "guest" if guests can book
  defaultDurationMins?: number; // for future
};

const PRODUCTS: Product[] = [
  // Massage (the three you listed)
  {
    id: "massage_relax",
    category: "massage",
    title: "Relaxation Massage",
    desc: "Calming, full-body massage designed to help you unwind.",
    basePriceGuest: 135,
    allowedTiers: ["guest", "good", "better", "best"],
  },
  {
    id: "massage_recovery",
    category: "massage",
    title: "Deep Recovery Massage",
    desc: "Focused work for training soreness, travel, or tightness.",
    basePriceGuest: 155,
    allowedTiers: ["guest", "better", "best"],
  },
  {
    id: "massage_pain",
    category: "massage",
    title: "Targeted Pain Relief",
    desc: "Precision treatment for chronic or acute problem areas.",
    basePriceGuest: 165,
    allowedTiers: ["guest", "best"],
  },

  // Facial (placeholder but real)
  {
    id: "facial_signature",
    category: "facial",
    title: "Signature Facial",
    desc: "Customized facial focused on balance, clarity, and glow.",
    basePriceGuest: 150,
    allowedTiers: ["guest", "good", "better", "best"],
  },
  {
    id: "facial_glow",
    category: "facial",
    title: "Glow + Hydrate Facial",
    desc: "Deep hydration + brightening for instant radiance.",
    basePriceGuest: 175,
    allowedTiers: ["guest", "better", "best"],
  },

  // Remedy
  {
    id: "remedy_room",
    category: "remedy",
    title: "Remedy Room Session",
    desc: "Sauna + cold plunge + recovery tools. Reset your system.",
    basePriceGuest: 95,
    allowedTiers: ["guest", "good", "better", "best"],
  },

  // Aescape
  {
    id: "aescape_therapy",
    category: "aescape",
    title: "Aescape Robot Massage",
    desc: "Precision robot massage — customizable and data-driven.",
    basePriceGuest: 165,
    allowedTiers: ["guest", "better", "best"],
  },
];

const THERAPISTS: Array<{ name: string; tag?: string }> = [
  { name: "No preference" },
  { name: "Sarah", tag: "Deep tissue" },
  { name: "Mia", tag: "Relaxation" },
  { name: "Jordan", tag: "Recovery" },
  { name: "Ava", tag: "Facials" },
  { name: "Ethan", tag: "Pain relief" },
];

type TimeSlot = { dateLabel: string; slots: string[] };

const TIME_SLOTS: TimeSlot[] = [
  { dateLabel: "Tomorrow · Thu, Jan 8", slots: ["3:30 PM", "4:30 PM", "5:45 PM"] },
  { dateLabel: "Fri, Jan 9", slots: ["10:15 AM", "11:45 AM", "2:00 PM", "4:15 PM"] },
];

// Add-ons (guests pay; members “use allowances”)
const ADDONS: Array<{
  id: "cbd" | "aroma" | "hot_stones" | "scalp" | "cupping";
  title: string;
  blurb: string;
  priceGuest: number;
  // which categories it applies to (simplified)
  categories: Category[];
  // which tiers can select it as part of membership allowances
  allowedMemberTiers: Tier[];
}> = [
  {
    id: "cbd",
    title: "CBD",
    blurb: "Extra recovery + calming support.",
    priceGuest: 30,
    categories: ["massage"],
    allowedMemberTiers: ["better", "best"],
  },
  {
    id: "aroma",
    title: "Aromatherapy",
    blurb: "Nervous system downshift.",
    priceGuest: 15,
    categories: ["massage", "facial"],
    allowedMemberTiers: ["good", "better", "best"],
  },
  {
    id: "hot_stones",
    title: "Hot Stones",
    blurb: "Deep warmth to melt tension.",
    priceGuest: 25,
    categories: ["massage"],
    allowedMemberTiers: ["best"],
  },
  {
    id: "scalp",
    title: "Scalp Ritual",
    blurb: "Jaw/temples/scalp release.",
    priceGuest: 20,
    categories: ["massage", "facial"],
    allowedMemberTiers: ["better", "best"],
  },
  {
    id: "cupping",
    title: "Cupping",
    blurb: "Targeted mobility + muscle decompression.",
    priceGuest: 30,
    categories: ["massage"],
    allowedMemberTiers: ["best"],
  },
];

/* ──────────────────────────────────────────────────────────────
   Tier allowance rules (members)
   - Highest tier: can add up to 60 min time + up to 2 add-ons
   - Middle tier: can add up to 30 min time + up to 1 add-on
   - Lowest tier: no time extension + up to 1 add-on
   Guests: can buy any eligible boosts with prices (no hard cap here, but we’ll cap add-ons to 3 for sanity)
────────────────────────────────────────────────────────────── */

function getTierRules(tier: Tier) {
  if (tier === "best") {
    return { maxTimeMinutes: 60 as 60, maxAddOns: 2, showTime: true, label: "Best" };
  }
  if (tier === "better") {
    return { maxTimeMinutes: 30 as 30, maxAddOns: 1, showTime: true, label: "Better" };
  }
  if (tier === "good") {
    return { maxTimeMinutes: 0 as 0, maxAddOns: 1, showTime: false, label: "Good" };
  }
  return { maxTimeMinutes: 60 as 60, maxAddOns: 3, showTime: true, label: "Guest" }; // guest defaults
}

function isMember(tier?: Tier) {
  return tier === "good" || tier === "better" || tier === "best";
}

function formatMoney(n: number) {
  return `$${n.toFixed(0)}`;
}

function countAddOns(boosts: Boost[]) {
  return boosts.filter((b) => b.type === "add_on").length;
}

function getSelectedTimeBoost(boosts: Boost[]) {
  return boosts.find((b) => b.type === "time_extension") as
    | { type: "time_extension"; minutes: 30 | 60 }
    | undefined;
}

function getSelectedAddOnIds(boosts: Boost[]) {
  return boosts
    .filter((b) => b.type === "add_on")
    .map((b) => (b as { type: "add_on"; id: any }).id) as Array<
    "cbd" | "aroma" | "hot_stones" | "scalp" | "cupping"
  >;
}

function computeGuestTotal(draft: Draft) {
  const product = PRODUCTS.find((p) => p.id === draft.productId);
  if (!product) return null;

  let total = product.basePriceGuest;

  const timeBoost = getSelectedTimeBoost(draft.boosts);
  if (timeBoost) total += timeBoost.minutes === 30 ? 35 : 60;

  const addonIds = getSelectedAddOnIds(draft.boosts);
  for (const id of addonIds) {
    const a = ADDONS.find((x) => x.id === id);
    if (a) total += a.priceGuest;
  }

  return total;
}

/* ──────────────────────────────────────────────────────────────
   Reducer + Back Stack
────────────────────────────────────────────────────────────── */

const stepOrder: Step[] = [
  "RETURNING",
  "OAUTH",
  "CATEGORY",
  "SERVICE",
  "BOOSTS",
  "THERAPIST",
  "TIME",
  "SIGNUP",
  "CONFIRM",
  "BOOKED",
];

function prevStep(current: Step, state: State): Step {
  // custom back behavior so we don’t land on OAUTH if user is new, etc.
  if (current === "OAUTH") return "RETURNING";
  if (current === "CATEGORY") return "RETURNING";
  if (current === "SERVICE") return "CATEGORY";
  if (current === "BOOSTS") return "SERVICE";
  if (current === "THERAPIST") return "BOOSTS";
  if (current === "TIME") return "THERAPIST";
  if (current === "SIGNUP") return "TIME";
  if (current === "CONFIRM") {
    // If brand-new guest, go back to signup; otherwise back to time
    const needsSignup = !state.draft.returning && state.draft.tier === "guest" && !state.draft.hasAccount;
    return needsSignup ? "SIGNUP" : "TIME";
  }
  return "RETURNING";
}

const initialState: State = {
  step: "RETURNING",
  draft: { boosts: [] },
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "SET_RETURNING":
      return action.returning
        ? {
            step: "OAUTH",
            draft: { boosts: [], returning: true },
            error: null,
          }
        : {
            step: "CATEGORY",
            draft: { boosts: [], returning: false, hasAccount: false, tier: "guest" },
            error: null,
          };

    case "FAKE_OAUTH_RESULT":
      return {
        step: "CATEGORY",
        draft: {
          boosts: [],
          returning: true,
          hasAccount: action.hasAccount,
          tier: action.tier,
        },
        error: null,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        step: "SERVICE",
        draft: {
          ...state.draft,
          category: action.category,
          productId: undefined,
          boosts: [],
          therapist: undefined,
          time: undefined,
        },
        error: null,
      };

    case "SET_PRODUCT":
      return {
        ...state,
        step: "BOOSTS",
        draft: {
          ...state.draft,
          productId: action.productId,
          boosts: [],
          therapist: undefined,
          time: undefined,
        },
        error: null,
      };

    case "TOGGLE_TIME_BOOST": {
      const tier = state.draft.tier ?? "guest";
      const rules = getTierRules(tier);

      // member gating
      if (isMember(tier)) {
        if (!rules.showTime) {
          return { ...state, error: "Your membership tier doesn’t include time extensions." };
        }
        if (action.minutes > rules.maxTimeMinutes) {
          return { ...state, error: `Your tier allows up to +${rules.maxTimeMinutes} minutes.` };
        }
      }

      const current = getSelectedTimeBoost(state.draft.boosts);
      const willRemove = current?.minutes === action.minutes;

      const nextBoosts = [
        ...state.draft.boosts.filter((b) => b.type !== "time_extension"),
        ...(willRemove ? [] : [{ type: "time_extension", minutes: action.minutes } as Boost]),
      ];

      return { ...state, draft: { ...state.draft, boosts: nextBoosts }, error: null };
    }

    case "TOGGLE_ADDON_ID": {
      const tier = state.draft.tier ?? "guest";
      const category = state.draft.category;
      const addon = ADDONS.find((a) => a.id === action.id);

      if (!addon) return state;

      // category compatibility
      if (!category || !addon.categories.includes(category)) {
        return { ...state, error: "That enhancement isn’t available for this service type." };
      }

      // member gating
      if (isMember(tier)) {
        const rules = getTierRules(tier);
        if (!addon.allowedMemberTiers.includes(tier)) {
          return { ...state, error: "That enhancement isn’t included for your membership tier." };
        }
        const currentAddOns = countAddOns(state.draft.boosts);
        const alreadySelected = state.draft.boosts.some((b) => b.type === "add_on" && (b as any).id === action.id);
        if (!alreadySelected && currentAddOns >= rules.maxAddOns) {
          return { ...state, error: `Your tier allows up to ${rules.maxAddOns} enhancement${rules.maxAddOns === 1 ? "" : "s"}.` };
        }
      } else {
        // guest sanity cap
        const currentAddOns = countAddOns(state.draft.boosts);
        const alreadySelected = state.draft.boosts.some((b) => b.type === "add_on" && (b as any).id === action.id);
        if (!alreadySelected && currentAddOns >= 3) {
          return { ...state, error: "You can add up to 3 enhancements in this prototype." };
        }
      }

      const exists = state.draft.boosts.some((b) => b.type === "add_on" && (b as any).id === action.id);
      const nextBoosts = exists
        ? state.draft.boosts.filter((b) => !(b.type === "add_on" && (b as any).id === action.id))
        : [...state.draft.boosts, { type: "add_on", id: action.id } as Boost];

      return { ...state, draft: { ...state.draft, boosts: nextBoosts }, error: null };
    }

    case "SET_THERAPIST":
      return {
        ...state,
        step: "TIME",
        draft: { ...state.draft, therapist: action.therapist, time: undefined },
        error: null,
      };

    case "SET_TIME": {
      const needsSignup = !state.draft.returning && state.draft.tier === "guest" && !state.draft.hasAccount;
      return {
        ...state,
        step: needsSignup ? "SIGNUP" : "CONFIRM",
        draft: { ...state.draft, time: { dateLabel: action.dateLabel, timeLabel: action.timeLabel } },
        error: null,
      };
    }

    case "SET_GUEST_INFO":
      return { ...state, draft: { ...state.draft, guestInfo: action.guestInfo }, error: null };

    case "NEXT":
      return { ...state, step: action.step, error: null };

    case "BACK":
      return { ...state, step: prevStep(state.step, state), error: null };

    case "CONFIRM":
      return { ...state, step: "BOOKED", error: null };

    default:
      return state;
  }
}

/* ──────────────────────────────────────────────────────────────
   UI Components
────────────────────────────────────────────────────────────── */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F4E9] text-black font-vance">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">{children}</div>
    </div>
  );
}

function TopBar({
  step,
  onBack,
}: {
  step: Step;
  onBack?: () => void;
}) {
  const idx = stepOrder.indexOf(step);
  const pct = Math.max(8, Math.min(100, ((idx + 1) / stepOrder.length) * 100));

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-2xl md:text-3xl font-semibold">Book at Sway</div>
          <div className="text-sm text-black/60 mt-1">A structured, premium booking flow (prototype)</div>
        </div>

        {onBack ? (
          <button
            onClick={onBack}
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm hover:bg-white transition"
          >
            Back
          </button>
        ) : null}
      </div>

      <div className="mt-4 h-2 rounded-full bg-black/10 overflow-hidden">
        <div className="h-full bg-[#113D33]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  rightTag,
}: {
  title: string;
  subtitle?: string;
  rightTag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/75 backdrop-blur p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xl font-semibold">{title}</div>
          {subtitle ? <div className="text-sm text-black/60 mt-1">{subtitle}</div> : null}
        </div>
        {rightTag ? (
          <div className="text-xs px-3 py-1 rounded-full bg-black/5 border border-black/10">
            {rightTag}
          </div>
        ) : null}
      </div>

      <div className="mt-5">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function PillButton({
  children,
  onClick,
  variant = "primary",
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  active?: boolean;
}) {
  const base =
    "rounded-full px-5 py-2.5 text-sm font-medium border transition w-fit";
  const primary = active
    ? "bg-[#113D33] text-white border-[#113D33]"
    : "bg-[#113D33] text-white border-[#113D33] hover:opacity-90";
  const secondary = active
    ? "bg-black text-white border-black"
    : "bg-white/80 border-black/10 hover:bg-white";

  return (
    <button onClick={onClick} className={`${base} ${variant === "primary" ? primary : secondary}`}>
      {children}
    </button>
  );
}

function ChoiceCard({
  title,
  subtitle,
  meta,
  onSelect,
  selected,
}: {
  title: string;
  subtitle: string;
  meta?: React.ReactNode;
  onSelect: () => void;
  selected?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      className={`text-left rounded-3xl border p-5 transition shadow-sm ${
        selected
          ? "border-[#113D33] bg-white"
          : "border-black/10 bg-white/70 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-black/60 mt-1">{subtitle}</div>
        </div>
        {meta ? <div className="text-sm text-black/70">{meta}</div> : null}
      </div>
      <div className="mt-4">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${
          selected ? "border-[#113D33] text-[#113D33]" : "border-black/10 text-black/60"
        }`}>
          {selected ? "Selected" : "Select"}
        </span>
      </div>
    </button>
  );
}

function InlineAlert({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-start justify-between gap-3">
      <div className="text-sm text-black/80">{text}</div>
      <button
        onClick={onClose}
        className="text-xs rounded-full border border-black/10 px-3 py-1 hover:bg-black/5"
      >
        OK
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main Page
────────────────────────────────────────────────────────────── */

export default function StructuredBookingPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tier = state.draft.tier ?? "guest";
  const tierRules = getTierRules(tier);
  const member = isMember(tier);

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === state.draft.productId),
    [state.draft.productId]
  );

  const guestTotal = useMemo(() => computeGuestTotal(state.draft), [state.draft]);

  const visibleProducts = useMemo(() => {
    const cat = state.draft.category;
    if (!cat) return [];
    return PRODUCTS.filter((p) => p.category === cat && p.allowedTiers.includes(tier));
  }, [state.draft.category, tier]);

  const eligibleAddOns = useMemo(() => {
    const cat = state.draft.category;
    if (!cat) return [];
    return ADDONS.filter((a) => a.categories.includes(cat));
  }, [state.draft.category]);

  const selectedTimeBoost = getSelectedTimeBoost(state.draft.boosts);
  const selectedAddOns = getSelectedAddOnIds(state.draft.boosts);

  const onBack =
    state.step === "RETURNING" || state.step === "BOOKED"
      ? undefined
      : () => dispatch({ type: "BACK" });

  return (
    <Shell>
      <TopBar step={state.step} onBack={onBack} />

      {state.error ? (
        <div className="mb-4">
          <InlineAlert text={state.error} onClose={() => dispatch({ type: "CLEAR_ERROR" })} />
        </div>
      ) : null}

      {/* STEP: RETURNING */}
      {state.step === "RETURNING" ? (
        <Card
          title="Have you been to Sway or Spavia before?"
          subtitle="Choose the option that’s most accurate."
        >
          <div className="flex flex-wrap gap-3">
            <PillButton onClick={() => dispatch({ type: "SET_RETURNING", returning: true })}>
              Yes, I have
            </PillButton>
            <PillButton variant="secondary" onClick={() => dispatch({ type: "SET_RETURNING", returning: false })}>
              No, I’m new
            </PillButton>
          </div>

          <div className="mt-6 text-xs text-black/55">
            This is a prototype — sign-in and account creation are simulated.
          </div>
        </Card>
      ) : null}

      {/* STEP: OAUTH */}
      {state.step === "OAUTH" ? (
        <Card
          title="Signing you in"
          subtitle="(Simulated — this will be Mindbody OAuth)"
          rightTag="3 options"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <PillButton
              onClick={() =>
                dispatch({ type: "FAKE_OAUTH_RESULT", hasAccount: true, tier: "best" })
              }
            >
              Ultimate Member (Best)
            </PillButton>

            <PillButton
              variant="secondary"
              onClick={() =>
                dispatch({ type: "FAKE_OAUTH_RESULT", hasAccount: true, tier: "better" })
              }
            >
              Member (Better)
            </PillButton>

            <PillButton
              variant="secondary"
              onClick={() =>
                dispatch({ type: "FAKE_OAUTH_RESULT", hasAccount: true, tier: "guest" })
              }
            >
              Account, No Membership
            </PillButton>
          </div>

          <div className="mt-5 text-sm text-black/70">
            If you choose a membership tier, pricing will be hidden and you’ll see included allowances instead.
          </div>
        </Card>
      ) : null}

      {/* STEP: CATEGORY */}
      {state.step === "CATEGORY" ? (
        <Card
          title="What would you like to book?"
          subtitle={member ? `Member view · Tier: ${tierRules.label}` : "Guest view · Pricing shown"}
          rightTag={member ? "No pricing" : "Pricing shown"}
        >
          <Grid>
            {CATEGORIES.map((c) => (
              <ChoiceCard
                key={c.id}
                title={c.title}
                subtitle={c.subtitle}
                selected={state.draft.category === c.id}
                onSelect={() => dispatch({ type: "SET_CATEGORY", category: c.id })}
              />
            ))}
          </Grid>
        </Card>
      ) : null}

      {/* STEP: SERVICE */}
      {state.step === "SERVICE" ? (
        <Card
          title={
            state.draft.category
              ? `Choose your ${state.draft.category === "aescape" ? "Aescape experience" : state.draft.category}`
              : "Choose your service"
          }
          subtitle={
            member
              ? "Included options based on your tier."
              : "Choose what sounds best — you’ll confirm everything before booking."
          }
          rightTag={state.draft.category ? state.draft.category.toUpperCase() : undefined}
        >
          {/* Must show 4 things at category level, but services are per category */}
          {/* Massage must show the 3 you listed */}
          <div className="space-y-4">
            {visibleProducts.length ? (
              <Grid>
                {visibleProducts.map((p) => (
                  <ChoiceCard
                    key={p.id}
                    title={p.title}
                    subtitle={p.desc}
                    selected={state.draft.productId === p.id}
                    meta={
                      member ? (
                        <span className="text-xs rounded-full px-2 py-1 border border-black/10 bg-black/5">
                          Included
                        </span>
                      ) : (
                        <span className="text-sm font-semibold">{formatMoney(p.basePriceGuest)}</span>
                      )
                    }
                    onSelect={() => dispatch({ type: "SET_PRODUCT", productId: p.id })}
                  />
                ))}
              </Grid>
            ) : (
              <div className="text-sm text-black/70">
                No services configured for this category and tier yet.
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="text-xs text-black/55">
                Tip: You can keep this list curated (not “alphabetized SKUs”) even when wired to Mindbody.
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {/* STEP: BOOSTS */}
      {state.step === "BOOSTS" ? (
        <Card
          title="Enhance your session"
          subtitle={
            member
              ? `Included allowances · ${tierRules.label} tier`
              : "Optional enhancements — add what you want."
          }
          rightTag={member ? "Allowances" : "Prices"}
        >
          <div className="space-y-6">
            {/* Members: show requirements/allowances instead of prices */}
            {member ? (
              <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                <div className="text-sm font-semibold">Your included options</div>
                <div className="text-sm text-black/70 mt-1">
                  {tier === "best" ? (
                    <>
                      Choose up to <span className="font-semibold">+60 minutes</span> and up to{" "}
                      <span className="font-semibold">2 enhancements</span>.
                    </>
                  ) : tier === "better" ? (
                    <>
                      Choose up to <span className="font-semibold">+30 minutes</span> and{" "}
                      <span className="font-semibold">1 enhancement</span>.
                    </>
                  ) : (
                    <>
                      No time extensions included. Choose{" "}
                      <span className="font-semibold">1 enhancement</span>.
                    </>
                  )}
                </div>
              </div>
            ) : null}

            {/* Add time (conditional by tier for members; always for guests) */}
            <div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Add time</div>
                  <div className="text-xs text-black/55 mt-1">
                    {member
                      ? tierRules.showTime
                        ? `Included up to +${tierRules.maxTimeMinutes} minutes.`
                        : "Not included for your tier."
                      : "Adds time to your session (priced)."}
                  </div>
                </div>

                {member ? (
                  <div className="text-xs text-black/60">
                    Selected:{" "}
                    <span className="font-semibold">
                      {selectedTimeBoost ? `+${selectedTimeBoost.minutes} min` : "None"}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-black/60">
                    {selectedTimeBoost ? `+${selectedTimeBoost.minutes} min selected` : "Optional"}
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {/* +30 always visible to guests; visible to members only if allowed */}
                <PillButton
                  variant="secondary"
                  active={selectedTimeBoost?.minutes === 30}
                  onClick={() => dispatch({ type: "TOGGLE_TIME_BOOST", minutes: 30 })}
                >
                  +30 minutes {member ? "" : "· +$35"}
                </PillButton>

                {/* +60 visible to guests; visible to best-tier members */}
                <PillButton
                  variant="secondary"
                  active={selectedTimeBoost?.minutes === 60}
                  onClick={() => dispatch({ type: "TOGGLE_TIME_BOOST", minutes: 60 })}
                >
                  +60 minutes {member ? "" : "· +$60"}
                </PillButton>
              </div>
            </div>

            {/* Enhancements */}
            <div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Enhancements</div>
                  <div className="text-xs text-black/55 mt-1">
                    {member
                      ? `Choose up to ${tierRules.maxAddOns} enhancement${tierRules.maxAddOns === 1 ? "" : "s"} (tier-limited).`
                      : "Pick as many as you want (capped at 3 in this prototype)."}
                  </div>
                </div>
                <div className="text-xs text-black/60">
                  Selected:{" "}
                  <span className="font-semibold">
                    {selectedAddOns.length ? selectedAddOns.length : 0}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {eligibleAddOns.map((a) => {
                  const selected = selectedAddOns.includes(a.id);
                  const lockedForTier = member && !a.allowedMemberTiers.includes(tier);

                  return (
                    <button
                      key={a.id}
                      onClick={() => dispatch({ type: "TOGGLE_ADDON_ID", id: a.id })}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-[#113D33] bg-white"
                          : "border-black/10 bg-white/70 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{a.title}</div>
                          <div className="text-xs text-black/60 mt-1">{a.blurb}</div>
                        </div>

                        <div className="text-right">
                          {member ? (
                            lockedForTier ? (
                              <div className="text-xs px-2 py-1 rounded-full border border-black/10 bg-black/5 text-black/60">
                                Not in tier
                              </div>
                            ) : (
                              <div className="text-xs px-2 py-1 rounded-full border border-black/10 bg-black/5 text-black/70">
                                Included
                              </div>
                            )
                          ) : (
                            <div className="text-sm font-semibold">{formatMoney(a.priceGuest)}</div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${
                            selected
                              ? "border-[#113D33] text-[#113D33]"
                              : "border-black/10 text-black/60"
                          }`}
                        >
                          {selected ? "Selected" : "Select"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="text-xs text-black/55">
                {member
                  ? "No pricing shown — allowances apply. You’ll confirm everything next."
                  : "You’ll review totals on the confirmation screen."}
              </div>

              <PillButton onClick={() => dispatch({ type: "NEXT", step: "THERAPIST" })}>
                Next
              </PillButton>
            </div>
          </div>
        </Card>
      ) : null}

      {/* STEP: THERAPIST */}
      {state.step === "THERAPIST" ? (
        <Card
          title="Any therapist preference?"
          subtitle="Pick a therapist or choose no preference."
          rightTag="Optional"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {THERAPISTS.map((t) => {
              const selected =
                (state.draft.therapist?.type === "no_preference" && t.name === "No preference") ||
                (state.draft.therapist?.type === "name" && state.draft.therapist.value === t.name);

              return (
                <button
                  key={t.name}
                  onClick={() =>
                    dispatch({
                      type: "SET_THERAPIST",
                      therapist:
                        t.name === "No preference"
                          ? { type: "no_preference" }
                          : { type: "name", value: t.name },
                    })
                  }
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#113D33] bg-white"
                      : "border-black/10 bg-white/70 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      {t.tag ? <div className="text-xs text-black/60 mt-1">{t.tag}</div> : null}
                    </div>
                    <div className="text-xs text-black/60">{selected ? "Selected" : ""}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <div className="text-xs text-black/55 mb-2">Or choose a gender preference</div>
            <div className="flex flex-wrap gap-2">
              <PillButton
                variant="secondary"
                active={state.draft.therapist?.type === "gender" && state.draft.therapist.value === "female"}
                onClick={() => dispatch({ type: "SET_THERAPIST", therapist: { type: "gender", value: "female" } })}
              >
                Female
              </PillButton>
              <PillButton
                variant="secondary"
                active={state.draft.therapist?.type === "gender" && state.draft.therapist.value === "male"}
                onClick={() => dispatch({ type: "SET_THERAPIST", therapist: { type: "gender", value: "male" } })}
              >
                Male
              </PillButton>
            </div>
          </div>
        </Card>
      ) : null}

      {/* STEP: TIME */}
      {state.step === "TIME" ? (
        <Card
          title="Choose a date and time"
          subtitle="Two dates shown for now (mock availability)."
          rightTag="Live later"
        >
          <div className="space-y-4">
            {TIME_SLOTS.map((d) => (
              <div key={d.dateLabel} className="rounded-2xl border border-black/10 bg-white/70 p-4">
                <div className="text-sm font-semibold">{d.dateLabel}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.slots.map((s) => {
                    const selected =
                      state.draft.time?.dateLabel === d.dateLabel &&
                      state.draft.time?.timeLabel === s;
                    return (
                      <PillButton
                        key={s}
                        variant="secondary"
                        active={selected}
                        onClick={() => dispatch({ type: "SET_TIME", dateLabel: d.dateLabel, timeLabel: s })}
                      >
                        {s}
                      </PillButton>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {/* STEP: SIGNUP (only brand-new guests) */}
      {state.step === "SIGNUP" ? (
        <Card
          title="Almost done"
          subtitle="We just need your details to finalize the booking."
          rightTag="Guest"
        >
          <GuestForm
            onSubmit={(guestInfo) => {
              dispatch({ type: "SET_GUEST_INFO", guestInfo });
              dispatch({ type: "NEXT", step: "CONFIRM" });
            }}
          />
        </Card>
      ) : null}

      {/* STEP: CONFIRM */}
      {state.step === "CONFIRM" ? (
        <Card title="Review your appointment" subtitle="This step is non-skippable." rightTag="Confirm">
          <div className="rounded-2xl border border-black/10 bg-white/80 p-5">
            <div className="space-y-2 text-sm text-black/80">
              <Row label="Type" value={state.draft.category ? capitalize(state.draft.category) : "—"} />
              <Row label="Service" value={product?.title ?? "—"} />
              <Row
                label="Enhancements"
                value={
                  state.draft.boosts.length
                    ? [
                        selectedTimeBoost ? `+${selectedTimeBoost.minutes} min` : null,
                        ...selectedAddOns.map((id) => ADDONS.find((a) => a.id === id)?.title ?? id),
                      ]
                        .filter(Boolean)
                        .join(", ")
                    : "None"
                }
              />
              <Row
                label="Therapist"
                value={
                  state.draft.therapist?.type === "name"
                    ? state.draft.therapist.value
                    : state.draft.therapist?.type === "gender"
                    ? `Preference: ${capitalize(state.draft.therapist.value)}`
                    : "No preference"
                }
              />
              <Row
                label="When"
                value={
                  state.draft.time
                    ? `${state.draft.time.dateLabel} · ${state.draft.time.timeLabel}`
                    : "—"
                }
              />
              <div className="pt-2 border-t border-black/10 mt-3" />
              <Row
                label="Total"
                value={
                  member
                    ? "Included (membership allowances)"
                    : guestTotal === null
                    ? "—"
                    : formatMoney(guestTotal)
                }
              />
            </div>

            {member ? (
              <div className="mt-3 text-xs text-black/55">
                Member note: pricing is hidden in this prototype; booking will later validate allowances and eligibility via API.
              </div>
            ) : (
              <div className="mt-3 text-xs text-black/55">
                Guest note: prices are mocked — later these will be pulled from Mindbody.
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-black/55">
              Times are volatile — we’ll re-check availability before finalizing.
            </div>
            <PillButton onClick={() => dispatch({ type: "CONFIRM" })}>Confirm booking</PillButton>
          </div>
        </Card>
      ) : null}

      {/* STEP: BOOKED */}
      {state.step === "BOOKED" ? (
        <Card title="You’re booked" subtitle="(Prototype) Next: real Mindbody write + confirmation screen.">
          <div className="rounded-2xl border border-black/10 bg-white/80 p-5">
            <div className="text-sm text-black/80">
              Success. In production, this is where you’ll show:
              <ul className="list-disc ml-5 mt-2 text-sm text-black/70">
                <li>Confirmation number</li>
                <li>Email/SMS confirmation</li>
                <li>Add to calendar</li>
                <li>Reschedule / cancel links</li>
              </ul>
            </div>
            <div className="mt-5 flex gap-2 flex-wrap">
              <PillButton variant="secondary" onClick={() => window.location.reload()}>
                Start over
              </PillButton>
              <a
                className="rounded-full px-5 py-2.5 text-sm font-medium border bg-white/80 border-black/10 hover:bg-white transition"
                href="https://clients.mindbodyonline.com/consumerbooking?studioid=5739770&stype=-9"
                target="_blank"
                rel="noreferrer"
              >
                Open classic booking
              </a>
            </div>
          </div>
        </Card>
      ) : null}
    </Shell>
  );
}

/* ──────────────────────────────────────────────────────────────
   Small helpers/components
────────────────────────────────────────────────────────────── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-black/60">{label}</div>
      <div className="text-right font-medium text-black">{value}</div>
    </div>
  );
}

function capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

function GuestForm({
  onSubmit,
}: {
  onSubmit: (info: { firstName: string; lastName: string; email: string; phone: string }) => void;
}) {
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const firstName = String(fd.get("firstName") || "").trim();
        const lastName = String(fd.get("lastName") || "").trim();
        const email = String(fd.get("email") || "").trim();
        const phone = String(fd.get("phone") || "").trim();

        if (!firstName || !lastName || !email || !phone) return;

        onSubmit({ firstName, lastName, email, phone });
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input name="firstName" label="First name" placeholder="John" />
        <Input name="lastName" label="Last name" placeholder="Langenderfer" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input name="email" label="Email" placeholder="you@email.com" />
        <Input name="phone" label="Phone" placeholder="(555) 555-5555" />
      </div>

      <div className="pt-2 flex items-center justify-between gap-3">
        <div className="text-xs text-black/55">
          We’ll only “create an account” after you confirm booking (later via API).
        </div>
        <button className="rounded-full px-5 py-2.5 text-sm font-medium border bg-[#113D33] text-white border-[#113D33] hover:opacity-90 transition">
          Continue
        </button>
      </div>
    </form>
  );
}

function Input({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs text-black/60 mb-1">{label}</div>
      <input
        name={name}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
    </label>
  );
}
