"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
      <Nav scrollTo={scrollTo} />

      <div className="min-h-screen bg-offwhite text-charcoal paper-grain flex flex-col font-sans overflow-x-hidden w-full">
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 space-y-28 md:space-y-36">
          <Hero isMounted={isMounted} scrollTo={scrollTo} />
          <About scrollTo={scrollTo} />
          <Projects />
          <DoodleBoard />
          <Contact />
        </main>

        <footer className="mt-auto border-t border-[#E6E2D8] bg-[#F3EFE6] px-6 py-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-charcoal/60 gap-4">
          <span className="flex items-center gap-2">
            <Image src="/assets/icons/vayicon.svg" alt="" width={18} height={18} className="h-4.5 w-4.5 opacity-70" />
            <span>© {new Date().getFullYear()} Vay Dominika. Made with Next.js &amp; Tailwind.</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span>made with code, care, and a lot of &quot;just one more tweak&quot;</span>
            <Doodle src="/assets/heart-1.svg" className="w-3.5 h-3.5 animate-pulse" color="bg-pink" />
          </span>
        </footer>
      </div>
    </>
  );
}