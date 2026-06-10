import React from "react";
import { Coffee, Code, Gamepad2 } from "lucide-react";
import Image from "next/image";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { HeartDoodle, LeafDoodle } from "@/components/ScrapbookDoodles";

interface AboutProps {
  scrollTo: (id: string) => void;
}

export const About: React.FC<AboutProps> = ({ scrollTo }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      id="about" 
      className="scroll-mt-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8">
          
          {/* About Card Left */}
          <ScrollRevealItem delay={0} className="lg:col-span-5 relative mt-4 group/aboutcard">
            
            {/* Scrapbook Tab Header sitting outside the card to animate and float differently */}
            <div 
              className="absolute w-50 h-15 -top-10 left-6 bg-teal text-charcoal px-6 py-2 font-serif font-bold text-lg rounded z-30 flex items-center gap-1 select-none border border-[#9BBAB4] shadow-scrapbook-sm transition-cozy group-hover/aboutcard:-translate-y-1"
              style={{
                transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px) rotate(-2.5deg)`
              }}
            >
              About me
              <HeartDoodle className="w-3.5 h-3.5 text-pink/70 inline-block fill-pink/15" />
            </div>

            {/* Blue tape piece holding the tab */}
            <div 
              className="absolute -top-10 -left-3 w-24 h-8 z-40 pointer-events-none select-none transition-cozy group-hover/aboutcard:-translate-y-2"
              style={{
                transform: `translate(${mousePos.x * 9}px, ${mousePos.y * 9}px) rotate(-35deg)`
              }}
            >
              <Image 
                src="/assets/tape-1.png" 
                alt="Tape" 
                fill 
                className="object-contain"
              />
            </div>

            <div
              style={{
                transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px) rotate(-1deg)`
              }}
              className="transition-cozy"
            >
              <PaperCard variant="ruled" rotation="none" className="p-1 min-h-[320px] pt-8">
                <div className="space-y-4 font-sans text-sm md:text-base text-charcoal/90 leading-relaxed mt-4">
                  <p>
                    I'm a frontend developer who loves turning ideas into beautiful, functional web experiences.
                  </p>
                  <p>
                    When I'm not coding, you can usually find me sipping tea or an energy drink, getting lost in a good book, watching anime, gaming, or exploring new places and designs.
                  </p>
                  <div className="pt-4 flex items-center justify-between text-xs text-charcoal/40 font-mono">
                    <span>- Domi</span>
                    <span className="flex items-center gap-1">:-) <HeartDoodle className="w-3.5 h-3.5 text-pink animate-pulse" /></span>
                  </div>
                </div>
              </PaperCard>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem delay={150} className="lg:col-span-3 grid grid-cols-2 gap-4 h-full mt-4">
            
            <PaperCard variant="sticky-pink ruled" rotation="rotate-2" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <span className="text-xs font-bold tracking-tight leading-snug">caffeine fueled</span>
            </PaperCard>
            
            <PaperCard variant="sticky-green grid" rotation="-rotate-3" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <span className="text-xs font-bold tracking-tight leading-snug">always learning</span>
            </PaperCard>
            
            <PaperCard variant="sticky-blue" pushpin={true} rotation="-rotate-1" className="aspect-square flex flex-col justify-center items-center text-center p-4">
              <span className="text-xs font-bold tracking-tight leading-snug">pixel perfectionist</span>
            </PaperCard>
            
            <PaperCard variant="sticky-yellow" tornBottom={true} rotation="rotate-2" className="aspect-square flex flex-col justify-center items-center text-center p-4 h-32 w-30">
              <span className="text-xs font-bold tracking-tight leading-snug">cozy gamer</span>
            </PaperCard>

          </ScrollRevealItem>

          {/* Skills Card Right */}
          <ScrollRevealItem id="skills" delay={300} className="lg:col-span-4 scroll-mt-24 relative mt-4">
            
            <PaperCard variant="grid" paperclip={true} paperclipPosition="top-right" rotation="rotate-1" className="min-h-[320px] pt-8">
              {/* Scrapbook Tab Header sitting inside the top edge to animate together */}
              <div className="absolute -top-6 left-6 bg-sage text-charcoal px-6 py-2 font-serif font-bold text-lg rotate-[2.5deg] shadow-scrapbook-sm border border-[#A4B59C] clip-torn-paper-tab z-30 select-none">
                Skills
              </div>
              {/* Little leaf doodle next to skills tab inside card to animate together */}
              <LeafDoodle className="absolute -top-7 left-28 w-7 h-7 text-sage/70 rotate-35 z-40 animate-float-ambient" />

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
