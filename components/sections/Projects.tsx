import React from "react";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { LeafDoodle, FlowerDoodle } from "@/components/ScrapbookDoodles";

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
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Project 1 with Pink Projects Title Page Tab overlapping */}
          <ScrollRevealItem delay={0} className="flex flex-col h-full group relative pt-6">
            
            <PaperCard 
              variant="polaroid" 
              rotation="-rotate-2" 
              className="flex-1 flex flex-col justify-between pt-8"
            >
              {/* Pink Projects Tab sitting inside the card to lift together */}
              <div className="absolute -top-3 left-6 bg-[#DDBCC7] text-charcoal px-6 py-2 font-serif font-bold text-lg rotate-[-2.5deg] shadow-scrapbook-sm border border-[#CFA6B3] clip-torn-paper-tab z-30 select-none">
                Projects
              </div>
              {/* Pink tape piece holding the projects tab inside card to lift together */}
              <div className="absolute -top-6 left-12 w-12 h-5 bg-[#DDBCC7]/45 border border-dashed border-[#C4A0AB]/50 rotate-[6deg] z-40"></div>
              {/* Leaf doodle next to projects tab inside card to lift together */}
              <LeafDoodle className="absolute -top-5 left-28 w-7 h-7 text-sage rotate-[20deg] z-40 animate-float-ambient" />
              
              {/* Yellow flowers doodle attached on the bottom left corner overlapping inside card to lift together */}
              <FlowerDoodle className="absolute -bottom-6 -left-8 w-14 h-14 text-pink rotate-[-15deg] select-none z-30 animate-float-ambient" />

              <div className="relative aspect-[4/3] w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" 
                  alt="Bookish Haven Discovery platform" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-750 ease-out hover:scale-103"
                />
              </div>
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Bookish Haven</span>
                    <Heart className="w-3.5 h-3.5 text-pink/40 hover:text-pink transition-colors animate-pulse" />
                  </h4>
                  <p className="mt-2 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A cozy book discovery platform with reviews, recommendations, and personal bookshelves.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-charcoal/5 flex flex-wrap gap-1.5 overflow-hidden">
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
              </div>
            </PaperCard>
          </ScrollRevealItem>

          {/* Project 2 */}
          <ScrollRevealItem delay={150} className="flex flex-col h-full md:translate-y-4 group relative pt-6">
            
            <PaperCard 
              variant="polaroid" 
              rotation="rotate-1" 
              pushpin={true}
              className="flex-1 flex flex-col justify-between z-10"
            >
              {/* Blue torn paper sheet sticking out of the bottom card edge inside card to lift together */}
              <div className="absolute bottom-[-10px] left-6 right-6 h-6 bg-[#AFCFC9]/40 border border-[#9BBAB4]/30 rounded-xs clip-torn-bottom z-0 rotate-1 shadow-sm"></div>

              <div className="relative aspect-[4/3] w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80" 
                  alt="Focus Flow app" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-750 ease-out hover:scale-103"
                />
                {/* Torn bottom edge mockup inside polaroid */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-teal/50 clip-torn-top"></div>
              </div>
              <div className="mt-5 flex-1 flex flex-col justify-between z-10">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Focus Flow</span>
                    <span className="text-teal font-mono text-[10px]">🌱 grid</span>
                  </h4>
                  <p className="mt-2 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A productivity app that helps you stay focused, track habits, and achieve your goals.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-charcoal/5 flex flex-wrap gap-1.5 overflow-hidden">
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
              </div>
            </PaperCard>
          </ScrollRevealItem>

          {/* Project 3 */}
          <ScrollRevealItem delay={300} className="flex flex-col h-full group relative pt-6">
            
            <PaperCard 
              variant="polaroid" 
              rotation="-rotate-1" 
              tape="top-right" 
              tapeColor="sage" 
              className="flex-1 flex flex-col justify-between relative"
            >
              {/* Green leaves doodle climbing up the right side of the card inside card to lift together */}
              <LeafDoodle className="absolute top-[35%] -right-8 w-16 h-16 text-sage rotate-[75deg] z-20 animate-float-ambient-slow select-none" />

              <div className="relative aspect-[4/3] w-full bg-[#FCFAF2] border border-charcoal/5 rounded-xs overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" 
                  alt="Clay & Craft Ceramics shop" 
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-750 ease-out hover:scale-103"
                />
              </div>
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal flex items-center justify-between">
                    <span>Clay &amp; Craft</span>
                    <span className="text-xs text-yellow-600/80 animate-pulse">★</span>
                  </h4>
                  <p className="mt-2 text-xs md:text-sm text-charcoal/70 leading-relaxed font-sans">
                    A handmade ceramics shop with a minimal, earthy design and smooth shopping experience.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-charcoal/5 flex flex-wrap gap-1.5 overflow-hidden">
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
              </div>
              {/* Side Leaf doodle */}
              <LeafDoodle className="absolute -right-6 bottom-[40%] w-12 h-12 text-sage rotate-[80deg] opacity-70 animate-float-ambient" />
            </PaperCard>
          </ScrollRevealItem>

        </div>

      </ScrollReveal>
    </section>
  );
};
