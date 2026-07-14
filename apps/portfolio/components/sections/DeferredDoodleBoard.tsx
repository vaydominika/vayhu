"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const DynamicDoodleBoard = dynamic(
  () => import("@/components/sections/DoodleBoard").then((module) => module.DoodleBoard),
  { ssr: false }
);

const DoodleBoardPlaceholder = () => (
  <section className="min-h-[940px] lg:min-h-[620px]" aria-label="Loading doodle board">
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">tiny guestbook</div>
        <h2 className="font-serif text-4xl font-bold leading-tight text-charcoal md:text-5xl">Leave a doodle</h2>
      </div>
      <p className="max-w-sm text-sm leading-relaxed text-charcoal/60 md:text-right">Draw something small before you go.</p>
    </div>
    <div className="grid gap-5 border border-[#DED8CA] bg-white/95 p-6 shadow-scrapbook-md lg:grid-cols-[1fr_190px]">
      <div className="h-[360px] border border-charcoal/10 bg-[#FFFCF6] dot-grid-lines md:h-[430px]" />
      <div className="min-h-80 border border-charcoal/10 bg-offwhite/70" />
    </div>
  </section>
);

export const DeferredDoodleBoard: React.FC = () => {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setShouldLoad(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: "1000px 0px" });
    observer.observe(boundary);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="doodle" ref={boundaryRef} className="scroll-mt-24">
      {shouldLoad ? <DynamicDoodleBoard /> : <DoodleBoardPlaceholder />}
    </div>
  );
};
