"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Lock, Rocket, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { useBattery, useConnectionType, useOnline } from "@/lib/hooks";
import { cn } from "@/lib/utils";

// ---------- Wi-Fi ----------

// Sinal enfraquece lista abaixo, como num scan de verdade.
const FAKE_NETWORKS: { name: string; strength: 1 | 2 | 3 }[] = [
  { name: "CAFÉ_5G", strength: 3 },
  { name: "NAO_CLIQUE_AQUI", strength: 2 },
  { name: "Vizinho_Desconfiado", strength: 2 },
  { name: "Van_de_Vigilancia 👀", strength: 1 },
];

// Ícone de Wi-Fi com intensidade: arcos inativos ficam esmaecidos.
function WifiStrength({ strength, className }: { strength: 0 | 1 | 2 | 3; className?: string }) {
  const arc = (active: boolean) => (active ? "1" : "0.22");
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M8.5 15a5 5 0 0 1 7 0" opacity={arc(strength >= 1)} />
      <path d="M5 11.5a10 10 0 0 1 14 0" opacity={arc(strength >= 2)} />
      <path d="M1.8 8a15 15 0 0 1 20.4 0" opacity={arc(strength >= 3)} />
    </svg>
  );
}

// Revela as redes em levas, como um scan: 2 de cara, depois +1, +1…
function useWifiScan(total: number): number {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(2), 350),
      ...Array.from({ length: Math.max(0, total - 2) }, (_, i) =>
        setTimeout(() => setVisible(3 + i), 900 + i * 550),
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, [total]);

  return visible;
}

export function WifiPopover() {
  const { t } = useI18n();
  const online = useOnline();
  const connType = useConnectionType();
  const visible = useWifiScan(FAKE_NETWORKS.length);
  const scanning = visible < FAKE_NETWORKS.length;

  return (
    <div className="w-64 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-text-hi">Wi-Fi</span>
        <span
          className={cn(
            "flex items-center gap-1.5 text-[11px]",
            online ? "text-emerald-500" : "text-red-400",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", online ? "bg-emerald-500" : "bg-red-400")} />
          {online ? t("wifi.connected") : t("wifi.offline")}
          {online && connType && <span className="text-text-lo">· {connType}</span>}
        </span>
      </div>

      {/* Rede "conectada" — aparece na hora, já estamos nela */}
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/15 px-2.5 py-1.5">
        <WifiStrength strength={3} className="h-4 w-4 text-accent" />
        <span className="text-[12px] font-medium text-text-hi">Internet do Gui</span>
        <span className="ml-auto text-[11px] text-accent">✓</span>
      </div>

      <p className="mt-3 flex items-center gap-2 px-1 font-mono text-[10px] tracking-widest text-text-lo/70 uppercase">
        {t("wifi.otherNetworks")}
        {scanning && (
          <motion.span
            className="h-2.5 w-2.5 rounded-full border border-text-lo/40 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            aria-label="scanning"
          />
        )}
      </p>
      <ul className="mt-1 min-h-[7.5rem] space-y-0.5">
        {FAKE_NETWORKS.slice(0, visible).map((net) => (
          <motion.li
            key={net.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] text-text-lo"
          >
            <WifiStrength strength={net.strength} className="h-4 w-4" />
            {net.name}
            <Lock className="ml-auto h-3 w-3 opacity-50" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Bateria ----------

export function BatteryPopover() {
  const { t } = useI18n();
  const battery = useBattery();
  const pct = Math.round(battery.level * 100);

  return (
    <div className="w-64 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-text-hi">
          {battery.real ? t("battery.title") : t("battery.caffeine")}
        </span>
        <span className="text-[13px] font-semibold text-text-hi">{pct}%</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-fill-2">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pct > 20 ? "bg-emerald-500" : "bg-red-400",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-[12px] text-text-lo">
        {battery.charging && <Zap className="h-3 w-3 text-amber-400" />}
        {battery.real
          ? battery.charging
            ? t("battery.charging")
            : t("battery.onBattery")
          : t("battery.caffeineNote")}
      </p>

      {battery.real && (
        <p className="mt-2 border-t border-line pt-2 text-[11px] text-text-lo/80">
          {t("battery.device")} {t("battery.apiNote")}
        </p>
      )}
    </div>
  );
}

// ---------- Relógio / mini central ----------

function MiniCalendar() {
  const { lang } = useI18n();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDow = new Date(year, month, 1).getDay();
  const weekdays =
    lang === "pt" ? ["D", "S", "T", "Q", "Q", "S", "S"] : ["S", "M", "T", "W", "T", "F", "S"];

  const cells: (number | null)[] = [
    ...Array.from({ length: startDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="grid grid-cols-7 gap-y-0.5 text-center">
      {weekdays.map((d, i) => (
        <span key={`w${i}`} className="font-mono text-[9px] text-text-lo/70">
          {d}
        </span>
      ))}
      {cells.map((day, i) => (
        <span
          key={i}
          className={cn(
            "mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
            day === today ? "bg-accent font-bold text-white" : "text-text-hi/80",
          )}
        >
          {day ?? ""}
        </span>
      ))}
    </div>
  );
}

export function ClockPopover({ onClose }: { onClose: () => void }) {
  const { t, lang } = useI18n();
  const openApp = useOSStore((s) => s.openApp);
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const now = new Date();

  const fullDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const timeOpts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  const visitorTime = new Intl.DateTimeFormat(locale, timeOpts).format(now);
  const myTime = new Intl.DateTimeFormat(locale, {
    ...timeOpts,
    timeZone: "America/Sao_Paulo",
  }).format(now);
  const sameTz = visitorTime === myTime;

  return (
    <div className="w-72 p-3">
      <p className="text-[13px] font-bold text-text-hi first-letter:uppercase">{fullDate}</p>

      <div className="mt-3 rounded-xl border border-line bg-inset p-2.5">
        <MiniCalendar />
      </div>

      <div className="mt-3 space-y-1 text-[12px]">
        {!sameTz && (
          <p className="flex justify-between text-text-lo">
            <span>{t("clock.yourTime")}</span>
            <span className="font-mono text-text-hi">{visitorTime}</span>
          </p>
        )}
        <p className="flex justify-between text-text-lo">
          <span>{t("clock.myTime")}</span>
          <span className="font-mono text-text-hi">{myTime}</span>
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-accent/30 bg-accent/10 p-3">
        <p className="flex items-center gap-2 text-[12px] font-semibold text-text-hi">
          <Rocket className="h-3.5 w-3.5 text-accent" />
          {t("clock.available")}
        </p>
        <button
          type="button"
          onClick={() => {
            openApp("contact");
            onClose();
          }}
          className="mt-2 w-full rounded-lg bg-accent py-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {t("clock.contact")}
        </button>
      </div>
    </div>
  );
}
