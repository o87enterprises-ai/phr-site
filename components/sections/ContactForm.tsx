"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, Phone } from "lucide-react";
import { services } from "@/lib/data/services";

export default function ContactForm({ title = "Get a Free Quote" }: { title?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ message: string; referenceId: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) { setError("Name and phone are required."); return; }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, service, city, message, type: "quote" }),
      });
      const data = await res.json();
      if (data.success) setSuccess({ message: data.message, referenceId: data.referenceId });
      else setError(data.error ?? "Failed to send. Please call us.");
    } catch {
      setError("Network error. Please call (510) 938-4277 directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-forest rounded-2xl p-8 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-brass/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={28} className="text-brass" />
          </div>
          <p className="text-cream font-semibold text-lg mb-2">Message Sent!</p>
          <p className="text-cream/60 text-sm mb-4">{success.message}</p>
          <p className="text-brass/60 text-xs font-mono">{success.referenceId}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-display text-dark mb-5">{title}</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name *"
              className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number *"
              className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <select value={service} onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass">
              <option value="">Service needed...</option>
              {services.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city"
              className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
          </div>

          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Describe the job (optional)"
            className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass resize-none" />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 py-3.5 bg-brass text-cream font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-brass-dark transition-colors shadow-brass disabled:opacity-70 text-sm">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Request</>}
            </button>
            <a href="tel:+15109384277"
              className="px-4 py-3.5 bg-forest text-cream font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-forest-light transition-colors text-sm">
              <Phone size={16} />
            </a>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
