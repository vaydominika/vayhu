import React from "react";

export const LeafDoodle = ({ className = "w-6 h-6 text-sage" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M50 85 C50 85 45 60 50 30" />
    <path d="M50 30 C30 35 15 50 20 65 C25 80 50 85 50 85" />
    <path d="M50 30 C70 35 85 50 80 65 C75 80 50 85 50 85" />
    <path d="M50 45 C40 48 30 55 25 62" />
    <path d="M50 55 C60 58 70 65 75 72" />
    <path d="M50 30 C50 20 40 10 35 5" />
  </svg>
);

export const FlowerDoodle = ({ className = "w-8 h-8 text-pink" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Stem */}
    <path d="M50 50 C50 65 52 80 48 95" />
    {/* Leaves on stem */}
    <path d="M49 75 C40 75 35 70 30 72 C35 78 45 78 49 76" fill="currentColor" fillOpacity="0.2" />
    <path d="M51 65 C60 65 65 60 70 62 C65 68 55 68 51 66" fill="currentColor" fillOpacity="0.2" />
    {/* Flower petals */}
    <path d="M50 50 C38 45 32 30 45 25 C58 20 50 40 50 50 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M50 50 C62 45 68 30 55 25 C42 20 50 40 50 50 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M50 50 C45 38 30 32 25 45 C20 58 40 50 50 50 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M50 50 C55 38 70 32 75 45 C80 58 60 50 50 50 Z" fill="currentColor" fillOpacity="0.3" />
    {/* Center */}
    <circle cx="50" cy="42" r="7" fill="#F9F8F4" stroke="currentColor" strokeWidth="3" />
  </svg>
);

export const SparkleStar = ({ className = "w-5 h-5 text-pink/60" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
  >
    <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" />
  </svg>
);

export const HeartDoodle = ({ className = "w-6 h-6 text-pink" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M50 35 C40 15 10 20 10 45 C10 70 45 90 50 95 C55 90 90 70 90 45 C90 20 60 15 50 35 Z" />
  </svg>
);

export const ArrowDoodle = ({ className = "w-10 h-10 text-charcoal" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 50 C40 45 70 35 80 50" />
    <path d="M65 35 C70 42 78 48 83 50 C76 53 70 61 67 68" />
  </svg>
);

export const UnderlineHighlight = ({ className = "w-full h-3 text-pink/40" }: { className?: string }) => (
  <svg
    viewBox="0 0 300 20"
    preserveAspectRatio="none"
    fill="none"
    stroke="currentColor"
    strokeWidth="10"
    strokeLinecap="round"
    className={className}
  >
    <path d="M5 10 C50 7 120 13 295 10 M30 14 C100 11 200 13 270 12" />
  </svg>
);

export const PaperclipDoodle = ({ className = "w-8 h-12 text-[#9E9E9E]" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 15 L15 55 A10 10 0 0 0 35 55 L35 25 A15 15 0 0 0 5 25 L5 60 A20 20 0 0 0 45 60 L45 35" />
  </svg>
);

export const PushPin = ({ className = "w-8 h-8 text-pink" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
  >
    {/* Pin head */}
    <ellipse cx="50" cy="30" rx="20" ry="12" fill="currentColor" opacity="0.9" />
    <path d="M30 30 L35 55 L65 55 L70 30 Z" fill="currentColor" />
    <rect x="33" y="55" width="34" height="6" rx="3" fill="currentColor" opacity="0.8" />
    {/* Metal needle */}
    <line x1="50" y1="61" x2="50" y2="90" stroke="#757575" strokeWidth="4.5" strokeLinecap="round" />
    {/* Subtle highlight */}
    <circle cx="45" cy="26" r="4" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

export const EnvelopeDoodle = ({ className = "w-48 h-32 text-charcoal" }: { className?: string }) => (
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
    <circle cx="150" cy="35" r="5" fill="#EAFCFC9" className="text-teal" />
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

export const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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

export const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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

