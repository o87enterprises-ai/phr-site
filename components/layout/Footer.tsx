"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Share2, Camera, Play } from "lucide-react";
import PHRLogo from "@/components/logo/PHRLogo";
import { services } from "@/lib/data/services";
import { bayAreaLocations } from "@/lib/data/locations";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <PHRLogo size={60} animate={false} showWordmark={true} variant="brass" />
            </div>
            <p className="text-cream/40 text-sm leading-relaxed mb-5 mt-2">
              Professional handyman services across the Bay Area and California.
              Every fix, exactly right.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: "#", label: "Facebook" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Play, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-cream/5 hover:bg-brass/20 flex items-center justify-center text-cream/40 hover:text-brass transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-cream text-xs font-bold tracking-[0.2em] uppercase mb-4">Services</p>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`}
                    className="text-sm hover:text-brass transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <p className="text-cream text-xs font-bold tracking-[0.2em] uppercase mb-4">Bay Area</p>
            <ul className="space-y-2">
              {bayAreaLocations.slice(0, 10).map((l) => (
                <li key={l.city}>
                  <Link href={`/locations/${l.slug}`}
                    className="text-sm hover:text-brass transition-colors">{l.city}</Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="text-brass text-sm hover:underline">
                  All areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-cream text-xs font-bold tracking-[0.2em] uppercase mb-4">Contact</p>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+15109384277" className="flex items-center gap-2 text-sm hover:text-brass transition-colors">
                  <Phone size={14} className="text-brass flex-shrink-0" /> (510) 938-4277
                </a>
              </li>
              <li>
                <a href="mailto:info@precisionhandyrepairs.com" className="flex items-center gap-2 text-sm hover:text-brass transition-colors">
                  <Mail size={14} className="text-brass flex-shrink-0" /> info@precisionhandyrepairs.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={14} className="text-brass flex-shrink-0 mt-0.5" />
                <span>San Jose, CA 95128<br />Serving 25+ California Cities</span>
              </li>
            </ul>
            <div className="text-xs space-y-1">
              <p>Mon–Sat: 7:00 AM – 7:00 PM</p>
              <p>Sun: 9:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/25">
          <p>© 2026 Precision Handy Repairs. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-cream/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream/50 transition-colors">Terms of Service</Link>
          </div>
          <p className="text-cream/20">CA Licensed · Bonded · Insured</p>
        </div>
      </div>
    </footer>
  );
}
