"use client";

import Image from "next/image";
import Link from "next/link";

export default function AllergySeasonSkincareBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Allergy Season? Best Treatments to Soothe Sensitive Skin
        </h1>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Spring is here, bringing blooming flowers, sunny afternoons… and the
          dreaded allergy season. For many, seasonal allergies don’t just mean
          sneezing and watery eyes—they can wreak havoc on your skin, too. If
          you're dealing with redness, irritation, dryness, or flare-ups, Sway
          Wellness Spa is here to help.
        </p>

        <p>
          Sensitive, allergy-prone skin needs special care. That’s why we offer
          tailored treatments that calm irritation, reduce inflammation, and
          restore balance—helping you maintain a radiant, healthy complexion all
          season long.
        </p>

        <h2 className="text-2xl font-bold">Sensitive Silk Facial</h2>
        <p>
          The Sensitive Silk Facial is crafted for reactive, allergy-prone skin.
          Using botanical-rich Eminence products, this treatment reduces
          redness, eases irritation, and strengthens your skin’s barrier.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Immediate Relief:</strong> Soothing botanicals calm
            irritation fast.
          </li>
          <li>
            <strong>Skin Strengthening:</strong> Fortifies your skin's barrier
            over time.
          </li>
        </ul>
        <p className="italic">
          “My skin feels calmer and more hydrated.” – Cara, Sway Member
        </p>

        <h2 className="text-2xl font-bold">LED Light Therapy by LightStim</h2>
        <p>
          Red light therapy is a non-invasive way to calm inflammation and speed
          up recovery. LightStim devices use targeted wavelengths to reduce
          redness, puffiness, and irritation caused by allergens.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Reduces Redness & Puffiness:</strong> Calms inflammation for
            a clearer complexion.
          </li>
          <li>
            <strong>Faster Recovery:</strong> Increases circulation and
            accelerates skin healing.
          </li>
        </ul>
        <p className="italic">
          “I always recommend LightStim for seasonal irritation.” – Holly, Sway
          Esthetician
        </p>

        <h2 className="text-2xl font-bold">
          Remedy Room Featuring Normatec Lymphatic Drainage Boots
        </h2>
        <p>
          For full-body refreshment, the Remedy Room combines detoxifying
          treatments with powerful relaxation. Normatec boots help flush toxins
          and reduce puffiness, while sauna therapy boosts circulation and skin
          clarity.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Flush Toxins:</strong> Compression boots stimulate your
            lymphatic system.
          </li>
          <li>
            <strong>Boost Circulation:</strong> Improves skin and immune system
            performance.
          </li>
        </ul>
        <p>
          These treatments work together to help you feel refreshed, recharged,
          and glowing—from the inside out.
        </p>

        <h2 className="text-2xl font-bold">Why These Treatments Work During Allergy Season</h2>
        <p>
          Allergy season can leave skin dry, red, and reactive. Our
          science-backed facials and therapies calm the inflammation while
          restoring balance. Whether you’re facing flare-ups or just looking for
          prevention, we have the tools and expertise to help your skin thrive.
        </p>

        <h2 className="text-2xl font-bold">Say Goodbye to Allergy Skin Woes</h2>
        <p>
          Don’t let allergies dull your glow. Schedule a treatment at Sway
          Wellness Spa and discover the power of calm, hydrated, and radiant
          skin all season long. Relief is just a visit away.
        </p>

        <div className="pt-4">
          <Link href="/treatments" className="underline text-blue-600">
            Explore all Sway treatments
          </Link>
        </div>
      </div>
    </div>
  );
}
