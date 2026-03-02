"use client";

import Image from "next/image";
import Link from "next/link";

export default function SunProtectionBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          The Ultimate Guide to Sun Protection & Post-Sun Skin Care
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Skincare</span>
          <span className="text-gray-500">June 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Protecting your skin from the sun is one of the most important steps
          you can take to maintain its health and appearance. Beyond sunburns,
          sun damage accelerates aging, causes discoloration, and breaks down
          skin elasticity. UV rays can leave your skin looking tired—even after
          a short time outdoors. The best defense? A daily SPF that suits your
          skin type, plus a nourishing post-sun routine.
        </p>

        <p>
          At Sway, we believe sun care is essential for radiant, healthy skin.
          That’s why we curated two esthetician-approved SPF options designed to
          protect, hydrate, and glow. Whether you’re spending a day at the beach
          or recovering from sun exposure, here’s your ultimate guide to
          protecting and restoring your skin.
        </p>

        <Image
          src="/assets/blog18.jpg"
          alt="Sun Protection Essentials"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#spf" className="hover:underline">Why is SPF Crucial?</a></li>
            <li><a href="#picks" className="hover:underline">Our Esthetician-Approved SPF Picks</a></li>
            <li><a href="#after-sun" className="hover:underline">After-Sun Skin Care</a></li>
            <li><a href="#daily" className="hover:underline">Why Sunscreen Is a Daily Must</a></li>
            <li><a href="#recap" className="hover:underline">Quick Recap for Healthy Skin</a></li>
          </ol>
        </nav>

        <h2 id="spf" className="text-2xl font-bold scroll-mt-24">Why is SPF Crucial?</h2>
        <p>
          Sunscreen shields against UVA/UVB rays that cause burns, premature
          aging, and skin cancer. The American Academy of Dermatology recommends
          a broad-spectrum SPF 30 or higher every day—rain or shine.
        </p>

        <h3 className="text-xl font-bold">Chemical vs. Mineral Sunscreen</h3>
        <p>
          Chemical sunscreens absorb UV rays and convert them to heat. They’re
          lightweight, invisible, and blend easily—great for daily wear.
          <br />
          Mineral sunscreens block UV rays on the skin’s surface using zinc
          oxide or titanium dioxide, making them ideal for sensitive skin.
          <br />
          Both are effective—it’s about personal preference.
        </p>

        <h2 id="picks" className="text-2xl font-bold scroll-mt-24">Our Esthetician-Approved SPF Picks</h2>

        <h3 className="text-xl font-bold">Supergoop Unseen Sunscreen SPF 50</h3>
        <p>
          Invisible, weightless, and packed with skincare benefits—this
          cult-favorite delivers all-day protection with no white cast.
        </p>
        <p className="italic">
          “Supergoop’s Unseen Sunscreen is my go-to. Lightweight, invisible, and
          no white cast—I use it every morning.”
        </p>

        <h3 className="text-xl font-bold">Eminence Organics Mineral SPF</h3>
        <p>
          Clean ingredients, tinted coverage, and broad-spectrum protection.
          Infused with botanicals for healthy, radiant skin.
        </p>
        <p className="italic">
          “Eminence’s mineral SPF is our top seller. It’s tinted for beautiful
          coverage.” — Jocelyn, Spa Director at Sway
        </p>

        <h2 id="after-sun" className="text-2xl font-bold scroll-mt-24">After-Sun Skin Care</h2>

        <h3 className="text-xl font-bold">1. Soothe and Hydrate</h3>
        <p>
          Calm post-sun skin with hydrating products like Eminence’s Facial
          Recovery Oil—loaded with antioxidants and botanicals.
        </p>

        <h3 className="text-xl font-bold">2. Treat Dark Spots & Photoaging</h3>
        <p>
          Vitamin C and retinoids help fade sun spots and repair damage. Always
          pair with SPF during the day to protect your progress.
        </p>

        <h3 className="text-xl font-bold">3. Gentle Exfoliation</h3>
        <p>
          Exfoliate 1-2 times a week with mild acids like lactic or mandelic to
          remove dead cells and enhance absorption of hydrating products.
        </p>

        <h3 className="text-xl font-bold">4. Stay Hydrated</h3>
        <p>
          Drink plenty of water and use hyaluronic acid serums to restore skin’s
          moisture and glow.
        </p>

        <h2 id="daily" className="text-2xl font-bold scroll-mt-24">Why Sunscreen Is a Daily Must</h2>
        <p>
          UV rays can damage your skin year-round—even on cloudy days. Daily
          sunscreen is your first defense against aging, dark spots, and skin
          cancer.
        </p>

        <h2 id="recap" className="text-2xl font-bold scroll-mt-24">Quick Recap for Healthy Skin:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Use SPF daily—mineral or chemical—based on your skin type.</li>
          <li>
            Hydrate, treat, and repair post-sun skin with nourishing products.
          </li>
          <li>Exfoliate gently to promote smoother, glowing skin.</li>
        </ul>

        <h2 className="text-2xl font-bold scroll-mt-24">Join the Sway Community</h2>
        <p>
          Great skin is a lifestyle. Visit the Sway Shop for curated sun care,
          or book a treatment with our estheticians to create a routine that
          works for you.
        </p>

        <div className="pt-4">
          <Link href="/book" className="underline text-[#113D33] font-semibold">
            Shop Sun Care or Book Your Treatment &rarr;
          </Link>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/post-summer-skin-recovery" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog23.jpg" alt="Post-Summer Skin Recovery" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Post-Summer Skin Recovery Starts Now</p></div>
            </Link>
            <Link href="/blog/summer-prep-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog15.jpg" alt="Summer Prep Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Summer Starts with Skin: Pre-Summer Prep Guide</p></div>
            </Link>
            <Link href="/blog/vitamin-c-facial" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog4.jpg" alt="Vitamin C Facial" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Brighten Your Skin with Vitamin C Facial</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/sun-protection-post-sun-care</p>
      </div>
    </div>
  );
}
