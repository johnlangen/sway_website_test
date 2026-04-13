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
    canonical: "https://swaywellnessspa.com/blog/sway-membership-tiers/",
  },
  openGraph: {
    title: "Sway's New Membership Tiers: Essential, Premier & Ultimate",
    description:
      "Three tiers, one goal: consistent wellness. Monthly massage or facial starting at $99. 50% off boosts. Works at 60+ Spavia locations nationwide.",
    url: "https://swaywellnessspa.com/blog/sway-membership-tiers",
    siteName: "Sway Wellness Spa",
    images: [
      {
        url: "https://swaywellnessspa.com/assets/join2.jpg",
        width: 1200,
        height: 630,
        alt: "Sway Wellness Spa membership Denver",
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
    image: "https://swaywellnessspa.com/assets/join2.jpg",
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
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/assets/join2.jpg"
          alt="Sway Wellness Spa membership Denver Larimer Square"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#113D33]/60 via-[#113D33]/55 to-[#113D33]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase border border-white/20">
            Membership Update · April 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Introducing Sway&apos;s<br className="hidden md:block" /> New Membership Tiers
          </h1>
          <p className="text-white/85 mt-3 text-base md:text-lg max-w-xl">
            Essential · Premier · Ultimate
          </p>
        </div>
      </div>

      {/* Highlights strip */}
      <div className="bg-[#113D33]">
        <div className="max-w-4xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { stat: "From $99", label: "per month" },
            { stat: "50% Off", label: "all boosts" },
            { stat: "60+", label: "locations nationwide" },
            { stat: "Save $40", label: "every visit" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-white font-bold text-lg">{stat}</p>
              <p className="text-white/60 text-xs uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 text-[17px] leading-relaxed font-vance">

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; The Sway Edit</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Membership</span>
          <span className="text-gray-500">April 2026 · By Sway Wellness Team</span>
        </div>

        <p className="text-xl leading-relaxed font-medium text-[#113D33]">
          We simplified everything. Starting now, Sway Wellness Spa offers three distinct membership tiers — each designed to match a different level of commitment to your wellness routine. Whether you want the fundamentals done beautifully or you&apos;re ready for the most advanced treatments we offer, there&apos;s a tier for you.
        </p>

        <p className="text-gray-700">
          Every tier includes one monthly massage or facial, 50% off all boosts, and full access to the Sway Member Lounge. What changes is the depth, duration, and technology of your treatments — and the price.
        </p>

        {/* Table of Contents */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-2xl p-6">
          <p className="font-bold text-[#113D33] text-base mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-1.5 text-[#113D33] text-[15px]">
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
        <div id="why-tiers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4">Why Three Tiers?</h2>
          <p className="text-gray-700 mb-4">
            Spa memberships in Denver have traditionally worked one way: one price, one treatment, one option. That model works — but it doesn&apos;t account for the fact that a first-timer and a weekly wellness enthusiast have completely different needs.
          </p>
          <p className="text-gray-700">
            We designed these three tiers to grow with you. Start with Essential, move to Premier when you&apos;re ready for more, or go straight to Ultimate if you already know what you want. And if you ever want to try a higher tier on a one-time basis, you can — for a small per-visit upcharge.
          </p>
        </div>

        {/* Tier Quick Compare */}
        <div className="grid grid-cols-3 gap-3 not-prose">
          {[
            { name: "Essential", price: "$99", sub: "/mo", sessions: "50 min", count: "3 treatments", color: "bg-[#F0F4F0]", text: "text-[#113D33]" },
            { name: "Premier", price: "$129", sub: "/mo", sessions: "50–70 min", count: "12 treatments", color: "bg-[#113D33]", text: "text-white", badge: true },
            { name: "Ultimate", price: "$159", sub: "/mo", sessions: "40–90 min", count: "11 treatments + tech", color: "bg-[#0D2E24]", text: "text-white" },
          ].map(({ name, price, sub, sessions, count, color, text, badge }) => (
            <div key={name} className={`${color} ${text} rounded-2xl p-4 text-center`}>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <p className="font-bold text-sm md:text-base">{name}</p>
                {badge && <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold hidden md:inline">Popular</span>}
              </div>
              <p className="text-2xl md:text-3xl font-bold">{price}<span className="text-xs font-normal opacity-70">{sub}</span></p>
              <p className="text-xs opacity-60 mt-1">{sessions}</p>
              <p className="text-xs opacity-75 mt-0.5 font-medium">{count}</p>
            </div>
          ))}
        </div>

        {/* ─── ESSENTIAL ─── */}
        <div id="essential" className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#113D33]">Essential Membership</h2>
              <p className="text-gray-500 text-sm mt-0.5">50-minute treatments · 1 visit/month</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-[#113D33]">$99</span>
              <span className="text-gray-400 text-sm">/mo</span>
              <p className="text-gray-400 text-xs">$139 drop-in</p>
            </div>
          </div>
          <div className="px-6 py-6 space-y-5">
            <p className="text-gray-700">
              The Essential tier is the entry point to consistent, professional wellness in Denver. One monthly 50-minute treatment — your choice of massage or facial — for $99. No frills, no fuss. Just expert care, every month.
            </p>
            <p className="text-gray-700">
              The Essential Signature Massage is a classic therapeutic Swedish massage customized to your pressure preference. The Essential Signature Facial is tailored to your skin type: cleanse, exfoliate, extract, and hydrate. If you&apos;re pregnant, the Essential Maternity Massage provides safe, restorative care for expecting mothers.
            </p>
            <div className="grid md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <p className="font-semibold text-[#113D33] text-sm mb-3 uppercase tracking-wide">Facials</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9CB7A9] mt-0.5">✦</span>
                    <span>Essential Signature Facial <span className="text-gray-400">· 50 min</span></span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <p className="font-semibold text-[#113D33] text-sm mb-3 uppercase tracking-wide">Massages</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9CB7A9] mt-0.5">✦</span>
                    <span>Essential Signature Massage <span className="text-gray-400">· 50 min</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9CB7A9] mt-0.5">✦</span>
                    <span>Essential Maternity Massage <span className="text-gray-400">· 50 min</span></span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-[#F0F4F0] rounded-xl px-4 py-3 text-sm text-[#113D33] font-medium">
              💡 Save $40 every visit compared to drop-in pricing — that&apos;s $480 per year.
            </div>
          </div>
        </div>

        {/* ─── PREMIER ─── */}
        <div id="premier" className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm border-l-4 border-[#113D33]">
          <div className="bg-[#F0F4F0] px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-[#113D33]">Premier Membership</h2>
                <span className="bg-[#113D33] text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">Most Popular</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-[#113D33]">$129</span>
                <span className="text-gray-400 text-sm">/mo</span>
                <p className="text-gray-400 text-xs">$169 drop-in</p>
              </div>
            </div>
            <p className="text-gray-600 mt-1 text-sm">50–70 min treatments · 1 visit/month</p>
          </div>
          <div className="px-6 py-6 space-y-5">
            <p className="text-gray-700">
              Premier is our most popular Denver spa membership — and it&apos;s easy to see why. For $30 more per month than Essential, you unlock a dramatically wider menu: six distinct facials with targeted products and dermapore technology, plus six massage modalities including deep tissue, Himalayan salt stone, sports massage, and lymphatic drainage.
            </p>
            <p className="text-gray-700">
              Premier massages run 70 minutes on Signature and Maternity — or apply advanced techniques for targeted results on 50-minute options. Premier facials include targeted skincare matched to your specific concern — anti-aging, acne, hydration, sensitivity — plus dermapore technology for deeper product absorption.
            </p>
            <div className="grid md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <p className="font-semibold text-[#113D33] text-sm mb-3 uppercase tracking-wide">Facials</p>
                <p className="text-gray-400 text-xs mb-2">50 min · Glow Peel 30 min</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Premier Forever Young Anti-Aging Facial",
                    "Premier Pore Perfection Acne Facial",
                    "Premier Sensitive Silk Facial",
                    "Premier Glow Getter Hydration Facial",
                    "Premier Dr. Dennis Gross Vitamin C Facial",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-[#113D33] mt-0.5">✦</span>
                      <span>{t}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-[#113D33] mt-0.5">✦</span>
                    <span>Premier Basic Glow Peel <span className="text-gray-400">· 30 min</span></span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <p className="font-semibold text-[#113D33] text-sm mb-3 uppercase tracking-wide">Massages</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    ["Premier Signature Massage", "70 min"],
                    ["Premier Maternity Massage", "70 min"],
                    ["Premier Deep Tissue", "50 min"],
                    ["Premier Salt Stone Massage", "50 min"],
                    ["Premier Sports Massage", "50 min"],
                    ["Premier Lymphatic Drainage", "50 min"],
                  ].map(([name, dur]) => (
                    <li key={name} className="flex items-start gap-2">
                      <span className="text-[#113D33] mt-0.5">✦</span>
                      <span>{name} <span className="text-gray-400">· {dur}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#F0F4F0] rounded-xl px-4 py-3 text-sm text-[#113D33] font-medium">
              💡 12 treatment options across massage &amp; facial — the most versatile membership we offer.
            </div>
          </div>
        </div>

        {/* ─── ULTIMATE ─── */}
        <div id="ultimate" className="scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#113D33] px-6 py-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">Ultimate Membership</h2>
                <p className="text-white/60 mt-0.5 text-sm">40–90 min · Tech enhancements included</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-white">$159</span>
                <span className="text-white/60 text-sm">/mo</span>
                <p className="text-white/50 text-xs">$199 drop-in</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-6 space-y-5">
            <p className="text-gray-700">
              The Ultimate membership is Sway at its fullest. Every treatment includes the most advanced techniques and built-in technology enhancements that most spas charge as expensive add-ons. For facials, that means LED light therapy, microcurrent sculpting, oxygen infusion, and scalp and hand treatments — included in your base treatment.
            </p>
            <p className="text-gray-700">
              Ultimate massages are our longest sessions: the Signature clocks in at 90 minutes, while advanced technique modalities run 70 minutes. If you want the very best Sway has to offer, month after month, this is it.
            </p>
            <div className="grid md:grid-cols-2 gap-5 pt-2">
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <p className="font-semibold text-[#113D33] text-sm mb-3 uppercase tracking-wide">Facials</p>
                <p className="text-gray-400 text-xs mb-2">60 min · exceptions noted</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    ["Ultimate Illuminate LED Facial", "60 min"],
                    ["Ultimate Oxygen Infusion Facial", "60 min"],
                    ["Ultimate Sculpt & Lift Microcurrent Facial", "60 min"],
                    ["Ultimate Hydraderm", "50 min"],
                    ["Ultimate Dr. Dennis Gross Vitamin C with LED", "60 min"],
                    ["Ultimate Advanced Glow Peel", "40 min"],
                  ].map(([name, dur]) => (
                    <li key={name} className="flex items-start gap-2">
                      <span className="text-[#9CB7A9] mt-0.5">✦</span>
                      <span>{name} <span className="text-gray-400">· {dur}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F7F4E9] rounded-xl p-4">
                <p className="font-semibold text-[#113D33] text-sm mb-3 uppercase tracking-wide">Massages</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    ["Ultimate Signature Massage", "90 min"],
                    ["Ultimate Deep Tissue", "70 min"],
                    ["Ultimate Salt Stone Massage", "70 min"],
                    ["Ultimate Sports Massage", "70 min"],
                    ["Ultimate Lymphatic Drainage", "70 min"],
                  ].map(([name, dur]) => (
                    <li key={name} className="flex items-start gap-2">
                      <span className="text-[#9CB7A9] mt-0.5">✦</span>
                      <span>{name} <span className="text-gray-400">· {dur}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#F0F4F0] rounded-xl px-4 py-3 text-sm text-[#113D33] font-medium">
              💡 LED, microcurrent, and oxygen tech included — no upcharges, no surprises.
            </div>
          </div>
        </div>

        {/* ─── BOOSTS ─── */}
        <div id="boosts" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-2">Boosts: Every Member Saves 50%</h2>
          <p className="text-gray-700 mb-6">
            One of the most underrated parts of a Sway membership: 50% off every boost, every visit, on every tier. Boosts are science-backed enhancements you add to your treatment — and at half price, they become genuinely accessible.
          </p>

          {/* Boost icon grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { img: "/assets/boost-led.png", label: "LED Light" },
              { img: "/assets/boost-oxygen.png", label: "Oxygen Infusion" },
              { img: "/assets/boost-dermaflash.png", label: "Dermaflash" },
              { img: "/assets/boost-microcurrent.png", label: "Microcurrent" },
            ].map(({ img, label }) => (
              <div key={label} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm">
                <div className="relative w-14 h-14">
                  <Image src={img} alt={label} fill className="object-contain" />
                </div>
                <p className="text-xs font-semibold text-[#113D33]">{label}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">50% off</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-[#113D33] mb-4 flex items-center gap-2">
                <span className="bg-[#F0F4F0] rounded-lg px-2 py-0.5 text-xs uppercase tracking-wide">Facial</span>
                Boosts
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  ["LED Boost", "$10", "$20", "no added time"],
                  ["LED Boost Plus", "$20", "$40", "+10 min"],
                  ["Oxygen Boost", "$10", "$20", "no added time"],
                  ["Oxygen Boost Plus", "$20", "$40", "+10 min"],
                  ["Dermaflash Boost", "$10", "$20", "no added time"],
                  ["Dermaflash Boost Plus", "$20", "$40", "+10 min"],
                  ["Sculpt & Lift Microcurrent Pro", "$25", "$50", "+20 min"],
                ].map(([name, mem, drop, time]) => (
                  <li key={name} className="flex items-center justify-between gap-2">
                    <span className="font-medium">{name}</span>
                    <span className="text-right whitespace-nowrap">
                      <span className="text-[#113D33] font-semibold">{mem}</span>
                      <span className="text-gray-300 mx-1">·</span>
                      <span className="text-gray-400 line-through text-xs">{drop}</span>
                      <span className="text-gray-400 text-xs ml-1">{time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-[#113D33] mb-4 flex items-center gap-2">
                <span className="bg-[#F0F4F0] rounded-lg px-2 py-0.5 text-xs uppercase tracking-wide">Massage</span>
                Boosts
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  ["CauseMedic CBD Boost", "$10", "$20", "no added time"],
                  ["CauseMedic CBD Boost Plus", "$20", "$40", "+10 min"],
                  ["Cupping Boost", "$10", "$20", "no added time"],
                  ["Cupping Boost Plus", "$20", "$40", "+10 min"],
                  ["PEMF Recovery Boost", "$10", "$20", "no added time"],
                ].map(([name, mem, drop, time]) => (
                  <li key={name} className="flex items-center justify-between gap-2">
                    <span className="font-medium">{name}</span>
                    <span className="text-right whitespace-nowrap">
                      <span className="text-[#113D33] font-semibold">{mem}</span>
                      <span className="text-gray-300 mx-1">·</span>
                      <span className="text-gray-400 line-through text-xs">{drop}</span>
                      <span className="text-gray-400 text-xs ml-1">{time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── EXISTING MEMBERS ─── */}
        <div id="existing" className="scroll-mt-24 bg-[#FFF8E7] border border-amber-200 rounded-2xl px-6 py-5 flex gap-4">
          <span className="text-2xl mt-0.5">🎁</span>
          <div>
            <p className="font-bold text-[#113D33] mb-1">Note for Existing Members</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              If you joined Sway before April 1, 2026, you keep your current $99/month rate to access Premier-tier treatments for one full year. Your pricing will update on April 1, 2027. This is our way of rewarding the members who supported us from the beginning.
            </p>
          </div>
        </div>

        {/* ─── CROSS REGIONAL ─── */}
        <div id="cross-regional" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-4">Works at 60+ Sway & Spavia Locations Nationwide</h2>
          <div className="bg-[#113D33] rounded-2xl p-6 text-white space-y-4">
            <p className="text-white/90">
              Here&apos;s something genuinely new. Sway is part of the Spavia family — a network of 60+ wellness spas across the country. Your Sway membership now works at every Spavia location. If you&apos;re traveling for work or vacation, you can walk into a Spavia in Chicago, Atlanta, or anywhere in the network and access your member pricing automatically.
            </p>
            <p className="text-white/90">
              It works the other way too. Already have a Spavia membership from Park Meadows, Boulder, or another city? Your membership is recognized at Sway Larimer on Larimer Square, Denver. Just enter your email when booking and we&apos;ll pull up your tier instantly — no card, no login, no friction.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {["Denver", "Chicago", "Atlanta", "Dallas", "Boulder", "60+ More"].map((city) => (
                <div key={city} className="bg-white/10 rounded-xl py-2 px-3 text-center text-sm font-medium">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── WHICH TIER ─── */}
        <div id="which-tier" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6">Which Membership Tier Is Right for You?</h2>
          <div className="space-y-4">
            {[
              {
                emoji: "🌿",
                tier: "Choose Essential if...",
                desc: "You want to build a simple, consistent self-care habit. One monthly treatment, no decisions. A great massage or facial every month at $99 is a powerful thing.",
                price: "$99/mo",
                bg: "bg-white",
              },
              {
                emoji: "⭐",
                tier: "Choose Premier if...",
                desc: "You want more options, longer sessions, and targeted results. Premier is where most people land — it's the sweet spot between value and experience. Six facials, six massages, dermapore technology, and 70-minute sessions.",
                price: "$129/mo",
                bg: "bg-[#F0F4F0]",
                accent: true,
              },
              {
                emoji: "✨",
                tier: "Choose Ultimate if...",
                desc: "You want Sway at its best every single month. The longest sessions, the most advanced techniques, LED light therapy and microcurrent built in. No compromises.",
                price: "$159/mo",
                bg: "bg-white",
              },
            ].map(({ emoji, tier, desc, price, bg, accent }) => (
              <div key={tier} className={`${bg} rounded-2xl px-6 py-5 flex gap-4 ${accent ? "border-l-4 border-[#113D33] shadow-sm" : ""}`}>
                <span className="text-2xl mt-0.5">{emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-bold text-[#113D33] text-lg">{tier}</p>
                    <span className="text-sm font-semibold text-[#113D33] bg-[#F0F4F0] px-3 py-1 rounded-full">{price}</span>
                  </div>
                  <p className="text-gray-700 mt-1.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-5 text-sm">
            You can also try any higher tier&apos;s treatments on a one-time basis. Premier members can access Ultimate treatments for a $55 per-visit upcharge. Essential members can access Premier or Ultimate the same way — so even if you start small, the door is always open.
          </p>
        </div>

        {/* ─── CTA ─── */}
        <div className="relative overflow-hidden bg-[#113D33] text-white rounded-2xl p-8 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Sway Wellness Spa · Larimer Square</p>
          <p className="text-3xl font-bold">Join the Club</p>
          <p className="text-white/75 max-w-md mx-auto">
            Monthly massage or facial. 50% off boosts. Works at 60+ locations nationwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/locations/denver-larimer/membership/"
              className="inline-block bg-white text-[#113D33] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              View Membership Options →
            </Link>
            <Link
              href="/locations/denver-larimer/book/"
              className="inline-block border border-white/40 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Book a Treatment
            </Link>
          </div>
          <p className="text-white/40 text-xs pt-2">
            1428 Larimer St., Denver, CO 80202 · <a href="tel:3034766150" className="underline">(303) 476-6150</a>
          </p>
        </div>

      </div>
    </main>
  );
}
