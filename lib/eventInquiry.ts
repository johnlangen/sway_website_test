/**
 * The Event & Experience Inquiry Form (Google Form, owned by Mackenzie at swayrino.com).
 *
 * LOCATION_ENTRY_ID is the form's "Which Sway location is this for?" question, used to pick the
 * location ahead of time. The location names must match that dropdown exactly, and the Apps Script
 * on the form uses the same names to email the right club, so change all three together.
 */

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd9_omHKOTtoZpGkIkkxQlVO7hVY_IokFjjgIGTCb9wZcFvLA/viewform";
const LOCATION_ENTRY_ID = "728862066";

export type EventFormLocation = "Sway Larimer" | "Sway RiNo" | "Sway Central Park";

export function eventFormUrl(location: EventFormLocation, embedded: boolean): string {
  const params = new URLSearchParams({ usp: "pp_url", [`entry.${LOCATION_ENTRY_ID}`]: location });
  if (embedded) params.set("embedded", "true");
  return `${FORM_URL}?${params.toString()}`;
}
