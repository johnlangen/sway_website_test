import { Redis } from "@upstash/redis";

/**
 * Card-testing protection: per-IP velocity limit for routes that accept raw
 * card numbers or trigger charges on stored cards. Card-testing bots run
 * hundreds of stolen numbers through unauthenticated payment forms to learn
 * which are still live; a velocity cap makes that uneconomical without
 * touching real guests.
 *
 * Limits are deliberately loose: 10 attempts/hour, 30/day per IP. Guests
 * near Larimer Square often share hotel/office NAT IPs, and a real guest
 * may retype a declined card several times.
 *
 * FAIL-OPEN by design: if Redis is unconfigured or unreachable, requests
 * proceed. A gap in protection is acceptable; blocked bookings are not.
 */

const HOUR_LIMIT = 10;
const DAY_LIMIT = 30;

function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function checkCardRateLimit(
  req: Request
): Promise<{ allowed: boolean }> {
  try {
    const redis = getRedis();
    if (!redis) return { allowed: true };

    const ip = clientIp(req);
    if (!ip || ip === "unknown") return { allowed: true };

    const now = Date.now();
    const hourKey = `cardrl:h:${ip}:${Math.floor(now / 3_600_000)}`;
    const dayKey = `cardrl:d:${ip}:${Math.floor(now / 86_400_000)}`;

    const [hourCount, dayCount] = await Promise.all([
      redis.incr(hourKey),
      redis.incr(dayKey),
    ]);
    if (hourCount === 1) await redis.expire(hourKey, 3_700);
    if (dayCount === 1) await redis.expire(dayKey, 86_500);

    if (hourCount > HOUR_LIMIT || dayCount > DAY_LIMIT) {
      console.warn(
        `[CARD RATE LIMIT] blocked ip=${ip} hour=${hourCount} day=${dayCount}`
      );
      return { allowed: false };
    }
    return { allowed: true };
  } catch (err) {
    console.error("[CARD RATE LIMIT] check failed, allowing request", err);
    return { allowed: true };
  }
}

/** Shared 429 body so all card routes respond consistently. */
export const RATE_LIMIT_RESPONSE = {
  error:
    "Too many attempts from this connection. Please try again in an hour, or call us at (303) 476-6150 and we'll take care of you.",
  code: "rate_limited",
};
