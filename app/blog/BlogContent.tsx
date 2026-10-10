"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------- DATA ---------- */

const blogs = [
  {
    slug: "cold-plunge-denver-guide",
    title: "Best Cold Plunge in Denver: 9 Spots + Sauna Combos (2026)",
    summary:
      "Every great place to get cold in Denver: guided contrast circuits at Sway Larimer, the big plunge in RiNo, contrast cabins in Central Park, recovery studios around town, and natural mountain plunges.",
    tag: "Recovery",
    image: "/assets/coldplunge.jpg",
    featured: true,
  },
  {
    slug: "fathers-day-gift-guide",
    title: "A Father's Day in Denver Your Dad Will Actually Remember",
    summary:
      "He has enough ties. Cold plunge, sauna, sports massage, Aescape AI, and a full Sway-anchored Father's Day itinerary on Larimer Square.",
    tag: "Holiday",
    image: "/assets/fathers-day-gift-guide.jpg",
  },
  {
    slug: "recovery-denver",
    title: "Recovery in Denver: Sauna, Cold Plunge & Robot Massage",
    summary:
      "Your complete guide to recovery in Denver: traditional sauna, cold plunge, compression therapy, and LED in the Remedy Room, plus Aescape robot massage at Sway Larimer.",
    tag: "Recovery",
    image: "/assets/remedy-room.jpg",
  },
  {
    slug: "sway-membership-tiers",
    title:
      "Introducing Sway's New Membership Tiers: Essential, Premier & Ultimate",
    summary:
      "We just launched three membership tiers designed to match exactly where you are in your wellness journey. Here's what's new, what's included, and which tier is right for you.",
    tag: "Membership",
    image: "/assets/join2.jpg",
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
      "Staying at The Maven Hotel in Denver? Book a 60-minute Aescape robot massage at Sway Wellness Spa on Larimer Square, just 0.6 miles from Dairy Block.",
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
      "14 of the best things to do in Denver at night, from Larimer Square dining and Red Rocks concerts to rooftop bars, Meow Wolf, and evening spa treatments.",
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
  },
  {
    slug: "holiday-wellness-guide",
    title: "Your Wellness Guide Is Here",
    summary:
      "A modern holiday wellness gift guide curated by Sway, featuring restorative spa experiences, glow-enhancing facials, elevated self-care rituals, and beautifully designed moments.",
    tag: "Holiday",
    image: "/assets/blog38.jpg",
  },
  {
    slug: "80-minute-massage",
    title: "Take Time for You: Why a Longer Massage Is the Ultimate Reset",
    summary:
      "Sway's longer massages run 70 and 90 minutes. Extra time for problem areas and a deeper full-body reset.",
    tag: "Massage",
    image: "/assets/blog25.jpg",
  },
  {
    slug: "post-summer-skin-recovery",
    title: "Repair & Refresh: Post-Summer Skin Recovery Starts Now",
    summary:
      "Restore your glow after summer with SWAY's hydrating facials, LED therapy, and expert skincare, designed to repair sun damage and rejuvenate your skin.",
    tag: "Skincare",
    image: "/assets/blog23.jpg",
  },
  {
    slug: "aescape",
    title: "AI Meets Recovery: Reset with Aescape",
    summary:
      "Meet Aescape: the world's first fully autonomous robot massage, only at Sway Wellness Spa in downtown Denver.",
    tag: "Technology",
    image: "/assets/blog22.jpg",
  },
  {
    slug: "glow-up-before-you-show-up",
    title: "Glow Up Before You Show Up: Spa for Students",
    summary:
      "College life is stressful. Discover Sway's spa treatments designed for students, from facials to massages, that help you recharge, refocus, and feel your best.",
    tag: "Wellness",
    image: "/assets/blog21.jpg",
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
    slug: "mothers-day-gift-guide",
    title: "Moms Deserve Sway More: A Mother's Day Spa Day Gift Guide",
    summary:
      "Celebrate the amazing mom in your life with spa treatments, gift cards, and memberships that help her relax, recharge, and feel truly appreciated.",
    tag: "Holiday",
    image: "/assets/blog16.jpg",
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
      "Combat winter dullness with Sway's Dr. Dennis Gross Vitamin C Facial. Brighten, hydrate, and protect your skin for a radiant glow.",
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
    slug: "spring-reset",
    title: "Spring Reset: Detox Your Skin & Body with Sway",
    summary:
      "Spring is all about renewal. Detox with Sway's Salt Stone Massage, Pore Perfection Facial, and Remedy Room experience to refresh and rejuvenate.",
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
    title: "PEMF Mat Benefits: What It Does and Whether It Works",
    summary:
      "What a PEMF mat does, what the research actually shows, when to use one, and how to try it with a massage at Sway.",
    tag: "Technology",
    image: "/assets/pemf.jpg",
  },
  {
    slug: "sway-shop-finds",
    title:
      "From the Spa to You: The Best Sway Shop Finds for Ultimate Wellness",
    summary:
      "Explore Sway's curated selection of skincare, fragrances, and luxury wellness gifts to elevate your everyday self-care routine.",
    tag: "Retail",
    image: "/assets/blog13.jpg",
  },
  {
    slug: "bachelorette-spa-day",
    title: "Bachelorette Spa Packages in Denver for Your Bridal Crew",
    summary:
      "Planning a Denver bachelorette? Build a private group spa package with massages, facials, sauna, and cold plunge for the whole bridal party.",
    tag: "Bridal",
    image: "/assets/facial.jpg",
  },
];

