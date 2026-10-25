"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

const services = [
  { title: "Plumbing", desc: "Leak repairs, fixture replacements, and drain clearing." },
  { title: "Painting", desc: "Interior and exterior, precision masking, and premium finishes." },
  { title: "Assembly", desc: "Furniture, gym equipment, and smart home installations." },
];

export const Modules = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 1: The Promise */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between"
        >
          <div>
            <ShieldCheck className="w-10 h-10 text-brand-lime mb-6" />
            <h3 className="text-2xl font-bold mb-3">The One-Visit Promise</h3>
            <p className="text-brand-gray">
              Stop juggling multiple contractors. We bundle your entire to-do list into one seamless, highly efficient appointment.
            </p>
          </div>
          <div className="mt-8 flex gap-2">
            <span className="px-3 py-1 bg-brand-charcoal text-white text-xs font-bold rounded-full">Bonded</span>
            <span className="px-3 py-1 bg-brand-charcoal text-white text-xs font-bold rounded-full">Insured</span>
          </div>
        </motion.div>

        {/* Module 2: Services (Accordion) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm"
        >
          <h3 className="text-2xl font-bold mb-6">What We Do</h3>
          <div className="border-t border-gray-100">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between items-center py-4 text-left font-semibold hover:text-brand-gray transition-colors"
            >
              View All Services
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="pb-6 space-y-4">
                    {services.map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-lime shrink-0" />
                        <div>
                          <span className="font-bold block">{s.title}</span>
                          <span className="text-sm text-brand-gray">{s.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Module 3: Coverage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-brand-charcoal text-white p-10 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold mb-3 text-brand-lime">Where We Work</h3>
            <p className="text-gray-400">
              Serving the Bay Area and Los Angeles with precision and care.
            </p>
          </div>
          <div className="mt-8">
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-brand-lime" 
              />
            </div>
            <div className="flex justify-between text-xs font-bold mt-2 text-gray-400">
              <span>SF BAY AREA</span>
              <span>LOS ANGELES</span>
            </div>
          </div>
        </motion.div>

        {/* Module 4: Same Day */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between"
        >
          <div>
            <Clock className="w-10 h-10 text-brand-charcoal mb-6" />
            <h3 className="text-2xl font-bold mb-3">Same-Day Estimates</h3>
            <p className="text-brand-gray">
              Free, no-obligation estimates. If you book before noon, we can often be there the same day.
            </p>
          </div>
          <a href="#book" className="mt-8 inline-block font-bold text-brand-charcoal underline decoration-brand-lime decoration-2 underline-offset-4 hover:text-brand-gray transition-colors">
            Get a Free Estimate
          </a>
        </motion.div>

      </div>
    </section>
  );
};