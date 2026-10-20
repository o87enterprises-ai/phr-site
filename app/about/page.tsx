import type { Metadata } from "next";
import AboutStrip from "@/components/sections/AboutStrip";
import TrustBar from "@/components/sections/TrustBar";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "About Tiwayne & Precision Handy Repairs",
  description: "Meet Tiwayne Defils, founder of Precision Handy Repairs. 6+ years of professional handyman experience across the Bay Area.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutStrip />
      <TrustBar />
      <section className="py-20 bg-parchment">
        <div className="max-w-2xl mx-auto px-4">
          <ContactForm title="Work With Tiwayne" />
        </div>
      </section>
    </div>
  );
}
