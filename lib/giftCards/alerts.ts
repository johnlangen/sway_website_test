/**
 * The gift checkout's two safety nets (the Spavia site's ops alert() + uncertain list, 10/19-20):
 *
 *  - the settle list: every gift charge goes on it BEFORE it's sent to Mindbody and comes off once
 *    the answer is clear, so even a request cut off mid-purchase is looked up and settled by
 *    /api/gift-cards/reconcile/ (Vercel cron, every 5 minutes);
 *  - alert emails for anything a person has to act on (a paid gift whose email didn't go out, a
 *    purchase Mindbody can't confirm after 2 hours, Mindbody refusing every sale). Same alert at
 *    most every 30 minutes. To: OPS_ALERT_EMAIL, else contact@swaywellnessspa.com.
 */
import type { GiftStore } from "./store";

export type UncertainGift = { id: string; slug: string; at: number };

export async function noteUncertain(store: GiftStore, item: UncertainGift) {
  try {
    await store.sadd("uncertain", JSON.stringify(item));
  } catch {
    /* the guest's own status checks still settle it */
  }
}
export async function clearUncertain(store: GiftStore, item: UncertainGift) {
  try {
    await store.srem("uncertain", JSON.stringify(item));
  } catch {
    /* reconcile finds it settled and drops it */
  }
}
export async function uncertainGifts(store: GiftStore): Promise<{ raw: string; item: UncertainGift }[]> {
  return (await store.smembers("uncertain")).flatMap((raw) => {
    try {
      return [{ raw, item: JSON.parse(raw) as UncertainGift }];
    } catch {
      return [];
    }
  });
}

export async function alert(store: GiftStore, kind: string, subject: string, lines: string[]) {
  console.warn("[gift-cards] alert", kind, subject);
  try {
    if (!(await store.put(`alerted:${kind}`, 1, 1800, true))) return;
  } catch {
    /* Redis down: send anyway rather than stay silent */
  }
  if (!process.env.RESEND_API_KEY || !process.env.VERCEL) return;
  try {
    const { resend } = await import("@/lib/resend");
    await resend.emails.send({
      from: "Sway Website <contact@swaywellnessspa.com>",
      to: process.env.OPS_ALERT_EMAIL || "contact@swaywellnessspa.com",
      subject: `[Sway site] ${subject}`,
      text: [...lines, "", "Sent by the website's gift card checkout (lib/giftCards)."].join("\n\n"),
    });
  } catch {
    /* logged above */
  }
}

/** A released order (no sale found after 3 minutes), kept 24 h so a sale Mindbody lists late still surfaces */
export async function noteRelease(store: GiftStore, order: string, record: unknown) {
  try {
    await store.put(`released:${order}`, record, 2 * 86400);
    await store.sadd("released", order);
  } catch {
    /* best effort */
  }
}
