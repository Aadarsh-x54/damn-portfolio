"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import ParticleField from "./ParticleField";

/* ═══════════════════════════════════════════════
   FOOTER — Cinematic closing section
   ═══════════════════════════════════════════════ */

/**
 * Footer — Premium "Let's build the future." closing section.
 *
 * Features:
 * - Deep gradient background fading to void black
 * - Scroll-linked opacity for gradual reveal
 * - ParticleField star canvas
 * - Large pulsing glow orb
 * - Animated accent line
 * - Three magnetic CTA buttons (GitHub, LinkedIn, Email)
 * - Scale-up entrance animation
 * - Bottom credits with year
 */
export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Scroll-linked fade for approaching effect ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Deep gradient background ─────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #000000 0%, #020209 30%, #050510 60%, #030308 100%)",
        }}
      />

      {/* ── Scroll-linked darkening overlay ──── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* ── Particle field (stars) ────────────── */}
      <ParticleField />

      {/* ── Large pulsing glow orb ────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Secondary halo ────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Content ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        {/* ── Animated accent line ─────────────── */}
        <motion.div
          className="w-16 h-[1.5px] mx-auto mb-10 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #3b82f6, #a78bfa, #3b82f6, transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* ── Headline ─────────────────────────── */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            textShadow:
              "0 0 30px rgba(59,130,246,0.2), 0 0 60px rgba(59,130,246,0.08)",
          }}
        >
          Let&apos;s build
          <br />
          <span
            className="inline-block"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #60a5fa 70%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            the future.
          </span>
        </h2>

        {/* ── Subtitle ─────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base text-graphite-400 max-w-lg mx-auto mb-14 leading-relaxed"
        >
          Open to collaboration, interesting projects, and conversations about
          AI, engineering, and the future of software.
        </motion.p>

        {/* ── CTAs ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* GitHub */}
          <MagneticButton>
            <a
              href="https://github.com/Aadarsh-x54"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-mono tracking-wider text-white rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.background = "rgba(59,130,246,0.06)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(59,130,246,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:text-electric-400 transition-colors duration-300"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </MagneticButton>

          {/* LinkedIn */}
          <MagneticButton>
            <a
              href="https://linkedin.com/in/aadarsh-malviya01"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-mono tracking-wider text-white rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.background = "rgba(59,130,246,0.06)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(59,130,246,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:text-electric-400 transition-colors duration-300"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </MagneticButton>

          {/* Email — Primary CTA (inverted) */}
          <MagneticButton>
            <a
              href="mailto:aadarshmalviya54@gmail.com"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-sm font-mono tracking-wider rounded-xl transition-all duration-300"
              style={{
                color: "#0a0a0f",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow:
                  "0 0 20px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "rgba(96,165,250,0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(59,130,246,0.3), 0 4px 16px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)";
                e.currentTarget.style.color = "#0a0a0f";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3)";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Get in Touch
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── Bottom credits ────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="text-[11px] font-mono tracking-[0.2em] text-graphite-600 uppercase">
          Designed & Built by Aadarsh Malviya
        </p>
        <p className="text-[10px] font-mono text-graphite-700 mt-1.5">
          © {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
}
