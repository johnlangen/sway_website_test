import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

export const runtime = "nodejs";

/**
 * GET /api/launch-leads?location=dallas&key=ATLAS_LEADS_SECRET
 *
 * Server-to-server feed of pre-opening waitlist leads for Spavia Atlas
 * (per-location, sanitized — same shape as /api/dallas-dashboard, which
 * remains the secret behind Staci's standalone launch board link).
 *
 * No PII by design: outreach runs through the central campaign. Atlas
 * shows counts and names, never addresses/phones.
 */

const ALLOWED_LOCATIONS = new Set(["dallas", "georgetown"]);

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const secret = process.env.ATLAS_LEADS_SECRET;

  if (!secret || key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const location = searchParams.get("location") ?? "";
  if (!ALLOWED_LOCATIONS.has(location)) {
    return NextResponse.json(
      { error: `Unknown location. Allowed: ${[...ALLOWED_LOCATIONS].join(", ")}` },
      { status: 400 }
    );
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Redis not configured" }, { status: 500 });
  }

  try {
    const raw: string[] = await redis.lrange("waitlist", 0, -1);
    const entries = raw
      .map((r) => {
        try {
          return typeof r === "string" ? JSON.parse(r) : r;
        } catch {
          return null;
        }
      })
      .filter((e: any) => e && e.location === location)
      .map((e: any) => ({
        firstName: e.firstName ?? "",
        lastName: e.lastName ?? "",
        emailKey:
          typeof e.email === "string"
            ? createHash("sha256").update(e.email.toLowerCase()).digest("hex").slice(0, 12)
            : null,
        hasPhone: !!e.phone,
        source: e.source ?? "unknown",
        createdAt: e.createdAt ?? null,
        viaInstagram:
          typeof e.consentUserAgent === "string" &&
          e.consentUserAgent.includes("Instagram"),
        utmCampaign: e.utmCampaign ?? null,
        utmSource: e.utmSource ?? null,
        referrerHost: e.referrerHost ?? null,
      }));

    return NextResponse.json({ location, total: entries.length, entries });
  } catch (err) {
    console.error("[launch-leads] Redis read error:", err);
    return NextResponse.json({ error: "Failed to read leads" }, { status: 500 });
  }
}
