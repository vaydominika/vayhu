import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// PushPin inline component to avoid dependency on ScrapbookDoodles
export const PushPin = ({ className = "w-8 h-8 text-pink" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.3486 4.02413C12.3721 5.10283 12.4309 8.0992 11.4721 10.1367C11.0986 10.9309 8.11612 11.925 8.11612 12.7736C8.11612 13.3192 10.6339 14.7721 10.9927 15.2905C11.3743 15.8413 11.8331 16.453 12.0714 17.0883C12.1567 17.3163 11.9486 17.8075 12.1912 17.8075C12.2868 17.8075 12.5375 17.0097 12.5508 16.9685C13.164 15.1288 14.0045 13.4728 15.1884 11.9346C16.1237 10.7176 17.2112 9.52201 18.4245 8.57861C18.7112 8.35581 19.137 7.83081 19.5031 7.73963C19.7995 7.66536 20.0722 7.97933 19.9825 7.97933C19.3766 7.97933 15.0538 3.63956 14.3486 4.02413Z" />
    <path d="M9.91406 14.6912C9.11845 17.0795 6.93754 18.7752 5 20.3245" />
  </svg>
);

interface PaperCardProps {
  children: React.ReactNode;
  variant?: string | string[];
  rotation?: "none" | "rotate-1" | "-rotate-1" | "rotate-2" | "-rotate-2" | "rotate-3" | "-rotate-3";
  tape?: "none" | "top" | "top-left" | "top-right" | "both";
  tapeColor?: "pink" | "sage" | "teal";
  paperclip?: boolean;
  paperclipPosition?: "top-left" | "top-right";
  pushpin?: boolean;
  tornBottom?: boolean;
  className?: string;
  lineColor?: string;
  dense?: boolean;
  hoverable?: boolean;
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
  lineColor,
  dense = false,
  hoverable = true,
}) => {
  // Map rotation to tailwind class names and hover angles (rotating 1 additional degree)
  const baseRotationClasses = {
    "none": "rotate-0",
    "rotate-1": "rotate-1",
    "-rotate-1": "-rotate-1",
    "rotate-2": "rotate-2",
    "-rotate-2": "-rotate-2",
    "rotate-3": "rotate-3",
    "-rotate-3": "-rotate-3",
  };

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
    grid: "grid-lines border-[#D5D0C2]",
    ruled: "ruled-lines",
    dotted: "dot-grid-lines",
    "dotted-squared": "dotted-grid-lines",
    polaroid: "bg-white border border-[#E0DBCF] p-4 pb-12 shadow-scrapbook-md text-charcoal",
    "sticky-yellow": "bg-[#FAF0D7] shadow-scrapbook-sm text-charcoal border-b border-r border-[#E6DBBE]",
    "sticky-green": "bg-[#E1EEDD] shadow-scrapbook-sm text-charcoal border-b border-r border-[#CDDBC8]",
    "sticky-blue": "bg-[#D8D9CF] shadow-scrapbook-sm text-charcoal border-b border-r border-[#C4C5BC]",
    "sticky-pink": "bg-[#F3E8EE] shadow-scrapbook-sm text-charcoal border-b border-r border-[#DFD1DA]",
  };

  // Parse variants array
  const variantsArray = Array.isArray(variant)
    ? variant
    : typeof variant === "string"
      ? variant.split(" ")
      : ["default"];

  // If "paperclip" is one of the variants, set paperclip = true
  const isPaperclipVariant = variantsArray.includes("paperclip");
  const finalPaperclip = paperclip || isPaperclipVariant;

  // If there's no base layout variant specified, mix-in the default base styles
  const hasBaseVariant = variantsArray.some((v) =>
    ["default", "polaroid", "sticky-yellow", "sticky-green", "sticky-blue", "sticky-pink"].includes(v)
  );

  const finalVariantsArray = hasBaseVariant ? variantsArray : ["default", ...variantsArray];

  // Map and filter variants, excluding "paperclip" variant from stylesheet classes
  const resolvedVariantClasses = finalVariantsArray
    .filter((v) => v !== "paperclip")
    .map((v) => variantStyles[v as keyof typeof variantStyles] || "")
    .filter(Boolean)
    .join(" ");

  const isPolaroid = finalVariantsArray.includes("polaroid");
  const isSticky = finalVariantsArray.some((v) =>
    ["sticky-yellow", "sticky-green", "sticky-blue", "sticky-pink"].includes(v)
  );

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
          "absolute h-7 w-20 px-2 py-0.5 border border-dashed text-[10px] font-mono tracking-widest uppercase select-none flex items-center justify-center pointer-events-none z-30 transition-[transform,opacity,background-color,border-color] duration-500 motion-reduce:transition-none",
          tapeColorStyles[tapeColor],
          angleClass,
          posClass
        )}
      >
        <span className="opacity-60">✂- - -</span>
      </div>
    );
  };

  const inlineStyles: React.CSSProperties = {};
  if (lineColor) {
    inlineStyles["--line-color" as any] = lineColor;
  }

  return (
    <div
      style={inlineStyles}
      className={cn(
        "relative transition-cozy shadow-scrapbook-md rounded-sm motion-reduce:transition-none",
        hoverable && "hover:translate-y-[-6px] hover:shadow-scrapbook-lg",
        hoverable ? rotationClasses[rotation] : baseRotationClasses[rotation],
        resolvedVariantClasses,
        dense && "dense",
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

      {/* Pushpin overlay (only if pushpin is requested and not using paperclip variant) */}
      {pushpin && !isPaperclipVariant && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40 drop-shadow-sm select-none pointer-events-none">
          <PushPin className="w-9 h-9" />
        </div>
      )}

      {/* Paperclip overlay */}
      {finalPaperclip && (
        <div
          className={cn(
            "absolute -top-7 z-40 select-none pointer-events-none rotate-6",
            paperclipPosition === "top-left" ? "left-6" : "right-6"
          )}
        >
          <div className="relative w-10 h-14 filter drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]">
            <div
              className="w-full h-full bg-pink"
              style={{
                maskImage: "url(/assets/paperclip.svg)",
                WebkitMaskImage: "url(/assets/paperclip.svg)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            />
          </div>
        </div>
      )}

      {/* Card contents */}
      <div
        className={cn(
          "h-full w-full",
          isSticky ? "flex flex-col justify-center items-center text-center p-4" : isPolaroid ? "" : "p-6"
        )}
      >
        {children}
      </div>
    </div>
  );
};
