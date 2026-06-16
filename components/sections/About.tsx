import React from "react";
import Image from "next/image";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { Doodle } from "@/components/ui/Doodle";
import { cn } from "@/lib/utils";

interface AboutProps {
  scrollTo: (id: string) => void;
}

// Helper to get random/offset deterministic hover classes for tags to prevent hydration mismatches
const getHoverClass = (index: number) => {
  const rotations = ["hover:rotate-1", "hover:-rotate-1", "hover:rotate-2", "hover:-rotate-2", "hover:rotate-3", "hover:-rotate-3"];
  const translates = ["hover:-translate-y-0.5", "hover:-translate-y-1", "hover:-translate-y-1.5"];
  return `${rotations[index % rotations.length]} ${translates[(index + 2) % translates.length]}`;
};

export const About: React.FC<AboutProps> = ({ scrollTo }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  // State to hold current hover animation class for each of the 4 sticky notes
  const [cardHovers, setCardHovers] = React.useState<{ [key: number]: string }>({
    0: "hover:rotate-6 hover:-translate-y-3 hover:scale-105",
    1: "hover:-rotate-6 hover:-translate-y-2 hover:scale-105",
    2: "hover:rotate-12 hover:-translate-y-4",
    3: "hover:-rotate-12 hover:-translate-y-3"
  });

  const handleCardMouseEnter = (i: number) => {
    const randomAnimations = [
      "hover:rotate-6 hover:-translate-y-3 hover:scale-105",
      "hover:-rotate-6 hover:-translate-y-2 hover:scale-105",
      "hover:rotate-12 hover:-translate-y-4",
      "hover:-rotate-12 hover:-translate-y-3",
      "hover:rotate-3 hover:-translate-y-4 hover:scale-110",
      "hover:-rotate-3 hover:-translate-y-2 hover:scale-110",
      "hover:rotate-1 hover:-translate-y-3 hover:scale-105",
      "hover:-rotate-1 hover:-translate-y-4 hover:scale-103"
    ];
    let choice = randomAnimations[Math.floor(Math.random() * randomAnimations.length)];
    // Ensure we pick a new animation on consecutive hovers
    while (choice === cardHovers[i]) {
      choice = randomAnimations[Math.floor(Math.random() * randomAnimations.length)];
    }
    setCardHovers(prev => ({ ...prev, [i]: choice }));
  };

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
      className="scroll-mt-24 relative isolate"
    >
      {/* Background doodles - made significantly more visible */}
      <Doodle 
        src="/assets/spiral-1.svg" 
        className="absolute -left-12 top-10 w-32 h-32 opacity-65 rotate-12 -z-10 pointer-events-none select-none animate-float-ambient" 
        color="bg-teal/70" 
      />
      <Doodle 
        src="/assets/star-6.svg" 
        className="absolute right-12 top-0 w-16 h-16 opacity-75 -rotate-12 -z-10 pointer-events-none select-none animate-float-ambient-slow" 
        color="bg-pink" 
      />
      <Doodle 
        src="/assets/star-7.svg" 
        className="absolute left-1/3 bottom-12 w-20 h-20 opacity-65 rotate-45 -z-10 pointer-events-none select-none animate-float-ambient" 
        color="bg-sage/80" 
      />
      <Doodle 
        src="/assets/strawberry-2.svg" 
        className="absolute right-1/4 bottom-4 w-12 h-12 opacity-80 -z-10 pointer-events-none select-none animate-pulse" 
        color="bg-pink" 
      />

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* About Card Left */}
          <ScrollRevealItem 
            delay={0} 
            className="lg:col-span-5 relative mt-4 group/aboutcard flex flex-col h-full"
          >
            <div
              className="w-full h-full relative flex flex-col"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
            
            {/* Scrapbook Tab Header using badge-3.svg */}
            <div 
              className="absolute -top-25 left-2 w-45 h-45 z-30 select-none flex items-center justify-center transition-cozy group-hover/aboutcard:-translate-y-1"
              style={{
                transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px) rotate(-2.5deg)`
              }}
            >
              <Doodle 
                src="/assets/badge-3.svg" 
                className="absolute inset-0 w-full h-full" 
                color="bg-teal" 
              />
              <span className="relative z-10 font-serif font-bold text-lg text-charcoal pt-1 flex items-center gap-1">
                About me
                <Doodle src="/assets/heart-1.svg" className="w-3.5 h-3.5" color="bg-pink" />
              </span>
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
              className="transition-cozy flex-1 h-full"
            >
              <PaperCard variant="ruled" rotation="none" className="p-1 h-full pt-8">
                <div className="space-y-4 font-handwriting text-2xl md:text-2xl font-bold text-charcoal/90 leading-relaxed tracking-tighter mt-4">
                  <p>
                    I'm a frontend developer who loves turning ideas into beautiful, functional web experiences.
                  </p>
                  <p>
                    When I'm not coding, you can usually find me sipping tea or an energy drink, getting lost in a good book, watching anime, gaming, or exploring new places and designs.
                  </p>
                  <div className="pt-4 flex items-center justify-between text-xl text-charcoal/40 font-mono">
                    <span>- Domi</span>
                    <span className="flex items-center gap-1">:-) <Doodle src="/assets/heart-2.svg" className="w-3.5 h-3.5 animate-pulse" color="bg-pink" /></span>
                  </div>
                </div>
              </PaperCard>
            </div>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem delay={150} className="lg:col-span-3 grid grid-cols-2 gap-4 h-full mt-4 items-center">
            
            <div onMouseEnter={() => handleCardMouseEnter(0)}>
              <PaperCard variant="sticky-pink ruled" dense={true} lineColor="#E5CBD6" rotation="rotate-2" className={cn("h-28 w-28 flex flex-col justify-center items-center text-center p-4 relative overflow-visible mx-auto", cardHovers[0])}>
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">caffeine fueled</span>
                <Doodle src="/assets/star-2.svg" className="absolute -top-2.5 -right-2.5 w-6 h-6 rotate-12 z-20" color="bg-pink" />
              </PaperCard>
            </div>
            
            <div onMouseEnter={() => handleCardMouseEnter(1)}>
              <PaperCard variant="sticky-green grid" rotation="-rotate-3" className={cn("h-32 w-32 flex flex-col justify-center items-center text-center p-4 mx-auto", cardHovers[1])}>
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">always learning</span>
              </PaperCard>
            </div>
            
            <div onMouseEnter={() => handleCardMouseEnter(2)}>
              <PaperCard variant="sticky-blue" pushpin={true} rotation="-rotate-1" className={cn("h-30 w-30 flex flex-col justify-center items-center text-center p-4 mx-auto", cardHovers[2])}>
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">pixel perfectionist</span>
              </PaperCard>
            </div>
            
            <div onMouseEnter={() => handleCardMouseEnter(3)}>
              <PaperCard variant="sticky-yellow" tornBottom={true} rotation="rotate-2" className={cn("h-34 w-30 flex flex-col justify-center items-center text-center p-4 relative mx-auto", cardHovers[3])}>
                <Doodle src="/assets/strawberry-2.svg" className="absolute top-2 left-2 w-6 h-6 -rotate-12 z-20" color="bg-pink" />
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">cozy gamer</span>
              </PaperCard>
            </div>

          </ScrollRevealItem>

          {/* Skills Card Right */}
          <ScrollRevealItem id="skills" delay={300} className="lg:col-span-4 scroll-mt-24 relative mt-4 flex flex-col h-full group/skillcard">
            
            <PaperCard variant="grid" paperclip={true} paperclipPosition="top-right" rotation="rotate-1" className="h-full pt-8 relative overflow-visible">
              {/* Scrapbook Tab Header using badge-2.svg */}
              <div className="absolute -top-16 left-2 w-36 h-36 z-30 select-none flex items-center justify-center rotate-[2.5deg] drop-shadow-sm transition-cozy group-hover/skillcard:-translate-y-1">
                <Doodle 
                  src="/assets/badge-2.svg" 
                  className="absolute inset-0 w-full h-full" 
                  color="bg-sage" 
                />
                <span className="relative z-10 font-serif font-bold text-lg text-charcoal pt-1">Skills</span>
              </div>
              {/* Little leaf doodle next to skills tab inside card to animate together */}
              <Doodle src="/assets/leaf-2.svg" className="absolute -top-7 left-28 w-7 h-7 rotate-35 z-40 animate-float-ambient" color="bg-sage" />

              <div className="space-y-8 font-sans mt-6">
                {/* Category: Frontend */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-3 font-mono">Frontend</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Angular"].map((skill, idx) => (
                      <span 
                        key={skill} 
                        className={cn(
                          "bg-white border border-[#E6E2D8] hover:border-sage hover:bg-sage/25 text-xs px-2.5 py-1 rounded-full text-charcoal font-medium tag-transition shadow-sm cursor-default",
                          getHoverClass(idx)
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category: Backend */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-3 font-mono">Backend</h4>
                  <div className="flex flex-wrap gap-3">
                    {["C#"].map((skill, idx) => (
                      <span 
                        key={skill} 
                        className={cn(
                          "bg-white border border-[#E6E2D8] hover:border-teal hover:bg-teal/25 text-xs px-2.5 py-1 rounded-full text-charcoal font-medium tag-transition shadow-sm cursor-default",
                          getHoverClass(idx + 10)
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category: Design */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-3 font-mono">Design</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Figma", "UI/UX Design"].map((skill, idx) => (
                      <span 
                        key={skill} 
                        className={cn(
                          "bg-white border border-[#E6E2D8] hover:border-pink hover:bg-pink/25 text-xs px-2.5 py-1 rounded-full text-charcoal font-medium tag-transition shadow-sm cursor-default",
                          getHoverClass(idx + 20)
                        )}
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
