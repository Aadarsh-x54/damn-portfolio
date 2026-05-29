"use client";

import { motion, useTransform, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useScrollProgress } from "@/lib/scroll-context";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import GlowingMeshBackground from "./GlowingMeshBackground";

/**
 * Overlay — Cinematic scroll-linked text overlay for the hero canvas.
 *
 * Architecture:
 * - Consumes scrollYProgress via ScrollProgressContext (provided by ScrollyCanvas)
 * - Four sections each occupy ~25% of the scroll range
 * - Every section independently derives opacity, position, scale, and
 *   decorative element transforms from the shared progress value
 * - pointer-events: none on all sections so the canvas remains interactive
 * - Spring-smoothed values for physically-weighted transitions
 *
 * Sections:
 * 1. Hero (0–25%): Oversized name with letter stagger, glow orb, scroll indicator
 * 2. AI Systems (25–50%): Left-aligned capabilities with accent line + tech pills
 * 3. Bridge (50–75%): Right-aligned philosophy with mirrored accent
 * 4. Future (75–100%): Centered dramatic reveal with pulsing backdrop
 */
export default function Overlay() {
  const scrollYProgress = useScrollProgress();

  return (
    <div className="relative h-full w-full">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO (0% → 25%)
          ═══════════════════════════════════════════ */}
      <HeroSection scrollProgress={scrollYProgress} />

      {/* ═══════════════════════════════════════════
          SECTION 2 — AI SYSTEMS (25% → 50%)
          ═══════════════════════════════════════════ */}
      <AISystemsSection scrollProgress={scrollYProgress} />

      {/* ═══════════════════════════════════════════
          SECTION 3 — BRIDGE (50% → 75%)
          ═══════════════════════════════════════════ */}
      <BridgeSection scrollProgress={scrollYProgress} />

      {/* ═══════════════════════════════════════════
          SECTION 4 — FUTURE (75% → 100%)
          ═══════════════════════════════════════════ */}
      <FutureSection scrollProgress={scrollYProgress} />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED SPRING CONFIG
   Used across all sections for cohesive physical weight
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SPRING_CONFIG = { stiffness: 120, damping: 25, mass: 0.8 } as const;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION 1 — HERO
   Center aligned, oversized name with letter stagger,
   parallax depth, glow orb, animated scroll indicator
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Letters for the first name — individually animated */
const FIRST_NAME = "AADARSH".split("");
/** Letters for the last name — individually animated */
const LAST_NAME = "MALVIYA".split("");

function HeroSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  /* ── Scroll-driven transforms ── */
  const rawOpacity = useTransform(
    scrollProgress,
    [0, 0.04, 0.16, 0.24],
    [0, 1, 1, 0]
  );
  const opacity = useSpring(rawOpacity, SPRING_CONFIG);

  /** First name moves slower (closer to camera) */
  const firstNameY = useTransform(
    scrollProgress,
    [0, 0.04, 0.16, 0.24],
    [50, 0, 0, -80]
  );
  const springFirstNameY = useSpring(firstNameY, SPRING_CONFIG);

  /** Last name moves faster (further from camera) — depth parallax */
  const lastNameY = useTransform(
    scrollProgress,
    [0, 0.04, 0.16, 0.24],
    [70, 0, 0, -120]
  );
  const springLastNameY = useSpring(lastNameY, SPRING_CONFIG);

  /** Letter spacing widens as you scroll into the section */
  const letterSpacing = useTransform(
    scrollProgress,
    [0, 0.12],
    ["0.08em", "0.22em"]
  );

  /** Subtitle fades in slightly after name */
  const subtitleOpacity = useTransform(
    scrollProgress,
    [0.02, 0.08, 0.16, 0.22],
    [0, 1, 1, 0]
  );
  const subtitleY = useTransform(
    scrollProgress,
    [0.02, 0.08],
    [25, 0]
  );

  /** Tagline fades in after subtitle */
  const taglineOpacity = useTransform(
    scrollProgress,
    [0.04, 0.1, 0.16, 0.22],
    [0, 1, 1, 0]
  );
  const taglineY = useTransform(
    scrollProgress,
    [0.04, 0.1],
    [20, 0]
  );

  /** Scroll indicator fades out as you start scrolling */
  const indicatorOpacity = useTransform(
    scrollProgress,
    [0, 0.03, 0.08],
    [0, 1, 0]
  );

  /** Glow orb scale & opacity — breathes with scroll */
  const glowScale = useTransform(
    scrollProgress,
    [0, 0.06, 0.18, 0.24],
    [0.6, 1.1, 1.2, 0.4]
  );
  const glowOpacity = useTransform(
    scrollProgress,
    [0, 0.05, 0.16, 0.24],
    [0, 0.6, 0.8, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
    >
      {/* ── Glow orb behind name ── */}
      <motion.div
        className="absolute w-[700px] h-[250px] rounded-full"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Role subtitle ── */}
      <motion.p
        className="text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-graphite-400 mb-5"
        style={{ opacity: subtitleOpacity, y: subtitleY }}
      >
        Software Engineer{" "}
        <span className="text-electric-500/60 mx-1">•</span> AI Systems
        Developer
      </motion.p>

      {/* ── First name — letter-by-letter stagger ── */}
      <motion.div
        className="flex items-baseline justify-center overflow-hidden"
        style={{ letterSpacing, y: springFirstNameY }}
      >
        {FIRST_NAME.map((letter, i) => (
          <motion.span
            key={`first-${i}`}
            className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.06,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Last name — letter-by-letter stagger with gradient ── */}
      <motion.div
        className="flex items-baseline justify-center overflow-hidden mt-1 sm:mt-2"
        style={{ letterSpacing, y: springLastNameY }}
      >
        {LAST_NAME.map((letter, i) => (
          <motion.span
            key={`last-${i}`}
            className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-gradient"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.06,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Tagline ── */}
      <motion.p
        className="mt-6 sm:mt-8 max-w-lg text-sm sm:text-base text-graphite-300 font-light leading-relaxed"
        style={{ opacity: taglineOpacity, y: taglineY }}
      >
        Building scalable backend systems, AI products, and immersive digital
        experiences.
      </motion.p>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-3"
        style={{ opacity: indicatorOpacity }}
      >
        <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-graphite-500">
          Scroll to explore
        </span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-graphite-400 to-transparent origin-top"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION 2 — AI SYSTEMS
   Left aligned, accent line, headline with gradient word,
   body copy, staggered tech pill tags
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Tech stack tags displayed as pills */
const AI_TAGS = ["UNIVAE", "NexFlow", "AI APIs", "Spring Boot", "Next.js", "Java", "Docker", "Prisma"];

function AISystemsSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  /* ── Scroll-driven transforms ── */
  const rawOpacity = useTransform(
    scrollProgress,
    [0.2, 0.28, 0.42, 0.5],
    [0, 1, 1, 0]
  );
  const opacity = useSpring(rawOpacity, SPRING_CONFIG);

  const rawX = useTransform(
    scrollProgress,
    [0.2, 0.28, 0.42, 0.5],
    [-100, 0, 0, -50]
  );
  const x = useSpring(rawX, SPRING_CONFIG);

  const rawY = useTransform(
    scrollProgress,
    [0.2, 0.28],
    [40, 0]
  );
  const y = useSpring(rawY, SPRING_CONFIG);

  /** Accent line slides in from left */
  const lineWidth = useTransform(
    scrollProgress,
    [0.22, 0.3],
    ["0%", "100%"]
  );

  /** Headline fades in slightly after container */
  const headlineOpacity = useTransform(
    scrollProgress,
    [0.24, 0.3, 0.42, 0.48],
    [0, 1, 1, 0]
  );

  /** Body copy fades in after headline */
  const bodyOpacity = useTransform(
    scrollProgress,
    [0.26, 0.32, 0.42, 0.48],
    [0, 1, 1, 0]
  );
  const bodyY = useTransform(
    scrollProgress,
    [0.26, 0.32],
    [15, 0]
  );

  /** Tags fade in staggered */
  const tagsOpacity = useTransform(
    scrollProgress,
    [0.28, 0.34, 0.42, 0.48],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity, x, y }}
      className="absolute inset-0 flex items-center px-8 sm:px-16 md:px-24 pointer-events-none"
    >
      <div className="max-w-xl">
        {/* ── Decorative accent line ── */}
        <motion.div
          className="h-[2px] mb-8 rounded-full overflow-hidden"
          style={{ width: "48px" }}
        >
          <motion.div
            className="h-full bg-electric-500 rounded-full"
            style={{ width: lineWidth }}
          />
        </motion.div>

        {/* ── Headline ── */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-6"
          style={{ opacity: headlineOpacity }}
        >
          I build{" "}
          <span className="text-gradient">AI&#8209;powered</span>
          <br />
          systems.
        </motion.h2>

        {/* ── Body copy ── */}
        <motion.p
          className="text-sm sm:text-base text-graphite-300 leading-relaxed mb-10 max-w-md"
          style={{ opacity: bodyOpacity, y: bodyY }}
        >
          From multi-model AI SaaS platforms to distributed workflow engines, I
          engineer software that blends intelligence, scalability, and
          performance.
        </motion.p>

        {/* ── Tech pills ── */}
        <motion.div
          className="flex flex-wrap gap-2.5"
          style={{ opacity: tagsOpacity }}
        >
          {AI_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              className="px-4 py-1.5 text-[11px] font-mono tracking-widest text-electric-400 border border-electric-500/20 rounded-full bg-electric-500/5 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Dynamic Neural Network particle background ── */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] opacity-40 pointer-events-none">
          <NeuralNetworkBackground />
        </div>
      </div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION 3 — BRIDGE
   Right aligned, mirrored accent, philosophy statement
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function BridgeSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  /* ── Scroll-driven transforms ── */
  const rawOpacity = useTransform(
    scrollProgress,
    [0.45, 0.53, 0.67, 0.75],
    [0, 1, 1, 0]
  );
  const opacity = useSpring(rawOpacity, SPRING_CONFIG);

  const rawX = useTransform(
    scrollProgress,
    [0.45, 0.53, 0.67, 0.75],
    [100, 0, 0, 50]
  );
  const x = useSpring(rawX, SPRING_CONFIG);

  const rawY = useTransform(
    scrollProgress,
    [0.45, 0.53],
    [40, 0]
  );
  const y = useSpring(rawY, SPRING_CONFIG);

  /** Accent line slides in from right */
  const lineWidth = useTransform(
    scrollProgress,
    [0.47, 0.55],
    ["0%", "100%"]
  );

  /** Headline fades in */
  const headlineOpacity = useTransform(
    scrollProgress,
    [0.49, 0.55, 0.67, 0.73],
    [0, 1, 1, 0]
  );

  /** Body copy fades in after headline */
  const bodyOpacity = useTransform(
    scrollProgress,
    [0.51, 0.57, 0.67, 0.73],
    [0, 1, 1, 0]
  );
  const bodyY = useTransform(
    scrollProgress,
    [0.51, 0.57],
    [15, 0]
  );

  return (
    <motion.div
      style={{ opacity, x, y }}
      className="absolute inset-0 flex items-center justify-end px-8 sm:px-16 md:px-24 pointer-events-none"
    >
      <div className="max-w-xl text-right">
        {/* ── Decorative accent line (right-aligned) ── */}
        <motion.div
          className="h-[2px] mb-8 rounded-full overflow-hidden ml-auto"
          style={{ width: "48px" }}
        >
          <motion.div
            className="h-full bg-electric-500 rounded-full ml-auto"
            style={{ width: lineWidth }}
          />
        </motion.div>

        {/* ── Headline ── */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-6"
          style={{ opacity: headlineOpacity }}
        >
          Bridging{" "}
          <span className="text-gradient">design</span>
          <br />
          and engineering.
        </motion.h2>

        {/* ── Body copy ── */}
        <motion.p
          className="text-sm sm:text-base text-graphite-300 leading-relaxed max-w-md ml-auto"
          style={{ opacity: bodyOpacity, y: bodyY }}
        >
          I combine backend architecture, real-time systems, and modern frontend
          experiences to create products that feel seamless, cinematic, and
          human.
        </motion.p>

        {/* ── Decorative neural dots (mirrored) ── */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.04]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`dot-r-${i}`}
              className="absolute w-1 h-1 bg-electric-400 rounded-full"
              style={{
                top: `${25 + Math.cos(i * 1.1) * 30}%`,
                left: `${50 + Math.sin(i * 0.8) * 35}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION 4 — FUTURE
   Centered dramatic reveal, scale entrance,
   pulsing glow, gradient accent, capability pills
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Professional capability labels */
const CAPABILITIES = [
  "Backend Engineering",
  "Generative AI",
  "System Design",
  "Scalable Products",
  "Data Structures",
  "IoT Integrations",
];

function FutureSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  /* ── Scroll-driven transforms ── */
  const rawOpacity = useTransform(
    scrollProgress,
    [0.7, 0.78, 0.92, 1],
    [0, 1, 1, 0.85]
  );
  const opacity = useSpring(rawOpacity, SPRING_CONFIG);

  const rawScale = useTransform(
    scrollProgress,
    [0.7, 0.8],
    [0.88, 1]
  );
  const scale = useSpring(rawScale, SPRING_CONFIG);

  const rawY = useTransform(
    scrollProgress,
    [0.7, 0.8],
    [60, 0]
  );
  const y = useSpring(rawY, SPRING_CONFIG);

  /** Gradient accent line grows from center */
  const accentWidth = useTransform(
    scrollProgress,
    [0.72, 0.82],
    ["0%", "100%"]
  );

  /** Headline staggers in */
  const headlineOpacity = useTransform(
    scrollProgress,
    [0.74, 0.82, 0.92, 0.98],
    [0, 1, 1, 0.9]
  );

  /** Pills stagger after headline */
  const pillsOpacity = useTransform(
    scrollProgress,
    [0.78, 0.86, 0.92, 0.98],
    [0, 1, 1, 0.8]
  );

  /** Large glow orb pulses and scales */
  const glowScale = useTransform(
    scrollProgress,
    [0.7, 0.8, 0.95, 1],
    [0.4, 1.2, 1.4, 1.0]
  );
  const glowOpacity = useTransform(
    scrollProgress,
    [0.7, 0.8, 0.92, 1],
    [0, 0.5, 0.7, 0.3]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
    >
      {/* ── Large pulsing glow orb ── */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full animate-glow-pulse"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Glowing 3D Mesh Grid background ── */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <GlowingMeshBackground />
      </div>

      {/* ── Gradient accent line ── */}
      <motion.div
        className="h-[2px] mb-10 rounded-full overflow-hidden mx-auto"
        style={{ width: "64px" }}
      >
        <motion.div
          className="h-full rounded-full mx-auto"
          style={{
            width: accentWidth,
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)",
          }}
        />
      </motion.div>

      {/* ── Headline ── */}
      <motion.h2
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
        style={{ opacity: headlineOpacity }}
      >
        Engineering the future
        <br />
        <span className="text-gradient">with AI.</span>
      </motion.h2>

      {/* ── Capability pills ── */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-4"
        style={{ opacity: pillsOpacity }}
      >
        {CAPABILITIES.map((cap, i) => (
          <motion.span
            key={cap}
            className="px-5 py-2 text-xs font-mono tracking-wider text-graphite-300 border border-graphite-600/60 rounded-full bg-white/[0.02] backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.4 + i * 0.1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {cap}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
