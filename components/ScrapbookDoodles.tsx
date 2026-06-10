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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.2513 20.2932C9.6336 20.884 9.80625 18.6277 9.77474 17.773C9.7649 17.5012 9.77474 17.2282 9.77474 16.9557C9.77474 15.6842 9.77474 14.4126 9.77474 13.1417C9.77474 11.0981 9.77474 9.05457 9.77474 7.01102C9.77474 6.51145 9.29028 5.63377 9.77474 5.51233C10.5487 5.31933 11.0365 7.0898 11.1369 7.28345C12.5522 10.0124 14.284 12.4892 16.1778 14.9122C16.6538 15.522 17.1442 16.122 17.6759 16.6833C18.0323 17.0594 19.365 17.8689 18.9021 17.6371C16.5901 16.4811 14.8682 14.7769 12.3632 13.8224C10.5586 13.1351 8.40865 13.1187 6.50558 13.2776C6.32965 13.292 4.88872 13.5139 5.00688 13.2776C5.22285 12.8456 5.57668 12.4806 5.96005 12.1879C6.79179 11.5544 7.68524 11.0062 8.54848 10.4167C9.54695 9.73468 10.4975 8.97581 11.5459 8.37318C12.6376 7.74626 13.8481 7.34582 14.9516 6.7386C16.2757 6.01059 17.3116 4.67336 18.6297 4.01428C18.8326 3.91253 18.3625 4.38191 18.2207 4.55915C17.9194 4.93596 17.5512 5.25828 17.2676 5.64887C16.8231 6.26004 16.4181 6.90074 16.0413 7.55589C15.373 8.71848 14.7875 9.92702 14.1343 11.0981C13.47 12.2883 12.6901 13.4154 12.0907 14.6397C11.6424 15.5555 11.0365 19.5435 10.2513 20.2932Z" />
  </svg>
);

export const HeartDoodle = ({ className = "w-6 h-6 text-pink" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M13.6462 19.8587C12.0137 19.3139 2.3937 14.7014 4.23256 11.0237C4.95064 9.58767 7.3902 9.19968 8.72216 9.86566C9.41897 10.2135 10.2996 10.7932 10.8945 11.3136C11.1783 11.5619 11.5948 12.3748 11.7635 12.0375C12.6711 10.2227 11.3095 8.04294 13.2118 5.66556C15.0552 3.36131 19.3414 3.1828 19.5841 6.82428C19.8007 10.0725 17.7246 13.5961 15.9634 16.2376" />
  </svg>
);

export const ArrowRightDoodle = ({ className = "w-5 h-5" }: { className?: string }) => (
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

export const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.34424 5.17162C9.3302 6.41852 14.8086 5 20.0002 5" />
    <path d="M4 12.2253C8.83839 12.2253 13.6237 12.0536 18.4522 12.0536" />
    <path d="M4.17154 19.4513C9.39047 19.4513 14.6094 19.4513 19.8283 19.4513" />
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.3486 4.02413C12.3721 5.10283 12.4309 8.0992 11.4721 10.1367C11.0986 10.9309 8.11612 11.925 8.11612 12.7736C8.11612 13.3192 10.6339 14.7721 10.9927 15.2905C11.3743 15.8413 11.8331 16.453 12.0714 17.0883C12.1567 17.3163 11.9486 17.8075 12.1912 17.8075C12.2868 17.8075 12.5375 17.0097 12.5508 16.9685C13.164 15.1288 14.0045 13.4728 15.1884 11.9346C16.1237 10.7176 17.2112 9.52201 18.4245 8.57861C18.7112 8.35581 19.137 7.83081 19.5031 7.73963C19.7995 7.66536 20.0722 7.97933 19.9825 7.97933C19.3766 7.97933 15.0538 3.63956 14.3486 4.02413Z" />
    <path d="M9.91406 14.6912C9.11845 17.0795 6.93754 18.7752 5 20.3245" />
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

export const DocumentDoodle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7.00696 4.53447C6.71496 4.69559 6.23291 3.85183 6.08362 4.14974C5.74756 4.82253 6.53212 8.41527 6.54527 8.61125C6.72612 11.3195 6.52949 14.054 6.69917 16.7655C6.70837 16.9076 6.58145 19.6493 6.69917 19.6881C7.32854 19.8979 9.60537 19.0094 10.238 18.9193C11.4705 18.7431 16.3174 18.8792 17.1611 18.4577C17.7109 18.1828 17.3144 10.8835 17.3144 10.1502C17.3144 9.2071 18.1009 5.41441 17.6222 4.45752C17.2782 3.76961 16.078 4.55288 15.3145 4.45752C12.7555 4.1379 8.74448 3.57429 7.00696 4.53447Z" />
    <path d="M8.85284 7.3808C10.4957 7.3808 12.1332 7.5347 13.776 7.5347" />
    <path d="M9.77635 10.1502C8.97073 10.4185 12.4984 10.1502 13.3145 10.1502" />
    <path d="M9.93029 13.6884C11.1187 13.6884 12.2794 13.3806 13.4685 13.3806" />
  </svg>
);

