"use client";

import Image from "next/image";
import Link from "next/link";

export default function BridalSkincareBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Bridal Skincare: Get Wedding-Ready Skin with Sway Facials
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Bridal</span>
          <span className="text-gray-500">Updated June 2026 · By Sway Wellness Team</span>
        </div>

        <p>
          Your wedding day is a once-in-a-lifetime event, and feeling confident
          and radiant is paramount. At Sway Wellness Spa on Larimer Square in
          downtown Denver, we understand the importance of looking and feeling
          your best as you walk down the aisle. That is why our expert
          estheticians build tailored, results-driven{" "}
          <Link href="/facials" className="underline text-[#113D33] font-semibold">facial plans</Link>{" "}
          designed to make your skin wedding-ready and boost your confidence for
          the big day.
        </p>

        <p>
          The single most important thing to know about bridal skincare is that
          glowing, photo-ready skin is built over months, not booked the week
          before. Below is the exact timeline our estheticians recommend, the
          treatments that do the heavy lifting, and how to bring your whole
          bridal party along for the ride.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-consistent-facials-are-essential-for-brides" className="hover:underline">Why Consistent Facials Are Essential for Brides</a></li>
            <li><a href="#bridal-skincare-timeline" className="hover:underline">Your Month-by-Month Bridal Skincare Timeline</a></li>
            <li><a href="#sways-facials-for-your-wedding-glow" className="hover:underline">Sway&apos;s Facials for Your Wedding Glow</a></li>
            <li><a href="#boost-your-results" className="hover:underline">Boost Your Results</a></li>
            <li><a href="#de-stress-before-the-big-day" className="hover:underline">De-Stress Before the Big Day</a></li>
            <li><a href="#bring-the-bridal-party" className="hover:underline">Bring the Whole Bridal Party</a></li>
            <li><a href="#membership-perks" className="hover:underline">Membership Perks</a></li>
            <li><a href="#day-of-tips" className="hover:underline">Day-Of Skincare Tips</a></li>
            <li><a href="#faqs-about-pre-wedding-skincare" className="hover:underline">FAQs About Pre-Wedding Skincare</a></li>
          </ol>
        </nav>

        <h2 id="why-consistent-facials-are-essential-for-brides" className="text-2xl font-bold scroll-mt-24">Why Consistent Facials Are Essential for Brides</h2>
        <p>
          The secret to glowing, photo-ready skin is not a last-minute fix. It
          is a journey. Starting a consistent skincare routine months in advance
          gives your skin ample time to renew, repair, and reach its full
          potential. Here is how regular facials transform your wedding prep:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Boost your glow.</strong> Vitamin C and hydration facials target dullness and uneven tone so your skin catches the light in photos.</li>
          <li><strong>Address specific concerns.</strong> A custom facial plan works on clarity, texture, and balance over time rather than masking issues for a day.</li>
          <li><strong>Build a baseline.</strong> Consistent treatments let your esthetician learn your skin and dial in exactly what it needs before the date.</li>
          <li><strong>Relax and de-stress.</strong> Wedding planning is intense. Treatments help calm both your skin and your nerves in the lead-up.</li>
        </ul>

        <Image
          src="/assets/blog3.jpg"
          alt="Bridal Skincare Facials at Sway Wellness Spa in Denver"
          width={700}
          height={400}
          className="rounded-lg"
        />

        <h2 id="bridal-skincare-timeline" className="text-2xl font-bold scroll-mt-24">Your Month-by-Month Bridal Skincare Timeline</h2>
        <p>
          The ideal time to begin facials is 6 to 12 months before your wedding.
          This window gives your skin time to adjust and reveal its best glow,
          while letting your esthetician tailor each treatment to your goals.
          Here is how to pace it:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>12 to 9 months out:</strong> Book your first facial and a skin consultation. This is the time to start any corrective work on texture, congestion, or tone, since these treatments need the longest runway.</li>
          <li><strong>6 months out:</strong> Settle into a monthly facial rhythm. A Sway{" "}
            <Link href="/membership" className="underline text-[#113D33] font-semibold">membership</Link>{" "}
            makes this consistency easy and affordable.</li>
          <li><strong>3 months out:</strong> Lock in the facials that gave you the best results and avoid trying anything brand new. Add gentle enhancements to amplify your glow.</li>
          <li><strong>1 month out:</strong> Keep treatments hydrating and calming. This is not the time for aggressive exfoliation or first-time products.</li>
          <li><strong>1 week out:</strong> Book one final hydrating, brightening facial. Skip anything that could cause redness or purging.</li>
          <li><strong>Morning of:</strong> Cleanse, hydrate, and protect. Trust the months of work you have already put in.</li>
        </ul>

        <h2 id="sways-facials-for-your-wedding-glow" className="text-2xl font-bold scroll-mt-24">Sway&apos;s Facials for Your Wedding Glow</h2>
        <p>
          Most of our{" "}
          <Link href="/facials" className="underline text-[#113D33] font-semibold">facial menu</Link>{" "}
          is powered by Eminence Organics, with each treatment customized to your
          skin. Popular bridal choices include:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Forever Young Facial:</strong> Supports collagen and elasticity for firmer, smoother-looking skin.</li>
          <li><strong>Glow Getter Facial:</strong> Deeply hydrates and revitalizes for a dewy, lit-from-within finish. A bride favorite.</li>
          <li><strong>Sensitive Silk Facial:</strong> Calms delicate, reactive skin and restores balance, ideal if your skin flares under stress.</li>
        </ul>
        <p>
          If brightening is your priority, our dedicated{" "}
          <Link href="/blog/vitamin-c-facial" className="underline text-[#113D33] font-semibold">Dr. Dennis Gross Vitamin C facial</Link>{" "}
          is a standalone treatment in our Premier and Ultimate tiers, formulated
          to target dullness and even out tone before the big day.
        </p>

        <h2 id="boost-your-results" className="text-2xl font-bold scroll-mt-24">Boost Your Results</h2>
        <p>
          Add-on{" "}
          <Link href="/treatments" className="underline text-[#113D33] font-semibold">Boosts</Link>{" "}
          take any facial further. Brides love LED light therapy to calm
          inflammation and support clarity, microcurrent for a lifted, sculpted
          look, and dermaflash exfoliation for makeup that sits flawlessly.
          Members save on every Boost, which is why so many brides join in the
          months before the wedding.
        </p>

        <h2 id="de-stress-before-the-big-day" className="text-2xl font-bold scroll-mt-24">De-Stress Before the Big Day</h2>
        <p>
          Stress shows up on your skin. Our{" "}
          <Link href="/remedy-tech" className="underline text-[#113D33] font-semibold">Remedy Room</Link>{" "}
          recovery circuit pairs a traditional sauna, cold plunge, compression
          therapy, and LED to lower tension, improve circulation, and leave you
          calm and clear-headed. It is a perfect reset the week of the wedding,
          and a great group activity for the bridal party.
        </p>

        <h2 id="bring-the-bridal-party" className="text-2xl font-bold scroll-mt-24">Bring the Whole Bridal Party</h2>
        <p>
          Turn skincare prep into a celebration. Sway hosts{" "}
          <Link href="/group-events" className="underline text-[#113D33] font-semibold">group events and spa parties</Link>{" "}
          for bridal crews, with facials, massages, and the Remedy Room, then
          you are steps from Larimer Square&apos;s best restaurants and bars. For
          the full playbook, read our{" "}
          <Link href="/blog/bachelorette-spa-day" className="underline text-[#113D33] font-semibold">bachelorette spa day guide</Link>.
        </p>

        <h2 id="membership-perks" className="text-2xl font-bold scroll-mt-24">Membership Perks</h2>
        <p>
          A Sway{" "}
          <Link href="/membership" className="underline text-[#113D33] font-semibold">membership</Link>{" "}
          is the most cost-effective way to commit to a months-long bridal
          routine. Members enjoy preferred pricing on treatments plus discounted
          Boosts like LED light therapy, microcurrent, and dermaflash for
          enhanced results. It is the easiest way to make consistency, the real
          secret to bridal glow, actually happen.
        </p>

        <h2 id="day-of-tips" className="text-2xl font-bold scroll-mt-24">Day-Of Skincare Tips</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Keep your morning routine simple: cleanse, hydrate, and apply SPF.</li>
          <li>Avoid any new product or treatment you have not used before.</li>
          <li>Hydrate from the inside out and get a good night of sleep beforehand.</li>
          <li>If you book a treatment, arrive 15 minutes early so you are relaxed, not rushed.</li>
        </ul>

        <h2 id="faqs-about-pre-wedding-skincare" className="text-2xl font-bold scroll-mt-24">FAQs About Pre-Wedding Skincare</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>How often should I get facials?</strong> Monthly, starting 6 to 12 months before your wedding.</li>
          <li><strong>Which facial gives the best glow?</strong> The Glow Getter Facial is a bride favorite for hydration and a dewy finish.</li>
          <li><strong>When should I stop trying new treatments?</strong> Avoid anything new within the final month to prevent unexpected reactions.</li>
        </ul>

        <p className="italic text-gray-700">
          &ldquo;Consistent facials helped me feel so confident on my wedding day.
          I could not stop smiling in photos.&rdquo; · Emily, Sway Bride
        </p>

        <p>
          At Sway, we are more than a spa. We are your skincare partner for this
          milestone moment. Our expert estheticians will help you achieve
          radiant, wedding-ready skin that leaves you glowing down the aisle.
        </p>

        <div className="pt-4">
          <Link
            href="/membership"
            className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
          >
            Schedule Your Wedding Skincare Today
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/bachelorette-spa-day" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog14.jpg" alt="The Ultimate Bachelorette Spa Day" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">The Ultimate Bachelorette Spa Day</p></div>
            </Link>
            <Link href="/blog/vitamin-c-facial" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog4.jpg" alt="Brighten Your Skin with Vitamin C Facial" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Brighten Your Skin with Vitamin C Facial</p></div>
            </Link>
            <Link href="/blog/summer-prep-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog15.jpg" alt="Summer Starts with Skin: Pre-Summer Prep" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Summer Starts with Skin: Pre-Summer Prep</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-600 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/bridal-skincare</p>
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
                name: "When should a bride start getting facials before her wedding?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Brides should ideally begin a consistent facial routine 6 to 12 months before their wedding day. This timeline gives the skin enough time to adjust, repair, and reach its full potential. Monthly treatments allow estheticians to tailor a skincare plan to your specific goals. Sway Wellness Spa offers a membership option that makes regular bridal facials affordable and convenient with treatments starting at $99 per month.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best facial for brides to get glowing skin?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The best facial for bridal glow depends on your skin type and concerns. At Sway Wellness Spa, popular bridal options include the Glow Getter Facial for deep hydration and a dewy complexion, the Forever Young Facial for boosting collagen and firmness, and the Sensitive Silk Facial for calming reactive skin. For brightening, the dedicated Dr. Dennis Gross Vitamin C facial targets dullness and uneven tone. Many brides also add enhancements like LED light therapy or microcurrent treatments to amplify results.",
                },
              },
              {
                "@type": "Question",
                name: "How often should brides get facials before their wedding?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Brides should aim for monthly facials starting 6 to 12 months before the wedding. This consistent schedule allows the skin to renew and repair between sessions, building toward a radiant, photo-ready complexion. Sway Wellness Spa members benefit from preferred pricing and can add discounted enhancements like dermaflash exfoliation or LED light therapy for enhanced bridal skincare results.",
                },
              },
              {
                "@type": "Question",
                name: "Should I try a new facial right before my wedding?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Avoid any brand new facial, product, or aggressive exfoliation within the final month before your wedding, since unfamiliar treatments can cause unexpected redness or purging. Stick to the hydrating and brightening facials that have already worked well for your skin, and keep the week-of treatment gentle and calming. This is exactly why starting your bridal skincare routine 6 to 12 months in advance matters.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
