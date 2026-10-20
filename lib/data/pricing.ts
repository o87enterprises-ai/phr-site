export interface QuoteRequest {
  serviceId: string;
  scope: "small" | "medium" | "large";
  city: string;
  urgency: "standard" | "same-day";
}

export interface QuoteResult {
  min: number;
  max: number;
  estimated: number;
  duration: string;
  notes: string[];
  availability: string;
}

const BASE_PRICES: Record<string, { small: [number, number]; medium: [number, number]; large: [number, number]; duration: string }> = {
  painting: {
    small: [280, 450],
    medium: [450, 800],
    large: [800, 1800],
    duration: "4–8 hrs",
  },
  plumbing: {
    small: [75, 150],
    medium: [150, 280],
    large: [280, 500],
    duration: "1–3 hrs",
  },
  electrical: {
    small: [85, 160],
    medium: [160, 280],
    large: [280, 480],
    duration: "1–4 hrs",
  },
  drywall: {
    small: [120, 220],
    medium: [220, 400],
    large: [400, 750],
    duration: "2–6 hrs",
  },
  flooring: {
    small: [150, 280],
    medium: [280, 520],
    large: [520, 1000],
    duration: "3–8 hrs",
  },
  doors: {
    small: [85, 160],
    medium: [160, 260],
    large: [260, 420],
    duration: "1–3 hrs",
  },
  locks: {
    small: [85, 150],
    medium: [150, 220],
    large: [220, 380],
    duration: "1–2 hrs",
  },
  appliances: {
    small: [95, 180],
    medium: [180, 300],
    large: [300, 500],
    duration: "1–4 hrs",
  },
  windows: {
    small: [65, 120],
    medium: [120, 200],
    large: [200, 380],
    duration: "1–2 hrs",
  },
  blinds: {
    small: [55, 100],
    medium: [100, 160],
    large: [160, 280],
    duration: "1–2 hrs",
  },
};

// Bay Area premium multiplier by city tier
const CITY_MULTIPLIER: Record<string, number> = {
  "san francisco": 1.2,
  "palo alto": 1.18,
  "menlo park": 1.15,
  "los altos": 1.15,
  "los altos hills": 1.18,
  "atherton": 1.22,
  "cupertino": 1.12,
  "santa clara": 1.1,
  "sunnyvale": 1.1,
  "mountain view": 1.12,
  "san jose": 1.0,
  "campbell": 0.98,
  "los gatos": 1.1,
  "saratoga": 1.12,
  "milpitas": 0.97,
  "fremont": 0.98,
  "oakland": 1.05,
  "berkeley": 1.08,
  "default": 1.0,
};

const SAME_DAY_SURCHARGE = 1.18;

export function calculateQuote(req: QuoteRequest): QuoteResult {
  const base = BASE_PRICES[req.serviceId];
  if (!base) throw new Error("Unknown service");

  const [rawMin, rawMax] = base[req.scope];
  const cityKey = req.city.toLowerCase();
  const multiplier = CITY_MULTIPLIER[cityKey] ?? CITY_MULTIPLIER["default"];
  const urgencyMult = req.urgency === "same-day" ? SAME_DAY_SURCHARGE : 1;

  const min = Math.round(rawMin * multiplier * urgencyMult);
  const max = Math.round(rawMax * multiplier * urgencyMult);
  const estimated = Math.round((min + max) / 2);

  const notes: string[] = [];
  if (req.urgency === "same-day") notes.push("Same-day 18% dispatch fee included");
  if (multiplier > 1.1) notes.push("Bay Area premium area rate applied");
  notes.push("Free estimate — final price confirmed on-site");
  notes.push("100% satisfaction guarantee");

  const mockSlots = ["Today 2pm–4pm", "Today 4pm–6pm", "Tomorrow 8am–10am"];
  const availability = req.urgency === "same-day"
    ? mockSlots[Math.floor(Math.random() * 2)]
    : "Next available: Tomorrow 8am–10am";

  return { min, max, estimated, duration: base.duration, notes, availability };
}
