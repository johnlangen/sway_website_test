/* Server-side Google rating fetch for JSON-LD (homepage + Larimer layout).
 * Same Places call as /api/reviews, ISR-cached for 24h, so structured data
 * self-syncs with the live Google Business Profile instead of drifting.
 * Falls back to the last known values when the key is missing or the call
 * fails (update the fallback occasionally). */

const PLACE_ID = "ChIJtRQkUu55bIcR91jycB7Jcns"; // Sway Wellness Spa Larimer

export const RATING_FALLBACK = { rating: 4.9, totalReviews: 156 }; // as of 2026-07-13

export async function getGoogleRating(): Promise<{ rating: number; totalReviews: number }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return RATING_FALLBACK;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();
    if (data.status === "OK" && typeof data.result?.rating === "number") {
      return {
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total ?? RATING_FALLBACK.totalReviews,
      };
    }
  } catch {}
  return RATING_FALLBACK;
}
