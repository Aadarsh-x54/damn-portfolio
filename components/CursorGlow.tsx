"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CursorGlow — A premium dual-layer radial glow that follows the cursor.
 *
 * Features:
 * - Two-layer gradient: a warm inner core + cooler outer halo
 * - Spring-based position tracking for physically smooth movement
 * - Fades in/out with spring-driven opacity for organic transitions
 * - Hidden on touch devices to avoid phantom glows
 * - Auto-hides after 3s of cursor inactivity
 */
export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  /** React 19: useRef requires an explicit initial value */
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(
    undefined as unknown as ReturnType<typeof setTimeout>
  );

  /**
   * Spring-driven cursor position.
   * Lower stiffness + higher damping = heavier, silkier feel
   * that trails the cursor like an expensive UI element.
   */
  const x = useSpring(0, { stiffness: 120, damping: 25, mass: 0.8 });
  const y = useSpring(0, { stiffness: 120, damping: 25, mass: 0.8 });

  /**
   * Spring-driven opacity for organic fade-in/out
   * instead of a hard CSS transition.
   */
  const opacity = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    // Detect touch device on mount
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    function handleMouseMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
      opacity.set(1);

      // Fade out after 3s of inactivity
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        opacity.set(0);
      }, 3000);
    }

    function handleMouseLeave() {
      setIsVisible(false);
      opacity.set(0);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, opacity]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer halo — large, cool-toned ambient glow */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(59,130,246,0.03) 35%, rgba(139,92,246,0.015) 55%, transparent 75%)",
          opacity,
        }}
        aria-hidden="true"
      />

      {/* Inner core — smaller, warmer, more concentrated */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(99,165,255,0.1) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
          opacity,
        }}
        aria-hidden="true"
      />
    </>
  );
}
