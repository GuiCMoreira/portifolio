"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BatteryPopover, ClockPopover, WifiPopover } from "@/components/os/StatusPopovers";

type Sheet = "status" | "clock" | null;

// Folha que desce da status bar, estilo Central de Controle do iOS.
function StatusSheet({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default"
        onClick={onClose}
        aria-label="Fechar"
        tabIndex={-1}
      />
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="glass-solid absolute top-full right-3 left-3 z-50 origin-top rounded-2xl shadow-2xl shadow-black/40 [&>div]:w-auto"
      >
        {children}
      </motion.div>
    </>
  );
}

export function MobileStatusBar() {
  const { lang } = useI18n();
  const [now, setNow] = useState<Date | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);

  useEffect(() => {
    // Hidrata no client para não divergir do SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(now)
    : "";

  const toggle = (s: Exclude<Sheet, null>) => setSheet((prev) => (prev === s ? null : s));

  return (
    <div className="relative flex h-10 items-center justify-between px-5 pt-1">
      <button
        type="button"
        onClick={() => toggle("clock")}
        className="rounded-md px-1 font-mono text-[12px] font-semibold text-text-hi"
        aria-expanded={sheet === "clock"}
      >
        {time}
      </button>

      <button
        type="button"
        onClick={() => toggle("status")}
        className="flex items-center gap-1.5 rounded-md px-1 text-text-hi"
        aria-expanded={sheet === "status"}
        aria-label={lang === "pt" ? "Status de conexão e bateria" : "Connection and battery status"}
      >
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <BatteryFull className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {sheet === "status" && (
          <StatusSheet key="status" onClose={() => setSheet(null)}>
            <WifiPopover />
            <div className="mx-3 h-px bg-line" aria-hidden />
            <BatteryPopover />
          </StatusSheet>
        )}
        {sheet === "clock" && (
          <StatusSheet key="clock" onClose={() => setSheet(null)}>
            <ClockPopover onClose={() => setSheet(null)} />
          </StatusSheet>
        )}
      </AnimatePresence>
    </div>
  );
}
