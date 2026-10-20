import type { Metadata } from "next";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import { reviews, aggregateRating } from "@/lib/data/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what Bay Area homeowners say about Precision Handy Repairs. 4.9 stars from 47 verified reviews.",
};

export default function ReviewsPage() {
  return (
    <div className="pt-16">
      <div className="bg-parchment py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">Client Reviews</p>
          <h1 className="text-4xl md:text-6xl font-display text-dark mb-2">What People Say</h1>
          <p className="text-dark/50">{aggregateRating.score} stars · {aggregateRating.count} verified reviews</p>
        </div>
      </div>
      <Testimonials />
      <section className="py-20 bg-parchment">
        <div className="max-w-2xl mx-auto px-4">
          <ContactForm title="Ready to Book?" />
        </div>
      </section>
    </div>
  );
}
