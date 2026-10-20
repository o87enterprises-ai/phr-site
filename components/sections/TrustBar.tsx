"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, UserCheck, Award } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Bonded & Insured", sub: "General Liability" },
  { icon: Star, label: "4.9 Rating", sub: "47 Google Reviews" },
  { icon: Clock, label: "Same-Day Service", sub: "Call by 2pm" },
  { icon: UserCheck, label: "Background Checked", sub: "All Technicians" },
  { icon: Award, label: "100% Satisfaction", sub: "Guaranteed" },
];

export default function TrustBar() {
  return (
    <section className="bg-forest py-8 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #C4922A 0, #C4922A 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-lg bg-brass/15 flex items-center justify-center flex-shrink-0">
                <badge.icon size={20} className="text-brass" />
              </div>
              <div>
                <p className="text-cream text-sm font-semibold leading-tight">{badge.label}</p>
                <p className="text-cream/50 text-xs">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
