"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

interface RatingData {
  rating: number;
  totalReviews: number;
}

interface CuratedReview {
  author: string;
  text: string;
  date: string;
}

/* ------------------------------------------------------------------
   Curated 5-star reviews (hand-picked, update periodically)
   ------------------------------------------------------------------ */

const CURATED_REVIEWS: CuratedReview[] = [
  // Page 1 — Mar 2026
  {
    author: "Jazmine Olson",
    text: "Got the hot stone massage with Steven and I left in a daze. I couldn\u2019t believe how much stress relief I got from one session. The space is very relaxing and Steven is superb. I immediately signed up for a membership and the member lounge has made destressing before my massage even better.",
    date: "Mar 2026",
  },
  {
    author: "Kristy Wingfield",
    text: "I love being a member and coming to Sway. My facials with Bri have been not only absolutely amazing for my skin, but I also have fun with her getting them done. Steven\u2019s massages are awesome as well.",
    date: "Mar 2026",
  },
  {
    author: "Reilly Moncrief",
    text: "I cannot rave about this place enough! I\u2019ve been seeing Bri for facials for a few months now and cannot believe the results. I have always struggled with acne and wish I\u2019d taken photos at the start of my journey to show the progress.",
    date: "Mar 2026",
  },
  // Page 2 — Mar 2026
  {
    author: "Sabrina Kazmi",
    text: "I had a \u201Cforever young\u201D facial with Bri and it was amazing! She was so sweet and informative and let me know exactly what she was doing and why. You can tell she is super passionate about what she does, I can\u2019t recommend her enough!! My skin also looks and feels phenomenal. Johnny at front reception was also amazing, he was super helpful and made me feel welcome as soon as I walked in. 10/10 I can\u2019t wait to come back!",
    date: "Mar 2026",
  },
  {
    author: "Jessica Koniuszewski",
    text: "Incredible deep tissue massage!! Pressure was perfect and I left feeling relaxed and reset. Stephen was amazing. The front desk help from Jonny was great \u2014 he was the gift of connection and hospitality. 10/10 experience.",
    date: "Mar 2026",
  },
  {
    author: "Angie Fletcher",
    text: "The person at the front desk was very friendly. Stephen who did my massage did a great job. It was a good combination of relaxation and therapeutic. I would definitely go again if ever back in town.",
    date: "Mar 2026",
  },
  // Page 3 — Jan/Feb 2026
  {
    author: "Ricardo Laremont",
    text: "If you\u2019re looking for the ultimate recovery spot, Sway Wellness in Larimer Square is a total game-changer. I visited right after a trail race with legs that felt like lead, and I walked out feeling like a new person!",
    date: "Feb 2026",
  },
  {
    author: "Evan Marx",
    text: "Wow. Wow. Wow. Am I happy I chose to make my first massage of my new path towards wellness at Sway. So much, in fact, that they turned a guy that never joins subscriptions into a monthly member. The value you get is unbelievable.",
    date: "Jan 2026",
  },
  {
    author: "Lilly Sheppard",
    text: "Brianna is literally the best aesthetician I have received a treatment from. She was super gentle, knowledgeable, and fostered an extremely relaxing environment. 10/10 glow getter facial.",
    date: "Jan 2026",
  },
];

const PAGES = [
  CURATED_REVIEWS.slice(0, 3),
  CURATED_REVIEWS.slice(3, 6),
  CURATED_REVIEWS.slice(6, 9),
];

/* ------------------------------------------------------------------
   Shared constants
   ------------------------------------------------------------------ */

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Sway+Wellness+Spa+Larimer&query_place_id=ChIJtRQkUu55bIcR91jycB7Jcns";

/* ------------------------------------------------------------------
   Star SVG
   ------------------------------------------------------------------ */

