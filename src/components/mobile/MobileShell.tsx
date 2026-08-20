"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { AppId } from "@/lib/types";
import { Wallpaper } from "@/components/os/Wallpaper";
import { CommandPalette } from "@/components/os/CommandPalette";
import { MobileStatusBar } from "./MobileStatusBar";
import { MobileHome } from "./MobileHome";
import { MobileAppView } from "./MobileAppView";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useOSStore } from "@/lib/store";
import { Moon, Sun } from "lucide-react";

export function MobileShell() {
  const { lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  // O app ativo vem do MESMO store do desktop: assim comandos do terminal
  // (open <projeto>, hire --me) também navegam no mobile.
  const windows = useOSStore((s) => s.windows);
  const focused = useOSStore((s) => s.focused);
  const openApp = useOSStore((s) => s.openApp);
  const closeApp = useOSStore((s) => s.closeApp);

  const activeApp =
    focused && windows[focused].open && !windows[focused].minimized ? focused : null;

  // Ícone de origem do último toque — habilita o morph "app cresce do ícone".
  // Aberturas sem toque (terminal, palette) ficam sem origem e usam o zoom padrão.
  const [origin, setOrigin] = useState<{ app: AppId; layoutId: string } | null>(null);

  const openFromIcon = (id: AppId, originLayoutId: string) => {
    setOrigin({ app: id, layoutId: originLayoutId });
    openApp(id);
  };

  const originLayoutId = activeApp && origin?.app === activeApp ? origin.layoutId : undefined;

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Wallpaper />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-[env(safe-area-inset-top)]">
        <MobileStatusBar />

        {/* Ações rápidas: tema e idioma (a busca é a pílula acima do dock, como no iOS) */}
        <div className="flex justify-end gap-2 px-6 pt-1 pb-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="glass flex h-8 w-8 items-center justify-center rounded-full text-text-hi/80"
            aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="glass flex h-8 items-center rounded-full px-3 font-mono text-[11px] text-text-hi/80"
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {lang.toUpperCase()}
          </button>
        </div>

        <MobileHome onOpen={openFromIcon} />

        <AnimatePresence>
          {activeApp && (
            <MobileAppView
              key={activeApp}
              appId={activeApp}
              originLayoutId={originLayoutId}
              onClose={() => closeApp(activeApp)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Home indicator, como no iPhone */}
      <div
        aria-hidden
        className="absolute bottom-[calc(env(safe-area-inset-bottom)+4px)] left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-text-hi/30"
      />

      <CommandPalette />
    </div>
  );
}
