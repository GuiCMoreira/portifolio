"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { APPS } from "@/data/apps";
import { cn } from "@/lib/utils";

export function Dock() {
  const { t } = useI18n();
  const windows = useOSStore((s) => s.windows);
  const openApp = useOSStore((s) => s.openApp);
  const focusApp = useOSStore((s) => s.focusApp);

  return (
    <nav
      className="glass fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-end gap-2 rounded-2xl px-3 py-2"
      aria-label="Dock"
    >
      {APPS.map((app) => {
        const win = windows[app.id];
        const Icon = app.icon;
        return (
          <div key={app.id} className="group relative flex flex-col items-center">
            {/* tooltip */}
            <span className="pointer-events-none absolute -top-9 rounded-md bg-black/80 px-2 py-1 text-[11px] whitespace-nowrap text-text-hi opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              {t(app.titleKey)}
            </span>

            <motion.button
              type="button"
              onClick={() => (win.open ? focusApp(app.id) : openApp(app.id))}
              whileHover={{ scale: 1.16, y: -6 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                app.gradient,
              )}
              aria-label={t(app.titleKey)}
            >
              <Icon className="h-6 w-6 text-white drop-shadow" />
            </motion.button>

            {/* indicador de app aberto */}
            <span
              className={cn(
                "mt-1 h-1 w-1 rounded-full transition-colors",
                win.open ? "bg-text-hi/80" : "bg-transparent",
              )}
              aria-hidden
            />
          </div>
        );
      })}
    </nav>
  );
}
