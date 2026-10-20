"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Paintbrush, Droplets, Zap, Square, Grid3X3,
  DoorOpen, Lock, Wrench, AppWindow, AlignJustify,
  X,
} from "lucide-react";

interface ServiceItem {
  name: string;
  slug: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface HouseZone {
  id: string;
  label: string;
  services: ServiceItem[];
  // SVG position for the floating label anchor
  cx: number;
  cy: number;
  // Framer Motion explode offset
  explodeX: number;
  explodeY: number;
  color: string;
}

const zones: HouseZone[] = [
  {
    id: "roof",
    label: "Exterior & Roof",
    services: [
      { name: "Painting", slug: "painting", icon: Paintbrush },
      { name: "Window Repair", slug: "windows", icon: AppWindow },
      { name: "Door Repair", slug: "doors", icon: DoorOpen },
    ],
    cx: 200, cy: 80,
    explodeX: 0, explodeY: -55,
    color: "#C4922A",
  },
  {
    id: "left-wall",
    label: "Plumbing & Water",
    services: [
      { name: "Plumbing", slug: "plumbing", icon: Droplets },
      { name: "Appliance Repair", slug: "appliances", icon: Wrench },
    ],
    cx: 80, cy: 200,
    explodeX: -55, explodeY: 10,
    color: "#4A8FA8",
  },
  {
    id: "right-wall",
    label: "Electrical & Lighting",
    services: [
      { name: "Light Electrical", slug: "electrical", icon: Zap },
      { name: "Blinds & Shades", slug: "blinds", icon: AlignJustify },
    ],
    cx: 320, cy: 200,
    explodeX: 55, explodeY: 10,
    color: "#E8C06A",
  },
  {
    id: "floor",
    label: "Walls & Floors",
    services: [
      { name: "Drywall", slug: "drywall", icon: Square },
      { name: "Flooring", slug: "flooring", icon: Grid3X3 },
      { name: "Lock & Security", slug: "locks", icon: Lock },
    ],
    cx: 200, cy: 290,
    explodeX: 0, explodeY: 50,
    color: "#1B3328",
  },
];

// SVG house paths (simplified 2D cutaway/exploded view)
const housePaths = {
  roof:      "M200 20 L360 140 L40 140 Z",
  leftWall:  "M40 140 L40 300 L200 300 L200 140 Z",
  rightWall: "M200 140 L200 300 L360 300 L360 140 Z",
  floor:     "M30 300 L370 300 L370 320 L30 320 Z",
  chimney:   "M240 20 L240 80 L270 80 L270 40 Z",
  door:      "M170 220 L170 300 L230 300 L230 220 Q200 205 170 220 Z",
  window1:   "M60 160 L120 160 L120 210 L60 210 Z",
  window2:   "M280 160 L340 160 L340 210 L280 210 Z",
};

export default function HouseHero() {
  const [exploded, setExploded] = useState(false);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const activeData = zones.find((z) => z.id === activeZone);

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Instruction hint */}
      <AnimatePresence>
        {!exploded && (
          <motion.p
            className="text-sm text-dark/40 mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            Tap to explore services ↓
          </motion.p>
        )}
      </AnimatePresence>

      {/* SVG House */}
      <div className="relative" style={{ width: 400, height: 340 }}>
        <svg
          viewBox="0 30 400 310"
          width={400}
          height={310}
          className="cursor-pointer select-none"
          onClick={() => {
            setExploded(!exploded);
            if (exploded) setActiveZone(null);
          }}
        >
          <defs>
            <filter id="houseShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1A1209" floodOpacity="0.12" />
            </filter>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C4922A" />
              <stop offset="100%" stopColor="#A67820" />
            </linearGradient>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EDE8DF" />
              <stop offset="100%" stopColor="#FAF7F2" />
            </linearGradient>
          </defs>

