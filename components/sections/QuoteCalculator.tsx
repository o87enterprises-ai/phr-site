"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Loader2, CheckCircle, Phone, Calendar } from "lucide-react";
import { services } from "@/lib/data/services";
import { formatCurrency } from "@/lib/utils";

type Scope = "small" | "medium" | "large";
type Urgency = "standard" | "same-day";

interface QuoteResult {
  min: number;
  max: number;
  estimated: number;
  duration: string;
  notes: string[];
  availability: string;
}

const scopeLabels: Record<Scope, string> = {
  small: "Small (1 item / patch)",
  medium: "Medium (1–2 rooms / repairs)",
  large: "Large (whole room / multiple areas)",
};

export default function QuoteCalculator() {
  const [serviceId, setServiceId] = useState("");
  const [scope, setScope] = useState<Scope>("small");
  const [city, setCity] = useState("");
  const [urgency, setUrgency] = useState<Urgency>("standard");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceId || !city) { setError("Please select a service and enter your city."); return; }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, scope, city, urgency }),
      });
      const data = await res.json();
      if (data.success) setResult(data.quote);
      else setError(data.error ?? "Something went wrong.");
    } catch {
      setError("Unable to calculate. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] float-2"
          style={{
            background: "radial-gradient(circle, #C4922A 0%, transparent 70%)",
            top: "-5%", right: "5%",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Instant Estimate
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-dark mb-4">
            What&apos;s your job worth?
          </h2>
          <p className="text-dark/50 max-w-md mx-auto">
            Get a real price range in seconds — no phone call required.
          </p>
        </motion.div>

        <motion.div
          className="bg-cream rounded-3xl border border-parchment-dark shadow-warm-lg p-6 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Service Needed</label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-dark text-sm focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors"
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Your City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. San Jose, Fremont..."
                  className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-dark text-sm placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors"
                />
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-3">Job Size</label>
              <div className="grid grid-cols-3 gap-3">
                {(["small", "medium", "large"] as Scope[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScope(s)}
                    className={`px-3 py-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      scope === s
                        ? "border-brass bg-brass/10 text-brass"
                        : "border-parchment-dark text-dark/60 hover:border-brass/50"
                    }`}
                  >
                    {scopeLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="flex gap-4">
              {(["standard", "same-day"] as Urgency[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                    urgency === u
                      ? "border-forest bg-forest text-cream"
                      : "border-parchment-dark text-dark/60 hover:border-forest/50"
                  }`}
                >
                  {u === "standard" ? "Standard Scheduling" : "⚡ Same-Day (+18%)"}
                </button>
              ))}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brass text-cream font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-brass-dark transition-colors shadow-brass disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Calculating...</>
              ) : (
                <><Calculator size={18} /> Calculate My Quote</>
              )}
            </button>
          </form>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 p-6 bg-forest rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} className="text-brass" />
                  <span className="text-cream font-semibold">Estimated Price Range</span>
                </div>

                <div className="flex items-end gap-4 mb-4">
                  <div>
                    <p className="text-cream/50 text-xs mb-1">Range</p>
                    <p className="text-3xl font-display text-cream">
                      {formatCurrency(result.min)}
                      <span className="text-cream/50 text-xl mx-1">–</span>
                      {formatCurrency(result.max)}
                    </p>
                  </div>
                  <div className="mb-1">
                    <p className="text-cream/50 text-xs mb-1">Est. Duration</p>
                    <p className="text-cream font-semibold">{result.duration}</p>
                  </div>
                </div>

                <div className="mb-5 space-y-1.5">
                  {result.notes.map((note) => (
                    <p key={note} className="text-cream/60 text-xs flex items-start gap-1.5">
                      <span className="text-brass mt-0.5">·</span> {note}
                    </p>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href="tel:+15109384277"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-brass text-cream text-sm font-semibold rounded-xl hover:bg-brass-dark transition-colors"
                  >
                    <Phone size={15} /> Book by Phone
                  </a>
                  <a
                    href="/quote"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-cream/10 border border-cream/20 text-cream text-sm font-semibold rounded-xl hover:bg-cream/15 transition-colors"
                  >
                    <Calendar size={15} /> Book Online
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
