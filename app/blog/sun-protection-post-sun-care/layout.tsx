"use client";

import Image from "next/image";

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
          src="/assets/blog18.png"
          alt="Sun Protection Essentials"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 className="text-2xl font-bold">Why is SPF Crucial?</h2>
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

        <h2 className="text-2xl font-bold">Our Esthetician-Approved SPF Picks</h2>

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

        <h2 className="text-2xl font-bold">After-Sun Skin Care</h2>

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

        <h2 className="text-2xl font-bold">Why Sunscreen Is a Daily Must</h2>
        <p>
          UV rays can damage your skin year-round—even on cloudy days. Daily
          sunscreen is your first defense against aging, dark spots, and skin
          cancer.
        </p>

        <h2 className="text-2xl font-bold">Quick Recap for Healthy Skin:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Use SPF daily—mineral or chemical—based on your skin type.</li>
          <li>
            Hydrate, treat, and repair post-sun skin with nourishing products.
          </li>
          <li>Exfoliate gently to promote smoother, glowing skin.</li>
        </ul>

        <h2 className="text-2xl font-bold">Join the Sway Community</h2>
        <p>
          Great skin is a lifestyle. Visit the Sway Shop for curated sun care,
          or book a treatment with our estheticians to create a routine that
          works for you.
        </p>

        <div className="pt-4">
          <a href="/book" className="underline text-blue-600">
            Shop Sun Care or Book Your Treatment →
          </a>
        </div>
      </div>
    </div>
  );
}
