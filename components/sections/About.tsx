import React from "react";
import { Heart, Coffee, Code, Gamepad2 } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { HeartDoodle, LeafDoodle } from "@/components/ScrapbookDoodles";

interface AboutProps {
  scrollTo: (id: string) => void;
}

export const About: React.FC<AboutProps> = ({ scrollTo }) => {
  return (
    <section id="about" className="scroll-mt-24">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8">
          
          {/* About Card Left */}
          <ScrollRevealItem delay={0} className="lg:col-span-5 relative mt-4">
            
            <PaperCard variant="ruled" rotation="-rotate-1" className="p-1 min-h-[320px] pt-8">
              {/* Scrapbook Tab Header sitting inside the top edge to animate together */}
              <div className="absolute -top-6 left-6 bg-[#AFCFC9] text-charcoal px-6 py-2 font-serif font-bold text-lg rotate-[-2.5deg] shadow-scrapbook-sm border border-[#9BBAB4] clip-torn-paper-tab z-30 flex items-center gap-1 select-none">
                About me
                <HeartDoodle className="w-3.5 h-3.5 text-pink/70 inline-block fill-pink/15" />
              </div>
              {/* Blue tape piece holding the tab inside card to animate together */}
              <div className="absolute -top-8 left-14 w-12 h-5 bg-[#AFCFC9]/45 border border-dashed border-[#85ADA5]/60 -rotate-12 z-40"></div>

              <div className="space-y-4 font-sans text-sm md:text-base text-charcoal/90 leading-relaxed mt-4">
                <p>
                  I'm a frontend developer who loves turning ideas into beautiful, functional web experiences.
                </p>
                <p>
                  When I'm not coding, you can find me with a good book, a cup of coffee, or exploring new design trends.
                </p>
                <div className="pt-4 flex items-center justify-between text-xs text-charcoal/40 font-mono">
                  <span>- Domi</span>
                  <span className="flex items-center gap-1">:-) <Heart className="w-3 h-3 text-pink fill-pink animate-pulse" /></span>
                </div>
              </div>
            </PaperCard>
          </ScrollRevealItem>

          {/* Middle Sticky Cards Collage */}
          <ScrollRevealItem delay={150} className="lg:col-span-3 grid grid-cols-2 gap-4 h-full mt-4">
            
            <PaperCard variant="sticky-pink" rotation="rotate-2" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <Coffee className="w-6 h-6 text-pink mb-2 animate-float-ambient" />
              <span className="text-xs font-semibold tracking-tight">coffee lover</span>
            </PaperCard>
            
            <PaperCard variant="sticky-green" rotation="-rotate-3" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <LeafDoodle className="w-7 h-7 text-sage mb-1 animate-float-ambient-slow" />
              <span className="text-xs font-semibold tracking-tight">always learning</span>
            </PaperCard>
            
            <PaperCard variant="sticky-blue" rotation="-rotate-1" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <Code className="w-6 h-6 text-teal mb-2" />
              <span className="text-xs font-semibold tracking-tight">pixel perfectionist</span>
            </PaperCard>
            
            <PaperCard variant="sticky-yellow" rotation="rotate-2" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <Gamepad2 className="w-6 h-6 text-[#9E906E] mb-2 animate-float-ambient" />
              <span className="text-xs font-semibold tracking-tight">cozy gamer</span>
            </PaperCard>

          </ScrollRevealItem>

          {/* Skills Card Right */}
          <ScrollRevealItem id="skills" delay={300} className="lg:col-span-4 scroll-mt-24 relative mt-4">
            
            <PaperCard variant="grid" paperclip={true} paperclipPosition="top-right" rotation="rotate-1" className="min-h-[320px] pt-8">
              {/* Scrapbook Tab Header sitting inside the top edge to animate together */}
              <div className="absolute -top-6 left-6 bg-[#B8C8B0] text-charcoal px-6 py-2 font-serif font-bold text-lg rotate-[2.5deg] shadow-scrapbook-sm border border-[#A4B59C] clip-torn-paper-tab z-30 select-none">
                Skills
              </div>
              {/* Little leaf doodle next to skills tab inside card to animate together */}
              <LeafDoodle className="absolute -top-7 left-28 w-7 h-7 text-sage/70 rotate-[35deg] z-40 animate-float-ambient" />

              <div className="space-y-5 font-sans mt-4">
                {/* Category: Frontend */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 font-mono">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-white border border-[#E6E2D8] hover:border-sage hover:bg-sage/25 hover:-translate-y-0.5 hover:rotate-1 text-xs px-2.5 py-1 rounded-full text-charcoal font-medium tag-transition shadow-sm cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category: Design */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 font-mono">Design</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "UI/UX Design", "Responsive Design"].map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-white border border-[#E6E2D8] hover:border-pink hover:bg-pink/25 hover:-translate-y-0.5 hover:rotate-1 text-xs px-2.5 py-1 rounded-full text-charcoal font-medium tag-transition shadow-sm cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category: Tools */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 font-mono">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "VS Code", "Notion", "Vercel"].map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-white border border-[#E6E2D8] hover:border-teal hover:bg-teal/25 hover:-translate-y-0.5 hover:rotate-1 text-xs px-2.5 py-1 rounded-full text-charcoal font-medium tag-transition shadow-sm cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </PaperCard>
          </ScrollRevealItem>

        </div>
      </ScrollReveal>
    </section>
  );
};
