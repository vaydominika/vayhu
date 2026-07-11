"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { DoodleBoard } from "@/components/sections/DoodleBoard";
import { Contact } from "@/components/sections/Contact";
import { Doodle } from "@/components/ui/Doodle";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <Nav scrollTo={scrollTo} />

      <div className="min-h-screen bg-offwhite text-charcoal paper-grain flex flex-col font-sans overflow-x-hidden w-full">
        
        {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 space-y-28 md:space-y-36">
        
        {/* HERO SECTION */}
        <Hero 
          isMounted={isMounted}
          scrollTo={scrollTo}
        />

        {/* ABOUT & SKILLS SECTION */}
        <About scrollTo={scrollTo} />

        {/* PROJECTS SECTION */}
        <Projects />

        {/* DOODLE BOARD SECTION */}
        <DoodleBoard />

        {/* CONTACT SECTION */}
        <Contact />

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E6E2D8] bg-[#F3EFE6] px-6 py-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-charcoal/60 gap-4">
        <span>© {new Date().getFullYear()} Vay. Made with Next.js &amp; Tailwind.</span>
        <span className="flex items-center gap-1.5">
          <span>made with code, care, and a lot of “just one more tweak”</span>
          <Doodle src="/assets/heart-1.svg" className="w-3.5 h-3.5 animate-pulse" color="bg-pink" />
        </span>
      </footer>

    </div>
    </>
  );
}
