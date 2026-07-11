import React from "react";
import { cn } from "@/lib/utils";

interface DoodleProps {
  src: string;
  className?: string;
  color?: string; // Tailwind/CSS color class e.g., 'bg-pink', 'bg-sage', 'bg-teal', etc.
}

export const Doodle: React.FC<DoodleProps> = ({ src, className, color = "bg-charcoal" }) => {
  return (
    <div
      className={cn("inline-block pointer-events-none select-none", color, className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
};
