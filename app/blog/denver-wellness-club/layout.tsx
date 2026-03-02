"use client";

import Image from "next/image";
import Link from "next/link";

export default function DenverWellnessClubBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Denver’s Most Anticipated Wellness Club
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Wellness</span>
          <span className="text-gray-500">January 2025 · By Sway Wellness Team</span>
        </div>

        <p>
          Discover Sway, Denver&apos;s most anticipated wellness club, blending
          science-backed facials, massages, sauna, cold plunge, and more.
          Designed for the wellness guru, Sway offers affordable luxury,
          personalized treatments, and a sleek, city-centric escape. Join our
          founding member offer today!
        </p>

        <p>
          Sway enters the $1.8 trillion global wellness industry with
          science-backed spa services for the most health-conscious generation
          yet. Founded by the visionaries behind Spavia Day Spa, Sway is set to
          make wellness accessible, innovative, and city-centric.
        </p>

        <Image
          src="/assets/homepage_photo_outside.jpg"
          alt="Sway Wellness Spa Exterior"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#the-why" className="hover:underline">The Why</a></li>
            <li><a href="#treatments" className="hover:underline">Treatments</a></li>
            <li><a href="#specialized-facials" className="hover:underline">Specialized Facials</a></li>
            <li><a href="#remedy-room" className="hover:underline">Remedy Room</a></li>
            <li><a href="#expert-team-and-products" className="hover:underline">Expert Team &amp; Products</a></li>
            <li><a href="#behind-the-design" className="hover:underline">Behind The Design</a></li>
          </ol>
        </nav>

        <h2 id="the-why" className="text-2xl font-bold pt-4 scroll-mt-24">The Why</h2>
        <p>
          “We’ve identified an unmet need in big cities for health and wellness
          services tailored to Millennials, Gen Z, and Alpha X,” says Emily
          Langenderfer, Director of Sway. “We believe that wellness should be
          accessible, innovative, and reflective of a modern lifestyle...”
        </p>

        <h2 id="treatments" className="text-2xl font-bold pt-4 scroll-mt-24">Treatments</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Deep Tissue</li>
          <li>
            <a
              href="https://causemedic.com/"
              className="text-[#113D33] font-semibold hover:underline"
              target="_blank"
            >
              Cause Medic CBD
            </a>
          </li>
          <li>Salt Stone</li>
          <li>Sports Massages</li>
        </ul>

        <h2 id="specialized-facials" className="text-2xl font-bold pt-4 scroll-mt-24">Specialized Facials</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Forever Young (anti-aging)</li>
          <li>Pore Perfection (acne-prone skin)</li>
          <li>Glow Getter (hydration)</li>
          <li>Sensitive Silk (for redness and irritation)</li>
        </ul>

        <Image
          src="/assets/homepage_photo_b.jpg"
          alt="Sway Facial Room"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <h2 id="remedy-room" className="text-2xl font-bold pt-4 scroll-mt-24">Remedy Room</h2>
        <p>
          Trending treatments, such as Normatec Lymphatic Compression by{" "}
          <a
            href="https://hyperice.com/"
            className="text-[#113D33] font-semibold hover:underline ml-1"
            target="_blank"
          >
            Hyperice
          </a>
          , Cold Plunge (
          <a
            href="https://plunge.com/"
            className="text-[#113D33] font-semibold hover:underline"
            target="_blank"
          >
            Plunge
          </a>
          ), Sauna, and LED Light Therapy by{" "}
          <a
            href="https://lightstimpro.com/"
            className="text-[#113D33] font-semibold hover:underline ml-1"
            target="_blank"
          >
            LightStim
          </a>
          , will also be available in Sway’s Remedy Room.
        </p>

        <Image
          src="/assets/recover_room.jpg"
          alt="Remedy Room at Sway"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <h2 id="expert-team-and-products" className="text-2xl font-bold pt-4 scroll-mt-24">Expert Team &amp; Products</h2>
        <p>
          Sway’s estheticians and massage therapists tailor services to
          individual goals. Their facials are powered by{" "}
          <a
            href="https://eminenceorganics.com/us"
            className="text-[#113D33] font-semibold hover:underline ml-1"
            target="_blank"
          >
            Eminence Organic Skincare
          </a>
          , delivering noticeable results with Hungarian techniques and
          lymphatic stimulation.
        </p>

        <h2 id="behind-the-design" className="text-2xl font-bold pt-4 scroll-mt-24">Behind The Design</h2>
        <p>
          Sway’s design reflects its name—dynamic and fluid, with hand-picked
          decor, live greenery, and soft modern lines that create a relaxing yet
          refined space.
        </p>

        <div className="pt-4">
          <Link
            href="/membership"
            className="inline-block bg-[#113D33] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e322b] transition"
          >
            Access Our Exclusive Founding Member Offer
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-10 space-y-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/best-day-spa-in-america" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/homepage_photo_outside.jpg" alt="#4 Best Day Spa in America" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">#4 Best Day Spa in America</p></div>
            </Link>
            <Link href="/blog/tech-and-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog10.jpg" alt="How Tech is Transforming Spa Treatments" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">How Tech is Transforming Spa Treatments</p></div>
            </Link>
            <Link href="/blog/sway-spa-membership" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog2.jpg" alt="Sway Spa Membership: Wellness Transformation" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Sway Spa Membership: Wellness Transformation</p></div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/denver-wellness-club</p>
      </div>
    </div>
  );
}