          {/* Roof */}
          <motion.path
            d={housePaths.roof}
            fill="url(#roofGrad)"
            filter="url(#houseShadow)"
            animate={exploded
              ? { y: -55, opacity: 0.92 }
              : { y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            onHoverStart={() => exploded && setActiveZone("roof")}
            onHoverEnd={() => setActiveZone(null)}
            className={exploded ? "cursor-pointer" : ""}
            style={{ originX: "50%", originY: "50%" }}
          />

          {/* Chimney */}
          <motion.path
            d={housePaths.chimney}
            fill="#B8860B"
            animate={exploded ? { y: -55 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          />

          {/* Left wall */}
          <motion.path
            d={housePaths.leftWall}
            fill="url(#wallGrad)"
            filter="url(#houseShadow)"
            animate={exploded
              ? { x: -55, opacity: 0.92 }
              : { x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.04 }}
            onHoverStart={() => exploded && setActiveZone("left-wall")}
            onHoverEnd={() => setActiveZone(null)}
            className={exploded ? "cursor-pointer" : ""}
          />

          {/* Right wall */}
          <motion.path
            d={housePaths.rightWall}
            fill="#FAF7F2"
            filter="url(#houseShadow)"
            animate={exploded
              ? { x: 55, opacity: 0.92 }
              : { x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.04 }}
            onHoverStart={() => exploded && setActiveZone("right-wall")}
            onHoverEnd={() => setActiveZone(null)}
            className={exploded ? "cursor-pointer" : ""}
          />

          {/* Windows — move with their walls */}
          <motion.rect
            x={60} y={160} width={60} height={50} rx={4}
            fill="#A8D4E6" opacity={0.8}
            stroke="#7BAFC4" strokeWidth={2}
            animate={exploded ? { x: -55 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.04 }}
          />
          <motion.rect
            x={280} y={160} width={60} height={50} rx={4}
            fill="#A8D4E6" opacity={0.8}
            stroke="#7BAFC4" strokeWidth={2}
            animate={exploded ? { x: 55 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.04 }}
          />

          {/* Door */}
          <motion.path
            d={housePaths.door}
            fill="#8B6914"
            animate={exploded ? { y: 50 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.08 }}
          />

          {/* Floor */}
          <motion.path
            d={housePaths.floor}
            fill="#C4922A"
            opacity={0.8}
            animate={exploded ? { y: 50 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.08 }}
            onHoverStart={() => exploded && setActiveZone("floor")}
            onHoverEnd={() => setActiveZone(null)}
            className={exploded ? "cursor-pointer" : ""}
          />

          {/* Zone labels — only shown when exploded */}
          <AnimatePresence>
            {exploded && zones.map((zone) => (
              <motion.g
                key={`label-${zone.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25 }}
              >
                <motion.text
                  x={zone.cx + zone.explodeX}
                  y={zone.cy + zone.explodeY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={zone.color}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="system-ui"
                  letterSpacing="0.05em"
                  className="pointer-events-none"
                >
                  {zone.label.toUpperCase()}
                </motion.text>
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>

        {/* Hover service menu — absolutely positioned over the SVG */}
        <AnimatePresence>
          {activeData && (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 bg-cream border border-parchment-dark rounded-2xl shadow-warm-lg p-4 w-56"
              style={{
                left: Math.min(
                  Math.max(activeData.cx + activeData.explodeX - 112, 0),
                  400 - 224
                ),
                top: activeData.cy + activeData.explodeY + 16,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: activeData.color }}
              >
                {activeData.label}
              </p>
              <ul className="space-y-1">
                {activeData.services.map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-parchment transition-colors group"
                    >
                      <svc.icon size={15} className="text-brass flex-shrink-0" />
                      <span className="text-sm text-dark group-hover:text-brass transition-colors">
                        {svc.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tap again hint when exploded */}
      <AnimatePresence>
        {exploded && (
          <motion.button
            className="mt-3 flex items-center gap-1.5 text-xs text-dark/30 hover:text-dark/60 transition-colors"
            onClick={() => { setExploded(false); setActiveZone(null); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <X size={12} /> Reset house
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
