"use client";

import { useEffect, useState } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function MobileStatusBar() {
  const { lang } = useI18n();
  const [now, setNow] = useState<Date | null>(null);

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

  return (
    <div className="flex h-10 items-center justify-between px-5 pt-1">
      <span className="font-mono text-[12px] font-semibold text-text-hi">{time}</span>
      <div className="flex items-center gap-1.5 text-text-hi" aria-hidden>
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  );
}
