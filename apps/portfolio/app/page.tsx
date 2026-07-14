import Image from "next/image";
import { MotionRegion } from "@/components/MotionRegion";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DeferredDoodleBoard } from "@/components/sections/DeferredDoodleBoard";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Projects } from "@/components/sections/Projects";
import { Doodle } from "@/components/ui/Doodle";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-offwhite text-charcoal paper-grain flex flex-col font-sans overflow-x-hidden w-full">
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 space-y-28 md:space-y-36">
          <MotionRegion><Hero /></MotionRegion>
          <MotionRegion><About todayIso={new Date().toISOString()} /></MotionRegion>
          <MotionRegion><Projects /></MotionRegion>
          <MotionRegion rootMargin="1000px 0px"><DeferredDoodleBoard /></MotionRegion>
          <MotionRegion><Contact /></MotionRegion>
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
