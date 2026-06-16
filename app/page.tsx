"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Doodle } from "@/components/ui/Doodle";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal paper-grain flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Nav scrollTo={scrollTo} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 space-y-28 md:space-y-36">
        
        {/* HERO SECTION */}
        <Hero 
          isMounted={isMounted}
          mousePos={mousePos}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
          scrollTo={scrollTo}
        />

        {/* ABOUT & SKILLS SECTION */}
        <About scrollTo={scrollTo} />

        {/* PROJECTS SECTION */}
        <Projects scrollTo={scrollTo} />

        {/* CONTACT SECTION */}
        <Contact />

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E6E2D8] bg-[#F3EFE6] px-6 py-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-charcoal/60 gap-4">
        <span>© {new Date().getFullYear()} Vay. Made with Next.js &amp; Tailwind.</span>
        <span className="flex items-center gap-1.5">
          <span>built with coffee, code, and care</span>
          <Doodle src="/assets/heart-1.svg" className="w-3.5 h-3.5 animate-pulse" color="bg-pink" />
        </span>
      </footer>

    </div>
  );
}
