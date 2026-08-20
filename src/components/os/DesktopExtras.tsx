"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { useWallpaper } from "@/lib/wallpaper";
import { useWeather } from "@/lib/hooks";
import { MailIcon } from "@/components/ui/app-icons";
import { storageGet, storageSet } from "@/lib/safe-storage";

// ---------- Widget de clima real (Bragança Paulista, Open-Meteo) ----------

function weatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

export function WeatherWidget() {
  const { t } = useI18n();
  const weather = useWeather();

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass absolute top-12 right-6 z-10 rounded-2xl px-4 py-3"
      aria-label={t("weather.aria")}
    >
      <p className="flex items-center gap-1 text-[10px] text-text-lo">
        <MapPin className="h-3 w-3" />
        Bragança Paulista
      </p>
      <p className="mt-0.5 text-xl font-semibold text-text-hi">
        {weatherEmoji(weather.code)} {weather.temp}°
      </p>
    </motion.div>
  );
}

// ---------- Notificação estilo macOS (uma vez por sessão) ----------

const NOTIFIED_KEY = "guios.notified";
const NOTIFY_AFTER_MS = 45_000;
const AUTO_HIDE_MS = 15_000;

export function ContactNotification() {
  const { t } = useI18n();
  const openApp = useOSStore((s) => s.openApp);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (storageGet("session", NOTIFIED_KEY) === "1") return;
    const show = setTimeout(() => {
      setVisible(true);
      storageSet("session", NOTIFIED_KEY, "1");
    }, NOTIFY_AFTER_MS);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), AUTO_HIDE_MS);
    return () => clearTimeout(hide);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="glass-heavy absolute top-12 right-6 z-[70] w-80 rounded-2xl p-3.5 shadow-2xl shadow-black/30"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <MailIcon className="h-9 w-9 shrink-0" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-text-hi">{t("notify.title")}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-text-lo">{t("notify.body")}</p>
            </div>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="shrink-0 rounded-md p-0.5 text-text-lo hover:bg-fill-1"
              aria-label={t("window.close")}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              openApp("contact");
              setVisible(false);
            }}
            className="mt-2.5 w-full rounded-lg bg-accent py-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.01]"
          >
            {t("notify.cta")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Menu de contexto do desktop (botão direito no wallpaper) ----------

export function DesktopContextMenu() {
  const { t } = useI18n();
  const openApp = useOSStore((s) => s.openApp);
  const setSystemDialog = useOSStore((s) => s.setSystemDialog);
  const { cycleWallpaper } = useWallpaper();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // só no "fundo" do desktop — janelas, dock, menus etc. ficam de fora
      if (target.closest("section, nav, header, button, a, input, [role='dialog']")) return;
      e.preventDefault();
      setPos({ x: Math.min(e.clientX, window.innerWidth - 230), y: Math.min(e.clientY, window.innerHeight - 180) });
    };
    const close = () => setPos(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!pos) return null;

  const items = [
    { label: t("ctxmenu.wallpaper"), action: cycleWallpaper },
    { label: t("ctxmenu.settings"), action: () => setSystemDialog("settings") },
    { label: t("ctxmenu.terminal"), action: () => openApp("terminal") },
    { label: t("ctxmenu.about"), action: () => setSystemDialog("about") },
  ];

  return (
    <div
      className="glass-heavy fixed z-[85] min-w-52 rounded-lg p-1 shadow-2xl shadow-black/30"
      style={{ left: pos.x, top: pos.y }}
      role="menu"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          onClick={() => {
            item.action();
            setPos(null);
          }}
          className="block w-full rounded-md px-3 py-1 text-left text-[13px] text-text-hi hover:bg-accent hover:text-white"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
