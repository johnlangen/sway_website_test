/**
 * After Mindbody confirms a sale: the issued gift, its two emails and its printable PDF (the Spavia
 * site's gift-delivery.ts, 10/28 port).
 *
 *  - The purchase proof and the issued gift are saved before any email: delivery can never trigger
 *    a purchase, and a gift whose email fails is still viewable and printable from its link.
 *  - Each email is sent once: a 45 s send lock plus Resend's idempotency key (remembered 24 h). A
 *    send that didn't answer is retried with the same key only inside that window; after 23 h it's
 *    marked for a person rather than risk a duplicate. A bounced or stuck gift email alerts.
 *  - The gift's private link (#gift=<token>) is the only way to open it. The issued gift is keyed
 *    by the token's hash; the purchase record and the stored email payloads hold the link itself
 *    (needed to resend it), so treat this Redis data as private.
 */
import { readFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { GiftError, sha256, type GiftStore } from "./store";
import { GIFT_ACTIVATION_NOTICE, GIFT_CARD_TERMS } from "./catalog";
import { absoluteArtwork, artworkFile, ART_PATH } from "./artwork";
import { giftDeliveryLabel } from "./schedule";
import { giftEmail, receiptEmail, formatCode } from "./emails";
import { alert } from "./alerts";
import { RECORD_TTL, type GiftResult, type PurchaseRecord } from "./checkout";
import { bookPath, giftCheckoutPath, giftSite, publicOrigin, type GiftSite } from "./sites";

export type IssuedGift = {
  slug: string;
  spa: string;
  address: string;
  phone: string;
  title: string;
  recipient: string;
  sender: string;
  message: string;
  value: number;
  barcode: string;
  /** Site-relative artwork */
  image: string;
  printImage: string;
  terms: string;
};

type Delivery = {
  firstAttempt: number;
  state: "pending" | "sent" | "needs_help";
  id?: string;
  lastEvent?: string;
  checkedAt?: number;
  payload: Record<string, unknown>;
};

const FROM = "Sway Wellness <contact@swaywellnessspa.com>";
const BAD_EVENTS = ["bounced", "failed", "suppressed", "canceled"];

export async function giftAccess(store: GiftStore, token: string): Promise<IssuedGift> {
  if (!/^[a-f0-9]{64}$/.test(token)) throw new GiftError("gift", "This gift link isn't valid.", 404);
  const gift = await store.get<IssuedGift>(`issued:${sha256(token)}`);
  if (!gift) throw new GiftError("gift", "This gift link isn't available. Please contact the spa and we'll resend it.", 404);
  return gift;
}

async function sendOnce(store: GiftStore, key: string, payload: Record<string, unknown>): Promise<Delivery | null> {
  let delivery = await store.get<Delivery>(key);
  if (!delivery?.id) {
    const owner = randomUUID();
    if (await store.put(`${key}:lock`, owner, 45, true)) {
      try {
        delivery = await store.get<Delivery>(key);
        if (!delivery?.id) {
          delivery ||= { firstAttempt: Date.now(), state: "pending", payload };
          if (Date.now() - delivery.firstAttempt > 23 * 3600000) delivery.state = "needs_help";
          await store.put(key, delivery, RECORD_TTL);
          if (delivery.state !== "needs_help" && process.env.RESEND_API_KEY) {
            try {
              const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                  "Content-Type": "application/json",
                  "Idempotency-Key": `sway-${key}`,
                },
                body: JSON.stringify(delivery.payload),
                signal: AbortSignal.timeout(15000),
              });
              const result = (await res.json().catch(() => ({}))) as { id?: unknown; message?: unknown };
              if (res.ok && typeof result.id === "string") {
                delivery = { ...delivery, id: result.id, state: "sent" };
                await store.put(key, delivery, RECORD_TTL);
              } else console.error("[gift-cards] email not accepted", res.status, String(result.message ?? ""));
            } catch {
              /* Stays pending with the same idempotency key for the next try */
            }
          }
        }
      } finally {
        await store.release(`${key}:lock`, owner);
      }
    }
  }
  // Delivered, bounced…: Resend's latest event, read at most every 30 s
  if (delivery?.id && Date.now() - (delivery.checkedAt || 0) > 30000) {
    try {
      const res = await fetch(`https://api.resend.com/emails/${encodeURIComponent(delivery.id)}`, {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const event = (await res.json()) as { last_event?: unknown };
        delivery.lastEvent = String(event.last_event || "");
        delivery.checkedAt = Date.now();
        await store.put(key, delivery, RECORD_TTL);
      }
    } catch {
      /* An accepted email stays sent if the status read fails */
    }
  }
  return delivery;
}

const dateIn = (ms: number, zone: string) => new Date(ms).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: zone });

