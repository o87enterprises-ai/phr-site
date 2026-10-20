export interface Location {
  city: string;
  slug: string;
  region: "bay-area" | "central-valley" | "la-area";
  zip?: string;
  responseTime: string;
  primary?: boolean;
}

export const locations: Location[] = [
  // Bay Area — Primary
  { city: "San Jose", slug: "san-jose", region: "bay-area", zip: "95128", responseTime: "Under 2 hrs", primary: true },
  { city: "San Francisco", slug: "san-francisco", region: "bay-area", responseTime: "2–3 hrs" },
  { city: "Oakland", slug: "oakland", region: "bay-area", responseTime: "2–3 hrs" },
  { city: "Fremont", slug: "fremont", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Santa Clara", slug: "santa-clara", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Sunnyvale", slug: "sunnyvale", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Milpitas", slug: "milpitas", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Campbell", slug: "campbell", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Cupertino", slug: "cupertino", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Mountain View", slug: "mountain-view", region: "bay-area", responseTime: "2–3 hrs" },
  { city: "Palo Alto", slug: "palo-alto", region: "bay-area", responseTime: "2–3 hrs" },
  { city: "Los Gatos", slug: "los-gatos", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Saratoga", slug: "saratoga", region: "bay-area", responseTime: "Under 2 hrs" },
  { city: "Los Altos", slug: "los-altos", region: "bay-area", responseTime: "2–3 hrs" },
  { city: "Berkeley", slug: "berkeley", region: "bay-area", responseTime: "2–4 hrs" },
  { city: "Hayward", slug: "hayward", region: "bay-area", responseTime: "2–3 hrs" },
  { city: "San Mateo", slug: "san-mateo", region: "bay-area", responseTime: "2–4 hrs" },
  // Central Valley
  { city: "Sacramento", slug: "sacramento", region: "central-valley", responseTime: "Same/next day" },
  { city: "Stockton", slug: "stockton", region: "central-valley", responseTime: "Same/next day" },
  { city: "Modesto", slug: "modesto", region: "central-valley", responseTime: "Same/next day" },
  { city: "Fresno", slug: "fresno", region: "central-valley", responseTime: "Next day" },
  // LA Area
  { city: "Los Angeles", slug: "los-angeles", region: "la-area", responseTime: "Next day" },
  { city: "Long Beach", slug: "long-beach", region: "la-area", responseTime: "Next day" },
  { city: "Pasadena", slug: "pasadena", region: "la-area", responseTime: "Next day" },
];

export const bayAreaLocations = locations.filter((l) => l.region === "bay-area");
export const centralValleyLocations = locations.filter((l) => l.region === "central-valley");
export const laAreaLocations = locations.filter((l) => l.region === "la-area");

export const getLocation = (slug: string) =>
  locations.find((l) => l.slug === slug);
