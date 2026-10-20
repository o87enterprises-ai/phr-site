"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Check, MapPin, CalendarClock } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.15 + i * 0.1, ease },
  }),
};

const stats = [
  { value: "4.9", suffix: "★", label: "Average rating · 47 reviews" },
  { value: "Same", suffix: "-day", label: "Service available" },
  { value: "25", suffix: "+", label: "Bay Area cities served" },
  { value: "100", suffix: "%", label: "Bonded, insured & checked" },
];

const ticketSteps = [
  { label: "Quote approved", time: "9:04 AM", done: true },
  { label: "Technician assigned", time: "9:12 AM", done: true },
  { label: "On site", time: "2:30 PM", done: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const panelY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const panelRotate = useTransform(scrollYProgress, [0, 0.6], reduce ? [0, 0] : [10, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink text-bone pt-36 md:pt-44"
    >
      {/* Light source */}
      <motion.div aria-hidden="true" style={{ y: glowY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[72rem] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(212,168,75,0.32),rgba(196,146,42,0.10)_45%,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-4rem] h-[18rem] w-[34rem] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(255,214,150,0.22),transparent)] blur-2xl" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-hairline-grid [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]"
      />

      <motion.div style={{ opacity: copyOpacity }} className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div custom={0} variants={reveal} initial="hidden" animate="show" className="mb-8 flex justify-center">
          <Link
            href="/quote"
            className="group inline-flex items-center gap-2.5 rounded-full border border-bone/10 bg-bone/[0.04] py-1.5 pl-2 pr-4 text-xs text-bone/70 backdrop-blur transition-colors hover:border-brass/40 hover:text-bone"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-light opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brass-light" />
            </span>
            <span className="sm:hidden">Same-day booking open</span>
            <span className="hidden sm:inline">Now booking same-day across San Jose &amp; the Bay Area</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.h1
          custom={1}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl font-display text-[clamp(2.9rem,8.5vw,7.25rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
        >
          <span className="bg-gradient-to-b from-bone to-bone/60 bg-clip-text text-transparent">Every fix,</span>
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-brass-gradient pr-2">exactly</span>
          <span className="bg-gradient-to-b from-bone to-bone/60 bg-clip-text text-transparent"> right.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-bone/55 md:text-lg"
        >
          Precision craftsmanship for homes and properties across the Bay Area,
          from a dripping faucet to a full refresh. Quoted upfront, done right the first time.
        </motion.p>

        <motion.div
          custom={3}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/quote"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-bone px-7 text-sm font-semibold text-ink shadow-[0_0_0_1px_rgba(243,238,230,0.2),0_8px_40px_-8px_rgba(212,168,75,0.55)] transition-all hover:bg-white hover:shadow-[0_0_0_1px_rgba(243,238,230,0.3),0_10px_50px_-6px_rgba(212,168,75,0.75)]"
          >
            Get an instant quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="tel:+15109384277"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/15 px-7 text-sm font-medium text-bone/80 transition-colors hover:border-bone/30 hover:text-bone"
          >
            <Phone size={15} />
            (510) 938-4277
          </a>
        </motion.div>
      </motion.div>

      {/* Product moment: live job ticket */}
      <div className="relative mx-auto mt-20 max-w-5xl px-4 [perspective:1600px] md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
          style={{ y: panelY, rotateX: panelRotate }}
          className="relative origin-top"
        >
          <div aria-hidden="true" className="absolute -inset-x-10 -top-10 h-40 bg-[radial-gradient(closest-side,rgba(212,168,75,0.35),transparent)] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-bone/10 bg-ink-2/90 p-1.5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] backdrop-blur">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-light/60 to-transparent" />
            <div className="rounded-xl border border-bone/[0.06] bg-ink">
              <div className="flex items-center justify-between border-b border-bone/[0.06] px-5 py-3 text-xs text-bone/40">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-bone/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-bone/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-bone/10" />
                </div>
                <span className="font-mono tracking-wide">JOB #2417</span>
                <span className="rounded-full bg-forest-light/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300/80">
                  Scheduled
                </span>
              </div>

              <div className="grid gap-px bg-bone/[0.06] text-left md:grid-cols-[1.4fr_1fr]">
                <div className="bg-ink p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-light/80">Scope of work</p>
                  <h3 className="mt-3 font-display text-2xl text-bone md:text-3xl">Drywall patch &amp; paint match</h3>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-bone/50">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> Willow Glen, San Jose</span>
                    <span className="inline-flex items-center gap-1.5"><CalendarClock size={14} /> Today, 2:30 PM</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm text-bone/70">
                    {["Cut & patch 2 ft² water damage", "Texture match: light orange peel", "Prime + 2 coats, color matched"].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <Check size={14} className="text-brass-light" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between bg-ink p-6 md:p-8">
                  <ol className="space-y-4">
                    {ticketSteps.map((s) => (
                      <li key={s.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-3">
                          <span className={s.done ? "h-2 w-2 rounded-full bg-brass-light shadow-[0_0_12px_rgba(212,168,75,0.8)]" : "h-2 w-2 rounded-full border border-bone/30"} />
                          <span className={s.done ? "text-bone/80" : "text-bone/40"}>{s.label}</span>
                        </span>
                        <span className="font-mono text-xs text-bone/35">{s.time}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 flex items-end justify-between border-t border-bone/[0.06] pt-5">
                    <div>
                      <p className="text-xs text-bone/40">Fixed quote</p>
                      <p className="font-display text-3xl tracking-tight text-bone">$385</p>
                    </div>
                    <p className="text-right text-xs text-bone/40">No surprises.<br />Price locked at approval.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto mt-4 max-w-6xl px-6 pb-20 md:mt-0">
        <dl className="grid grid-cols-2 border-y border-bone/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease }}
              className="border-bone/10 px-5 py-8 odd:border-r md:border-r md:last:border-r-0 max-md:[&:nth-child(-n+2)]:border-b md:px-8"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <p className="font-display text-4xl font-medium tracking-[-0.04em] text-bone md:text-5xl">
                  {s.value}
                  <span className="text-brass-light">{s.suffix}</span>
                </p>
                <p className="mt-2 text-sm text-bone/45">{s.label}</p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />
    </section>
  );
}
