"use client";

import Link from "next/link";
import Image from "next/image";

export default function ValentinesDayWellnessBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">

      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Celebrate Valentine&apos;s Day Through Wellness
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Holiday</span>
          <span className="text-gray-500">February 2025</span>
        </div>

        <p>
          Valentine&apos;s Day is traditionally a time to celebrate love for others,
          but it&apos;s also the perfect opportunity to celebrate love for yourself.
          At Sway Wellness Spa, we&apos;re redefining this day of love as a chance
          to prioritize holistic health, meaningful connection, and essential self-care.
          Whether you&apos;re planning a romantic wellness date, a rejuvenating Galentine&apos;s
          Day celebration with friends, or treating yourself to some well-deserved
          relaxation, Sway Wellness Spa offers the ultimate experiences to make this
          Valentine&apos;s Day truly special and health-focused.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#romantic-wellness-date" className="hover:underline">Romantic Wellness Date</a></li>
            <li><a href="#galentines-spa-day" className="hover:underline">Galentine&apos;s Spa Day</a></li>
            <li><a href="#prioritize-self-love" className="hover:underline">Prioritize Self-Love</a></li>
            <li><a href="#healthy-valentines-tips" className="hover:underline">Healthy Valentine&apos;s Day Tips</a></li>
            <li><a href="#make-wellness-tradition" className="hover:underline">Make Wellness Your Valentine&apos;s Tradition</a></li>
          </ol>
        </nav>

        <h2 id="romantic-wellness-date" className="text-2xl font-bold scroll-mt-24">Romantic Wellness Date</h2>
        <p>
          Forget the usual Valentine&apos;s Day traditions of dinners, roses, wine, 
          and chocolates. This year, opt for a unique and memorable date centered 
          on shared health and relaxation. Begin your wellness journey together 
          with a Glow Getter Hydration Facial, expertly designed to combat dry 
          winter skin and restore radiance. Follow this with a deeply relaxing 
          Himalayan Salt Stone Massage, known for its ability to melt away stress 
          and tension. Conclude your date with time in our Remedy Room, featuring 
          therapies like traditional saunas, invigorating cold plunges, and LED 
          light therapy. These wellness-based dates foster connection and leave 
          you both feeling recharged.
        </p>

        <h2 id="galentines-spa-day" className="text-2xl font-bold scroll-mt-24">Galentine&apos;s Spa Day</h2>
        <p>
          This year, celebrate the cherished bonds of friendship with a Galentine&apos;s
          Day dedicated to wellness. Start your day on Larimer Street with coffee 
          at Huckleberry Roasters, then head to Sway for customized facials, 
          therapeutic massages, sessions with our innovative Aescape Robot, or 
          time in the Remedy Room. After your spa time, explore local boutiques 
          and end your day with brunch at Snooze, an A.M. Eatery. With pineapple 
          upside-down pancakes and unique Eggs Benedicts, it&apos;s the perfect 
          way to toast to friendship and shared experiences.
        </p>

        <h2 id="prioritize-self-love" className="text-2xl font-bold scroll-mt-24">Prioritize Self-Love</h2>
        <p>
          Valentine&apos;s Day should extend beyond couples &ndash; it&apos;s also a vital
          reminder to show love to yourself. Prioritizing your well-being is the 
          ultimate act of self-love. Through consistent care and intention, you 
          build a foundation to thrive and love others more fully. A Sway 
          membership offers monthly rituals designed to restore and rejuvenate.
        </p>

        <Image
          src="/assets/blog6.jpg"
          alt="Valentine's Day Wellness"
          width={600}
          height={400}
          className="w-[600px] h-auto rounded-lg"
        />

        <p>This Valentine&apos;s Day, choose one of our rejuvenating experiences:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Dr. Dennis Vitamin C Facial:</strong> Restore your glow and radiance.</li>
          <li><strong>80 Minute Deep Tissue Massage:</strong> Detoxify and release muscle tension.</li>
          <li><strong>Remedy Room Session:</strong> Cold plunge, sauna, Normatec compression boots, and LED light therapy for whole-body renewal.</li>
        </ul>

        <p>
          Loving yourself is not selfish – it&apos;s essential. Let our expert team 
          at Sway help you celebrate your most important relationship: the one with yourself.
        </p>

        <h2 id="healthy-valentines-tips" className="text-2xl font-bold scroll-mt-24">Healthy Valentine&apos;s Day Tips</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Cook a Healthy Meal Together:</strong> Focus on fresh vegetables, lean proteins, and whole grains.</li>
          <li><strong>Practice Mindful Connection:</strong> Reflect on gratitude and appreciation to deepen connection.</li>
          <li><strong>Get Moving:</strong> Try yoga, a nature hike, or dance session to boost energy and mood.</li>
        </ul>

        <h2 id="make-wellness-tradition" className="text-2xl font-bold scroll-mt-24">Make Wellness Your Valentine&apos;s Tradition</h2>
        <p>
          Whether you&apos;re spending Valentine&apos;s Day with a partner, friends, 
          or solo, Sway&apos;s curated treatments offer a meaningful way to celebrate. 
          Book your Valentine&apos;s wellness experience today and make 2025 the year 
          you truly fall in love with wellness.
        </p>

        <div className="pt-4">
          <Link
            href="/massages"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Schedule Your Valentine&apos;s Day Experience at Sway
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/mothers-day-gift-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog16.jpg" alt="Mother's Day Spa Day Gift Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Mother&apos;s Day Spa Day Gift Guide</p></div>
            </Link>
            <Link href="/blog/science-of-relaxation" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog11.jpg" alt="Science of Relaxation: Spa &amp; Stress" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Science of Relaxation: Spa &amp; Stress</p></div>
            </Link>
            <Link href="/blog/give-wellness-get-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog19.jpg" alt="Give Wellness, Get Wellness: Referral Program" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Give Wellness, Get Wellness: Referral Program</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/valentines-day-wellness</p>
      </div>
    </div>
  );
}
