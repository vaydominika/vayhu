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
  metadataBase: new URL("https://vay.hu"),
  title: "Vay Dominika",
  description: "A cozy scrapbook portfolio by Vay Dominika, frontend developer and UI/UX enthusiast.",
  icons: {
    icon: "/assets/icons/vayicon.svg",
  },
  openGraph: {
    title: "Vay Dominika",
    description: "A cozy scrapbook portfolio by Vay Dominika, frontend developer and UI/UX enthusiast.",
    url: "https://vay.hu",
    siteName: "Vay Dominika",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vay Dominika portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vay Dominika",
    description: "A cozy scrapbook portfolio by Vay Dominika, frontend developer and UI/UX enthusiast.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${handwritingFont.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">{children}</body>
    </html>
  );
}
