import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ═══════════════════════════════════════════════
   FONT CONFIGURATION
   ═══════════════════════════════════════════════ */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ═══════════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: "Aadarsh Malviya — Software Engineer & AI Systems Developer",
  description:
    "Building scalable backend systems, AI products, and immersive digital experiences. Portfolio of Aadarsh Malviya — Backend Engineering, Generative AI, System Design.",
  keywords: [
    "Aadarsh Malviya",
    "Software Engineer",
    "Backend Developer",
    "AI Developer",
    "Full Stack",
    "Next.js",
    "Spring Boot",
    "Machine Learning",
  ],
  authors: [{ name: "Aadarsh Malviya" }],
  openGraph: {
    title: "Aadarsh Malviya — Software Engineer & AI Systems Developer",
    description:
      "Building scalable backend systems, AI products, and immersive digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadarsh Malviya — Software Engineer & AI Systems Developer",
  },
};

/* ═══════════════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════════════ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="bg-amoled text-white antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
