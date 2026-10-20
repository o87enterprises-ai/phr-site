"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PHRLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
  showWordmark?: boolean;
  variant?: "brass" | "white" | "forest";
}

export default function PHRLogo({
  size = 80,
  className,
  animate = true,
  showWordmark = true,
  variant = "brass",
}: PHRLogoProps) {
  const colors = {
    brass: {
      shield: "#C4922A",
      shieldDark: "#A67820",
      shieldLight: "#D4A84B",
      text: "#FAF7F2",
      wordmark: "#1A1209",
      border: "#B8860B",
    },
    white: {
      shield: "#FDFAF6",
      shieldDark: "#EDE8DF",
      shieldLight: "#ffffff",
      text: "#1B3328",
      wordmark: "#FDFAF6",
      border: "#EDE8DF",
    },
    forest: {
      shield: "#1B3328",
      shieldDark: "#122318",
      shieldLight: "#2A4D3C",
      text: "#C4922A",
      wordmark: "#1B3328",
      border: "#2A4D3C",
    },
  }[variant];

  const shieldPath =
    "M50 4 L88 16 L92 56 C92 74 72 88 50 96 C28 88 8 74 8 56 L12 16 Z";

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <motion.div
        initial={animate ? { opacity: 0, scale: 0.8, rotateY: -30 } : false}
        animate={animate ? { opacity: 1, scale: 1, rotateY: 0 } : false}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ width: size, height: size * 1.1 }}
      >
        <svg
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size * 1.1}
        >
          <defs>
            <linearGradient id="shieldGrad" x1="12" y1="4" x2="92" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.shieldLight} />
              <stop offset="50%" stopColor={colors.shield} />
              <stop offset="100%" stopColor={colors.shieldDark} />
            </linearGradient>
            <linearGradient id="shieldInner" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.shieldLight} stopOpacity="0.15" />
              <stop offset="100%" stopColor={colors.shieldDark} stopOpacity="0.3" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Shield body */}
          <path d={shieldPath} fill="url(#shieldGrad)" filter="url(#shadow)" />

          {/* Inner highlight */}
          <path
            d="M50 10 L82 20 L85 54 C85 70 67 83 50 90 C33 83 15 70 15 54 L18 20 Z"
            fill="url(#shieldInner)"
          />

          {/* Shield border */}
          <path d={shieldPath} fill="none" stroke={colors.border} strokeWidth="1.5" opacity="0.6" />

          {/* PHR letterform */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.text}
            fontSize="30"
            fontWeight="700"
            fontFamily="Georgia, serif"
            letterSpacing="-1"
            style={{ userSelect: "none" }}
          >
            PHR
          </text>

          {/* Top decorative line */}
          <line x1="28" y1="72" x2="72" y2="72" stroke={colors.text} strokeWidth="0.8" opacity="0.4" />
        </svg>
      </motion.div>

      {showWordmark && (
        <motion.div
          initial={animate ? { opacity: 0, y: 6 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <span
            className="font-body tracking-[0.22em] uppercase text-center leading-tight"
            style={{
              fontSize: size * 0.11,
              color: colors.wordmark,
              fontWeight: 500,
            }}
          >
            PRECISION HANDY REPAIRS
          </span>
        </motion.div>
      )}
    </div>
  );
}
