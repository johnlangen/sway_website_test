/**
 * The holiday bonus on a gift card purchase (lib/holidayBonus.ts has the offer and its dates):
 * who it goes to, decided when the purchase is quoted and shown before payment, and the bonus
 * code, issued after Mindbody confirms the sale. Server only.
 *
 * WHERE THE DESK REDEEMS: Atlas, on its Holiday Bonus page (the same screen the Spavia spas use).
 * Atlas reads one shared bonus-code database (a separate Upstash Redis that holds nothing else; the
 * contract is the Spavia site's docs/holiday-bonus-codes.md, with Atlas's api/routers/holiday_bonus.py).
 * So every code is issued IN that database, by the contract's own script, under the location's
 * Mindbody site id; the desk's Atlas login for that site then finds it, sees who it's for, and marks
 * it used. Needs BONUS_KV_REST_API_URL / BONUS_KV_REST_API_TOKEN in Vercel (set 11/24/2026). On the
 * live site a code is never issued without that database: it fails, the gift still goes out, and the
 * bonus is retried by the reconcile job (and alerts), so no guest gets a code the desk can't find.
 *
 * A copy of each record is also kept in the gift checkout's own Redis (lib/giftCards/store.ts), for
 * reports and so a repeat run returns the same code without asking the shared database again:
 *   bonus:code:<CODE>                 the record (the contract's field names)
 *   bonus:card:<siteId>:<barcode>     -> CODE (one code per gift card)
 *   bonus:spa:<siteId>:<locationId>   set of CODEs at that location
 *   bonus:codes                       set of every CODE
 * Codes can't be used before Jan 1, 2027 (Atlas shows them "on hold" until then).
 */
import { HOLIDAY_BONUS, holidayBonusOpen, makeBonusCode, qualifiesForBonus } from "@/lib/holidayBonus";
import { giftDate, giftScheduledAt } from "./schedule";
import type { GiftStore } from "./store";
import type { GiftBonus, GiftDetails } from "./catalog";
import type { GiftSite } from "./sites";

const TTL = 10 * 365 * 86400;

/**
 * The bonus on this purchase, or undefined when it doesn't carry one. An eligible purchase always
 * carries one: the buyer keeps it ("self") or, by default, it goes with the gift to its recipient.
 */
export function giftBonusFor(
  site: Pick<GiftSite, "slug" | "timezone">,
  gift: GiftDetails,
  value: number,
  buyerEmail: string,
  now = new Date(),
): GiftBonus | undefined {
  // The card must hold $200 and cost $200 (a card Mindbody sells below its value doesn't stack)
  if (!holidayBonusOpen(site.slug, site.timezone, now) || !qualifiesForBonus(Math.min(value, gift.amount))) return undefined;
  if (gift.bonus === "self") return { who: "self", name: gift.sender, email: buyerEmail.trim().toLowerCase(), date: giftDate(site.timezone, now) };
  const scheduledAt = giftScheduledAt(gift.deliveryDate, site.timezone, now);
  return { who: "recipient", name: gift.recipient, email: gift.recipientEmail, date: gift.deliveryDate, ...(scheduledAt ? { scheduledAt } : {}) };
}

export type BonusRecord = {
  code: string;
  campaign: string;
  source: "website";
  status: "active" | "used" | "void";
  site_id: string;
  location_id: string;
  spa_slug: string;
  spa_name: string;
  sale_id: string;
  gift_card_barcode: string;
  /** Gift card value in dollars, e.g. "250.00" */
  amount: string;
  buyer_name: string;
  buyer_email: string;
  recipient_name: string;
  recipient_email: string;
  /** YYYY-MM-DD in the location's time zone: when the bonus email goes out */
  delivery_date: string;
  purchased_at: string;
  /** The later of purchase + 24 h (the gift card's activation hold) and Jan 1, 2027, local */
  active_from: string;
  /** End of April 30, 2027, local */
  expires_at: string;
  created_at: string;
};

const utc = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, "Z");

