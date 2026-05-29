"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scrolling with a premium, cinematic feel.
 *
 * Features:
 * - Duration of 1.4s for silky-smooth deceleration
 * - Refined exponential easing curve for buttery stops
 * - Respects prefers-reduced-motion: skips Lenis entirely if set
 * - Properly cancels rAF on unmount to prevent memory leaks
 *
 * @returns The Lenis instance ref for external access (e.g., scrollTo)
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      /** Longer duration = more premium, weighted feel */
      duration: 1.4,
      /**
       * Refined exponential easing curve.
       * The 1.001 offset prevents snapping at the tail end,
       * and the -8 exponent (vs. -10) gives a gentler deceleration
       * that feels more physically grounded.
       */
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    /** rAF handle for proper cleanup */
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
