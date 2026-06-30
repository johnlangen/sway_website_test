import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

/**
 * Front-desk migration dashboard backend (no-index, staff-only).
 *
 *   GET  /api/clubdesk?secret=SECRET            -> { giftcards, credits, cards, done }
 *   POST /api/clubdesk?secret=SECRET&action=seed    body: { giftcards, credits, cards }
 *   POST /api/clubdesk?secret=SECRET&action=toggle  body: { field, done, by, note }
 *
 * Auth reuses WAITLIST_ADMIN_SECRET. Storage is the same Upstash Redis the
 * waitlist tool uses. Lists are seeded from the Mariana Tek CSVs (PII stays out
 * of the repo); `done` is a hash of handled items so the team can check things
 * off as members come in. This NEVER touches Mindbody — pure lookup + checklist.
 */

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function authed(req: Request): boolean {
  const secret = new URL(req.url).searchParams.get("secret");
  const adminSecret = process.env.WAITLIST_ADMIN_SECRET;
  return !!adminSecret && secret === adminSecret;
}

const K = {
  giftcards: "clubdesk:giftcards",
  credits: "clubdesk:credits",
  cards: "clubdesk:cards",
  attention: "clubdesk:attention",
  daypasses: "clubdesk:daypasses",
  arrangements: "clubdesk:arrangements",
  done: "clubdesk:done",
};

const parseList = (v: unknown): unknown[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") { try { return JSON.parse(v); } catch { return []; } }
  return [];
};

export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "Redis not configured" }, { status: 500 });

  const [giftcards, credits, cards, attention, daypasses, arrangements, done] = await Promise.all([
    redis.get(K.giftcards),
    redis.get(K.credits),
    redis.get(K.cards),
    redis.get(K.attention),
    redis.get(K.daypasses),
    redis.get(K.arrangements),
    redis.hgetall(K.done),
  ]);

  // `done` values may be JSON strings or already-parsed objects (Upstash quirk).
  const doneOut: Record<string, unknown> = {};
  for (const [field, val] of Object.entries(done || {})) {
    doneOut[field] = typeof val === "string" ? (() => { try { return JSON.parse(val); } catch { return val; } })() : val;
  }

  return NextResponse.json({
    giftcards: parseList(giftcards),
    credits: parseList(credits),
    cards: parseList(cards),
    attention: parseList(attention),
    daypasses: parseList(daypasses),
    arrangements: parseList(arrangements),
    done: doneOut,
  });
}

export async function POST(req: Request) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "Redis not configured" }, { status: 500 });

  const action = new URL(req.url).searchParams.get("action");
  const body = await req.json().catch(() => ({} as any));

  if (action === "seed") {
    await Promise.all([
      redis.set(K.giftcards, JSON.stringify(body.giftcards || [])),
      redis.set(K.credits, JSON.stringify(body.credits || [])),
      redis.set(K.cards, JSON.stringify(body.cards || [])),
      redis.set(K.attention, JSON.stringify(body.attention || [])),
      redis.set(K.daypasses, JSON.stringify(body.daypasses || [])),
      redis.set(K.arrangements, JSON.stringify(body.arrangements || [])),
    ]);
    return NextResponse.json({
      ok: true,
      seeded: {
        giftcards: (body.giftcards || []).length,
        credits: (body.credits || []).length,
        cards: (body.cards || []).length,
        attention: (body.attention || []).length,
        daypasses: (body.daypasses || []).length,
        arrangements: (body.arrangements || []).length,
      },
    });
  }

  if (action === "toggle") {
    const field: string = body.field;
    if (!field) return NextResponse.json({ error: "missing field" }, { status: 400 });
    if (body.done) {
      await redis.hset(K.done, {
        [field]: JSON.stringify({ done: true, by: body.by || "", at: new Date().toISOString(), note: body.note || "" }),
      });
    } else {
      await redis.hdel(K.done, field);
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
