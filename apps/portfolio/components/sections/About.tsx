"use client";

import React from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { Doodle } from "@/components/ui/Doodle";
import { cn } from "@/lib/utils";

interface AboutProps {
  todayIso: string;
}

// Helper to get random/offset deterministic hover classes for tags to prevent hydration mismatches
const getHoverClass = (index: number) => {
  const rotations = ["hover:rotate-1", "hover:-rotate-1", "hover:rotate-2", "hover:-rotate-2", "hover:rotate-3", "hover:-rotate-3"];
  const translates = ["hover:-translate-y-0.5", "hover:-translate-y-1", "hover:-translate-y-1.5"];
  return `${rotations[index % rotations.length]} ${translates[(index + 2) % translates.length]}`;
};

const getDurationText = (start: Date, end: Date) => {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }

  months = Math.max(months, 0);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  }

  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`);
  }

  return parts.length > 0 ? parts.join(" ") : "Less than 1 month";
};

export const About: React.FC<AboutProps> = ({ todayIso }) => {
  const today = new Date(todayIso);
  const [cardHovers, setCardHovers] = React.useState<{ [key: number]: string }>({
    0: "hover:rotate-6 hover:-translate-y-3 hover:scale-105",
    1: "hover:-rotate-6 hover:-translate-y-2 hover:scale-105",
    2: "hover:rotate-12 hover:-translate-y-4",
    3: "hover:-rotate-12 hover:-translate-y-3",
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
      "hover:-rotate-1 hover:-translate-y-4 hover:scale-103",
    ];
    let choice = randomAnimations[Math.floor(Math.random() * randomAnimations.length)];

    while (choice === cardHovers[i]) {
      choice = randomAnimations[Math.floor(Math.random() * randomAnimations.length)];
    }

    setCardHovers((prev) => ({ ...prev, [i]: choice }));
  };

  return (
    <section 
      id="about" 
      className="scroll-mt-24 relative isolate"
    >
      {/* Background doodles - made significantly more visible */}
      <Doodle 
        src="/assets/spiral-1-mask.png"
        className="absolute -left-12 top-10 w-32 h-32 opacity-65 rotate-12 -z-10 pointer-events-none select-none" 
        color="bg-teal/70" 
      />
      <Doodle 
        src="/assets/star-6.svg" 
        className="absolute right-12 top-0 w-16 h-16 opacity-75 -rotate-12 -z-10 pointer-events-none select-none" 
        color="bg-pink" 
      />
      <Doodle 
        src="/assets/star-7.svg" 
        className="absolute left-1/3 bottom-12 w-20 h-20 opacity-65 rotate-45 -z-10 pointer-events-none select-none" 
        color="bg-sage/80" 
      />
      <Doodle 
        src="/assets/strawberry-2.svg" 
        className="absolute right-1/4 bottom-4 w-12 h-12 opacity-80 -z-10 pointer-events-none select-none" 
        color="bg-pink" 
      />
      <Doodle
        src="/assets/shine-1-mask.png"
        className="absolute left-[8%] bottom-1/3 w-14 h-14 opacity-45 -rotate-12 -z-10 pointer-events-none select-none"
        color="bg-pink/70"
      />
      <Doodle
        src="/assets/leaf-1-mask.png"
        className="absolute right-[7%] bottom-24 w-16 h-16 opacity-45 rotate-45 -z-10 pointer-events-none select-none"
        color="bg-sage"
      />

      <ScrollReveal>
        <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
          <UserRound className="h-3.5 w-3.5" />
          little intro
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* About Card Left */}
          <ScrollRevealItem 
            delay={0} 
            className="lg:col-span-6 relative mt-4 group/aboutcard flex flex-col h-full"
          >
            <div className="w-full h-full relative flex flex-col">
            
            {/* Scrapbook tab header */}
            <div 
              className="absolute -top-25 left-2 w-45 h-45 z-30 -rotate-[2.5deg] select-none flex items-center justify-center transition-[transform] duration-500 ease-in-out group-hover/aboutcard:-translate-y-1 group-hover/aboutcard:-rotate-3"
            >
              <Doodle 
                src="/assets/badge-3-mask.png"
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
              className="absolute -top-10 -left-3 w-24 h-8 z-40 -rotate-[35deg] pointer-events-none select-none transition-[transform] duration-500 ease-in-out group-hover/aboutcard:-translate-y-2 group-hover/aboutcard:-rotate-[37deg]"
            >
              <Image 
                src="/assets/tape-1.png" 
                alt="Tape" 
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>

            <div className="flex-1 h-full -rotate-1 transition-[transform] duration-500 ease-in-out group-hover/aboutcard:-translate-y-1.5 group-hover/aboutcard:rotate-0">
              <PaperCard variant="ruled" rotation="none" hoverable={false} className="p-1 h-full pt-8 group-hover/aboutcard:shadow-scrapbook-lg">
                <div className="space-y-4 font-handwriting text-2xl md:text-2xl font-bold text-charcoal/90 leading-relaxed tracking-tighter mt-4">
                  <p>
                    Hi! I&apos;m Dominika, a full-stack developer who loves building beautiful, functional web experiences with clean, thoughtful design.
                  </p>
                  <p>
                    When I&apos;m not coding, I&apos;m usually reading, watching anime, gaming, drinking tea or an energy drink, or finding inspiration in pretty palettes, layouts, new places, and tiny design details.
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

          <ScrollRevealItem delay={150} className="lg:col-span-3 grid grid-cols-2 gap-4 h-full mt-4 items-center sm:mx-auto sm:max-w-md lg:mx-0 lg:max-w-none">
            
            <div onMouseEnter={() => handleCardMouseEnter(0)} className={cn("transition-cozy", cardHovers[0])}>
              <PaperCard variant="sticky-pink ruled" dense={true} lineColor="#E5CBD6" rotation="rotate-2" hoverable={false} className="h-28 w-28 flex flex-col justify-center items-center text-center p-4 relative overflow-visible mx-auto sm:h-32 sm:w-32 lg:h-28 lg:w-28">
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">css survivor</span>
                <Doodle src="/assets/star-2.svg" className="absolute -top-2.5 -right-2.5 w-6 h-6 rotate-12 z-20" color="bg-pink" />
              </PaperCard>
            </div>
            
            <div onMouseEnter={() => handleCardMouseEnter(1)} className={cn("transition-cozy", cardHovers[1])}>
              <PaperCard variant="sticky-green grid" rotation="-rotate-3" hoverable={false} className="h-30 w-30 flex flex-col justify-center items-center text-center p-4 mx-auto sm:h-34 sm:w-34 lg:h-32 lg:w-32">
                <span className="text-lg md:text-xl font-handwriting font-bold tracking-tighter leading-snug">overthinking specialist</span>
              </PaperCard>
            </div>
            
            <div onMouseEnter={() => handleCardMouseEnter(2)} className={cn("transition-cozy", cardHovers[2])}>
              <PaperCard variant="sticky-blue" pushpin={true} rotation="-rotate-1" hoverable={false} className="h-30 w-30 flex flex-col justify-center items-center text-center p-4 mx-auto sm:h-32 sm:w-32 lg:h-30 lg:w-30">
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">99% caffeine</span>
              </PaperCard>
            </div>
            
            <div onMouseEnter={() => handleCardMouseEnter(3)} className={cn("transition-cozy", cardHovers[3])}>
              <PaperCard variant="sticky-yellow" tornBottom={true} rotation="rotate-2" hoverable={false} className="h-34 w-30 flex flex-col justify-center items-center text-center p-4 relative mx-auto sm:h-36 sm:w-32 lg:h-34 lg:w-30">
                <Doodle src="/assets/strawberry-2.svg" className="absolute top-2 left-2 w-6 h-6 -rotate-12 z-20" color="bg-pink" />
                <span className="text-xl md:text-2xl font-handwriting font-bold tracking-tighter leading-snug">commit &amp; cry</span>
              </PaperCard>
            </div>

          </ScrollRevealItem>

          {/* Skills Card Right */}
          <ScrollRevealItem id="skills" delay={300} className="lg:col-span-3 scroll-mt-24 relative mt-4 flex flex-col h-full group/skillcard">
            
            <PaperCard variant="grid" paperclip={true} paperclipPosition="top-right" rotation="rotate-1" className="h-full pt-8 relative overflow-visible">
              {/* Scrapbook tab header */}
              <div className="absolute -top-16 left-2 w-36 h-36 z-30 select-none flex items-center justify-center rotate-[2.5deg] drop-shadow-sm transition-cozy group-hover/skillcard:-translate-y-1">
                <Doodle 
                  src="/assets/badge-2-mask.png"
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

        <ScrollRevealItem delay={450} className="mt-8 relative group/experience">
          <Doodle
            src="/assets/spiral-2.svg"
            className="absolute -left-10 top-5 h-24 w-24 -rotate-12 opacity-45 -z-10 pointer-events-none select-none"
            color="bg-pink/70"
          />
          <Doodle
            src="/assets/star-8.svg"
            className="absolute -right-6 bottom-2 h-20 w-20 rotate-12 opacity-45 -z-10 pointer-events-none select-none"
            color="bg-sage"
          />
          <Doodle
            src="/assets/heart-1.svg"
            className="absolute left-1/2 -bottom-8 h-10 w-10 -rotate-6 opacity-35 -z-10 pointer-events-none select-none"
            color="bg-pink"
          />
          <PaperCard variant="dotted" rotation="-rotate-1" lineColor="rgba(175, 207, 201, 0.32)" className="relative overflow-visible p-6 md:p-7">
            <div className="absolute -top-5 -left-5 h-9 w-28 -rotate-12 pointer-events-none select-none z-20">
              <Image
                src="/assets/tape-5.png"
                alt="Tape"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 h-9 w-28 rotate-12 pointer-events-none select-none z-20">
              <Image
                src="/assets/tape-2.png"
                alt="Tape"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <Doodle src="/assets/shine-2.svg" className="absolute -top-4 right-16 h-8 w-8 rotate-12 opacity-70" color="bg-teal" />
            <div className="space-y-6">
              <div className="flex flex-col gap-2 border-b border-charcoal/10 pb-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60">Work experience</p>
                  <h3 className="mt-1 font-serif text-3xl font-bold leading-tight text-charcoal md:text-4xl">Where I&apos;ve worked</h3>
                </div>
                <Doodle src="/assets/star-6.svg" className="hidden h-7 w-7 rotate-12 md:block" color="bg-pink" />
              </div>

              <div className="grid flex-1 gap-4 md:grid-cols-2">
                {[
                  {
                    period: "March 2025 - Present",
                    duration: getDurationText(new Date(2025, 2, 1), today),
                    title: "Full-stack Developer Intern",
                    company: "Evosoft Hungary Kft.",
                    text: "Working on full-stack development tasks and growing through real product experience."
                  },
                  {
                    period: "March 2023 - March 2025",
                    duration: getDurationText(new Date(2023, 2, 1), new Date(2025, 2, 1)),
                    title: "Technical Call Center Agent",
                    company: "Telekom",
                    text: "Helped customers with technical questions and learned how to solve problems clearly under pressure."
                  }
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className={cn(
                      "relative bg-white/70 border border-charcoal/10 p-4 shadow-scrapbook-sm transition-cozy hover:-translate-y-1",
                      idx === 0 && "-rotate-1",
                      idx === 1 && "rotate-1"
                    )}
                  >
                    <Doodle
                      src={idx === 0 ? "/assets/star-2.svg" : "/assets/heart-2.svg"}
                      className={cn(
                        "absolute -right-2 -top-2 h-5 w-5 rotate-12",
                        idx === 1 && "-rotate-12"
                      )}
                      color={idx === 0 ? "bg-pink" : "bg-sage"}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={cn(
                        "inline-flex px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/70 shadow-sm",
                        idx === 0 && "bg-pink/45",
                        idx === 1 && "bg-sage/55"
                      )}>{item.period}</p>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal/55">
                        {item.duration}
                      </p>
                    </div>
                    <h4 className="mt-3 font-serif text-xl font-bold leading-tight text-charcoal">{item.title}</h4>
                    <p className="mt-1 font-sans text-sm font-bold text-charcoal/75">{item.company}</p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal/80">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </PaperCard>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  );
};
