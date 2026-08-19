"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import type { AppId } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { getApp } from "@/data/apps";
import { AppErrorBoundary } from "@/components/os/AppErrorBoundary";

interface MobileAppViewProps {
  appId: AppId;
  onClose: () => void;
}

export function MobileAppView({ appId, onClose }: MobileAppViewProps) {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const app = getApp(appId);
  const AppComponent = app.component;

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 30 }}
      transition={{ duration: reduced ? 0.1 : 0.25, ease: [0.32, 0.72, 0, 1] }}
      className="absolute inset-0 z-30 flex flex-col bg-ink-raised"
    >
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-white/5 px-3">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-0.5 rounded-lg py-1 pr-2 text-[13px] text-accent"
        >
          <ChevronLeft className="h-5 w-5" />
          {t("mobile.back")}
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-text-hi">
          {t(app.titleKey)}
        </span>
      </header>

      <div className="os-scroll min-h-0 flex-1 overflow-y-auto">
        <AppErrorBoundary crashedLabel={t("window.crashed")} restartLabel={t("window.restart")}>
          <AppComponent />
        </AppErrorBoundary>
      </div>
    </motion.div>
  );
}
