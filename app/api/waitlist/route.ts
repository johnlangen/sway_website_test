import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

/**
 * GET /api/waitlist?secret=YOUR_SECRET
 *
 * Returns all waitlist entries from Upstash Redis.
 * Protected by a simple secret (WAITLIST_ADMIN_SECRET env var).
 *
 * Optional query params:
 *   ?location=dallas    — filter by location
 *   ?limit=100          — limit results (default: all)
 */

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const adminSecret = process.env.WAITLIST_ADMIN_SECRET;

  if (!adminSecret || secret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { error: "Redis not configured" },
      { status: 500 }
    );
  }

  const locationFilter = searchParams.get("location");
  const limit = parseInt(searchParams.get("limit") || "0", 10);

  try {
    // Get all entries (newest first)
    const raw: string[] = await redis.lrange("waitlist", 0, -1);

    let entries = raw.map((r) => {
      try {
        return typeof r === "string" ? JSON.parse(r) : r;
      } catch {
        return r;
      }
    });

    // Filter by location if specified
    if (locationFilter) {
      entries = entries.filter(
        (e: any) => e.location === locationFilter
      );
    }

    // Limit if specified
    if (limit > 0) {
      entries = entries.slice(0, limit);
    }

    return NextResponse.json({
      total: entries.length,
      entries,
    });
  } catch (err) {
    console.error("[waitlist] Redis read error:", err);
    return NextResponse.json(
      { error: "Failed to read waitlist" },
      { status: 500 }
    );
  }
}
