import { NextResponse } from "next/server";

const PLACE_ID = "ChIJtRQkUu55bIcR91jycB7Jcns"; // Sway Wellness Spa Larimer

// ISR: regenerate at most once every 24 hours
export const revalidate = 86400;

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API key" },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: "Google API error", details: data.status },
        { status: 502 }
      );
    }

    const result = data.result;

    return NextResponse.json({
      rating: result.rating,
      totalReviews: result.user_ratings_total,
    });
  } catch (err) {
    console.error("Error fetching Google reviews:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
