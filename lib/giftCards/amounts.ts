/** The amount buttons (browser-safe). */
import type { GiftProduct } from "./catalog";

// The same four everywhere, plus Custom (Spavia, John 10/12): every button sells the "any amount"
// card at that value, so there's one path for every amount. A fixed card Mindbody sells below its
// value (a promotion) stays visible. With no "any amount" card the fixed cards are the choices.
export const GIFT_AMOUNTS = [100, 150, 200, 300];
export const DEFAULT_GIFT_AMOUNT = 200;

export type GiftAmountOption = { key: string; productId: number; amount: number; entry: boolean; label: string };
const dollars = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

export function giftAmountOptions(cards: GiftProduct[]): GiftAmountOption[] {
  const usable = cards.filter((p) => p.available !== false);
  const custom = usable.find((p) => p.custom);
  const fixed = usable.filter((p) => !p.custom).sort((a, b) => a.price - b.price || a.value - b.value);
  const fixedOption = (p: GiftProduct): GiftAmountOption => ({
    key: `p${p.id}`,
    productId: p.id,
    amount: p.price,
    entry: false,
    label: p.value === p.price ? dollars(p.value) : `${dollars(p.value)} for ${dollars(p.price)}`,
  });
  if (!custom) return fixed.map(fixedOption);
  const options: GiftAmountOption[] = GIFT_AMOUNTS.map((amount) => ({ key: `a${amount}`, productId: custom.id, amount, entry: false, label: dollars(amount) }));
  for (const p of fixed) if (p.price < p.value) options.push(fixedOption(p));
  options.push({ key: "custom", productId: custom.id, amount: Number.NaN, entry: true, label: "Custom amount" });
  return options;
}

export function defaultGiftAmount(cards: GiftProduct[]) {
  const options = giftAmountOptions(cards);
  return options.find((o) => !o.entry && o.amount === DEFAULT_GIFT_AMOUNT) || options.find((o) => !o.entry) || options[0];
}
