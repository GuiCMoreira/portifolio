"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { AppId } from "@/lib/types";
import { Wallpaper } from "@/components/os/Wallpaper";
import { MobileStatusBar } from "./MobileStatusBar";
import { MobileHome } from "./MobileHome";
import { MobileAppView } from "./MobileAppView";
import { useI18n } from "@/lib/i18n";

export function MobileShell() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const { lang, setLang } = useI18n();

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Wallpaper />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <MobileStatusBar />

        {/* Toggle de idioma discreto no topo da home */}
        {!activeApp && (
          <button
            type="button"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="absolute top-11 right-5 z-20 rounded-full bg-white/8 px-3 py-1 font-mono text-[11px] text-text-lo"
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {lang.toUpperCase()}
          </button>
        )}

        <MobileHome onOpen={setActiveApp} />

        <AnimatePresence>
          {activeApp && (
            <MobileAppView key={activeApp} appId={activeApp} onClose={() => setActiveApp(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
