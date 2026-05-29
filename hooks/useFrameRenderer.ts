"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Renders a single frame from the image sequence onto a canvas
 * using requestAnimationFrame for jank-free repaints.
 *
 * Features:
 * - devicePixelRatio scaling for retina displays
 * - object-fit: cover behavior (centered crop)
 * - Only redraws when the frame index actually changes
 * - Debounced resize handling
 */
export function useFrameRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  images: React.RefObject<HTMLImageElement[]>,
  getCurrentFrame: () => number
) {
  const lastFrameRef = useRef(-1);
  const rafIdRef = useRef<number>(0);

  /** React 19: useRef requires an explicit initial value */
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(
    undefined as unknown as ReturnType<typeof setTimeout>
  );

  /**
   * Draw a single frame with cover-fit scaling.
   */
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = images.current[frameIndex];

      if (!canvas || !ctx || !img) return;

      const dpr = window.devicePixelRatio || 1;
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;

      // Only resize the canvas buffer if dimensions changed
      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
        ctx.scale(dpr, dpr);
      }

      // Clear
      ctx.clearRect(0, 0, displayW, displayH);

      // 4K UHD Optimization: enforce high-fidelity image interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Cover-fit: compute source crop
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = displayW / displayH;

      let sx = 0,
        sy = 0,
        sw = img.naturalWidth,
        sh = img.naturalHeight;

      if (imgAspect > canvasAspect) {
        // Image is wider: crop sides
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        // Image is taller: crop top/bottom
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, displayW, displayH);
    },
    [canvasRef, images]
  );

  /**
   * rAF loop: checks current frame and redraws only when changed.
   */
  const tick = useCallback(() => {
    const frame = getCurrentFrame();
    if (frame !== lastFrameRef.current) {
      lastFrameRef.current = frame;
      drawFrame(frame);
    }
    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame, getCurrentFrame]);

  /**
   * Handle window resize with debouncing.
   */
  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      lastFrameRef.current = -1; // Force redraw
    }, 100);
  }, []);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [tick, handleResize]);

  return { drawFrame };
}
