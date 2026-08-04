/**
 * Ad attribution store (server side).
 *
 * Persists the Google Ads click id against the Mindbody appointment it
 * produced, so a later job can look up completed appointments and upload
 * OFFLINE conversions to Google Ads. That is what turns "87 conversions"
 * (form submits, including no-shows) into "N people who actually came in".
 *
 * Keyed by appointment id because that is the direction the uploader reads:
 * completed appointment -> gclid -> offline conversion.
 *
 * FAIL-OPEN, exactly like lib/cardRateLimit.ts: if Redis is unconfigured or
 * unreachable this silently does nothing. Attribution must never fail a
 * booking.
 */
import { Redis } from "@upstash/redis";

const TTL_SECONDS = 90 * 24 * 60 * 60; // Google's max click lookback
const PREFIX = "gclid:appt:";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export type BookingAttribution = {
  gclid: string;
  appointmentId: string | number;
  clientId?: string | number | null;
  sessionTypeId?: string | number | null;
  startDateTime?: string | null;
  siteId?: string | null;
  value?: number | null;
};

export async function recordBookingAttribution(
  a: BookingAttribution
): Promise<void> {
  if (!a.gclid || !a.appointmentId) return;
  try {
    const redis = getRedis();
    if (!redis) return;
    await redis.set(
      `${PREFIX}${a.appointmentId}`,
      JSON.stringify({ ...a, recordedAt: new Date().toISOString() }),
      { ex: TTL_SECONDS }
    );
    console.log("[ad-attribution] stored", {
      appointmentId: a.appointmentId,
      gclid: a.gclid.slice(0, 12) + "…",
    });
  } catch (err: any) {
    console.error("[ad-attribution] store failed", { message: err?.message });
  }
}

/** Used by the offline-conversion uploader. */
export async function getBookingAttribution(
  appointmentId: string | number
): Promise<Record<string, unknown> | null> {
  try {
    const redis = getRedis();
    if (!redis) return null;
    const raw = await redis.get(`${PREFIX}${appointmentId}`);
    if (!raw) return null;
    return typeof raw === "string" ? JSON.parse(raw) : (raw as any);
  } catch {
    return null;
  }
}
