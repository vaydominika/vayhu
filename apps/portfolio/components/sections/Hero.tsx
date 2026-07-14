"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { Doodle } from "@/components/ui/Doodle";

const UnderlineHighlight = ({ className = "w-full h-3 text-pink/40" }: { className?: string }) => (
  <svg
    viewBox="0 0 300 20"
    preserveAspectRatio="none"
    fill="none"
    stroke="currentColor"
    strokeWidth="10"
    strokeLinecap="round"
    className={className}
  >
    <path d="M5 10 C50 7 120 13 295 10 M30 14 C100 11 200 13 270 12" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

export const Hero: React.FC = () => {
  const collageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const collageRectRef = useRef<DOMRect | null>(null);
  const pendingPointRef = useRef({ x: 0, y: 0 });

  const setParallaxVars = (x: number, y: number) => {
    const collage = collageRef.current;
    if (!collage) return;
    collage.style.setProperty("--hero-grid-transform", `translate3d(${x * -7}px, ${y * -7}px, 0) rotate(-6deg)`);
    collage.style.setProperty("--hero-torn-transform", `translate3d(${x * -4}px, ${y * -4}px, 0) rotate(3deg)`);
    collage.style.setProperty("--hero-card-transform", `translate3d(${x * 5}px, ${y * 5}px, 0) rotate(-1deg)`);
    collage.style.setProperty("--hero-note-transform", `translate3d(${x * 9}px, ${y * 9}px, 0) rotate(3deg)`);
  };

  const queueParallaxUpdate = (x: number, y: number) => {
    pendingPointRef.current = { x, y };
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setParallaxVars(pendingPointRef.current.x, pendingPointRef.current.y);
    });
  };

  const canUseParallax = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canUseParallax()) return;
    collageRectRef.current = event.currentTarget.getBoundingClientRect();
    event.currentTarget.dataset.parallaxActive = "true";
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.dataset.parallaxActive !== "true") return;
    const rect = collageRectRef.current;
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    queueParallaxUpdate(x, y);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    delete event.currentTarget.dataset.parallaxActive;
    collageRectRef.current = null;
    queueParallaxUpdate(0, 0);
  };

  useEffect(() => {
    setParallaxVars(0, 0);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero" 
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 md:pt-10 scroll-mt-24 relative isolate before:absolute before:-top-10 before:bottom-8 md:before:bottom-12 before:left-1/2 before:-translate-x-1/2 before:w-screen before:bg-white before:-z-10"
    >
      {/* Background doodles */}
      <Doodle 
        src="/assets/shine-1-mask.png"
        className="absolute left-[10%] top-[10%] w-36 h-36 opacity-15 rotate-12 -z-20 pointer-events-none select-none" 
        color="bg-sage" 
      />
      
      {/* Hero Left Content */}
      <div className="lg:col-span-7 flex flex-col gap-6 items-start">
        <div className="hero-enter flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
          <Sparkles className="h-3.5 w-3.5" />
          home base
        </div>
        
        {/* Scrapbook welcome label */}
        <div className="hero-enter inline-flex items-center gap-1.5">
          <span className="relative grid h-7 w-8 shrink-0 translate-y-1 -rotate-6 place-items-center">
            <Doodle
              src="/assets/banner.svg"
              className="absolute inset-0 h-full w-full"
              color="bg-pink/90"
            />
          </span>
          <span className="relative py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/70 before:absolute before:-bottom-0.5 before:left-0 before:h-1 before:w-[82%] before:-rotate-1 before:bg-pink/35 before:content-['']">
            welcome to my corner
          </span>
        </div>

        {/* Title with Hand-drawn Underline */}
        <div className="hero-enter relative" style={{ animationDelay: "100ms" }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-charcoal leading-none">
            Hi, I&apos;m <span className="relative inline-block z-10">Domi!
              <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full -z-10 text-pink/50">
                <UnderlineHighlight className="w-full h-4 md:h-6" />
              </span>
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <h2 className="hero-enter text-xl md:text-2xl font-serif text-charcoal/80 font-medium italic mt-2" style={{ animationDelay: "200ms" }}>
          frontend developer &amp; UI/UX enthusiast
        </h2>

        {/* Intro Description */}
        <p className="hero-enter max-w-xl text-base md:text-lg text-charcoal/80 leading-relaxed font-sans mt-2" style={{ animationDelay: "300ms" }}>
          I create responsive, user-friendly websites with a focus on clean code, thoughtful design, and delightful user experiences.
        </p>

        {/* CTAs */}
        <div className="hero-enter flex flex-wrap items-center gap-4 mt-4" style={{ animationDelay: "400ms" }}>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-sage hover:bg-sage/90 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-none shadow-scrapbook-md hover:shadow-scrapbook-lg btn-transition text-sm border border-emerald-800/20 cursor-pointer"
          >
            <span>View my projects</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          
          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-white hover:bg-pink/10 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-none border border-pink/60 shadow-scrapbook-sm hover:shadow-scrapbook-md btn-transition text-sm cursor-pointer"
          >
            <span>About me</span>
            <Doodle src="/assets/heart-1.svg" className="w-4 h-4" color="bg-pink" />
          </a>
        </div>

        {/* Small decorative doodles */}
        <div className="hero-enter hidden sm:flex items-center gap-8 mt-6 text-charcoal/40" style={{ animationDelay: "500ms" }}>
          <span className="flex items-center gap-1.5 text-xs font-mono">
            <Doodle src="/assets/leaf-1-mask.png" className="w-5 h-5 animate-float-ambient" color="bg-sage" /> designer mindset
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono">
            <Doodle src="/assets/star-1-mask.png" className="w-4 h-4 animate-float-ambient-slow" color="bg-pink" /> developer skills
          </span>
        </div>

      </div>

      {/* Hero Right Collage with mouse parallax */}
      <div
        ref={collageRef}
        className="hero-collage hero-enter lg:col-span-5 relative mx-auto flex w-full max-w-[430px] justify-center items-center py-6 group/collage lg:max-w-none"
        style={{ animationDelay: "600ms" }}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        
        {/* Grid Pattern Sheet behind polaroid */}
        <div 
          className="hero-parallax-layer absolute w-[80%] h-[105%] bg-white grid-lines border border-[#D5D0C2]/20 rounded-lg shadow-scrapbook-sm -z-10 transition-hero-smooth"
          style={{ transform: "var(--hero-grid-transform, translate3d(0, 0, 0) rotate(-6deg)) var(--hero-grid-hover-transform, translate3d(0, 0, 0) rotate(0deg))" }}
        ></div>
        
        {/* Torn green sheet behind */}
        <div 
          className="hero-parallax-layer absolute w-[85%] h-[98%] bg-sage/35 border border-sage/40 rounded-sm -z-20 transition-hero-smooth"
          style={{
            transform: "var(--hero-torn-transform, translate3d(0, 0, 0) rotate(3deg)) var(--hero-torn-hover-transform, translate3d(0, 0, 0) rotate(0deg))",
            clipPath: "polygon(0% 6%, 3% 8%, 6% 5%, 9% 9%, 13% 6%, 16% 8%, 20% 5%, 23% 9%, 27% 6%, 30% 8%, 34% 5%, 37% 9%, 40% 6%, 44% 8%, 48% 5%, 51% 9%, 55% 6%, 58% 8%, 62% 5%, 65% 9%, 68% 6%, 72% 8%, 76% 5%, 80% 9%, 84% 5%, 87% 9%, 90% 6%, 94% 8%, 97% 5%, 100% 8%, 100% 92%, 97% 95%, 94% 91%, 90% 94%, 87% 92%, 84% 96%, 80% 92%, 76% 95%, 72% 91%, 68% 94%, 65% 91%, 62% 95%, 58% 92%, 55% 94%, 51% 91%, 48% 95%, 44% 92%, 40% 94%, 37% 91%, 34% 95%, 30% 92%, 27% 94%, 23% 91%, 20% 95%, 16% 92%, 13% 94%, 9% 91%, 6% 95%, 3% 92%, 0% 94%)"
          }}
        ></div>
        
        {/* Main Polaroid Card */}
        <div
          className="hero-parallax-layer w-[85%] sm:w-[320px] z-10 transition-hero-smooth"
          style={{ transform: "var(--hero-card-transform, translate3d(0, 0, 0) rotate(-1deg)) var(--hero-card-hover-transform, translate3d(0, 0, 0))" }}
        >
          <PaperCard 
            variant="polaroid" 
            rotation="none" 
            tape="none" 
            className="w-full shadow-scrapbook-md border border-[#D5D0C2]/40 hover:translate-y-0 hover:rotate-0 hover:shadow-scrapbook-md"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-10 z-30 pointer-events-none select-none">
              <Image 
                src="/assets/tape-4.png" 
                alt="Tape" 
                fill
                sizes="128px"
                className="object-contain"
                loading="eager"
              />
            </div>
            <div className="relative aspect-square w-full bg-offwhite overflow-hidden rounded-xs border border-charcoal/5">
              <Image 
                src="/assets/mee.jpg" 
                alt="Domi" 
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover grayscale-15"
                preload
              />
            </div>
          </PaperCard>
        </div>

        {/* Yellow Sticky Note layered on the bottom right corner */}
        <div
          className="hero-parallax-layer absolute bottom-3 right-0 sm:right-[2px] z-20 transition-hero-smooth"
          style={{ transform: "var(--hero-note-transform, translate3d(0, 0, 0) rotate(3deg)) var(--hero-note-hover-transform, translate3d(0, 0, 0) rotate(0deg))" }}
        >
          <PaperCard 
            variant="sticky-yellow" 
            rotation="none" 
            className="w-24 h-24 sm:w-[112px] sm:h-[112px] lg:w-[120px] lg:h-[120px] text-center border-b-2 border-r-2 hover:translate-y-0 hover:rotate-0 hover:shadow-scrapbook-sm"
          >
            <div className="font-serif text-sm sm:text-base font-semibold leading-relaxed text-charcoal/90 animate-fade-in">
              welcome!
            </div>
            <Doodle src="/assets/heart-2.svg" className="w-4 h-4 mx-auto animate-float-ambient" color="bg-pink/70" />
          </PaperCard>
        </div>

        {/* Flower and leaf doodles attached on the collage edges */}
        <div className="absolute -top-10 -right-8 w-16 h-16 rotate-45 select-none pointer-events-none opacity-80 animate-float-ambient-slow">
          <Doodle src="/assets/leaf-2.svg" className="w-full h-full" color="bg-sage" />
        </div>
        <div className="absolute bottom-6 -left-10 w-12 h-12 -rotate-12 select-none pointer-events-none animate-float-ambient">
          <Doodle src="/assets/strawberry-1.svg" className="w-full h-full" color="bg-pink/80" />
        </div>
        
        <Doodle src="/assets/shine-2.svg" className="absolute top-[20%] right-[-10px] w-6 h-6 animate-float-ambient" color="bg-pink/60" />
        <Doodle src="/assets/star-5-mask.png" className="absolute bottom-[20%] left-[-15px] w-5 h-5 animate-float-ambient-slow" color="bg-teal/80" />

      </div>

      {/* Ripped Edge Divider */}
      <div className="col-span-full w-screen relative left-1/2 right-1/2 -translate-x-1/2 h-12 md:h-20 mt-2 md:mt-8 -top-0.5 md:top-8 pointer-events-none select-none">
        <Image 
          src="/assets/bottom-ripped.png" 
          alt="Ripped paper divider"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          loading="eager"
        />
      </div>

    </section>
  );
};
