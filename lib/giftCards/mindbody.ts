/**
 * Every Mindbody call the gift checkout makes (staff token per site, lib/mindbodyStaffToken.ts).
 *
 * Writes are never retried automatically: a gift sale that didn't answer may still have charged,
 * so it's settled by looking it up (checkout.ts recover / the reconcile job), never by sending it
 * again. The real charge waits up to 45 s (Mindbody finished Spavia gift sales 35-45 s after they
 * were sent, 10/19); every other call gives up sooner.
 */
import { getMindbodyStaffToken } from "@/lib/mindbodyStaffToken";
import { GiftError } from "./store";
import type { GiftSite } from "./sites";

const BASE = "https://api.mindbodyonline.com/public/v6";
type Row = Record<string, unknown>;

async function mb(
  site: GiftSite,
  path: string,
  opts: { params?: Record<string, string>; body?: unknown; timeoutMs?: number; bareToken?: boolean } = {},
): Promise<Row> {
  const token = await getMindbodyStaffToken(site.siteId);
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(opts.params ?? {})) url.searchParams.set(k, v);
  let res: Response;
  try {
    res = await fetch(url, {
      method: opts.body === undefined ? "GET" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Api-Key": process.env.MINDBODY_API_KEY!,
        SiteId: site.siteId,
        // addclient is sent the bare token, as the site's working add-client route does
        Authorization: opts.bareToken ? token : `Bearer ${token}`,
      },
      ...(opts.body === undefined ? {} : { body: JSON.stringify(opts.body) }),
      cache: "no-store",
      signal: AbortSignal.timeout(opts.timeoutMs ?? 20000),
    });
  } catch {
    throw new GiftError("upstream", "The spa's system didn't answer in time.", 503);
  }
  const data = (await res.json().catch(() => ({}))) as Row;
  if (!res.ok) {
    const reason = String((data?.Error as Row | undefined)?.Message ?? (data?.Error as Row | undefined)?.Code ?? "");
    const e = new GiftError("refused", "The spa's system refused this request.", res.status >= 500 ? 503 : 409);
    e.refusedStatus = res.status;
    e.refusal = reason;
    throw e;
  }
  return data;
}

/** Every gift card sold online at this site (all pages) */
export async function giftCardRows(site: GiftSite): Promise<unknown[]> {
  const rows: unknown[] = [];
  for (let offset = 0; offset < 1000; offset += 200) {
    const r = await mb(site, "/sale/giftcards", {
      params: {
        "request.soldOnline": "true",
        "request.includeCustomLayouts": "false",
        "request.locationId": String(site.locationId),
        "request.limit": "200",
        "request.offset": String(offset),
      },
    });
    if (!Array.isArray(r.GiftCards)) throw new GiftError("catalog", "We couldn't load the gift cards.", 503);
    rows.push(...r.GiftCards);
    if (r.GiftCards.length < 200) break;
  }
  return rows;
}

export function purchaseGiftCard(site: GiftSite, payload: Row, charge: boolean) {
  return mb(site, "/sale/purchasegiftcard", { body: payload, timeoutMs: charge ? 45000 : 20000 });
}

export async function giftCardBalance(site: GiftSite, barcode: string): Promise<number> {
  const r = await mb(site, "/sale/giftcardbalance", { params: { barcodeId: barcode } });
  if (r.BarcodeId !== barcode || typeof r.RemainingBalance !== "number" || !Number.isFinite(r.RemainingBalance) || r.RemainingBalance < 0)
    throw new GiftError("balance", "The gift card balance needs review.", 503);
  return r.RemainingBalance;
}

export type BuyerProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hasCard: boolean;
  lastFour: string | null;
  active: boolean;
};

export async function buyerProfile(site: GiftSite, clientId: string): Promise<BuyerProfile> {
  const r = await mb(site, "/client/clients", { params: { "request.clientIds": clientId, "request.limit": "1" } });
  const c = Array.isArray(r.Clients) ? (r.Clients[0] as Row | undefined) : undefined;
  if (!c || String(c.Id) !== clientId) throw new GiftError("session", "We couldn't find your account. Please verify your email again.", 403);
  const card = c.ClientCreditCard as Row | null | undefined;
  return {
    id: String(c.Id),
    firstName: String(c.FirstName ?? "").trim(),
    lastName: String(c.LastName ?? "").trim(),
    email: String(c.Email ?? "").trim().toLowerCase(),
    hasCard: Boolean(card?.LastFour),
    lastFour: card?.LastFour ? String(card.LastFour) : null,
    active: c.Active !== false,
  };
}

