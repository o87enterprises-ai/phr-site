"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import PHRLogo from "@/components/logo/PHRLogo";
import { services } from "@/lib/data/services";
import { bayAreaLocations } from "@/lib/data/locations";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Services",
    children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    label: "Service Areas",
    children: [
      { label: "Bay Area", href: "/locations?region=bay-area", isHeader: true },
      ...bayAreaLocations.slice(0, 8).map((l) => ({ label: l.city, href: `/locations/${l.slug}` })),
      { label: "All Areas →", href: "/locations" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Property Managers", href: "/property-managers" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-parchment/95 backdrop-blur-sm shadow-warm border-b border-parchment-dark"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <PHRLogo size={36} animate={false} showWordmark={false} variant={scrolled ? "brass" : "brass"} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "text-dark hover:text-brass hover:bg-parchment-dark/60"
                )}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={cn("transition-transform duration-200", open === item.label && "rotate-180")}
                />
              </button>

              <AnimatePresence>
                {open === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-cream border border-parchment-dark rounded-xl shadow-warm-lg overflow-hidden"
                  >
                    {item.children.map((child) => (
                      "isHeader" in child && child.isHeader ? (
                        <div key={child.label} className="px-3 pt-2 pb-1 text-xs font-semibold text-brass uppercase tracking-wider">
                          {child.label}
                        </div>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-dark hover:bg-parchment-dark hover:text-brass transition-colors"
                          onClick={() => setOpen(null)}
                        >
                          {child.label}
                        </Link>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+15109384277"
            className="flex items-center gap-2 text-sm font-medium text-forest hover:text-brass transition-colors"
          >
            <Phone size={15} />
            (510) 938-4277
          </a>
          <Link
            href="/quote"
            className="px-4 py-2 bg-brass text-cream text-sm font-semibold rounded-lg hover:bg-brass-dark transition-colors shadow-brass"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-dark hover:text-brass transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-parchment-dark overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-bold text-brass uppercase tracking-widest px-2 pt-3 pb-1">
                    {item.label}
                  </p>
                  {item.children
                    .filter((c) => !("isHeader" in c && c.isHeader))
                    .map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-2 py-2 text-sm text-dark hover:text-brass transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                </div>
              ))}
              <div className="pt-4 pb-2 flex flex-col gap-2">
                <a href="tel:+15109384277" className="flex items-center gap-2 text-sm font-medium text-forest px-2">
                  <Phone size={15} /> (510) 938-4277
                </a>
                <Link
                  href="/quote"
                  className="w-full text-center px-4 py-3 bg-brass text-cream text-sm font-semibold rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
