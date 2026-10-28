/**
 * Quote, purchase, status and recovery for one gift card order (the Spavia site's GiftCheckout,
 * ported 10/28 with the lessons it learned live):
 *
 *  - quote: every detail re-checked on the server, then Mindbody's no-charge test sale (Test: true)
 *    must come to exactly the amount and value shown, or nothing can be purchased;
 *  - commit: one purchase per order, across tabs and repeated taps (a repeat gets the first answer
 *    back). The order goes on the settle list before the charge is sent;
 *  - a clear Mindbody refusal (4xx) means nothing was charged: the order is freed and the guest is
 *    told why (a decline names the card). Anything else (timeout, 5xx) may have charged: the order
 *    stays locked as "unconfirmed" and is settled by looking it up, never by charging again;
 *  - status / recover: an unanswered sale that Mindbody did make (Spavia, Winter Park 10/19: 20 s
 *    after the timeout) is found by the guest's sales since the attempt and completed; no sale at
 *    all after 3 minutes frees the order so the guest can try again.
 */
import { randomBytes, randomUUID } from "crypto";
import { GiftError, sha256, type GiftStore } from "./store";
import { giftSelection, normalizeGifts, sellableGifts, type GiftDetails, type GiftProduct } from "./catalog";
import { giftScheduledAt as scheduleOrThrow } from "./schedule";
import { newCardPayment, sampleCardPayment, storedCardPayment, validateGiftCard, type GiftCard } from "./payment";
import { buyerProfile, giftCardBalance, giftCardRows, giftSaleSince, purchaseGiftCard, purchasesSince } from "./mindbody";
import { alert, clearUncertain, noteRelease, noteUncertain } from "./alerts";
import type { GiftSession } from "./auth";
import type { GiftSite } from "./sites";

export type GiftQuote = GiftDetails & {
  id: string;
  sessionId: string;
  slug: string;
  siteId: string;
  clientId: string;
  expires: number;
  product: GiftProduct;
  value: number;
  scheduledAt?: string;
  cardLastFour?: string;
};

/** What the browser sees of a quote (no session or client ids) */
export type GiftReview = Omit<GiftQuote, "sessionId" | "clientId" | "siteId" | "expires" | "scheduledAt">;
export const giftReview = ({ sessionId: _s, clientId: _c, siteId: _i, expires: _e, scheduledAt: _a, ...rest }: GiftQuote): GiftReview => rest;

export type GiftResult = {
  state: "pending" | "purchased" | "unconfirmed" | "released";
  reference: string;
  saleId?: number;
  value?: number;
  amount?: number;
  balance?: number;
  /** This answer completed a sale Mindbody made without answering (count it once) */
  recovered?: boolean;
  /** A repeated tap got the first answer back (never counted again) */
  replay?: boolean;
  giftToken?: string;
  delivery?: string;
  buyerReceipt?: string;
  deliveryCheckNeeded?: boolean;
};

type Receipt = { saleId: number; barcode: string; value: number; amount: number };

export type PurchaseRecord = {
  email: string;
  clientId: string;
  quoteId: string;
  startedAt: number;
  result: GiftResult;
  receipt?: Receipt;
  gift: GiftQuote;
  /** The gift's private link token (its hash keys the issued gift) */
  token: string;
};

const RELEASE_AFTER = 3 * 60000;
export const RECORD_TTL = 10 * 365 * 86400;

/** The delivery date's send time; a date that has passed (quoted 11:58 pm, bought after midnight) is a "date" error */
function giftScheduledAt(date: string, zone: string) {
  try {
    return scheduleOrThrow(date, zone);
  } catch (e) {
    throw new GiftError("date", e instanceof Error ? e.message : "Please review your delivery date again.", 409);
  }
}

/** The buyer's one open (unsettled) purchase at a location: a second device can't buy again while it settles */
const openKey = (slug: string, email: string) => `open:${slug}:${sha256(email)}`;
export async function settleOpen(store: GiftStore, r: Pick<PurchaseRecord, "email" | "gift">, order: string) {
  try {
    const key = openKey(r.gift.slug, r.email);
    if ((await store.get<string>(key)) === order) await store.remove(key);
  } catch {
    /* it expires within a day anyway */
  }
}

/**
 * Frees an order Mindbody has no sale for (nothing was charged). Re-reads the record first so a newer
 * purchase started on the same order in the meantime is never deleted, and keeps a copy for 24 h
 * so the reconcile job can still catch a sale Mindbody lists late.
 */
