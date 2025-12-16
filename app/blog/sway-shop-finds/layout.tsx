"use client";

import Image from "next/image";

export default function SwayShopFindsBlogLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance">
      {/* Banner */}
      <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          From the Spa to You: The Best Sway Shop Finds For Ultimate Wellness
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed">
        <p>
          Looking to bring the spa experience home? The Sway Shop in Larimer
          Square offers a beautifully curated selection of products that blend
          luxury with practicality. Whether you're upgrading your skincare,
          shopping for the perfect gift, or just exploring wellness staples,
          this is your go-to destination for elevated self-care.
        </p>

        <h2 className="text-2xl font-bold">What You'll Find at the Sway Shop</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Eminence Skincare:</strong> Natural, award-winning skincare
            like the Rosehip Triple C+E Firming Oil and Radiant Protection SPF
            Fluid.{" "}
            <a
              href="https://eminenceorganics.com/us/blog/eminence-organics-award-wins"
              target="_blank"
              className="underline text-blue-600"
            >
              Learn more
            </a>
            .
          </li>
          <li>
            <strong>Dr. Dennis Gross Treatments:</strong> Dermatologist-developed
            skincare for spa-grade results at home.
          </li>
          <li>
            <strong>DedCool Fragrances:</strong> Clean, non-toxic perfumes that
            blend sophistication with sustainability.
          </li>
          <li>
            <strong>Assouline Coffee Table Books:</strong> Luxurious statement
            pieces that elevate any space.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">Exclusive Member Perks</h2>
        <p>
          Members receive 10% off all retail (excluding Assouline, Gray Malin,
          and food/beverage items) and enjoy gift-with-purchase perks on
          Eminence throughout March and April. These perks make it easier to try
          new favorites and elevate your skincare game.
        </p>

        <p className="italic">
          “I always leave Sway with a new skincare obsession—whether it’s an
          Eminence serum or a Dr. Dennis Gross peel, they have the best
          selection!” – Sway Member
        </p>

        <h2 className="text-2xl font-bold">Bring Wellness Into Your Everyday</h2>
        <p>
          Start your day with a clean, invigorating DedCool scent. Rehydrate and
          firm your skin with Eminence Bamboo Firming Fluid. Then unwind with a
          stunning Assouline book and soak in the beauty of your space. The Sway
          Shop helps turn everyday moments into meaningful rituals.
        </p>

        <h2 className="text-2xl font-bold">Why Locals Love It</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Convenience:</strong> Just steps from your treatment in
            Larimer Square.
          </li>
          <li>
            <strong>Quality:</strong> Every item is hand-picked for performance,
            luxury, and sustainability.
          </li>
          <li>
            <strong>Community:</strong> A gathering place for wellness lovers to
            connect and explore new favorites.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">Visit Us Today</h2>
        <p>
          Whether you're looking to restock your skincare shelf or discover a
          luxurious new gift, the Sway Shop is ready to elevate your self-care
          routine. Stop by after your treatment or just come in to explore our
          latest favorites.
        </p>
      </div>
    </div>
  );
}
