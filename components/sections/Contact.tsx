import React from "react";
import { Mail } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { Doodle } from "@/components/ui/Doodle";

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.25418 12.8823C4.17563 12.8438 3.9312 12.7681 4.01849 12.7652C5.15538 12.723 6.29299 12.7652 7.43061 12.7652C8.33256 12.7652 9.23453 12.7652 10.1365 12.7652C13.3202 12.7652 16.4858 12.6474 19.6659 12.6474" />
    <path d="M14.4888 7C15.8643 7 16.6462 8.42058 17.6653 9.23597C20.6337 11.6101 21.1007 11.6996 18.6065 14.6477C17.8631 15.5256 16.9946 16.2486 16.1356 17" />
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EnvelopeDoodle = ({ className = "w-48 h-32 text-charcoal" }: { className?: string }) => (
  <svg
    viewBox="0 0 300 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main Envelope Body */}
    <rect x="20" y="30" width="260" height="150" rx="8" fill="#FBF9F2" />
    {/* Back fold lines */}
    <path d="M20 30 L150 120 L280 30" />
    <path d="M20 180 L110 105" />
    <path d="M280 180 L190 105" />
    
    {/* Mini flower peaking out */}
    <path d="M150 75 C145 60 148 45 150 35" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="150" cy="35" r="5" fill="#AFCFC9" className="text-teal" />
    <circle cx="145" cy="32" r="3" fill="currentColor" />
    <circle cx="155" cy="32" r="3" fill="currentColor" />
    <circle cx="150" cy="41" r="3" fill="currentColor" />
    
    {/* Heart seal on the center flap */}
    <path
      d="M150 130 C146 122 136 124 136 132 C136 140 150 148 150 150 C150 148 164 140 164 132 C164 124 154 122 150 130 Z"
      fill="#DDBCC7"
      stroke="#DDBCC7"
      strokeWidth="1"
    />
  </svg>
);

export const Contact: React.FC = () => {
  return (
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
              <p className="max-w-md text-sm md:text-base text-charcoal/80 leading-relaxed font-sans flex items-center flex-wrap gap-1">
                <span>I'm currently open to new opportunities and exciting projects. Let's build something amazing!</span>
                <Doodle src="/assets/heart-1.svg" className="w-3.5 h-3.5 animate-pulse" color="bg-pink" />
              </p>
              
              {/* CTA Form Button */}
              <div className="pt-2">
                <a
                  href="mailto:hello@vay.dev"
                  className="inline-flex items-center gap-2 bg-pink hover:bg-pink/90 hover:-translate-y-0.5 hover:scale-105 active:scale-95 text-charcoal font-semibold px-6 py-3 rounded-full shadow-scrapbook-md hover:shadow-scrapbook-lg btn-transition text-sm border border-pink/10"
                >
                  <span>Get in touch</span>
                  <ArrowRightIcon className="w-4 h-4 animate-pulse" />
                </a>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-4 pt-4 text-charcoal/70">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white rounded-full border border-charcoal/10 hover:border-sage hover:bg-sage/20 hover:-translate-y-0.5 hover:scale-110 active:scale-90 shadow-sm btn-transition cursor-pointer flex items-center justify-center"
                >
                  <Doodle src="/assets/githublogo.svg" className="w-4 h-4" color="bg-charcoal/70" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white rounded-full border border-charcoal/10 hover:border-sage hover:bg-sage/20 hover:-translate-y-0.5 hover:scale-110 active:scale-90 shadow-sm btn-transition cursor-pointer flex items-center justify-center"
                >
                  <Doodle src="/assets/linkedinlogo.svg" className="w-4 h-4" color="bg-charcoal/70" />
                </a>
                <a 
                  href="mailto:hello@vay.dev" 
                  className="p-2 bg-white rounded-full border border-charcoal/10 hover:border-sage hover:bg-sage/20 hover:-translate-y-0.5 hover:scale-110 active:scale-90 shadow-sm btn-transition cursor-pointer flex items-center justify-center"
                >
                  <Doodle src="/assets/mail.svg" className="w-4 h-4" color="bg-charcoal/70" />
                </a>
              </div>
            </ScrollRevealItem>

            {/* Right Column: Envelope & Postcard illustration */}
            <ScrollRevealItem delay={200} className="md:col-span-5 flex justify-center items-center relative py-4">
              <EnvelopeDoodle className="text-charcoal/80 filter drop-shadow-[4px_4px_12px_rgba(47,47,47,0.12)] animate-float-ambient" />
              <Doodle src="/assets/shine-3.svg" className="absolute top-2 right-[20%] w-6 h-6 animate-float-ambient-slow" color="bg-pink" />
              <Doodle src="/assets/star-8.svg" className="absolute bottom-4 left-[15%] w-5 h-5 animate-float-ambient" color="bg-teal" />
            </ScrollRevealItem>

          </div>
        </PaperCard>
      </ScrollReveal>
    </section>
  );
};
