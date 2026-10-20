import Hero from "@/components/hero/Hero";
import Services from "@/components/sections/Services";
import QuoteCalculator from "@/components/sections/QuoteCalculator";
import HowItWorks from "@/components/sections/HowItWorks";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";
import Testimonials from "@/components/sections/Testimonials";
import AboutStrip from "@/components/sections/AboutStrip";
import BlogPreview from "@/components/sections/BlogPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <QuoteCalculator />
      <HowItWorks />
      <Testimonials />
      <ServiceAreaMap />
      <AboutStrip />
      <BlogPreview />
    </>
  );
}
