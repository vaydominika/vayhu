import React from "react";
import { Heart, ArrowRight, Mail } from "lucide-react";
import { PaperCard } from "@/components/PaperCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { 
  GithubIcon, 
  LinkedinIcon, 
  EnvelopeDoodle, 
  SparkleStar 
} from "@/components/ScrapbookDoodles";

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
  );
};
