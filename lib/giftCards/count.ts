/**
 * A completed gift sale on the site's own analytics ledger (lib/ops), exactly once per order,
 * whoever finds it first: the purchase itself, the guest's status check or the reconcile job.
 */
import { recordCompletion } from "@/lib/ops/record";
import type { GiftStore } from "./store";
import type { PurchaseRecord } from "./checkout";

export async function countSale(req: Request, store: GiftStore, order: string) {
  const r = await store.get<PurchaseRecord>(`purchase:${order}`);
  if (!r?.receipt || !(await store.put(`counted:${order}`, 1, 400 * 86400, true))) return;
  await recordCompletion(req, {
    flow: "gift",
    location: r.gift.slug,
    item: r.gift.productId,
    label: `Gift card $${r.receipt.value}`,
    ref: r.receipt.saleId,
    value: r.receipt.amount,
    // bonus = the holiday bonus went with this card, and to whom ("self" or "recipient"); no contact details
    extra: { scheduled: Boolean(r.gift.scheduledAt), payment: r.gift.payment, ...(r.gift.giftBonus ? { bonus: r.gift.giftBonus.who } : {}) },
  });
}

/** For sales settled outside a guest's request (the cron): counted as the live site */
export const liveSiteRequest = () =>
  new Request("https://swaywellnessspa.com/api/gift-cards/reconcile/", {
    headers: { host: process.env.VERCEL_ENV === "production" ? "swaywellnessspa.com" : "localhost" },
  });
