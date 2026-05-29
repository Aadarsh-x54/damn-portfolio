"use client";

/**
 * GrainOverlay — Cinematic film grain texture.
 * A full-screen SVG noise pattern with very low opacity (~3.5%),
 * animated with a stepped keyframe to simulate analog film grain.
 * pointer-events: none ensures it doesn't block interactions.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
