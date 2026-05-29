"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

/**
 * ScrollProgressContext — Shared scroll progress for overlay components.
 *
 * Problem: The Overlay lives inside a sticky viewport (h-screen), so
 * calling `useScroll({ target: overlayRef })` yields meaningless progress
 * because the target never actually scrolls through the viewport.
 *
 * Solution: ScrollyCanvas already computes a perfect scrollYProgress from
 * its 500vh container. We broadcast it via React Context so any descendant
 * (Overlay sections, etc.) can consume it without prop-drilling.
 */
const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

/**
 * Provider that wraps children with access to scroll progress.
 * Should be placed inside ScrollyCanvas, wrapping the overlay slot.
 */
export function ScrollProgressProvider({
  value,
  children,
}: {
  value: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <ScrollProgressContext value={value}>{children}</ScrollProgressContext>
  );
}

/**
 * Hook to consume the scroll progress MotionValue from the nearest
 * ScrollProgressProvider. Throws if used outside the provider tree.
 *
 * @returns MotionValue<number> — scroll progress normalized 0 → 1
 */
export function useScrollProgress(): MotionValue<number> {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) {
    throw new Error(
      "useScrollProgress must be used within a <ScrollProgressProvider>. " +
        "Ensure your component is rendered inside <ScrollyCanvas>."
    );
  }
  return ctx;
}
