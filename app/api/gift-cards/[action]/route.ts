import { NextResponse, after, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { findClientsByEmail } from "@/lib/membershipVerify";
import { countSale } from "@/lib/giftCards/count";
import { recordServerError } from "@/lib/ops/record";
import { GiftError, giftStore } from "@/lib/giftCards/store";
import { giftCheckoutOn, giftSite } from "@/lib/giftCards/sites";
import { beginVerification, readSession, saveSession, verifyCode, type GiftSession } from "@/lib/giftCards/auth";
import { addBuyer } from "@/lib/giftCards/mindbody";
import { commitGift, giftCatalog, giftReview, giftStatus, quoteGift, type GiftResult } from "@/lib/giftCards/checkout";
import { fulfillGift, giftAccess, giftPdf } from "@/lib/giftCards/delivery";
import type { GiftDetails } from "@/lib/giftCards/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// The real charge can wait up to 45 s for Mindbody (lib/giftCards/mindbody.ts)
export const maxDuration = 60;

/**
 * POST /api/gift-cards/<action>/   { slug, ... }
 *
 * The native gift card checkout (lib/giftCards, ported from the Spavia site 10/28). One route,
 * like Spavia's /api/booking/gift-checkout/: catalog → (gift + delivery on the page) → begin /
 * verify (email code) → account → choose | profile → quote (no-charge test sale) → commit (the
 * charge) → status; gift / pdf open an issued gift by its private token.
 *
 * Cookies are per location and only sent to /api/gift-cards: the code challenge (10 min), the
 * verified session (1 h) and the order (30 days, so a guest who comes back sees their purchase
 * instead of buying twice). GIFT_CHECKOUT=off stops new purchases (gift/pdf/status still work).
 */

const COOKIE_PATH = "/api/gift-cards";
const cookieName = (kind: "code" | "session" | "order", slug: string) => `sway_gc_${kind}_${slug.replace(/-/g, "_")}`;
const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: Boolean(process.env.VERCEL) || process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: COOKIE_PATH,
  maxAge,
});
const reply = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store", Vary: "Cookie, Origin" } });

async function readBody(req: NextRequest) {
  if (!req.headers.get("content-type")?.startsWith("application/json")) throw new GiftError("request", "Unsupported request.", 415);
  const text = await req.text();
  if (text.length > 12000) throw new GiftError("request", "Request too large.", 413);
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new GiftError("request", "Invalid request.");
  }
}

/** Only this site's own pages may call the checkout (no cross-site posts) */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").toLowerCase();
    return new URL(origin).host.toLowerCase() === host;
  } catch {
    return false;
  }
}

