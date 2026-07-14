"use client";

import React, { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { Doodle } from "@/components/ui/Doodle";
import { cn } from "@/lib/utils";

// Inline icons to keep component self-contained
const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.25418 12.8823C4.17563 12.8438 3.9312 12.7681 4.01849 12.7652C5.15538 12.723 6.29299 12.7652 7.43061 12.7652C8.33256 12.7652 9.23453 12.7652 10.1365 12.7652C13.3202 12.7652 16.4858 12.6474 19.6659 12.6474" />
    <path d="M14.4888 7C15.8643 7 16.6462 8.42058 17.6653 9.23597C20.6337 11.6101 21.1007 11.6996 18.6065 14.6477C17.8631 15.5256 16.9946 16.2486 16.1356 17" />
  </svg>
);

const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19.7458 12.8823C19.8244 12.8438 20.0688 12.7681 19.9815 12.7652C18.8446 12.723 17.707 12.7652 16.5694 12.7652C15.6674 12.7652 14.7655 12.7652 13.8635 12.7652C10.6798 12.7652 7.5142 12.6474 4.3341 12.6474" />
    <path d="M9.5112 7C8.1357 7 7.3538 8.42058 6.3347 9.23597C3.3663 11.6101 2.8993 11.6996 5.3935 14.6477C6.1369 15.5256 7.0054 16.2486 7.8644 17" />
  </svg>
);

const projectList = [
  {
    title: "Wally Walnut Walk",
    url: "https://diodome.setaloja.hu",
    images: [
      "/assets/wally-walnut-home.png",
      "/assets/wally-walnut-chat.png"
    ]
  },
  {
    title: "Dialóg Egyesület",
    url: "https://www.dialogegyesulet.hu",
    images: [
      "/assets/dialog-home-v2.png",
      "/assets/dialog-team-v2.png"
    ]
  },
  {
    title: "Herman Ottó Museum - Game",
    url: "https://hermuz.maty.as",
    images: [
      "/assets/herman-museum-game.png"
    ]
  }
];

const HOVER_COLORS = [
  { bg: "hover:bg-pink/20", border: "hover:border-pink", text: "hover:text-pink" },
  { bg: "hover:bg-teal/20", border: "hover:border-teal", text: "hover:text-teal" },
  { bg: "hover:bg-sage/20", border: "hover:border-sage", text: "hover:text-sage" },
  { bg: "hover:bg-[#EAE44D]/25", border: "hover:border-[#EAE44D]", text: "hover:text-amber-700" }
];

const INDICATOR_COLORS = [
  { active: "bg-pink", inactive: "bg-pink/35", hover: "hover:bg-pink/70" },
  { active: "bg-teal", inactive: "bg-teal/35", hover: "hover:bg-teal/70" },
  { active: "bg-sage", inactive: "bg-sage/45", hover: "hover:bg-sage/75" },
  { active: "bg-note-yellow", inactive: "bg-note-yellow/70", hover: "hover:bg-note-yellow" },
  { active: "bg-note-blue", inactive: "bg-note-blue/70", hover: "hover:bg-note-blue" },
  { active: "bg-note-green", inactive: "bg-note-green/70", hover: "hover:bg-note-green" },
];

const TRANSITION_ANIMATIONS = [
  "animate-paper-tear",
  "animate-paper-spin",
  "animate-paper-slide",
  "animate-paper-bounce"
];

const subscribeToClient = () => () => {};

