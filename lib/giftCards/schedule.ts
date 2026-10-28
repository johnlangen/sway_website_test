/**
 * Gift delivery dates (ported from the Spavia site's gift-schedule.ts). Today, or a date up to 29
 * days out (inside Resend's 30-day scheduling limit); a future date sends at 9 a.m. in the
 * location's time zone, daylight saving included. Safe to import in the browser.
 */
export const GIFT_SCHEDULE_DAYS = 29;

export function giftDate(zone: string, now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
export function lastGiftDate(zone: string, now = new Date()) {
  return new Date(Date.parse(giftDate(zone, now)) + GIFT_SCHEDULE_DAYS * 86400000).toISOString().slice(0, 10);
}
export function nextDay(date: string) {
  return new Date(Date.parse(date) + 86400000).toISOString().slice(0, 10);
}

class DateError extends Error {
  code = "date";
  status = 400;
}

/** Throws (code "date") unless `date` is today or within the next 29 days in `zone` */
export function checkGiftDate(date: string, zone: string, now = new Date()) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date + "T12:00:00Z").toISOString().slice(0, 10) !== date ||
    date < giftDate(zone, now) ||
    date > lastGiftDate(zone, now)
  )
    throw new DateError("Choose today or a delivery date within the next 29 days.");
}

/** When the gift email goes out: undefined = right away (today), else 9 a.m. local on that date */
export function giftScheduledAt(date: string, zone: string, now = new Date()): string | undefined {
  checkGiftDate(date, zone, now);
  if (date === giftDate(zone, now)) return undefined;
  const target = Date.parse(date + "T09:00:00Z");
  let time = target;
  for (let i = 0; i < 3; i++) {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-CA", {
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      })
        .formatToParts(new Date(time))
        .map((x) => [x.type, x.value]),
    );
    time += target - Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}Z`);
  }
  return new Date(time).toISOString();
}

export function giftDeliveryLabel(date: string, scheduled: boolean) {
  return scheduled
    ? `${new Date(date + "T12:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" })} at 9:00 a.m. Mountain time`
    : // The email goes right away; the card itself has the 24-hour activation hold (gift terms)
      "Emailed right after purchase, ready to use 24 hours later";
}
