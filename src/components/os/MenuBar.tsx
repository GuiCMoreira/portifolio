"use client";

import { useEffect, useRef, useState } from "react";
import { Battery, Moon, Search, Sun, Wifi } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useOSStore } from "@/lib/store";
import { APPS, getApp } from "@/data/apps";
import type { AppId } from "@/lib/types";
import { cn } from "@/lib/utils";

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

  if (!now) return <span className="w-28" />;

  const locale = lang === "pt" ? "pt-BR" : "en-US";
  // Formato do macOS: "qua. 19 de ago.  15:42"
  const date = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(now);
  const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(now);

  return (
    <span className="text-[12px] font-medium whitespace-nowrap text-text-hi/90">
      {date}&ensp;{time}
    </span>
  );
}

interface MenuDef {
  labelKey: string;
  items: { labelKey: string; action: () => void }[];
}

export function MenuBar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const focused = useOSStore((s) => s.focused);
  const setPaletteOpen = useOSStore((s) => s.setPaletteOpen);
  const openApp = useOSStore((s) => s.openApp);
  const closeApp = useOSStore((s) => s.closeApp);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLElement>(null);

  // Fecha dropdown ao clicar fora ou apertar Esc.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const focusedTitle = focused ? t(getApp(focused).titleKey) : "GuiOS";

  const menus: MenuDef[] = [
    {
      labelKey: "menu.file",
      items: [
        ...APPS.map((app) => ({
          labelKey: app.titleKey,
          action: () => openApp(app.id as AppId),
        })),
        ...(focused
          ? [{ labelKey: "menu.closeWindow", action: () => closeApp(focused) }]
          : []),
      ],
    },
    {
      labelKey: "menu.help",
      items: [
        { labelKey: "menu.helpPalette", action: () => setPaletteOpen(true) },
        { labelKey: "menu.helpTerminal", action: () => openApp("terminal") },
        { labelKey: "menu.helpHire", action: () => openApp("contact") },
      ],
    },
  ];

  return (
    <header
      ref={barRef}
      className="glass fixed inset-x-0 top-0 z-40 flex h-8 items-center justify-between border-x-0 border-t-0 px-3"
    >
      <div className="flex items-center gap-1">
        {/* logo do sistema, no lugar da maçã */}
        <span className="mr-1 flex h-5 w-5 items-center justify-center rounded-[6px] bg-text-hi font-display text-[12px] font-bold text-(--glass-heavy) select-none">
          G
        </span>
        <span className="px-2 text-[13px] font-bold text-text-hi">{focusedTitle}</span>

        {menus.map((menu) => (
          <div key={menu.labelKey} className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === menu.labelKey ? null : menu.labelKey)}
              onMouseEnter={() => openMenu && setOpenMenu(menu.labelKey)}
              className={cn(
                "rounded-md px-2 py-0.5 text-[13px] text-text-hi/90",
                openMenu === menu.labelKey ? "bg-fill-2" : "hover:bg-fill-1",
              )}
              aria-expanded={openMenu === menu.labelKey}
            >
              {t(menu.labelKey)}
            </button>
            {openMenu === menu.labelKey && (
              <div className="glass-heavy absolute top-7 left-0 z-50 min-w-44 rounded-lg p-1 shadow-2xl shadow-black/25">
                {menu.items.map((item) => (
                  <button
                    key={item.labelKey}
                    type="button"
                    onClick={() => {
                      item.action();
                      setOpenMenu(null);
                    }}
                    className="block w-full rounded-md px-3 py-1 text-left text-[13px] text-text-hi hover:bg-accent hover:text-white"
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-md p-1 text-text-hi/80 hover:bg-fill-1"
          aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
        >
          {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>

        <button
          type="button"
          onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-text-hi/80 hover:bg-fill-1"
          aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
        >
          {lang.toUpperCase()}
        </button>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="rounded-md p-1 text-text-hi/80 hover:bg-fill-1"
          aria-label={t("menubar.palette")}
        >
          <Search className="h-3.5 w-3.5" />
        </button>

        <Wifi className="h-3.5 w-3.5 text-text-hi/80" aria-hidden />
        <Battery className="h-4 w-4 text-text-hi/80" aria-hidden />

        <Clock />
      </div>
    </header>
  );
}
