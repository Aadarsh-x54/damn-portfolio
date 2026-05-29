"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useFrameRenderer } from "@/hooks/useFrameRenderer";
import { ScrollProgressProvider } from "@/lib/scroll-context";
import { TOTAL_FRAMES, clamp } from "@/lib/utils";

/**
 * ScrollyCanvas — The heart of the cinematic scrollytelling experience.
 *
 * Architecture:
 * 1. A 500vh-tall scroll container wraps a sticky viewport-sized canvas.
 * 2. Framer Motion's useScroll tracks scroll progress (0 → 1).
 * 3. useTransform maps progress to frame index (0 → 95).
 * 4. useSpring applies buttery spring interpolation to the frame index.
 * 5. useFrameRenderer runs a rAF loop, drawing only when the frame changes.
 *
 * The spring config gives the scroll a cinematic "weight" — it feels
 * like a physical camera moving, not a digital slider.
 *
 * Visual enhancements:
 * - Pulsing glow behind the loading progress bar
 * - Smooth AnimatePresence fade transition when loading completes
 * - Cinematic letterbox gradients at top and bottom edges
 */
export default function ScrollyCanvas({
  children,
}: {
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);

  // Preload all 96 frames
  const { images, progress, isLoaded } = useImageSequence();

  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress → frame index
  const rawFrame = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  /**
   * Premium spring config:
   * - stiffness 280: responsive without being twitchy
   * - damping 28: controlled deceleration with minimal overshoot
   * - mass 0.6: lighter than default for snappier response while
   *   retaining the physical "drag" feel
   */
  const springFrame = useSpring(rawFrame, {
    stiffness: 280,
    damping: 28,
    mass: 0.6,
  });

  // Keep ref in sync for the rAF loop
  useMotionValueEvent(springFrame, "change", (latest) => {
    currentFrameRef.current = clamp(Math.round(latest), 0, TOTAL_FRAMES - 1);
  });

  // Getter for the rAF renderer
  const getCurrentFrame = useCallback(() => currentFrameRef.current, []);

  // Start rAF rendering loop
  useFrameRenderer(canvasRef, images, getCurrentFrame);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
      id="hero"
    >
      {/* Loading screen with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loading-screen"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-amoled"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Title */}
            <div className="mb-6 text-sm font-mono tracking-[0.3em] uppercase text-graphite-400">
              Loading Experience
            </div>

            {/* Progress bar container with pulsing glow */}
            <div className="relative">
              {/* Pulsing glow behind progress bar */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 50%, transparent 80%)",
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Progress bar track */}
              <div className="relative w-48 h-[2px] bg-graphite-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-electric-500 to-electric-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Percentage readout */}
            <div className="mt-3 text-xs font-mono text-graphite-500">
              {Math.round(progress * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky canvas viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        />

        {/* Cinematic vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Cinematic letterbox — top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />

        {/* Cinematic letterbox — bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        />

        {/* Overlay content (text sections) positioned above canvas */}
        <div className="absolute inset-0 z-10">
          <ScrollProgressProvider value={scrollYProgress}>
            {children}
          </ScrollProgressProvider>
        </div>
      </div>
    </div>
  );
}
