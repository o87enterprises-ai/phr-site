"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, Loader2, Phone } from "lucide-react";
import { services } from "@/lib/data/services";

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split("T")[0];
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = addDays(today, i + (i === 0 ? 0 : 0));
  return {
    value: formatDate(d),
    label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
  };
});

const MOCK_SLOTS = ["8:00am–10:00am", "10:00am–12:00pm", "1:00pm–3:00pm", "3:00pm–5:00pm"];

interface Confirmation {
  confirmationId: string;
  message: string;
  details: { date: string; timeSlot: string; serviceId: string };
}

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [city, setCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(DATES[1].value);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !serviceId || !selectedSlot) {
      setError("Please fill in all required fields and select a time slot.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, serviceId, city, date: selectedDate, timeSlot: selectedSlot, notes }),
      });
      const data = await res.json();
      if (data.success) setConfirmation(data);
      else setError(data.error ?? "Booking failed. Please call us.");
    } catch {
      setError("Unable to book online. Please call (510) 938-4277.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-forest rounded-3xl p-8 md:p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-brass/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-brass" />
        </div>
        <h3 className="text-2xl font-display text-cream mb-3">Booking Confirmed!</h3>
        <p className="text-cream/70 mb-4">{confirmation.message}</p>
        <p className="text-brass font-mono text-sm mb-8">Ref: {confirmation.confirmationId}</p>
        <a
          href="tel:+15109384277"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brass text-cream font-semibold rounded-xl text-sm"
        >
          <Phone size={15} /> Questions? Call Us
        </a>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-cream rounded-3xl border border-parchment-dark shadow-warm-lg p-6 md:p-10 space-y-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Calendar size={22} className="text-brass" />
        <h3 className="text-xl font-display text-dark">Book a Job</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">Full Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
            className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">Phone *</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(510) 000-0000"
            className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">Service *</label>
          <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}
            className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass">
            <option value="">Select service...</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="San Jose, Fremont..."
            className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
        </div>
      </div>

      {/* Date picker */}
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-3 uppercase tracking-wide">Preferred Date</label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {DATES.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setSelectedDate(d.value)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDate === d.value ? "bg-forest text-cream" : "bg-parchment border border-parchment-dark text-dark/60 hover:border-forest/40"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-3 uppercase tracking-wide flex items-center gap-1.5">
          <Clock size={13} /> Time Slot
        </label>
        <div className="grid grid-cols-2 gap-2">
          {MOCK_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`px-3 py-3 rounded-xl text-xs font-medium transition-all ${
                selectedSlot === slot ? "bg-brass text-cream" : "bg-parchment border border-parchment-dark text-dark/60 hover:border-brass/50"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wide">Notes (optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Describe the issue..."
          className="w-full px-4 py-3 bg-parchment border border-parchment-dark rounded-xl text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass resize-none" />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" disabled={loading}
        className="w-full py-4 bg-brass text-cream font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-brass-dark transition-colors shadow-brass disabled:opacity-70">
        {loading ? <><Loader2 size={18} className="animate-spin" /> Booking...</> : <><Calendar size={18} /> Confirm Booking</>}
      </button>
    </motion.form>
  );
}
