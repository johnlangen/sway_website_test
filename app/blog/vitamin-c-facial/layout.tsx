"use client";

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

        <h2 className="text-2xl font-bold">"C" the Radiance: The Power of Vitamin C</h2>
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

        <h2 className="text-2xl font-bold">Why Choose Dr. Dennis Gross Skincare at Sway?</h2>
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

        <h2 className="text-2xl font-bold">The Benefits of Vitamin C for Your Skin</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Brightens Skin:</strong> Reduces dark spots and reveals a radiant tone.</li>
          <li><strong>Boosts Collagen:</strong> Improves firmness and reduces wrinkles.</li>
          <li><strong>Protects Against Damage:</strong> Shields skin from UV and pollution-related aging.</li>
          <li><strong>Hydrates:</strong> Strengthens the skin barrier and locks in moisture.</li>
        </ul>

        <h2 className="text-2xl font-bold">What to Expect During Your Dr. Dennis Vitamin C Facial at Sway</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Cleansing:</strong> Vitamin C and Alpha Beta Cleansing</li>
          <li><strong>Exfoliation:</strong> The Signature Alpha Beta® Professional Peel System</li>
          <li><strong>Hydration & Glow:</strong> Masks, serums, moisturizers, SPF and more tailored to your needs</li>
        </ul>

        <h2 className="text-2xl font-bold">Why Winter is the Perfect Time for a Vitamin C Facial</h2>
        <p>
          The reduced sun exposure makes winter the safest time to address pigmentation 
          and lingering sun damage. Start the year with fresh, glowing skin and step into 
          spring with confidence.
        </p>

        <h2 className="text-2xl font-bold">The Science Behind Vitamin C</h2>
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
          <a
            href="https://swaywellnessspa.com/membership"
            target="_blank"
            className="underline text-blue-600"
            rel="noopener noreferrer"
          >
            Schedule Your Vitamin C Facial Today!
          </a>
        </div>
      </div>
    </div>
  );
}
