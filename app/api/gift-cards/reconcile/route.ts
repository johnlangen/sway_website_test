import { NextResponse, type NextRequest } from "next/server";
import { OPS_COOKIE, opsKeyMatches } from "@/lib/ops/report";
import { giftStore } from "@/lib/giftCards/store";
import { giftSite } from "@/lib/giftCards/sites";
import { alert, clearUncertain, uncertainGifts } from "@/lib/giftCards/alerts";
import { recoverGift, releaseOrder, type PurchaseRecord } from "@/lib/giftCards/checkout";
import { giftSaleSince, purchasesSince } from "@/lib/giftCards/mindbody";
import { fulfillGift } from "@/lib/giftCards/delivery";
import { countSale, liveSiteRequest } from "@/lib/giftCards/count";
import { recordServerError } from "@/lib/ops/record";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * GET /api/gift-cards/reconcile/  (Vercel cron every 5 minutes, vercel.json; or by hand with the
 * /ops/ key: ?key=… or the ops cookie)
 *
 * Settles gift purchases Mindbody left uncertain, without waiting for the guest (the Spavia site's
 * /api/ops/reconcile/, 10/19-20). For each order on the settle list (lib/giftCards/alerts.ts):
 *   found in Mindbody → completed: the gift and receipt go out, the sale is counted, an email says so;
 *   no sale at all for the guest after 3 minutes → nothing was charged: the order is released (the
 *     guest's status check says they can buy again);
 *   neither after 2 hours → one alert to check Mindbody, and it leaves the list.
 * Then it retries any purchased gift whose email hasn't gone out.
 */
const GIVE_UP = 2 * 3600000;
const RELEASE_AFTER = 3 * 60000;

async function authorized(req: NextRequest) {
  const cron = process.env.CRON_SECRET;
  if (cron && req.headers.get("authorization") === `Bearer ${cron}`) return true;
  if (opsKeyMatches(req.nextUrl.searchParams.get("key") || req.cookies.get(OPS_COOKIE)?.value)) return true;
  // Without CRON_SECRET in Vercel, the cron is recognized by its user agent. That can be faked, but
  // the job only settles existing orders, so a fake call can at most run it once a minute.
  return !cron && /^vercel-cron\//.test(req.headers.get("user-agent") || "") && giftStore().put("reconcile-lock", 1, 60, true);
}

export async function GET(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: "not found" }, { status: 404 });
  const store = giftStore();
  const results: Record<string, unknown>[] = [];

  for (const { raw, item } of await uncertainGifts(store)) {
    const site = giftSite(item.slug);
    const ref = item.id.slice(0, 8).toUpperCase();
    let outcome = "open";
    try {
      const record = await store.get<PurchaseRecord>(`purchase:${item.id}`);
      if (!record || !site) outcome = "gone";
      else {
        const result = record.result.state === "purchased" ? record.result : await recoverGift(store, site, item.id);
        if (result?.state === "purchased") {
          await countSale(liveSiteRequest(), store, item.id);
          await fulfillGift(store, item.id);
          outcome = "found";
        } else if (
          Date.now() - record.startedAt >= RELEASE_AFTER &&
          (await purchasesSince(site, record.clientId, record.startedAt - 30 * 60000)).length === 0 &&
          (await releaseOrder(store, item.id, record))
        ) {
          outcome = "released";
        }
      }
    } catch (e) {
      outcome = `error: ${e instanceof Error ? e.message : "unknown"}`;
      await recordServerError("gift", item.slug, "reconcile", outcome);
    }
    const age = Date.now() - item.at;
    if (outcome === "found" || outcome === "released") {
      await clearUncertain(store, item);
      await store.srem("uncertain", raw);
      await alert(store, `settled:${ref}`, `Gift card at ${site?.name ?? item.slug}: settled, nothing to do`, [
        outcome === "found"
          ? `The gift card purchase GIFT-${ref} that Mindbody didn't confirm in time did go through. The site found the sale in Mindbody, sent the gift and the buyer's receipt, and counted it.`
          : `The gift card purchase GIFT-${ref} that Mindbody didn't confirm never went through: Mindbody has no sale for the guest, so nothing was charged. The guest can buy again.`,
      ]);
    } else if (outcome === "gone") {
      await store.srem("uncertain", raw);
    } else if (age > GIVE_UP) {
      await store.srem("uncertain", raw);
      await alert(store, `unsettled:${ref}`, `Gift card at ${site?.name ?? item.slug}: still not settled after 2 hours`, [
        `The gift card purchase GIFT-${ref} still can't be matched in Mindbody after 2 hours, so the site stopped looking.`,
        "The guest has a sale in Mindbody since the attempt that isn't an exact match (or Mindbody couldn't be read). Check the guest's sales in Mindbody: if a gift card was sold, email them its number.",
      ]);
    }
    results.push({ ref, slug: item.slug, ageMin: Math.round(age / 60000), outcome });
  }

  for (const order of await store.smembers("deliveries")) {
    try {
      const r = await fulfillGift(store, order);
      results.push({ delivery: order.slice(0, 8), retried: true, stillPending: Boolean(r.deliveryCheckNeeded) });
    } catch (e) {
      // Only an order that isn't (or is no longer) a purchase leaves the list; a passing error retries next run
      const record = await store.get<PurchaseRecord>(`purchase:${order}`).catch(() => undefined);
      if (record === null || (record && record.result.state !== "purchased")) await store.srem("deliveries", order);
      else
        await alert(store, `delivery-error:${order}`, "Gift card email retry failing", [
          `Retrying the emails for gift order GIFT-${order.slice(0, 8).toUpperCase()} failed: ${e instanceof Error ? e.message : "unknown"}. It keeps retrying every 5 minutes.`,
        ]);
    }
  }

  // Released orders (nothing found after 3 minutes): watched for 24 h in case Mindbody lists the sale late
  for (const order of await store.smembers("released")) {
    try {
      const r = await store.get<PurchaseRecord>(`released:${order}`);
      const site = r && giftSite(r.gift.slug);
      if (!r || !site || Date.now() - r.startedAt > 86400000) {
        await store.srem("released", order);
        continue;
      }
      const sale = await giftSaleSince(site, r.clientId, r.startedAt - 60000, r.startedAt + 3 * 60000, r.gift.amount, r.gift.value);
      if (!sale || (await store.get<string>(`sale-claim:${site.siteId}:${sale.saleId}`))) continue;
      await store.srem("released", order);
      await alert(store, `late-sale:${order}`, `Gift card sale found after it was released (${site.name})`, [
        `Gift order GIFT-${order.slice(0, 8).toUpperCase()} was released because Mindbody had no sale for the buyer after 3 minutes, but the sale has now appeared: Mindbody sale #${sale.saleId}, gift card ${sale.barcode}, $${sale.amount}.`,
        `The buyer (${r.email}) was charged but no gift went out. Email the buyer and the recipient (${r.gift.recipient}, ${r.gift.recipientEmail}) the gift card number, or refund it in Mindbody if they bought again.`,
      ]);
      results.push({ lateSale: order.slice(0, 8), saleId: sale.saleId });
    } catch {
      /* next run */
    }
  }

  return NextResponse.json({ results }, { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } });
}
