/**
 * The two gift card emails, in Sway's colors (the Spavia site's lib/email/gift-card.ts, 10/28):
 * the gift itself (to the recipient, now or 9 a.m. on the chosen date) and the buyer's receipt
 * (right away). Sent by delivery.ts through Resend. Mindbody sends neither: the sale goes to
 * Mindbody with no recipient, layout or receipt, so nothing arrives twice.
 *
 * Pure functions. No em dashes in copy.
 */
import { GIFT_CARD_TERMS } from "./catalog";

export type RenderedEmail = { subject: string; html: string; text: string };

export type GiftEmailInput = {
  spa: { name: string; address: string; phone: string; pageUrl: string; bookUrl: string; contactEmail: string };
  title: string;
  recipientName: string;
  senderName: string;
  message: string;
  value: number;
  code: string;
  /** Absolute artwork address on the site */
  artworkUrl: string;
  /** The gift's private page: view, download, print */
  giftUrl: string;
  logoUrl: string;
};

export type GiftReceiptInput = GiftEmailInput & {
  recipientEmail: string;
  buyerName: string;
  amountPaid: number;
  cardLabel: string;
  saleId: number;
  purchasedOn: string;
  deliveryLabel: string;
  scheduled: boolean;
};

const FOREST = "#113D33";
const SAGE = "#4A776D";
const CREAM = "#F7F4E9";
const MUTED = "#3d6b60";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
export const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
/** 175746437675 → 1757 4643 7675 (easier to read out at the desk) */
export const formatCode = (code: string) => code.replace(/\s+/g, "").replace(/(.{4})(?=.)/g, "$1 ");

function shell(title: string, preheader: string, logoUrl: string, body: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};font-family:Helvetica,Arial,sans-serif;color:${FOREST};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td style="background:${FOREST};padding:26px 32px;text-align:center;">
<img src="${esc(logoUrl)}" width="120" alt="Sway" style="display:inline-block;width:120px;height:auto;">
</td></tr>
${body}
<tr><td style="padding:22px 32px 28px;border-top:1px solid #e5e0cf;font-size:12px;line-height:1.6;color:${MUTED};text-align:center;">
Sway Wellness &middot; <a href="https://swaywellnessspa.com/" style="color:${MUTED};">swaywellnessspa.com</a>
</td></tr>
</table>
<div style="max-width:560px;margin:0 auto;padding:20px 24px 0;font-size:11px;line-height:1.6;color:${MUTED};text-align:left;"><strong>Gift card terms</strong><br>${esc(GIFT_CARD_TERMS)}</div>
</td></tr>
</table>
</body>
</html>`;
}

const button = (href: string, label: string, dark = true) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${dark ? FOREST : "#D7E5DD"};color:${dark ? "#ffffff" : FOREST};text-decoration:none;font-size:14px;font-weight:bold;padding:15px 28px;border-radius:999px;">${esc(label)}</a>`;

