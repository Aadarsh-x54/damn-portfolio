"use client";

import { useEffect, useRef } from "react";

/**
 * GlowingMeshBackground — Draws an animated 3D perspective grid.
 * Features:
 * - Horizon-converging perspective grid lines
 * - Moving grid animation to give a sense of traveling forward
 * - Interactive/time-varying wave ripples on the grid lines
 * - Smooth fade out near the top (horizon)
 */
export default function GlowingMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      // ── Grid Settings ──
      const horizonY = h * 0.35; // horizon height
      const gridHeight = h - horizonY;
      const lineCount = 20; // number of perspective longitudinal lines
      const speed = time * 25; // scroll speed of transverse lines

      ctx.lineWidth = 1;

      // 1. Draw Longitudinal Lines (Perspective lines from horizon)
      for (let i = 0; i <= lineCount; i++) {
        const xOffset = (i / lineCount) * 2 - 1; // -1 to 1 range
        const startX = w / 2;
        const startY = horizonY;
        // Project lines out past the bottom edges
        const endX = w / 2 + xOffset * w * 1.5;
        const endY = h;

        // Gradient for each longitudinal line (fading toward horizon)
        const grad = ctx.createLinearGradient(startX, startY, endX, endY);
        grad.addColorStop(0, "rgba(59, 130, 246, 0)");
        grad.addColorStop(0.3, "rgba(59, 130, 246, 0.05)");
        grad.addColorStop(1, "rgba(96, 165, 250, 0.22)");

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 2. Draw Transverse Lines (Horizontal lines moving forward)
      const transverseLinesCount = 14;
      for (let i = 0; i < transverseLinesCount; i++) {
        // Calculate raw position index
        // Exponential scale to create perspective depth spacing
        const rawY = ((i + (speed % 1)) / transverseLinesCount);
        const relativeY = Math.pow(rawY, 2.5); // bend curve for perspective
        const lineY = horizonY + relativeY * gridHeight;

        // Fading out as we approach the horizon (0% opacity at horizon, max at bottom)
        const alpha = relativeY * 0.28;
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;

        ctx.beginPath();
        // Calculate matching horizontal bounds based on perspective expansion
        const span = w * 0.5 + relativeY * w * 1.5;
        ctx.moveTo(w / 2 - span, lineY);
        ctx.lineTo(w / 2 + span, lineY);
        ctx.stroke();
      }

      // 3. Ambient glow along horizon
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 20);
      horizonGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      horizonGrad.addColorStop(0.65, "rgba(59, 130, 246, 0.06)");
      horizonGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 40, w, 60);

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
