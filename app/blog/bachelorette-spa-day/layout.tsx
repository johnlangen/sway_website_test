"use client";

import Image from "next/image";
import Link from "next/link";

export default function BacheloretteSpaDayBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl">
          Bachelorette Spa Packages in Denver: A Group Day for Your Bridal Crew
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Bridal</span>
          <span className="text-gray-500">Updated June 2026 · By Sway Wellness Team</span>
        </div>

        {/* Hero image */}
        <div className="rounded-xl overflow-hidden border border-[#d7e2dc]">
          <Image
            src="/assets/facial.jpg"
            alt="Facial treatment at Sway Wellness Spa on Larimer Square in Denver"
            width={1920}
            height={1477}
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>

        <p>
          Planning a Denver bachelorette? Skip the usual itinerary and give your
          bridal crew something you will all actually talk about afterward. At
          Sway Wellness Spa on Larimer Square, you can build a private group spa
          package around massages, facials, sauna, and cold plunge, so everyone
          arrives relaxed, glowing, and ready to celebrate. Here is exactly how
          to plan it.
        </p>

        {/* TOC */}
        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#group-packages" className="hover:underline">Bachelorette Spa Packages for Your Group</a></li>
            <li><a href="#treatments" className="hover:underline">Treatments to Build Into Your Package</a></li>
            <li><a href="#wellness-add-ons" className="hover:underline">Wellness Add-Ons: Sauna & Cold Plunge</a></li>
            <li><a href="#why-sway" className="hover:underline">Why Brides Pick Sway in Denver</a></li>
            <li><a href="#how-to-plan" className="hover:underline">How to Plan Your Bachelorette Day</a></li>
            <li><a href="#faq" className="hover:underline">Bachelorette Spa Day FAQ</a></li>
          </ol>
        </nav>

        {/* Feature: Group packages */}
        <section id="group-packages" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Bachelorette Spa Packages for Your Group</h2>
          <p>
            The most popular way to celebrate is a group spa package: your whole
            party books treatments in the same window so you move through the day
            together. Each guest picks what they want, a massage, a facial, or
            both, and you spend the in-between time unwinding side by side rather
            than rushing between separate appointments.
          </p>
          <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
            <Image
              src="/assets/remedy-room2.jpg"
              alt="Relaxation and recovery space at Sway Wellness Spa in Denver"
              width={1200}
              height={600}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#113D33]">Group spa packages in Denver, built around your crew</h3>
              <p>
                Tell us your group size, your date, and the vibe you are after,
                and we will help you put together a bachelorette package that
                works for everyone, from the bride to the bridesmaid who just
                wants a deep-tissue massage. Larger groups book best with a
                little lead time, so reach out early.
              </p>
              <div className="bg-[#F7F4E9] rounded-lg p-4 text-[#113D33]">
                <p className="font-semibold">To plan your group package:</p>
                <p className="mt-1">
                  Call{" "}
                  <a href="tel:+13034766150" className="font-bold underline underline-offset-4 hover:text-[#0e322b]">(303) 476-6150</a>{" "}
                  or email <span className="font-bold">contact@swaywellnessspa.com</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Treatments grid */}
        <section id="treatments" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Treatments to Build Into Your Package</h2>
          <p>
            Every bachelorette party at Sway is customizable. Mix and match these
            so each guest gets exactly what they need to feel pampered and
            wedding-ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
              <Image src="/assets/facial3.jpg" alt="Radiant glowing skin after a facial at Sway" width={600} height={400} className="w-full h-52 object-cover" />
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-[#113D33]">Glow-Getting Facials</h3>
                <p className="text-[15px] text-gray-700">
                  Group facials are a bachelorette favorite for a reason. A
                  customized facial leaves the bride and her party with fresh,
                  radiant skin for the photos ahead.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] overflow-hidden">
              <Image src="/assets/massage2.jpg" alt="Relaxing massage at Sway Wellness Spa in Denver" width={600} height={400} className="w-full h-52 object-cover" />
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-[#113D33]">Tension-Melting Massages</h3>
                <p className="text-[15px] text-gray-700">
                  From a relaxing Swedish to a focused deep-tissue, massages give
                  everyone a chance to truly switch off before the wedding-week
                  chaos kicks in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wellness add-ons */}
        <section id="wellness-add-ons" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Wellness Add-Ons: Sauna & Cold Plunge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <Image src="/assets/insidesauna.jpg" alt="Traditional sauna at Sway Wellness Spa in Denver" width={600} height={400} className="rounded-xl w-full h-56 object-cover border border-[#d7e2dc]" />
            <div className="space-y-3">
              <p>
                Turn your spa day into a full wellness reset. Add the traditional
                sauna and cold plunge to your package for a hot-cold contrast
                experience that wakes everyone up and leaves you buzzing.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>Traditional sauna to relax muscles and unwind together</span></li>
                <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>Cold plunge for an energizing, photo-worthy group dare</span></li>
                <li className="flex gap-3"><span className="text-[#9CB7A9]">&#9679;</span><span>A shared experience that beats another round of cocktails</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to plan your Denver bachelorette?</h3>
          <p className="text-white/90 max-w-xl mx-auto">
            Tell us your date and group size and we will help you build the
            perfect package on Larimer Square, steps from downtown dining and
            nightlife.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 pt-2 text-lg">
            <span>Call</span>
            <a href="tel:+13034766150" className="font-bold underline underline-offset-4 hover:text-white/80">(303) 476-6150</a>
            <span className="text-white/70">or email</span>
            <span className="font-bold">contact@swaywellnessspa.com</span>
          </div>
          <div className="pt-2">
            <Link href="/locations/denver-larimer/book-service" className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-[#113D33] transition">Book a Treatment</Link>
          </div>
        </div>

        {/* Why Sway */}
        <section id="why-sway" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Why Brides Pick Sway in Denver</h2>
          <p>
            Sway sits on Larimer Square in the heart of downtown Denver, so your
            spa day folds neatly into a bigger bachelorette weekend of dinner,
            rooftop bars, and exploring the city. Inside, you will find a calm,
            modern space, soft robes, and a team that handles the details, so the
            maid of honor can finally relax too.
          </p>
          <blockquote className="border-l-4 border-[#9CB7A9] pl-6 py-2">
            <p className="text-xl text-[#113D33] italic">
              &ldquo;Our bachelorette spa day at Sway was the perfect mix of
              relaxation and celebration. We left feeling refreshed and
              glowing.&rdquo;
            </p>
            <footer className="text-sm text-gray-500 mt-2">Bride-to-Be, Denver</footer>
          </blockquote>
        </section>

        {/* How to plan: numbered steps */}
        <section id="how-to-plan" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">How to Plan Your Bachelorette Day</h2>
          <div className="space-y-4">
            {[
              {
                t: "Pick your date and group size",
                d: "Weekend slots for larger groups fill up fast, so lock in your date as early as you can.",
              },
              {
                t: "Email us your wishlist",
                d: "Send treatments, timing, and any extras to contact@swaywellnessspa.com and we will map out a package.",
              },
              {
                t: "Customize each guest's treatments",
                d: "Massages, facials, sauna, cold plunge. Everyone chooses what feels best to them.",
              },
              {
                t: "Show up and celebrate",
                d: "Arrive 15 minutes early, slip into a robe, and enjoy the day with your crew.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#d7e2dc] p-5 flex gap-4 items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#113D33] text-white text-sm font-bold shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-[#113D33]">{step.t}</h3>
                  <p className="text-[15px] text-gray-700 mt-1">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-[#113D33] text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Let&apos;s make the bride glow</h3>
          <p className="text-white/90 max-w-xl mx-auto">
            Reach out and we will help you put together a bachelorette spa
            package your whole bridal party will remember.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 pt-2 text-lg">
            <span>Call</span>
            <a href="tel:+13034766150" className="font-bold underline underline-offset-4 hover:text-white/80">(303) 476-6150</a>
            <span className="text-white/70">or email</span>
            <span className="font-bold">contact@swaywellnessspa.com</span>
          </div>
          <div className="pt-2">
            <Link href="/locations/denver-larimer/book-service" className="inline-block border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-[#113D33] transition">Book Online</Link>
          </div>
          <p className="text-xs text-white/70 pt-2">Pro tip: book early to secure your date and tailor every detail.</p>
        </div>

        {/* Visible FAQ */}
        <section id="faq" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Bachelorette Spa Day FAQ</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">Do you offer bachelorette spa packages for groups?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Yes. Sway puts together customizable group spa packages for bachelorette parties, combining massages, facials, sauna, and cold plunge so your whole bridal crew can be booked in the same window. Email contact@swaywellnessspa.com with your date and group size to plan.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">What treatments are best for a bachelorette party?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Group facials for a pre-wedding glow and massages to unwind are the most popular picks, often paired with sauna and cold plunge as wellness add-ons. At Sway each guest can customize their own treatment selection.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">Where is Sway located in Denver?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Sway Wellness Spa is at 1428 Larimer St., Denver, CO 80202, right on Larimer Square in downtown Denver, close to restaurants, rooftop bars, and hotels, ideal for a full bachelorette weekend.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#d7e2dc] p-5">
              <p className="font-bold text-[#113D33]">How far in advance should we book?</p>
              <p className="text-gray-700 mt-2 text-[15px]">Book as early as possible, especially for larger groups and weekend dates, to secure your preferred time and tailor the package to your vision. Reach out via contact@swaywellnessspa.com to begin planning.</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/bridal-skincare" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog3.jpg" alt="Bridal Skincare" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Bridal Skincare: Get Wedding-Ready Skin with Sway Facials</p></div>
            </Link>
            <Link href="/blog/best-date-night-ideas-denver" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog40.jpg" alt="Best Date Night Ideas in Denver" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Best Date Night Ideas in Denver: Spa, Dining & Bars</p></div>
            </Link>
            <Link href="/blog/valentines-day-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog6.jpg" alt="Valentine's Day Wellness" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Celebrate Valentine&apos;s Day Through Wellness</p></div>
            </Link>
          </div>
        </div>

        {/* Permalink */}
        <div className="text-sm text-gray-600 pt-4">
          Permalink: <Link href="/blog/bachelorette-spa-day" className="underline hover:text-[#113D33]">/blog/bachelorette-spa-day</Link>
        </div>
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
                name: "Do you offer bachelorette spa packages for groups in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Sway Wellness Spa on Larimer Square in Denver puts together customizable group spa packages for bachelorette parties. You can combine massages, facials, sauna, and cold plunge so your whole bridal crew is booked in the same window. Email contact@swaywellnessspa.com with your date and group size to start planning.",
                },
              },
              {
                "@type": "Question",
                name: "What spa treatments are best for a bachelorette party?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Group facials for a pre-wedding glow and massages for relaxation are the most popular bachelorette picks, often paired with wellness add-ons like traditional sauna and cold plunge. At Sway Wellness Spa, each guest can customize their own treatment selection so everyone in the bridal party gets exactly what they need.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Sway Wellness Spa located in Denver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sway Wellness Spa is located at 1428 Larimer St., Denver, CO 80202, on Larimer Square in downtown Denver. It is close to restaurants, rooftop bars, and hotels, making it an easy addition to a full bachelorette weekend.",
                },
              },
              {
                "@type": "Question",
                name: "How far in advance should you book a bachelorette spa day?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Book as early as possible, especially for larger groups and weekend dates, to secure your preferred time and ensure every detail is tailored to your vision. Sway Wellness Spa recommends reaching out early via email at contact@swaywellnessspa.com to begin planning your customized bachelorette spa package.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
