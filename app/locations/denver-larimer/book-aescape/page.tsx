"use client";

import { useEffect, useMemo, useState } from "react";

/* ---------------------------------------------
   AESCAPE SESSION OPTIONS
--------------------------------------------- */

const AESCAPE_OPTIONS = [
  { id: 59, label: "15 Minute Express", price: "$49" },
  { id: 60, label: "30 Minute Full Body", price: "$69" },
  { id: 61, label: "45 Minute Full Body", price: "$99" },
  { id: 62, label: "60 Minute Full Body", price: "$139" },
];

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

    while (cursor <= lastStart) {
      results.push(new Date(cursor));
      cursor.setMinutes(cursor.getMinutes() + 10);
    }
  });

  return results;
}

/* ---------------------------------------------
   PAGE
--------------------------------------------- */

export default function BookAescapePage() {
  const today = useMemo(() => new Date(), []);

  const [sessionTypeId, setSessionTypeId] = useState(60);
  const [weekStart, setWeekStart] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatISO(today));
  const [times, setTimes] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<
    "select" | "email" | "billing" | "booking" | "done"
  >("select");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [billingContext, setBillingContext] = useState<
    "no_account" | "no_card" | null
  >(null);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  /* ---------------------------------------------
     OPEN BILLING POPUP
  --------------------------------------------- */

  function openBillingPopup(context: "no_account" | "no_card") {
    const siteId = process.env.NEXT_PUBLIC_MINDBODY_SITE_ID;
    if (!siteId) {
      setError("Mindbody site not configured.");
      return;
    }

    setBillingContext(context);
    setError(null);

    const url =
      `https://clients.mindbodyonline.com/consumermyinfo/` +
      `?studioid=${siteId}&tabID=2&fl=true`;

    window.open(
      url,
      "mindbody_billing",
      "width=420,height=720,resizable=yes,scrollbars=yes"
    );

    setStep("billing");
  }

  /* ---------------------------------------------
     FETCH AVAILABILITY
  --------------------------------------------- */

  useEffect(() => {
    setLoading(true);
    setSelectedTime(null);
    setError(null);

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

  const groupedTimes = useMemo(() => groupTimes(times), [times]);

  /* ---------------------------------------------
     CONFIRM BOOKING
  --------------------------------------------- */

  async function handleConfirmBooking() {
    setError(null);

    try {
      const lookupRes = await fetch(
        `/api/mindbody/client-lookup?email=${encodeURIComponent(email)}`
      );
      const lookup = await lookupRes.json();

      if (!lookup.found) {
        openBillingPopup("no_account");
        return;
      }

      if (!lookup.hasCardOnFile) {
        openBillingPopup("no_card");
        return;
      }

      setStep("booking");

      const bookRes = await fetch("/api/mindbody/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: lookup.client.Id,
          sessionTypeId,
          startDateTime: formatLocalDateTime(selectedTime!),
        }),
      });

      if (!bookRes.ok) throw new Error("Booking failed.");

      setStep("done");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setStep("email");
    }
  }

  /* ---------------------------------------------
     RENDER
  --------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#F7F4E9] px-4 pt-40 pb-24 font-vance">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[#113D33] mb-8">
          Book Your Aescape Robot Massage
        </h1>

        {step === "select" && (
          <>
            {/* SESSION */}
            <section className="mb-14">
              <h2 className="text-xl font-semibold mb-4">
                1. Choose Your Session
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AESCAPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSessionTypeId(opt.id)}
                    className={`p-5 rounded-xl border text-left ${
                      sessionTypeId === opt.id
                        ? "border-[#113D33] bg-[#113D33]/5"
                        : "border-[#113D33]/20"
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-sm opacity-70">{opt.price}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* DAY PICKER */}
            <section className="mb-14">
              <h2 className="text-xl font-semibold mb-4">2. Choose a Day</h2>

              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setWeekStart(addDays(weekStart, -7))}>
                  ←
                </button>

                <div className="flex gap-2 overflow-x-auto">
                  {weekDays.map((day) => {
                    const iso = formatISO(day);
                    return (
                      <button
                        key={iso}
                        onClick={() => setSelectedDate(iso)}
                        className={`px-4 py-3 rounded ${
                          iso === selectedDate
                            ? "bg-[#113D33] text-white"
                            : "border border-[#113D33]/30"
                        }`}
                      >
                        {iso === formatISO(today)
                          ? "Today"
                          : formatDayLabel(day)}
                      </button>
                    );
                  })}
                </div>

                <button onClick={() => setWeekStart(addDays(weekStart, 7))}>
                  →
                </button>
              </div>
            </section>

            {/* TIMES */}
            <section className="mb-16 text-left">
              <h2 className="text-xl font-semibold text-center mb-4">
                3. Choose a Time
              </h2>

              {loading && <p className="text-center">Loading…</p>}
              {error && <p className="text-center text-red-700">{error}</p>}

              {!loading &&
                !error &&
                Object.entries(groupedTimes).map(
                  ([label, times]) =>
                    times.length > 0 && (
                      <div key={label} className="mb-6">
                        <h3 className="text-sm opacity-70 mb-2">{label}</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {times.map((time) => (
                            <button
                              key={time.toISOString()}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 rounded border ${
                                selectedTime?.getTime() === time.getTime()
                                  ? "bg-[#113D33] text-white"
                                  : "border-[#113D33]/30"
                              }`}
                            >
                              {formatTime12h(time)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                )}
            </section>

            <button
              disabled={!selectedTime}
              onClick={() => setStep("email")}
              className="px-10 py-4 rounded-full bg-[#113D33] text-white font-bold disabled:opacity-40"
            >
              Continue
            </button>
          </>
        )}

        {step === "email" && (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
              Enter the email you use to sign in
            </h2>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full px-4 py-3 border rounded mb-4"
            />

            {error && <p className="text-red-700 text-sm mb-3">{error}</p>}

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 bg-[#113D33] text-white rounded font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        )}

        {step === "billing" && (
          <div className="max-w-md mx-auto">
            <p className="font-semibold mb-3">
              {billingContext === "no_account"
                ? "Create an account and add a payment method to secure your booking."
                : "Add a payment method to secure your booking."}
            </p>

            <p className="text-sm opacity-70 mb-6">
              You’ll be taken to a secure Mindbody page. When finished, return
              here and click below.
            </p>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 bg-[#113D33] text-white rounded font-semibold"
            >
              I’ve added my card
            </button>

            <p className="text-xs opacity-60 mt-4">
              Make sure you sign in using the same email entered above.
            </p>
          </div>
        )}

        {step === "booking" && (
          <p className="text-lg font-semibold">
            Booking your appointment…
          </p>
        )}

        {step === "done" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">You're booked! 🎉</h2>
            <p>Check your email for confirmation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