export async function releaseOrder(store: GiftStore, order: string, seen: PurchaseRecord) {
  const now = await store.get<PurchaseRecord>(`purchase:${order}`);
  if (!now || now.startedAt !== seen.startedAt || now.receipt) return false;
  await noteRelease(store, order, now);
  await store.remove(`purchase:${order}`);
  await clearUncertain(store, { id: order, slug: now.gift.slug, at: now.startedAt });
  await settleOpen(store, now, order);
  return true;
}

export async function giftCatalog(site: GiftSite) {
  return sellableGifts(normalizeGifts(await giftCardRows(site), site));
}

function salePayload(site: GiftSite, q: GiftQuote, payment: unknown, test: boolean) {
  return {
    Test: test,
    LocationId: site.locationId,
    PurchaserClientId: q.clientId,
    GiftCardId: q.productId,
    // Mindbody sends nothing itself: no layout, recipient or receipt (we send Sway's own emails,
    // and Mindbody batches its gift emails to the next morning). Mindbody issues a new barcode.
    LayoutId: 0,
    SendEmailReceipt: false,
    PaymentInfo: payment,
  };
}

/** The no-charge test sale must come back exactly as quoted */
function checkTest(raw: Record<string, unknown>, q: GiftQuote) {
  const failures = raw.PaymentProcessingFailures;
  if (
    raw.Error ||
    (Array.isArray(raw.Errors) && raw.Errors.length) ||
    (failures != null && (!Array.isArray(failures) || failures.length)) ||
    (raw.Status && raw.Status !== "Success") ||
    raw.SaleId !== 0 ||
    raw.Value !== q.value ||
    raw.AmountPaid !== q.amount ||
    (raw.TransactionFee != null && raw.TransactionFee !== 0)
  )
    throw new GiftError("amount", "The spa's system didn't confirm the exact amount, so nothing was purchased. Please try again or call the spa.", 409);
}

/** The real sale's answer must be a complete, exact receipt, or it's treated as unconfirmed */
function checkSale(raw: Record<string, unknown>, q: GiftQuote): Receipt {
  const failures = raw.PaymentProcessingFailures;
  if (
    raw.Error ||
    (Array.isArray(raw.Errors) && raw.Errors.length) ||
    (raw.Status && raw.Status !== "Success") ||
    (failures != null && (!Array.isArray(failures) || failures.length)) ||
    !Number.isSafeInteger(raw.SaleId) ||
    (raw.SaleId as number) <= 0 ||
    typeof raw.BarcodeId !== "string" ||
    !raw.BarcodeId.trim() ||
    raw.Value !== q.value ||
    raw.AmountPaid !== q.amount ||
    (raw.TransactionFee != null && raw.TransactionFee !== 0) ||
    String(raw.PurchaserClientId) !== q.clientId
  )
    throw new GiftError("unconfirmed", "The purchase needs review.", 409);
  return { saleId: raw.SaleId as number, barcode: raw.BarcodeId.trim(), value: raw.Value as number, amount: raw.AmountPaid as number };
}

function assertBuyer(site: GiftSite, s: GiftSession, order: string) {
  if (!s.clientId || s.slug !== site.slug || s.expires <= Date.now() || !order) throw new GiftError("session", "Verify your email to continue.", 401);
}

export async function quoteGift(store: GiftStore, site: GiftSite, s: GiftSession, order: string, input: GiftDetails): Promise<GiftQuote> {
  assertBuyer(site, s, order);
  if (await store.get(`purchase:${order}`)) throw new GiftError("used", "This checkout already has a submitted purchase. Check its status.", 409);
  const p = await buyerProfile(site, s.clientId!);
  if (p.email !== s.email || (input?.payment === "stored" && (!p.hasCard || !/^\d{4}$/.test(p.lastFour || ""))))
    throw new GiftError("card", "Use your account with a valid saved card, or a new card.", 403);
  const selection = giftSelection(site, await giftCatalog(site), input);
  const q: GiftQuote = {
    ...selection.details,
    product: selection.product,
    value: selection.value,
    id: randomUUID(),
    sessionId: s.id,
    slug: site.slug,
    siteId: site.siteId,
    clientId: p.id,
    expires: Date.now() + 600000,
    scheduledAt: giftScheduledAt(selection.details.deliveryDate, site.timezone),
    ...(selection.details.payment === "stored" ? { cardLastFour: p.lastFour! } : {}),
  };
  // The exact price, validated without charging. A new card is tested with a sample card; the
  // guest's real card only ever reaches the purchase itself.
  checkTest(
    await purchaseGiftCard(site, salePayload(site, q, q.payment === "stored" ? storedCardPayment(q.amount, q.cardLastFour!) : sampleCardPayment(q.amount), true), false),
    q,
  );
  await store.put(`quote:${q.id}`, { order, quote: q }, 600);
  return q;
}

