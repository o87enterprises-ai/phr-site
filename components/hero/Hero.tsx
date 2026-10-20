"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";
import PHRLogo from "@/components/logo/PHRLogo";
import ParticleBackground from "@/components/ui/ParticleBackground";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-parchment pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06] float-1"
          style={{
            background: "radial-gradient(circle, #C4922A 0%, transparent 70%)",
            top: "-15%",
            right: "-10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] float-2"
          style={{
            background: "radial-gradient(circle, #1B3328 0%, transparent 70%)",
            bottom: "5%",
            left: "-8%",
          }}
        />
      </div>

      <ParticleBackground variant="parchment" count={18} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.6, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <PHRLogo size={110} animate={true} showWordmark={true} variant="brass" />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="text-brass text-xs font-bold tracking-[0.3em] uppercase mb-5"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          San Jose · Bay Area · Central Valley
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-display text-dark mb-6 leading-[1.05] tracking-tight"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Every fix,{" "}
          <span className="text-brass-gradient">exactly right.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-lg md:text-xl text-dark/55 font-body max-w-xl mx-auto mb-10 leading-relaxed"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Professional handyman services across the Bay Area.
          Same-day available. Bonded, insured, and background-checked.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <a
            href="tel:+15109384277"
            className="flex items-center justify-center gap-2.5 px-8 py-4 bg-brass text-cream font-semibold rounded-xl text-base shadow-brass hover:bg-brass-dark transition-all hover:shadow-brass-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone size={18} />
            Call (510) 938-4277
          </a>
          <Link
            href="/quote"
            className="flex items-center justify-center gap-2.5 px-8 py-4 bg-forest text-cream font-semibold rounded-xl text-base hover:bg-forest-light transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-forest"
          >
            Get an Instant Quote
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-dark/45"
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {[
            { icon: ShieldCheck, label: "Bonded & Insured" },
            { icon: Clock, label: "Same-Day Available" },
            { icon: Star, label: "4.9 · 47 Reviews", fill: true },
            { icon: ShieldCheck, label: "Background Checked" },
          ].map(({ icon: Icon, label, fill }, i) => (
            <span key={label} className="flex items-center gap-1.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-dark/15 mr-4 hidden sm:block" />}
              <Icon size={14} className={`text-brass ${fill ? "fill-brass" : ""}`} />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-brass/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