function Star({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={`${className} text-yellow-400 fill-current`}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Google "G" logo
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
   Arrow button
   ------------------------------------------------------------------ */

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#113D33]/15 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-[#113D33]/30 transition shrink-0"
      aria-label={direction === "left" ? "Previous reviews" : "Next reviews"}
    >
      <svg
        className="w-4 h-4 text-[#113D33]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------
   Rating display helper
   ------------------------------------------------------------------ */

function formatRating(rating: number) {
  return Number.isInteger(rating) ? `${rating}.0` : String(rating);
}

/* ------------------------------------------------------------------
   Shared data-fetching hook (live rating + count only)
   ------------------------------------------------------------------ */

function useRating() {
  const [data, setData] = useState<RatingData | null>(null);

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
   FULL REVIEWS SECTION — paginated carousel
   ================================================================== */

export default function GoogleReviews() {
  const ratingData = useRating();
  const [page, setPage] = useState(0);

  const prev = () => setPage((p) => (p - 1 + PAGES.length) % PAGES.length);
  const next = () => setPage((p) => (p + 1) % PAGES.length);

  // Fallback rating while API loads
  const rating = ratingData?.rating ?? 5;
  const totalReviews = ratingData?.totalReviews ?? 120;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-5xl mx-auto font-vance px-4"
    >
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          What Our Guests Are Saying
        </h2>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5" />
            ))}
          </div>
          <span className="font-semibold text-lg">
            {formatRating(rating)}
          </span>
          <span className="opacity-60 text-sm">
            ({totalReviews} reviews on Google)
          </span>
          <GoogleLogo className="w-4 h-4 ml-1" />
        </a>
      </div>

      {/* Carousel */}
      <div className="flex items-center gap-3 md:gap-4">
        <ArrowButton direction="left" onClick={prev} />

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
            >
              {PAGES[page].map((review) => (
                <div
                  key={review.author}
                  className="rounded-2xl bg-white/70 border border-[#113D33]/10 p-4 md:p-5 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-xs md:text-sm leading-relaxed opacity-80 mb-3 line-clamp-4">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-auto flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#113D33]/10 flex items-center justify-center text-[10px] font-semibold text-[#113D33]">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{review.author}</p>
                      <p className="text-[10px] opacity-50">{review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <ArrowButton direction="right" onClick={next} />
      </div>

      {/* Page dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {PAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === page
                ? "bg-[#113D33] w-5"
                : "bg-[#113D33]/20 hover:bg-[#113D33]/40"
            }`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

      {/* Attribution + View All */}
      <div className="mt-3 md:mt-4 flex items-center justify-center gap-3 text-xs">
        <span className="flex items-center gap-1.5 opacity-40">
          <GoogleLogo />
          Reviews from Google
        </span>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4A776D] font-medium hover:underline"
        >
          View all {totalReviews} reviews &rarr;
        </a>
      </div>
    </motion.div>
  );
}

/* ==================================================================
   REVIEW BADGE (inline)
   Used in booking flows and near CTAs.
   ================================================================== */

export function ReviewBadge() {
  const ratingData = useRating();

  const rating = ratingData?.rating ?? 5;
  const totalReviews = ratingData?.totalReviews ?? 120;

  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition"
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5" />
        ))}
      </div>
      <span className="font-semibold">{formatRating(rating)}</span>
      <span className="opacity-60">({totalReviews} reviews)</span>
      <GoogleLogo className="w-3.5 h-3.5 ml-0.5" />
    </a>
  );
}

/* ==================================================================
   CLASSPASS BADGE (inline)
   Hardcoded rating — update periodically from ClassPass dashboard.
   ================================================================== */

export function ClassPassBadge() {
  return (
    <a
      href="https://classpass.com/studios/sway-wellness-spa-denver"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition"
    >
      <span className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5" />
        ))}
      </span>
      <span className="font-semibold">4.8</span>
      <span className="opacity-60">(694 ratings)</span>
      <span className="font-semibold ml-0.5">ClassPass</span>
    </a>
  );
}