const clientIp = (req: NextRequest) => (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";

const publicProfile = (c: { id: string; firstName: string; lastName: string; hasCardOnFile: boolean; lastFour: string | null }) => ({
  id: c.id,
  firstName: c.firstName,
  lastName: c.lastName,
  hasCard: c.hasCardOnFile && Boolean(c.lastFour),
  cardLastFour: c.hasCardOnFile ? c.lastFour : null,
});

async function handle(req: NextRequest, action: string, ctx: { slug?: string }): Promise<NextResponse> {
  if (!sameOrigin(req)) throw new GiftError("origin", "Please use the gift card checkout on this website.", 403);
  const b = await readBody(req);
  const site = giftSite(b.slug);
  if (!site) throw new GiftError("location", "Gift cards aren't sold online for this location.", 404);
  ctx.slug = site.slug;
  const store = giftStore();
  const ip = clientIp(req);
  if ((await store.incr(`rate:req:${ip}`, 600)) > 150) throw new GiftError("rate_limit", "Too many requests. Please wait a few minutes.", 429);

  if (action === "gift" || action === "pdf") {
    const gift = await giftAccess(store, String(b.token || ""));
    if (gift.slug !== site.slug) throw new GiftError("gift", "This gift belongs to another location.", 404);
    if (action === "pdf")
      return new NextResponse(Buffer.from(await giftPdf(gift)), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="Sway-gift-card.pdf"',
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    return reply({ gift });
  }

  const open = giftCheckoutOn();
  if (!open && !["status"].includes(action))
    throw new GiftError("paused", "Online gift cards are paused right now. Please use the Mindbody link below.", 503);

  if (action === "catalog") return reply({ products: await giftCatalog(site) });

  if (action === "begin") {
    const old = req.cookies.get(cookieName("code", site.slug))?.value;
    if (old && /^[0-9a-f-]{36}$/.test(old)) await store.remove(`challenge:${old}`);
    const id = await beginVerification(store, site, b.email, ip);
    const out = reply({ codeSent: true });
    out.cookies.set(cookieName("code", site.slug), id, cookieOptions(600));
    return out;
  }

  if (action === "verify") {
    const s = await verifyCode(store, site, req.cookies.get(cookieName("code", site.slug))?.value || "", b.code);
    // The same buyer coming back keeps their order (and sees a purchase already made)
    const oldOrder = req.cookies.get(cookieName("order", site.slug))?.value || "";
    const owner = /^[0-9a-f-]{36}$/.test(oldOrder) ? await store.get<{ email: string; slug: string }>(`order-owner:${oldOrder}`) : null;
    const order = owner?.email === s.email && owner.slug === site.slug ? oldOrder : randomUUID();
    await store.put(`order-owner:${order}`, { email: s.email, slug: site.slug }, 30 * 86400);
    const out = reply({ verified: true });
    out.cookies.set(cookieName("order", site.slug), order, cookieOptions(30 * 86400));
    out.cookies.set(cookieName("session", site.slug), s.id, cookieOptions(3600));
    out.cookies.set(cookieName("code", site.slug), "", cookieOptions(0));
    return out;
  }

  // Everything below needs the verified session and its order
  const s = await readSession(store, site, req.cookies.get(cookieName("session", site.slug))?.value);
  const order = req.cookies.get(cookieName("order", site.slug))?.value || "";
  const owner = /^[0-9a-f-]{36}$/.test(order) ? await store.get<{ email: string; slug: string }>(`order-owner:${order}`) : null;
  if (!owner || owner.email !== s.email || owner.slug !== site.slug) throw new GiftError("session", "Please verify your email again to continue.", 401);

  if (action === "status") {
    const result = await giftStatus(store, site, s, order);
    if (result?.state === "purchased") {
      if (result.recovered) after(() => countSale(req, store, order));
      return reply({ result: { ...(await fulfillGift(store, order)), ...(result.recovered ? { recovered: true } : {}) } });
    }
    return reply({ result });
  }

  if (action === "new") {
    const result = await giftStatus(store, site, s, order);
    if (result && result.state !== "purchased" && result.state !== "released")
      throw new GiftError("purchase", "Your last purchase is still being confirmed. Please wait for it before starting another.", 409);
    const next = randomUUID();
    await store.put(`order-owner:${next}`, { email: s.email, slug: site.slug }, 30 * 86400);
    const out = reply({ ok: true });
    out.cookies.set(cookieName("order", site.slug), next, cookieOptions(30 * 86400));
    return out;
  }

  if (action === "account") {
    const profiles = (await findClientsByEmail(site.siteId, s.email)).map(publicProfile);
    return reply({ email: s.email, profiles, chosen: s.clientId ?? null });
  }

  if (action === "choose") {
    const id = String(b.clientId || "");
    const match = (await findClientsByEmail(site.siteId, s.email)).find((c) => c.id === id);
    if (!match) throw new GiftError("session", "Please choose one of your accounts.", 403);
    await saveSession(store, { ...s, clientId: match.id } satisfies GiftSession);
    return reply({ profile: publicProfile(match) });
  }

  if (action === "profile") {
    if (s.clientId) throw new GiftError("profile", "Your account is already selected.", 409);
    const p = (b.profile ?? {}) as Record<string, unknown>;
    const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim() : "").slice(0, max);
    const firstName = text(p.firstName, 40);
    const lastName = text(p.lastName, 40);
    const mobilePhone = text(p.mobilePhone, 20).replace(/[^\d+()\-. ]/g, "");
    if (!firstName || !lastName || mobilePhone.replace(/\D/g, "").length < 10)
      throw new GiftError("details", "Please enter your first name, last name and mobile number.");
    if ((await store.incr(`rate:profile:${site.slug}:${s.email}`, 3600)) > 3)
      throw new GiftError("rate_limit", "Too many tries. Please call the spa and we'll help.", 429);
    // Someone who already has an account picks it instead of creating a duplicate
    if ((await findClientsByEmail(site.siteId, s.email)).length) throw new GiftError("account_exists", "You already have an account here. Please choose it.", 409);
    const clientId = await addBuyer(site, { firstName, lastName, email: s.email, mobilePhone });
    await saveSession(store, { ...s, clientId });
    return reply({ profile: { id: clientId, firstName, lastName, hasCard: false, cardLastFour: null } });
  }

  if (action === "quote") return reply({ quote: giftReview(await quoteGift(store, site, s, order, b.details as GiftDetails)) });

  if (action === "commit") {
    const result: GiftResult = await commitGift(store, site, s, order, String(b.quoteId || ""), b.accepted, b.card);
    if (result.state !== "purchased") {
      if (!result.replay) after(() => recordServerError("gift", site.slug, "commit", "Mindbody didn't confirm the sale (settling)"));
      return reply({ result });
    }
    after(() => countSale(req, store, order));
    // A second delivery try a few seconds later, registered first so it runs even if the first throws
    after(async () => {
      try {
        await new Promise((r) => setTimeout(r, 3000));
        await fulfillGift(store, order);
      } catch {
        /* The status checks and the reconcile job keep trying */
      }
    });
    try {
      return reply({ result: { ...(await fulfillGift(store, order)), ...(result.replay ? { replay: true } : {}) } });
    } catch {
      return reply({
        result: { ...result, deliveryCheckNeeded: true, delivery: "Your gift is purchased. Its email isn't confirmed yet: use “Check email delivery” below." },
      });
    }
  }

  throw new GiftError("request", "Unknown request.", 404);
}

export async function POST(req: NextRequest, context: { params: Promise<{ action: string }> }) {
  const { action } = await context.params;
  const ctx: { slug?: string } = {};
  try {
    return await handle(req, action, ctx);
  } catch (e) {
    // Our side or Mindbody failed (not a guest mistake): on /ops/ as a server error
    if (!(e instanceof GiftError) || e.status >= 500)
      after(() =>
        recordServerError("gift", ctx.slug || "-", action, e instanceof GiftError ? `${e.code}: ${e.refusal || e.message}` : e instanceof Error ? e.message : "unknown"),
      );
    if (e instanceof GiftError) return reply({ error: e.code, message: e.message }, e.status);
    console.error("[gift-cards]", action, e instanceof Error ? e.message : "unknown");
    return reply(
      {
        error: "unavailable",
        message: "Something went wrong on our side. If you submitted a purchase, check its status before trying again.",
      },
      503,
    );
  }
}

