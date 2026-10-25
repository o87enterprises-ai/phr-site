"use client";

import dynamic from "next/dynamic";

export const ThreeWrapper = dynamic(
  () => import("@/components/three-scroll").then((mod) => mod.ThreeScroll),
  { ssr: false }
);