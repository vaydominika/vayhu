import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { Doodle } from "@/components/ui/Doodle";

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
    title: "Bookish Haven",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=90"
    ]
  },
  {
    title: "Focus Flow",
    images: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1200&q=90"
    ]
  },
  {
    title: "Clay & Craft",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1576016770956-debb63d90029?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=90"
    ]
  }
];

interface ProjectsProps {
  scrollTo: (id: string) => void;
}

const HOVER_COLORS = [
  { bg: "hover:bg-pink/20", border: "hover:border-pink", text: "hover:text-pink" },
  { bg: "hover:bg-teal/20", border: "hover:border-teal", text: "hover:text-teal" },
  { bg: "hover:bg-sage/20", border: "hover:border-sage", text: "hover:text-sage" },
  { bg: "hover:bg-[#EAE44D]/25", border: "hover:border-[#EAE44D]", text: "hover:text-amber-700" }
];

const TRANSITION_ANIMATIONS = [
  "animate-paper-tear",
  "animate-paper-spin",
  "animate-paper-slide",
  "animate-paper-bounce"
];

export const Projects: React.FC<ProjectsProps> = ({ scrollTo }) => {
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; projectIndex: number; imageIndex: number }>({
    isOpen: false,
    projectIndex: 0,
    imageIndex: 0
  });

  const [mounted, setMounted] = useState(false);
  const [leftColorIndex, setLeftColorIndex] = useState(0);
  const [rightColorIndex, setRightColorIndex] = useState(1);
  const [activeAnimation, setActiveAnimation] = useState("animate-paper-tear");

  const randomizeLeftColor = () => {
    const nextIdx = Math.floor(Math.random() * HOVER_COLORS.length);
    setLeftColorIndex(nextIdx);
  };

  const randomizeRightColor = () => {
    const nextIdx = Math.floor(Math.random() * HOVER_COLORS.length);
    setRightColorIndex(nextIdx);
  };

  const triggerRandomAnimation = () => {
    const nextAnim = TRANSITION_ANIMATIONS[Math.floor(Math.random() * TRANSITION_ANIMATIONS.length)];
    setActiveAnimation(nextAnim);
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const images = projectList[lightbox.projectIndex].images;
    setLightbox(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + images.length) % images.length
    }));
    randomizeLeftColor();
    triggerRandomAnimation();
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const images = projectList[lightbox.projectIndex].images;
    setLightbox(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % images.length
    }));
    randomizeRightColor();
    triggerRandomAnimation();
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, projectIndex: 0, imageIndex: 0 });
  };

  const openLightbox = (projectIndex: number) => {
    triggerRandomAnimation();
    setLightbox({ isOpen: true, projectIndex, imageIndex: 0 });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightbox.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.isOpen, lightbox.projectIndex]);

  return (
    <section id="projects" className="scroll-mt-24 relative isolate">
      {/* Background doodles - made significantly more visible */}
      <Doodle 
        src="/assets/spiral-2.svg" 
        className="absolute -left-4 top-20 w-32 h-32 opacity-65 -rotate-45 -z-10 pointer-events-none select-none animate-float-ambient" 
        color="bg-pink/80" 
      />
      <Doodle 
        src="/assets/star-9.svg" 
        className="absolute right-4 top-1/2 w-32 h-32 opacity-60 rotate-12 -z-10 pointer-events-none select-none animate-float-ambient-slow" 
        color="bg-teal" 
      />
      <Doodle 
        src="/assets/star-4.svg" 
        className="absolute left-1/3 bottom-0 w-20 h-20 opacity-60 rotate-90 -z-10 pointer-events-none select-none animate-pulse" 
        color="bg-sage" 
      />

      <ScrollReveal>
        
        {/* Header row containing only action buttons now, since Title sits on the first card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mb-14 pt-4">
          <button 
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-pink btn-transition cursor-pointer group px-4 py-2 bg-white rounded-full border border-charcoal/10 shadow-scrapbook-sm hover:-translate-y-0.5"
          >
            <span>See all projects</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Project 1 with Projects Badge overlapping */}
          <ScrollRevealItem delay={0} className="flex flex-col h-full group relative pt-6">
            
            <PaperCard 
              variant="polaroid" 
              rotation="-rotate-2" 
              className="flex-1 flex flex-col justify-between pt-12 relative overflow-visible"
            >
              {/* Projects Badge replacing the old Pink Projects Tab */}
              <div className="absolute -top-14 left-2 w-32 h-32 z-30 select-none flex items-center justify-center rotate-[-6deg] drop-shadow-md transition-cozy group-hover:-translate-y-1">
                <Doodle 
                  src="/assets/badge-1.svg" 
                  className="absolute inset-0 w-full h-full" 
                  color="bg-pink" 
                />
                <span className="relative z-10 font-serif font-bold text-lg text-charcoal pt-1 pr-1">Projects</span>
              </div>
              
              {/* Pink tape piece holding the projects tab inside card to lift together */}
              <div className="absolute top-8 left-[95px] w-40 h-9 z-40 rotate-6 pointer-events-none select-none">
                <Image 
                  src="/assets/tape-2.png" 
                  alt="Tape" 
                  fill 
                  className="object-contain"
                />
              </div>

              {/* Star sticker overlapping the top right of the photo frame */}
              <Doodle 
                src="/assets/star-1.svg" 
                className="absolute top-10 right-4 w-7 h-7 rotate-12 z-20 animate-pulse" 
                color="bg-teal" 
              />

              <div 
                onClick={() => openLightbox(0)}
                className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden cursor-pointer"
              >
                <Image 
                  src={projectList[0].images[0]} 
                  alt="Bookish Haven Discovery platform" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-750 ease-out hover:scale-103"
                />
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Bookish Haven</span>
                    <Doodle src="/assets/heart-1.svg" className="w-3.5 h-3.5" color="bg-pink" />
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A cozy book discovery platform with reviews, recommendations, and personal bookshelves.
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "Tailwind CSS", "TypeScript"].map((tag, idx) => (
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
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white border border-charcoal/10 rounded-full hover:bg-sage/20 hover:border-sage hover:text-sage hover:scale-105 active:scale-95 transition-all text-charcoal flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </PaperCard>
          </ScrollRevealItem>

          {/* Project 2 */}
          <ScrollRevealItem delay={150} className="flex flex-col h-full md:translate-y-4 group relative pt-6">
            
            {/* Blue card behind */}
            <div className="absolute inset-y-12 left-1/2 translate-y-8 -translate-x-1/2 w-[98%] bg-teal/80 border border-[#9BBAB4]/50 shadow-scrapbook-sm rounded-sm z-0 rotate-1 transition-all duration-500 ease-in-out group-hover:translate-y-5 group-hover:rotate-2"></div>

            <PaperCard 
              variant="polaroid" 
              rotation="rotate-1" 
              pushpin={false}
              className=" flex flex-col justify-between z-10 h-[440px] pt-12 relative overflow-visible"
            >
              {/* Button holding the card - colored pink using CSS mask */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 z-40 drop-shadow-sm pointer-events-none select-none">
                <div 
                  className="w-full h-full bg-pink"
                  style={{
                    maskImage: "url(/assets/button-1.svg)",
                    WebkitMaskImage: "url(/assets/button-1.svg)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                  }}
                />
              </div>

              {/* bottom-ripped-2.png at the bottom of the card */}
              <div className="absolute bottom-[-6px] left-0 right-0 h-6 pointer-events-none select-none z-20">
                <Image 
                  src="/assets/bottom-ripped-2.png" 
                  alt="Ripped bottom edge" 
                  fill 
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
                  alt="Focus Flow app" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-750 ease-out hover:scale-103"
                />
              </div>
              <div className="mt-2.5 flex flex-col gap-2 z-10">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Focus Flow</span>
                    <span className="text-teal font-mono text-[10px]">🌱 grid</span>
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A productivity app that helps you stay focused, track habits, and achieve your goals.
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "TypeScript", "Chart.js"].map((tag, idx) => (
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
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white border border-charcoal/10 rounded-full hover:bg-sage/20 hover:border-sage hover:text-sage hover:scale-105 active:scale-95 transition-all text-charcoal flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
                  >
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </PaperCard>
          </ScrollRevealItem>

          {/* Project 3 */}
          <ScrollRevealItem delay={300} className="flex flex-col h-full group relative pt-6">
            
            {/* Duplicated backing card slightly right and bottom */}
            <div className="absolute inset-2 bg-white border border-[#E0DBCF] shadow-scrapbook-sm rounded-sm z-0 translate-x-4 translate-y-4 -rotate-1 transition-all duration-500 ease-in-out group-hover:translate-x-3 group-hover:translate-y-3"></div>

            <PaperCard 
              variant="polaroid" 
              rotation="-rotate-1" 
              tape="none" 
              className="flex-1 flex flex-col justify-between relative z-10 pt-12"
            >
              {/* Tape-2.png holding the card top right */}
              <div className="absolute top-6 right-40 w-30 h-11 z-40 -rotate-50 pointer-events-none select-none">
                <Image 
                  src="/assets/tape-5.png" 
                  alt="Tape" 
                  fill 
                  className="object-contain"
                />
              </div>
              {/* Green leaf doodle climbing up the right side of the card inside card to lift together */}
              <Doodle 
                src="/assets/leaf-1.svg" 
                className="absolute top-[35%] -right-8 w-16 h-16 rotate-75 z-20 animate-float-ambient-slow select-none" 
                color="bg-sage" 
              />

              <div 
                onClick={() => openLightbox(2)}
                className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden cursor-pointer"
              >
                <Image 
                  src={projectList[2].images[0]} 
                  alt="Clay & Craft Ceramics shop" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-750 ease-out hover:scale-103"
                />
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Clay &amp; Craft</span>
                    <Doodle src="/assets/star-2.svg" className="w-3.5 h-3.5" color="bg-yellow-600 animate-pulse" />
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A handmade ceramics shop with a minimal, earthy design and smooth shopping experience.
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "Tailwind CSS", "Stripe"].map((tag, idx) => (
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
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white border border-charcoal/10 rounded-full hover:bg-sage/20 hover:border-sage hover:text-sage hover:scale-105 active:scale-95 transition-all text-charcoal flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
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
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Scrapbook style handwritten page counter */}
              <div className="absolute bottom-3 right-4 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-charcoal/10 font-handwriting text-base text-charcoal/80 shadow-scrapbook-sm select-none z-10">
                {lightbox.imageIndex + 1} / {projectList[lightbox.projectIndex].images.length}
              </div>
            </div>

            {/* Polaroid Bottom Signature Label */}
            <div className="mt-6 font-handwriting text-center text-4xl font-bold text-charcoal/90 tracking-tight leading-none">
              {projectList[lightbox.projectIndex].title}
            </div>

            {/* Custom Navigation buttons */}
            <button 
              onClick={showPrev}
              onMouseEnter={randomizeLeftColor}
              className={`absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 p-3 bg-white border border-charcoal/10 rounded-full hover:scale-105 active:scale-95 transition-all text-charcoal flex items-center justify-center shadow-lg z-50 cursor-pointer w-12 h-12 ${HOVER_COLORS[leftColorIndex].bg} ${HOVER_COLORS[leftColorIndex].border} ${HOVER_COLORS[leftColorIndex].text}`}
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <button 
              onClick={showNext}
              onMouseEnter={randomizeRightColor}
              className={`absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 p-3 bg-white border border-charcoal/10 rounded-full hover:scale-105 active:scale-95 transition-all text-charcoal flex items-center justify-center shadow-lg z-50 cursor-pointer w-12 h-12 ${HOVER_COLORS[rightColorIndex].bg} ${HOVER_COLORS[rightColorIndex].border} ${HOVER_COLORS[rightColorIndex].text}`}
              aria-label="Next image"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
