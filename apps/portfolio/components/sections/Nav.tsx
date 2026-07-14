"use client";

import React from "react";
import { Menu, X } from "lucide-react";

export const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 w-full bg-offwhite/95 border-b border-[#E6E2D8]/50 md:border-b-0"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="max-w-6xl mx-auto w-full h-14 px-6 flex items-center justify-between relative">
          <a className="flex items-center gap-1.5 cursor-pointer" href="#hero">
            <span className="font-serif text-2xl font-bold leading-none tracking-tight text-charcoal flex items-center gap-1">
              Vay
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/80 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#hero" className="pen-underline relative inline-flex h-9 items-center cursor-pointer transition-transform hover:-translate-y-0.5 hover:rotate-1 hover:text-sage">Home</a>
            <a href="#about" className="pen-underline relative inline-flex h-9 items-center cursor-pointer transition-transform hover:-translate-y-0.5 hover:-rotate-1 hover:text-sage">About</a>
            <a href="#projects" className="pen-underline relative inline-flex h-9 items-center cursor-pointer transition-transform hover:-translate-y-0.5 hover:-rotate-2 hover:text-sage">Projects</a>
            <a href="#contact" className="pen-underline relative inline-flex h-9 items-center cursor-pointer transition-transform hover:-translate-y-0.5 hover:rotate-1 hover:text-sage">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex h-9 items-center justify-center px-4 border border-charcoal/30 bg-white hover:bg-sage/10 hover:-translate-y-0.5 hover:scale-105 active:scale-95 btn-transition rounded-none text-xs font-semibold tracking-wide shadow-scrapbook-sm cursor-pointer"
            >
              Let&apos;s talk!
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex md:hidden h-9 w-9 items-center justify-center border border-charcoal/20 bg-white text-charcoal shadow-scrapbook-sm transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-sage/10 active:scale-95"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <nav
          className={`md:hidden absolute top-full left-0 right-0 border-t border-b border-[#E6E2D8]/60 bg-offwhite/95 shadow-lg transition-[grid-template-rows,opacity] duration-300 ease-in-out grid ${
            isMenuOpen 
              ? "grid-rows-[1fr] opacity-100 pointer-events-auto" 
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3 text-sm font-semibold text-charcoal/80">
              {[
                ["Home", "hero"],
                ["About", "about"],
                ["Projects", "projects"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left px-2 py-3 transition-colors hover:bg-sage/15 hover:text-sage"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <div className="h-14 w-full" />
    </>
  );
};
