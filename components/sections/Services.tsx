"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Paintbrush, Droplets, Zap, Square, Grid3X3, DoorOpen,
  Lock, Wrench, AppWindow, AlignJustify, ArrowRight,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { formatCurrency } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Paintbrush, Droplets, Zap, Square, Grid3x3: Grid3X3, DoorOpen,
  Lock, Wrench, AppWindow, AlignJustify,
};

export default function Services() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Subtle bg shift */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] float-4"
          style={{
            background: "radial-gradient(circle, #1B3328 0%, transparent 70%)",
            top: "20%",
            left: "-10%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-dark mb-4">
            Services
          </h2>
          <p className="text-dark/50 max-w-lg mx-auto text-base">
            From a dripping faucet to a full room repaint — we handle it right the first time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Wrench;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-5 bg-cream border border-parchment-dark rounded-2xl hover:border-brass/40 hover:shadow-brass transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-parchment flex items-center justify-center group-hover:bg-brass/10 transition-colors">
                      <Icon size={20} className="text-brass" />
                    </div>
                    {service.popular && (
                      <span className="text-[10px] font-bold tracking-wider text-brass bg-brass/10 px-2 py-0.5 rounded-full uppercase">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-dark text-lg mb-1.5 group-hover:text-brass transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-dark/50 text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-dark/40">
                      From {formatCurrency(service.basePrice.min)}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-dark/30 group-hover:text-brass group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brass font-semibold text-sm hover:gap-3 transition-all"
          >
            View all services <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
