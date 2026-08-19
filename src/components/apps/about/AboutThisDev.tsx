"use client";

import { Cpu, HardDrive, MemoryStick, MonitorCog, Palette } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { mainStack } from "@/data/career";

// Paródia do painel "Sobre este Mac".
export function AboutThisDev() {
  const { t } = useI18n();

  const specs = [
    { icon: MonitorCog, label: t("about.os"), value: t("about.osValue") },
    { icon: Cpu, label: t("about.chip"), value: t("about.chipValue") },
    { icon: MemoryStick, label: t("about.memory"), value: mainStack.slice(0, 6).join(" · ") },
    { icon: HardDrive, label: t("about.storage"), value: t("about.storageValue") },
    { icon: Palette, label: t("about.graphics"), value: t("about.graphicsValue") },
  ];

  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
      <h3 className="mb-4 font-display text-[15px] font-semibold text-text-hi">
        {t("about.thisDev")}
      </h3>
      <dl className="space-y-3">
        {specs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div key={spec.label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="grid grid-cols-[90px_1fr] gap-2 text-[13px]">
                <dt className="font-mono text-text-lo">{spec.label}</dt>
                <dd className="text-text-hi/90">{spec.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
