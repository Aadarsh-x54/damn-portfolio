"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "@/components/Navbar";
import GrainOverlay from "@/components/GrainOverlay";
import CursorGlow from "@/components/CursorGlow";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

/**
 * Main Page — Assembles the cinematic scrollytelling experience.
 *
 * Layout order:
 * 1. Navbar (fixed, appears after hero)
 * 2. GrainOverlay (fixed, always on)
 * 3. CursorGlow (fixed, follows mouse)
 * 4. ScrollyCanvas (500vh sticky canvas)
 *    └── Overlay (scroll-linked text sections)
 * 5. Projects (bento grid)
 * 6. Footer (cosmic ending)
 */
export default function Home() {
  // Initialize Lenis smooth scrolling
  useSmoothScroll();

  return (
    <main className="relative bg-amoled">
      {/* Fixed UI layers */}
      <Navbar />
      <GrainOverlay />
      <CursorGlow />

      {/* Cinematic scrollytelling hero */}
      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>

      {/* Projects section */}
      <Projects />

      {/* Cosmic footer */}
      <Footer />
    </main>
  );
}
