import type { Metadata } from "next";
import Services from "@/components/sections/Services";
import QuoteCalculator from "@/components/sections/QuoteCalculator";

export const metadata: Metadata = {
  title: "Handyman Services",
  description: "Full list of handyman services in San Jose and the Bay Area. Painting, plumbing, electrical, drywall, flooring, doors, locks, and more.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-2 text-center">
        <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">What We Offer</p>
        <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">Services</h1>
        <p className="text-dark/50 max-w-lg mx-auto">
          From a dripping faucet to a full room repaint. Same-day available across the Bay Area.
        </p>
      </div>
      <Services />
      <QuoteCalculator />
    </div>
  );
}
