"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------------------------------------------
   EVENT CONFIG
--------------------------------------------- */

const EVENT_DATE_ISO = "2026-02-28";

const EVENT_ASSETS = {
  hero: "/assets/eventballoon.png",
  details: "/assets/eventgreen.png",

} as const;

const EVENT_OPTIONS = [
  {
    id: 71,
    label: "Aescape",
    minutes: 30,
    price: "$49",
    image: "/assets/aescapeblog2.jpg",
    bestFor: "Robot massage • Quick reset",
  },
  {
    id: 70,
    label: "Remedy Room",
    minutes: 30,
    price: "$49",
    image: "/assets/remedy-room3.jpg",
    bestFor: "Cold plunge • Sauna • Recovery",
  },
  {
    id: 69,
    label: "Massage",
    minutes: 30,
    price: "$49",
    image: "/assets/massage2.png",
    bestFor: "Swedish • Event express",
  },
  {
    id: 68,
    label: "Facial",
    minutes: 30,
    price: "$49",
    image: "/assets/facial5.png",
    bestFor: "Glow Getter • Event express",
  },
] as const;

type EventOption = (typeof EVENT_OPTIONS)[number];

type Step = "select" | "email" | "card" | "confirm" | "done";
type CardContext = "create_account" | "add_card" | null;

/* ---------------------------------------------
   DATE/TIME HELPERS
--------------------------------------------- */

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

/**
 * Mindbody sometimes returns datetimes WITHOUT a timezone offset.
 * Force local parsing when no offset/Z is present.
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
   SLOT SHAPES (NO GENERATED TIMES)
--------------------------------------------- */

type ApiSlot = {
  startDateTime: string; // EXACT Mindbody start time
  staffId: number | null;
  staffName: string | null;
};

type DisplaySlot = {
  startDateTime: string; // EXACT Mindbody start time (send this back to book)
  start: Date; // for display only
  staffId: number | null;
  staffName: string | null;
};

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
  if (
    /^5[1-5]/.test(n) ||
    /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(n)
  )
    return "MasterCard";
  if (/^3[47]/.test(n)) return "AmericanExpress";
  if (/^6(011|5)/.test(n) || /^64[4-9]/.test(n)) return "Discover";

  return "Visa";
}

/* ---------------------------------------------
   PAGE
--------------------------------------------- */

