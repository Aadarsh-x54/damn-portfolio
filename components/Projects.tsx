"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

/* ═══════════════════════════════════════════════
   DATA — Project definitions with visual config
   ═══════════════════════════════════════════════ */

interface Project {
  title: string;
  subtitle: string;
  stack: string[];
  features: string[];
  gradient: string;
  borderGradient: string;
  glowColor: string;
  accentType: "neural-glow" | "flow-lines" | "pulse-rings";
  link: string;
}

const projects: Project[] = [
  {
    title: "UNIVAE",
    subtitle: "Multi-model AI SaaS Platform",
    stack: ["Next.js", "Prisma", "OpenAI", "Gemini", "Grok APIs"],
    features: [
      "Streaming AI responses",
      "Conversational memory",
      "AI image generation",
      "Multi-session chat",
      "Optimized caching",
    ],
    gradient: "from-blue-500/10 via-indigo-500/8 to-purple-500/10",
    borderGradient: "from-blue-500/40 via-purple-500/30 to-blue-500/40",
    glowColor: "99, 102, 241",
    accentType: "neural-glow",
    link: "https://github.com/Aadarsh-x54",
  },
  {
    title: "NexFlow",
    subtitle: "Distributed Workflow Orchestration Backend",
    stack: ["Spring Boot", "Java", "Docker"],
    features: [
      "Parallel execution engine",
      "Workflow analytics",
      "Real-time orchestration",
    ],
    gradient: "from-emerald-500/10 via-teal-500/8 to-cyan-500/10",
    borderGradient: "from-emerald-500/40 via-cyan-500/30 to-emerald-500/40",
    glowColor: "16, 185, 129",
    accentType: "flow-lines",
    link: "https://github.com/Aadarsh-x54",
  },
  {
    title: "Droppler",
    subtitle: "Smart Water Monitoring System",
    stack: ["Firebase", "IoT", "Automation"],
    features: [
      "Live sensor monitoring",
      "Smart automation",
      "Real-time alerts",
    ],
    gradient: "from-cyan-500/10 via-sky-500/8 to-blue-500/10",
    borderGradient: "from-cyan-500/40 via-blue-500/30 to-cyan-500/40",
    glowColor: "6, 182, 212",
    accentType: "pulse-rings",
    link: "https://github.com/Aadarsh-x54",
  },
];

/* ═══════════════════════════════════════════════
   VISUAL ACCENT — Neural Glow Orb (UNIVAE)
   Animated gradient orb that shifts blue ↔ purple
   ═══════════════════════════════════════════════ */

