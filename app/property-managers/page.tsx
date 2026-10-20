import type { Metadata } from "next";
import { Building2, CalendarCheck, Receipt, Wrench, ArrowRight } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import TrustBar from "@/components/sections/TrustBar";

export const metadata: Metadata = {
  title: "For Property Managers & Landlords",
  description: "Reliable recurring handyman services for property managers and landlords in the Bay Area. Priority scheduling, invoicing, and multi-unit capability.",
};

const perks = [
  { icon: CalendarCheck, title: "Priority Scheduling", desc: "Your jobs get booked first. No competing with new clients during busy weeks." },
  { icon: Receipt, title: "Consolidated Invoicing", desc: "Monthly statements per property. Easy for your books." },
  { icon: Building2, title: "Multi-Unit Capable", desc: "We handle recurring maintenance for portfolios of 1–50+ units across the Bay Area." },
  { icon: Wrench, title: "Preferred Rates", desc: "Recurring clients get 10–15% off standard rates." },
];

export default function PropertyManagersPage() {
  return (
    <div className="pt-16">
      <section className="py-16 bg-parchment">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">B2B</p>
          <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">
            For Property Managers
          </h1>
          <p className="text-dark/60 text-lg leading-relaxed max-w-2xl mb-8">
            If you&apos;re managing rental properties in the Bay Area and need a reliable handyman who shows up,
            communicates clearly, and doesn&apos;t disappear between jobs — let&apos;s talk.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {perks.map((perk) => (
              <div key={perk.title} className="flex gap-4 p-5 bg-cream border border-parchment-dark rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-brass/10 flex items-center justify-center flex-shrink-0">
                  <perk.icon size={20} className="text-brass" />
                </div>
                <div>
                  <p className="font-semibold text-dark mb-1">{perk.title}</p>
                  <p className="text-dark/50 text-sm">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="py-20 bg-parchment">
        <div className="max-w-2xl mx-auto px-4">
          <ContactForm title="Inquire About a Commercial Account" />
        </div>
      </section>
    </div>
  );
}
