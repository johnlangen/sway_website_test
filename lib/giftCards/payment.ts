/**
 * A new card for one gift purchase (ported from the Spavia site's card.ts / gift-payment.ts).
 *
 * TRANSIENT ONLY: the card goes straight from the guest's request into Mindbody's sale call
 * ("saveInfo": false) and is never stored, logged or put in a receipt. Only its last four digits
 * are kept, on the purchase record, for the buyer's receipt.
 */
import { GiftError } from "./store";

export type GiftCard = {
  number: string;
  month: string;
  year: string;
  cvv: string;
  holder: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

export function validateGiftCard(value: unknown): GiftCard {
  const input = value as Partial<GiftCard> | null;
  const invalid = () => new GiftError("card", "Check your card number, expiration and billing address.");
  if (!input || typeof input !== "object") throw invalid();
  const card = {} as GiftCard;
  for (const key of ["number", "month", "year", "cvv", "holder", "address", "city", "state", "postalCode"] as const) {
    const v = input[key];
    if (typeof v !== "string" || !v.trim() || v.length > 200) throw invalid();
    card[key] = v.trim();
  }
  card.number = card.number.replace(/[ -]/g, "");
  if (!/^\d{13,19}$/.test(card.number)) throw invalid();
  let total = 0;
  for (let i = card.number.length - 1, doubled = false; i >= 0; i--, doubled = !doubled) {
    let n = Number(card.number[i]);
    if (doubled) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    total += n;
  }
  const month = Number(card.month);
  const year = Number(card.year.length === 2 ? `20${card.year}` : card.year);
  if (
    total % 10 ||
    !/^\d{1,2}$/.test(card.month) ||
    !/^(\d{2}|\d{4})$/.test(card.year) ||
    month < 1 ||
    month > 12 ||
    year > new Date().getUTCFullYear() + 25 ||
    Date.UTC(year, month, 1) <= Date.now()
  )
    throw invalid();
  card.month = String(month);
  card.year = String(year);
  card.state = card.state.toUpperCase();
  if (!/^[A-Z]{2}$/.test(card.state) || !/^\d{5}(-\d{4})?$/.test(card.postalCode)) throw invalid();
  if (!(/^3[47]/.test(card.number) ? /^\d{4}$/ : /^\d{3}$/).test(card.cvv))
    throw new GiftError("card", "Enter the security code: four digits for American Express, three for other cards.");
  return card;
}

export function newCardPayment(amount: number, card: GiftCard) {
  return {
    Type: "CreditCard",
    Metadata: {
      amount: amount.toFixed(2),
      creditCardNumber: card.number,
      expMonth: card.month,
      expYear: card.year,
      cvv: card.cvv,
      billingName: card.holder,
      billingAddress: card.address,
      billingCity: card.city,
      billingState: card.state,
      billingPostalCode: card.postalCode,
      saveInfo: "false",
    },
  };
}

export function storedCardPayment(amount: number, lastFour: string) {
  return { Type: "StoredCard", Metadata: { amount: amount.toFixed(2), lastFour } };
}

/** The no-charge test sale's card (Mindbody's Test: true validates the whole sale and charges nothing) */
export function sampleCardPayment(amount: number) {
  return newCardPayment(amount, {
    number: "4242424242424242",
    month: "12",
    year: String(new Date().getUTCFullYear() + 4),
    cvv: "123",
    holder: "Sway API Test",
    address: "1428 Larimer St",
    city: "Denver",
    state: "CO",
    postalCode: "80202",
  });
}
