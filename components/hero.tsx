"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 text-center overflow-hidden bg-brand-charcoal text-brand-light">
      {/* Subtle animated background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-lime via-brand-charcoal to-brand-charcoal"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Your Home, <br />
          <span className="text-brand-lime">Precisely</span> Maintained.
        </h1>
        <p className="text-lg md:text-xl text-brand-gray mb-10 max-w-xl mx-auto">
          Surgical accuracy for your property. We bundle tasks into a single, 
          meticulously executed visit. No mess. No delays.
        </p>
        
        <motion.a
          href="#book"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-brand-lime text-brand-charcoal px-8 py-4 rounded-full font-bold text-lg transition-colors hover:bg-white"
        >
          Book a Visit
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};