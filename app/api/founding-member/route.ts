import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

/**
 * POST /api/founding-member
 * Captures founding member / waitlist interest.
 *
 * Body: {
 *   "firstName": "Jane",
 *   "lastName": "Doe",
 *   "email": "jane@example.com",
 *   "phone": "+15551234567",   // optional
 *   "location": "dallas",       // "dallas" | "georgetown"
 *   "source": "location-page"   // "location-page" | "founding-membership"
 * }
 *
 * Saves to Upstash Redis (Vercel Marketplace) as a list.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?1?\d{10,11}$/; // flexible US phone

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function POST(req: Request) {
  let body: {
    firstName?: string;
    lastName?: string;
    name?: string; // backward compat
    email?: string;
    phone?: string;
    location?: string;
    source?: string;
    membership?: string; // backward compat
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Support both new (firstName/lastName) and old (name) formats
  const firstName = body.firstName?.trim() || body.name?.trim().split(" ")[0] || "";
  const lastName = body.lastName?.trim() || body.name?.trim().split(" ").slice(1).join(" ") || "";
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim().replace(/[\s\-\(\)]/g, "") || "";
  const location = body.location?.trim() || "unknown";
  const source = body.source?.trim() || "founding-membership";

  if (!firstName) {
    return NextResponse.json(
      { error: "Please enter your first name" },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid phone number" },
      { status: 400 }
    );
  }

  const entry = {
    firstName,
    lastName,
    email,
    phone: phone || null,
    location,
    source,
    createdAt: new Date().toISOString(),
  };

  // Log for debugging
  console.log("[founding-member]", entry);

  // Save to Upstash Redis
  const redis = getRedis();
  if (redis) {
    try {
      // Push to a list — newest first
      await redis.lpush("waitlist", JSON.stringify(entry));
    } catch (err) {
      console.error("[founding-member] Redis save error:", err);
      // Don't fail the request — still return success
    }
  } else {
    console.warn(
      "[founding-member] UPSTASH_REDIS_REST_URL or TOKEN not set — data only in logs"
    );
  }

  return NextResponse.json({ success: true });
}
