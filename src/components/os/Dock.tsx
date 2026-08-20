"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { APPS } from "@/data/apps";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/data/projects";
import {
  GitHubTileIcon,
  InstagramTileIcon,
  LinkedInTileIcon,
  TrashIcon,
} from "@/components/ui/app-icons";
import { cn } from "@/lib/utils";

const BASE = 48;
const PEAK = 76;
const RANGE = 130;

interface DockItemProps {
  mouseX: MotionValue<number>;
  label: string;
  onActivate: () => void;
  showDot?: boolean;
  bounce?: boolean;
  href?: string;
  children: React.ReactNode;
}

function DockItem({ mouseX, label, onActivate, showDot, bounce, href, children }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [bouncing, setBouncing] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || !Number.isFinite(val)) return RANGE;
    return val - bounds.x - bounds.width / 2;
  });
  const sizeSync = useTransform(distance, [-RANGE, 0, RANGE], [BASE, PEAK, BASE]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 220, damping: 16 });

  const activate = () => {
    if (!reduced && !bouncing) {
      setBouncing(true);
      setTimeout(() => setBouncing(false), 650);
    }
    onActivate();
  };

  const inner = (
    <motion.div
      style={reduced ? { width: BASE, height: BASE } : { width: size, height: size }}
      className={cn("relative", bouncing && bounce && "dock-bounce")}
    >
      {children}
    </motion.div>
  );

  return (
    <div ref={ref} className="group relative flex flex-col items-center">
      {/* tooltip estilo macOS */}
      <span className="glass-heavy pointer-events-none absolute -top-10 rounded-lg px-2.5 py-1 text-[12px] whitespace-nowrap text-text-hi opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {label}
      </span>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex items-end"
          onClick={activate}
        >
          {inner}
        </a>
      ) : (
        <button type="button" aria-label={label} className="flex items-end" onClick={activate}>
          {inner}
        </button>
      )}

      {/* indicador de app aberto */}
      <span
        className={cn(
          "mt-1 h-1 w-1 rounded-full transition-colors",
          showDot ? "bg-text-hi/70" : "bg-transparent",
        )}
        aria-hidden
      />
    </div>
  );
}

// GitHub abre dentro do Safari do GuiOS (página renderizada); os demais, em nova aba.
const SOCIALS: { id: string; label: string; Icon: typeof GitHubTileIcon; href?: string; safariUrl?: string }[] = [
  { id: "github", label: "GitHub", safariUrl: GITHUB_URL, Icon: GitHubTileIcon },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedInTileIcon },
  { id: "instagram", label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramTileIcon },
];

export function Dock() {
  const { t } = useI18n();
  const windows = useOSStore((s) => s.windows);
  const openApp = useOSStore((s) => s.openApp);
  const focusApp = useOSStore((s) => s.focusApp);
  const setSystemDialog = useOSStore((s) => s.setSystemDialog);
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      aria-label="Dock"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="glass fixed bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-end gap-2 rounded-2xl px-3 pt-2 pb-0.5 shadow-xl shadow-black/20"
    >
      {APPS.map((app) => {
        const win = windows[app.id];
        const Icon = app.icon;
        return (
          <DockItem
            key={app.id}
            mouseX={mouseX}
            label={t(app.titleKey)}
            showDot={win.open}
            bounce={!win.open}
            onActivate={() => (win.open ? focusApp(app.id) : openApp(app.id))}
          >
            <Icon className="h-full w-full drop-shadow-md" />
          </DockItem>
        );
      })}

      {/* separador: apps do sistema | links externos */}
      <div className="mx-1 mb-2.5 h-10 w-px self-end bg-line-strong" aria-hidden />

      {SOCIALS.map(({ id, label, href, safariUrl, Icon }) => (
        <DockItem
          key={id}
          mouseX={mouseX}
          label={label}
          href={href}
          bounce
          onActivate={() => {
            if (safariUrl) openApp("safari", safariUrl);
          }}
        >
          <Icon className="h-full w-full drop-shadow-md" />
        </DockItem>
      ))}

      {/* separador: sociais | lixeira */}
      <div className="mx-1 mb-2.5 h-10 w-px self-end bg-line-strong" aria-hidden />

      <DockItem
        mouseX={mouseX}
        label={t("trash.title")}
        bounce
        onActivate={() => setSystemDialog("trash")}
      >
        <TrashIcon className="h-full w-full drop-shadow-md" />
      </DockItem>
    </nav>
  );
}