export async function giftStatus(store: GiftStore, site: GiftSite, s: GiftSession, order: string, now = Date.now()): Promise<GiftResult | null> {
  if (s.slug !== site.slug || s.expires <= Date.now() || !order) throw new GiftError("session", "Verify your email to check this purchase.", 401);
  const r = await store.get<PurchaseRecord>(`purchase:${order}`);
  if (!r) return null;
  if (r.email !== s.email || r.gift.slug !== site.slug) throw new GiftError("session", "Purchase unavailable.", 403);
  const result: GiftResult = r.result.state === "pending" && now - r.startedAt > 120000 ? { ...r.result, state: "unconfirmed" } : r.result;
  if (result.state === "unconfirmed" && !r.receipt) {
    const found = await recoverGift(store, site, order, r);
    if (found) return found;
    if (now - r.startedAt >= RELEASE_AFTER) {
      try {
        if ((await purchasesSince(site, r.clientId, r.startedAt - 30 * 60000)).length === 0 && (await releaseOrder(store, order, r)))
          return { state: "released", reference: result.reference };
      } catch {
        /* Couldn't check: stays unconfirmed */
      }
    }
  }
  return result;
}

/** An unanswered purchase that Mindbody did make: exactly one gift card sale for the guest at this
 *  amount within 3 minutes of the attempt, holding the card's value. Anything less certain: null. */
export async function recoverGift(store: GiftStore, site: GiftSite, order: string, record?: PurchaseRecord): Promise<GiftResult | null> {
  const r = record ?? (await store.get<PurchaseRecord>(`purchase:${order}`));
  if (!r || r.receipt || r.result.state === "purchased") return null;
  try {
    const sale = await giftSaleSince(site, r.clientId, r.startedAt - 60000, r.startedAt + 3 * 60000, r.gift.amount, r.gift.value);
    if (!sale) return null;
    // One Mindbody sale belongs to one order: never hand the same card to two recipients
    const claim = `sale-claim:${site.siteId}:${sale.saleId}`;
    if (!(await store.put(claim, order, RECORD_TTL, true)) && (await store.get<string>(claim)) !== order) return null;
    const first = await store.put(`recovered:${order}`, Date.now(), RECORD_TTL, true);
    r.receipt = sale;
    r.result = { state: "purchased", reference: r.result.reference, saleId: sale.saleId, value: sale.value, amount: sale.amount, balance: sale.value };
    await store.put(`purchase:${order}`, r, RECORD_TTL);
    await clearUncertain(store, { id: order, slug: site.slug, at: r.startedAt });
    await settleOpen(store, r, order);
    return first ? { ...r.result, recovered: true } : r.result;
  } catch {
    return null;
  }
}