export default function AnniversaryEventPage() {
  const eventDate = useMemo(() => new Date(`${EVENT_DATE_ISO}T00:00:00`), []);

  const bookingRef = useRef<HTMLDivElement | null>(null);

  const [sessionTypeId, setSessionTypeId] = useState<EventOption["id"]>(71);

  const selectedOption = useMemo(
    () => EVENT_OPTIONS.find((o) => o.id === sessionTypeId)!,
    [sessionTypeId]
  );

  const [step, setStep] = useState<Step>("select");
  const [email, setEmail] = useState("");

  const [slots, setSlots] = useState<DisplaySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<DisplaySlot | null>(null);

  const [loading, setLoading] = useState(false);
  const [cardSaving, setCardSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cardContext, setCardContext] = useState<CardContext>(null);
  const [clientId, setClientId] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  const bookingLock = useRef(false);

  // Uncontrolled refs for card (avoid putting card data in React state)
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expMonthRef = useRef<HTMLSelectElement | null>(null);
  const expYearRef = useRef<HTMLSelectElement | null>(null);
  const postalCodeRef = useRef<HTMLInputElement | null>(null);

  const expMonthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );

  const expYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(currentYear + i));
  }, []);

  const mindbodyBookingUrl = useMemo(() => {
    const siteId = process.env.NEXT_PUBLIC_MINDBODY_SITE_ID;
    if (!siteId) return null;
    return `https://clients.mindbodyonline.com/classic/ws?studioid=${siteId}&stype=-9`;
  }, []);

  function scrollToBooking() {
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  // Disable global snap if your site uses it
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

  // Fetch availability when service changes (NO GENERATED TIMES — USE EXACT STARTS FROM API)
  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedSlot(null);
    setSlots([]);

    const url = `/api/events/anniversary/availability?sessionTypeId=${sessionTypeId}&date=${EVENT_DATE_ISO}`;
    console.log("[EVENT PAGE] Fetch availability:", url);

    fetch(url)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error("[EVENT PAGE] Availability error:", data);
          throw new Error(data?.error || "Unable to load availability.");
        }
        return data;
      })
      .then((data) => {
        const apiSlots: ApiSlot[] = Array.isArray(data?.slots) ? data.slots : [];

        const mapped: DisplaySlot[] = apiSlots
          .filter((s) => s?.startDateTime)
          .map((s) => ({
            startDateTime: s.startDateTime,
            start: parseMindbodyDateTime(s.startDateTime),
            staffId:
              typeof s.staffId === "number" && Number.isFinite(s.staffId)
                ? s.staffId
                : null,
            staffName:
              typeof s.staffName === "string" && s.staffName.trim()
                ? s.staffName.trim()
                : null,
          }))
          .sort((a, b) => a.start.getTime() - b.start.getTime());

        setSlots(mapped);

        console.log("[EVENT PAGE] Availability loaded:", {
          sessionTypeId,
          count: mapped.length,
          first: mapped[0]?.startDateTime,
          last: mapped[mapped.length - 1]?.startDateTime,
        });
      })
      .catch((err: any) => {
        console.error("[EVENT PAGE] Availability fetch failed:", err);
        setSlots([]);
        setError(err?.message || "Unable to load availability.");
      })
      .finally(() => setLoading(false));
  }, [sessionTypeId]);

  async function lookupClientByEmail(emailToCheck: string) {
    const url = `/api/mindbody/client-lookup?email=${encodeURIComponent(
      emailToCheck
    )}`;
    console.log("[EVENT PAGE] Client lookup:", url);

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      console.error("[EVENT PAGE] Client lookup error:", data);
      throw new Error(data?.error || "Client lookup failed.");
    }
    return data as {
      found: boolean;
      client: { Id: number } | null;
      hasCardOnFile: boolean;
    };
  }

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

  async function handleContinueFromSelect() {
    setError(null);
    if (!selectedSlot) {
      setError("Please select a time.");
      return;
    }
    setStep("email");
    scrollToBooking();
  }

  async function handleConfirmBooking() {
    setError(null);

    if (!selectedSlot) {
      setError("Please select a time.");
      setStep("select");
      scrollToBooking();
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
        setClientId(Number(lookup.client!.Id));
        setStep("card");
        scrollToBooking();
        return;
      }

      if (!lookup.found) {
        setCardContext("create_account");
        setClientId(null);
        setStep("card");
        scrollToBooking();
        return;
      }

      setClientId(Number(lookup.client!.Id));
      setStep("confirm");
      scrollToBooking();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStep("email");
      scrollToBooking();
    }
  }

  async function handleSaveCardAndContinue() {
    setError(null);

    const normalized = normalizeEmail(email);
    if (!isValidEmail(normalized)) {
      setError("Please enter a valid email address.");
      setStep("email");
      scrollToBooking();
      return;
    }

    if (!cardContext) {
      setError("Missing setup context. Please start again.");
      setStep("email");
      scrollToBooking();
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
      let resolvedClientId: number | null = null;

      if (cardContext === "create_account") {
        if (!firstName.trim() || !lastName.trim()) {
          throw new Error("Please enter your first and last name.");
        }

        console.log("[EVENT PAGE] Creating client + card:", {
          email: normalized,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          hasPhone: !!mobilePhone.trim(),
        });

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
            cardType,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("[EVENT PAGE] Create client failed:", data);
          throw new Error(data?.error || "Unable to create your account.");
        }

        resolvedClientId = Number(data.clientId);
        if (!resolvedClientId)
          throw new Error("Account created, but client ID missing.");
      }

      if (cardContext === "add_card") {
        if (!clientId) throw new Error("Missing client ID for card update.");

        console.log("[EVENT PAGE] Updating client card:", { clientId });

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
          console.error("[EVENT PAGE] Update card failed:", data);
          throw new Error(
            data?.error || "Unable to save your card. Please try again."
          );
        }

        resolvedClientId = Number(clientId);
      }

      setClientId(resolvedClientId);
      setStep("confirm");
      scrollToBooking();
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
      scrollToBooking();
      return;
    }

    if (!selectedSlot) {
      setError("Missing selected time. Please start again.");
      setStep("select");
      scrollToBooking();
      return;
    }

    if (bookingLock.current) return;
    bookingLock.current = true;

    const payload = {
      clientId,
      sessionTypeId,
      // IMPORTANT: send EXACT Mindbody startDateTime we received (no ISO conversion)
      startDateTime: selectedSlot.startDateTime,
      staffId: selectedSlot.staffId,
      locationId: 1,
    };

    console.log("[EVENT PAGE] Booking payload:", payload);

    try {
      const res = await fetch("/api/events/anniversary/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("[EVENT PAGE] Booking failed:", data);
        throw new Error(data?.error || "Booking failed. Please try again.");
      }

      console.log("[EVENT PAGE] Booking success:", data);

      setStep("done");
      scrollToBooking();
    } catch (err: any) {
      setError(err.message || "Booking failed. Please try again or call us.");
      setStep("confirm");
      scrollToBooking();
    } finally {
      bookingLock.current = false;
    }
  }

  const summaryText = useMemo(() => {
    if (!selectedSlot) return null;
    return `${selectedOption.label} • ${formatDayLabel(
      eventDate
    )} • ${formatTime12h(selectedSlot.start)}${
      selectedSlot.staffName ? ` • ${selectedSlot.staffName}` : ""
    }`;
  }, [selectedOption.label, eventDate, selectedSlot]);

  return (
    <div className="min-h-screen bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[520px] md:h-[620px] w-full">
          <Image
            src={EVENT_ASSETS.hero}
            alt="Sway Turns One!"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl px-5 md:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-2 text-white/90 text-xs tracking-wide uppercase">
                Anniversary Event • {formatDayLabel(eventDate)}
              </div>

              <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight">
                Sway Turns One!
              </h1>

              <p className="mt-3 text-white/85 max-w-xl leading-relaxed">
                <span className="font-semibold">$49</span>. Limited spots.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  onClick={() => {
                    setError(null);
                    if (step === "done") setStep("select");
                    scrollToBooking();
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#113D33] font-semibold px-6 py-3 hover:opacity-95 transition focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Reserve Your Spot
                </button>
              </div>

              <div className="mt-6 text-xs text-white/75">
                Prefer booking by phone?{" "}
                <a
                  href="tel:3034766150"
                  className="underline underline-offset-4 hover:text-white"
                >
                  (303) 476-6150
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="relative py-14 md:py-18">
        <div className="absolute inset-0">
          <Image
            src={EVENT_ASSETS.details}
            alt="Event details"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0C2F27]/55" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm p-6 md:p-8 text-white">
              <div className="text-xs uppercase tracking-wide text-white/75 mb-2">
                What you get
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-3">
                $49 Ticket
              </div>

              <ul className="space-y-2 text-white/90 leading-relaxed">
                <li>• 30-minute express treatment (choose one)</li>
                <li className="pl-4 text-white/80">
                  Aescape • Remedy Room • Massage • Facial
                </li>
                <li>• Custom Sway latte from Huckleberry Coffee Roasters</li>
                <li>• Goodie bag</li>
                <li>
                  • À la carte Sway stitch bar (bring an item to personalize)
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm p-6 md:p-8 text-white">
              <div className="text-xs uppercase tracking-wide text-white/75 mb-2">
                When / Where
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-lg font-semibold">
                    {formatDayLabel(eventDate)}
                  </div>
                  <div className="text-white/85">9:00 AM – 12:00 PM</div>
                </div>

                <div className="h-px bg-white/15" />

                <div>
                  <div className="text-lg font-semibold">Sway Wellness Spa</div>
                  <div className="text-white/85">
                    1428 Larimer St, Denver, CO 80202
                  </div>
                </div>

                <div className="h-px bg-white/15" />

                <div className="text-sm text-white/80">
                  Remedy Room spots may fill first — if it’s sold out, you can
                  still book any of the other three experiences.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* BOOKING */}
      <section ref={bookingRef} className="pb-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mt-12 mb-6 md:mb-8">

            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Reserve your spot
            </h2>
            <p className="mt-2 text-center text-[#113D33]/75">
              Choose your experience, pick a time, then reserve with email +
              card on file.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-8 max-w-3xl mx-auto text-left bg-white/70 border border-[#113D33]/15 rounded-2xl p-5">
            <div className="text-sm uppercase tracking-wide opacity-70 mb-1">
              Your selection
            </div>
            <div className="font-semibold">
              {summaryText ?? "Select a service and time to continue."}
            </div>
            {error && <div className="mt-3 text-sm text-red-700">{error}</div>}
          </div>

          {step === "select" && (
            <div className="text-left max-w-5xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">
                1. Choose an experience
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {EVENT_OPTIONS.map((opt) => {
                  const selected = opt.id === sessionTypeId;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSessionTypeId(opt.id);
                        setError(null);
                      }}
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
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        {selected && (
                          <div className="absolute top-4 right-4 bg-[#113D33] text-white text-xs px-3 py-1 rounded-full">
                            Selected
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold">{opt.label}</div>
                            <div className="text-sm text-[#113D33]/70 mt-1">
                              {opt.bestFor}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm opacity-80">{opt.price}</div>
                            <div className="text-xs text-[#113D33]/60 mt-1">
                              {opt.minutes} min
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-center">
                2. Choose a time
              </h3>

              {loading && (
                <p className="text-center text-[#113D33]/70">Loading…</p>
              )}

              {!loading && slots.length === 0 && (
                <p className="text-center text-[#113D33]/70">
                  No times available.
                </p>
              )}

              {!loading && slots.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                  {slots.map((s) => {
                    const isSelected =
                      selectedSlot?.startDateTime === s.startDateTime &&
                      selectedSlot?.staffId === s.staffId;

                    const key = `${s.startDateTime}|${s.staffId ?? "null"}`;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedSlot(s);
                          setError(null);
                        }}
                        className={`py-2.5 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30 ${
                          isSelected
                            ? "bg-[#113D33] text-white border-[#113D33]"
                            : "border-[#113D33]/25 bg-white/60 hover:bg-white"
                        }`}
                      >
                        <div className="text-sm font-semibold">
                          {formatTime12h(s.start)}
                        </div>
                        {s.staffName && (
                          <div
                            className={`text-[11px] mt-1 ${
                              isSelected
                                ? "text-white/80"
                                : "text-[#113D33]/60"
                            }`}
                          >
                            {s.staffName}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="max-w-md mx-auto">
                <button
                  disabled={!selectedSlot}
                  onClick={handleContinueFromSelect}
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
            <div className="flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Enter your email to reserve
                </h3>
                <p className="text-sm text-[#113D33]/75 mb-4 text-center">
                  This helps us find (or create) your Mindbody account.
                </p>

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
                  disabled={!selectedSlot || !isValidEmail(email)}
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-[#113D33] text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Continue
                </button>

                <button
                  onClick={() => {
                    setError(null);
                    setStep("select");
                    scrollToBooking();
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "card" && (
            <div className="flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {cardContext === "create_account"
                    ? "Create your account"
                    : "Add a card to your account"}
                </h3>

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
                    placeholder="Name on card"
                    className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  />

                  <input
                    ref={cardNumberRef}
                    autoComplete="off"
                    name="cc-number"
                    inputMode="numeric"
                    placeholder="Card number"
                    className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <select
                      ref={expMonthRef}
                      name="cc-exp-month"
                      autoComplete="off"
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
                      placeholder="ZIP"
                      className="w-full px-4 py-3 border rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                    />
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
                    setStep("email");
                    scrollToBooking();
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Confirm your booking
                </h3>

                <div className="rounded-2xl border border-[#113D33]/15 bg-white/70 overflow-hidden mb-4">
                  <div className="relative h-40 w-full">
                    <Image
                      src={selectedOption.image}
                      alt={selectedOption.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  <div className="p-4">
                    <div className="text-sm uppercase tracking-wide opacity-70 mb-2">
                      Summary
                    </div>
                    <div className="font-semibold">{summaryText}</div>
                    <div className="text-sm text-[#113D33]/70 mt-1">
                      {selectedOption.price} • {selectedOption.minutes} min
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#113D33]/80 leading-relaxed mb-4">
                  We’ll reserve this appointment under{" "}
                  <span className="font-semibold">{normalizeEmail(email)}</span>.
                  No charge today — your card is stored in Mindbody for no-show /
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
                    scrollToBooking();
                  }}
                  className="w-full mt-3 py-3 rounded-xl border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="flex items-start justify-center">
              <div className="w-full max-w-md mx-auto bg-white/70 border border-[#113D33]/15 rounded-2xl p-6 text-left">
                <h3 className="text-2xl font-bold mb-2">You’re booked!</h3>
                <p className="text-[#113D33]/80">
                  Check your email for confirmation. See you soon.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <Link
                    href="/offers"
                    className="inline-block w-full text-center px-6 py-3 rounded-full bg-[#113D33] text-white font-semibold hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    View offers
                  </Link>

                  <a
                    href="tel:3034766150"
                    className="inline-block w-full text-center px-6 py-3 rounded-full border-2 border-[#113D33] text-[#113D33] font-semibold hover:bg-[#113D33] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    Need help? Call (303) 476-6150
                  </a>

                  <button
                    onClick={() => {
                      setStep("select");
                      setError(null);
                      setEmail("");
                      setSelectedSlot(null);
                      setClientId(null);
                      setCardContext(null);
                      setFirstName("");
                      setLastName("");
                      setMobilePhone("");
                      scrollToBooking();
                    }}
                    className="inline-block w-full text-center px-6 py-3 rounded-full border border-[#113D33]/25 bg-white/60 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#113D33]/30"
                  >
                    Book another spot
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer micro-help */}
          <div className="mt-10 text-center text-xs text-[#113D33]/60">
            Questions?{" "}
            <a className="underline underline-offset-4" href="tel:3034766150">
              (303) 476-6150
            </a>
            {mindbodyBookingUrl && (
              <>
                {" "}
                •{" "}
                <a
                  className="underline underline-offset-4"
                  href={mindbodyBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book in Mindbody
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
