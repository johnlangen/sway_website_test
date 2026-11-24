import Image from "next/image";
import Link from "next/link";
import GiftFaq from "@/app/components/gift/GiftFaq";
import HolidayBonusNotice from "@/app/components/gift/HolidayBonusNotice";
import type { GiftFaqItem } from "@/lib/giftCards/faq";

const ART = "/gift-cards/art/";
// Real designs from the checkout, each 480px wide and shown smaller
const CARDS = [
  { src: `${ART}emily-happy-holidays-pine-thumbnail-bab83d077f576442.jpg`, alt: "Sway gift card design with snowy pine branches that reads Happy Holidays", tilt: "-rotate-6 translate-x-6 translate-y-3" },
  { src: `${ART}emily-merry-christmas-storefront-thumbnail-642f66ec9b872be1.jpg`, alt: "Sway gift card design showing the Sway Larimer storefront dressed for Christmas", tilt: "z-10" },
  { src: `${ART}gift-of-wellness-thumbnail-ccea409c0bef4bc0.jpg`, alt: "Sway gift card design in forest green that reads The Gift of Wellness", tilt: "rotate-6 -translate-x-6 translate-y-3" },
];

// The purchase, as the five screens a buyer actually taps through
const STEPS = [
  { n: "01", title: "Pick an amount", text: "$100, $150, $200, $250, $300, or any amount from $1 to $2,000." },
  { n: "02", title: "Choose a design", text: "22 designs: holiday, birthday, thank you, love, and more." },
  { n: "03", title: "Make it personal", text: "Their name, yours, and a message of up to 300 characters." },
  { n: "04", title: "Send now or pick a date", text: "Right away, or 9 a.m. Mountain time on any day up to 29 days out." },
  { n: "05", title: "They book", text: "The card is ready 24 hours after purchase and never expires." },
];

// What each amount covers, at drop-in prices (Larimer and RiNo, November 2026)
const AMOUNTS = [
  { amount: "$50", covers: "A Remedy Room or Remedy Lounge visit", detail: "Sauna, cold plunge and recovery. $49.", tone: "bg-[#EAF1EC] text-[#113D33]" },
  { amount: "$150", covers: "A 50-minute massage or facial", detail: "Treatments start at $139.", tone: "bg-[#C9DDD2] text-[#113D33]" },
  { amount: "$200", covers: "Any 50-minute massage or facial on the menu", detail: "Up to the $199 Ultimate tier.", tone: "bg-[#4A776D] text-white" },
  { amount: "$300", covers: "Two 50-minute treatments", detail: "One for them, one to share.", tone: "bg-[#113D33] text-white" },
];