export const Projects: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; projectIndex: number; imageIndex: number }>({
    isOpen: false,
    projectIndex: 0,
    imageIndex: 0
  });

  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [leftColorIndex, setLeftColorIndex] = useState(0);
  const [rightColorIndex, setRightColorIndex] = useState(1);
  const [activeAnimation, setActiveAnimation] = useState("animate-paper-tear");
  const lightboxImages = projectList[lightbox.projectIndex].images;
  const hasMultipleLightboxImages = lightboxImages.length > 1;

  const randomizeLeftColor = useCallback(() => {
    setLeftColorIndex((currentIndex) => (currentIndex + 2) % HOVER_COLORS.length);
  }, []);

  const randomizeRightColor = useCallback(() => {
    setRightColorIndex((currentIndex) => (currentIndex + 3) % HOVER_COLORS.length);
  }, []);

  const triggerRandomAnimation = useCallback(() => {
    setActiveAnimation((currentAnimation) => {
      const currentIndex = TRANSITION_ANIMATIONS.indexOf(currentAnimation);
      return TRANSITION_ANIMATIONS[(currentIndex + 1) % TRANSITION_ANIMATIONS.length];
    });
  }, []);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const images = projectList[lightbox.projectIndex].images;
    if (images.length <= 1) return;

    setLightbox(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + images.length) % images.length
    }));
    randomizeLeftColor();
    triggerRandomAnimation();
  }, [lightbox.projectIndex, randomizeLeftColor, triggerRandomAnimation]);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const images = projectList[lightbox.projectIndex].images;
    if (images.length <= 1) return;

    setLightbox(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % images.length
    }));
    randomizeRightColor();
    triggerRandomAnimation();
  }, [lightbox.projectIndex, randomizeRightColor, triggerRandomAnimation]);

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, projectIndex: 0, imageIndex: 0 });
  }, []);

  const openLightbox = (projectIndex: number) => {
    triggerRandomAnimation();
    setLightbox({ isOpen: true, projectIndex, imageIndex: 0 });
  };

  const showImage = (imageIndex: number) => {
    if (imageIndex === lightbox.imageIndex) return;

    triggerRandomAnimation();
    setLightbox((prev) => ({
      ...prev,
      imageIndex,
    }));
  };

  useEffect(() => {
    if (!lightbox.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasMultipleLightboxImages && e.key === "ArrowLeft") showPrev();
      if (hasMultipleLightboxImages && e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, hasMultipleLightboxImages, lightbox.isOpen, showNext, showPrev]);

  return (
    <section id="projects" className="scroll-mt-24 relative isolate">
      {/* Background doodles - made significantly more visible */}
      <Doodle 
        src="/assets/spiral-2.svg" 
        className="absolute -left-4 top-20 w-32 h-32 opacity-65 -rotate-45 -z-10 pointer-events-none select-none" 
        color="bg-pink/80" 
      />
      <Doodle 
        src="/assets/star-9-mask.png"
        className="absolute right-4 top-1/2 w-32 h-32 opacity-60 rotate-12 -z-10 pointer-events-none select-none" 
        color="bg-teal" 
      />
      <Doodle 
        src="/assets/star-4.svg" 
        className="absolute left-1/3 bottom-0 w-20 h-20 opacity-60 rotate-90 -z-10 pointer-events-none select-none" 
        color="bg-sage" 
      />
      <Doodle
        src="/assets/shine-3.svg"
        className="absolute left-[12%] top-[55%] w-12 h-12 opacity-45 rotate-12 -z-10 pointer-events-none select-none"
        color="bg-teal/80"
      />
      <Doodle
        src="/assets/strawberry-2.svg"
        className="absolute right-[18%] -bottom-8 w-14 h-14 opacity-50 -rotate-12 -z-10 pointer-events-none select-none"
        color="bg-pink"
      />

      <ScrollReveal>
        <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
          <ImageIcon className="h-3.5 w-3.5" />
          selected work
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          
          {/* Project 1 with Projects Badge overlapping */}
          <ScrollRevealItem delay={0} className="flex w-full max-w-xl flex-col h-full group relative pt-6 mx-auto lg:max-w-none">
            
            <PaperCard 
              variant="polaroid" 
              rotation="-rotate-2" 
              className="flex-1 flex flex-col justify-between pt-12 relative overflow-visible"
            >
              {/* Projects Badge replacing the old Pink Projects Tab */}
              <div className="absolute -top-24 left-0 w-44 h-44 z-30 select-none flex items-center justify-center rotate-[-6deg] drop-shadow-md transition-cozy group-hover:-translate-y-1">
                <Doodle 
                  src="/assets/badge-1.svg" 
                  className="absolute inset-0 w-full h-full" 
                  color="bg-pink" 
                />
                <span className="relative z-10 font-serif font-bold text-2xl text-charcoal pt-1 pr-1">Projects</span>
              </div>
              
              {/* Pink tape piece holding the projects tab inside card to lift together */}
              <div className="absolute top-7 left-[120px] w-44 h-10 z-40 rotate-6 pointer-events-none select-none">
                <Image 
                  src="/assets/tape-2.png" 
                  alt="Tape" 
                  fill
                  sizes="176px"
                  className="object-contain"
                />
              </div>

              {/* Star sticker overlapping the top right of the photo frame */}
              <Doodle 
                  src="/assets/star-1-mask.png"
                className="absolute top-10 right-4 w-7 h-7 rotate-12 z-20 animate-pulse" 
                color="bg-teal" 
              />

              <div 
                onClick={() => openLightbox(0)}
                className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden cursor-pointer"
              >
                <Image 
                  src={projectList[0].images[0]} 
                  alt="Wally Walnut Walk educational nature walk website" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain transition-transform duration-750 ease-out hover:scale-103"
                />
                <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-charcoal/10 font-handwriting text-sm text-charcoal/80 shadow-scrapbook-sm select-none pointer-events-none z-10">
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>{projectList[0].images.length}</span>
                </div>
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Wally Walnut Walk</span>
                    <Doodle src="/assets/leaf-2.svg" className="w-4 h-4 rotate-12" color="bg-teal" />
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A story-based nature trail for families, with colorful stones, quiet rest stops, and gentle moments for slowing down together.
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {["SolidJS", "Tailwind CSS"].map((tag, idx) => (
                      <span 
                        key={tag} 
                        style={{ transitionDelay: `${idx * 80}ms` }}
                        className="text-[10px] font-mono bg-[#FCFAF2] px-2 py-0.5 border border-charcoal/10 rounded-sm text-charcoal/70 tag-transition group-hover:-translate-y-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={projectList[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white border border-charcoal/10 rounded-full hover:bg-sage/20 hover:border-sage hover:text-sage hover:scale-105 active:scale-95 transition-[transform,background-color,border-color,color] text-charcoal flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </PaperCard>
          </ScrollRevealItem>

          {/* Project 2 */}
          <ScrollRevealItem delay={150} className="flex w-full max-w-xl flex-col h-full lg:translate-y-4 group/project2 relative pt-6 mx-auto lg:max-w-none">
            
            {/* Blue card behind */}
            <div className="absolute top-20 -bottom-5 left-1/2 translate-y-8 -translate-x-1/2 w-[98%] bg-teal/80 border border-[#9BBAB4]/50 shadow-scrapbook-sm rounded-sm z-0 rotate-1 transition-[transform] duration-500 ease-in-out group-hover/project2:translate-y-5 group-hover/project2:rotate-2 lg:top-12 lg:bottom-12 lg:w-[98%]"></div>

            <div className="relative z-10 transition-[transform] duration-500 ease-in-out group-hover/project2:-translate-y-1.5 group-hover/project2:rotate-1">
            <PaperCard 
              variant="polaroid" 
              rotation="none" 
              pushpin={false}
              className="flex flex-col justify-between min-h-[440px] pt-12 relative overflow-visible rotate-1 hover:translate-y-0 hover:rotate-1 hover:shadow-scrapbook-md"
            >
              {/* Button holding the card - colored pink using CSS mask */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 z-40 drop-shadow-sm pointer-events-none select-none">
                <div 
                  className="w-full h-full bg-pink"
                  style={{
                    maskImage: "url(/assets/button-1-mask.png)",
                    WebkitMaskImage: "url(/assets/button-1-mask.png)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                />
              </div>

              {/* bottom-ripped-2.png at the bottom of the card */}
              <div className="absolute bottom-[-10px] left-0 right-0 h-9 translate-x-0.5 pointer-events-none select-none z-20 lg:bottom-[-6px] lg:h-6 lg:translate-x-0">
                <Image 
                  src="/assets/bottom-ripped-2.png" 
                  alt="Ripped bottom edge" 
                  fill
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover"
                />
              </div>

              {/* Strawberry sticker overlapping the photo corner */}
              <Doodle 
                src="/assets/strawberry-1.svg" 
                className="absolute top-10 left-4 w-7 h-7 -rotate-12 z-20" 
                color="bg-pink" 
              />

              <div 
                onClick={() => openLightbox(1)}
                className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden z-10 cursor-pointer"
              >
                <Image 
                  src={projectList[1].images[0]} 
                  alt="Dialóg Egyesület website" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain transition-transform duration-750 ease-out hover:scale-103"
                />
                <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-charcoal/10 font-handwriting text-sm text-charcoal/80 shadow-scrapbook-sm select-none pointer-events-none z-10">
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>{projectList[1].images.length}</span>
                </div>
              </div>
              <div className="mt-2.5 flex flex-col gap-2 z-10">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Dialóg Egyesület</span>
                    <Doodle src="/assets/strawberry-2.svg" className="w-4 h-4 -rotate-12" color="bg-pink" />
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A website presenting the association&apos;s work, programs, and ways to get involved.
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "C#", "Tailwind CSS"].map((tag, idx) => (
                      <span 
                        key={tag} 
                        style={{ transitionDelay: `${idx * 80}ms` }}
                        className="text-[10px] font-mono bg-[#FCFAF2] px-2 py-0.5 border border-charcoal/10 rounded-sm text-charcoal/70 tag-transition group-hover/project2:-translate-y-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={projectList[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white border border-charcoal/10 rounded-full hover:bg-sage/20 hover:border-sage hover:text-sage hover:scale-105 active:scale-95 transition-[transform,background-color,border-color,color] text-charcoal flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </PaperCard>
            </div>
          </ScrollRevealItem>

          {/* Project 3 */}
          <ScrollRevealItem delay={300} className="flex w-full max-w-xl flex-col h-full group/project3 relative pt-6 mx-auto lg:max-w-none">
            
            {/* Duplicated backing card slightly right and bottom */}
            <div className="absolute inset-2 bg-white border border-[#E0DBCF] shadow-scrapbook-sm rounded-sm z-0 translate-x-4 translate-y-4 -rotate-1 transition-[transform] duration-500 ease-in-out group-hover/project3:translate-x-3 group-hover/project3:translate-y-3"></div>

            <div className="relative z-10 transition-[transform] duration-500 ease-in-out group-hover/project3:-translate-y-1.5 group-hover/project3:-rotate-1">
            <PaperCard 
              variant="polaroid" 
              rotation="none" 
              tape="none" 
              className="flex-1 flex flex-col justify-between relative z-10 pt-12 -rotate-1 hover:translate-y-0 hover:-rotate-1 hover:shadow-scrapbook-md"
            >
              {/* Tape-2.png holding the card top right */}
              <div className="absolute top-6 right-40 w-30 h-11 z-40 -rotate-50 pointer-events-none select-none">
                <Image 
                  src="/assets/tape-5.png" 
                  alt="Tape" 
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              {/* Green leaf doodle climbing up the right side of the card inside card to lift together */}
              <Doodle 
                src="/assets/leaf-1-mask.png"
                className="absolute top-[35%] -right-8 w-16 h-16 rotate-75 z-20 animate-float-ambient-slow select-none" 
                color="bg-sage" 
              />

              <div 
                onClick={() => openLightbox(2)}
                className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden cursor-pointer"
              >
                <Image 
                  src={projectList[2].images[0]} 
                  alt="Herman Ottó Museum investigation game" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain transition-transform duration-750 ease-out hover:scale-103"
                />
                <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-charcoal/10 font-handwriting text-sm text-charcoal/80 shadow-scrapbook-sm select-none pointer-events-none z-10">
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>{projectList[2].images.length}</span>
                </div>
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Herman Ottó Museum - Game</span>
                    <Doodle src="/assets/star-2.svg" className="w-3.5 h-3.5" color="bg-yellow-600 animate-pulse" />
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    An investigation-style quiz game for the Herman Ottó Museum in Miskolc, turning the museum visit into a playful discovery experience.
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "Tailwind CSS"].map((tag, idx) => (
                      <span 
                        key={tag} 
                        style={{ transitionDelay: `${idx * 80}ms` }}
                        className="text-[10px] font-mono bg-[#FCFAF2] px-2 py-0.5 border border-charcoal/10 rounded-sm text-charcoal/70 tag-transition group-hover/project3:-translate-y-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={projectList[2].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white border border-charcoal/10 rounded-full hover:bg-sage/20 hover:border-sage hover:text-sage hover:scale-105 active:scale-95 transition-[transform,background-color,border-color,color] text-charcoal flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              {/* Side Leaf doodle */}
              <Doodle 
                src="/assets/leaf-2.svg" 
                className="absolute -right-6 bottom-[40%] w-12 h-12 rotate-80 opacity-70 animate-float-ambient" 
                color="bg-sage"
              />
            </PaperCard>
            </div>
          </ScrollRevealItem>

        </div>

      </ScrollReveal>

      {/* Cozy Scrapbook Image Lightbox Modal */}
      {mounted && lightbox.isOpen && createPortal(
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal/90 backdrop-blur-md transition-opacity duration-300 animate-fade-in cursor-zoom-out"
        >
          {/* Modal Content - Polaroid frame style */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white border border-[#E0DBCF] p-5 pb-16 shadow-2xl rounded-sm max-w-[95vw] md:max-w-4xl max-h-[95vh] flex flex-col justify-between cursor-default animate-scale-up"
          >
            {/* Top Washi Tape Piece acting as a Close hanger */}
            <button 
              onClick={closeLightbox}
              className="absolute -top-9 left-1/2 -translate-x-1/2 -rotate-2 w-48 h-14 z-50 cursor-pointer drop-shadow-sm select-none hover:-translate-y-0.5 transition-transform active:scale-95"
            >
              <Image 
                src="/assets/tape-4.png" 
                alt="Close Tape" 
                fill
                sizes="192px"
                className="object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold text-charcoal/70 tracking-widest uppercase">CLOSE X</span>
            </button>

            {/* Polaroid Main Image Area */}
            <div className="relative aspect-4/3 w-full bg-offwhite border border-charcoal/5 rounded-xs overflow-hidden flex-1 min-h-[350px] md:min-h-[500px]">
              <div key={`${lightbox.projectIndex}-${lightbox.imageIndex}`} className={`relative w-full h-full ${activeAnimation}`}>
                <Image 
                  src={projectList[lightbox.projectIndex].images[lightbox.imageIndex]} 
                  alt={projectList[lightbox.projectIndex].title} 
                  fill
                  sizes="(max-width: 768px) 95vw, 896px"
                  className="object-contain"
                />
              </div>
            </div>

            {hasMultipleLightboxImages && (
              <div className="mt-4 flex items-center justify-center gap-1.5">
                {lightboxImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => showImage(index)}
                    className={cn(
                      "h-2.5 rounded-full border border-charcoal/10 transition-[width,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal",
                      INDICATOR_COLORS[index % INDICATOR_COLORS.length].hover,
                      index === lightbox.imageIndex
                        ? `w-5 ${INDICATOR_COLORS[index % INDICATOR_COLORS.length].active}`
                        : `w-2.5 ${INDICATOR_COLORS[index % INDICATOR_COLORS.length].inactive}`
                    )}
                    aria-label={`Show image ${index + 1}`}
                    aria-current={index === lightbox.imageIndex ? "true" : undefined}
                  />
                ))}
              </div>
            )}

            {/* Polaroid Bottom Signature Label */}
            <div className="mt-3 font-handwriting text-center text-4xl font-bold text-charcoal/90 tracking-tight leading-none">
              {projectList[lightbox.projectIndex].title}
            </div>

            {/* Custom Navigation buttons */}
            {hasMultipleLightboxImages && (
              <>
                <button 
                  onClick={showPrev}
                  onMouseEnter={randomizeLeftColor}
                  className={`absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 p-3 bg-white border border-charcoal/10 rounded-full hover:scale-105 active:scale-95 transition-[transform,background-color,border-color,color] text-charcoal flex items-center justify-center shadow-lg z-50 cursor-pointer w-12 h-12 ${HOVER_COLORS[leftColorIndex].bg} ${HOVER_COLORS[leftColorIndex].border} ${HOVER_COLORS[leftColorIndex].text}`}
                  aria-label="Previous image"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>

                <button 
                  onClick={showNext}
                  onMouseEnter={randomizeRightColor}
                  className={`absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 p-3 bg-white border border-charcoal/10 rounded-full hover:scale-105 active:scale-95 transition-[transform,background-color,border-color,color] text-charcoal flex items-center justify-center shadow-lg z-50 cursor-pointer w-12 h-12 ${HOVER_COLORS[rightColorIndex].bg} ${HOVER_COLORS[rightColorIndex].border} ${HOVER_COLORS[rightColorIndex].text}`}
                  aria-label="Next image"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </>
            )}

          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
