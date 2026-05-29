/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return clamp(
    ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin,
    outMin,
    outMax
  );
}

/**
 * Simple className merger (no external deps).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Total number of frames in the image sequence.
 */
export const TOTAL_FRAMES = 84;

/**
 * Format a frame index to the filename used in /public/sequence2/.
 * e.g., 0 → "/sequence2/frame_00_delay-0.071s.webp"
 */
export function getFramePath(index: number): string {
  return `/sequence2/frame_${String(index).padStart(2, "0")}_delay-0.071s.webp`;
}
