"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MotionRegionProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}

export const MotionRegion: React.FC<MotionRegionProps> = ({ children, className, rootMargin = "160px 0px" }) => {
  const regionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const region = regionRef.current;
    if (!region || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setIsActive(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setIsActive(entry.isIntersecting), { rootMargin });
    observer.observe(region);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={regionRef} className={cn("motion-region", className)} data-motion-active={isActive ? "true" : "false"}>
      {children}
    </div>
  );
};
