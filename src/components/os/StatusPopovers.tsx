"use client";

import { Lock, Rocket, Wifi, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { useBattery, useConnectionType, useOnline } from "@/lib/hooks";
import { cn } from "@/lib/utils";

// ---------- Wi-Fi ----------

const FAKE_NETWORKS = ["CAFÉ_5G", "NAO_CLIQUE_AQUI", "Vizinho_Desconfiado", "Van_de_Vigilancia 👀"];

export function WifiPopover() {
  const { t } = useI18n();
  const online = useOnline();
  const connType = useConnectionType();

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

      {/* Rede "conectada" */}
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/15 px-2.5 py-1.5">
        <Wifi className="h-3.5 w-3.5 text-accent" />
        <span className="text-[12px] font-medium text-text-hi">Internet do Gui</span>
        <span className="ml-auto text-[11px] text-accent">✓</span>
      </div>

      <p className="mt-3 px-1 font-mono text-[10px] tracking-widest text-text-lo/70 uppercase">
        {t("wifi.otherNetworks")}
      </p>
      <ul className="mt-1 space-y-0.5">
        {FAKE_NETWORKS.map((net) => (
          <li
            key={net}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] text-text-lo"
          >
            <Wifi className="h-3.5 w-3.5 opacity-60" />
            {net}
            <Lock className="ml-auto h-3 w-3 opacity-50" />
          </li>
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
