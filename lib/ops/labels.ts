/** Display names for the ids the first-party analytics stores (lib/ops). Display only. */
export const FLOW_NAMES: Record<string, string> = {
  service: "Massage & facial",
  aescape: "Aescape",
  remedy_room: "Remedy Room",
  remedy_lounge: "Remedy Lounge (clubs)",
  membership: "Membership join",
  maven: "Maven hotel Aescape",
  lead: "Leads (enter-to-win, waitlist, founding)",
  gift: "Gift card checkout",
  checkout: "Membership checkout, detail",
};

/** Step order per flow, as the guest sees them. Unknown steps are listed after these. */
export const FLOW_STEPS: Record<string, string[]> = {
  service: ["welcome", "category", "treatment", "boosts", "time", "account", "name", "confirm", "booking", "done",
    // Larimer appointment waitlist (full day): offered → start → its own account/confirm steps → joined
    "waitlist-offered", "waitlist-start", "wl-account", "wl-name", "wl-confirm", "wl-booking", "waitlisted",
    // "Become a member" taps inside booking, then the detail events (lib/ops/client.ts useBookingDetail)
    "join-welcome", "join-click", "guest-new", "card-needed", "member-found", "member-missing", "accounts", "card-on-file", "card-new", "book-failed", "back"],
  aescape: ["select", "time", "email", "name", "card", "confirm", "booking", "done", "guest-new", "card-needed", "member-found", "member-missing", "accounts", "card-on-file", "card-new", "book-failed", "back"],
  remedy_room: ["select", "email", "name", "card", "confirm", "booking", "done", "guest-new", "card-needed", "member-found", "member-missing", "accounts", "card-on-file", "card-new", "book-failed", "back"],
  // sauna-failed = the Lounge booked but a sauna add-on did not, and the guest was told so
  // already-booked = stopped at Book: they already hold a Lounge visit that overlaps this one
  remedy_lounge: ["select", "sauna", "email", "name", "card", "confirm", "booking", "done", "sauna-failed", "already-booked", "guest-new", "card-needed", "member-found", "member-missing", "accounts", "card-on-file", "card-new", "book-failed", "back"],
  // Membership checkout PAGE (app/components/MembershipCheckout.tsx; every membership since
  // 11/23/2026): opened → plan → email → code → (member) → details → payment → review → done, and
  // "joined" on a real sale. "already" and "confirm" are the old pop-up's names for member and
  // review (kept for history; the pop-up's "details" was name + card on one screen).
  // from-founding / founding-joined = launch sites (the Launch Board reads them), from-booking /
  // joined-from-booking = came from the booking flow's "Become a member".
  membership: ["opened", "plan", "email", "code", "already", "member", "details", "payment", "confirm", "review", "done", "joined",
    "from-founding", "founding-joined", "from-booking", "joined-from-booking"],
  // Detail events from the checkout page, in the order they can happen. Variant = the plan unless
  // noted. from-* = the button that opened it. time-<screen> / left-<screen>: variant = time bucket.
  checkout: [
    "from-hero", "from-tier", "from-card", "from-compare", "from-sticky", "from-bar", "from-final", "from-founding", "from-membership",
    "from-offer", "from-location", "from-booking", "from-other", "from-direct",
    "plan-switch", "plan-change-open",
    "guest-new", "guest-returning", "code-sent", "code-resent", "code-wrong", "code-ok", "email-change",
    "already-member", "already-book", "already-continue",
    "card-on-file", "card-invalid", "card-rejected", "account-created", "card-saved", "card-change",
    "terms-open", "agree-checked", "submit", "join-failed", "declined", "off-sale", "uncertain", "session-expired",
    "time-plan", "time-email", "time-code", "time-member", "time-details", "time-payment", "time-review",
    "left-plan", "left-email", "left-code", "left-member", "left-details", "left-payment", "left-review",
  ],
  maven: ["session", "time", "email", "card", "confirm", "booking", "done"],
  // popup-hidden = homepage view where Larimer's sign-up popup was hidden because the guest has
  // another location selected (variant = that location; lib/locationPopups.ts)
  lead: ["popup-hidden"],
  gift: ["loading", "gift", "delivery", "email", "code", "profiles", "profile", "payment", "review", "done",
    "result-purchased", "result-pending", "result-unconfirmed", "result-released",
    // Detail, not funnel stages (11/24/2026): amount / design = what they went on with from the first
    // screen (variant = dollars, or typed-<nearest 25>; the design id), once a checkout.
    // occasion = filtered the designs (variant = which), occasions-more / designs-all = opened those.
    "amount", "design", "occasion", "occasions-more", "designs-all",
    // Holiday bonus (lib/holidayBonus.ts, Nov 26 to Dec 25): bonus-shown = saw the offer (variant
    // offer / unlocked), bonus-nudge = tapped "Make it $200" (variant = the amount they were on),
    // bonus-continue = left the first screen with / without it, bonus-who = recipient / self.
    // bonus-notice = saw the offer on a gift card page before the checkout (variant = which page)
    // strip-shown = saw the dated holiday band (variant = <page>-<bonus|late>)
    "bonus-shown", "bonus-nudge", "bonus-continue", "bonus-who", "bonus-notice", "strip-shown"],
};

