"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   NAV LINKS — Section anchors
   ═══════════════════════════════════════════════ */

const links = [
  { id: "hero", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Navbar — Premium floating glassmorphism navigation.
 *
 * Features:
 * - Appears after scrolling past 50% of viewport height
 * - Spring-animated active tab indicator via layoutId
 * - Smooth entrance/exit with AnimatePresence
 * - Enhanced glassmorphism: deeper blur, thinner luminous border
 * - Mono typography with wider tracking
 * - Scroll-spy for active section detection
 */
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* ── Scroll handler: visibility + active section ── */
  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > window.innerHeight * 0.5);

    // Walk sections bottom-up to find the topmost one in view
    const sectionIds = ["contact", "projects", "hero"];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          setActiveSection(id);
          return;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Smooth scroll to section ─────────────────── */
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -24, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -24, opacity: 0, scale: 0.96 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-0.5 px-1.5 py-1 rounded-full"
          style={{
            background: "rgba(10, 10, 15, 0.55)",
            backdropFilter: "blur(28px) saturate(1.4)",
            WebkitBackdropFilter: "blur(28px) saturate(1.4)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative px-4 py-1.5 text-[11px] font-mono tracking-[0.15em] uppercase rounded-full transition-colors duration-300 cursor-pointer ${
                activeSection === link.id
                  ? "text-white"
                  : "text-graphite-400 hover:text-graphite-200"
              }`}
            >
              {/* ── Spring-animated active pill ──── */}
              {activeSection === link.id && (
                <motion.div
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 12px rgba(59,130,246,0.06)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
