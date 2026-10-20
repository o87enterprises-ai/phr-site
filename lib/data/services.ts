export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  icon: string;
  basePrice: { min: number; max: number };
  duration: string;
  tags: string[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    id: "painting",
    name: "Painting",
    slug: "painting",
    shortDesc: "Interior & exterior painting with premium finishes",
    description: "Professional interior and exterior painting services. We handle surface prep, priming, and apply premium paints for a flawless finish that lasts.",
    icon: "Paintbrush",
    basePrice: { min: 300, max: 800 },
    duration: "4–8 hours",
    tags: ["interior", "exterior", "drywall prep"],
    popular: true,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    shortDesc: "Leaks, faucets, drains, and toilet repairs",
    description: "Leak repairs, faucet replacements, clogged drain clearing, toilet installs, and disposal work. We fix it right the first time.",
    icon: "Droplets",
    basePrice: { min: 75, max: 350 },
    duration: "1–3 hours",
    tags: ["leaks", "faucets", "drains", "toilets", "disposal"],
    popular: true,
  },
  {
    id: "electrical",
    name: "Light Electrical",
    slug: "electrical",
    shortDesc: "Fixtures, outlets, switches, and fan installs",
    description: "Safe installation and repair of light fixtures, ceiling fans, outlets, switches, and GFCI breakers. Background-checked, licensed work.",
    icon: "Zap",
    basePrice: { min: 85, max: 300 },
    duration: "1–4 hours",
    tags: ["fixtures", "outlets", "switches", "fans"],
  },
  {
    id: "drywall",
    name: "Drywall",
    slug: "drywall",
    shortDesc: "Patches, holes, cracks, and full panel work",
    description: "Seamless drywall patching and repairs for nail holes, water damage, cracks, and larger section replacements. Texture matching included.",
    icon: "Square",
    basePrice: { min: 120, max: 450 },
    duration: "2–6 hours",
    tags: ["patching", "holes", "cracks", "texture match"],
    popular: true,
  },
  {
    id: "flooring",
    name: "Flooring",
    slug: "flooring",
    shortDesc: "Repairs, tile, laminate, and LVP installs",
    description: "Tile repairs and installation, laminate, LVP, and hardwood touch-ups. We handle subfloor issues, transitions, and full room installs.",
    icon: "Grid3x3",
    basePrice: { min: 150, max: 600 },
    duration: "3–8 hours",
    tags: ["tile", "laminate", "LVP", "hardwood"],
  },
  {
    id: "doors",
    name: "Door Repair",
    slug: "doors",
    shortDesc: "Hinges, frames, closets, and door installation",
    description: "Door hanging and alignment, hinge replacement, frame repair, closet doors, and pocket door servicing. Interior and exterior.",
    icon: "DoorOpen",
    basePrice: { min: 85, max: 280 },
    duration: "1–3 hours",
    tags: ["interior", "exterior", "closet", "pocket doors"],
  },
  {
    id: "locks",
    name: "Lock & Security",
    slug: "locks",
    shortDesc: "Lock replacement, deadbolts, and smart locks",
    description: "Deadbolt installation, smart lock setup, door knob replacement, and security hardware upgrades. Residential and rental properties.",
    icon: "Lock",
    basePrice: { min: 85, max: 220 },
    duration: "1–2 hours",
    tags: ["deadbolts", "smart locks", "security"],
  },
  {
    id: "appliances",
    name: "Appliance Repair",
    slug: "appliances",
    shortDesc: "Disposals, dishwashers, and appliance installs",
    description: "Garbage disposal replacement, dishwasher installs, appliance mounting, and minor appliance troubleshooting.",
    icon: "Wrench",
    basePrice: { min: 95, max: 380 },
    duration: "1–4 hours",
    tags: ["disposal", "dishwasher", "installation"],
  },
  {
    id: "windows",
    name: "Window Repair",
    slug: "windows",
    shortDesc: "Screens, seals, hardware, and weatherstripping",
    description: "Window screen repair and replacement, hardware fixes, weatherstripping, caulking, and sill repairs.",
    icon: "AppWindow",
    basePrice: { min: 65, max: 200 },
    duration: "1–2 hours",
    tags: ["screens", "weatherstripping", "caulking"],
  },
  {
    id: "blinds",
    name: "Blinds & Shades",
    slug: "blinds",
    shortDesc: "Installation, repairs, and custom fitting",
    description: "Blind and shade installation, cord repair, bracket replacement, and custom sizing for new windows.",
    icon: "AlignJustify",
    basePrice: { min: 55, max: 180 },
    duration: "1–2 hours",
    tags: ["installation", "repair", "custom fit"],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

export const popularServices = services.filter((s) => s.popular);
