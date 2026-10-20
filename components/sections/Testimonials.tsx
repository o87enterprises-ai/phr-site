"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews, aggregateRating } from "@/lib/data/reviews";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  return (
    <section className="py-20 bg-forest relative overflow-hidden">
      <ParticleBackground variant="forest" count={14} />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            What Clients Say
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-cream mb-4">
            Reviews
          </h2>
          {/* Aggregate */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-brass fill-brass" />
              ))}
            </div>
            <span className="text-cream font-semibold">{aggregateRating.score}</span>
            <span className="text-cream/40 text-sm">({aggregateRating.count} reviews)</span>
          </div>
        </motion.div>

        {/* Review carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-forest-light rounded-3xl p-8 md:p-12 border border-cream/5"
            >
              <Quote size={32} className="text-brass/40 mb-6" />
              <p className="text-cream/80 text-lg md:text-xl leading-relaxed font-body mb-8">
                &ldquo;{reviews[active].text}&rdquo;
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brass/20 flex items-center justify-center text-brass font-bold text-sm">
                    {reviews[active].avatar}
                  </div>
                  <div>
                    <p className="text-cream font-semibold text-sm">{reviews[active].author}</p>
                    <p className="text-cream/40 text-xs">{reviews[active].city} · {reviews[active].service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: reviews[active].rating }).map((_, i) => (
                      <Star key={i} size={13} className="text-brass fill-brass" />
                    ))}
                  </div>
                  <span className="text-cream/40 text-xs capitalize">{reviews[active].platform}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-brass w-5" : "bg-cream/20"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
