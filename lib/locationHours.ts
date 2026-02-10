/**
 * Location operating hours — single source of truth.
 *
 * closingHour is in 24-hour format (e.g. 20 = 8 PM, 18 = 6 PM).
 * Days: 0 = Sunday, 1 = Monday, … , 6 = Saturday.
 *
 * Used by the booking UI to hide slots where extensions would
 * run past closing time.
 */

type DayHours = { open: number; close: number };

type LocationHours = {
  [locationSlug: string]: {
    [day: number]: DayHours;
  };
};

const LOCATION_HOURS: LocationHours = {
  "denver-larimer": {
    0: { open: 11, close: 18 }, // Sun  11 AM – 6 PM
    1: { open: 10, close: 20 }, // Mon  10 AM – 8 PM
    2: { open: 10, close: 20 }, // Tue  10 AM – 8 PM
    3: { open: 10, close: 20 }, // Wed  10 AM – 8 PM
    4: { open: 10, close: 20 }, // Thu  10 AM – 8 PM
    5: { open: 10, close: 20 }, // Fri  10 AM – 8 PM
    6: { open: 9, close: 18 },  // Sat   9 AM – 6 PM
  },
};

/**
 * Get the closing hour (24h) for a location on a given day.
 * Falls back to 20 (8 PM) if location or day is unknown.
 */
export function getClosingHour(
  locationSlug: string,
  dayOfWeek: number
): number {
  return LOCATION_HOURS[locationSlug]?.[dayOfWeek]?.close ?? 20;
}

export { LOCATION_HOURS };
