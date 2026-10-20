/**
 * Labels for the booking flows' 7-day week strip.
 *
 * The header follows the WEEK being shown (not the selected day), so paging
 * into the next month says so right away: "October – November 2026". Each
 * day card also carries its 3-letter month so "1" and "2" after "31" read as
 * the new month.
 */
export function weekMonthLabel(weekStart: Date, days = 7): string {
  const last = new Date(weekStart);
  last.setDate(last.getDate() + days - 1);
  const month = (d: Date) => d.toLocaleDateString("en-US", { month: "long" });
  const y1 = weekStart.getFullYear();
  const y2 = last.getFullYear();
  if (y1 === y2 && weekStart.getMonth() === last.getMonth()) return `${month(weekStart)} ${y1}`;
  if (y1 === y2) return `${month(weekStart)} – ${month(last)} ${y1}`;
  return `${month(weekStart)} ${y1} – ${month(last)} ${y2}`;
}

export function monthAbbr(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short" });
}

export function fullDayLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
