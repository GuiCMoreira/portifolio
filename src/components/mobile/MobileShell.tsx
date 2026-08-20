"use client";

import { AnimatePresence } from "motion/react";
import { Wallpaper } from "@/components/os/Wallpaper";
import { CommandPalette } from "@/components/os/CommandPalette";
import { MobileStatusBar } from "./MobileStatusBar";
import { MobileHome } from "./MobileHome";
import { MobileAppView } from "./MobileAppView";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useOSStore } from "@/lib/store";
import { Moon, Search, Sun } from "lucide-react";

export function MobileShell() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  // O app ativo vem do MESMO store do desktop: assim comandos do terminal
  // (open <projeto>, hire --me) também navegam no mobile.
  const windows = useOSStore((s) => s.windows);
  const focused = useOSStore((s) => s.focused);
  const openApp = useOSStore((s) => s.openApp);
  const closeApp = useOSStore((s) => s.closeApp);
  const setPaletteOpen = useOSStore((s) => s.setPaletteOpen);

  const activeApp =
    focused && windows[focused].open && !windows[focused].minimized ? focused : null;

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Wallpaper />

      {/* Dynamic Island */}
      <div
        aria-hidden
        className="absolute top-[calc(env(safe-area-inset-top)+6px)] left-1/2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-[env(safe-area-inset-top)]">
        <MobileStatusBar />

        {/* Toggles de busca, tema e idioma no topo da home */}
        {!activeApp && (
          <div className="absolute top-[calc(env(safe-area-inset-top)+2.75rem)] right-5 z-20 flex gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="glass rounded-full p-1.5 text-text-hi/80"
              aria-label={t("menubar.palette")}
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="glass rounded-full p-1.5 text-text-hi/80"
              aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="glass rounded-full px-3 py-1 font-mono text-[11px] text-text-hi/80"
              aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
            >
              {lang.toUpperCase()}
            </button>
          </div>
        )}

        <MobileHome onOpen={openApp} />

        <AnimatePresence>
          {activeApp && (
            <MobileAppView key={activeApp} appId={activeApp} onClose={() => closeApp(activeApp)} />
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
