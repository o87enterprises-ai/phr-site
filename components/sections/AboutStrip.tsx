"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function AboutStrip() {
  return (
    <section className="py-20 bg-forest relative overflow-hidden">
      <ParticleBackground variant="forest" count={12} />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar placeholder */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-3xl bg-forest-light border-2 border-brass/20 flex items-center justify-center">
                <User size={80} className="text-brass/30" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brass text-cream px-4 py-2 rounded-xl text-sm font-semibold shadow-brass">
                6+ Years Experience
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-cream mb-5">
              Hi, I&apos;m Tiwayne.
            </h2>
            <p className="text-cream/60 text-base leading-relaxed mb-4">
              I started Precision Handy Repairs because I saw too many homeowners get overcharged for simple jobs — or stuck waiting weeks for a contractor who never showed up.
            </p>
            <p className="text-cream/60 text-base leading-relaxed mb-8">
              Every job I take, I treat like it&apos;s my own home. I show up on time, explain what I&apos;m doing, and I don&apos;t leave until it&apos;s right. That&apos;s the only way I know how to work.
            </p>
            <div className="flex flex-wrap gap-6 mb-8 text-sm">
              {[
                ["500+", "Jobs Completed"],
                ["25+", "Cities Served"],
                ["4.9★", "Average Rating"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="text-brass font-display text-2xl">{num}</p>
                  <p className="text-cream/40 text-xs">{label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brass font-semibold text-sm hover:gap-3 transition-all"
            >
              Full story <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
