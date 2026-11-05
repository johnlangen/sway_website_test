/** Sway Larimer's hours. If they change, update the JSON-LD in app/locations/denver-larimer/layout.tsx too. */

export const LARIMER_SCHEDULE: Record<string, { opens: number; closes: number; label: string; closesLabel: string }> = {
  Mon: { opens: 10 * 60, closes: 20 * 60, label: "10:00 AM", closesLabel: "8:00 PM" },
  Tue: { opens: 10 * 60, closes: 20 * 60, label: "10:00 AM", closesLabel: "8:00 PM" },
  Wed: { opens: 10 * 60, closes: 20 * 60, label: "10:00 AM", closesLabel: "8:00 PM" },
  Thu: { opens: 10 * 60, closes: 20 * 60, label: "10:00 AM", closesLabel: "8:00 PM" },
  Fri: { opens: 10 * 60, closes: 20 * 60, label: "10:00 AM", closesLabel: "8:00 PM" },
  Sat: { opens: 9 * 60, closes: 18 * 60, label: "9:00 AM", closesLabel: "6:00 PM" },
  Sun: { opens: 11 * 60, closes: 18 * 60, label: "11:00 AM", closesLabel: "6:00 PM" },
};

/** Serverless and guest clocks vary, so always read the time in Denver. */
export function getDenverTimeParts() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    weekday: "short",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return {
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    weekday: get("weekday"),
  };
}

export function getOpenStatus() {
  const { hour, minute, weekday } = getDenverTimeParts();
  const mins = hour * 60 + minute;

  const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = LARIMER_SCHEDULE[weekday];

  if (mins >= today.opens && mins < today.closes) {
    return { open: true, label: "Open now" };
  }

  // Before opening today, show today's opening time
  if (mins < today.opens) {
    return { open: false, label: `Closed · Opens at ${today.label}` };
  }

  // Past closing, show the next day's opening time
  const todayIdx = dayOrder.indexOf(weekday);
  const nextDay = dayOrder[(todayIdx + 1) % 7];
  const next = LARIMER_SCHEDULE[nextDay];

  return {
    open: false,
    label: `Closed · Opens ${nextDay} at ${next.label}`,
  };
}
