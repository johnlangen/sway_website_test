"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------------------------------------------
   LOCATION CONFIG
--------------------------------------------- */

const loc = {
  slug: "denver-central-park",
  name: "Sway Central Park",
  street: "2271 Clinton St",
  city: "Aurora",
  state: "CO",
  zip: "80010",
  neighborhood: "Near Central Park, Denver",
  heroImage: "/assets/SWAY.jpg",
  mapUrl: "https://www.google.com/maps?q=2271+Clinton+St,+Aurora,+CO+80010",
  waitlistMailto:
    "mailto:contact@swaywellnessspa.com?subject=Sway%20Central%20Park%20Waitlist&body=Please%20add%20me%20to%20the%20waitlist%20for%20Sway%20Central%20Park.",
};

/* ---------------------------------------------
   TREATMENTS — Phase 1 (June launch) / Phase 2 (later 2026)
--------------------------------------------- */

const TREATMENTS = [
  {
    title: "Massage",
    tagline: "Deep Tissue, Sports, Salt Stone & more",
    description:
      "Expert therapists blend traditional techniques like deep tissue, cupping, and salt stone with recovery tools like infrared PEMF mats. 50–90 minutes, fully customized.",
    price: "From $139",
    memberPrice: "From $99",
    image: "/assets/massage3.jpg",
    learnHref: "/massages",
    phase: "June 2026",
  },
  {
    title: "Remedy Room",
    tagline: "An expanded recovery suite",
    description:
      "Traditional sauna, infrared sauna, cold plunge, compression therapy, red light therapy, and PEMF. More recovery square footage than any other Sway location.",
    price: "From $49",
    memberPrice: "From $25",
    image: "/assets/remedy-room.jpg",
    learnHref: "/remedy-tech",
    phase: "June 2026",
  },
  {
    title: "Facials",
    tagline: "Forever Young, Glow Getter & more",
    description:
      "Clean, organic Eminence Organics skincare paired with clinical-grade Dr. Dennis Gross protocols. Add LED, microcurrent, or oxygen infusion boosts.",
    price: "From $139",
    memberPrice: "From $99",
    image: "/assets/facialExperiences.jpg",
    learnHref: "/facials",
    phase: "Coming late 2026",
  },
  {
    title: "Aescape Robot Massage",
    tagline: "AI-powered precision recovery",
    description:
      "AI body mapping with dual robotic arms delivers personalized pressure and real-time muscle detection. 15, 30, 45, or 60 minute sessions.",
    price: "From $49",
    memberPrice: null,
    image: "/assets/aescapeblog6.jpg",
    learnHref: "/aescape",
    phase: "Coming late 2026",
  },
] as const;

/* ---------------------------------------------
   PAGE
--------------------------------------------- */

