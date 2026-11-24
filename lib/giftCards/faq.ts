/**
 * The gift card questions shown on the gift card pages (John 11/24/2026, after the Spavia site's
 * gift-faq.ts): the things people ask right before buying, written so a person, Google and AI tools
 * all get the same plain answer. Every fact here is the checkout's own rule; change them together:
 *   dates and the 9 a.m. send        lib/giftCards/schedule.ts
 *   24-hour activation, where it works, no expiry   lib/giftCards/terms.ts
 *   message length, amount range      the checkout form, MAX_GIFT
 *   the holiday bonus                 lib/holidayBonus.ts (only listed while it is on)
 * Prices are the drop-in prices in the booking flows (11/24/2026). Safe to import in the browser.
 */
import library from "./artwork-library.json";
import { GIFT_SCHEDULE_DAYS } from "./schedule";
import { MAX_GIFT } from "./terms";
import { HOLIDAY_BONUS } from "@/lib/holidayBonus";

export type GiftFaqItem = { q: string; a: string };

/** "How much should I put on it?", per location */
const AMOUNT_GUIDE: Record<string, string> = {
  "denver-larimer": "At Sway Larimer, a 50-minute massage or facial starts at $139, a Remedy Room visit is $49, and Aescape robot massage sessions run $49 to $139.",
  "denver-rino": "At Sway RiNo, a 50-minute massage or facial starts at $139 and a Remedy Lounge visit is $49.",
  "denver-central-park": "At Sway Central Park, a Remedy Lounge visit is $49.",
};

export function giftFaqs(opts: { slug?: string; spaName?: string; holidayOn?: boolean } = {}): GiftFaqItem[] {
  const { slug, spaName, holidayOn } = opts;
  const items: GiftFaqItem[] = [];
  if (holidayOn)
    items.push({
      q: spaName ? `Is there a holiday gift card offer at ${spaName}?` : "Is there a holiday gift card offer at Sway?",
      a: `Yes. Through December 25, 2026, each single gift card of $${HOLIDAY_BONUS.minValue} or more purchased online comes with a free ${HOLIDAY_BONUS.treatment}${
        spaName ? ` at ${spaName}` : " at the Sway location you buy from (Larimer, RiNo or Central Park)"
      }, to use ${HOLIDAY_BONUS.windowLabel}. The gift card itself works at any Sway.`,
    });
  items.push(
    {
      q: "Can I schedule a Sway gift card to arrive on a certain day, like Christmas morning or a birthday?",
      a: `Yes. At checkout, choose "Pick a date" and select any day up to ${GIFT_SCHEDULE_DAYS} days ahead. The gift card email arrives at 9 a.m. Mountain time that day, and your receipt comes right away.`,
    },
    {
      q: "Is it too late to buy a gift card for the holidays?",
      a: "No. An online Sway gift card is emailed within minutes of purchase, even on Christmas Eve or Christmas Day, and you can print it to give in person. It can be used 24 hours after purchase.",
    },
    {
      q: "Can I send a Sway gift card to someone in another city or state?",
      a: "Yes. It is delivered by email, and it works at every Sway location and at Spavia Day Spa locations across the United States.",
    },
    {
      q: "Can I add a personal message or print the gift card?",
      a: `Yes. Add a message of up to 300 characters and choose from ${library.designs.length} designs. After purchase you get a private link to view, download or print the gift card.`,
    },
  );
  if (slug && AMOUNT_GUIDE[slug] && spaName)
    items.push({
      q: `How much should I put on a gift card for ${spaName}?`,
      a: `${AMOUNT_GUIDE[slug]} A gift card can be any amount from $1 to $${MAX_GIFT.toLocaleString("en-US")}, and whatever is left stays on the card.`,
    });
  items.push({
    q: "What can a Sway gift card be used for?",
    a: "Any Sway service: massage, facials, Remedy Room and Remedy Lounge recovery (sauna, cold plunge and more), Aescape robot massage, boosts and retail products.",
  });
  items.push({
    q: "Do Sway gift cards expire?",
    a: "No. Sway gift cards never expire and have no fees.",
  });
  return items;
}

/** schema.org FAQPage for a page whose visible questions are exactly `items` */
export const giftFaqJsonLd = (items: GiftFaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});
