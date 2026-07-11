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

interface HeroProps {
  isMounted: boolean;
  scrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  isMounted,
  scrollTo,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const setParallaxVars = (x: number, y: number) => {
    const section = sectionRef.current;
    if (!section) return;

    section.style.setProperty("--hero-grid-transform", `translate3d(${x * -7}px, ${y * -7}px, 0) rotate(-6deg)`);
    section.style.setProperty("--hero-torn-transform", `translate3d(${x * -4}px, ${y * -4}px, 0) rotate(3deg)`);
    section.style.setProperty("--hero-card-transform", `translate3d(${x * 5}px, ${y * 5}px, 0) rotate(-1deg)`);
    section.style.setProperty("--hero-note-transform", `translate3d(${x * 9}px, ${y * 9}px, 0) rotate(3deg)`);
    section.style.setProperty("--hero-leaf-transform", `translate3d(${x * 3}px, ${y * 3}px, 0) rotate(45deg)`);
    section.style.setProperty("--hero-strawberry-transform", `translate3d(${x * 2}px, ${y * 2}px, 0) rotate(-12deg)`);
  };

  const queueParallaxUpdate = (x: number, y: number) => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setParallaxVars(x, y);
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    queueParallaxUpdate(x, y);
  };

  const handleMouseLeave = () => {
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
      ref={sectionRef}
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 md:pt-10 scroll-mt-24 relative isolate before:absolute before:-top-10 before:bottom-8 md:before:bottom-12 before:left-1/2 before:-translate-x-1/2 before:w-screen before:bg-white before:-z-10"
    >
      {/* Background doodles */}
      <Doodle 
        src="/assets/shine-1.svg" 
        className="absolute left-[10%] top-[10%] w-36 h-36 opacity-15 rotate-12 -z-20 pointer-events-none select-none" 
        color="bg-sage" 
      />
      
      {/* Hero Left Content */}
      <div className="lg:col-span-7 flex flex-col gap-6 items-start">
        <div
          className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45 transition-[opacity,transform] duration-800 ease-out transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          home base
        </div>
        
        {/* Tag Badge */}
        <div 
          className={`inline-flex items-center gap-1.5 px-3 py-1 bg-sage/20 border border-sage/40 rounded-full text-xs font-medium text-emerald-800/80 shadow-sm transition-[opacity,transform] duration-800 ease-out transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Sparkles className="w-3 h-3 animate-spin-slow" />
          <span>welcome to my corner</span>
        </div>

        {/* Title with Hand-drawn Underline */}
        <div 
          className={`relative transition-[opacity,transform] duration-800 ease-out delay-100 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-charcoal leading-none">
            Hi, I'm <span className="relative inline-block z-10">Domi!
              <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full -z-10 text-pink/50">
                <UnderlineHighlight className="w-full h-4 md:h-6" />
              </span>
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <h2 
          className={`text-xl md:text-2xl font-serif text-charcoal/80 font-medium italic mt-2 transition-[opacity,transform] duration-800 ease-out delay-200 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          frontend developer &amp; UI/UX enthusiast
        </h2>

        {/* Intro Description */}
        <p 
          className={`max-w-xl text-base md:text-lg text-charcoal/80 leading-relaxed font-sans mt-2 transition-[opacity,transform] duration-800 ease-out delay-300 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          I create responsive, user-friendly websites with a focus on clean code, thoughtful design, and delightful user experiences.
        </p>

        {/* CTAs */}
        <div 
          className={`flex flex-wrap items-center gap-4 mt-4 transition-[opacity,transform] duration-800 ease-out delay-400 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center gap-2 bg-sage hover:bg-sage/90 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-none shadow-scrapbook-md hover:shadow-scrapbook-lg btn-transition text-sm border border-emerald-800/20 cursor-pointer"
          >
            <span>View my projects</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => scrollTo("about")}
            className="inline-flex items-center gap-2 bg-white hover:bg-pink/10 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-none border border-pink/60 shadow-scrapbook-sm hover:shadow-scrapbook-md btn-transition text-sm cursor-pointer"
          >
            <span>About me</span>
            <Doodle src="/assets/heart-1.svg" className="w-4 h-4" color="bg-pink" />
          </button>
        </div>

        {/* Small decorative doodles */}
        <div 
          className={`hidden sm:flex items-center gap-8 mt-6 text-charcoal/40 transition-[opacity,transform] duration-800 ease-out delay-500 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="flex items-center gap-1.5 text-xs font-mono">
            <Doodle src="/assets/leaf-1.svg" className="w-5 h-5 animate-float-ambient" color="bg-sage" /> designer mindset
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono">
            <Doodle src="/assets/star-1.svg" className="w-4 h-4 animate-float-ambient-slow" color="bg-pink" /> developer skills
          </span>
        </div>

      </div>

      {/* Hero Right Collage with mouse parallax */}
      <div 
        className={`lg:col-span-5 relative mx-auto flex w-full max-w-[430px] justify-center items-center py-6 group/collage transition-[opacity,transform] duration-800 ease-out delay-[600ms] transform lg:max-w-none ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        
        {/* Grid Pattern Sheet behind polaroid */}
        <div 
          className="absolute w-[80%] h-[105%] bg-white grid-lines border border-[#D5D0C2]/20 rounded-lg shadow-scrapbook-sm -z-10 transition-cozy group-hover/collage:-translate-y-2 group-hover/collage:-rotate-3 will-change-transform"
          style={{ transform: "var(--hero-grid-transform, translate3d(0, 0, 0) rotate(-6deg))" }}
        ></div>
        
        {/* Torn green sheet behind */}
        <div 
          className="absolute w-[85%] h-[98%] bg-sage/35 border border-sage/40 rounded-sm -z-20 transition-cozy group-hover/collage:-translate-y-1 group-hover/collage:rotate-2 will-change-transform"
          style={{
            transform: "var(--hero-torn-transform, translate3d(0, 0, 0) rotate(3deg))",
            clipPath: "polygon(0% 6%, 3% 8%, 6% 5%, 9% 9%, 13% 6%, 16% 8%, 20% 5%, 23% 9%, 27% 6%, 30% 8%, 34% 5%, 37% 9%, 40% 6%, 44% 8%, 48% 5%, 51% 9%, 55% 6%, 58% 8%, 62% 5%, 65% 9%, 68% 6%, 72% 8%, 76% 5%, 80% 9%, 84% 5%, 87% 9%, 90% 6%, 94% 8%, 97% 5%, 100% 8%, 100% 92%, 97% 95%, 94% 91%, 90% 94%, 87% 92%, 84% 96%, 80% 92%, 76% 95%, 72% 91%, 68% 94%, 65% 91%, 62% 95%, 58% 92%, 55% 94%, 51% 91%, 48% 95%, 44% 92%, 40% 94%, 37% 91%, 34% 95%, 30% 92%, 27% 94%, 23% 91%, 20% 95%, 16% 92%, 13% 94%, 9% 91%, 6% 95%, 3% 92%, 0% 94%)"
          }}
        ></div>
        
        {/* Main Polaroid Card */}
        <div
          className="w-[85%] sm:w-[320px] z-10 transition-cozy group-hover/collage:-translate-y-3 will-change-transform"
          style={{ transform: "var(--hero-card-transform, translate3d(0, 0, 0) rotate(-1deg))" }}
        >
          <PaperCard 
            variant="polaroid" 
            rotation="none" 
            tape="none" 
            className="w-full shadow-scrapbook-md border border-[#D5D0C2]/40"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-10 z-30 pointer-events-none select-none">
              <Image 
                src="/assets/tape-4.png" 
                alt="Tape" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="relative aspect-square w-full bg-offwhite overflow-hidden rounded-xs border border-charcoal/5">
              <Image 
                src="/assets/mee.jpg" 
                alt="Domi" 
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover grayscale-15 hover:grayscale-0 transition-[filter,transform] duration-500 hover:scale-103"
                priority
              />
            </div>
          </PaperCard>
        </div>

        {/* Yellow Sticky Note layered on the bottom right corner */}
        <div
          className="absolute bottom-3 right-0 sm:right-[2px] z-20 transition-cozy group-hover/collage:-translate-y-2 group-hover/collage:rotate-6 will-change-transform"
          style={{ transform: "var(--hero-note-transform, translate3d(0, 0, 0) rotate(3deg))" }}
        >
          <PaperCard 
            variant="sticky-yellow" 
            rotation="none" 
            className="w-24 h-24 sm:w-[112px] sm:h-[112px] lg:w-[120px] lg:h-[120px] text-center border-b-2 border-r-2"
          >
            <div className="font-serif text-sm sm:text-base font-semibold leading-relaxed text-charcoal/90 animate-fade-in">
              welcome!
            </div>
            <Doodle src="/assets/heart-2.svg" className="w-4 h-4 mx-auto animate-float-ambient" color="bg-pink/70" />
          </PaperCard>
        </div>

        {/* Flower and leaf doodles attached on the collage edges */}
        <div 
          className="absolute -top-10 -right-8 w-16 h-16 select-none pointer-events-none opacity-80 animate-float-ambient-slow will-change-transform"
          style={{ transform: "var(--hero-leaf-transform, translate3d(0, 0, 0) rotate(45deg))" }}
        >
          <Doodle src="/assets/leaf-2.svg" className="w-full h-full" color="bg-sage" />
        </div>
        <div 
          className="absolute bottom-6 -left-10 w-12 h-12 select-none pointer-events-none animate-float-ambient will-change-transform"
          style={{ transform: "var(--hero-strawberry-transform, translate3d(0, 0, 0) rotate(-12deg))" }}
        >
          <Doodle src="/assets/strawberry-1.svg" className="w-full h-full" color="bg-pink/80" />
        </div>
        
        <Doodle src="/assets/shine-2.svg" className="absolute top-[20%] right-[-10px] w-6 h-6 animate-float-ambient" color="bg-pink/60" />
        <Doodle src="/assets/star-5.svg" className="absolute bottom-[20%] left-[-15px] w-5 h-5 animate-float-ambient-slow" color="bg-teal/80" />

      </div>

      {/* Ripped Edge Divider */}
      <div className="col-span-full w-screen relative left-1/2 right-1/2 -translate-x-1/2 h-12 md:h-20 mt-2 md:mt-8 -top-0.5 md:top-8 pointer-events-none select-none">
        <Image 
          src="/assets/bottom-ripped.png" 
          alt="Ripped paper divider"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

    </section>
  );
};
