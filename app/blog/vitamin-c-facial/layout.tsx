"use client";

import Link from "next/link";
import Image from "next/image";

export default function VitaminCFacialBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Winter Skincare: Brighten Your Skin with Sway&apos;s Vitamin C Facial
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Skincare</span>
          <span className="text-gray-500">January 2025</span>
        </div>

        <p>
          Winter&apos;s harsh conditions can wreak havoc on your skin, leaving it
          dry, dull, and lacking its natural radiance. But there&apos;s a solution
          to combat the winter blues and rediscover your inner glow: Sway&apos;s
          featured Dr. Dennis Vitamin C Facial. This powerful treatment is designed
          to brighten, rejuvenate, and protect your skin, leaving you with a
          complexion that defies the season&apos;s harsh elements.
        </p>

        <Image
          src="/assets/blog4.jpg"
          alt="Vitamin C Facial"
          width={600}
          height={400}
          className="w-[600px] h-auto rounded-lg"
        />

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#c-the-radiance" className="hover:underline">&ldquo;C&rdquo; the Radiance: The Power of Vitamin C</a></li>
            <li><a href="#why-choose-dr-dennis-gross" className="hover:underline">Why Choose Dr. Dennis Gross Skincare at Sway?</a></li>
            <li><a href="#benefits-of-vitamin-c" className="hover:underline">The Benefits of Vitamin C for Your Skin</a></li>
            <li><a href="#what-to-expect" className="hover:underline">What to Expect During Your Dr. Dennis Vitamin C Facial at Sway</a></li>
            <li><a href="#why-winter" className="hover:underline">Why Winter is the Perfect Time for a Vitamin C Facial</a></li>
            <li><a href="#science-behind-vitamin-c" className="hover:underline">The Science Behind Vitamin C</a></li>
          </ol>
        </nav>

        <h2 id="c-the-radiance" className="text-2xl font-bold scroll-mt-24">&ldquo;C&rdquo; the Radiance: The Power of Vitamin C</h2>
        <p>
          Vitamin C isn&apos;t just a trendy ingredient – it&apos;s a skincare powerhouse 
          backed by scientific research. As a potent antioxidant, Vitamin C neutralizes 
          free radicals, those unstable molecules that damage skin cells and accelerate 
          aging. It&apos;s also a proven skin-brightening agent, effectively reducing 
          the appearance of dark spots and hyperpigmentation for a more even skin tone. 
          According to studies, like those cited by Ever/Body, Vitamin C facials are 
          highly effective in improving skin texture and radiance, making them a go-to 
          treatment for achieving a healthy glow.
        </p>

        <h2 id="why-choose-dr-dennis-gross" className="text-2xl font-bold scroll-mt-24">Why Choose Dr. Dennis Gross Skincare at Sway?</h2>
        <p>
          At Sway, we&apos;re committed to offering only the best, most effective treatments. 
          That&apos;s why we&apos;ve chosen to feature Dr. Dennis Gross Skincare for our 
          Spotlight Facial. Developed by a board-certified dermatologist, these 
          professional-grade products are formulated with potent active ingredients 
          and backed by rigorous scientific research.
        </p>
        <p>
          Dr. Dennis Gross Skincare is renowned for its innovative approach to skincare, 
          delivering visible, lasting results. This makes it the perfect choice for 
          our clients seeking a transformative experience.
        </p>

        <h2 id="benefits-of-vitamin-c" className="text-2xl font-bold scroll-mt-24">The Benefits of Vitamin C for Your Skin</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Brightens Skin:</strong> Reduces dark spots and reveals a radiant tone.</li>
          <li><strong>Boosts Collagen:</strong> Improves firmness and reduces wrinkles.</li>
          <li><strong>Protects Against Damage:</strong> Shields skin from UV and pollution-related aging.</li>
          <li><strong>Hydrates:</strong> Strengthens the skin barrier and locks in moisture.</li>
        </ul>

        <h2 id="what-to-expect" className="text-2xl font-bold scroll-mt-24">What to Expect During Your Dr. Dennis Vitamin C Facial at Sway</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Cleansing:</strong> Vitamin C and Alpha Beta Cleansing</li>
          <li><strong>Exfoliation:</strong> The Signature Alpha Beta® Professional Peel System</li>
          <li><strong>Hydration & Glow:</strong> Masks, serums, moisturizers, SPF and more tailored to your needs</li>
        </ul>

        <h2 id="why-winter" className="text-2xl font-bold scroll-mt-24">Why Winter is the Perfect Time for a Vitamin C Facial</h2>
        <p>
          The reduced sun exposure makes winter the safest time to address pigmentation 
          and lingering sun damage. Start the year with fresh, glowing skin and step into 
          spring with confidence.
        </p>

        <h2 id="science-behind-vitamin-c" className="text-2xl font-bold scroll-mt-24">The Science Behind Vitamin C</h2>
        <p>
          "Topical vitamin C has been shown to improve skin texture, reduce wrinkles, 
          and lighten hyperpigmentation. The efficacy and safety of topical vitamin C 
          for various skin conditions has been reviewed in available evidence." 
          <em>
            Topical Vitamin C and the Skin: Mechanisms of Action and Clinical Applications. 
            J Clin Aesthet Dermatol. 2017;10(7):14-17.
          </em>
        </p>

        <div className="pt-4">
          <Link
            href="/membership"
            className="text-[#113D33] font-semibold hover:underline"
          >
            Schedule Your Vitamin C Facial Today!
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/post-summer-skin-recovery" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog23.jpg" alt="Post-Summer Skin Recovery Starts Now" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Post-Summer Skin Recovery Starts Now</p></div>
            </Link>
            <Link href="/blog/allergy-season-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/allergy.jpg" alt="Allergy Season? Soothe Sensitive Skin" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Allergy Season? Soothe Sensitive Skin</p></div>
            </Link>
            <Link href="/blog/bridal-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog3.jpg" alt="Bridal Skincare: Wedding-Ready Skin" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Bridal Skincare: Wedding-Ready Skin</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/vitamin-c-facial</p>
      </div>
    </div>
  );
}