/** A local wall time as UTC (two passes correct for daylight saving) */
function localUtc(timeZone: string, ymd: string, hms: string): string {
  const target = Date.parse(`${ymd}T${hms}Z`);
  let t = target;
  for (let i = 0; i < 2; i++) {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date(t))
        .map((x) => [x.type, x.value]),
    );
    t += target - Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}Z`);
  }
  return utc(new Date(t));
}

export type IssueInput = {
  site: Pick<GiftSite, "slug" | "name" | "siteId" | "locationId" | "timezone">;
  saleId: number;
  barcode: string;
  value: number;
  buyerName: string;
  buyerEmail: string;
  bonus: GiftBonus;
  purchasedAt: Date;
};

export function bonusRecord(i: IssueInput, code: string, now = new Date()): BonusRecord {
  return {
    code,
    campaign: HOLIDAY_BONUS.campaign,
    source: "website",
    status: "active",
    site_id: String(i.site.siteId),
    location_id: String(i.site.locationId),
    spa_slug: i.site.slug,
    spa_name: i.site.name,
    sale_id: String(i.saleId),
    gift_card_barcode: i.barcode,
    amount: i.value.toFixed(2),
    buyer_name: i.buyerName,
    buyer_email: i.buyerEmail.trim().toLowerCase(),
    recipient_name: i.bonus.name,
    recipient_email: i.bonus.email.trim().toLowerCase(),
    delivery_date: i.bonus.date,
    purchased_at: utc(i.purchasedAt),
    active_from: [utc(new Date(i.purchasedAt.getTime() + 24 * 3600 * 1000)), localUtc(i.site.timezone, HOLIDAY_BONUS.validFrom, "00:00:00")].sort()[1],
    expires_at: localUtc(i.site.timezone, HOLIDAY_BONUS.expires, "23:59:59"),
    created_at: utc(now),
  };
}

// ---------------------------------------------------------------- the shared database (what Atlas reads)
/** Runs one Redis command on the shared bonus-code database */
export type SharedBonusDb = <T>(command: (string | number)[]) => Promise<T>;

/** The shared database, or null when this environment isn't connected to it */
export function sharedBonusDb(): SharedBonusDb | null {
  const url = process.env.BONUS_REDIS_REST_URL || process.env.BONUS_KV_REST_API_URL;
  const token = process.env.BONUS_REDIS_REST_TOKEN || process.env.BONUS_KV_REST_API_TOKEN;
  if (!url?.startsWith("https://") || !token) return null;
  return async <T>(command: (string | number)[]) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const data = (await response.json()) as { result?: T; error?: string };
    if (!response.ok || data.error) throw new Error(`Bonus code database error: ${data.error ?? response.status}`);
    return data.result as T;
  };
}

// Copied word for word from the contract (Spavia site, docs/holiday-bonus-codes.md). Do not edit alone.
// KEYS: code, card, spa. ARGV[1] = code, ARGV[2] = TTL seconds ("0" = none), then field/value pairs.
// One code per card: a retry gets the existing code.
export const ISSUE_SCRIPT = `
local existing = redis.call('GET', KEYS[2])
if existing then return {'exists', existing} end
if redis.call('EXISTS', KEYS[1]) == 1 then return {'collision', ''} end
redis.call('SET', KEYS[2], ARGV[1])
redis.call('HSET', KEYS[1], unpack(ARGV, 3))
redis.call('SADD', KEYS[3], ARGV[1])
local ttl = tonumber(ARGV[2])
if ttl and ttl > 0 then
  redis.call('EXPIRE', KEYS[1], ttl)
  redis.call('EXPIRE', KEYS[2], ttl)
end
return {'created', ARGV[1]}
`;

/** Issues the card's code in the shared database (or returns the one it already has there) */
async function issueShared(db: SharedBonusDb, i: IssueInput): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = makeBonusCode();
    const [result, value] = await db<[string, string]>([
      "EVAL",
      ISSUE_SCRIPT,
      3,
      `bonus:code:${code}`,
      `bonus:card:${i.barcode}`,
      `bonus:spa:${i.site.siteId}:${i.site.locationId}`,
      code,
      0,
      ...Object.entries(bonusRecord(i, code)).flat(),
    ]);
    if (result === "created") return value;
    if (result === "exists") {
      // The contract keys a card by its barcode alone. A different spa's card with the same
      // number would hand this guest that spa's code: never (it would read "not found" at our desk).
      const owner = await db<string | null>(["HGET", `bonus:code:${value}`, "site_id"]);
      if (owner !== String(i.site.siteId)) throw new Error(`Bonus code database: gift card number already has a code at another site (${owner ?? "unknown"})`);
      return value;
    }
  }
  throw new Error("Could not issue a unique bonus code");
}

/**
 * The bonus code for one qualifying card, after the sale is confirmed. Safe to repeat: the same
 * card keeps its code. Issued in the shared database Atlas reads; `shared` = null only off the live
 * site (local development and tests), where the code is kept in the gift store alone.
 */
export async function issueBonusCode(store: GiftStore, i: IssueInput, shared: SharedBonusDb | null = sharedBonusDb()): Promise<{ code: string; created: boolean }> {
  const cardKey = `bonus:card:${i.site.siteId}:${i.barcode}`;
  const existing = await store.get<string>(cardKey);
  if (existing) return { code: existing, created: false };
  if (shared) {
    const code = await issueShared(shared, i);
    await store.put(`bonus:code:${code}`, bonusRecord(i, code), TTL);
    await store.put(cardKey, code, TTL);
    await store.sadd(`bonus:spa:${i.site.siteId}:${i.site.locationId}`, code);
    await store.sadd("bonus:codes", code);
    return { code, created: true };
  }
  // The live site never issues a code the desk can't look up
  if (process.env.VERCEL_ENV === "production") throw new Error("Bonus code database is not configured (BONUS_KV_REST_API_URL / BONUS_KV_REST_API_TOKEN)");
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = makeBonusCode();
    // nx: a code already in use (1 in 150 billion) is never overwritten
    if (!(await store.put(`bonus:code:${code}`, bonusRecord(i, code), TTL, true))) continue;
    if (!(await store.put(cardKey, code, TTL, true))) {
      // Two runs at once for the same card: the first one's code stands
      await store.remove(`bonus:code:${code}`);
      const first = await store.get<string>(cardKey);
      if (first) return { code: first, created: false };
      continue;
    }
    await store.sadd(`bonus:spa:${i.site.siteId}:${i.site.locationId}`, code);
    await store.sadd("bonus:codes", code);
    return { code, created: true };
  }
  throw new Error("Could not issue a unique bonus code");
}

/** Every bonus code issued so far (for reports and for copying into the desk's redeem tool) */
export async function bonusCodes(store: GiftStore): Promise<BonusRecord[]> {
  const codes = await store.smembers("bonus:codes");
  const rows = await Promise.all(codes.map((c) => store.get<BonusRecord>(`bonus:code:${c}`)));
  return rows.filter((r): r is BonusRecord => !!r).sort((a, b) => a.created_at.localeCompare(b.created_at));
}
