import { NextResponse } from "next/server";
import { reviews, aggregateRating } from "@/lib/data/reviews";

export async function GET() {
  // TODO: Replace with live Google Business Profile Places API call
  // const liveReviews = await fetch(
  //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${process.env.GOOGLE_PLACES_KEY}`
  // ).then(r => r.json());

  return NextResponse.json({
    reviews,
    aggregate: aggregateRating,
    source: "mock", // change to "live" when Google Places API is connected
  });
}