export default function SwayCentralParkPage() {
  useEffect(() => {
    localStorage.setItem(
      "sway_selected_location",
      JSON.stringify({
        slug: loc.slug,
        name: loc.name,
        city: loc.city,
        state: loc.state,
      })
    );
    document.cookie = `sway_loc=${loc.slug}; path=/; max-age=31536000`;
  }, []);

  return (
    <main className="bg-[#F7F4E9] text-[#113D33] font-vance">
      {/* ================================ HERO ================================ */}
      <section className="px-6 pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* LEFT */}
          <div>
            <div className="mb-3 text-xs tracking-wide uppercase opacity-70">
              Massage & Recovery — Central Park, Denver
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
              {loc.name}
            </h1>
            <p className="sr-only">
              Sway Central Park is a modern wellness club opening at 2271
              Clinton St., near Denver&apos;s Central Park neighborhood
              (Aurora, CO 80010). At launch in June 2026, Sway Central Park
              offers expert massage therapy and an expansive recovery suite
              including traditional sauna, infrared sauna, cold plunge,
              compression therapy, red light therapy, and PEMF. Advanced
              facials and AI-powered Aescape robot massage launch later in
              2026. Sway memberships start at $99/month, with a
              location-specific Sway Unlimited tier at $189/month for unlimited
              Remedy Room and recovery access. Existing Upswell Central Park
              members have their memberships honored under their current terms.
              Join the waitlist at contact@swaywellnessspa.com.
            </p>

            {/* Opening badge */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
              <span>Opening June 2026 · Now accepting waitlist signups</span>
            </div>

            <p className="mt-5 text-base leading-relaxed max-w-lg opacity-90">
              A modern wellness club serving Central Park, Stapleton, and
              northwest Aurora — expert massage paired with an expanded
              recovery suite of sauna, cold plunge, compression, and red light
              therapy. Facials and Aescape robot massage coming later this year.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={loc.waitlistMailto}
                className="bg-[#113D33] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#0c2a23] transition shadow-sm"
              >
                Join the Waitlist
              </a>

              <Link
                href="/membership"
                className="border-2 border-[#113D33] text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#113D33] hover:text-white transition"
              >
                Learn About Memberships
              </Link>
            </div>

            {/* ADDRESS */}
            <div className="mt-7 text-sm opacity-75 leading-relaxed">
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {loc.street}, {loc.city}, {loc.state} {loc.zip}
              </a>
              <span className="mx-2">·</span>
              <span>{loc.neighborhood}</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <Image
              src={loc.heroImage}
              alt="Sway Central Park wellness club near Denver's Central Park neighborhood"
              width={720}
              height={520}
              priority
              className="rounded-3xl shadow-lg w-full h-[300px] sm:h-[360px] md:h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========================= UPSWELL TRANSITION NOTICE ========================= */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-[#113D33] text-white p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60 mb-1.5">
                  Current Upswell Members
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Your membership is honored.
                </h2>
                <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl">
                  Sway is taking over the former Upswell Central Park and
                  bringing in massage, facials, and Aescape over the coming
                  months. Your existing membership stays at the same rate. We&apos;ll
                  reach out with details directly — no action needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= TREATMENTS ========================= */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            What&apos;s Coming
          </h2>
          <p className="opacity-75 max-w-xl mb-10 md:mb-14">
            Massage and recovery at launch in June 2026, with facials and
            Aescape robot massage joining later in the year.
          </p>

          <div className="space-y-8 md:space-y-10">
            {TREATMENTS.map((t, i) => (
              <div
                key={t.title}
                className={`group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center ${
                  i % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* IMAGE */}
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <Link href={t.learnHref}>
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={t.image}
                        alt={t.title}
                        width={640}
                        height={420}
                        className="w-full h-[240px] sm:h-[280px] md:h-[340px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Phase badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1.5 rounded-full">
                        {t.phase}
                      </div>
                      {/* Price badge */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#113D33] text-xs font-semibold px-3 py-1.5 rounded-full">
                        {t.price}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* TEXT */}
                <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                  <div className="text-xs uppercase tracking-wider opacity-50 mb-2">
                    {t.tagline}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
                    {t.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-4 max-w-md">
                    {t.description}
                  </p>

                  {/* Pricing line */}
                  <div className="flex items-baseline gap-3 mb-5 text-sm">
                    <span className="font-semibold">{t.price}</span>
                    {t.memberPrice && (
                      <>
                        <span className="opacity-40">|</span>
                        <span className="text-[#4A776D] font-semibold">
                          {t.memberPrice} for members
                        </span>
                      </>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={t.learnHref}
                      className="text-sm font-medium underline underline-offset-4 opacity-70 hover:opacity-100 transition"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== MEMBERSHIP TEASER ======================== */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-[#113D33] text-white overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              {/* IMAGE */}
              <div className="relative h-[240px] md:h-full md:min-h-[380px]">
                <Image
                  src="/assets/membership_background_logo.jpg"
                  alt="Sway Wellness Club membership"
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8 sm:p-10 md:p-12">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
                  Two Ways to Join
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  Choose your Sway.
                </h2>
                <ul className="space-y-3 text-sm text-white/80 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#9ABFB3]">✓</span>
                    <div>
                      <span className="font-semibold text-white">
                        Sway Membership · $99/mo
                      </span>{" "}
                      — Massages & facials at $99 across 3 tiers, 50% off
                      recovery and boosts
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#9ABFB3]">✓</span>
                    <div>
                      <span className="font-semibold text-white">
                        Sway Unlimited · $189/mo
                      </span>{" "}
                      — Unlimited Remedy Room and recovery sessions (Central
                      Park & RiNo only)
                    </div>
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/membership"
                    className="bg-white text-[#113D33] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                  >
                    View Memberships
                  </Link>
                  <a
                    href={loc.waitlistMailto}
                    className="text-sm font-medium underline underline-offset-4 text-white/70 hover:text-white transition"
                  >
                    Join the Waitlist
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= HOURS + LOCATION ========================= */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            Visit Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Hours */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Opening June 2026.
              </p>
              <p className="text-sm opacity-60 mt-2">
                Full hours announced closer to launch.
              </p>
            </div>

            {/* Location */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-3">
                {loc.street}
                <br />
                {loc.city}, {loc.state} {loc.zip}
              </p>
              <p className="text-sm opacity-60 mb-4">{loc.neighborhood}</p>
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4"
              >
                Get Directions
              </a>
            </div>

            {/* Contact */}
            <div className="border border-black/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Stay in the Loop</h3>
              <p className="text-sm opacity-80 mb-3">
                Be first to book when we open.
              </p>
              <div className="space-y-2">
                <a
                  href={loc.waitlistMailto}
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <svg
                    className="w-4 h-4 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Join the Waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FAQ =============================== */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "When does Sway Central Park open?",
              a: "Sway Central Park is opening in June 2026 at 2271 Clinton St. Massage and the Remedy Room recovery circuit are available at launch. Facials and Aescape robot massage will follow later in 2026.",
            },
            {
              q: "Where is Sway Central Park located?",
              a: "Sway Central Park is at 2271 Clinton Street in Aurora, CO 80010, right on the edge of Denver's Central Park neighborhood. It serves the Stapleton, Central Park, and northwest Aurora communities.",
            },
            {
              q: "What services will Sway Central Park offer at launch?",
              a: "Massage therapy and an expanded recovery suite — traditional sauna, infrared sauna, cold plunge, compression therapy, red light therapy, and PEMF. Advanced facials and AI-powered Aescape robot massage are coming later in 2026.",
            },
            {
              q: "I'm a current Upswell Central Park member — what happens to my membership?",
              a: "Your membership stays at your current rate. Sway is taking over the location, but existing Upswell memberships are honored. We'll reach out directly with all the details — no action is needed on your part.",
            },
            {
              q: "What memberships will be available at Sway Central Park?",
              a: "Two options: standard Sway Membership at $99/month (massages and facials at $99 each, 50% off recovery and boosts), or Sway Unlimited at $189/month (unlimited Remedy Room and recovery access — available only at Sway Central Park and Sway RiNo).",
            },
            {
              q: "How is Sway Central Park different from Sway Larimer?",
              a: "Sway Larimer is treatment-focused, with massage and facial rooms front and center. Sway Central Park is recovery-led — more sauna, cold plunge, and compression space — with massage rooms added in. Both offer the same Sway Membership, plus a Sway Unlimited tier exclusive to Central Park and RiNo.",
            },
            {
              q: "Will Sway Central Park offer yoga?",
              a: "No. Sway Central Park focuses on massage, facials, recovery, and Aescape robot massage. We're not continuing the yoga or Pilates classes Upswell offered.",
            },
            {
              q: "Can I gift Sway Central Park gift cards?",
              a: "Yes. Sway gift cards are redeemable at all Sway locations. Purchase at swaywellnessspa.com/gift-cards.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="border-b border-black/10 py-4 group"
            >
              <summary className="cursor-pointer font-medium flex items-center justify-between gap-4">
                <span>{item.q}</span>
                <svg
                  className="w-4 h-4 shrink-0 opacity-40 transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm opacity-80 leading-relaxed pr-8">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ========================== FINAL CTA ============================ */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#113D33] text-white p-10 sm:p-14 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Be among the first to feel Sway Central Park.
          </h3>
          <p className="text-white/75 max-w-lg mx-auto mb-7">
            Join the waitlist for opening day priority booking at our Central
            Park location.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={loc.waitlistMailto}
              className="bg-white text-[#113D33] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              Join the Waitlist
            </a>
            <Link
              href="/gift-cards"
              className="border-2 border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:border-white transition"
            >
              Gift Cards
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
