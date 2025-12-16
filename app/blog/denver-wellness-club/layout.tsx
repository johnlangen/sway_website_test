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
        <p>
          Discover Sway, Denver’s most anticipated wellness club, blending
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
          src="/assets/homepage_photo_outside.png"
          alt="Sway Wellness Spa Exterior"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <h2 className="text-2xl font-bold pt-4">The Why</h2>
        <p>
          “We’ve identified an unmet need in big cities for health and wellness
          services tailored to Millennials, Gen Z, and Alpha X,” says Emily
          Langenderfer, Director of Sway. “We believe that wellness should be
          accessible, innovative, and reflective of a modern lifestyle...”
        </p>

        <h2 className="text-2xl font-bold pt-4">Treatments</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Deep Tissue</li>
          <li>
            <a
              href="https://causemedic.com/"
              className="underline text-blue-600"
              target="_blank"
            >
              Cause Medic CBD
            </a>
          </li>
          <li>Salt Stone</li>
          <li>Sports Massages</li>
        </ul>

        <h2 className="text-2xl font-bold pt-4">Specialized Facials</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Forever Young (anti-aging)</li>
          <li>Pore Perfection (acne-prone skin)</li>
          <li>Glow Getter (hydration)</li>
          <li>Sensitive Silk (for redness and irritation)</li>
        </ul>

        <Image
          src="/assets/homepage_photo_b.png"
          alt="Sway Facial Room"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <h2 className="text-2xl font-bold pt-4">Remedy Room</h2>
        <p>
          Trending treatments, such as Normatec Lymphatic Compression by{" "}
          <a
            href="https://hyperice.com/"
            className="underline text-blue-600 ml-1"
            target="_blank"
          >
            Hyperice
          </a>
          , Cold Plunge (
          <a
            href="https://plunge.com/"
            className="underline text-blue-600"
            target="_blank"
          >
            Plunge
          </a>
          ), Sauna, and LED Light Therapy by{" "}
          <a
            href="https://lightstimpro.com/"
            className="underline text-blue-600 ml-1"
            target="_blank"
          >
            LightStim
          </a>
          , will also be available in Sway’s Remedy Room.
        </p>

        <Image
          src="/assets/recover_room.png"
          alt="Remedy Room at Sway"
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />

        <h2 className="text-2xl font-bold pt-4">Expert Team & Products</h2>
        <p>
          Sway’s estheticians and massage therapists tailor services to
          individual goals. Their facials are powered by{" "}
          <a
            href="https://eminenceorganics.com/us"
            className="underline text-blue-600 ml-1"
            target="_blank"
          >
            Eminence Organic Skincare
          </a>
          , delivering noticeable results with Hungarian techniques and
          lymphatic stimulation.
        </p>

        <h2 className="text-2xl font-bold pt-4">Behind The Design</h2>
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
      </div>
    </div>
  );
}
