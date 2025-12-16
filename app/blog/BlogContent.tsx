"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// --- Blog Index ---
const blogs = [
  {
    slug: "holiday-wellness-guide",
    title: "Your Wellness Guide Is Here",
    summary:
      "A modern holiday wellness gift guide—thoughtful spa experiences, restorative self-care, and curated moments designed by Sway.",
    tag: "Holiday",
    image: "/assets/blog26.png",
  },  

  {
    slug: "80-minute-massage",
    title: "Take Time for You: Why an 80-Minute Massage Is the Ultimate Reset",
    summary:
      "Relax fully with an 80-minute massage at Sway Wellness Spa. Extra time, specialty techniques, and total rejuvenation make it the ultimate reset.",
    tag: "Massage",
    image: "/assets/blog25.png",
  },  
  {
    slug: "post-summer-skin-recovery",
    title: "Repair & Refresh: Post-Summer Skin Recovery Starts Now",
    summary:
      "Restore your glow after summer with SWAY’s hydrating facials, LED therapy, and expert skincare—designed to repair sun damage and rejuvenate your skin.",
    tag: "Skincare",
    image: "/assets/blog23.png",
  },  
  {
    slug: "aescape",
    title: "AI  Meets Recovery: Reset with Aescape",
    summary:
      "Meet Aescape: the world’s first fully autonomous robot massage—only at Sway Wellness Spa in downtown Denver. The Robot Massage Built for Denver’s Innovators",
    tag: "Technology",
    image: "/assets/blog22.png",
  },  
  {
    slug: "glow-up-before-you-show-up",
    title: "Glow Up Before You Show Up: Spa for Students",
    summary:
      "College life is stressful. Discover Sway’s spa treatments designed for students—from facials to massages—that help you recharge, refocus, and feel your best.",
    tag: "Wellness",
    image: "/assets/blog21.png",
  },
  
  {
    slug: "train-like-an-athlete",
    title: "Train Like an Athlete, Recover Like an Athlete",
    summary:
      "Discover how strategic recovery methods like sports massage and advanced therapies help you maximize performance, prevent injury, and feel your best.",
    tag: "Recovery",
    image: "/assets/blog20.png",
  },
  
  {
    slug: "give-wellness-get-wellness",
    title: "Give Wellness, Get Wellness: Your Kind of Referral Program",
    summary:
      "Share the gift of wellness with Sway’s seamless referral program. Earn free Boost treatments for every friend you refer—because wellness is better together.",
    tag: "Community",
    image: "/assets/blog19.png",
  },  
  {
    slug: "sun-protection-post-sun-care",
    title: "The Ultimate Guide to Sun Protection & Post-Sun Skin Care",
    summary:
      "From daily SPF to after-sun recovery, discover expert tips and esthetician-approved products that protect, repair, and nourish your skin all year round.",
    tag: "Skincare",
    image: "/assets/blog18.png",
  },  
  {
    slug: "summer-prep-guide",
    title: "Summer Starts with Skin: Sway’s Pre-Summer Prep Guide",
    summary:
      "Get summer-ready with lymphatic massages, microcurrent facials, and hydrating treatments that prep your skin and body for sun-soaked days.",
    tag: "Skincare",
    image: "/assets/blog15.png",
  },
  {
    slug: "may-memberships",
    title: "May Memberships at Sway Wellness Spa",
    summary:
      "Discover the ultimate retreat for your body and mind with exclusive $99/month memberships, tailored treatments, and science-backed benefits.",
    tag: "Wellness",
    image: "/assets/blog17.png",
  },
  
  {
    slug: "mothers-day-gift-guide",
    title: "Moms Deserve Sway More: A Mother’s Day Spa Day Gift Guide",
    summary:
      "Celebrate the amazing mom in your life with spa treatments, gift cards, and memberships that help her relax, recharge, and feel truly appreciated.",
    tag: "Holiday",
    image: "/assets/blog16.png",
  },  
  {
    slug: "denver-wellness-club",
    title: "Denver’s Most Anticipated Wellness Club",
    summary:
      "Discover Sway, Denver’s most anticipated wellness club, blending science-backed facials, massages, sauna, cold plunge, and more.",
    tag: "Wellness",
    image: "/assets/homepage_photo_outside.png",
  },
  {
    slug: "sway-spa-membership",
    title: "Sway Spa Membership: Your 2025 Wellness Transformation",
    summary:
      "Invest in self-care with a Sway Spa membership! Enjoy monthly facials, massages, exclusive access & more. Start your 2025 wellness journey today!",
    tag: "Membership",
    image: "/assets/blog2.png",
  },
  {
    slug: "bridal-skincare",
    title: "Bridal Skincare: Get Wedding-Ready Skin with Sway Facials",
    summary:
      "Achieve radiant, wedding-ready skin with consistent facials at Sway. Our tailored treatments will help you glow on your big day.",
    tag: "Bridal",
    image: "/assets/blog3.png",
  },
  {
    slug: "vitamin-c-facial",
    title: "Winter Skincare: Brighten Your Skin with Sway's Vitamin C Facial",
    summary:
      "Combat winter dullness with Sway's Dr. Dennis Vitamin C Facial. Brighten, hydrate, and protect your skin for a radiant glow.",
    tag: "Skincare",
    image: "/assets/blog4.png",
  },
  {
    slug: "himalayan-salt-stone-massage",
    title: "Himalayan Salt Stone Massage: Ultimate Relaxation at Sway Spa",
    summary:
      "Melt away stress with Sway's Himalayan Salt Stone Massage. Detox, relax, and restore with this mineral-rich healing experience.",
    tag: "Massage",
    image: "/assets/blog5.png",
  },
  {
    slug: "valentines-day-wellness",
    title: "Celebrate Valentine's Day Through Wellness",
    summary:
      "Reimagine Valentine’s Day as a celebration of connection, self-care, and wellness. Explore date ideas, Galentine’s spa days, and self-love rituals at Sway.",
    tag: "Holiday",
    image: "/assets/blog6.png",
  },
  {
    slug: "cold-plunge",
    title: "Cold Outside? Cold Plunge: Why Cold Plunges Are a Hot Trend in Wellness",
    summary:
      "Explore the rising wellness trend of cold plunges and learn how this invigorating therapy can reduce inflammation, boost mood, and improve sleep.",
    tag: "Therapy",
    image: "/assets/blog7.png",
  },
  {
    slug: "infrared-vs-traditional-sauna",
    title: "Infrared Sauna vs. Traditional Sauna: The Boom of Saunas in the U.S.",
    summary:
      "Discover the key differences and benefits between infrared and traditional saunas, and why the sauna trend is booming across the U.S.",
    tag: "Wellness",
    image: "/assets/blog8.png",
  },
  {
    slug: "spring-reset",
    title: "Spring Reset: Detox Your Skin & Body with Sway",
    summary:
      "Spring is all about renewal—detox with Sway’s Salt Stone Massage, Pore Perfection Facial, and Remedy Room experience to refresh and rejuvenate.",
    tag: "Seasonal",
    image: "/assets/blog9.png",
  },
  {
    slug: "tech-and-wellness",
    title: "How Technological Innovation is Transforming Spa Treatments",
    summary:
      "Explore the future of wellness with tech-forward spa treatments like AI-powered massages, microcurrent facials, and LED light therapy at Sway.",
    tag: "Innovation",
    image: "/assets/blog10.png",
  },
  {
    slug: "allergy-season-skincare",
    title: "Allergy Season? Best Treatments to Soothe Sensitive Skin",
    summary:
      "Spring allergies causing skin irritation? Discover Sway’s top treatments like the Sensitive Silk Facial and LightStim LED therapy to calm and heal sensitive skin.",
    tag: "Skincare",
    image: "/assets/allergy.png",
  },
  {
    slug: "science-of-relaxation",
    title: "Science of Relaxation: How Spa Treatments Ease Stress & Anxiety",
    summary:
      "Discover how Sway uses science-backed treatments like massage, cold plunge, and sauna therapy to reduce stress and improve overall well-being.",
    tag: "Science",
    image: "/assets/blog11.png",
  },
  {
    slug: "infrared-pemf-mat",
    title: "Supercharge Your Massage: The Benefits of Infrared PEMF Mats",
    summary:
      "Discover how combining massage with cutting-edge Infrared PEMF Mats at Sway enhances pain relief, circulation, and recovery.",
    tag: "Technology",
    image: "/assets/blog12.png",
  },
  {
    slug: "sway-shop-finds",
    title: "From the Spa to You: The Best Sway Shop Finds for Ultimate Wellness",
    summary:
      "Explore Sway's curated selection of skincare, fragrances, and luxury wellness gifts to elevate your everyday self-care routine.",
    tag: "Retail",
    image: "/assets/blog13.png",
  },
  {
    slug: "bachelorette-spa-day",
    title: "The Ultimate Bachelorette Spa Day: Relax, Celebrate, Repeat!",
    summary:
      "Planning a bachelorette party? Discover why Sway Wellness Spa is the ultimate place to celebrate with your bridal crew in style and serenity.",
    tag: "Bridal",
    image: "/assets/blog14.png",
  },

];


export default function BlogContent() {
    return (
      <div className="bg-[#F7F4E9] min-h-screen text-black font-vance">
        {/* Banner */}
        <div className="w-full bg-[#113D33] text-white pt-32 pb-20 flex justify-center items-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            The Sway Edit
          </h1>
        </div>
  
        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={`/blog/${blog.slug}`}
                className="group relative block bg-white rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-[#e7e3d8] overflow-hidden"
              >
                <div className="h-40 bg-[#EBE7DC] flex items-center justify-center text-4xl text-[#113D33] font-bold">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={600}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span>✨</span>
                  )}
                </div>
  
                <div className="p-6 space-y-3">
                  <span className="absolute top-4 right-4 bg-[#113D33] text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide">
                    {blog.tag}
                  </span>
                  <h2 className="text-xl font-bold group-hover:text-[#113D33] transition">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-700">{blog.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }