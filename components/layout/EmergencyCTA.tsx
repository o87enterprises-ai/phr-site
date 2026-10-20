"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

export default function EmergencyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-5 left-4 right-4 md:left-auto md:right-5 md:w-80 z-40"
        >
          <div className="bg-dark border border-brass/30 rounded-2xl p-4 shadow-brass-lg flex items-center gap-4">
            {/* Pulse indicator */}
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-brass" />
              <div className="absolute inset-0 rounded-full bg-brass animate-ping opacity-40" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-cream text-sm font-semibold">Same-Day Service Available</p>
              <p className="text-cream/50 text-xs truncate">Call before 2pm · Bay Area</p>
            </div>

            <a
              href="tel:+15109384277"
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-brass text-cream text-xs font-bold rounded-lg hover:bg-brass-dark transition-colors"
            >
              <Phone size={13} /> Call Now
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 text-cream/30 hover:text-cream/60 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
