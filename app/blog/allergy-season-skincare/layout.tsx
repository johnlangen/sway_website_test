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
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
          <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Skincare</span>
          <span className="text-gray-500">March 2025</span>
        </div>

        <p>
          Spring is here, bringing blooming flowers, sunny afternoons… and the
          dreaded allergy season. For many, seasonal allergies don&apos;t just mean
          sneezing and watery eyes—they can wreak havoc on your skin, too. If
          you&apos;re dealing with redness, irritation, dryness, or flare-ups, Sway
          Wellness Spa is here to help.
        </p>

        <p>
          Sensitive, allergy-prone skin needs special care. That&apos;s why we offer
          tailored treatments that calm irritation, reduce inflammation, and
          restore balance—helping you maintain a radiant, healthy complexion all
          season long.
        </p>

        <nav className="bg-white border-l-4 border-[#9CB7A9] rounded-xl p-6 space-y-2">
          <p className="font-bold text-lg mb-3">In This Post</p>
          <ol className="list-decimal list-inside space-y-2 text-[#113D33]">
            <li><a href="#sensitive-silk-facial" className="hover:underline">Sensitive Silk Facial</a></li>
            <li><a href="#led-light-therapy" className="hover:underline">LED Light Therapy by LightStim</a></li>
            <li><a href="#remedy-room-normatec" className="hover:underline">Remedy Room Featuring Normatec Lymphatic Drainage Boots</a></li>
            <li><a href="#why-these-treatments-work" className="hover:underline">Why These Treatments Work During Allergy Season</a></li>
            <li><a href="#say-goodbye" className="hover:underline">Say Goodbye to Allergy Skin Woes</a></li>
          </ol>
        </nav>

        <h2 id="sensitive-silk-facial" className="text-2xl font-bold scroll-mt-24">Sensitive Silk Facial</h2>
        <p>
          The Sensitive Silk Facial is crafted for reactive, allergy-prone skin.
          Using botanical-rich Eminence products, this treatment reduces
          redness, eases irritation, and strengthens your skin&apos;s barrier.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Immediate Relief:</strong> Soothing botanicals calm
            irritation fast.
          </li>
          <li>
            <strong>Skin Strengthening:</strong> Fortifies your skin&apos;s barrier
            over time.
          </li>
        </ul>
        <p className="italic">
          &ldquo;My skin feels calmer and more hydrated.&rdquo; – Cara, Sway Member
        </p>

        <h2 id="led-light-therapy" className="text-2xl font-bold scroll-mt-24">LED Light Therapy by LightStim</h2>
        <p>
          Red light therapy is a non-invasive way to calm inflammation and speed
          up recovery. LightStim devices use targeted wavelengths to reduce
          redness, puffiness, and irritation caused by allergens.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Reduces Redness &amp; Puffiness:</strong> Calms inflammation for
            a clearer complexion.
          </li>
          <li>
            <strong>Faster Recovery:</strong> Increases circulation and
            accelerates skin healing.
          </li>
        </ul>
        <p className="italic">
          &ldquo;I always recommend LightStim for seasonal irritation.&rdquo; – Holly, Sway
          Esthetician
        </p>

        <h2 id="remedy-room-normatec" className="text-2xl font-bold scroll-mt-24">
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

        <h2 id="why-these-treatments-work" className="text-2xl font-bold scroll-mt-24">Why These Treatments Work During Allergy Season</h2>
        <p>
          Allergy season can leave skin dry, red, and reactive. Our
          science-backed facials and therapies calm the inflammation while
          restoring balance. Whether you&apos;re facing flare-ups or just looking for
          prevention, we have the tools and expertise to help your skin thrive.
        </p>

        <h2 id="say-goodbye" className="text-2xl font-bold scroll-mt-24">Say Goodbye to Allergy Skin Woes</h2>
        <p>
          Don&apos;t let allergies dull your glow. Schedule a treatment at Sway
          Wellness Spa and discover the power of calm, hydrated, and radiant
          skin all season long. Relief is just a visit away.
        </p>

        <div className="pt-4">
          <Link href="/treatments" className="underline text-[#113D33] font-semibold">
            Explore all Sway treatments
          </Link>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#d7e2dc]">
          <h3 className="text-xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/blog/post-summer-skin-recovery" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog23.jpg" alt="Post-Summer Skin Recovery" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Repair &amp; Refresh: Post-Summer Skin Recovery Starts Now</p></div>
            </Link>
            <Link href="/blog/vitamin-c-facial" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog4.jpg" alt="Vitamin C Facial" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Winter Skincare: Brighten Your Skin with Sway&apos;s Vitamin C Facial</p></div>
            </Link>
            <Link href="/blog/spring-reset" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
              <div className="h-36 overflow-hidden"><Image src="/assets/blog9.jpg" alt="Spring Reset" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
              <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Spring Reset: Detox Your Skin &amp; Body with Sway</p></div>
            </Link>
          </div>
        </div>

        {/* Permalink */}
        <div className="text-sm text-gray-400 pt-4">
          Permalink: <Link href="/blog/allergy-season-skincare" className="underline hover:text-[#113D33]">/blog/allergy-season-skincare</Link>
        </div>
      </div>
    </div>
  );
}
