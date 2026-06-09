import React from "react";
import { cn } from "@/lib/utils";
import { PaperclipDoodle, PushPin } from "./ScrapbookDoodles";

interface PaperCardProps {
  children: React.ReactNode;
  variant?: "default" | "grid" | "ruled" | "polaroid" | "sticky-yellow" | "sticky-green" | "sticky-blue" | "sticky-pink";
  rotation?: "none" | "rotate-1" | "-rotate-1" | "rotate-2" | "-rotate-2" | "rotate-3" | "-rotate-3";
  tape?: "none" | "top" | "top-left" | "top-right" | "both";
  tapeColor?: "pink" | "sage" | "teal";
  paperclip?: boolean;
  paperclipPosition?: "top-left" | "top-right";
  pushpin?: boolean;
  tornBottom?: boolean;
  className?: string;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  children,
  variant = "default",
  rotation = "none",
  tape = "none",
  tapeColor = "pink",
  paperclip = false,
  paperclipPosition = "top-right",
  pushpin = false,
  tornBottom = false,
  className,
}) => {
  // Map rotation to tailwind class names and hover angles (rotating 1 additional degree)
  const rotationClasses = {
    "none": "rotate-0 hover:rotate-1",
    "rotate-1": "rotate-1 hover:rotate-2",
    "-rotate-1": "-rotate-1 hover:-rotate-2",
    "rotate-2": "rotate-2 hover:rotate-3",
    "-rotate-2": "-rotate-2 hover:-rotate-3",
    "rotate-3": "rotate-3 hover:rotate-4",
    "-rotate-3": "-rotate-3 hover:-rotate-4",
  };

  // Washi tape color classes
  const tapeColorStyles = {
    pink: "bg-pink/40 border-pink/50 text-pink-700/80 shadow-[0_1px_3px_rgba(221,188,199,0.2)]",
    sage: "bg-sage/40 border-sage/50 text-emerald-800/80 shadow-[0_1px_3px_rgba(184,200,176,0.2)]",
    teal: "bg-teal/40 border-teal/50 text-teal-800/80 shadow-[0_1px_3px_rgba(175,207,201,0.2)]",
  };

  // Card variant base classes
  const variantStyles = {
    default: "bg-white border border-[#E6E2D8] text-charcoal",
    grid: "bg-white grid-lines border border-[#D5D0C2] text-charcoal",
    ruled: "bg-[#FCFAF2] ruled-lines border border-[#E6E2D8] text-charcoal",
    polaroid: "bg-white border border-[#E0DBCF] p-4 pb-12 shadow-scrapbook-md text-charcoal",
    "sticky-yellow": "bg-[#FAF0D7] shadow-scrapbook-sm text-charcoal border-b border-r border-[#E6DBBE]",
    "sticky-green": "bg-[#E1EEDD] shadow-scrapbook-sm text-charcoal border-b border-r border-[#CDDBC8]",
    "sticky-blue": "bg-[#D8D9CF] shadow-scrapbook-sm text-charcoal border-b border-r border-[#C4C5BC]",
    "sticky-pink": "bg-[#F3E8EE] shadow-scrapbook-sm text-charcoal border-b border-r border-[#DFD1DA]",
  };

  // Washi tape render helper
  const renderTape = (position: "left" | "right" | "center") => {
    let angleClass = "rotate-12";
    let posClass = "";

    if (position === "left") {
      angleClass = "-rotate-12";
      posClass = "-top-4 left-6";
    } else if (position === "right") {
      angleClass = "rotate-12";
      posClass = "-top-4 right-6";
    } else {
      angleClass = "-rotate-2";
      posClass = "-top-4 left-1/2 -translate-x-1/2";
    }

    return (
      <div
        className={cn(
          "absolute h-7 w-20 px-2 py-0.5 border border-dashed text-[10px] font-mono tracking-widest uppercase select-none flex items-center justify-center pointer-events-none z-30 transition-all duration-500",
          tapeColorStyles[tapeColor],
          angleClass,
          posClass
        )}
      >
        <span className="opacity-60">✂- - -</span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative transition-cozy hover:-translate-y-[6px] hover:shadow-scrapbook-lg shadow-scrapbook-md rounded-sm",
        rotationClasses[rotation],
        variantStyles[variant],
        tornBottom && "clip-torn-bottom pb-8",
        className
      )}
    >
      {/* Tape overlays */}
      {tape === "top" && renderTape("center")}
      {tape === "top-left" && renderTape("left")}
      {tape === "top-right" && renderTape("right")}
      {tape === "both" && (
        <>
          {renderTape("left")}
          {renderTape("right")}
        </>
      )}

      {/* Pushpin overlay */}
      {pushpin && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40 drop-shadow-sm select-none pointer-events-none">
          <PushPin className="w-9 h-9" />
        </div>
      )}

      {/* Paperclip overlay */}
      {paperclip && (
        <div
          className={cn(
            "absolute -top-6 z-40 select-none pointer-events-none rotate-6",
            paperclipPosition === "top-left" ? "left-6" : "right-6"
          )}
        >
          <PaperclipDoodle className="w-8 h-12 text-[#8c8c8c] filter drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" />
        </div>
      )}

      {/* Card contents */}
      <div className={cn("h-full w-full", variant === "polaroid" ? "" : "p-6")}>
        {children}
      </div>
    </div>
  );
};
