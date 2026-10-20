import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/data/services";
import QuoteCalculator from "@/components/sections/QuoteCalculator";
import ContactForm from "@/components/sections/ContactForm";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} in San Jose & Bay Area`,
    description: `${service.description} Serving San Jose and 25+ Bay Area cities. Same-day available. Call (510) 938-4277.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <div className="pt-16">
      <section className="py-16 bg-parchment">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">Service</p>
          <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">{service.name}</h1>
          <p className="text-dark/60 text-lg leading-relaxed max-w-2xl mb-8">{service.description}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-dark/40 text-xs uppercase tracking-wide mb-1">Starting From</p>
              <p className="font-semibold text-dark text-xl">{formatCurrency(service.basePrice.min)}</p>
            </div>
            <div>
              <p className="text-dark/40 text-xs uppercase tracking-wide mb-1">Typical Duration</p>
              <p className="font-semibold text-dark text-xl">{service.duration}</p>
            </div>
          </div>
        </div>
      </section>

      <QuoteCalculator />

      <section className="py-20 bg-parchment">
        <div className="max-w-2xl mx-auto px-4">
          <ContactForm title={`Book ${service.name}`} />
        </div>
      </section>
    </div>
  );
}
