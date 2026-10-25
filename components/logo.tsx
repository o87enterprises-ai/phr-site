import React from "react";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer Shield (Charcoal) */}
        <path
          d="M50 5 L90 20 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 V20 L50 5 Z"
          fill="#111111"
          stroke="#111111"
          strokeWidth="2"
        />
        {/* Inner Shield Outline (Lime) */}
        <path
          d="M50 12 L83 25 V50 C83 70 50 88 50 88 C50 88 17 70 17 50 V25 L50 12 Z"
          stroke="#CFFF04"
          strokeWidth="4"
          fill="transparent"
        />
        {/* PHR Monogram (White) */}
        <g fill="#F5F5F5">
          {/* P */}
          <path d="M30 68 V32 H42 C47 32 48 38 42 40 H30 V46 H40 C50 46 50 26 40 26 H24 V68 H30 Z" />
          {/* H */}
          <path d="M44 32 V68 H50 V52 H58 V68 H64 V32 H58 V46 H50 V32 H44 Z" />
          {/* R */}
          <path d="M68 68 V32 H78 C85 32 86 44 78 46 L86 68 H78 L71 50 H74 V46 H78 C80 46 80 38 78 38 H68 V68 Z" />
        </g>
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col justify-center">
        <span className="text-[1.35rem] font-extrabold tracking-widest leading-none text-brand-charcoal">
          PRECISION
        </span>
        <span className="text-[0.65rem] font-semibold tracking-[0.3em] text-gray-500 mt-1">
          HANDY REPAIRS
        </span>
      </div>
    </div>
  );
};