export default function HowSwayGiftCardsWork({ faqs }: { faqs: GiftFaqItem[] }) {
  return (
    <div className="bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* Banner */}
      <div className="sway-article-banner flex w-full flex-col items-center justify-center gap-4 bg-[#113D33] px-4 pb-20 pt-32 text-white">
        <h1 className="max-w-4xl text-center text-3xl font-bold md:text-5xl">How Sway Gift Cards Work</h1>
        <p className="max-w-2xl text-center text-white/70">A quick guide before the holidays</p>
      </div>

      <div className="sway-article-body mx-auto max-w-4xl space-y-12 px-6 py-16 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="font-semibold text-[#113D33] hover:underline">
            &larr; Back to Blog
          </Link>
          <span className="rounded-full bg-[#113D33] px-3 py-1 text-xs font-semibold tracking-wide text-white">Gifting</span>
          <span className="text-[#113D33]/70">November 2026 · By Sway Wellness Team</span>
        </div>

        {/* Three real designs, fanned like cards in a hand */}
        <div className="flex justify-center pt-2" aria-label="Three Sway gift card designs">
          {CARDS.map((c) => (
            <Image
              key={c.src}
              src={c.src}
              alt={c.alt}
              width={480}
              height={480}
              sizes="(min-width: 768px) 220px, 30vw"
              className={`relative w-[30vw] max-w-[220px] rounded-2xl shadow-[0_18px_40px_-18px_rgba(17,61,51,0.6)] ring-4 ring-white ${c.tilt}`}
              priority
            />
          ))}
        </div>

        <p>
          A Sway gift card is the gift that takes two minutes to send and nobody returns. Here is exactly how it works, how late you can leave it, and how much to put on
          it.
        </p>

        {/* The Short Version */}
        <div className="space-y-4 rounded-xl bg-[#113D33] p-8 text-white">
          <p className="text-xl font-bold">The Short Version</p>
          <ul className="space-y-3 text-[15px]">
            {[
              ["Any amount", "from $1 to $2,000."],
              ["Emailed in minutes", "or at 9 a.m. Mountain time on the day you choose, up to 29 days ahead."],
              ["Printable", "from a private link, if you would rather hand it over."],
              ["Ready to use", "24 hours after purchase. It never expires."],
              ["Good at every Sway", "and at Spavia Day Spa locations across the United States."],
            ].map(([lead, rest]) => (
              <li key={lead} className="flex gap-3">
                <span className="pt-0.5 text-[#9CB7A9]">&#9679;</span>
                <span>
                  <strong>{lead}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/gift-cards/" data-track="blog-gift-guide-short" className="inline-block rounded-full bg-[#F7F4E9] px-6 py-3 text-sm font-bold text-[#113D33] transition hover:bg-white">
            Give a gift card &rarr;
          </Link>
        </div>

        <HolidayBonusNotice where="blog-gift-guide" />

        {/* ============== The purchase, as a path ============== */}
        <section className="space-y-6">
          <h2 id="how-it-works" className="scroll-mt-24 text-2xl font-bold">
            Five Screens, About Two Minutes
          </h2>
          <ol className="relative space-y-0">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative flex gap-5 pb-7 last:pb-0">
                {/* the rail */}
                {i < STEPS.length - 1 && <span aria-hidden="true" className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] border-l-2 border-dotted border-[#4A776D]/50" />}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#113D33] text-xs font-bold text-white">{s.n}</span>
                <span>
                  <span className="block font-bold">{s.title}</span>
                  <span className="block text-[15px] text-[#113D33]/80">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="text-[15px] text-[#113D33]/80">
            You confirm your email with a 6-digit code, pay by card, and get a receipt right away. No account to remember, no password.
          </p>
        </section>

        {/* ============== Holiday timing, as a calendar rail ============== */}
        <section className="space-y-6">
          <h2 id="holiday-timing" className="scroll-mt-24 text-2xl font-bold">
            How Late Can You Leave It?
          </h2>
          <p>Later than you think. There are really only three dates to know.</p>
          <div className="relative">
            <div aria-hidden="true" className="absolute left-0 right-0 top-[22px] hidden h-0.5 bg-gradient-to-r from-[#9CB7A9] via-[#4A776D] to-[#113D33] md:block" />
            <ol className="grid gap-5 md:grid-cols-3">
              {[
                { date: "Nov 26", title: "First day to schedule Christmas morning", text: "Delivery dates open 29 days ahead. Buy on or after November 26 and set it to arrive at 9 a.m. on December 25.", tone: "bg-[#9CB7A9] text-[#113D33]" },
                { date: "Any day", title: "Send it now", text: "The gift email goes out within minutes of purchase. Your receipt has a link to print it, too.", tone: "bg-[#4A776D] text-white" },
                { date: "Dec 25", title: "Still not too late", text: "Buy it Christmas morning over coffee. It lands in their inbox before the wrapping paper is cleaned up.", tone: "bg-[#113D33] text-white" },
              ].map((d) => (
                <li key={d.date} className="relative">
                  <span className={`relative inline-flex h-11 items-center rounded-full px-4 text-sm font-bold ${d.tone}`}>{d.date}</span>
                  <span className="mt-3 block font-bold">{d.title}</span>
                  <span className="mt-1 block text-[15px] text-[#113D33]/80">{d.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="rounded-xl border border-[#113D33]/15 bg-white p-5 text-[15px]">
            <strong>One thing to plan around:</strong> a gift card can be used 24 hours after it is purchased, while the payment is verified. A card bought on Christmas Day
            is ready to book with on December 26.
          </p>
        </section>

        {/* ============== How much: a ladder that deepens with the amount ============== */}
        <section className="space-y-6">
          <h2 id="how-much" className="scroll-mt-24 text-2xl font-bold">
            How Much Should You Give?
          </h2>
          <p>Any amount works, and whatever they do not use stays on the card. As a guide, here is what each amount covers at Sway Larimer and Sway RiNo.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AMOUNTS.map((a) => (
              <div key={a.amount} className={`flex flex-col rounded-2xl p-5 ${a.tone}`}>
                <span className="text-3xl font-bold tracking-tight">{a.amount}</span>
                <span className="mt-3 font-semibold leading-snug">{a.covers}</span>
                <span className="mt-1 text-sm opacity-80">{a.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============== Where it works: one card, divided rows ============== */}
        <section className="space-y-6">
          <h2 id="where-it-works" className="scroll-mt-24 text-2xl font-bold">
            Where It Works
          </h2>
          <div className="divide-y divide-[#113D33]/10 overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)]">
            {[
              { name: "Sway Larimer", place: "Larimer Square, Denver", what: "Massage, facials, the Remedy Room and Aescape robot massage.", href: "/locations/denver-larimer/gift-cards/" },
              { name: "Sway RiNo", place: "RiNo Art District, Denver", what: "The Remedy Lounge with infrared sauna and cold plunge, plus massage and facials.", href: "/locations/denver-rino/gift-cards/" },
              { name: "Sway Central Park", place: "Aurora", what: "The Remedy Lounge with infrared sauna, cold plunge and hot soak.", href: "/locations/denver-central-park/gift-cards/" },
            ].map((l) => (
              <Link key={l.name} href={l.href} data-track={`blog-gift-guide-${l.name.toLowerCase().replace(/\s+/g, "-")}`} className="group flex flex-col gap-1 px-5 py-4 transition hover:bg-[#F7F4E9] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="shrink-0">
                  <span className="font-bold">{l.name}</span> <span className="text-sm text-[#113D33]/70">· {l.place}</span>
                </span>
                <span className="text-[15px] text-[#113D33]/80 sm:text-right">
                  {l.what} <span className="whitespace-nowrap font-semibold underline underline-offset-4 group-hover:no-underline">Buy here</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="text-[15px] text-[#113D33]/80">
            A card bought at one Sway works at all of them, and at Spavia Day Spa locations across the United States. Handy when the person you are buying for lives
            somewhere else.
          </p>
        </section>
      </div>

      <GiftFaq where="blog" className="pb-16" items={faqs} />

      {/* Closing CTA */}
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-2xl bg-[#113D33] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">Two minutes, and the gift is handled.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">Pick a location, choose an amount and a design, and send it now or on the day.</p>
          <Link href="/gift-cards/" data-track="blog-gift-guide-bottom" className="mt-6 inline-block rounded-full bg-[#F7F4E9] px-8 py-3.5 font-bold text-[#113D33] transition hover:bg-white">
            Give a gift card &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
