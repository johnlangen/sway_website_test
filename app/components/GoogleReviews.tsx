"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

/* ------------------------------------------------------------------
   Star SVG (reused in several spots)
   ------------------------------------------------------------------ */

function Star({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} text-yellow-400 fill-current`} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Google "G" logo for attribution
   ------------------------------------------------------------------ */

function GoogleLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Shared data-fetching hook
   ------------------------------------------------------------------ */

function useReviews() {
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .catch(console.error);
  }, []);

  return data;
}

/* ==================================================================
   FULL REVIEWS SECTION
   Used on homepage and location pages inside a snap-section or
   regular section wrapper.
   ================================================================== */

export default function GoogleReviews() {
  const data = useReviews();

  if (!data || data.reviews.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-5xl mx-auto font-vance px-4"
    >
      {/* Header */}
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          What Our Guests Are Saying
        </h2>
        <div className="inline-flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5" />
            ))}
          </div>
          <span className="font-semibold text-lg">{data.rating}</span>
          <span className="opacity-60 text-sm">
            ({data.totalReviews} reviews on Google)
          </span>
          <GoogleLogo className="w-4 h-4 ml-1" />
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        {data.reviews.slice(0, 3).map((review) => (
          <div
            key={review.author}
            className="rounded-2xl bg-white/70 border border-[#113D33]/10 p-4 md:p-6 flex flex-col"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            {/* Text — truncated */}
            <p className="text-sm leading-relaxed opacity-80 mb-3 line-clamp-3 md:line-clamp-4">
              &ldquo;{review.text}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-auto flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#113D33]/10 flex items-center justify-center text-xs font-semibold text-[#113D33]">
                {review.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{review.author}</p>
                <p className="text-xs opacity-50">{review.relativeTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attribution */}
      <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 opacity-40 text-xs">
        <GoogleLogo />
        <span>Reviews from Google</span>
      </div>
    </motion.div>
  );
}

/* ==================================================================
   REVIEW BADGE (inline)
   Used in booking flows and near CTAs.
   ================================================================== */

export function ReviewBadge() {
  const data = useReviews();

  if (!data) return null;

  return (
    <a
      href="https://www.google.com/maps/place/Sway+Wellness+Spa+Larimer/@39.7476,-105.0004,17z/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition"
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5" />
        ))}
      </div>
      <span className="font-semibold">{data.rating}</span>
      <span className="opacity-60">({data.totalReviews} reviews)</span>
      <GoogleLogo className="w-3.5 h-3.5 ml-0.5" />
    </a>
  );
}
