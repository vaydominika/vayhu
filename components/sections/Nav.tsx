import React from "react";

interface NavProps {
  scrollTo: (id: string) => void;
}

export const Nav: React.FC<NavProps> = ({ scrollTo }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-offwhite/80 backdrop-blur-md border-b border-[#E6E2D8]/50">
      <div className="max-w-6xl mx-auto w-full px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => scrollTo("hero")}>
          <span className="font-serif text-2xl font-bold tracking-tight text-charcoal flex items-center gap-1">
            Vay
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/80 absolute left-1/2 -translate-x-1/2">
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
        </div>
      </div>
    </header>
  );
};
