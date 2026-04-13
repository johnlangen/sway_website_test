"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HolidayWellnessGuideLayout() {
  return (
    <div className="bg-[#F7F4E9] text-black font-vance snap-y snap-mandatory min-h-[100svh] overflow-y-scroll">
      {/* =========================
          SECTION 1 — COVER (snap)
         ========================= */}
      <section className="snap-start min-h-[100svh] flex justify-center items-center px-4">
        <div
          className="
            relative
            w-full
            max-w-[420px]
            md:max-w-[520px]
            lg:max-w-[600px]
            aspect-[3/5]
            max-h-[80vh]
            overflow-hidden
            rounded-md
            shadow-lg
          "
        >
          <Image
            src="/assets/blog26.jpg"
            alt="Holiday Wellness Gift Guide"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
            <div className="text-center text-xs tracking-widest uppercase opacity-90">
              Holiday Gift Guide
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold">
                Your
                <br />
                Wellness
                <br />
                Guide Is
                <br />
                Here
              </h1>

              {/* visual only */}
              <a
                href="#as-seen-in"
                className="inline-block bg-[#CFE6D8] text-[#113D33] text-xs font-semibold tracking-wide px-4 py-2 rounded-full hover:opacity-90 transition"
                >
                Learn More
                </a>
            </div>

            <div />
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 2 — CBD COLLAGE (snap)
          Goal: fits on screen across breakpoints
         ========================= */}
      <section   id="as-seen-in" className="snap-start min-h-[100svh] flex items-start justify-center px-4 pt-20 md:pt-24">
        <div className="w-full max-w-6xl mx-auto">
          {/* -------------------------
              MOBILE (single “page”, no overlay)
             ------------------------- */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
              className="mb-5"
            >
              <p className="text-3xl font-bold tracking-wide text-[#9CB7A9]">
                AS SEEN IN
              </p>
              <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                CBD Massage
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#2b2b2b]">
                A targeted massage experience using CBD to calm the nervous
                system and release stubborn tension—perfect for post-workout
                soreness or chronic tightness.
              </p>
            </motion.div>

            {/* Collage */}
            <div className="relative w-full aspect-[5/4]">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
                {/* blog27 — left, spans rows */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55 }}
                  className="relative col-span-1 row-span-2 overflow-hidden rounded-lg shadow-md bg-white"
                >
                  <div className="absolute top-2 left-2 z-20 text-[10px] tracking-wider uppercase text-white/95">
                    <span className="bg-black/30 px-2 py-1 rounded">
                      CBD Body Oil
                    </span>
                  </div>
                  <Image
                    src="/assets/blog27.jpg"
                    alt="CBD Body Oil"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* blog28 — top right */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="relative overflow-hidden rounded-lg shadow-md bg-white"
                >
                  <div className="absolute top-2 left-2 z-20 text-[10px] tracking-wider uppercase text-white/95">
                    <span className="bg-black/30 px-2 py-1 rounded">
                      CBD Relief Cream
                    </span>
                  </div>
                  <Image
                    src="/assets/blog28.jpg"
                    alt="CBD Relief Cream"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* blog29 — bottom right */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="relative overflow-hidden rounded-lg shadow-md bg-white"
                >
                  <div className="absolute top-2 left-2 z-20 text-[10px] tracking-wider uppercase text-white/95">
                    <span className="bg-black/30 px-2 py-1 rounded">
                      CBD Relief Cream
                    </span>
                  </div>
                  <Image
                    src="/assets/blog29.jpg"
                    alt="CBD Relief Cream Packaging"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Mobile card BELOW images */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="mt-4 bg-white border border-[#d7e2dc] shadow-md rounded px-4 py-4"
            >
              <p className="text-[12.5px] leading-relaxed text-[#113D33]">
                Our award-winning CBD cream delivers immediate cooling comfort
                and helps you feel lighter, calmer, and more mobile—fast.
              </p>
            </motion.div>
          </div>

          {/* -------------------------
              TABLET / DESKTOP
              Key fixes:
              - tighter gaps on smaller desktops
              - no absolute overlay (prevents cutoff)
              - card centered below images (always)
             ------------------------- */}
          <div className="hidden md:block">
            {/* Row 1: text + top-right image */}
            <div className="grid grid-cols-2 gap-6 lg:gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-4xl lg:text-5xl font-bold tracking-wide text-[#9CB7A9]">
                  AS SEEN IN
                </p>
                <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
                  CBD Massage
                </p>

                <p className="mt-5 lg:mt-6 text-sm lg:text-base leading-relaxed text-[#2b2b2b] max-w-[520px]">
                  This targeted massage experience uses CBD to help calm the
                  nervous system and release stubborn tension—perfect for
                  post-workout soreness or chronic tightness.
                </p>

                <p className="mt-3 lg:mt-4 text-sm lg:text-base leading-relaxed text-[#2b2b2b] max-w-[520px]">
                  Think cooling comfort, smoother mobility, and that grounded
                  feeling you notice after a truly great session.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-lg shadow-md bg-white"
              >
                <div className="absolute top-3 left-3 z-20 text-[11px] tracking-wider uppercase text-white/95">
                  <span className="bg-black/30 px-2 py-1 rounded">
                    CBD Relief Cream
                  </span>
                </div>
                <div className="relative w-full aspect-[16/11] xl:aspect-[16/10]">
                  <Image
                    src="/assets/blog28.jpg"
                    alt="CBD Relief Cream"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Row 2: bottom images */}
            <div className="mt-6 lg:mt-8">
              <div className="grid grid-cols-2 gap-6 lg:gap-10 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-lg shadow-md bg-white"
                >
                  <div className="absolute top-3 left-3 z-20 text-[11px] tracking-wider uppercase text-white/95">
                    <span className="bg-black/30 px-2 py-1 rounded">
                      CBD Body Oil
                    </span>
                  </div>
                  <div className="relative w-full aspect-[16/11] xl:aspect-[16/10]">
                    <Image
                      src="/assets/blog27.jpg"
                      alt="CBD Body Oil"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: 0.04 }}
                  className="relative overflow-hidden rounded-lg shadow-md bg-white"
                >
                  <div className="absolute top-3 left-3 z-20 text-[11px] tracking-wider uppercase text-white/95">
                    <span className="bg-black/30 px-2 py-1 rounded">
                      CBD Relief Cream
                    </span>
                  </div>
                  <div className="relative w-full aspect-[16/11] xl:aspect-[16/10]">
                    <Image
                      src="/assets/blog29.jpg"
                      alt="CBD Relief Cream Packaging"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Centered card BELOW images (all md+) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mt-5 lg:mt-7 flex justify-center"
              >
                <div className="w-full max-w-[720px] bg-white border border-[#d7e2dc] shadow-lg rounded-xl px-5 lg:px-8 py-4 lg:py-5 text-center">
                  <p className="text-xs lg:text-sm leading-relaxed text-[#113D33] font-medium">
                    Our award-winning relief cream provides immediate cooling
                    comfort with a revitalizing blend designed to help you feel
                    lighter, calmer, and more mobile—fast.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
    SECTION 3 — GLOW GETTER (snap)
   ========================= */}
