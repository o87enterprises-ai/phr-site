"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { bayAreaLocations, centralValleyLocations, laAreaLocations } from "@/lib/data/locations";

const regions = [
  { id: "bay-area", label: "Bay Area", cities: bayAreaLocations },
  { id: "central-valley", label: "Central Valley", cities: centralValleyLocations },
  { id: "la-area", label: "LA Area", cities: laAreaLocations },
];

export default function ServiceAreaMap() {
  const [activeRegion, setActiveRegion] = useState("bay-area");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const current = regions.find((r) => r.id === activeRegion)!;

  return (
    <section className="py-20 bg-parchment-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[450px] h-[450px] rounded-full opacity-[0.04] float-1"
          style={{
            background: "radial-gradient(circle, #1B3328 0%, transparent 70%)",
            top: "0%", left: "30%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Coverage Area
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-dark mb-4">
            We Come to You
          </h2>
          <p className="text-dark/50 max-w-md mx-auto">
            Serving 25+ cities across California. Bay Area same-day available.
          </p>
        </motion.div>

        {/* Region tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(r.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeRegion === r.id
                  ? "bg-forest text-cream shadow-forest"
                  : "bg-cream text-dark/60 hover:text-dark border border-parchment-dark"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* City grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {current.cities.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                onMouseEnter={() => setHoveredCity(loc.city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <Link
                  href={`/locations/${loc.slug}`}
                  className={`group block p-4 rounded-xl border transition-all duration-200 ${
                    loc.primary
                      ? "bg-forest border-forest text-cream"
                      : "bg-cream border-parchment-dark hover:border-brass/40 hover:shadow-brass"
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin
                      size={13}
                      className={loc.primary ? "text-brass mt-0.5 flex-shrink-0" : "text-brass/60 mt-0.5 flex-shrink-0"}
                    />
                    <p className={`text-sm font-semibold leading-tight ${loc.primary ? "text-cream" : "text-dark group-hover:text-brass transition-colors"}`}>
                      {loc.city}
                      {loc.primary && <span className="ml-1 text-[10px] text-brass">HQ</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={10} className={loc.primary ? "text-cream/50" : "text-dark/30"} />
                    <span className={`text-[10px] ${loc.primary ? "text-cream/50" : "text-dark/40"}`}>
                      {loc.responseTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-brass font-semibold text-sm hover:gap-3 transition-all"
          >
            View all service areas <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
