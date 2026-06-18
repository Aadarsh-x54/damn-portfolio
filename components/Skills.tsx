"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  skills: string[];
  glowColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI / Machine Learning",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "NLP / LLMs",
      "Computer Vision",
      "Model Evaluation",
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "RAG (Retrieval-Augmented Generation)",
      "Prompt Engineering",
      "Fine-Tuning",
    ],
    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
    borderColor: "rgba(168, 85, 247, 0.3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-purple-400"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Languages",
    skills: [
      "Python (AI / Data)",
      "Java (Full-Stack)",
      "C++",
      "JavaScript / TypeScript",
      "SQL",
    ],
    glowColor: "rgba(99, 102, 241, 0.15)", // Indigo
    borderColor: "rgba(99, 102, 241, 0.3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-indigo-400"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Backend Development",
    skills: [
      "Spring Boot",
      "REST APIs",
      "Next.js",
      "Prisma ORM",
      "Firebase",
      "NextAuth.js",
    ],
    glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
    borderColor: "rgba(16, 185, 129, 0.3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-400"
      >
        <rect width="20" height="8" x="2" y="3" rx="2" />
        <rect width="20" height="8" x="2" y="13" rx="2" />
        <line x1="6" x2="6.01" y1="7" y2="7" />
        <line x1="6" x2="6.01" y1="17" y2="17" />
      </svg>
    ),
  },
  {
    title: "DevOps & Cloud",
    skills: [
      "Docker",
      "Git / GitHub",
      "Linux",
      "CI/CD",
      "Vercel / Render",
      "Cloud Deployment",
      "MLOps",
      "ML Pipelines",
      "Hugging Face",
    ],
    glowColor: "rgba(59, 130, 246, 0.15)", // Blue
    borderColor: "rgba(59, 130, 246, 0.3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-400"
      >
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-3.32-3.08-6-6.5-6C5.58 5 3 7.58 3 11c-1.5 0-3 1.5-3 3.5C0 17 1.5 19 4 19h13.5Z" />
      </svg>
    ),
  },
  {
    title: "Databases & Storage",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Vector Databases (Pinecone/Chroma)",
      "SQLite / H2",
    ],
    glowColor: "rgba(6, 182, 212, 0.15)", // Cyan
    borderColor: "rgba(6, 182, 212, 0.3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cyan-400"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
  },
  {
    title: "Core CS & Data Tools",
    skills: [
      "Data Structures & Algorithms",
      "OOP (Object-Oriented Programming)",
      "DBMS (Database Management)",
      "System Design",
      "Multithreading",
      "Operating Systems & Networks",
      "NumPy / Pandas",
      "EDA (Exploratory Data Analysis)",
      "Statistical Analysis",
      "Tableau / Power BI",
    ],
    glowColor: "rgba(245, 158, 11, 0.15)", // Amber
    borderColor: "rgba(245, 158, 11, 0.3)",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-400"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-32 px-6 sm:px-8 md:px-16 lg:px-24 bg-amoled overflow-hidden"
    >
      {/* ── Background glow ──────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-electric-500/2 rounded-full blur-[200px] pointer-events-none" />

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
          Tech Stack
        </motion.p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Technical Expertise
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="divider-glow w-24 mx-auto mt-6 origin-center"
        />
      </motion.div>

      {/* ── Skills grid ──────────────────────── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-2xl p-[1px] bg-graphite-900 border border-graphite-800 transition-all duration-500"
            style={{
              background: "rgba(10, 10, 15, 0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Glowing borders on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
              style={{
                boxShadow: `inset 0 0 15px ${category.glowColor}, 0 0 20px ${category.glowColor}`,
                border: `1px solid ${category.borderColor}`,
              }}
            />

            {/* Glowing background wash */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(circle at 80% 20%, ${category.borderColor}, transparent 60%)`,
              }}
            />

            <div className="relative p-6 sm:p-8 flex flex-col h-full z-10">
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 rounded-lg bg-graphite-800 border border-graphite-700 group-hover:border-graphite-600 transition-colors duration-500">
                  {category.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08 + skillIdx * 0.04,
                    }}
                    className="px-3.5 py-1.5 text-xs font-mono tracking-wide text-graphite-300 bg-graphite-800/30 rounded-md border border-graphite-800/50 hover:text-white hover:border-graphite-500 transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
