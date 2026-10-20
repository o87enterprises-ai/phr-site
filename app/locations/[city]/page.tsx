import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocation, locations } from "@/lib/data/locations";
import QuoteCalculator from "@/components/sections/QuoteCalculator";
import ContactForm from "@/components/sections/ContactForm";
import TrustBar from "@/components/sections/TrustBar";

export async function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) return {};
  return {
    title: `Handyman Services in ${loc.city}, CA`,
    description: `Trusted handyman services in ${loc.city}. Painting, plumbing, electrical, drywall, flooring, doors & locks. ${loc.responseTime} response time. Call (510) 938-4277.`,
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) notFound();

  return (
    <div className="pt-16">
      <section className="py-16 bg-parchment">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">Service Area</p>
          <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">
            Handyman Services in {loc.city}
          </h1>
          <p className="text-dark/60 text-lg leading-relaxed max-w-2xl mb-6">
            Precision Handy Repairs serves {loc.city} and the surrounding area with professional painting,
            plumbing, electrical, drywall, flooring, door, and lock services.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-cream px-4 py-2 rounded-xl border border-parchment-dark">
              <span className="text-brass">⚡</span>
              <span className="text-dark">{loc.responseTime} response</span>
            </div>
            <div className="flex items-center gap-2 bg-cream px-4 py-2 rounded-xl border border-parchment-dark">
              <span className="text-brass">✓</span>
              <span className="text-dark">Same-day available</span>
            </div>
            <div className="flex items-center gap-2 bg-cream px-4 py-2 rounded-xl border border-parchment-dark">
              <span className="text-brass">★</span>
              <span className="text-dark">4.9 rated</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />
      <QuoteCalculator />

      <section className="py-20 bg-parchment">
        <div className="max-w-2xl mx-auto px-4">
          <ContactForm title={`Get a Quote in ${loc.city}`} />
        </div>
      </section>
    </div>
  );
}
