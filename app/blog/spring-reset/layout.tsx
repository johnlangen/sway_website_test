"use client";

import Link from "next/link";

export default function SpringResetBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Spring Reset: Detox Your Skin & Body with Sway
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Spring is a season of renewal—a time when nature comes alive, and we
          feel inspired to refresh our routines. It's the perfect opportunity to
          give your body and skin the detox they deserve. At Sway Wellness Spa,
          we're here to help you hit your reset button with treatments designed
          to leave you feeling rejuvenated, detoxified, and glowing from the
          inside out.
        </p>

        <h2 className="text-2xl font-bold">Why a Spring Detox?</h2>
        <p>
          Winter can leave our bodies sluggish and our skin dull due to colder
          weather, heavier foods, and reduced hydration. Spring is a natural
          time to shift gears and focus on self-care. A detox is not about
          drastic measures—it’s about supporting your body and skin in feeling
          their absolute best.
        </p>

        <h2 className="text-2xl font-bold">Benefits of a Skin & Body Detox:</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Improved circulation and lymphatic drainage</li>
          <li>Boosted hydration and elasticity in your skin</li>
          <li>Reduced inflammation and congestion in pores</li>
          <li>Overall increased energy and glow</li>
        </ul>

        <h2 className="text-2xl font-bold">
          Sway Wellness Spa's Spring Reset Treatments
        </h2>

        <h3 className="text-xl font-semibold pt-4">
          1. The Remedy Room Experience
        </h3>
        <p>
          Consider this your ultimate full-body detox. The Remedy Room combines
          techniques to flush out toxins, reduce inflammation, and rejuvenate
          your skin.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Traditional Sauna to promote sweating and eliminate toxins</li>
          <li>Cold Plunge to boost circulation and reduce inflammation</li>
          <li>
            NormaTec Lymphatic Drainage Boots to help with recovery and
            detoxification
          </li>
          <li>LED Light Therapy for age reversal and skin rejuvenation</li>
        </ul>
        <p>
          <strong>Exclusive Offer:</strong> Get 50% off this experience for only
          $25 per visit—exclusive for members!
        </p>

        <h3 className="text-xl font-semibold pt-4">2. Salt Stone Massage</h3>
        <p>
          Our Salt Stone Massage uses warm Himalayan salt stones infused with 84
          minerals that replenish and restore balance to your body. This
          therapeutic experience soothes muscles, improves circulation, and
          leaves you feeling completely nourished.
        </p>

        <h3 className="text-xl font-semibold pt-4">3. Pore Perfection Facial</h3>
        <p>
          Banish the dull, lifeless skin of winter with the Pore Perfection
          Facial. This treatment uses Éminence Organics Skincare products to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Deep clean and detox congested pores</li>
          <li>Rebalance oil production</li>
          <li>Hydrate tired skin for a radiant glow</li>
        </ul>

        <h2 className="text-2xl font-bold">Exclusive Spring Member Perks</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>1 Monthly Massage or Facial for just $99</li>
          <li>50% off The Remedy Room Experience</li>
        </ul>
        <p>
          Not a member yet? Now's the perfect time to join and start enjoying
          these benefits!
        </p>

        <h2 className="text-2xl font-bold">How to Maximize Your Spring Reset</h2>
        <p>
          To complement your spa treatments, here are simple steps you can take
          at home:
        </p>

        <h3 className="text-xl font-semibold pt-2">1. Hydrate from the Inside Out</h3>
        <p>
          Swap sugary drinks for lemon water to help flush toxins and keep your
          skin glowing.
        </p>

        <h3 className="text-xl font-semibold pt-2">2. Nourish Your Body</h3>
        <p>
          Focus on alkaline-rich foods like kale, bananas, and watermelon.
          Healthy fats like avocado and walnuts support skin elasticity.
        </p>

        <h3 className="text-xl font-semibold pt-2">3. Get Moving</h3>
        <p>
          Movement increases blood flow and promotes natural detox. Choose yoga,
          walks, or workouts you enjoy.
        </p>

        <h3 className="text-xl font-semibold pt-2">4. Get Quality Sleep</h3>
        <p>
          Your body detoxes and repairs while you sleep—aim for 7–8 hours each
          night.
        </p>

        <h2 className="text-2xl font-bold">Start Your Spring Reset Today</h2>
        <p>
          Spring is the perfect time to invest in your wellness, and Sway is
          here to guide you every step of the way. Our treatments go beyond
          pampering to deliver real, visible results.
        </p>

        <div className="pt-4">
          <Link href="/remedy-tech" className="underline text-blue-600">
            Book Your Spring Detox Treatment at Sway
          </Link>
        </div>
      </div>
    </div>
  );
}
