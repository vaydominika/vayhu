"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Mail, 
  ArrowRight, 
  Heart, 
  Coffee, 
  Sparkles, 
  Code, 
  Gamepad2, 
  ExternalLink 
} from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { 
  LeafDoodle, 
  FlowerDoodle, 
  SparkleStar, 
  HeartDoodle, 
  ArrowDoodle, 
  UnderlineHighlight, 
  EnvelopeDoodle,
  GithubIcon,
  LinkedinIcon
} from "@/components/ScrapbookDoodles";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal paper-grain flex flex-col font-sans">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-offwhite/80 backdrop-blur-md border-b border-[#E6E2D8]/50 px-6 py-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => scrollTo("hero")}>
          <span className="font-serif text-2xl font-bold tracking-tight text-charcoal flex items-center gap-1">
            Vay
            <FlowerDoodle className="w-5 h-5 text-pink inline-block animate-float-ambient" />
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/80">
          <button onClick={() => scrollTo("hero")} className="pen-underline hover:text-sage transition-colors cursor-pointer relative py-1">Home</button>
          <button onClick={() => scrollTo("about")} className="pen-underline hover:text-sage transition-colors cursor-pointer relative py-1">About</button>
          <button onClick={() => scrollTo("skills")} className="pen-underline hover:text-sage transition-colors cursor-pointer relative py-1">Skills</button>
          <button onClick={() => scrollTo("projects")} className="pen-underline hover:text-sage transition-colors cursor-pointer relative py-1">Projects</button>
          <button onClick={() => scrollTo("contact")} className="pen-underline hover:text-sage transition-colors cursor-pointer relative py-1">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollTo("contact")}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-charcoal/30 bg-white hover:bg-sage/10 hover:-translate-y-0.5 hover:scale-105 active:scale-95 btn-transition rounded-full text-xs font-semibold tracking-wide shadow-scrapbook-sm cursor-pointer"
          >
            Let's talk!
          </button>
          <Heart className="w-4 h-4 text-pink fill-pink animate-pulse" />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 space-y-28 md:space-y-36">
        
        {/* HERO SECTION */}
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
              className={`relative transition-all duration-800 ease-out delay-[100ms] transform ${
                isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-charcoal leading-none">
                Hi, I'm <span className="relative inline-block z-10">Vay!
                  <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full -z-10 text-pink/50 animate-float-ambient">
                    <UnderlineHighlight className="w-full h-4 md:h-6" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <h2 
              className={`text-xl md:text-2xl font-serif text-charcoal/80 font-medium italic mt-2 transition-all duration-800 ease-out delay-[200ms] transform ${
                isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              frontend developer &amp; UI/UX enthusiast
            </h2>

            {/* Intro Description */}
            <p 
              className={`max-w-xl text-base md:text-lg text-charcoal/80 leading-relaxed font-sans mt-2 transition-all duration-800 ease-out delay-[300ms] transform ${
                isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              I create responsive, user-friendly websites with a focus on clean code, thoughtful design, and delightful user experiences.
            </p>

            {/* CTAs */}
            <div 
              className={`flex flex-wrap items-center gap-4 mt-4 transition-all duration-800 ease-out delay-[400ms] transform ${
                isMounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage/90 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-full shadow-scrapbook-md hover:shadow-scrapbook-lg btn-transition text-sm border border-emerald-800/20 cursor-pointer"
              >
                <span>View my projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollTo("about")}
                className="inline-flex items-center gap-2 bg-white hover:bg-pink/10 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-full border border-pink/60 shadow-scrapbook-sm hover:shadow-scrapbook-md btn-transition text-sm cursor-pointer"
              >
                <span>About me</span>
                <Heart className="w-4 h-4 text-pink" />
              </button>
            </div>

            {/* Small decorative doodles */}
            <div 
              className={`hidden sm:flex items-center gap-8 mt-6 text-charcoal/40 transition-all duration-800 ease-out delay-[500ms] transform ${
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
              className="absolute w-[80%] h-[105%] bg-white grid-lines border border-[#D5D0C2] rounded-lg shadow-scrapbook-sm -z-10 transition-cozy group-hover/collage:-translate-y-2 group-hover/collage:-rotate-3"
              style={{
                transform: `translate(${mousePos.x * -7}px, ${mousePos.y * -7}px) rotate(-6deg)`
              }}
            ></div>
            
            {/* Torn green sheet behind */}
            <div 
              className="absolute w-[85%] h-[98%] bg-sage/35 border border-sage/40 rounded-sm -z-20 clip-torn-bottom transition-cozy group-hover/collage:-translate-y-1 group-hover/collage:rotate-2"
              style={{
                transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px) rotate(3deg)`
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
                tape="top" 
                tapeColor="pink" 
                className="w-full shadow-scrapbook-md"
              >
                <div className="relative aspect-square w-full bg-offwhite overflow-hidden rounded-xs border border-charcoal/5">
                  <Image 
                    src="https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&w=600&q=80" 
                    alt="Vay coding cozy environment" 
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
              className="absolute bottom-[-10px] right-[-15px] sm:right-[15px] z-20 transition-cozy group-hover/collage:-translate-y-2 group-hover/collage:rotate-6"
              style={{
                transform: `translate(${mousePos.x * 9}px, ${mousePos.y * 9}px) rotate(3deg)`
              }}
            >
              <PaperCard 
                variant="sticky-yellow" 
                rotation="none" 
                className="w-[130px] p-4 text-center border-b-2 border-r-2"
              >
                <div className="font-serif text-xs font-semibold leading-relaxed flex flex-col gap-1 text-charcoal/90">
                  <span>coffee ☕</span>
                  <span>code 💻</span>
                  <span>creativity 🎨</span>
                </div>
                <HeartDoodle className="w-4 h-4 text-pink/70 mx-auto mt-2 animate-float-ambient" />
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
              <FlowerDoodle className="w-full h-full text-pink" />
            </div>
            <SparkleStar className="absolute top-[20%] right-[-10px] w-6 h-6 text-pink/60 animate-float-ambient" />
            <SparkleStar className="absolute bottom-[20%] left-[-15px] w-5 h-5 text-teal/80 animate-float-ambient-slow" />

          </div>

          {/* Ripped Edge Divider */}
          <div className="col-span-full w-screen relative left-1/2 right-1/2 -translate-x-1/2 h-12 md:h-20 mt-8 pointer-events-none select-none">
            <Image 
              src="/assets/bottom-ripped.png" 
              alt="Ripped paper divider"
              fill
              className="object-cover object-bottom"
              priority
            />
          </div>

        </section>

        {/* ABOUT SECTION */}
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
                      <span>- Vay</span>
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

        {/* PROJECTS SECTION */}
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

            {/* Cards Grid - made slightly larger */}
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

                  {/* Changed to aspect-[4/3] to make the images and cards bigger */}
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

                  {/* Changed to aspect-[4/3] to make the images and cards bigger */}
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

                  {/* Changed to aspect-[4/3] to make the images and cards bigger */}
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

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24 pb-12">
          <ScrollReveal>
            <PaperCard 
              variant="grid" 
              rotation="none" 
              className="p-1 md:p-4 overflow-hidden rounded-md border border-[#D5D0C2]"
            >
              {/* Split Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-sage/10 p-6 md:p-10 rounded-sm">
                
                {/* Left Column: Heading and Text */}
                <ScrollRevealItem delay={0} className="md:col-span-7 space-y-4">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-charcoal leading-tight">
                    Let's create <br className="hidden md:inline" />
                    something together!
                  </h3>
                  <p className="max-w-md text-sm md:text-base text-charcoal/80 leading-relaxed font-sans">
                    I'm currently open to new opportunities and exciting projects. Let's build something amazing!
                    <Heart className="w-3.5 h-3.5 text-pink fill-pink inline-block ml-1 animate-pulse" />
                  </p>
                  
                  {/* CTA Form Button */}
                  <div className="pt-2">
                    <a
                      href="mailto:hello@vay.dev"
                      className="inline-flex items-center gap-2 bg-pink hover:bg-pink/90 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-full shadow-scrapbook-md hover:shadow-scrapbook-lg btn-transition text-sm border border-pink/10"
                    >
                      <span>Get in touch</span>
                      <ArrowRight className="w-4 h-4 animate-pulse" />
                    </a>
                  </div>

                  {/* Socials */}
                  <div className="flex items-center gap-4 pt-4 text-charcoal/70">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-white rounded-full border border-charcoal/10 hover:border-sage hover:bg-sage/20 hover:-translate-y-0.5 hover:scale-110 active:scale-90 shadow-sm btn-transition cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-white rounded-full border border-charcoal/10 hover:border-sage hover:bg-sage/20 hover:-translate-y-0.5 hover:scale-110 active:scale-90 shadow-sm btn-transition cursor-pointer"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a 
                      href="mailto:hello@vay.dev" 
                      className="p-2 bg-white rounded-full border border-charcoal/10 hover:border-sage hover:bg-sage/20 hover:-translate-y-0.5 hover:scale-110 active:scale-90 shadow-sm btn-transition cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </ScrollRevealItem>

                {/* Right Column: Envelope & Postcard illustration */}
                <ScrollRevealItem delay={200} className="md:col-span-5 flex justify-center items-center relative py-4">
                  <EnvelopeDoodle className="text-charcoal/80 filter drop-shadow-[4px_4px_12px_rgba(47,47,47,0.12)] animate-float-ambient" />
                  <SparkleStar className="absolute top-2 right-[20%] w-6 h-6 text-pink animate-float-ambient-slow" />
                  <SparkleStar className="absolute bottom-4 left-[15%] w-5 h-5 text-teal animate-float-ambient" />
                </ScrollRevealItem>

              </div>
            </PaperCard>
          </ScrollReveal>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E6E2D8] bg-[#F3EFE6] px-6 py-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-charcoal/60 gap-4">
        <span>© {new Date().getFullYear()} Vay. Made with Next.js &amp; Tailwind.</span>
        <span className="flex items-center gap-1">built with coffee, code, and care <Heart className="w-3 h-3 text-pink fill-pink animate-pulse" /></span>
      </footer>

    </div>
  );
}
