import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyCTA from "@/components/layout/EmergencyCTA";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Precision Handy Repairs | Trusted Handyman in San Jose & Bay Area",
    template: "%s | Precision Handy Repairs",
  },
  description:
    "Professional handyman services in San Jose, CA and 25+ Bay Area cities. Painting, plumbing, electrical, drywall, flooring, doors, locks. Same-day available. Bonded & insured.",
  keywords: [
    "handyman San Jose",
    "handyman Bay Area",
    "plumbing repair San Jose",
    "painting services Bay Area",
    "drywall repair San Jose",
    "same day handyman California",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://precisionhandyrepairs.com",
    siteName: "Precision Handy Repairs",
    title: "Precision Handy Repairs | Trusted Handyman in San Jose & Bay Area",
    description:
      "Every fix, exactly right. Professional handyman services across San Jose and the Bay Area.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://precisionhandyrepairs.com" },
};

export const viewport = {
  themeColor: "#0A0907",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
  "@id": "https://precisionhandyrepairs.com/#business",
  name: "Precision Handy Repairs",
  url: "https://precisionhandyrepairs.com/",
  telephone: "+15109384277",
  email: "info@precisionhandyrepairs.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Jose",
    addressRegion: "CA",
    postalCode: "95128",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 37.3248, longitude: -121.9216 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "17:00" },
  ],
  priceRange: "$$",
  description: "Professional handyman services in San Jose, CA and across the Bay Area. Painting, plumbing, electrical, drywall, flooring, door and lock services.",
  founder: { "@type": "Person", name: "Tiwayne Defils" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${interTight.variable} ${instrument.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-parchment">
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <EmergencyCTA />
      </body>
    </html>
  );
}