<section className="snap-start min-h-[100svh] flex items-start justify-center px-4 pt-20 md:pt-28 lg:pt-24">
  <div className="w-full max-w-6xl mx-auto">
    {/* -------------------------
        MOBILE (clean single page, no overlay)
       ------------------------- */}
    <div className="md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="mb-5"
      >
        <p className="text-3xl font-bold tracking-wide text-[#9CB7A9]">
          AS SEEN IN
        </p>
        <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
          Glow Getter
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#2b2b2b]">
          This signature facial delivers a dewy, luminous complexion using
          antioxidant-rich botanicals and advanced hydration. Designed to revive
          tired, dull skin, the Glow Getter gently exfoliates and restores
          balance, leaving you fresh-faced and radiant — the ultimate reset for
          skin that craves renewal.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[#2b2b2b]">
          Pair your glow with at-home care from Eminence Organics.
        </p>
      </motion.div>

      {/* Collage */}
      <div className="relative w-full aspect-[5/4]">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
          {/* blog31 — top right */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white col-start-2 row-start-1"
          >
            <Image
              src="/assets/blog31.jpg"
              alt="Glow Getter visual"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* blog30 — bottom left (spans rows like your reference) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog30.jpg"
              alt="Kombucha Microbiome Foaming Cleanser"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* blog32 — bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white col-start-2 row-start-2"
          >
            <Image
              src="/assets/blog32.jpg"
              alt="Birch Water Purifying Essence"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile card BELOW images */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mt-4 bg-white border border-[#d7e2dc] shadow-md rounded-xl px-4 py-4"
      >
        <p className="text-[12.5px] leading-relaxed text-[#113D33]">
          The Kombucha Microbiome Foaming Cleanser gently purifies while
          maintaining a healthy skin barrier, and the Birch Water Purifying
          Essence replenishes hydration and luminosity with every use. Together,
          they extend your post-facial glow and keep skin balanced long after
          your Sway visit.
        </p>
      </motion.div>
    </div>

    {/* -------------------------
        DESKTOP / TABLET (2-row composition + centered card below)
       ------------------------- */}
    <div className="hidden md:block">
      {/* Row 1: text + top-right image */}
      <div className="grid grid-cols-2 gap-10 lg:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-5xl font-bold tracking-wide text-[#9CB7A9]">
            AS SEEN IN
          </p>
          <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
            Glow Getter
          </p>

          <p className="mt-6 text-base leading-relaxed text-[#2b2b2b] max-w-md">
            This signature facial delivers a dewy, luminous complexion using
            antioxidant-rich botanicals and advanced hydration. Designed to
            revive tired, dull skin, the Glow Getter gently exfoliates and
            restores balance, leaving you fresh-faced and radiant — the ultimate
            reset for skin that craves renewal.
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#2b2b2b] max-w-md">
            Pair your glow with at-home care from Eminence Organics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-lg shadow-md bg-white"
        >
          <div className="relative w-full aspect-[16/10]">
            <Image
              src="/assets/blog31.jpg"
              alt="Glow Getter visual"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Row 2: bottom images + centered card BELOW (not overlay) */}
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/assets/blog30.jpg"
                alt="Kombucha Microbiome Foaming Cleanser"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/assets/blog32.jpg"
                alt="Birch Water Purifying Essence"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Center card BELOW images */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-8 flex justify-center"
        >
          <div className="w-full max-w-[760px] bg-white/95 backdrop-blur border border-[#d7e2dc] shadow-xl rounded-2xl px-6 lg:px-10 py-4 lg:py-6 text-center">
            <p className="text-sm leading-relaxed text-[#113D33]">
              The Kombucha Microbiome Foaming Cleanser gently purifies while
              maintaining a healthy skin barrier, and the Birch Water Purifying
              Essence replenishes hydration and luminosity with every use.
              Together, they extend your post-facial glow and keep skin balanced
              long after your Sway visit.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>


{/* =========================
    SECTION X — THE SWAY SHOP (snap)
   ========================= */}
<section className="snap-start min-h-[100svh] flex items-start justify-center px-4 pt-20 md:pt-28 lg:pt-24">
  <div className="w-full max-w-6xl mx-auto">
    {/* -------------------------
        MOBILE (clean single page, no overlay)
       ------------------------- */}
    <div className="md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="mb-5"
      >
        <p className="text-3xl font-bold tracking-wide text-[#9CB7A9]">
          AS SEEN IN
        </p>
        <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
          The Sway Shop
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#2b2b2b]">
          Where wellness meets design. The Sway Shop curates products that
          inspire daily rituals — from luxurious skincare and SPF essentials to
          home scents and statement coffee-table books. Discover the art of
          feeling good through every sense: the glow of Supergoop!, the scent of
          Paddywax, and the wanderlust pages of Assouline. Each piece is chosen
          to bring balance, beauty, and modern calm into your everyday routine —
          because self-care should look as good as it feels.
        </p>
      </motion.div>

      {/* Collage */}
      <div className="relative w-full aspect-[5/4]">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
          {/* blog33 — left, spans rows (Paddywax scene) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog33.jpg"
              alt="Paddywax"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* blog34 — top right (Assouline) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog34.jpg"
              alt="Assouline"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* blog35 — bottom right (Supergoop) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog35.jpg"
              alt="Supergoop"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile card BELOW images */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mt-4 bg-white border border-[#d7e2dc] shadow-md rounded-xl px-4 py-4"
      >
        <p className="text-[12.5px] leading-relaxed text-[#113D33]">
          Supergoop! Lightweight, invisible, and effortlessly wearable
          sunscreen. A scent for every mood with Paddywax candles. A lifestyle
          in print with Assouline books capture the art of travel, culture, and
          design — the perfect statement piece for your coffee table or your
          next escape.
        </p>
      </motion.div>
    </div>

    {/* -------------------------
        DESKTOP / TABLET (2-row composition + centered card below)
       ------------------------- */}
    <div className="hidden md:block">
      {/* Row 1: text + top-right image */}
      <div className="grid grid-cols-2 gap-10 lg:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-5xl font-bold tracking-wide text-[#9CB7A9]">
            AS SEEN IN
          </p>
          <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
            The Sway Shop
          </p>

          <p className="mt-6 text-base leading-relaxed text-[#2b2b2b] max-w-md">
            Where wellness meets design. The Sway Shop curates products that
            inspire daily rituals — from luxurious skincare and SPF essentials
            to home scents and statement coffee-table books.
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#2b2b2b] max-w-md">
            Discover the art of feeling good through every sense: the glow of
            Supergoop!, the scent of Paddywax, and the wanderlust pages of
            Assouline. Each piece is chosen to bring balance, beauty, and modern
            calm into your everyday routine — because self-care should look as
            good as it feels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-lg shadow-md bg-white"
        >
          <div className="relative w-full aspect-[16/10]">
            <Image
              src="/assets/blog34.jpg"
              alt="Assouline"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Row 2: bottom images + centered card BELOW */}
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/assets/blog33.jpg"
                alt="Paddywax"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/assets/blog35.jpg"
                alt="Supergoop"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Center card BELOW images */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-8 flex justify-center"
        >
          <div className="w-full max-w-[760px] bg-white/95 backdrop-blur border border-[#d7e2dc] shadow-xl rounded-2xl px-6 lg:px-10 py-4 lg:py-6 text-center">
            <p className="text-sm leading-relaxed text-[#113D33]">
              Supergoop! Lightweight, invisible, and effortlessly wearable
              sunscreen. A scent for every mood with Paddywax candles. A
              lifestyle in print with Assouline books capture the art of travel,
              culture, and design — the perfect statement piece for your coffee
              table or your next escape.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>


{/* =========================
    SECTION X — SWAY GIFT CARD (snap)
   ========================= */}
<section className="snap-start min-h-[100svh] flex items-start justify-center px-4 pt-20 md:pt-28 lg:pt-24">
  <div className="w-full max-w-6xl mx-auto">
    {/* -------------------------
        MOBILE (single page, no overlay)
       ------------------------- */}
    <div className="md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="mb-5"
      >
        <p className="text-3xl font-bold tracking-wide text-[#9CB7A9]">
          AS SEEN IN
        </p>
        <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
          Sway
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#2b2b2b]">
          When wellness is the wish, a Sway Gift Card is always the right
          choice. Give the experience of relaxation — from facials and massages
          to sauna sessions and cold plunge dips. A gift of balance, beauty, and
          time to recharge. Let them choose their own moment to breathe.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#2b2b2b]">
          Available in any amount. Redeemable for treatments, products, and
          memberships at Sway Wellness Spa.
        </p>
      </motion.div>

      {/* Collage */}
      <div className="relative w-full aspect-[5/4]">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
          {/* blog36 — left, spans rows */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog36.jpg"
              alt="Sway gift card lifestyle"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* blog37 — top right */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog37.png"
              alt="Sway Wellness Spa logo"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* blog38 — bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <Image
              src="/assets/blog38.jpg"
              alt="Sway product detail"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile card BELOW images */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mt-4 bg-white border border-[#d7e2dc] shadow-md rounded-xl px-4 py-4"
      >
        <p className="text-[12.5px] leading-relaxed text-[#113D33] text-center">
          Wellness looks good on everyone.
          <br />
          The Sway Gift Card — the gift that always fits.
        </p>
      </motion.div>
    </div>

    {/* -------------------------
        DESKTOP / TABLET (2-row composition + centered card below)
       ------------------------- */}
    <div className="hidden md:block">
      {/* Row 1: text + top-right image */}
      <div className="grid grid-cols-2 gap-10 lg:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-5xl font-bold tracking-wide text-[#9CB7A9]">
            AS SEEN IN
          </p>
          <p className="mt-2 text-xs tracking-[0.25em] uppercase text-[#113D33] font-semibold">
            Sway
          </p>

          <p className="mt-6 text-base leading-relaxed text-[#2b2b2b] max-w-md">
            When wellness is the wish, a Sway Gift Card is always the right
            choice. Give the experience of relaxation — from facials and
            massages to sauna sessions and cold plunge dips. A gift of balance,
            beauty, and time to recharge. Let them choose their own moment to
            breathe.
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#2b2b2b] max-w-md">
            Available in any amount. Redeemable for treatments, products, and
            memberships at Sway Wellness Spa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-lg shadow-md bg-white"
        >
          <div className="relative w-full aspect-[16/10]">
            <Image
              src="/assets/blog37.png"
              alt="Sway Wellness Spa logo"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Row 2: bottom images + centered card BELOW */}
      <div className="mt-10">
        <div className="grid grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/assets/blog36.jpg"
                alt="Sway gift card lifestyle"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="relative overflow-hidden rounded-lg shadow-md bg-white"
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/assets/blog38.jpg"
                alt="Sway product detail"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Center card BELOW images */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-8 flex justify-center"
        >
          <div className="w-full max-w-[760px] bg-white/95 backdrop-blur border border-[#d7e2dc] shadow-xl rounded-2xl px-6 lg:px-10 py-4 lg:py-6 text-center">
            <p className="text-sm leading-relaxed text-[#113D33]">
              Wellness looks good on everyone.
              <br />
              The Sway Gift Card — the gift that always fits.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>

{/* =========================
    FINAL SECTION — CTA COVER (snap)
   ========================= */}
<section className="snap-start min-h-[100svh] flex justify-center items-center px-4">
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.45 }}
    transition={{ duration: 0.6 }}
    className="
      relative w-full
      max-w-[420px] md:max-w-[520px] lg:max-w-[600px]
      aspect-[3/5] max-h-[80vh]
      overflow-hidden rounded-md shadow-lg
    "
  >
    <Image
      src="/assets/blog39.jpg"
      alt="Schedule Your Holiday Wellness at Sway"
      fill
      priority
      className="object-cover"
    />

    {/* subtle dark overlay for readability */}
    <div className="absolute inset-0 bg-black/35" />

    {/* content */}
    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
      {/* Top row */}
      <div className="flex items-center justify-between text-[10px] md:text-xs tracking-[0.25em] uppercase opacity-95">
        <span>LARIMER ST</span>

        <span className="px-4 py-1 rounded-full border border-white/70 bg-black/15 tracking-[0.25em]">
          WELLNESS
        </span>

        <span>DENVER</span>
      </div>

      {/* Center headline */}
      <div className="text-center px-2">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05]">
          SCHEDULE YOUR
          <br />
          HOLIDAY WELLNESS
        </h2>
      </div>

      {/* Bottom button */}
      <div className="flex justify-center">
        <a
          href="/book"
          className="
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            border border-white/70
            bg-black/35 hover:bg-black/45
            transition
            text-xs md:text-sm font-semibold tracking-[0.18em] uppercase
          "
        >
          VISIT SWAY
        </a>
      </div>
    </div>
  </motion.div>
</section>

{/* Back + Related Articles */}
<section className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-[17px] leading-relaxed font-vance">
  <div className="flex flex-wrap items-center gap-4 text-sm">
    <Link href="/blog" className="text-[#113D33] font-semibold hover:underline">&larr; Back to Blog</Link>
    <span className="bg-[#113D33] text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Holiday</span>
    <span className="text-gray-500">December 2025 · By Sway Wellness Team</span>
  </div>
  <div className="pt-6">
    <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href="/blog/mothers-day-gift-guide" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
        <div className="h-36 overflow-hidden"><Image src="/assets/blog16.jpg" alt="Mother's Day Gift Guide" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
        <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">The Ultimate Mother&apos;s Day Gift Guide</p></div>
      </Link>
      <Link href="/blog/give-wellness-get-wellness" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
        <div className="h-36 overflow-hidden"><Image src="/assets/blog19.jpg" alt="Referral Program" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
        <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Give Wellness, Get Wellness</p></div>
      </Link>
      <Link href="/blog/sway-shop-finds" className="group block bg-white rounded-xl border border-[#d7e2dc] overflow-hidden hover:shadow-lg transition">
        <div className="h-36 overflow-hidden"><Image src="/assets/blog13.jpg" alt="Sway Shop Finds" width={400} height={200} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" /></div>
        <div className="p-4"><p className="font-bold text-sm group-hover:text-[#113D33] transition">Best Sway Shop Finds for Wellness</p></div>
      </Link>
    </div>
  </div>
  <p className="text-xs text-gray-400 pt-4 border-t border-[#d7e2dc]">Permalink: swaywellnessspa.com/blog/holiday-wellness-guide</p>
</section>

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
                name: "What are the best wellness gifts for the holidays?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The best wellness gifts for the holidays include spa gift cards, CBD massage experiences, luxury skincare products, and curated self-care bundles. A spa gift card is versatile and lets the recipient choose their own treatment, from facials and massages to sauna sessions and cold plunge experiences. Sway Wellness Spa offers gift cards in any amount that are redeemable for treatments, products, and memberships, making them a thoughtful gift for anyone who values relaxation and self-care.",
                },
              },
              {
                "@type": "Question",
                name: "What is a CBD massage and what are the benefits?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A CBD massage is a targeted massage experience that uses CBD-infused products to help calm the nervous system and release stubborn muscle tension. It is especially effective for post-workout soreness, chronic tightness, and overall stress relief. The CBD provides immediate cooling comfort and can help you feel lighter, calmer, and more mobile. Sway Wellness Spa offers CBD massage as part of their treatment menu, using award-winning CBD relief cream and body oil.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Glow Getter facial?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Glow Getter is a signature facial at Sway Wellness Spa that delivers a dewy, luminous complexion using antioxidant-rich botanicals and advanced hydration techniques. It gently exfoliates and restores balance to tired, dull skin, leaving you fresh-faced and radiant. It pairs well with at-home skincare from Eminence Organics, such as the Kombucha Microbiome Foaming Cleanser and Birch Water Purifying Essence, to extend the post-facial glow.",
                },
              },
            ],
          }),
        }}
      />

    </div>
  );
}
