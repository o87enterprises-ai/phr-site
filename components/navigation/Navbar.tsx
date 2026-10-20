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
          ? "bg-ink/75 backdrop-blur-xl border-b border-bone/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <PHRLogo size={36} animate={false} showWordmark={false} variant="brass" />
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
                  "text-bone/70 hover:text-bone"
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
                    className="absolute top-full left-0 mt-2 w-56 p-1.5 bg-ink-2/95 backdrop-blur-xl border border-bone/10 rounded-xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
                  >
                    {item.children.map((child) => (
                      "isHeader" in child && child.isHeader ? (
                        <div key={child.label} className="px-3 pt-2 pb-1 text-[11px] font-semibold text-brass-light/80 uppercase tracking-[0.18em]">
                          {child.label}
                        </div>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-bone/70 rounded-lg hover:bg-bone/[0.06] hover:text-bone transition-colors"
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
            className="flex items-center gap-2 text-sm font-medium text-bone/70 hover:text-bone transition-colors"
          >
            <Phone size={15} />
            (510) 938-4277
          </a>
          <Link
            href="/quote"
            className="px-4 py-2 bg-bone text-ink text-sm font-semibold rounded-full hover:bg-white transition-colors shadow-[0_6px_24px_-8px_rgba(212,168,75,0.6)]"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-bone/80 hover:text-bone transition-colors"
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
            className="md:hidden bg-ink/95 backdrop-blur-xl border-t border-bone/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] font-semibold text-brass-light/80 uppercase tracking-[0.18em] px-2 pt-3 pb-1">
                    {item.label}
                  </p>
                  {item.children
                    .filter((c) => !("isHeader" in c && c.isHeader))
                    .map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-2 py-2 text-sm text-bone/70 hover:text-bone transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                </div>
              ))}
              <div className="pt-4 pb-2 flex flex-col gap-2">
                <a href="tel:+15109384277" className="flex items-center gap-2 text-sm font-medium text-bone/80 px-2">
                  <Phone size={15} /> (510) 938-4277
                </a>
                <Link
                  href="/quote"
                  className="w-full text-center px-4 py-3 bg-bone text-ink text-sm font-semibold rounded-full"
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
