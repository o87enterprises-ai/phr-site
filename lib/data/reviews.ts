export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  platform: "google" | "yelp";
  avatar: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Maria S.",
    city: "San Jose",
    rating: 5,
    date: "October 2026",
    service: "Drywall Repair",
    text: "Tiwayne showed up exactly on time, patched three holes from our TV mounting job seamlessly. You literally cannot see where they were. Super clean, respectful of our space. Will absolutely be calling again.",
    platform: "google",
    avatar: "MS",
  },
  {
    id: "r2",
    author: "James R.",
    city: "San Francisco",
    rating: 5,
    date: "September 2026",
    service: "Plumbing",
    text: "Had a slow leak under the kitchen sink for weeks. Precision came out same day, diagnosed it immediately — turned out to be the P-trap and a worn supply line. Fixed in under an hour. Price was very fair.",
    platform: "google",
    avatar: "JR",
  },
  {
    id: "r3",
    author: "Linda P.",
    city: "Oakland",
    rating: 5,
    date: "September 2026",
    service: "Painting",
    text: "Hired them to repaint my living room and hallway after water damage. The color matching on the ceiling was perfect — I was nervous about that. Team was incredibly professional and left no mess whatsoever.",
    platform: "yelp",
    avatar: "LP",
  },
  {
    id: "r4",
    author: "Robert K.",
    city: "Fremont",
    rating: 5,
    date: "August 2026",
    service: "Door Repair",
    text: "My front door wouldn't latch properly and the frame was starting to crack. Precision sent someone out within two hours of my call. Fixed the frame, re-hung the door, adjusted the strike plate. Perfect now.",
    platform: "google",
    avatar: "RK",
  },
  {
    id: "r5",
    author: "Danielle T.",
    city: "Santa Clara",
    rating: 5,
    date: "August 2026",
    service: "Electrical",
    text: "Needed four new outlets installed in my home office. Tiwayne walked me through everything he was doing and made sure they were all GFCI where needed. No drywall damage at all — truly skilled work.",
    platform: "google",
    avatar: "DT",
  },
  {
    id: "r6",
    author: "Marcus W.",
    city: "Sunnyvale",
    rating: 5,
    date: "July 2026",
    service: "Flooring",
    text: "Had cracked tile in two bathrooms and a broken LVP plank in the hallway. All fixed in one visit. The tile grout match was spot on — no one can tell which tiles are new. Booking them again for my kitchen next.",
    platform: "yelp",
    avatar: "MW",
  },
];

export const aggregateRating = {
  score: 4.9,
  count: 47,
  breakdown: { 5: 43, 4: 3, 3: 1, 2: 0, 1: 0 },
};
