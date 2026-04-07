import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sway's New Membership Tiers: Essential, Premier & Ultimate | Sway Wellness Spa Denver",
  description:
    "Sway Wellness Spa just launched three membership tiers — Essential ($99), Premier ($129), and Ultimate ($159) — with monthly massages, facials, 50% off boosts, and cross-regional access at 60+ Spavia locations nationwide.",
  keywords: [
    "Sway membership tiers",
    "Denver spa membership",
    "massage membership Denver",
    "facial membership Denver",
    "Essential Premier Ultimate spa membership",
    "Sway Wellness Spa membership",
    "Spavia membership Denver",
    "monthly massage Denver",
    "monthly facial Denver",
    "spa membership Larimer Square",
  ],
  alternates: {
    canonical: "https://swaywellnessspa.com/blog/sway-membership-tiers",
  },
  openGraph: {
    title: "Sway's New Membership Tiers: Essential, Premier & Ultimate",
    description:
      "Three tiers, one goal: consistent wellness. Monthly massage or facial starting at $99. 50% off boosts. Works at 60+ Spavia locations nationwide.",
    url: "https://swaywellnessspa.com/blog/sway-membership-tiers",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/homepage_photo6.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa treatment room Denver",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Sway's New Membership Tiers: Essential, Premier & Ultimate",
    description:
      "Sway Wellness Spa just launched three membership tiers — Essential ($99), Premier ($129), and Ultimate ($159) — with monthly massages, facials, 50% off boosts, and cross-regional access at 60+ Spavia locations nationwide.",
    image: "https://swaywellnessspa.com/assets/homepage_photo6.jpg",
    author: {
      "@type": "Organization",
      name: "Sway Wellness Team",
      url: "https://swaywellnessspa.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Sway Wellness Spa",
      logo: {
        "@type": "ImageObject",
        url: "https://swaywellnessspa.com/assets/swaylogo3.png",
      },
    },
    datePublished: "2026-04-07",
    dateModified: "2026-04-07",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://swaywellnessspa.com/blog/sway-membership-tiers",
    },
  };

  return (
    <main className="bg-[#F7F4E9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner */}
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
        <Image
          src="/assets/homepage_photo6.jpg"
          alt="Sway Wellness Spa treatment room Denver"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#113D33]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pt-20">
          <span className="bg-white/20 text-white text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-5 uppercase">Membership Update</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Introducing Sway&apos;s New Membership Tiers
          </h1>
          <p className="text-white/80 mt-4 text-lg max-w-xl">
            Essential · Premier · Ultimate — monthly massage or facial, 50% off boosts, works at 60+ locations nationwide.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10 text-[17px] leading-relaxed font-vance">

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; The Sway Edit</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Membership</span>
          <span className="text-gray-500">April 2026 · By Sway Wellness Team</span>
        </div>

        <p className="text-xl leading-relaxed font-medium text-[#113D33]">
          We simplified everything. Starting now, Sway Wellness Spa offers three distinct membership tiers — each designed to match a different level of commitment to your wellness routine. Whether you want the fundamentals done beautifully or you&apos;re ready for the most advanced treatments we offer, there&apos;s a tier for you.
        </p>

        <p>
          Every tier includes one monthly massage or facial, 50% off all boosts, and full access to the Sway Member Lounge. What changes is the depth, duration, and technology of your treatments — and the price.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-2xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#why-tiers" className="hover:underline">Why Three Tiers?</a></li>
            <li><a href="#essential" className="hover:underline">Essential — $99/mo · $139 drop-in</a></li>
            <li><a href="#premier" className="hover:underline">Premier — $129/mo · $169 drop-in</a></li>
            <li><a href="#ultimate" className="hover:underline">Ultimate — $159/mo · $199 drop-in</a></li>
            <li><a href="#boosts" className="hover:underline">Boosts: 50% Off for Every Member</a></li>
            <li><a href="#existing" className="hover:underline">Note for Existing Members</a></li>
            <li><a href="#cross-regional" className="hover:underline">Works at 60+ Sway & Spavia Locations</a></li>
            <li><a href="#which-tier" className="hover:underline">Which Tier Is Right for You?</a></li>
          </ol>
        </nav>

        {/* Why Tiers */}
        <h2 id="why-tiers" className="text-2xl font-bold pt-2 scroll-mt-24">Why Three Tiers?</h2>
        <p>
          Spa memberships in Denver have traditionally worked one way: one price, one treatment, one option. That model works — but it doesn&apos;t account for the fact that a first-timer and a weekly wellness enthusiast have completely different needs.
        </p>
        <p>
          We designed these three tiers to grow with you. Start with Essential, move to Premier when you&apos;re ready for more, or go straight to Ultimate if you already know what you want. You&apos;re not locked in — and you can always try a higher tier&apos;s treatments on a one-time per-visit upcharge.
        </p>

        {/* Essential */}
        <div id="essential" className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#F0F4F0] px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-2xl font-bold text-[#113D33]">Essential Membership</h2>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#113D33]">$99</span>
                <span className="text-gray-500 text-sm">/mo · $139 drop-in</span>
              </div>
            </div>
            <p className="text-gray-600 mt-1 text-sm">50-minute treatments · 1 visit/month · Save $40 every visit</p>
          </div>
          <div className="px-6 py-6 space-y-4">
            <p>
              The Essential tier is the entry point to consistent, professional wellness in Denver. One monthly 50-minute treatment — your choice of massage or facial — for $99. No frills, no fuss. Just expert care, every month.
            </p>
            <p>
              The Essential Signature Massage is a classic therapeutic Swedish massage customized to your pressure preference. The Essential Signature Facial is tailored to your skin type: cleanse, exfoliate, extract, and hydrate. If you&apos;re pregnant, the Essential Maternity Massage provides safe, restorative care for expecting mothers.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-[#113D33] mb-2">Facials</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>✦ Essential Signature Facial <span className="text-gray-400">· 50 min</span></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#113D33] mb-2">Massages</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>✦ Essential Signature Massage <span className="text-gray-400">· 50 min</span></li>
                  <li>✦ Essential Maternity Massage <span className="text-gray-400">· 50 min</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/assets/facial1.jpg"
          alt="Facial treatment at Sway Wellness Spa Denver"
          width={800}
          height={450}
          className="rounded-2xl w-full h-auto"
        />

        {/* Premier */}
        <div id="premier" className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm border-l-4 border-[#113D33]">
          <div className="bg-[#F0F4F0] px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#113D33]">Premier Membership</h2>
                <span className="bg-[#113D33] text-white text-xs px-2 py-0.5 rounded-full font-semibold">Most Popular</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#113D33]">$129</span>
                <span className="text-gray-500 text-sm">/mo · $169 drop-in</span>
              </div>
            </div>
            <p className="text-gray-600 mt-1 text-sm">50–70 min treatments · 1 visit/month · Save $40 every visit</p>
          </div>
          <div className="px-6 py-6 space-y-4">
            <p>
              Premier is our most popular Denver spa membership — and it&apos;s easy to see why. For $30 more per month than Essential, you unlock a dramatically wider menu: six distinct facials with targeted products and dermapore technology, plus six massage modalities including deep tissue, Himalayan salt stone, sports massage, and lymphatic drainage.
            </p>
            <p>
              Premier massages add 20 minutes of duration on our Signature and Maternity modalities (70 min), or apply advanced techniques for targeted results on our 50-minute options. Premier facials include targeted skincare products matched to your specific concern — anti-aging, acne, hydration, sensitivity — plus dermapore technology for deeper product absorption.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-[#113D33] mb-2">Facials <span className="text-gray-400 font-normal text-sm">· 50 min (Glow Peel 30 min)</span></p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>✦ Premier Forever Young Anti-Aging Facial</li>
                  <li>✦ Premier Pore Perfection Acne Facial</li>
                  <li>✦ Premier Sensitive Silk Facial</li>
                  <li>✦ Premier Glow Getter Hydration Facial</li>
                  <li>✦ Premier Dr. Dennis Gross Vitamin C Facial</li>
                  <li>✦ Premier Basic Glow Peel <span className="text-gray-400">· 30 min</span></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#113D33] mb-2">Massages</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>✦ Premier Signature Massage <span className="text-gray-400">· 70 min</span></li>
                  <li>✦ Premier Maternity Massage <span className="text-gray-400">· 70 min</span></li>
                  <li>✦ Premier Deep Tissue <span className="text-gray-400">· 50 min</span></li>
                  <li>✦ Premier Salt Stone Massage <span className="text-gray-400">· 50 min</span></li>
                  <li>✦ Premier Sports Massage <span className="text-gray-400">· 50 min</span></li>
                  <li>✦ Premier Lymphatic Drainage <span className="text-gray-400">· 50 min</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/assets/massage2.jpg"
          alt="Premier massage at Sway Wellness Spa Denver Larimer Square"
          width={800}
          height={450}
          className="rounded-2xl w-full h-auto"
        />

        {/* Ultimate */}
        <div id="ultimate" className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#113D33] px-6 py-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-2xl font-bold text-white">Ultimate Membership</h2>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">$159</span>
                <span className="text-white/70 text-sm">/mo · $199 drop-in</span>
              </div>
            </div>
            <p className="text-white/70 mt-1 text-sm">40–90 min treatments · 1 visit/month · Tech enhancements included</p>
          </div>
          <div className="px-6 py-6 space-y-4">
            <p>
              The Ultimate membership is Sway at its fullest. Every treatment includes the most advanced techniques and built-in technology enhancements that most spas charge as expensive add-ons. For facials, that means LED light therapy, microcurrent sculpting, oxygen infusion, and scalp and hand treatments — included in your base treatment.
            </p>
            <p>
              Ultimate massages are our longest sessions: the Signature clocks in at 90 minutes, while our advanced technique modalities (deep tissue, salt stone, sports, lymphatic drainage) run 70 minutes. If you want the very best experience Sway has to offer, month after month, this is it.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-[#113D33] mb-2">Facials <span className="text-gray-400 font-normal text-sm">· 60 min (exceptions noted)</span></p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>✦ Ultimate Illuminate LED Facial <span className="text-gray-400">· 60 min</span></li>
                  <li>✦ Ultimate Oxygen Infusion Facial <span className="text-gray-400">· 60 min</span></li>
                  <li>✦ Ultimate Sculpt & Lift Microcurrent Facial <span className="text-gray-400">· 60 min</span></li>
                  <li>✦ Ultimate Hydraderm <span className="text-gray-400">· 50 min</span></li>
                  <li>✦ Ultimate Dr. Dennis Gross Vitamin C with LED <span className="text-gray-400">· 60 min</span></li>
                  <li>✦ Ultimate Advanced Glow Peel <span className="text-gray-400">· 40 min</span></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#113D33] mb-2">Massages</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>✦ Ultimate Signature Massage <span className="text-gray-400">· 90 min</span></li>
                  <li>✦ Ultimate Deep Tissue <span className="text-gray-400">· 70 min</span></li>
                  <li>✦ Ultimate Salt Stone Massage <span className="text-gray-400">· 70 min</span></li>
                  <li>✦ Ultimate Sports Massage <span className="text-gray-400">· 70 min</span></li>
                  <li>✦ Ultimate Lymphatic Drainage <span className="text-gray-400">· 70 min</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Boosts */}
        <h2 id="boosts" className="text-2xl font-bold pt-2 scroll-mt-24">Boosts: Every Member Saves 50%</h2>
        <p>
          One of the most underrated parts of a Sway membership: 50% off every boost, every visit, on every tier. Boosts are science-backed enhancements you add to your treatment — and at half-price, they become genuinely accessible.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5">
            <p className="font-bold text-[#113D33] mb-3">Facial Boosts</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><span className="font-medium">LED Boost</span> — $10 member · $20 drop-in · no added time</li>
              <li><span className="font-medium">LED Boost Plus</span> — $20 member · $40 drop-in · +10 min</li>
              <li><span className="font-medium">Oxygen Boost</span> — $10 member · $20 drop-in · no added time</li>
              <li><span className="font-medium">Oxygen Boost Plus</span> — $20 member · $40 drop-in · +10 min</li>
              <li><span className="font-medium">Dermaflash Boost</span> — $10 member · $20 drop-in · no added time</li>
              <li><span className="font-medium">Dermaflash Boost Plus</span> — $20 member · $40 drop-in · +10 min</li>
              <li><span className="font-medium">Sculpt & Lift Microcurrent Pro</span> — $25 member · $50 drop-in · +20 min</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-5">
            <p className="font-bold text-[#113D33] mb-3">Massage Boosts</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><span className="font-medium">CauseMedic CBD Boost</span> — $10 member · $20 drop-in · no added time</li>
              <li><span className="font-medium">CauseMedic CBD Boost Plus</span> — $20 member · $40 drop-in · +10 min</li>
              <li><span className="font-medium">Cupping Boost</span> — $10 member · $20 drop-in · no added time</li>
              <li><span className="font-medium">Cupping Boost Plus</span> — $20 member · $40 drop-in · +10 min</li>
              <li><span className="font-medium">PEMF Recovery Boost</span> — $10 member · $20 drop-in · no added time</li>
            </ul>
          </div>
        </div>

        {/* Existing Members Note */}
        <div id="existing" className="scroll-mt-24 bg-[#FFF8E7] border border-yellow-200 rounded-2xl px-6 py-5">
          <p className="font-bold text-[#113D33] mb-2">Note for Existing Members</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            If you joined Sway before April 1, 2026, you keep your current $99/month rate to access Premier-tier treatments for one full year. Your pricing will update on April 1, 2027. This is our way of rewarding the members who supported us from the beginning.
          </p>
        </div>

        {/* Cross Regional */}
        <h2 id="cross-regional" className="text-2xl font-bold pt-2 scroll-mt-24">Works at 60+ Sway & Spavia Locations Nationwide</h2>
        <p>
          Here&apos;s something genuinely new. Sway is part of the Spavia family — a network of 60+ wellness spas across the country. Your Sway membership now works at every Spavia location. If you&apos;re traveling for work or vacation, you can walk into a Spavia in Chicago, Atlanta, or anywhere in the network and access your member pricing automatically.
        </p>
        <p>
          It works the other way too. Already have a Spavia membership from Park Meadows, Boulder, or another city? Your membership is recognized at Sway Larimer on Larimer Square, Denver. Just enter your email when booking and we&apos;ll pull up your tier instantly — no card, no login, no friction.
        </p>

        {/* Which Tier */}
        <h2 id="which-tier" className="text-2xl font-bold pt-2 scroll-mt-24">Which Membership Tier Is Right for You?</h2>
        <div className="bg-white rounded-2xl divide-y divide-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-5">
            <p className="font-bold text-[#113D33] text-lg">Choose Essential if...</p>
            <p className="text-gray-700 mt-1">You want to build a simple, consistent self-care habit. One monthly treatment, no decisions. A great massage or facial every month at $99 is a powerful thing.</p>
          </div>
          <div className="px-6 py-5">
            <p className="font-bold text-[#113D33] text-lg">Choose Premier if...</p>
            <p className="text-gray-700 mt-1">You want more options, longer sessions, and targeted results. Premier is where most people land — it&apos;s the sweet spot between value and experience. Six facials, six massages, dermapore technology, and 70-minute sessions.</p>
          </div>
          <div className="px-6 py-5">
            <p className="font-bold text-[#113D33] text-lg">Choose Ultimate if...</p>
            <p className="text-gray-700 mt-1">You want Sway at its best every single month. The longest sessions, the most advanced techniques, LED light therapy and microcurrent built in. No compromises.</p>
          </div>
        </div>

        <p>
          You can also try any higher tier&apos;s treatments on a one-time basis. Premier members can access Ultimate treatments for a small per-visit upcharge ($55). Essential members can access Premier or Ultimate treatments the same way. So even if you start at Essential, the door is always open.
        </p>

        {/* CTA */}
        <div className="relative overflow-hidden bg-[#113D33] text-white rounded-2xl p-8 text-center space-y-4">
          <p className="text-2xl font-bold">Join the Club</p>
          <p className="text-white/80 max-w-md mx-auto">
            Monthly massage or facial. 50% off boosts. Works at 60+ locations. Starting at $99/month.
          </p>
          <Link
            href="/locations/denver-larimer/membership/"
            className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition mt-2"
          >
            View Membership Options →
          </Link>
          <p className="text-white/50 text-xs pt-2">
            1428 Larimer St., Denver, CO 80202 · <a href="tel:3034766150" className="underline">(303) 476-6150</a>
          </p>
        </div>

      </div>
    </main>
  );
}
