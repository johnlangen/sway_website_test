/**
 * Which locations have their own sign-up popup on the site.
 *
 * The plan (John 11/24/2026): every location gets its own popup. Today only Larimer has one: the
 * Attentive tag loaded in app/layout.tsx (cdn.attn.tv/swlasq, the Sway Larimer Square account)
 * shows Larimer's "$40 off, Denver locals" offer. A guest who has picked another location should
 * not see Larimer's offer on shared pages like the homepage, so the popup is hidden for them
 * (app/components/LocationPopupGate.tsx) until their location has one.
 *
 * When a location gets its own popup: load its tag for that location, then add its slug here.
 * Location pages themselves hide Larimer's popup in their layouts (HideFloatingWidgets).
 */
export const POPUP_LOCATIONS = new Set<string>(["denver-larimer"]);

/** No location picked yet = the default (Larimer's) popup shows. */
export function popupMatchesLocation(slug: string | null | undefined): boolean {
  return !slug || POPUP_LOCATIONS.has(slug);
}
