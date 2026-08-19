"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { AppId } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { APPS, getApp } from "@/data/apps";
import { AVATAR_URL } from "@/data/projects";

interface MobileHomeProps {
  onOpen: (id: AppId) => void;
}

function AppIcon({
  id,
  size,
  onOpen,
}: {
  id: AppId;
  size: "grid" | "dock";
  onOpen: (id: AppId) => void;
}) {
  const { t } = useI18n();
  const app = getApp(id);
  const Icon = app.icon;
  const tile = size === "grid" ? "h-16 w-16 rounded-2xl" : "h-14 w-14 rounded-2xl";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(id)}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-1.5"
      aria-label={t(app.titleKey)}
    >
      <span
        className={`flex items-center justify-center bg-gradient-to-br shadow-lg ${tile} ${app.gradient}`}
      >
        <Icon className="h-7 w-7 text-white drop-shadow" />
      </span>
      {size === "grid" && <span className="text-[11px] text-text-hi/85">{t(app.titleKey)}</span>}
    </motion.button>
  );
}

export function MobileHome({ onOpen }: MobileHomeProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-1 flex-col px-6 pb-6">
      {/* Widget de identidade, como um widget de tela inicial */}
      <div className="glass mt-4 rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <Image
            src={AVATAR_URL}
            alt="Guilherme Carvalho"
            width={48}
            height={48}
            className="rounded-full ring-2 ring-accent/40"
            priority
          />
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-text-hi">
              Guilherme Carvalho
            </h1>
            <p className="font-mono text-[10px] tracking-wide text-accent uppercase">
              {t("welcome.role")}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-text-lo">{t("welcome.tagline")}</p>
      </div>

      {/* Grade de apps */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {APPS.map((app) => (
          <AppIcon key={app.id} id={app.id} size="grid" onOpen={onOpen} />
        ))}
      </div>

      {/* Dock mobile */}
      <div className="glass mt-auto flex items-center justify-center gap-6 rounded-3xl px-6 py-3">
        <AppIcon id="projects" size="dock" onOpen={onOpen} />
        <AppIcon id="terminal" size="dock" onOpen={onOpen} />
        <AppIcon id="contact" size="dock" onOpen={onOpen} />
      </div>
    </div>
  );
}
