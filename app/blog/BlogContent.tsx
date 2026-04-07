"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- DATA ---------- */

const blogs = [
  {
    slug: "sway-membership-tiers",
    title: "Introducing Sway's New Membership Tiers: Essential, Premier & Ultimate",
    summary:
      "We just launched three membership tiers designed to match exactly where you are in your wellness journey. Here's what's new, what's included, and which tier is right for you.",
    tag: "Membership",
    image: "/assets/homepage_photo6.jpg",
    featured: true,
  },
  {
    slug: "best-date-night-ideas-denver",
    title: "Best Date Night Ideas in Denver",
    summary:
      "The best date night ideas in Denver: start with a couples massage at Sway on Larimer Square, then walk to dinner. Plus romantic restaurants, rooftop bars, live jazz, and more.",
    tag: "Denver",
    image: "/assets/blog40.jpg",
  },
  {
    slug: "maven-hotel-denver-spa",
    title: "Maven Hotel + Sway: AI-Powered Massage Near Dairy Block Denver",
    summary:
      "Staying at The Maven Hotel in Denver? Book a 60-minute Aescape robot massage at Sway Wellness Spa on Larimer Square — just 0.6 miles from Dairy Block.",
    tag: "Partnership",
    image: "/assets/maven-hotel.jpg",
  },
  {
    slug: "salt-stone-vs-hot-stone-massage",
    title: "Salt Stone vs Hot Stone Massage: Why Himalayan Salt Wins",
    summary:
      "Salt stone and hot stone massage are not the same. Learn the key differences, benefits of Himalayan salt stones, and what real Sway guests are saying.",
    tag: "Massage",
    image: "/assets/saltstoneblog.jpg",
  },
  {
    slug: "things-to-do-in-denver-at-night",
    title: "Best Things to Do in Denver at Night",
    summary:
      "14 of the best things to do in Denver at night — from Larimer Square dining and Red Rocks concerts to rooftop bars, Meow Wolf, and evening spa treatments.",
    tag: "Denver",
    image: "/assets/background.png",
  },
  {
    slug: "best-day-spa-in-america",
    title: "#4 Best Day Spa in America: Sway's First Year",
    summary:
      "USA Today 10Best voted Sway #4 Best Day Spa in America. A look back at year one on Larimer Square and what's inside Denver's modern wellness club.",
    tag: "Award",
    image: "/assets/homepage_photo_outside.jpg",
    featured: true,
  },
  {
    slug: "holiday-wellness-guide",
    title: "Your Wellness Guide Is Here",
    summary:
      "A modern holiday wellness gift guide curated by Sway — featuring restorative spa experiences, glow-enhancing facials, elevated self-care rituals, and beautifully designed moments.",
    tag: "Holiday",
    image: "/assets/blog38.jpg",
  },
  {
    slug: "80-minute-massage",
    title: "Take Time for You: Why an 80-Minute Massage Is the Ultimate Reset",
    summary:
      "Relax fully with an 80-minute massage at Sway Wellness Spa. Extra time, specialty techniques, and total rejuvenation make it the ultimate reset.",
    tag: "Massage",
    image: "/assets/blog25.jpg",
  },
  {
    slug: "post-summer-skin-recovery",
    title: "Repair & Refresh: Post-Summer Skin Recovery Starts Now",
    summary:
      "Restore your glow after summer with SWAY's hydrating facials, LED therapy, and expert skincare — designed to repair sun damage and rejuvenate your skin.",
    tag: "Skincare",
    image: "/assets/blog23.jpg",
  },
  {
    slug: "aescape",
    title: "AI Meets Recovery: Reset with Aescape",
    summary:
      "Meet Aescape: the world's first fully autonomous robot massage — only at Sway Wellness Spa in downtown Denver.",
    tag: "Technology",
    image: "/assets/blog22.jpg",
  },
  {
    slug: "glow-up-before-you-show-up",
    title: "Glow Up Before You Show Up: Spa for Students",
    summary:
      "College life is stressful. Discover Sway's spa treatments designed for students — from facials to massages — that help you recharge, refocus, and feel your best.",
    tag: "Wellness",
    image: "/assets/blog21.jpg",
  },
  {
    slug: "train-like-an-athlete",
    title: "Train Like an Athlete, Recover Like an Athlete",
    summary:
      "Discover how strategic recovery methods like sports massage and advanced therapies help you maximize performance, prevent injury, and feel your best.",
    tag: "Recovery",
    image: "/assets/blog20.jpg",
  },
  {
    slug: "give-wellness-get-wellness",
    title: "Give Wellness, Get Wellness: Your Kind of Referral Program",
    summary:
      "Share the gift of wellness with Sway's seamless referral program. Earn free Boost treatments for every friend you refer.",
    tag: "Community",
    image: "/assets/blog19.jpg",
  },
  {
    slug: "sun-protection-post-sun-care",
    title: "The Ultimate Guide to Sun Protection & Post-Sun Skin Care",
    summary:
      "From daily SPF to after-sun recovery, discover expert tips and esthetician-approved products that protect, repair, and nourish your skin all year round.",
    tag: "Skincare",
    image: "/assets/blog18.jpg",
  },
  {
    slug: "summer-prep-guide",
    title: "Summer Starts with Skin: Sway's Pre-Summer Prep Guide",
    summary:
      "Get summer-ready with lymphatic massages, microcurrent facials, and hydrating treatments that prep your skin and body for sun-soaked days.",
    tag: "Skincare",
    image: "/assets/blog15.jpg",
  },
  {
    slug: "may-memberships",
    title: "May Memberships at Sway Wellness Spa",
    summary:
      "Discover the ultimate retreat for your body and mind with exclusive $99/month memberships, tailored treatments, and science-backed benefits.",
    tag: "Wellness",
    image: "/assets/blog17.jpg",
  },
  {
    slug: "mothers-day-gift-guide",
    title: "Moms Deserve Sway More: A Mother's Day Spa Day Gift Guide",
    summary:
      "Celebrate the amazing mom in your life with spa treatments, gift cards, and memberships that help her relax, recharge, and feel truly appreciated.",
    tag: "Holiday",
    image: "/assets/blog16.jpg",
  },
  {
    slug: "denver-wellness-club",
    title: "Denver's Most Anticipated Wellness Club",
    summary:
      "Discover Sway, Denver's most anticipated wellness club, blending science-backed facials, massages, sauna, cold plunge, and more.",
    tag: "Wellness",
    image: "/assets/homepage_photo_outside.jpg",
  },
  {
    slug: "sway-spa-membership",
    title: "Sway Spa Membership: Your 2025 Wellness Transformation",
    summary:
      "Invest in self-care with a Sway Spa membership! Enjoy monthly facials, massages, exclusive access & more.",
    tag: "Membership",
    image: "/assets/blog2.jpg",
  },
  {
    slug: "bridal-skincare",
    title: "Bridal Skincare: Get Wedding-Ready Skin with Sway Facials",
    summary:
      "Achieve radiant, wedding-ready skin with consistent facials at Sway. Our tailored treatments will help you glow on your big day.",
    tag: "Bridal",
    image: "/assets/blog3.jpg",
  },
  {
    slug: "vitamin-c-facial",
    title: "Winter Skincare: Brighten Your Skin with Sway's Vitamin C Facial",
    summary:
      "Combat winter dullness with Sway's Dr. Dennis Vitamin C Facial. Brighten, hydrate, and protect your skin for a radiant glow.",
    tag: "Skincare",
    image: "/assets/blog4.jpg",
  },
  {
    slug: "himalayan-salt-stone-massage",
    title: "Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa",
    summary:
      "Melt away stress with Sway's Himalayan Salt Stone Massage. Detox, relax, and restore with this mineral-rich healing experience.",
    tag: "Massage",
    image: "/assets/blog5.jpg",
  },
  {
    slug: "valentines-day-wellness",
    title: "Celebrate Valentine's Day Through Wellness",
    summary:
      "Reimagine Valentine's Day as a celebration of connection, self-care, and wellness. Explore date ideas, Galentine's spa days, and self-love rituals at Sway.",
    tag: "Holiday",
    image: "/assets/blog6.jpg",
  },
  {
    slug: "cold-plunge",
    title: "Cold Outside? Cold Plunge: Why Cold Plunges Are a Hot Trend in Wellness",
    summary:
      "Explore the rising wellness trend of cold plunges and learn how this invigorating therapy can reduce inflammation, boost mood, and improve sleep.",
    tag: "Recovery",
    image: "/assets/blog7.jpg",
  },
  {
    slug: "infrared-vs-traditional-sauna",
    title: "Infrared Sauna vs. Traditional Sauna: The Boom of Saunas in the U.S.",
    summary:
      "Discover the key differences and benefits between infrared and traditional saunas, and why the sauna trend is booming across the U.S.",
    tag: "Wellness",
    image: "/assets/blog8.jpg",
  },
  {
    slug: "spring-reset",
    title: "Spring Reset: Detox Your Skin & Body with Sway",
    summary:
      "Spring is all about renewal — detox with Sway's Salt Stone Massage, Pore Perfection Facial, and Remedy Room experience to refresh and rejuvenate.",
    tag: "Skincare",
    image: "/assets/blog9.jpg",
  },
  {
    slug: "tech-and-wellness",
    title: "How Technological Innovation is Transforming Spa Treatments",
    summary:
      "Explore the future of wellness with tech-forward spa treatments like AI-powered massages, microcurrent facials, and LED light therapy at Sway.",
    tag: "Technology",
    image: "/assets/blog10.jpg",
  },
  {
    slug: "allergy-season-skincare",
    title: "Allergy Season? Best Treatments to Soothe Sensitive Skin",
    summary:
      "Spring allergies causing skin irritation? Discover Sway's top treatments like the Sensitive Silk Facial and LightStim LED therapy to calm and heal sensitive skin.",
    tag: "Skincare",
    image: "/assets/allergy.jpg",
  },
  {
    slug: "science-of-relaxation",
    title: "Science of Relaxation: How Spa Treatments Ease Stress & Anxiety",
    summary:
      "Discover how Sway uses science-backed treatments like massage, cold plunge, and sauna therapy to reduce stress and improve overall well-being.",
    tag: "Science",
    image: "/assets/blog11.jpg",
  },
  {
    slug: "infrared-pemf-mat",
    title: "Supercharge Your Massage: The Benefits of Infrared PEMF Mats",
    summary:
      "Discover how combining massage with cutting-edge Infrared PEMF Mats at Sway enhances pain relief, circulation, and recovery.",
    tag: "Technology",
    image: "/assets/blog12.jpg",
  },
  {
    slug: "sway-shop-finds",
    title: "From the Spa to You: The Best Sway Shop Finds for Ultimate Wellness",
    summary:
      "Explore Sway's curated selection of skincare, fragrances, and luxury wellness gifts to elevate your everyday self-care routine.",
    tag: "Retail",
    image: "/assets/blog13.jpg",
  },
  {
    slug: "bachelorette-spa-day",
    title: "The Ultimate Bachelorette Spa Day: Relax, Celebrate, Repeat!",
    summary:
      "Planning a bachelorette party? Discover why Sway Wellness Spa is the ultimate place to celebrate with your bridal crew in style and serenity.",
    tag: "Bridal",
    image: "/assets/blog14.jpg",
  },
];