/** Issues the gift and sends (or schedules) its email and the buyer's receipt. Safe to repeat. */
export async function fulfillGift(store: GiftStore, order: string): Promise<GiftResult> {
  const r = await store.get<PurchaseRecord>(`purchase:${order}`);
  if (!r?.receipt || r.result.state !== "purchased") throw new GiftError("gift", "Purchase confirmation is still pending.", 409);
  const q = r.gift;
  const site = giftSite(q.slug) as GiftSite;
  const design = q.product.designs.find((d) => d.id === q.designId) ?? q.product.designs[0];
  const gift: IssuedGift = {
    slug: site.slug,
    spa: site.name,
    address: site.address,
    phone: site.phone,
    title: q.title,
    recipient: q.recipient,
    sender: q.sender,
    message: q.message,
    value: r.receipt.value,
    barcode: r.receipt.barcode,
    image: design.image,
    printImage: design.printImage,
    terms: `${GIFT_CARD_TERMS}${q.product.terms ? `\n\n${q.product.terms}` : ""}`,
  };
  await store.put(`issued:${sha256(r.token)}`, gift, RECORD_TTL);

  const origin = publicOrigin();
  const giftUrl = `${origin}${giftCheckoutPath(site.slug)}#gift=${r.token}`;
  const spa = {
    name: site.name,
    address: site.address,
    phone: site.phone,
    pageUrl: `${origin}/locations/${site.slug}/`,
    bookUrl: `${origin}${bookPath(site.slug)}`,
    contactEmail: site.contactEmail,
  };
  const base = {
    spa,
    title: q.title,
    recipientName: q.recipient,
    senderName: q.sender,
    message: q.message,
    value: r.receipt.value,
    code: r.receipt.barcode,
    artworkUrl: absoluteArtwork(design.image),
    giftUrl,
    logoUrl: `${origin}/gift-cards/sway-logo-white.png`,
  };
  const scheduled = Boolean(q.scheduledAt && Date.parse(q.scheduledAt) > Date.now());
  const deliveryLabel = q.scheduledAt ? giftDeliveryLabel(q.deliveryDate, true) : "Right after purchase";
  const gEmail = giftEmail(base);
  const rEmail = receiptEmail({
    ...base,
    recipientEmail: q.recipientEmail,
    buyerName: q.sender,
    amountPaid: r.receipt.amount,
    cardLabel: q.cardLastFour ? `card ending in ${q.cardLastFour}` : "your card",
    saleId: r.receipt.saleId,
    purchasedOn: dateIn(r.startedAt, site.timezone),
    deliveryLabel,
    scheduled: Boolean(q.scheduledAt),
  });
  const [delivery, receipt] = await Promise.all([
    sendOnce(store, `delivery:${order}`, {
      from: FROM,
      reply_to: site.contactEmail,
      to: [q.recipientEmail],
      tags: [{ name: "type", value: "gift" }],
      ...gEmail,
      ...(scheduled ? { scheduled_at: q.scheduledAt } : {}),
    }),
    sendOnce(store, `receipt:${order}`, {
      from: FROM,
      reply_to: site.contactEmail,
      to: [r.email],
      tags: [{ name: "type", value: "gift-receipt" }],
      ...rEmail,
    }),
  ]);
  // A paid gift whose email can't go out needs a person
  const stuck = [
    delivery?.state === "needs_help" && "the gift email gave up after 23 hours",
    BAD_EVENTS.includes(delivery?.lastEvent || "") && `the gift email ${delivery?.lastEvent}`,
    receipt?.state === "needs_help" && "the buyer's receipt gave up after 23 hours",
  ].filter(Boolean) as string[];
  if (stuck.length)
    await alert(store, `gift-email:${order}`, `Gift card email not delivered (${site.name})`, [
      `Order ${r.result.reference}, Mindbody sale #${r.receipt.saleId}: ${stuck.join("; ")}.`,
      `The gift card is purchased in Mindbody. Email the buyer (${r.email}) the gift link, or ask for a new recipient address: ${giftUrl}`,
    ]);
  const deliveryCheckNeeded = (!delivery?.id && delivery?.state !== "needs_help") || (!receipt?.id && receipt?.state !== "needs_help");
  // An email still not out is retried by the reconcile job even after the guest leaves
  try {
    if (deliveryCheckNeeded) await store.sadd("deliveries", order);
    else await store.srem("deliveries", order);
  } catch {
    /* the guest's own checks retry it too */
  }
  return {
    ...r.result,
    giftToken: r.token,
    deliveryCheckNeeded,
    buyerReceipt: receipt?.id
      ? "Your receipt is on its way to your email."
      : receipt?.state === "needs_help"
        ? `Your receipt email didn't send, but your gift card is purchased. Contact ${site.name} if you need a copy.`
        : "Your receipt email is still sending. Use “Check email delivery” below to check again.",
    delivery: delivery?.id
      ? BAD_EVENTS.includes(delivery.lastEvent || "")
        ? `Your gift is ready, but the email to ${q.recipientEmail} bounced. Download the gift below to share it yourself, or contact ${site.name} and we'll resend it.`
        : ["delivered", "opened", "clicked"].includes(delivery.lastEvent || "")
          ? `Gift email delivered to ${q.recipientEmail}.`
          : scheduled
            ? `Gift email scheduled for ${deliveryLabel} to ${q.recipientEmail}.`
            : `Gift email on its way to ${q.recipientEmail}.`
      : delivery?.state === "needs_help"
        ? `Your gift is ready, but its email didn't send. Download it below to share it yourself, or contact ${site.name} and we'll resend it.`
        : "Your gift is ready. Its email isn't confirmed yet: use “Check email delivery” below to check again.",
  };
}

