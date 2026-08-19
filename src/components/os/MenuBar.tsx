"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { getApp } from "@/data/apps";

function Clock() {
  const { lang } = useI18n();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Hidrata no client para não divergir do SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="w-24" />;

  const formatted = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return <span className="font-mono text-[11px] text-text-lo">{formatted}</span>;
}

export function MenuBar() {
  const { t, lang, setLang } = useI18n();
  const focused = useOSStore((s) => s.focused);
  const setPaletteOpen = useOSStore((s) => s.setPaletteOpen);

  const focusedTitle = focused ? t(getApp(focused).titleKey) : t("menubar.desktop");

  return (
    <header className="glass fixed inset-x-0 top-0 z-40 flex h-8 items-center justify-between border-x-0 border-t-0 px-4">
      <div className="flex items-center gap-4">
        <span className="font-display text-[13px] font-semibold tracking-tight text-text-hi">
          Gui<span className="text-accent">OS</span>
        </span>
        <span className="text-[12px] font-medium text-text-lo">{focusedTitle}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
          aria-label={t("menubar.palette")}
        >
          <Search className="h-3 w-3" />
          <kbd className="font-mono text-[10px]">⌘K</kbd>
        </button>

        <button
          type="button"
          onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          className="rounded-md px-2 py-0.5 font-mono text-[11px] text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
          aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
        >
          {lang === "pt" ? "PT" : "EN"}
          <span className="text-text-lo/50"> ⇄ </span>
          <span className="text-text-lo/50">{lang === "pt" ? "EN" : "PT"}</span>
        </button>

        <Clock />
      </div>
    </header>
  );
}