/* ---------- HELPERS ---------- */

const ALL_TAGS = Array.from(new Set(blogs.map((b) => b.tag))).sort();

const featured = blogs.find((b) => b.featured) ?? blogs[0];
const remaining = blogs.filter((b) => b !== featured);

/* ---------- COMPONENT ---------- */

export default function BlogContent() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? remaining.filter((b) => b.tag === activeTag)
    : remaining;

  return (
    <div className="w-full bg-[#F7F4E9] font-vance text-[#113D33]">
      {/* ---------- HERO ---------- */}
      <section className="bg-[#113D33] text-white px-6 pt-28 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-light tracking-tight"
          >
            The Sway Edit
          </motion.h1>

          <p className="sr-only">
            The Sway Edit is the wellness blog by Sway Wellness Spa, located at
            1428 Larimer St. on Larimer Square in Denver, CO. {blogs.length}{" "}
            articles covering massage therapy, skincare, recovery science,
            wellness technology, seasonal self-care, and Denver lifestyle.
            Written by the Sway Wellness Team. Sway offers 18 massage types,
            13 facial treatments across 3 tiers, the Remedy Room recovery
            circuit, and AI-powered Aescape robot massage. Voted #4 Best Day Spa in America by USA
            Today 10Best. Book at swaywellnessspa.com or call (303) 476-6150.
          </p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-base md:text-lg opacity-80 max-w-2xl mx-auto"
          >
            Expert wellness advice, skincare science, recovery tips, and Denver
            lifestyle — from the team at Sway Wellness Spa.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 text-sm opacity-50"
          >
            {blogs.length} articles
          </motion.p>
        </div>
      </section>

      {/* ---------- FEATURED POST ---------- */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl overflow-hidden bg-white border border-[#113D33]/10 hover:border-[#113D33]/25 hover:shadow-xl transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[240px] md:h-[360px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 bg-[#113D33] text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide">
                  Featured
                </span>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.15em] text-[#113D33]/45 font-semibold">
                  {featured.tag}
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold leading-snug group-hover:underline underline-offset-4">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm md:text-base opacity-70 leading-relaxed">
                  {featured.summary}
                </p>
                <span className="mt-5 inline-block text-sm font-bold text-[#113D33]">
                  Read article →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- CATEGORY FILTERS ---------- */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === null
                  ? "bg-[#113D33] text-white"
                  : "bg-[#113D33]/8 text-[#113D33]/70 hover:bg-[#113D33]/15"
              }`}
            >
              All
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? "bg-[#113D33] text-white"
                    : "bg-[#113D33]/8 text-[#113D33]/70 hover:bg-[#113D33]/15"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BLOG GRID ---------- */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag ?? "all"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group block bg-white rounded-2xl border border-[#113D33]/8 overflow-hidden hover:border-[#113D33]/20 hover:shadow-lg transition-all"
                >
                  <div className="relative h-[180px]">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 right-3 bg-[#113D33] text-white text-[11px] px-2.5 py-1 rounded-full font-semibold tracking-wide">
                      {blog.tag}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="text-lg font-semibold leading-snug group-hover:underline underline-offset-4 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="mt-2 text-sm opacity-65 leading-relaxed line-clamp-2">
                      {blog.summary}
                    </p>
                    <span className="mt-3 inline-block text-sm font-bold text-[#113D33]">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-[#113D33]/50 py-16">
              No articles found for &ldquo;{activeTag}&rdquo;.
            </p>
          )}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[#113D33] text-white px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Ready to Experience Sway?
          </h2>
          <p className="mt-4 text-base opacity-80">
            Book a massage, facial, or recovery session at Denver&apos;s
            award-winning wellness club.
          </p>
          <Link
            href="/locations/denver-larimer"
            className="mt-6 inline-flex items-center justify-center bg-white text-[#113D33] px-8 py-3.5 text-sm font-bold rounded-xl hover:bg-white/90 transition-all"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
