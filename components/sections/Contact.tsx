import React, { useState } from "react";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { ScrollReveal, ScrollRevealItem } from "@/components/ScrollReveal";
import { Doodle } from "@/components/ui/Doodle";

const EMAIL_ADDRESS = "info@vay.hu";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your note right now.");
      }

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setStatus("sent");
      setStatusMessage("Sent! I'll read it soon.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Could not send your note right now.");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 border-y border-charcoal/10 py-12 md:py-16">
      <Doodle src="/assets/shine-3.svg" className="absolute -right-2 top-6 h-9 w-9 rotate-12 opacity-70" color="bg-pink" />
      <Doodle src="/assets/spiral-1.svg" className="absolute -left-8 bottom-8 h-20 w-20 -rotate-12 opacity-35 -z-10 pointer-events-none select-none" color="bg-teal" />
      <Doodle src="/assets/star-7.svg" className="absolute right-[18%] -bottom-6 h-14 w-14 rotate-45 opacity-40 -z-10 pointer-events-none select-none" color="bg-sage" />
      <ScrollReveal>
        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          <ScrollRevealItem delay={0} className="md:col-span-4">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
              <Mail className="h-3.5 w-3.5" />
              say hello
            </p>
            <h3 className="mt-3 max-w-sm font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal md:text-5xl">
              Have a good idea?
              <br />
              Let&apos;s talk about it.
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/75 md:text-base">
              I&apos;m open to thoughtful projects, creative collaborations, and conversations about making the web feel better.
            </p>
            <div className="mt-10">
              <p className="font-handwriting text-xl text-charcoal/80">or find me here</p>
              <div className="mt-3 flex items-center gap-4 text-charcoal/70">
                <a href="https://github.com/vaydominika" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-charcoal/25 pb-1 text-sm">
                  <Doodle src="/assets/githublogo.svg" className="h-3.5 w-3.5" color="bg-charcoal/65" />
                  GitHub <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://linkedin.com/in/dominika-vay-baa16b341/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-charcoal/25 pb-1 text-sm">
                  <Doodle src="/assets/linkedinlogo.svg" className="h-3.5 w-3.5" color="bg-charcoal/65" />
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem delay={150} className="md:col-span-8">
            <form onSubmit={sendEmail} className="relative flex flex-col">
              <div className="relative flex min-h-[20rem] flex-col ruled-lines dense border-t-2 border-charcoal/20 pt-5 md:min-h-[24rem] lg:min-h-[26rem]">
                <p className="absolute -top-4 left-0 bg-offwhite pr-3 font-handwriting text-2xl text-charcoal -rotate-1">leave a note</p>
                <div className="mt-5 flex flex-1 flex-col gap-5">
                  <label className="grid text-sm font-semibold leading-5 text-charcoal">
                    <span>Your name</span>
                    <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="What should I call you?" className="h-5 w-full border-0 bg-transparent px-0 text-base font-normal leading-5 text-charcoal outline-none placeholder:text-charcoal/35 focus:text-pink" />
                  </label>
                  <label className="grid text-sm font-semibold leading-5 text-charcoal">
                    <span>Your email</span>
                    <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Where can I reply?" className="h-5 w-full border-0 bg-transparent px-0 text-base font-normal leading-5 text-charcoal outline-none placeholder:text-charcoal/35 focus:text-pink" />
                  </label>
                  <label className="grid flex-1 grid-rows-[auto_1fr] text-sm font-semibold leading-5 text-charcoal">
                    <span>Your message</span>
                    <textarea required value={message} onChange={(event) => setMessage(event.target.value)} rows={10} placeholder="What would you like to say?" className="h-full min-h-0 w-full resize-none border-0 bg-transparent px-0 text-base font-normal leading-5 text-charcoal outline-none placeholder:text-charcoal/35 focus:text-pink" />
                  </label>
                  <label className="hidden" aria-hidden="true">
                    <span>Website</span>
                    <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
                  </label>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <span className="font-handwriting text-lg text-charcoal/55">to: {EMAIL_ADDRESS}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${status === "error" ? "text-red-700" : "text-charcoal/60"}`} role="status" aria-live="polite">
                    {statusMessage}
                  </span>
                  <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 border border-pink/30 bg-pink px-5 py-3 text-sm font-semibold text-charcoal shadow-scrapbook-sm hover:bg-pink/90 hover:-translate-y-0.5 hover:scale-105 hover:shadow-scrapbook-md active:scale-95 btn-transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100">
                    <span>{status === "sending" ? "Sending..." : "Send note"}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </ScrollRevealItem>
        </div>
      </ScrollReveal>
    </section>
  );
};
