import type { Metadata } from "next";
import BlogPreview from "@/components/sections/BlogPreview";

export const metadata: Metadata = {
  title: "Blog — Home Repair Tips & Cost Guides",
  description: "Bay Area home repair guides, cost estimates, and how-to articles from Precision Handy Repairs.",
};

export default function BlogPage() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-2 text-center">
        <p className="text-brass text-xs font-semibold tracking-[0.25em] uppercase mb-3">Resources</p>
        <h1 className="text-4xl md:text-6xl font-display text-dark mb-4">Blog</h1>
        <p className="text-dark/50 max-w-lg mx-auto">
          Home repair tips, cost guides, and how-to articles for Bay Area homeowners.
        </p>
      </div>
      <BlogPreview />
    </div>
  );
}