/** A new guest's profile, with no card (the gift's card is charged once and never saved) */
export async function addBuyer(
  site: GiftSite,
  p: { firstName: string; lastName: string; email: string; mobilePhone: string },
): Promise<string> {
  const r = await mb(site, "/client/addclient", {
    bareToken: true,
    body: {
      FirstName: p.firstName,
      LastName: p.lastName,
      Email: p.email,
      MobilePhone: p.mobilePhone,
      SendAccountEmails: true,
      SendScheduleEmails: true,
      SendPromotionalEmails: false,
      Test: false,
    },
  });
  const c = r.Client as Row | undefined;
  // Mindbody can answer 200 with the names dropped (lib add-client-with-card, May 2026)
  if (!c?.Id || !String(c.FirstName ?? "").trim() || !String(c.LastName ?? "").trim())
    throw new GiftError("profile", "We couldn't save your details. Please try again, or call the spa.", 409);
  return String(c.Id);
}

type Purchase = {
  Sale?: {
    Id?: unknown;
    SaleDateTime?: unknown;
    PurchasedItems?: { GiftCardBarcodeId?: unknown; TotalAmount?: unknown; Returned?: unknown }[];
  };
};

/**
 * The guest's sales from `since` (ms). Mindbody stamps sale times "Z" though some read as local
 * time; with `strict` off a sale counts if either reading is after `since`, so an uncertain one
 * never lifts a purchase lock. `strict` (matching a specific sale) reads them as UTC and closes
 * the window at `until`.
 */
export async function purchasesSince(site: GiftSite, clientId: string, since: number, strict = false, until = Infinity): Promise<Purchase[]> {
  const day = 86400000;
  const iso = (t: number) => new Date(t).toISOString().slice(0, 19);
  const r = await mb(site, "/client/clientpurchases", {
    params: { "request.clientId": clientId, "request.startDate": iso(since - day), "request.endDate": iso(Date.now() + day) },
  });
  if (!Array.isArray(r.Purchases)) throw new GiftError("purchases", "Purchase history unavailable.", 503);
  const offset = (() => {
    const at = new Date(since);
    return (
      new Date(at.toLocaleString("en-US", { timeZone: site.timezone })).getTime() -
      new Date(at.toLocaleString("en-US", { timeZone: "UTC" })).getTime()
    );
  })();
  return (r.Purchases as Purchase[]).filter((p) => {
    const raw = p?.Sale?.SaleDateTime;
    const t = typeof raw === "string" ? Date.parse(/Z$|[+-]\d\d:?\d\d$/.test(raw) ? raw : `${raw}Z`) : NaN;
    return strict ? Number.isFinite(t) && t >= since && t <= until : !Number.isFinite(t) || t >= since || t - offset >= since;
  });
}

/** The one gift card sale for this guest at this amount in the window, or null (none, or more than one) */
export async function giftSaleSince(site: GiftSite, clientId: string, since: number, until: number, amount: number, value: number) {
  const cards = (await purchasesSince(site, clientId, since, true, until)).flatMap((p) =>
    (Array.isArray(p.Sale?.PurchasedItems) ? p.Sale!.PurchasedItems! : [])
      .filter((i) => typeof i?.GiftCardBarcodeId === "string" && i.GiftCardBarcodeId.trim() && !i.Returned && i.TotalAmount === amount)
      .map((i) => ({ saleId: p.Sale!.Id, barcode: String(i.GiftCardBarcodeId).trim() })),
  );
  if (cards.length !== 1 || !Number.isSafeInteger(cards[0].saleId) || (cards[0].saleId as number) <= 0) return null;
  // A new card's balance is its value; one already spent, or of another value, isn't this purchase
  const balance = await giftCardBalance(site, cards[0].barcode);
  if (balance !== value) return null;
  return { saleId: cards[0].saleId as number, barcode: cards[0].barcode, value: balance, amount };
}