export const LOCATION_NAMES: Record<string, string> = {
  "denver-larimer": "Larimer",
  "denver-rino": "RiNo",
  "denver-central-park": "Central Park",
  "union-market": "Union Market",
  "knox-henderson": "Knox-Henderson",
};

const SESSION_NAMES: Record<string, string> = {
  // Aescape
  "92": "Aescape 30-min",
  "93": "Aescape 60-min",
  "94": "Aescape 45-min",
  "95": "Aescape 15-min Express",
  "2951": "Brady Protocol",
  // Remedy Room
  "96": "Remedy Room",
  // Massage (Larimer ids since the Aug 2026 standardization; clubs keep the older ids)
  "2816": "Essential Signature Massage",
  "88": "Essential Signature Massage",
  "2817": "Essential Maternity Massage",
  "116": "Essential Maternity Massage",
  "98": "Premier Signature Massage",
  "2824": "Premier Maternity Massage",
  "99": "Premier Maternity Massage",
  "2821": "Premier Deep Tissue Massage",
  "100": "Premier Deep Tissue Massage",
  "2822": "Premier Salt Stone Massage",
  "101": "Premier Salt Stone Massage",
  "2823": "Premier Sports Massage",
  "102": "Premier Sports Massage",
  "89": "Premier Lymphatic Drainage Massage",
  "2830": "Ultimate Signature Massage",
  "105": "Ultimate Signature Massage",
  "2831": "Ultimate Deep Tissue Massage",
  "106": "Ultimate Deep Tissue Massage",
  "2832": "Ultimate Salt Stone Massage",
  "107": "Ultimate Salt Stone Massage",
  "2833": "Ultimate Sports Massage",
  "108": "Ultimate Sports Massage",
  "90": "Ultimate Lymphatic Drainage Massage",
  // Facials
  "75": "Essential Signature Facial",
  "78": "Premier Forever Young Facial",
  "80": "Premier Pore Perfection Facial",
  "81": "Premier Sensitive Silk Facial",
  "79": "Premier Glow Getter Facial",
  "77": "Premier Dr. Dennis Gross Vitamin C Facial",
  "85": "Ultimate Illuminate LED Facial",
  "82": "Ultimate Oxygen Infusion Facial",
  "103": "Ultimate Sculpt & Lift Microcurrent Facial",
  "104": "Ultimate Hydraderm",
  "84": "Ultimate Dr. Dennis Gross Vitamin C w/ LED",
};

/** "massage-2821" → "Massage · Premier Deep Tissue Massage"; "2951" → "Brady Protocol" */
export function variantLabel(v: string): string {
  if (!v || v === "-") return "(none)";
  const m = /^(massage|facial)-(\d+)$/.exec(v);
  if (m) return SESSION_NAMES[m[2]] ?? `${m[1]} ${m[2]}`;
  if (v === "massage" || v === "facial") return `${v[0].toUpperCase()}${v.slice(1)} (no treatment yet)`;
  return SESSION_NAMES[v] ?? v;
}
export const itemLabel = (flow: string, item: string) => {
  // Larimer appointment waitlist joins are leads with item "waitlist-<session type id>"
  const wl = flow === "lead" ? /^waitlist-(\d+)$/.exec(item) : null;
  if (wl) return `Waitlist · ${SESSION_NAMES[wl[1]] ?? wl[1]}`;
  return flow === "membership" || flow === "lead" ? item : SESSION_NAMES[item] ?? item;
};
