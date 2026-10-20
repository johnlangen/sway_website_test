/**
 * Optional multi-day range for the availability routes (`?days=7`), used by
 * the week strips' availability dots: ONE Mindbody call for the whole week
 * instead of one per day. Absent or invalid -> 1 day, i.e. the routes'
 * original single-day request, unchanged.
 */
export function rangeEnd(date: string, daysRaw: string | null): { end: string; days: number } {
  const n = Number(daysRaw);
  const days = Number.isInteger(n) && n >= 1 && n <= 14 ? n : 1;
  if (days === 1 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { end: date, days: 1 };
  const [y, m, d] = date.split("-").map(Number);
  const e = new Date(Date.UTC(y, m - 1, d + days - 1));
  const end = `${e.getUTCFullYear()}-${String(e.getUTCMonth() + 1).padStart(2, "0")}-${String(e.getUTCDate()).padStart(2, "0")}`;
  return { end, days };
}

/** True when Mindbody paginated (more results than it returned). */
export function isPartial(data: any, returned: number): boolean {
  const total = Number(data?.PaginationResponse?.TotalResults);
  return Number.isFinite(total) && total > returned;
}
