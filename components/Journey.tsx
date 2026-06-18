"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  details?: string[];
  highlight?: string;
  icon?: React.ReactNode;
  index: number;
}

function TimelineCard({
  title,
  subtitle,
  date,
  details,
  highlight,
  icon,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-8 sm:pl-10 pb-12 group last:pb-2"
    >
      {/* ── Vertical line connector ── */}
      <div className="absolute left-[9px] top-2 bottom-0 w-[2px] bg-graphite-800 group-last:hidden" />

      {/* ── Timeline node orb ── */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="absolute left-0 top-1.5 w-5 h-5 rounded-full border border-graphite-700 bg-graphite-950 flex items-center justify-center group-hover:border-electric-500 group-hover:bg-electric-500/10 transition-colors duration-500 z-10"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-graphite-500 group-hover:bg-electric-400 transition-colors duration-500" />
      </motion.div>

      {/* ── Card content ── */}
      <div
        className="p-6 rounded-xl border border-graphite-800 bg-white/[0.015] hover:bg-white/[0.03] hover:border-graphite-700/80 backdrop-blur-md transition-all duration-500 relative"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Subtle hover accent light */}
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-gradient-to-b from-electric-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-1.5 rounded-md bg-graphite-800 border border-graphite-700 text-electric-400">
                {icon}
              </div>
            )}
            <div>
              <h4 className="text-base sm:text-lg font-display font-semibold text-white tracking-wide">
                {title}
              </h4>
              <p className="text-xs sm:text-sm text-graphite-400 font-light">
                {subtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-electric-400 bg-electric-500/5 border border-electric-500/15 px-3 py-1 rounded-full self-start sm:self-center">
            {date}
          </span>
        </div>

        {highlight && (
          <div className="text-xs sm:text-sm text-electric-300 font-medium mb-3.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
            {highlight}
          </div>
        )}

        {details && details.length > 0 && (
          <ul className="space-y-2.5">
            {details.map((detail, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-graphite-300 font-light leading-relaxed flex items-start gap-2.5"
              >
                <span className="w-1 h-1 rounded-full bg-graphite-600 mt-2 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const experiences = [
    {
      title: "Independent Backend & AI Developer",
      subtitle: "Full-Stack AI Platforms & Distributed Workflows",
      date: "2024 – Present",
      details: [
        "Built and deployed scalable backend systems, AI-powered applications, and workflow automation platforms using Java, Spring Boot, and Next.js.",
        "Integrated OpenAI, Gemini, and Grok APIs into full-stack AI platforms with real-time streaming responses and conversational memory.",
        "Designed RESTful APIs, optimized backend workflows, and improved application responsiveness through caching and modular architecture.",
        "Participated in multiple national-level hackathons, delivering production-ready prototypes under 24-hour development cycles.",
      ],
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
  ];

  const education = [
    {
      title: "B.Tech in Computer Science & Engineering",
      subtitle: "Technocrats Institute of Technology, Bhopal",
      date: "Expected June 2027",
      highlight: "CGPA: 7.0 / 10",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      title: "Class XII — CBSE",
      subtitle: "Senior Secondary School",
      date: "2022 – 2023",
      highlight: "Percentage: 71.60%",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10M6 10h10" />
        </svg>
      ),
    },
    {
      title: "Class X — CBSE",
      subtitle: "Secondary School",
      date: "2020 – 2021",
      highlight: "Percentage: 83.50%",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        </svg>
      ),
    },
  ];

  const achievements = [
    {
      title: "3× Hackathon Finalist",
      subtitle: "National-Level Hackathons",
      date: "2024",
      details: [
        "Built working software and IoT prototypes under 24-hour constraints, including being an Atomquest 2024 Finalist.",
      ],
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        </svg>
      ),
    },
    {
      title: "Research Publication",
      subtitle: "Peer-reviewed Academic Venue",
      date: "2025",
      details: [
        "Published research paper on Blockchain Technology and its Applications, analyzing consensus algorithms and decentralization metrics.",
      ],
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10M6 10h10M6 14h10" />
        </svg>
      ),
    },
    {
      title: "300+ DSA Problems Solved",
      subtitle: "Strong Problem-Solving Foundation",
      date: "Ongoing",
      details: [
        "Solved 300+ algorithmic challenges across arrays, graphs, trees, recursion, and dynamic programming.",
        "Proficient in writing highly optimized solutions in Java and Python.",
      ],
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="journey"
      className="relative py-32 px-6 sm:px-8 md:px-16 lg:px-24 bg-amoled overflow-hidden"
    >
      {/* ── Background glow (top right & bottom left) ──────────────────── */}
      <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-indigo-500/2 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[500px] bg-electric-500/2 rounded-full blur-[180px] pointer-events-none" />

      {/* ── Section header ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-24"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-xs font-mono tracking-[0.3em] uppercase text-electric-400 mb-4"
        >
          Timeline
        </motion.p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Experience & Achievements
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="divider-glow w-24 mx-auto mt-6 origin-center"
        />
      </motion.div>

      {/* ── Timeline Columns grid ──────────────────────── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Column — Work & Education */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-display font-semibold tracking-wider text-white mb-8 pl-4 border-l-2 border-electric-500"
          >
            Experience & Education
          </motion.h3>

          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <TimelineCard
                key={exp.title}
                title={exp.title}
                subtitle={exp.subtitle}
                date={exp.date}
                details={exp.details}
                icon={exp.icon}
                index={index}
              />
            ))}
            {education.map((edu, index) => (
              <TimelineCard
                key={edu.title}
                title={edu.title}
                subtitle={edu.subtitle}
                date={edu.date}
                highlight={edu.highlight}
                icon={edu.icon}
                index={experiences.length + index}
              />
            ))}
          </div>
        </div>

        {/* Right Column — Achievements & Publications */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg font-display font-semibold tracking-wider text-white mb-8 pl-4 border-l-2 border-indigo-500"
          >
            Research & Achievements
          </motion.h3>

          <div className="flex flex-col">
            {achievements.map((ach, index) => (
              <TimelineCard
                key={ach.title}
                title={ach.title}
                subtitle={ach.subtitle}
                date={ach.date}
                details={ach.details}
                icon={ach.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
