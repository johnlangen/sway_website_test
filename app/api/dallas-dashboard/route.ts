import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

export const runtime = "nodejs";

/**
 * GET /api/dallas-dashboard?key=DALLAS_DASHBOARD_SECRET
 *
 * Dallas-only lead feed for the owner dashboard at
 * /locations/dallas/dashboard. Deliberately scoped:
 *  - its own secret (NOT the master WAITLIST_ADMIN_SECRET, which
 *    exposes every location)
 *  - Dallas entries only
 *  - sanitized fields — no IPs, user agents, or consent text; just a
 *    computed viaInstagram flag from the stored user agent.
 */

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const secret = process.env.DALLAS_DASHBOARD_SECRET;

  if (!secret || key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      .filter((e: any) => e && e.location === "dallas")
      .map((e: any) => ({
        // No contact info on purpose: outreach runs through the campaign,
        // not ad-hoc from the dashboard. John's master waitlist link keeps
        // the full records.
        firstName: e.firstName ?? "",
        lastName: e.lastName ?? "",
        // dedup key for repeat submitters without exposing the address
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

    return NextResponse.json({ total: entries.length, entries });
  } catch (err) {
    console.error("[dallas-dashboard] Redis read error:", err);
    return NextResponse.json({ error: "Failed to read leads" }, { status: 500 });
  }
}
