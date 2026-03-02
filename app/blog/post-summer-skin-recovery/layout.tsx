"use client";

import Image from "next/image";
import Link from "next/link";

export default function PostSummerSkinRecoveryBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Repair &amp; Refresh: Post-Summer Skin Recovery Starts Now
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-[17px] leading-relaxed">
        {/* Back + Date + Tag */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Skincare</span>
          <span className="text-gray-500">September 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Summer was amazing—beach days, outdoor adventures, and endless
          sunshine. But now that fall is here, your skin might be telling a
          different story. After months of sun exposure, chlorine, sweat, and
          even saltwater, it’s time to focus on giving your skin the recovery it
          truly deserves.
        </p>

        <p>
          Sun exposure, while enjoyable in the moment, can leave lasting effects
          on your skin. According to the{" "}
          <a
            href="https://www.aad.org/public/everyday-care/sun-protection/sun-damage-skin"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            American Academy of Dermatology
          </a>
          , sun damage builds up over time, contributing to dryness, uneven
          texture, discoloration, and even premature aging. Chlorine and sweat
          can strip essential oils, leaving your skin dull and dehydrated. The
          good news? With the right care and treatments, you can restore your
          skin’s natural glow.
        </p>

        <p>
          At Sway Wellness Spa, we specialize in post-summer skin recovery with
          hydrating facials, LED therapy, oxygen boosts, and expert product
          recommendations. Whether you’re dealing with dryness, dark spots, or
          just want to refresh your glow, our estheticians help you reset and
          prepare for the cooler months ahead.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-recovery" className="hover:underline">Why Your Skin Needs Recovery</a></li>
            <li><a href="#treatments" className="hover:underline">Professional Treatments</a></li>
            <li><a href="#at-home" className="hover:underline">At-Home Care Essentials</a></li>
            <li><a href="#expert" className="hover:underline">Expert Insight</a></li>
            <li><a href="#book" className="hover:underline">Book Your Recovery</a></li>
          </ol>
        </nav>

        <h2 id="why-recovery" className="text-2xl font-bold scroll-mt-24">Why Your Skin Needs Recovery</h2>
        <p>
          Prolonged sun exposure breaks down collagen and elastin, while heat
          and humidity weaken your barrier. Even diligent sunscreen users
          accumulate microscopic damage. Common signs include dullness,
          dehydration, clogged pores, pigmentation, and fine lines.
        </p>

        <h2 id="treatments" className="text-2xl font-bold scroll-mt-24">Professional Treatments</h2>
        <h3 className="font-bold">Hydrating &amp; Exfoliating Facials</h3>
        <p>
          Clear away buildup, unclog pores, and replenish hydration. Each facial
          is customized to post-summer concerns for maximum results.
        </p>

        <h3 className="font-bold">LED Light Therapy</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Calms inflammation and redness</li>
          <li>Stimulates collagen for elasticity</li>
          <li>Accelerates cell turnover</li>
          <li>Reduces fine lines and wrinkles</li>
        </ul>

        <h3 className="font-bold">Glow Getter Facial</h3>
        <p>
          Our signature hydration-heavy treatment restores depleted moisture,
          improves texture, and revives radiance.
        </p>

        <h3 className="font-bold">Oxygen Infusion Boost</h3>
        <p>
          Pure oxygen and nutrients delivered deep into the skin for repair,
          faster healing, and youthful glow.
        </p>

        <h2 id="at-home" className="text-2xl font-bold scroll-mt-24">At-Home Care Essentials</h2>
        <p>
          Professional facials are just the start—daily care keeps results
          going. Our estheticians recommend barrier-repair cleansers, nourishing
          night creams, and SPF 30+ year-round.
        </p>

        <blockquote className="border-l-4 border-gray-300 pl-4 italic">
          “After a summer of hiking and sun, my skin was dry and tired. One Glow
          Getter facial brought it back to life.” – Kayla, Sway Guest
        </blockquote>

        <h2 id="expert" className="text-2xl font-bold scroll-mt-24">Expert Insight</h2>
        <p>
          “Our fall facials focus on detoxifying, rehydrating, and helping skin
          bounce back from UV exposure. Most guests see dramatic results in 4–6
          weeks with consistent care,” says Trisha, esthetician at Sway.
        </p>

        <h2 id="book" className="text-2xl font-bold scroll-mt-24">Book Your Recovery</h2>
        <p>
          Your skin worked hard all summer. Now it’s time to restore, repair,
          and rejuvenate with customized facials and boosts at Sway. Book today
          and start your glow-up for fall.
        </p>

        <div className="pt-4">
          <Link href="/facials" className="underline text-[#113D33] font-semibold">
            Book Your Post-Summer Skin Recovery &rarr;
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/vitamin-c-facial" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog4.jpg" alt="Vitamin C Facial" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Winter Skincare: Brighten with Vitamin C</p>
              </div>
            </Link>
            <Link href="/blog/allergy-season-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/allergy.jpg" alt="Allergy Season Skincare" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">Allergy Season? Soothe Sensitive Skin</p>
              </div>
            </Link>
            <Link href="/blog/sun-protection-post-sun-care" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden">
                <Image src="/assets/blog18.jpg" alt="Sun Protection Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm group-hover:text-[#113D33] transition">The Ultimate Guide to Sun Protection</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">
          Permalink: swaywellnessspa.com/blog/post-summer-skin-recovery
        </p>
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
                name: "How do I repair my skin after summer sun damage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To repair skin after summer sun damage, start with professional hydrating facials to replenish lost moisture and clear away buildup. LED light therapy stimulates collagen production and calms inflammation, while oxygen infusion treatments deliver nutrients deep into the skin for faster healing. At home, use barrier-repair cleansers, nourishing night creams, and SPF 30 or higher daily. Sway Wellness Spa offers customized post-summer recovery facials that address dryness, dark spots, and premature aging from sun exposure.",
                },
              },
              {
                "@type": "Question",
                name: "What are the signs of sun-damaged skin and when should I get a facial?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Signs of sun-damaged skin include persistent dullness, dehydration, clogged pores, uneven pigmentation, fine lines, and rough texture. Even if you used sunscreen consistently, microscopic UV damage accumulates over summer. Ideally, schedule a recovery facial in early fall to address these concerns before cooler, drier weather sets in. Most guests see significant improvement within 4 to 6 weeks of consistent professional treatment and at-home care.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best facial for dehydrated skin after summer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The best facial for dehydrated post-summer skin is a hydration-focused treatment that combines gentle exfoliation with intensive moisture replenishment. The Glow Getter Facial at Sway Wellness Spa is a signature hydration-heavy treatment that restores depleted moisture, improves skin texture, and revives radiance. Adding an oxygen infusion boost delivers pure oxygen and nutrients deep into the skin for accelerated repair and a youthful glow.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
