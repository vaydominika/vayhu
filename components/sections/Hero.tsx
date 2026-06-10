import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { 
  UnderlineHighlight, 
  LeafDoodle, 
  SparkleStar, 
  HeartDoodle, 
  FlowerDoodle,
  ArrowRightDoodle
} from "@/components/ScrapbookDoodles";

interface HeroProps {
  isMounted: boolean;
  mousePos: { x: number; y: number };
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  scrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  isMounted,
  mousePos,
  handleMouseMove,
  handleMouseLeave,
  scrollTo,
}) => {
  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 md:pt-10 scroll-mt-24 relative isolate before:absolute before:-top-10 before:bottom-8 md:before:bottom-12 before:left-1/2 before:-translate-x-1/2 before:w-screen before:bg-white before:-z-10"
    >
      
      {/* Hero Left Content */}
      <div className="lg:col-span-7 flex flex-col gap-6 items-start">
        
        {/* Tag Badge */}
        <div 
          className={`inline-flex items-center gap-1.5 px-3 py-1 bg-sage/20 border border-sage/40 rounded-full text-xs font-medium text-emerald-800/80 shadow-sm transition-all duration-800 ease-out transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Sparkles className="w-3 h-3 animate-spin-slow" />
          <span>welcome to my corner</span>
        </div>

        {/* Title with Hand-drawn Underline */}
        <div 
          className={`relative transition-all duration-800 ease-out delay-100 transform ${
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
          className={`text-xl md:text-2xl font-serif text-charcoal/80 font-medium italic mt-2 transition-all duration-800 ease-out delay-200 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          frontend developer &amp; UI/UX enthusiast
        </h2>

        {/* Intro Description */}
        <p 
          className={`max-w-xl text-base md:text-lg text-charcoal/80 leading-relaxed font-sans mt-2 transition-all duration-800 ease-out delay-300 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          I create responsive, user-friendly websites with a focus on clean code, thoughtful design, and delightful user experiences.
        </p>

        {/* CTAs */}
        <div 
          className={`flex flex-wrap items-center gap-4 mt-4 transition-all duration-800 ease-out delay-400 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group inline-flex items-center gap-2 bg-sage hover:bg-sage/90 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-full shadow-scrapbook-md hover:shadow-scrapbook-lg btn-transition text-sm border border-emerald-800/20 cursor-pointer"
          >
            <span>View my projects</span>
            <ArrowRightDoodle className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => scrollTo("about")}
            className="inline-flex items-center gap-2 bg-white hover:bg-pink/10 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-full border border-pink/60 shadow-scrapbook-sm hover:shadow-scrapbook-md btn-transition text-sm cursor-pointer"
          >
            <span>About me</span>
            <HeartDoodle className="w-4 h-4 text-pink" />
          </button>
        </div>

        {/* Small decorative doodles */}
        <div 
          className={`hidden sm:flex items-center gap-8 mt-6 text-charcoal/40 transition-all duration-800 ease-out delay-500 transform ${
            isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="flex items-center gap-1 text-xs font-mono"><LeafDoodle className="w-5 h-5 text-sage animate-float-ambient" /> designer mindset</span>
          <span className="flex items-center gap-1 text-xs font-mono"><SparkleStar className="w-4 h-4 text-pink animate-float-ambient-slow" /> developer skills</span>
        </div>

      </div>

      {/* Hero Right Collage with mouse parallax */}
      <div 
        className={`lg:col-span-5 relative flex justify-center items-center py-6 group/collage transition-all duration-800 ease-out delay-[600ms] transform ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        
        {/* Grid Pattern Sheet behind polaroid */}
        <div 
          className="absolute w-[80%] h-[105%] bg-white grid-lines border border-[#D5D0C2]/20 rounded-lg shadow-scrapbook-sm -z-10 transition-cozy group-hover/collage:-translate-y-2 group-hover/collage:-rotate-3"
          style={{
            transform: `translate(${mousePos.x * -7}px, ${mousePos.y * -7}px) rotate(-6deg)`
          }}
        ></div>
        
        {/* Torn green sheet behind */}
        <div 
          className="absolute w-[85%] h-[98%] bg-sage/35 border border-sage/40 rounded-sm -z-20 transition-cozy group-hover/collage:-translate-y-1 group-hover/collage:rotate-2"
          style={{
            transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px) rotate(3deg)`,
            clipPath: "polygon(0% 6%, 3% 8%, 6% 5%, 9% 9%, 13% 6%, 16% 8%, 20% 5%, 23% 9%, 27% 6%, 30% 8%, 34% 5%, 37% 9%, 40% 6%, 44% 8%, 48% 5%, 51% 9%, 55% 6%, 58% 8%, 62% 5%, 65% 9%, 68% 6%, 72% 8%, 76% 5%, 80% 9%, 84% 5%, 87% 9%, 90% 6%, 94% 8%, 97% 5%, 100% 8%, 100% 92%, 97% 95%, 94% 91%, 90% 94%, 87% 92%, 84% 96%, 80% 92%, 76% 95%, 72% 91%, 68% 94%, 65% 91%, 62% 95%, 58% 92%, 55% 94%, 51% 91%, 48% 95%, 44% 92%, 40% 94%, 37% 91%, 34% 95%, 30% 92%, 27% 94%, 23% 91%, 20% 95%, 16% 92%, 13% 94%, 9% 91%, 6% 95%, 3% 92%, 0% 94%)"
          }}
        ></div>
        
        {/* Main Polaroid Card */}
        <div
          className="w-[85%] sm:w-[320px] z-10 transition-cozy group-hover/collage:-translate-y-3"
          style={{
            transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px) rotate(-1deg)`
          }}
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
                className="object-cover grayscale-15 hover:grayscale-0 transition-all duration-500 hover:scale-103"
                priority
              />
            </div>
            <div className="mt-4 font-serif text-center text-sm font-medium italic text-charcoal/80">
              learning by coding &amp; designing ✨
            </div>
          </PaperCard>
        </div>

        {/* Yellow Sticky Note layered on the bottom right corner */}
        <div
          className="absolute bottom-2 sm:right-[2px] z-20 transition-cozy group-hover/collage:-translate-y-2 group-hover/collage:rotate-6"
          style={{
            transform: `translate(${mousePos.x * 9}px, ${mousePos.y * 9}px) rotate(3deg)`
          }}
        >
          <PaperCard 
            variant="sticky-yellow" 
            rotation="none" 
            className="w-[120px] h-[120px] text-center border-b-2 border-r-2"
          >
            <div className="font-serif text-xs font-semibold leading-relaxed flex flex-col gap-1 text-charcoal/90">
              <span className="block">coffee</span>
              <span className="block">code</span>
              <span className="block">creativity</span>
            </div>
            <HeartDoodle className="w-4 h-4 text-pink/70 mx-auto animate-float-ambient" />
          </PaperCard>
        </div>

        {/* Flower and leaf doodles attached on the collage edges */}
        <div 
          className="absolute -top-10 -right-8 w-16 h-16 select-none pointer-events-none opacity-80 animate-float-ambient-slow"
          style={{
            transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px) rotate(45deg)`
          }}
        >
          <LeafDoodle className="w-full h-full text-sage" />
        </div>
        <div 
          className="absolute bottom-6 -left-10 w-12 h-12 select-none pointer-events-none animate-float-ambient"
          style={{
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px) rotate(-12deg)`
          }}
        >
        </div>
        <SparkleStar className="absolute top-[20%] right-[-10px] w-6 h-6 text-pink/60 animate-float-ambient" />
        <SparkleStar className="absolute bottom-[20%] left-[-15px] w-5 h-5 text-teal/80 animate-float-ambient-slow" />

      </div>

      {/* Ripped Edge Divider */}
      <div className="col-span-full w-screen relative left-1/2 right-1/2 -translate-x-1/2 h-12 md:h-20 mt-8 top-8 pointer-events-none select-none">
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
