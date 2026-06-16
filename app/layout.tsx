import type { Metadata } from "next";
import { Fraunces, Quicksand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const serifFont = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const handwritingFont = localFont({
  src: "../public/fonts/Domi.ttf",
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vay | Frontend Developer & UI/UX Enthusiast",
  description: "A cozy digital scrapbook portfolio showing my works, skills, and creative journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${handwritingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
