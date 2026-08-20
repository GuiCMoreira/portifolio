"use client";

import { useLayoutEffect, useState } from "react";
import { motion, useDragControls, useMotionValue, useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import type { AppDefinition } from "@/data/apps";
import { AppErrorBoundary } from "./AppErrorBoundary";
import { cn } from "@/lib/utils";

interface WindowProps {
  app: AppDefinition;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

export function Window({ app, constraintsRef }: WindowProps) {
  const { t } = useI18n();
  const win = useOSStore((s) => s.windows[app.id]);
  const focused = useOSStore((s) => s.focused);
  const closeApp = useOSStore((s) => s.closeApp);
  const minimizeApp = useOSStore((s) => s.minimizeApp);
  const toggleMaximize = useOSStore((s) => s.toggleMaximize);
  const focusApp = useOSStore((s) => s.focusApp);
  const setPos = useOSStore((s) => s.setPos);
  const clearPayload = useOSStore((s) => s.clearPayload);

  const dragControls = useDragControls();
  const reduced = useReducedMotion();

  // O drag acumula em transform (x/y). Ao soltar, dobramos o deslocamento em
  // left/top (basePos + store) e zeramos o transform ANTES do paint — assim
  // maximizar nunca herda transform sujo e a posição sobrevive a fechar/reabrir.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [basePos, setBasePos] = useState(win.pos);

  useLayoutEffect(() => {
    x.set(0);
    y.set(0);
  }, [basePos, x, y]);

  const commitDrag = () => {
    if (win.maximized) return;
    const next = {
      x: Math.max(0, Math.round(basePos.x + x.get())),
      y: Math.max(0, Math.round(basePos.y + y.get())),
    };
    setBasePos(next);
    setPos(app.id, next);
  };

  const isFocused = focused === app.id;
  const AppComponent = app.component;

  return (
    <motion.section
      layout
      drag={!win.maximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={constraintsRef}
      onDragEnd={commitDrag}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, translateY: 24 }}
      animate={
        win.minimized
          ? reduced
            ? { opacity: 0, transitionEnd: { visibility: "hidden" } }
            : { opacity: 0, scale: 0.7, translateY: 280, transitionEnd: { visibility: "hidden" } }
          : { opacity: 1, scale: 1, translateY: 0, visibility: "visible" }
      }
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, translateY: 16 }}
      transition={{ duration: reduced ? 0.1 : 0.28, ease: [0.32, 0.72, 0, 1] }}
      onPointerDown={() => focusApp(app.id)}
      className={cn(
        "window-surface absolute flex flex-col overflow-hidden rounded-xl shadow-2xl shadow-black/40",
        // Maximizada = tela inteira, como fullscreen do macOS (cobre menu bar e dock).
        // fixed escapa do WindowLayer (que desconta menu bar/dock do espaço útil).
        win.maximized && "!fixed !inset-0 !h-auto !w-auto !transform-none !rounded-none",
        isFocused && "ring-1 ring-line-strong",
      )}
      style={{
        x,
        y,
        left: basePos.x,
        top: basePos.y,
        width: app.defaultSize.w,
        height: app.defaultSize.h,
        maxWidth: win.maximized ? undefined : "calc(100vw - 24px)",
        maxHeight: win.maximized ? undefined : "calc(100dvh - 7rem)",
        zIndex: win.maximized ? 60 : win.z,
      }}
      aria-label={t(app.titleKey)}
    >
      {/* Barra de título — alça de drag */}
      <header
        className="group flex h-9 shrink-0 cursor-grab items-center gap-2 border-b border-line px-3 select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          if (!win.maximized) dragControls.start(e);
        }}
        onDoubleClick={() => toggleMaximize(app.id)}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => closeApp(app.id)}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] text-black/60"
            aria-label={t("window.close")}
          >
            <span className="opacity-0 group-hover:opacity-100">✕</span>
          </button>
          <button
            type="button"
            onClick={() => minimizeApp(app.id)}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[8px] text-black/60"
            aria-label={t("window.minimize")}
          >
            <span className="opacity-0 group-hover:opacity-100">–</span>
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize(app.id)}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] text-black/60"
            aria-label={t("window.maximize")}
          >
            <span className="opacity-0 group-hover:opacity-100">⤢</span>
          </button>
        </div>

        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-text-lo">
          {t(app.titleKey)}
        </span>
      </header>

      {/* Conteúdo do app */}
      <div className="os-scroll min-h-0 flex-1 overflow-y-auto">
        <AppErrorBoundary
          crashedLabel={t("window.crashed")}
          restartLabel={t("window.restart")}
          onReset={() => clearPayload(app.id)}
        >
          <AppComponent />
        </AppErrorBoundary>
      </div>
    </motion.section>
  );
}