/** The gift, to the recipient */
export function giftEmail(i: GiftEmailInput): RenderedEmail {
  const subject = `${i.senderName} sent you a ${money(i.value)} Sway gift card`;
  const code = formatCode(i.code);
  const body = `
<tr><td style="padding:32px 32px 0;text-align:center;">
<img src="${esc(i.artworkUrl)}" width="360" alt="Your gift card design" style="display:block;width:100%;max-width:360px;height:auto;margin:0 auto;border-radius:12px;">
</td></tr>
<tr><td style="padding:28px 32px 0;text-align:center;">
<div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${SAGE};">${esc(i.title)}</div>
<h1 style="margin:14px 0 0;font-size:26px;font-weight:bold;line-height:1.25;color:${FOREST};">${esc(i.recipientName)}, ${esc(i.senderName)} sent you a ${esc(money(i.value))} gift card</h1>
</td></tr>
${
  i.message
    ? `<tr><td style="padding:18px 44px 0;text-align:center;font-size:16px;line-height:1.6;font-style:italic;color:${FOREST};">&ldquo;${esc(i.message).replace(/\n/g, "<br>")}&rdquo;<div style="margin-top:8px;font-style:normal;font-size:13px;color:${MUTED};">From ${esc(i.senderName)}</div></td></tr>`
    : ""
}
<tr><td style="padding:26px 32px 0;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${CREAM};border-radius:12px;">
<tr><td style="padding:22px 24px;text-align:center;">
<div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${MUTED};">Gift card number</div>
<div style="margin-top:8px;font-size:26px;letter-spacing:3px;font-family:'Courier New',monospace;color:${FOREST};">${esc(code)}</div>
<div style="margin-top:8px;font-size:13px;color:${MUTED};">Value ${esc(money(i.value))} &middot; from ${esc(i.spa.name)}</div>
</td></tr>
</table>
</td></tr>
<tr><td style="padding:24px 32px 0;text-align:center;">${button(i.giftUrl, "View, download & print your gift")}</td></tr>
<tr><td style="padding:26px 32px 0;font-size:15px;line-height:1.65;color:${FOREST};">
<strong>How to use it</strong><br>
Book a massage, facial or recovery session online or by phone, then give this number at checkout. Your gift card works at any Sway or Spavia spa in the United States, never expires, and is ready to use 24 hours after purchase while the payment is verified.
</td></tr>
<tr><td style="padding:22px 32px 0;text-align:center;">${button(i.spa.bookUrl, "Book your visit", false)}</td></tr>
<tr><td style="padding:26px 32px 30px;font-size:14px;line-height:1.6;color:${FOREST};">
<strong>${esc(i.spa.name)}</strong><br>
${esc(i.spa.address)}<br>
<a href="tel:${i.spa.phone.replace(/\D/g, "")}" style="color:${FOREST};">${esc(i.spa.phone)}</a> &middot; <a href="${esc(i.spa.pageUrl)}" style="color:${SAGE};">Hours and details</a><br>
<span style="font-size:12px;color:${MUTED};">Keep this email: the number is your gift card. Treat it like cash.</span>
</td></tr>`;
  const text = [
    `${i.title}`,
    "",
    `${i.recipientName}, ${i.senderName} sent you a ${money(i.value)} Sway gift card.`,
    i.message ? `\n"${i.message}"\nFrom ${i.senderName}` : "",
    `\nGift card number: ${code}`,
    `Value: ${money(i.value)}, from ${i.spa.name}`,
    `\nView, download or print your gift: ${i.giftUrl}`,
    `\nHow to use it: book a massage, facial or recovery session online or by phone, then give this number at checkout. Your gift card works at any Sway or Spavia spa in the United States, never expires, and is ready to use 24 hours after purchase while the payment is verified.`,
    `\nBook: ${i.spa.bookUrl}`,
    `\n${i.spa.name}\n${i.spa.address}\n${i.spa.phone}\n${i.spa.pageUrl}`,
    `\nKeep this email: the number is your gift card. Treat it like cash.`,
    `\nGift card terms: ${GIFT_CARD_TERMS}`,
  ]
    .filter((x) => x !== "")
    .join("\n");
  return { subject, html: shell(subject, `${money(i.value)} from ${i.senderName}, for ${i.spa.name}`, i.logoUrl, body), text };
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:9px 0;border-bottom:1px solid #eee9da;font-size:13px;color:${MUTED};width:38%;vertical-align:top;">${esc(label)}</td><td style="padding:9px 0;border-bottom:1px solid #eee9da;font-size:14px;color:${FOREST};">${value}</td></tr>`;

/** The buyer's receipt, as soon as Mindbody confirms the sale */
export function receiptEmail(i: GiftReceiptInput): RenderedEmail {
  const subject = `Your Sway gift card for ${i.recipientName}`;
  const when = i.scheduled ? `We'll email it to ${i.recipientEmail} on ${i.deliveryLabel}.` : `We're emailing it to ${i.recipientEmail} now.`;
  const body = `
<tr><td style="padding:32px 32px 0;text-align:center;">
<img src="${esc(i.artworkUrl)}" width="200" alt="Your gift card design" style="display:block;width:100%;max-width:200px;height:auto;margin:0 auto;border-radius:10px;">
</td></tr>
<tr><td style="padding:24px 32px 0;text-align:center;">
<div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${SAGE};">Thank you</div>
<h1 style="margin:14px 0 0;font-size:24px;font-weight:bold;line-height:1.3;color:${FOREST};">Your gift for ${esc(i.recipientName)} is taken care of</h1>
<p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:${FOREST};">${esc(i.buyerName)}, you bought a ${esc(money(i.value))} gift card from ${esc(i.spa.name)}. ${esc(when)}</p>
</td></tr>
<tr><td style="padding:24px 32px 0;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
${row("Gift card", esc(`${money(i.value)} · ${i.title}`))}
${row("Charged", `${esc(money(i.amountPaid))} to ${esc(i.cardLabel)}`)}
${row("To", `${esc(i.recipientName)}<br><span style="color:${MUTED};">${esc(i.recipientEmail)}</span>`)}
${row("Delivery", esc(i.deliveryLabel))}
${row("From", `${esc(i.spa.name)}<br><span style="color:${MUTED};">${esc(i.spa.address)}</span>`)}
${row("Order", `#${i.saleId} &middot; ${esc(i.purchasedOn)}`)}
</table>
</td></tr>
<tr><td style="padding:24px 32px 0;text-align:center;">${button(i.giftUrl, "View, download or print the gift")}</td></tr>
<tr><td style="padding:22px 32px 30px;font-size:14px;line-height:1.6;color:${FOREST};">
Want to hand it over yourself? Print it from the link above. Need a change, or did it not arrive? Contact ${esc(i.spa.name)} at <a href="mailto:${esc(i.spa.contactEmail)}" style="color:${SAGE};">${esc(i.spa.contactEmail)}</a> or ${esc(i.spa.phone)}.
</td></tr>`;
  const text = [
    `Thank you, ${i.buyerName}. You bought a ${money(i.value)} gift card from ${i.spa.name} for ${i.recipientName}. ${when}`,
    `\nGift card: ${money(i.value)} · ${i.title}`,
    `Charged: ${money(i.amountPaid)} to ${i.cardLabel}`,
    `To: ${i.recipientName} <${i.recipientEmail}>`,
    `Delivery: ${i.deliveryLabel}`,
    `From: ${i.spa.name}, ${i.spa.address}`,
    `Order: #${i.saleId}, ${i.purchasedOn}`,
    `\nView, download or print the gift: ${i.giftUrl}`,
    `\nNeed a change, or did it not arrive? Contact ${i.spa.name} at ${i.spa.contactEmail} or ${i.spa.phone}.`,
    `\nGift card terms: ${GIFT_CARD_TERMS}`,
  ].join("\n");
  return { subject, html: shell(subject, `${money(i.value)} gift card for ${i.recipientName}. ${when}`, i.logoUrl, body), text };
}
