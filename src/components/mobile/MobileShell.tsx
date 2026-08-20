"use client";

import { AnimatePresence } from "motion/react";
import { Wallpaper } from "@/components/os/Wallpaper";
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

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Wallpaper />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <MobileStatusBar />

        {/* Toggles discretos de idioma e tema no topo da home */}
        {!activeApp && (
          <div className="absolute top-11 right-5 z-20 flex gap-2">
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
    </div>
  );
}
