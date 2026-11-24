import type { GiftFaqItem } from "@/lib/giftCards/faq";

/**
 * The gift card questions, on the page as real text (lib/giftCards/faq.ts). Every answer is in the
 * HTML whether or not its row is open, so search engines and AI tools read all of them.
 * Rows carry data-track so /ops/ shows which questions people open.
 */
export default function GiftFaq({ items, where, className = "" }: { items: GiftFaqItem[]; where: string; className?: string }) {
  return (
    <section className={`px-4 sm:px-6 ${className}`} aria-labelledby={`gift-faq-${where}`}>
      <div className="mx-auto max-w-3xl">
        <h2 id={`gift-faq-${where}`} className="text-center text-2xl font-bold md:text-3xl">
          Gift card questions
        </h2>
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(17,61,51,0.18)]">
          {items.map((item, i) => (
            <details key={item.q} className={`group px-5 py-4 sm:px-6 ${i ? "border-t border-[#113D33]/10" : ""}`}>
              <summary data-track={`gift-faq-${where}-${i + 1}`} className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-[#113D33] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="mt-1 shrink-0 text-xs text-[#4A776D] transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#113D33]/80 md:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
