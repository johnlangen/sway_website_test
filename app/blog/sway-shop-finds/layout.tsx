"use client";

import Image from "next/image";
import Link from "next/link";

export default function SwayShopFindsBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          From the Spa to You: The Best Sway Shop Finds For Ultimate Wellness
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Retail</span>
          <span className="text-gray-500">June 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Looking to bring the spa experience home? The Sway Shop in Larimer
          Square offers a beautifully curated selection of products that blend
          luxury with practicality. Whether you're upgrading your skincare,
          shopping for the perfect gift, or just exploring wellness staples,
          this is your go-to destination for elevated self-care.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#what-youll-find" className="hover:underline">What You&apos;ll Find at the Sway Shop</a></li>
            <li><a href="#exclusive-member-perks" className="hover:underline">Exclusive Member Perks</a></li>
            <li><a href="#bring-wellness-everyday" className="hover:underline">Bring Wellness Into Your Everyday</a></li>
            <li><a href="#why-locals-love-it" className="hover:underline">Why Locals Love It</a></li>
            <li><a href="#visit-us-today" className="hover:underline">Visit Us Today</a></li>
          </ol>
        </nav>

        <h2 id="what-youll-find" className="text-2xl font-bold scroll-mt-24">What You&apos;ll Find at the Sway Shop</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Eminence Skincare:</strong> Natural, award-winning skincare
            like the Rosehip Triple C+E Firming Oil and Radiant Protection SPF
            Fluid.{" "}
            <Link
              href="https://eminenceorganics.com/us/blog/eminence-organics-award-wins"
              target="_blank"
              className="underline text-[#113D33] font-semibold"
            >
              Learn more
            </Link>
            .
          </li>
          <li>
            <strong>Dr. Dennis Gross Treatments:</strong> Dermatologist-developed
            skincare for spa-grade results at home.
          </li>
          <li>
            <strong>DedCool Fragrances:</strong> Clean, non-toxic perfumes that
            blend sophistication with sustainability.
          </li>
          <li>
            <strong>Assouline Coffee Table Books:</strong> Luxurious statement
            pieces that elevate any space.
          </li>
        </ul>

        <h2 id="exclusive-member-perks" className="text-2xl font-bold scroll-mt-24">Exclusive Member Perks</h2>
        <p>
          Members receive 10% off all retail (excluding Assouline, Gray Malin,
          and food/beverage items) and enjoy gift-with-purchase perks on
          Eminence throughout March and April. These perks make it easier to try
          new favorites and elevate your skincare game.
        </p>

        <p className="italic">
          “I always leave Sway with a new skincare obsession—whether it’s an
          Eminence serum or a Dr. Dennis Gross peel, they have the best
          selection!” – Sway Member
        </p>

        <h2 id="bring-wellness-everyday" className="text-2xl font-bold scroll-mt-24">Bring Wellness Into Your Everyday</h2>
        <p>
          Start your day with a clean, invigorating DedCool scent. Rehydrate and
          firm your skin with Eminence Bamboo Firming Fluid. Then unwind with a
          stunning Assouline book and soak in the beauty of your space. The Sway
          Shop helps turn everyday moments into meaningful rituals.
        </p>

        <h2 id="why-locals-love-it" className="text-2xl font-bold scroll-mt-24">Why Locals Love It</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Convenience:</strong> Just steps from your treatment in
            Larimer Square.
          </li>
          <li>
            <strong>Quality:</strong> Every item is hand-picked for performance,
            luxury, and sustainability.
          </li>
          <li>
            <strong>Community:</strong> A gathering place for wellness lovers to
            connect and explore new favorites.
          </li>
        </ul>

        <h2 id="visit-us-today" className="text-2xl font-bold scroll-mt-24">Visit Us Today</h2>
        <p>
          Whether you're looking to restock your skincare shelf or discover a
          luxurious new gift, the Sway Shop is ready to elevate your self-care
          routine. Stop by after your treatment or just come in to explore our
          latest favorites.
        </p>

        {/* Related Articles */}
        <div className="pt-10 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/mothers-day-gift-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog16.jpg" alt="Mother's Day Gift Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Mother&apos;s Day Gift Guide</p></div>
            </Link>
            <Link href="/blog/bridal-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog3.jpg" alt="Bridal Skincare" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Bridal Skincare</p></div>
            </Link>
            <Link href="/blog/summer-prep-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog15.jpg" alt="Summer Prep Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Summer Prep Guide</p></div>
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-400 pt-6">
          <Link href="/blog/sway-shop-finds" className="hover:underline">swaywellnessspa.com/blog/sway-shop-finds</Link>
        </div>
      </div>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What skincare brands does Sway Wellness Spa carry?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Sway Shop at Sway Wellness Spa in Larimer Square carries a curated selection of premium skincare and lifestyle brands. Skincare brands include Eminence Organics, known for natural and award-winning products like the Rosehip Triple C+E Firming Oil and Radiant Protection SPF Fluid, and Dr. Dennis Gross, offering dermatologist-developed treatments for spa-grade results at home. The shop also features DedCool clean fragrances and Assouline luxury coffee table books.",
                },
              },
              {
                "@type": "Question",
                name: "Do Sway Wellness Spa members get discounts on retail products?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Sway Wellness Spa members receive 10 percent off all retail products at the Sway Shop, excluding select items like Assouline books, Gray Malin prints, and food and beverage items. Members also enjoy seasonal gift-with-purchase perks on Eminence Organics products. These member benefits make it easy to maintain your skincare routine between professional treatments at a better value.",
                },
              },
              {
                "@type": "Question",
                name: "Where is the Sway Shop located and what can I find there?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Sway Shop is located inside Sway Wellness Spa in Larimer Square, Denver. It offers a hand-picked selection of luxury wellness products including Eminence Organics skincare, Dr. Dennis Gross professional-grade treatments, DedCool clean and non-toxic fragrances, and Assouline statement coffee table books. You can visit the shop after a spa treatment or stop by any time to explore the latest curated wellness and lifestyle products.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
