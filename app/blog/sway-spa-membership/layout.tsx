"use client";

import Image from "next/image";
import Link from "next/link";

export default function SwaySpaMembershipBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">

      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Sway Spa Membership: Your 2025 Wellness Transformation
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Membership</span>
          <span className="text-gray-500">January 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          The start of a new year is the perfect time to commit to your well-being. 
          At Sway Wellness Spa, we're dedicated to helping you make 2025 your healthiest 
          and happiest year yet. Our unique, science-backed, and tech-forward approach 
          to wellness provides personalized experiences designed to restore your body 
          and refresh your mind. Let's make self-care your top priority this year!
        </p>

        <Image
          src="/assets/blog2.jpg"
          alt="Sway Membership"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-prioritize-wellness-in-2025" className="hover:underline">Why Prioritize Wellness in 2025?</a></li>
            <li><a href="#what-does-a-sway-membership-include" className="hover:underline">What Does a Sway Membership Include?</a></li>
            <li><a href="#how-a-sway-membership-helps-build-consistency" className="hover:underline">How a Sway Membership Helps Build Consistency</a></li>
            <li><a href="#benefits-beyond-the-spa" className="hover:underline">Benefits Beyond the Spa</a></li>
            <li><a href="#start-your-journey" className="hover:underline">Start Your Journey</a></li>
          </ol>
        </nav>

        <h2 id="why-prioritize-wellness-in-2025" className="text-2xl font-bold pt-4 scroll-mt-24">Why Prioritize Wellness in 2025?</h2>
        <p>
          In today's fast-paced world, it's easy to feel overwhelmed and depleted. 
          That's why prioritizing wellness is no longer a luxury – it's a necessity. 
          Committing to regular self-care can significantly reduce stress, improve your 
          physical health, and boost your overall happiness. A Sway Spa membership offers 
          a seamless way to integrate monthly wellness into your routine, helping you reap 
          these benefits consistently.
        </p>
        <p>
          As noted in recent research from Spavia Day Spa, consistent self-care through spa 
          memberships can lead to significant long-term health improvements, making it a 
          worthwhile investment in your overall well-being.
        </p>

        <h2 id="what-does-a-sway-membership-include" className="text-2xl font-bold pt-4 scroll-mt-24">What Does a Sway Membership Include?</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Preferred Pricing: One facial or massage per month for $99.</li>
          <li>Exclusive Member Lounge with tea & snacks.</li>
          <li>Bring a Friend: They get the same treatment for $99 (once/month).</li>
          <li>Family Share: Let family use your credits.</li>
          <li>10% off in the Sway Shop: Eminence, DedCool, Gray Malin & more.</li>
          <li>Access to member-only events & a supportive community.</li>
          <li>Rollover Benefits: Unused credits valid for a year.</li>
        </ul>

        <h2 id="how-a-sway-membership-helps-build-consistency" className="text-2xl font-bold pt-4 scroll-mt-24">How a Sway Membership Helps Build Consistency</h2>
        <p>
          Building new habits takes time and effort, but consistency is the key to success. 
          A Sway membership simplifies self-care by ensuring you have access to the wellness 
          treatments you need, precisely when you need them.
        </p>

        <h2 id="benefits-beyond-the-spa" className="text-2xl font-bold pt-4 scroll-mt-24">Benefits Beyond the Spa</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Increased Energy and Focus</li>
          <li>Better Quality Sleep</li>
          <li>Improved Skin Health</li>
          <li>Reduced Muscle Tension and Stress</li>
        </ul>
        <p>
          These benefits contribute to long-term health and happiness. A study published 
          in the <em>International Heart Journal</em> found that regular spa bathing 
          significantly improved cardiovascular markers, including blood pressure and 
          arterial flexibility.
        </p>

        <h2 id="start-your-journey" className="text-2xl font-bold pt-4 scroll-mt-24">Start Your Journey</h2>
        <p>
          Ready to make 2025 your healthiest year yet? Join the next wave of wellness at 
          Sway Wellness Spa and discover how small, consistent habits can lead to 
          transformative results.
        </p>

        <div className="pt-4">
          <Link
            href="/membership"
            className="inline-block px-6 py-3 bg-[#113D33] text-white rounded-full hover:bg-[#0f332a] transition font-semibold"
          >
            Join the Club!
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/may-memberships" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog17.jpg" alt="May Memberships at Sway Wellness Spa" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">May Memberships at Sway Wellness Spa</p></div>
            </Link>
            <Link href="/blog/give-wellness-get-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog19.jpg" alt="Give Wellness, Get Wellness: Referral Program" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Give Wellness, Get Wellness: Referral Program</p></div>
            </Link>
            <Link href="/blog/denver-wellness-club" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/homepage_photo_outside.jpg" alt="Denver's Most Anticipated Wellness Club" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Denver&apos;s Most Anticipated Wellness Club</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/sway-spa-membership</p>
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
                name: "What is included in a Sway Wellness Spa membership?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A Sway Wellness Spa membership includes one facial or massage per month for $99, access to an exclusive member lounge with tea and snacks, a Bring-a-Friend benefit where your guest gets the same $99 rate once per month, Family Share so loved ones can use your credits, 10% off in the Sway Shop on brands like Eminence and DedCool, access to member-only events, and rollover benefits so unused credits stay valid for a year.",
                },
              },
              {
                "@type": "Question",
                name: "How does a spa membership help with wellness consistency?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A spa membership builds consistency by scheduling regular monthly wellness treatments into your routine. Research shows that consistent self-care through regular spa visits can lead to significant long-term health improvements including reduced stress, better sleep, improved skin health, and decreased muscle tension. Sway Wellness Spa's membership model is designed to make ongoing wellness simple and affordable.",
                },
              },
              {
                "@type": "Question",
                name: "Can I share my Sway spa membership with friends or family?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Sway Wellness Spa memberships include sharing options. The Bring-a-Friend perk lets you bring a guest who receives the same treatment at the $99 member rate once per month. Additionally, the Family Share feature allows family members to use your membership credits. Unused credits roll over and remain valid for up to one year.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
