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
};

/** Step order per flow, as the guest sees them. Unknown steps are listed after these. */
export const FLOW_STEPS: Record<string, string[]> = {
  service: ["welcome", "category", "treatment", "boosts", "time", "account", "name", "confirm", "booking", "done"],
  aescape: ["select", "time", "email", "name", "card", "confirm", "booking", "done"],
  remedy_room: ["select", "email", "name", "card", "confirm", "booking", "done"],
  remedy_lounge: ["select", "sauna", "email", "name", "card", "confirm", "booking", "done"],
  membership: ["email", "code", "already", "details", "confirm", "done"],
  maven: ["session", "time", "email", "card", "confirm", "booking", "done"],
  lead: [],
  gift: ["gift", "delivery", "email", "code", "profiles", "profile", "payment", "review", "done"],
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
export const itemLabel = (flow: string, item: string) => (flow === "membership" || flow === "lead" ? item : SESSION_NAMES[item] ?? item);