export async function commitGift(
  store: GiftStore,
  site: GiftSite,
  s: GiftSession,
  order: string,
  quoteId: string,
  accepted: unknown,
  cardInput?: unknown,
): Promise<GiftResult> {
  assertBuyer(site, s, order);
  if (accepted !== true) throw new GiftError("consent", "Please agree to the gift card terms to purchase.");
  const existing = await giftStatus(store, site, s, order);
  if (existing) return { ...existing, replay: true };
  const entry = /^[0-9a-f-]{36}$/.test(quoteId) ? await store.get<{ order: string; quote: GiftQuote }>(`quote:${quoteId}`) : null;
  const q = entry?.quote;
  if (!q || entry.order !== order || q.sessionId !== s.id || q.clientId !== s.clientId || q.slug !== site.slug || q.expires <= Date.now())
    throw new GiftError("quote", "Please review your gift again before purchasing.", 409);
  if (giftScheduledAt(q.deliveryDate, site.timezone) !== q.scheduledAt) throw new GiftError("date", "Please review your delivery date again.", 409);
  const card: GiftCard | undefined = q.payment === "new" ? validateGiftCard(cardInput) : undefined;
  const p = await buyerProfile(site, s.clientId!);
  const fresh = giftSelection(site, await giftCatalog(site), q);
  if (
    p.id !== s.clientId ||
    p.email !== s.email ||
    (q.payment === "stored" && (!p.hasCard || p.lastFour !== q.cardLastFour)) ||
    fresh.product.version !== q.product.version ||
    fresh.value !== q.value
  )
    throw new GiftError("changed", "Your gift or saved card changed. Please review it again.", 409);

  const record: PurchaseRecord = {
    gift: card ? { ...q, cardLastFour: card.number.slice(-4) } : q,
    token: randomBytes(32).toString("hex"),
    email: s.email,
    clientId: s.clientId!,
    quoteId: q.id,
    startedAt: Date.now(),
    result: { state: "pending", reference: `GIFT-${order.slice(0, 8).toUpperCase()}` },
  };
  // An earlier purchase of this buyer's (another device, another order) that hasn't settled yet:
  // it may have charged, so no second purchase until it's settled
  const open = await store.get<string>(openKey(site.slug, s.email));
  if (open && open !== order) {
    const other = await store.get<PurchaseRecord>(`purchase:${open}`);
    if (other && !other.receipt && other.result.state !== "purchased")
      throw new GiftError("purchase", `Your earlier gift purchase is still being confirmed, so please don't buy again yet. Check back in a few minutes, or call ${site.name} at ${site.phone}.`, 409);
  }
  // One submission per order, across tabs, sessions and quotes. An uncertain charge is never retried.
  if (!(await store.put(`purchase:${order}`, record, RECORD_TTL, true))) return { ...(await giftStatus(store, site, s, order))!, replay: true };
  await store.put(openKey(site.slug, s.email), order, 86400);
  const uncertain = { id: order, slug: site.slug, at: record.startedAt };
  await noteUncertain(store, uncertain);
  try {
    const payment = card ? newCardPayment(q.amount, card) : storedCardPayment(q.amount, q.cardLastFour!);
    record.receipt = checkSale(await purchaseGiftCard(site, salePayload(site, q, payment, false), true), q);
    await store.put(`sale-claim:${site.siteId}:${record.receipt.saleId}`, order, RECORD_TTL, true);
    record.result = { state: "purchased", reference: record.result.reference, saleId: record.receipt.saleId, value: record.receipt.value, amount: record.receipt.amount };
  } catch (error) {
    if (error instanceof GiftError && error.refusedStatus && error.refusedStatus < 500) {
      // Mindbody refused the sale: nothing was charged, so free the order and say why
      await store.remove(`purchase:${order}`);
      await clearUncertain(store, uncertain);
      await settleOpen(store, record, order);
      const refusal = error.refusal || "";
      const declined = !/gift ?card/i.test(refusal) && /declin|cvv|expir|credit card|processing failure|insufficient|do not honor|avs|address|zip|postal/i.test(refusal);
      if (!declined)
        await alert(store, `gift-refused:${site.slug}`, `Gift card sale refused at ${site.name}`, [
          `A gift card purchase at ${site.name} was refused by Mindbody, so nothing was charged. It will likely refuse every guest the same way until the gift card or sales settings in Mindbody are fixed.`,
          `Mindbody said: ${refusal || "(no reason given)"}`,
        ]);
      throw new GiftError(
        "payment",
        declined
          ? `Your card was declined, so nothing was charged. Check the card details and billing address, try a different card, or check with your bank.`
          : `Nothing was charged: the spa's system couldn't complete this purchase online just now. Please try again, or call ${site.name} at ${site.phone}.`,
        409,
      );
    }
    // A timeout, a 5xx or an incomplete answer: the card may have been charged
    record.result = { state: "unconfirmed", reference: record.result.reference };
  }
  // Purchase proof is saved first: only then does a sale come off the settle list (a failed save
  // leaves it there for the reconcile job to find)
  await store.put(`purchase:${order}`, record, RECORD_TTL);
  if (record.receipt) {
    await clearUncertain(store, uncertain);
    await settleOpen(store, record, order);
  }
  if (record.receipt) {
    try {
      record.result.balance = await giftCardBalance(site, record.receipt.barcode);
      await store.put(`purchase:${order}`, record, RECORD_TTL);
    } catch {
      /* A balance lookup failure must not turn a recorded sale into a retry */
    }
  }
  return record.result;
}
