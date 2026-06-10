import React from "react";
import Image from "next/image";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { LeafDoodle, FlowerDoodle, ArrowRightDoodle, HeartDoodle } from "@/components/ScrapbookDoodles";

interface ProjectsProps {
  scrollTo: (id: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ scrollTo }) => {
  return (
    <section id="projects" className="scroll-mt-24">
      <ScrollReveal>
        
        {/* Header row containing only action buttons now, since Title sits on the first card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mb-14 pt-4">
          <button 
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-pink btn-transition cursor-pointer group px-4 py-2 bg-white rounded-full border border-charcoal/10 shadow-scrapbook-sm hover:-translate-y-0.5"
          >
            <span>See all projects</span>
            <ArrowRightDoodle className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Project 1 with Pink Projects Title Page Tab overlapping */}
          <ScrollRevealItem delay={0} className="flex flex-col h-full group relative pt-6">
            
            <PaperCard 
              variant="polaroid" 
              rotation="-rotate-2" 
              className="flex-1 flex flex-col justify-between pt-12"
            >
              {/* Pink Projects Tab sitting inside the card to lift together */}
              <div className="absolute -top-6 left-6 bg-pink text-charcoal rounded-r px-6 py-2 pl-8 font-serif font-bold text-lg rotate-[-2.5deg] shadow-scrapbook-sm border border-[#CFA6B3] z-30 select-none">
                {/* paper-7 on the left side */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-11.5 h-6 z-10 pointer-events-none select-none -rotate-90">
                  <Image 
                    src="/assets/paper-7.png" 
                    alt="Paper edge" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <span className="relative z-20">Projects</span>
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

              <div className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" 
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
                    <HeartDoodle className="w-3.5 h-3.5 text-pink/40 hover:text-pink transition-colors animate-pulse" />
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
                    <ArrowRightDoodle className="w-3.5 h-3.5" />
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
              className=" flex flex-col justify-between z-10 h-[440px] pt-12 relative"
            >
              {/* White Button holding the card */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 z-40 drop-shadow-sm pointer-events-none select-none">
                <Image 
                  src="/assets/white-button.png" 
                  alt="White Button" 
                  fill 
                  className="object-contain"
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

              <div className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80" 
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
                    <ArrowRightDoodle className="w-3.5 h-3.5" />
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
              {/* Green leaves doodle climbing up the right side of the card inside card to lift together */}
              <LeafDoodle className="absolute top-[35%] -right-8 w-16 h-16 text-sage rotate-75 z-20 animate-float-ambient-slow select-none" />

              <div className="relative aspect-4/3 w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" 
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
                    <span className="text-xs text-yellow-600/80 animate-pulse">★</span>
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
                    <ArrowRightDoodle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              {/* Side Leaf doodle */}
              <LeafDoodle className="absolute -right-6 bottom-[40%] w-12 h-12 text-sage rotate-80 opacity-70 animate-float-ambient" />
            </PaperCard>
          </ScrollRevealItem>

        </div>

      </ScrollReveal>
    </section>
  );
};