/* ---------- HELPERS ---------- */

const ALL_TAGS = Array.from(new Set(blogs.map((b) => b.tag))).sort();

const featured = blogs.find((b) => b.featured) ?? blogs[0];

export default function BlogContent() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0 || activeTag !== null;
  const filtered = blogs.filter((blog) => {
    if (!searching && blog === featured) return false;
    return (
      (!activeTag || blog.tag === activeTag) &&
      `${blog.title} ${blog.summary} ${blog.tag}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    );
  });
  return (
    <div className="sway-journal">
      <section className="sway-journal-intro">
        <p className="sway-eyebrow">The wellness journal</p>
        <h1>The Sway Edit.</h1>
        <div>
          <p>
            Small discoveries.
            <br />
            Better everyday rituals.
          </p>
          <p>
            Explore massage, skincare, recovery, and life in Denver with the
            team at Sway.
          </p>
        </div>
      </section>
      <section
        className="sway-journal-feature"
        aria-labelledby="featured-story"
      >
        <Link
          href={`/blog/${featured.slug}`}
          className="sway-journal-feature-image"
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
            className="object-cover"
          />
        </Link>
        <div>
          <p className="sway-eyebrow">Editor’s pick · {featured.tag}</p>
          <h2 id="featured-story">
            <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p>{featured.summary}</p>
          <Link href={`/blog/${featured.slug}`} className="sway-text-link">
            Read the guide ↗
          </Link>
        </div>
      </section>
      <section
        className="sway-journal-library"
        aria-labelledby="journal-library-heading"
      >
        <div className="sway-section-heading">
          <div>
            <p className="sway-eyebrow">Follow your curiosity</p>
            <h2 id="journal-library-heading">A little more to explore.</h2>
          </div>
          <label className="sway-journal-search">
            Search the journal
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try massage, skincare, Denver…"
            />
          </label>
        </div>
        <label className="sway-journal-mobile-topic">
          Topic
          <select
            value={activeTag ?? ""}
            onChange={(event) => setActiveTag(event.target.value || null)}
          >
            <option value="">All topics</option>
            {ALL_TAGS.map((tag) => (
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <div
          className="sway-journal-topics"
          aria-label="Filter articles by topic"
        >
          <button
            type="button"
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
          >
            All topics
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              type="button"
              key={tag}
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="sway-journal-count" role="status">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          {activeTag ? ` in ${activeTag}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
        <div className="sway-journal-grid">
          {filtered.map((blog) => (
            <article key={blog.slug}>
              <Link
                href={`/blog/${blog.slug}`}
                className="sway-journal-story-image"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={blog.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="object-cover"
                />
              </Link>
              <p className="sway-eyebrow">{blog.tag}</p>
              <h3>
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h3>
              <p>{blog.summary}</p>
              <Link
                href={`/blog/${blog.slug}`}
                className="sway-text-link"
                aria-label={`Read ${blog.title}`}
              >
                Read story ↗
              </Link>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="sway-journal-empty">
            <h3>No stories found just yet.</h3>
            <p>Try another phrase, or explore all of the journal.</p>
            <button
              type="button"
              className="sway-button"
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
            >
              Clear filters <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </section>
      <section className="sway-offer-close">
        <p className="sway-eyebrow">From inspiration to experience</p>
        <h2>Make a little room for you.</h2>
        <p>Find your next massage, facial, or recovery ritual.</p>
        <Link href="/treatments" className="sway-text-link">
          Explore the experiences ↗
        </Link>
      </section>
    </div>
  );
}
