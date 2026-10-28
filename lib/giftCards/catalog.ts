/**
 * The gift card catalog and every rule about what a guest may buy (ported from the Spavia site's
 * gift-cards.ts / gift-amounts.ts). Prices always come from Mindbody; artwork comes from Sway's
 * own library (artwork.ts), never Mindbody's 200 px layouts.
 */
import { GiftError, sha256 } from "./store";
import { giftDesigns, type GiftDesign } from "./artwork";
import { checkGiftDate } from "./schedule";
export { GIFT_CARD_TERMS, GIFT_ACTIVATION_NOTICE } from "./terms";
export { GIFT_AMOUNTS, DEFAULT_GIFT_AMOUNT, giftAmountOptions, defaultGiftAmount, type GiftAmountOption } from "./amounts";
import type { GiftSite } from "./sites";

export type GiftProduct = {
  id: number;
  name: string;
  /** What the card holds */
  value: number;
  /** What the guest pays (a promotion can sell below value) */
  price: number;
  /** The "any amount" card: the guest sets the amount, value = price */
  custom: boolean;
  available: boolean;
  terms: string;
  designs: GiftDesign[];
  version: string;
};

export type GiftDetails = {
  productId: number;
  amount: number;
  designId: number;
  recipient: string;
  recipientEmail: string;
  sender: string;
  title: string;
  message: string;
  deliveryDate: string;
  payment: "stored" | "new";
};

export { MAX_GIFT } from "./terms";
import { MAX_GIFT } from "./terms";

const row = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
export const isCash = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v >= 0 && Math.abs(v * 100 - Math.round(v * 100)) < 0.00001;
const isId = (v: unknown): v is number => typeof v === "number" && Number.isSafeInteger(v) && v > 0;
const plain = (v: unknown) =>
  typeof v === "string"
    ? v
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .trim()
    : "";

/** Mindbody's default terms carry <STUDIONAME>/<STUDIOPHONE>/<WEBPAGE> placeholders (they came out blank at Spavia) */
function fillTerms(raw: unknown, site: GiftSite) {
  if (typeof raw !== "string") return "";
  return plain(
    raw
      .replace(/<STUDIONAME>/gi, site.name)
      .replace(/<STUDIOPHONE>/gi, site.phone)
      .replace(/<WEBPAGE>/gi, `https://swaywellnessspa.com/locations/${site.slug}/`),
  );
}

export function normalizeGifts(records: unknown[], site: GiftSite): GiftProduct[] {
  const designs = giftDesigns();
  const ids = new Set<number>();
  return records.flatMap((raw) => {
    const c = row(raw);
    if (c.SoldOnline !== true) return [];
    if (!Array.isArray(c.LocationIds) || !Array.isArray(c.MembershipRestrictionIds))
      throw new GiftError("catalog", "Gift card availability needs review.", 503);
    if (c.LocationIds.length && !c.LocationIds.includes(site.locationId)) return [];
    if (!isId(c.Id) || ids.has(c.Id) || !isCash(c.CardValue) || !isCash(c.SalePrice) || typeof c.EditableByConsumer !== "boolean")
      throw new GiftError("catalog", "We couldn't confirm the gift card catalog.", 503);
    ids.add(c.Id);
    const custom = c.EditableByConsumer && c.CardValue === c.SalePrice;
    const product = {
      id: c.Id,
      name: plain(c.Description) || "Sway gift card",
      value: c.CardValue as number,
      price: c.SalePrice as number,
      custom,
      available: c.MembershipRestrictionIds.length === 0 && (custom || ((c.CardValue as number) > 0 && (c.SalePrice as number) > 0)),
      terms: fillTerms(c.GiftCardTerms, site),
      designs,
    };
    return [
      {
        ...product,
        version: sha256(JSON.stringify({ ...product, restrictions: c.MembershipRestrictionIds, locations: c.LocationIds })).slice(0, 24),
      },
    ];
  });
}

/** What the page offers: one "Custom amount" card (the $0-value one), fixed cards at their price */
export function sellableGifts(products: GiftProduct[]) {
  const usable = products.filter((p) => p.available && p.designs.length);
  const custom = usable.find((p) => p.custom && p.value === 0) ?? usable.find((p) => p.custom);
  return usable.map((p) => (p.custom && p !== custom && p.value > 0 ? { ...p, custom: false } : p)).filter((p) => !p.custom || p === custom);
}

// ---------------------------------------------------------------- the guest's details
function short(value: unknown, max: number, label: string, optional = false) {
  if (typeof value !== "string" || (!optional && !value.trim()) || value.trim().length > max || /[<>\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value))
    throw new GiftError("details", `Please check ${label}.`);
  return value.trim();
}
// Free text: "<3" or a pasted line was refused at payment with no way to see why (Spavia, 10/14).
// Angle brackets become look-alikes, invisible control characters go (line breaks stay in the note).
function giftText(value: unknown) {
  if (typeof value !== "string") return value;
  return value
    .replace(/</g, "‹")
    .replace(/>/g, "›")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "");
}
export const normalizeEmail = (s: unknown) => (typeof s === "string" ? s.trim().toLowerCase() : "");
export const isValidEmail = (s: string) => s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

export function giftSelection(site: GiftSite, products: GiftProduct[], input: GiftDetails) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new GiftError("details", "Please complete your gift details.");
  const product = products.find((p) => p.id === input.productId && p.available);
  if (!product) throw new GiftError("product", "Choose an available gift card.");
  const amount = product.custom ? input.amount : product.price;
  if (!isCash(amount) || amount < 1 || amount > MAX_GIFT || (!product.custom && input.amount !== product.price))
    throw new GiftError("amount", `Choose a gift amount between $1 and $${MAX_GIFT.toLocaleString("en-US")}.`);
  if (!product.designs.some((d) => d.id === input.designId)) throw new GiftError("design", "Choose one of the gift designs.");
  const recipientEmail = normalizeEmail(short(input.recipientEmail, 100, "the recipient email"));
  if (!isValidEmail(recipientEmail)) throw new GiftError("details", "Enter a valid recipient email.");
  const deliveryDate = short(input.deliveryDate, 10, "the delivery date");
  try {
    checkGiftDate(deliveryDate, site.timezone);
  } catch (e) {
    throw new GiftError("date", e instanceof Error ? e.message : "Check the delivery date.");
  }
  if (input.payment !== "stored" && input.payment !== "new") throw new GiftError("payment", "Choose how you'd like to pay.");
  return {
    product,
    value: product.custom ? amount : product.value,
    details: {
      productId: product.id,
      amount,
      designId: input.designId,
      recipient: short(giftText(input.recipient), 50, "the recipient name"),
      recipientEmail,
      sender: short(giftText(input.sender), 50, "the sender name"),
      title: short(giftText(input.title), 50, "the gift title"),
      message: short(giftText(input.message), 300, "the message", true),
      deliveryDate,
      payment: input.payment,
    } satisfies GiftDetails,
  };
}
