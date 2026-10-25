import { Hero } from "@/components/hero";
import { Modules } from "@/components/modules";
import { Logo } from "@/components/logo";
import { ThreeWrapper } from "@/components/three-wrapper";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-brand-light/80 backdrop-blur-md border-b border-gray-200">
        <Logo />
        <div className="hidden md:flex gap-8 font-semibold text-sm">
          <a href="#" className="hover:text-brand-gray transition-colors">Services</a>
          <a href="#" className="hover:text-brand-gray transition-colors">Coverage</a>
          <a href="#" className="hover:text-brand-gray transition-colors">Reviews</a>
        </div>
        <a href="#book" className="bg-brand-charcoal text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-lime hover:text-brand-charcoal transition-colors">
          Book Now
        </a>
      </nav>
      <div className="pt-20">
        <Hero />
        <ThreeWrapper />
        <Modules />
      </div>
    </main>
  );
}
