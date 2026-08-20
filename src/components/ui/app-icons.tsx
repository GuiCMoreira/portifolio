// Ícones de app no estilo macOS — recriações próprias em SVG (não são os
// assets da Apple). Todos em squircle 64x64, prontos para dock/grade/palette.

interface IconProps {
  className?: string;
}

export function FinderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="fndL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fc4f9" />
          <stop offset="1" stopColor="#38a2ee" />
        </linearGradient>
        <linearGradient id="fndR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f8fe8" />
          <stop offset="1" stopColor="#1268d3" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#fndL)" />
      <path d="M32 0h18a14 14 0 0 1 14 14v36a14 14 0 0 1-14 14H32Z" fill="url(#fndR)" />
      <path d="M15 17v12M49 17v12" stroke="#0b2e59" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <path d="M12 40c6 7.5 12.5 11 20 11s14-3.5 20-11" fill="none" stroke="#0b2e59" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function SafariIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="sfrBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f7f9" />
          <stop offset="1" stopColor="#dfe2e8" />
        </linearGradient>
        <radialGradient id="sfrDial" cx="0.5" cy="0.25" r="1">
          <stop offset="0" stopColor="#3fb9f5" />
          <stop offset="1" stopColor="#1367e8" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#sfrBg)" />
      <circle cx="32" cy="32" r="24" fill="url(#sfrDial)" />
      {/* marcações do mostrador */}
      <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.6">
        <path d="M32 10v4M32 50v4M10 32h4M50 32h4" />
      </g>
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.2">
        <path d="M47.6 16.4l-2.9 2.9M19.3 44.7l-2.9 2.9M47.6 47.6l-2.9-2.9M19.3 19.3l-2.9-2.9" />
      </g>
      {/* agulha da bússola */}
      <g transform="rotate(45 32 32)">
        <path d="M32 14l5 18h-10Z" fill="#ff3b30" />
        <path d="M32 50l-5-18h10Z" fill="#ffffff" />
      </g>
    </svg>
  );
}

export function TerminalMacIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="trm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4a4f" />
          <stop offset="0.08" stopColor="#232327" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#trm)" />
      <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
      <path d="M12 16l13 11-13 11" fill="none" stroke="#fff" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 38h16" stroke="#fff" strokeWidth="5.2" strokeLinecap="round" />
    </svg>
  );
}

export function NotesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="nts" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbd54e" />
          <stop offset="1" stopColor="#f5b912" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      <path d="M0 14C0 6.3 6.3 0 14 0h36c7.7 0 14 6.3 14 14v4H0v-4Z" fill="url(#nts)" />
      <g stroke="#d9d9de" strokeWidth="3" strokeLinecap="round">
        <path d="M12 30h40M12 40h40M12 50h26" />
      </g>
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="mml" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#43c6fb" />
          <stop offset="1" stopColor="#1373f0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#mml)" />
      <rect x="9" y="16" width="46" height="32" rx="5.5" fill="#ffffff" />
      <path d="M11 20l21 16 21-16" fill="none" stroke="#b9c7dd" strokeWidth="3" strokeLinejoin="round" />
      <path d="M11 45l15-13M53 45l-15-13" fill="none" stroke="#d7e0ee" strokeWidth="2.2" />
    </svg>
  );
}

export function GitHubTileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#1b1f24" />
      <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <g transform="translate(9 9) scale(1.917)" fill="#ffffff">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </g>
    </svg>
  );
}

export function LinkedInTileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#0a66c2" />
      <g transform="translate(9 9) scale(1.917)" fill="#ffffff">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </g>
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="trsh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eceef1" />
          <stop offset="1" stopColor="#c3c8d1" />
        </linearGradient>
      </defs>
      {/* cesto aramado estilo macOS */}
      <path d="M18 16h28l-3.5 36a4 4 0 0 1-4 3.6h-13a4 4 0 0 1-4-3.6Z" fill="url(#trsh)" />
      <path d="M18 16h28l-3.5 36a4 4 0 0 1-4 3.6h-13a4 4 0 0 1-4-3.6Z" fill="none" stroke="#9aa1ad" strokeWidth="1.6" />
      <g stroke="#9aa1ad" strokeWidth="1.4" opacity="0.8">
        <path d="M23 20l2.4 31M32 20v31M41 20l-2.4 31" />
        <path d="M19.5 26h25M20.4 35h23.2M21.3 44h21.4" />
      </g>
      <rect x="15" y="12" width="34" height="5" rx="2.5" fill="#d6dae0" stroke="#9aa1ad" strokeWidth="1.4" />
      <path d="M27 12a5 5 0 0 1 10 0" fill="none" stroke="#9aa1ad" strokeWidth="1.8" />
    </svg>
  );
}

export function InstagramTileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id="igg" cx="0.25" cy="1.1" r="1.3">
          <stop offset="0" stopColor="#fdd875" />
          <stop offset="0.25" stopColor="#fa7e1e" />
          <stop offset="0.5" stopColor="#d62976" />
          <stop offset="0.78" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#igg)" />
      <rect x="12" y="12" width="40" height="40" rx="12" fill="none" stroke="#ffffff" strokeWidth="4.5" />
      <circle cx="32" cy="32" r="9.5" fill="none" stroke="#ffffff" strokeWidth="4.5" />
      <circle cx="43" cy="21" r="3" fill="#ffffff" />
    </svg>
  );
}