// ---------------------------------------------------------------- printable PDF
async function publicFile(path: string) {
  return readFile(join(process.cwd(), "public", path));
}

/** A one-page keepsake built only from the issued card, plus a page of terms */
export async function giftPdf(g: IssuedGift): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  let font: PDFFont;
  let bold: PDFFont;
  try {
    const fk = await import("@pdf-lib/fontkit");
    const fontkit = (fk as unknown as { default?: typeof fk }).default ?? fk;
    doc.registerFontkit(fontkit);
    // Ligatures off: subsetting drew "fi" as a broken glyph
    const features = { liga: false, clig: false, dlig: false };
    font = await doc.embedFont(await publicFile("assets/fonts/vance-text.otf"), { features });
    bold = await doc.embedFont(await publicFile("assets/fonts/vance-regular.otf"), { features });
  } catch {
    font = await doc.embedFont(StandardFonts.Helvetica);
    bold = await doc.embedFont(StandardFonts.HelveticaBold);
  }
  const forest = rgb(17 / 255, 61 / 255, 51 / 255);
  const sage = rgb(74 / 255, 119 / 255, 109 / 255);
  const W = 612;
  let page = doc.addPage([W, 792]);
  page.drawRectangle({ x: 0, y: 0, width: W, height: 792, color: rgb(247 / 255, 244 / 255, 233 / 255) });
  page.drawRectangle({ x: 28, y: 28, width: W - 56, height: 736, color: rgb(1, 1, 1) });

  const centered = (text: string, y: number, size: number, f = font, color = forest) => {
    let s = size;
    while (s > 8 && f.widthOfTextAtSize(text, s) > W - 120) s -= 1;
    page.drawText(text, { x: (W - f.widthOfTextAtSize(text, s)) / 2, y, size: s, font: f, color });
  };
  const wrapped = (text: string, y: number, size: number, maxLines: number, color = forest) => {
    const words = text.replace(/\s+/g, " ").trim().split(" ");
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      const next = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(next, size) > W - 140 && line) {
        lines.push(line);
        line = w;
      } else line = next;
    }
    if (line) lines.push(line);
    for (const l of lines.slice(0, maxLines)) {
      centered(l, y, size, font, color);
      y -= size * 1.5;
    }
    return y;
  };

  try {
    const logo = await doc.embedPng(await publicFile("gift-cards/sway-logo-green.png"));
    const d = logo.scaleToFit(110, 40);
    page.drawImage(logo, { x: (W - d.width) / 2, y: 712, width: d.width, height: d.height });
  } catch {
    centered("SWAY", 720, 28, bold);
  }
  try {
    const file = artworkFile(g.printImage) || artworkFile(g.image);
    if (!file) throw Error();
    const art = await doc.embedJpg(await publicFile(`${ART_PATH.slice(1)}${file}`));
    const d = art.scaleToFit(250, 250);
    page.drawImage(art, { x: (W - d.width) / 2, y: 444, width: d.width, height: d.height });
  } catch {
    /* The number and value still print without the artwork */
  }
  centered(g.title, 404, 22, bold);
  centered(`$${g.value.toFixed(2)}`, 360, 34, bold, sage);
  centered(`To ${g.recipient}`, 326, 13);
  centered(`From ${g.sender}`, 308, 13);
  if (g.message) wrapped(`“${g.message}”`, 282, 11, 4);

  try {
    const mod = await import("bwip-js");
    const bwip = (mod as unknown as { default?: typeof mod }).default ?? mod;
    const png = await bwip.toBuffer({ bcid: "code128", text: g.barcode, scale: 3, height: 12, includetext: false });
    const bar = await doc.embedPng(png);
    const bw = Math.min(300, bar.width / 3);
    page.drawImage(bar, { x: (W - bw) / 2, y: 168, width: bw, height: 44 });
  } catch {
    /* The number below is enough to redeem */
  }
  centered(`Gift card number  ${formatCode(g.barcode)}`, 146, 13, bold);
  centered(`${g.spa} · ${g.address} · ${g.phone}`, 110, 10);
  centered("Use at any Sway or Spavia spa in the US. Ready 24 hours after purchase.", 92, 9, font, sage);

  page = doc.addPage([W, 792]);
  let y = 716;
  page.drawText("Gift card terms", { x: 60, y, size: 22, font: bold, color: forest });
  y -= 40;
  for (const para of [GIFT_ACTIVATION_NOTICE, ...g.terms.split("\n\n")]) {
    const words = para.replace(/\s+/g, " ").trim().split(" ");
    let line = "";
    for (const w of words) {
      const next = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(next, 11) > W - 120 && line) {
        page.drawText(line, { x: 60, y, size: 11, font, color: forest });
        y -= 16;
        line = w;
      } else line = next;
    }
    if (line) page.drawText(line, { x: 60, y, size: 11, font, color: forest });
    y -= 30;
  }
  doc.setTitle("Your Sway gift card");
  doc.setAuthor(g.spa);
  return doc.save();
}

