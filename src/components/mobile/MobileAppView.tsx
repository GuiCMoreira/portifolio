"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import type { AppId } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { getApp } from "@/data/apps";
import { AppErrorBoundary } from "@/components/os/AppErrorBoundary";

interface MobileAppViewProps {
  appId: AppId;
  /** layoutId do ícone de origem — presente quando o app foi aberto por toque */
  originLayoutId?: string;
  onClose: () => void;
}

export function MobileAppView({ appId, originLayoutId, onClose }: MobileAppViewProps) {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const app = getApp(appId);
  const AppComponent = app.component;

  // Com origem conhecida (e sem reduced-motion), o app cresce a partir do
  // ícone via shared layout animation; sem origem (ex.: aberto pelo terminal),
  // cai no zoom padrão.
  const shared = !reduced && !!originLayoutId;

  return (
    <motion.div
      layoutId={shared ? originLayoutId : undefined}
      initial={shared ? undefined : reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
      animate={shared ? undefined : { opacity: 1, scale: 1, y: 0 }}
      exit={shared ? undefined : reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 30 }}
      transition={
        shared
          ? { type: "spring", stiffness: 320, damping: 32 }
          : { duration: reduced ? 0.1 : 0.25, ease: [0.32, 0.72, 0, 1] }
      }
      style={{ borderRadius: shared ? 0 : undefined }}
      className="absolute inset-0 z-30 flex flex-col overflow-hidden bg-(--window-solid)"
    >
      {/* Conteúdo entra num fade curto para o morph não esticar o layout */}
      <motion.div
        initial={{ opacity: shared ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, delay: shared ? 0.1 : 0 }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-3">
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

        <div className="os-scroll min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <AppErrorBoundary crashedLabel={t("window.crashed")} restartLabel={t("window.restart")}>
            <AppComponent />
          </AppErrorBoundary>
        </div>
      </motion.div>
    </motion.div>
  );
}
