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
      <path d="M13.5 14v14M50.5 14v14" stroke="#0b2e59" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
      <path d="M10 40c6.8 8.5 14 12.5 22 12.5s15.2-4 22-12.5" fill="none" stroke="#0b2e59" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function SafariIcon({ className }: IconProps) {
  // Ícone original do tema WhiteSur (GPL-3, crédito no README).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/app-safari.svg" alt="" className={className} draggable={false} aria-hidden />;
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
      <path d="M12 16l13 11-13 11" fill="none" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 39h16" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" />
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
      <g stroke="#d9d9de" strokeWidth="3.6" strokeLinecap="round">
        <path d="M10 28h44M10 38h44M10 48h30" />
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
      <rect x="10" y="17" width="44" height="30" rx="5.5" fill="#ffffff" />
      <path d="M12 21l20 15.5L52 21" fill="none" stroke="#b9c7dd" strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M12 44.5l14.5-12M52 44.5l-14.5-12" fill="none" stroke="#d7e0ee" strokeWidth="2.1" />
    </svg>
  );
}

export function GitHubTileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#1b1f24" />
      <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <g transform="translate(7 7) scale(2.083)" fill="#ffffff">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </g>
    </svg>
  );
}

export function LinkedInTileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#0a66c2" />
      <g transform="translate(5 5) scale(2.25)" fill="#ffffff">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </g>
    </svg>
  );
}

export function SettingsTileIcon({ className }: IconProps) {
  // Ícone original do tema WhiteSur (GPL-3, crédito no README).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/app-settings.svg" alt="" className={className} draggable={false} aria-hidden />;
}

export function TrashIcon({ className }: IconProps) {
  // Cesto cheio estilo macOS — asset do tema WhiteSur (GPL-3, crédito no README).
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/trash-full.svg" alt="" className={className} draggable={false} aria-hidden />;
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
      <rect x="11" y="11" width="42" height="42" rx="12.5" fill="none" stroke="#ffffff" strokeWidth="4.4" />
      <circle cx="32" cy="32" r="10.3" fill="none" stroke="#ffffff" strokeWidth="4.4" />
      <circle cx="43.3" cy="20.7" r="3" fill="#ffffff" />
    </svg>
  );
}
