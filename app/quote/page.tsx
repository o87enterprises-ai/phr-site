import type { Metadata } from "next";
import QuoteCalculator from "@/components/sections/QuoteCalculator";
import BookingForm from "@/components/sections/BookingForm";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Instant price estimate for handyman services in San Jose and the Bay Area. No commitment required.",
};

export default function QuotePage() {
  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-4 text-center">
        <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">Free Estimate</p>
        <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">Get a Quote</h1>
        <p className="text-dark/50 max-w-lg mx-auto">
          Calculate a price range instantly, or fill in the booking form and we&apos;ll confirm everything.
        </p>
      </div>

      <QuoteCalculator />

      <div className="max-w-2xl mx-auto px-4 mt-4">
        <BookingForm />
      </div>
    </div>
  );
}
