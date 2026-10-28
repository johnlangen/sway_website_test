/**
 * Shared state for the gift checkout: codes, sessions, quotes, purchase records, issued gifts and
 * email delivery records, in the site's Upstash Redis under sway:gift:v1:.
 *
 * FAILS CLOSED: a charge must never run without its record, so if Redis isn't configured on Vercel
 * every gift action stops (GiftError "unavailable") instead of carrying on. Local development
 * without KV gets a per-process map.
 */
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

export class GiftError extends Error {
  /** Mindbody's HTTP status when it refused (4xx = nothing was charged) */
  refusedStatus?: number;
  /** Mindbody's own reason, when it gave one */
  refusal?: string;
  constructor(
    public code: string,
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

export interface GiftStore {
  get<T>(key: string): Promise<T | null>;
  /** nx: only if absent. Returns false when nx and the key existed. */
  put(key: string, value: unknown, ttlSeconds: number, nx?: boolean): Promise<boolean>;
  incr(key: string, ttlSeconds: number): Promise<number>;
  remove(key: string): Promise<void>;
  /** Deletes a lock only if this owner still holds it */
  release(key: string, owner: string): Promise<void>;
  /** Small sets (the settle list) */
  sadd(key: string, member: string): Promise<void>;
  srem(key: string, member: string): Promise<void>;
  smembers(key: string): Promise<string[]>;
}

const PREFIX = "sway:gift:v1:";

function redisStore(r: Redis): GiftStore {
  const k = (s: string) => PREFIX + s;
  return {
    get: (key) => r.get(k(key)),
    async put(key, value, ttl, nx) {
      const res = nx ? await r.set(k(key), value, { ex: ttl, nx: true }) : await r.set(k(key), value, { ex: ttl });
      return res === "OK";
    },
    async incr(key, ttl) {
      // INCR + TTL in one round trip; a counter left without an expiry (a crash between two calls)
      // gets one, so a rate limit can never stick for good
      const [n, left] = (await r.pipeline().incr(k(key)).ttl(k(key)).exec()) as [number, number];
      if (left < 0) await r.expire(k(key), ttl);
      return n;
    },
    async remove(key) {
      await r.del(k(key));
    },
    async release(key, owner) {
      // Locks here are short (45 s) send guards: read-then-delete is enough
      if ((await r.get(k(key))) === owner) await r.del(k(key));
    },
    async sadd(key, member) {
      await r.sadd(k(key), member);
    },
    async srem(key, member) {
      await r.srem(k(key), member);
    },
    async smembers(key) {
      return ((await r.smembers(k(key))) as unknown[]).map((m) => (typeof m === "string" ? m : JSON.stringify(m)));
    },
  };
}

const mem = new Map<string, { v: unknown; exp: number }>();
function memoryStore(): GiftStore {
  const live = (key: string) => {
    const e = mem.get(key);
    if (e && Date.now() > e.exp) mem.delete(key);
    return mem.get(key) ?? null;
  };
  return {
    async get<T>(key: string) {
      const e = live(key);
      return e ? (structuredClone(e.v) as T) : null;
    },
    async put(key, value, ttl, nx) {
      if (nx && live(key)) return false;
      mem.set(key, { v: structuredClone(value), exp: Date.now() + ttl * 1000 });
      return true;
    },
    async incr(key, ttl) {
      const e = live(key);
      const n = ((e?.v as number) ?? 0) + 1;
      mem.set(key, { v: n, exp: e?.exp ?? Date.now() + ttl * 1000 });
      return n;
    },
    async remove(key) {
      mem.delete(key);
    },
    async release(key, owner) {
      if (live(key)?.v === owner) mem.delete(key);
    },
    async sadd(key, member) {
      const set = new Set((live(key)?.v as string[]) ?? []);
      set.add(member);
      mem.set(key, { v: [...set], exp: Date.now() + 365 * 86400000 });
    },
    async srem(key, member) {
      const set = new Set((live(key)?.v as string[]) ?? []);
      set.delete(member);
      mem.set(key, { v: [...set], exp: Date.now() + 365 * 86400000 });
    },
    async smembers(key) {
      return [...((live(key)?.v as string[]) ?? [])];
    },
  };
}

let cached: GiftStore | null = null;
export function giftStore(): GiftStore {
  if (cached) return cached;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return (cached = redisStore(new Redis({ url, token })));
  if (!process.env.VERCEL && process.env.NODE_ENV !== "production") return (cached = memoryStore());
  throw new GiftError("unavailable", "Gift cards can't be purchased online right now. Please use the Mindbody link below.", 503);
}
