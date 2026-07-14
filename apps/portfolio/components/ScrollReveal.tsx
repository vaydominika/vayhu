"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ScrollRevealContext = createContext<boolean>(false);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  threshold = 0.15,
  duration = 800,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect to avoid running checks again
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // triggers slightly early
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <ScrollRevealContext.Provider value={isVisible}>
      <div
        ref={containerRef}
        className={cn(
          "transition-[opacity,transform] cubic-bezier(0.25, 1, 0.5, 1) motion-reduce:transition-none",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          className
        )}
        style={{
          transitionDuration: `${duration}ms`,
        }}
      >
        {children}
      </div>
    </ScrollRevealContext.Provider>
  );
};

interface ScrollRevealItemProps {
  children: React.ReactNode;
  delay?: number; // delay in milliseconds
  duration?: number;
  className?: string;
  id?: string;
}

export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  delay = 0,
  duration = 800,
  className,
  id,
}) => {
  const isVisible = useContext(ScrollRevealContext);

  return (
    <div
      id={id}
      className={cn(
        "transition-[opacity,transform] cubic-bezier(0.25, 1, 0.5, 1) motion-reduce:transition-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
