"use client";

import { motion } from "framer-motion";
import { Phone, ClipboardCheck, Hammer, ThumbsUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Call or Book Online",
    desc: "Reach us by phone or use our quote form. Tell us what needs fixing — we'll confirm availability and give you a price range on the spot.",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "We Confirm & Arrive",
    desc: "You'll get a text reminder 30 minutes before arrival. Tiwayne shows up on time, reviews the job, and confirms the final price before starting.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "We Fix It Right",
    desc: "We bring the tools and materials. Work is done cleanly and efficiently — we treat your home like our own.",
  },
  {
    num: "04",
    icon: ThumbsUp,
    title: "100% Satisfaction",
    desc: "If you're not satisfied, we return within 48 hours to make it right — at no charge. Every job backed by our guarantee.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden border-t border-parchment-dark/40">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04] float-3"
          style={{
            background: "radial-gradient(circle, #C4922A 0%, transparent 70%)",
            bottom: "5%", right: "-5%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-dark">
            How it works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+2rem)] right-[-50%] h-px bg-gradient-to-r from-brass/30 to-transparent z-0" />
              )}

              <div className="relative z-10 text-center p-6">
                <div className="relative inline-flex mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-forest flex items-center justify-center">
                    <step.icon size={26} className="text-brass" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brass text-cream text-[10px] font-bold flex items-center justify-center font-body">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display text-dark text-lg mb-2">{step.title}</h3>
                <p className="text-dark/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
