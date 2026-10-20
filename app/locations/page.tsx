import type { Metadata } from "next";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";
import QuoteCalculator from "@/components/sections/QuoteCalculator";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "Precision Handy Repairs serves San Jose and 25+ cities across the Bay Area, Central Valley, and LA. Same-day available in the Bay Area.",
};

export default function LocationsPage() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-2 text-center">
        <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">Coverage</p>
        <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">Service Areas</h1>
        <p className="text-dark/50 max-w-lg mx-auto">
          Based in San Jose. Serving the Bay Area, Central Valley, and LA.
        </p>
      </div>
      <ServiceAreaMap />
      <QuoteCalculator />
    </div>
  );
}