function NeuralGlowAccent() {
  return (
    <div className="absolute top-4 right-4 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none">
      {/* Primary orb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Secondary shifted orb */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
          filter: "blur(14px)",
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          x: [0, 6, 0],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Bright core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(147,197,253,0.6), transparent 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VISUAL ACCENT — Flow Lines (NexFlow)
   Animated horizontal lines that flow like data
   ═══════════════════════════════════════════════ */

function FlowLinesAccent() {
  const lines = [
    { width: "60%", delay: 0, y: 0 },
    { width: "80%", delay: 0.5, y: 10 },
    { width: "45%", delay: 1.0, y: 20 },
    { width: "70%", delay: 1.5, y: 30 },
    { width: "55%", delay: 0.8, y: 40 },
  ];

  return (
    <div className="absolute top-4 right-4 w-24 h-16 sm:w-32 sm:h-20 pointer-events-none overflow-hidden">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute right-0 h-[1.5px] rounded-full"
          style={{
            width: line.width,
            top: line.y,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.5) 30%, rgba(6,182,212,0.4) 70%, transparent 100%)",
          }}
          animate={{
            opacity: [0.2, 0.7, 0.2],
            scaleX: [0.6, 1, 0.6],
            x: [10, -5, 10],
          }}
          transition={{
            duration: 3,
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VISUAL ACCENT — Pulse Rings (Droppler)
   Concentric circles that pulse outward like sonar
   ═══════════════════════════════════════════════ */

function PulseRingsAccent() {
  const rings = [0, 0.8, 1.6];

  return (
    <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none flex items-center justify-center">
      {rings.map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: `rgba(6, 182, 212, ${0.3 - i * 0.08})`,
          }}
          initial={{ width: 8, height: 8, opacity: 0.6 }}
          animate={{
            width: [8, 80],
            height: [8, 80],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Center dot */}
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-cyan-400/60"
        style={{ filter: "blur(1px)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LIVE INDICATOR — Animated pulsing dot
   ═══════════════════════════════════════════════ */

function LiveIndicator({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: `rgb(${color})` }}
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: `rgb(${color})` }}
        />
      </span>
      <span className="text-[9px] font-mono tracking-widest uppercase text-graphite-500">
        Live
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════
   PROJECT CARD — Premium glassmorphism with 3D tilt
   ═══════════════════════════════════════════════ */

/**
 * ProjectCard — A single project card with:
 * - 3D tilt-on-hover via spring-damped mouse tracking
 * - Enhanced glassmorphism with gradient borders
 * - Animated visual accent unique to each project
 * - Live status indicator
 * - Staggered whileInView entrance
 */
function ProjectCard({
  project,
  index,
  isHero,
}: {
  project: Project;
  index: number;
  isHero: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── 3D tilt tracking ─────────────────────── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  /* ── Accent component per type ─────────────── */
  const AccentComponent = {
    "neural-glow": NeuralGlowAccent,
    "flow-lines": FlowLinesAccent,
    "pulse-rings": PulseRingsAccent,
  }[project.accentType];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-2xl cursor-default ${
        isHero ? "md:col-span-2" : ""
      }`}
    >
      {/* ── Animated gradient border ─────────── */}
      <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />
      </div>

      {/* ── Card inner ───────────────────────── */}
      <div
        className="relative h-full rounded-2xl p-6 sm:p-8 flex flex-col overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.025)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* ── Hover inner glow ─────────────────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${project.glowColor}, 0.06), transparent 50%)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 50px rgba(${project.glowColor}, 0.08)`,
          }}
        />

        {/* ── Hover gradient wash ──────────────── */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`}
        />

        {/* ── Hover shadow lift ────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 20px 60px -15px rgba(${project.glowColor}, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.15)`,
          }}
        />

        {/* ── Animated visual accent ──────────── */}
        <AccentComponent />

        {/* ── Content layer ────────────────────── */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Title + live indicator */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-1.5">
              <h3
                className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide"
                style={{
                  fontFamily: "var(--font-display)",
                }}
              >
                {project.title}
              </h3>
              <LiveIndicator color={project.glowColor} />
            </div>
            <p className="text-sm text-graphite-400 font-light tracking-wide">
              {project.subtitle}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-2.5 mb-6 flex-1">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-graphite-300"
              >
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `rgb(${project.glowColor})` }}
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[10px] font-mono tracking-wider text-graphite-400 bg-graphite-800/40 rounded-md border border-graphite-700/40 group-hover:border-graphite-600/50 transition-colors duration-500"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <MagneticButton>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-wider rounded-lg transition-all duration-300"
              style={{
                color: `rgb(${project.glowColor})`,
                border: `1px solid rgba(${project.glowColor}, 0.25)`,
                background: `rgba(${project.glowColor}, 0.04)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${project.glowColor}, 0.1)`;
                e.currentTarget.style.borderColor = `rgba(${project.glowColor}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `rgba(${project.glowColor}, 0.04)`;
                e.currentTarget.style.borderColor = `rgba(${project.glowColor}, 0.25)`;
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              View on GitHub
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PROJECTS SECTION — Premium bento grid layout
   ═══════════════════════════════════════════════ */

/**
 * Projects — Awwwards-quality project showcase section.
 *
 * Features:
 * - Bento grid: UNIVAE spans 2 cols, NexFlow + Droppler below
 * - Per-card animated visual accents (neural glow, flow lines, pulse rings)
 * - Enhanced glassmorphism with gradient borders & inner glow
 * - 3D tilt-on-hover with spring physics
 * - Live status indicators
 * - Staggered whileInView entrance animations
 * - Responsive: 1 col mobile → 2 col tablet → bento desktop
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-32 px-6 sm:px-8 md:px-16 lg:px-24"
    >
      {/* ── Background glow ──────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-electric-500/3 rounded-full blur-[180px] pointer-events-none" />

      {/* ── Section header ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-xs font-mono tracking-[0.3em] uppercase text-electric-400 mb-4"
        >
          Selected Work
        </motion.p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Featured Projects
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="divider-glow w-24 mx-auto mt-6 origin-center"
        />
      </motion.div>

      {/* ── Bento grid ───────────────────────── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            isHero={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
