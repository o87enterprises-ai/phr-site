"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    slug: "handyman-cost-san-jose-2026",
    title: "How Much Does a Handyman Cost in San Jose in 2026?",
    excerpt: "Real price ranges for the most common jobs in the Bay Area — painting, plumbing, drywall, and more.",
    category: "Cost Guide",
    readTime: "5 min",
    date: "October 2026",
  },
  {
    slug: "fix-leaky-faucet-bay-area",
    title: "How to Know When a Leaky Faucet Needs a Pro",
    excerpt: "The 3 warning signs that mean a $5 washer won't cut it — and when to call before it gets worse.",
    category: "How-To",
    readTime: "4 min",
    date: "September 2026",
  },
  {
    slug: "drywall-repair-before-painting",
    title: "Why Drywall Prep Makes or Breaks a Paint Job",
    excerpt: "The step most DIYers skip that professional painters never do.",
    category: "Tips",
    readTime: "3 min",
    date: "August 2026",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 bg-parchment-dark border-t border-parchment-dark/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Home Repair Tips
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-dark">
              From the blog
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-brass font-semibold text-sm hover:gap-3 transition-all">
            All posts <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-cream border border-parchment-dark rounded-2xl p-6 hover:border-brass/40 hover:shadow-brass transition-all hover:-translate-y-1 duration-300"
              >
                <span className="inline-block text-[10px] font-bold tracking-widest text-brass bg-brass/10 px-2 py-1 rounded-full uppercase mb-4">
                  {post.category}
                </span>
                <h3 className="font-display text-dark text-lg leading-snug mb-3 group-hover:text-brass transition-colors">
                  {post.title}
                </h3>
                <p className="text-dark/50 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-dark/30">
                  <Clock size={12} /> {post.readTime} read
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
