"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import type { AppDefinition } from "@/data/apps";
import { AppErrorBoundary } from "./AppErrorBoundary";
import { cn } from "@/lib/utils";

interface WindowProps {
  app: AppDefinition;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

// Folga entre o fundo do WindowLayer e o topo do dock (76px do viewport - 64px do layer).
const DOCK_GAP = 12;

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

  // Canais separados de transform:
  // - x/y pertencem SÓ ao drag (sem re-render, sem replay ao soltar);
  // - tx/ty pertencem SÓ à maximização (compensam a posição arrastada).
  // O alvo da maximização é medido do DOM — nunca dessincroniza do visual.
  const x = useMotionValue(win.pos.x);
  const y = useMotionValue(win.pos.y);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const w = useMotionValue(app.defaultSize.w);
  const h = useMotionValue(app.defaultSize.h);
  const radius = useMotionValue(12);

  const sectionRef = useRef<HTMLElement>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const layerRect = () => constraintsRef.current?.getBoundingClientRect();

    // No mount, só anima se já nascer maximizada (não acontece hoje).
    if (firstRun.current) {
      firstRun.current = false;
      if (!win.maximized) return;
    }

    const opts = reduced
      ? ({ duration: 0 } as const)
      : ({ duration: 0.32, ease: [0.32, 0.72, 0, 1] } as const);

    if (win.maximized) {
      const layer = layerRect();
      const el = sectionRef.current;
      if (!layer || !el) return;
      const r = el.getBoundingClientRect();
      // posição visual real relativa ao layer (independe de x/y internos)
      const visX = r.left - layer.left - tx.get();
      const visY = r.top - layer.top - ty.get();
      animate(tx, -visX, opts);
      animate(ty, -visY, opts);
      animate(w, layer.width, opts);
      animate(h, layer.height - DOCK_GAP, opts);
      animate(radius, 0, opts);

      // acompanha resize da janela do navegador enquanto maximizada
      const onResize = () => {
        const lr = layerRect();
        if (lr) {
          w.set(lr.width);
          h.set(lr.height - DOCK_GAP);
        }
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    animate(tx, 0, opts);
    animate(ty, 0, opts);
    animate(w, app.defaultSize.w, opts);
    animate(h, app.defaultSize.h, opts);
    animate(radius, 12, opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.maximized]);

  const isFocused = focused === app.id;
  const AppComponent = app.component;

  return (
    <motion.section
      ref={sectionRef}
      // drag sempre ativo e SEM dragConstraints por ref: alternar a prop ou
      // usar constraints re-medidas faz o motion auto-ajustar x/y quando a
      // janela muda de tamanho (bug do maximizar). O início do arrasto já é
      // bloqueado no header quando maximizada; os limites são aplicados no
      // fim do gesto, como no macOS (janela pode sair pelas laterais, mas a
      // barra de título nunca fica inalcançável).
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() => {
        const layer = constraintsRef.current?.getBoundingClientRect();
        if (!layer) return;
        const EDGE = 120; // mínimo da janela que permanece visível
        const cx = Math.min(Math.max(x.get(), -(w.get() - EDGE)), layer.width - EDGE);
        const cy = Math.min(Math.max(y.get(), 0), layer.height - 40);
        if (cx !== x.get()) animate(x, cx, { duration: 0.2, ease: "easeOut" });
        if (cy !== y.get()) animate(y, cy, { duration: 0.2, ease: "easeOut" });
        setPos(app.id, { x: Math.round(cx), y: Math.round(cy) });
      }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      animate={
        win.minimized
          ? reduced
            ? { opacity: 0, transitionEnd: { visibility: "hidden" } }
            : { opacity: 0, scale: 0.7, transitionEnd: { visibility: "hidden" } }
          : { opacity: 1, scale: 1, visibility: "visible" }
      }
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      transition={{ duration: reduced ? 0.1 : 0.28, ease: [0.32, 0.72, 0, 1] }}
      onPointerDown={() => focusApp(app.id)}
      className={cn(
        "window-surface pointer-events-auto absolute top-0 left-0 flex flex-col overflow-hidden shadow-2xl shadow-black/40",
        isFocused && "ring-1 ring-line-strong",
      )}
      style={{
        x,
        y,
        translateX: tx,
        translateY: ty,
        width: w,
        height: h,
        borderRadius: radius,
        maxWidth: "100%",
        zIndex: win.z,
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
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] text-black"
            aria-label={t("window.close")}
          >
            <span className="opacity-0 group-hover:opacity-100">✕</span>
          </button>
          <button
            type="button"
            onClick={() => minimizeApp(app.id)}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[8px] text-black"
            aria-label={t("window.minimize")}
          >
            <span className="opacity-0 group-hover:opacity-100">–</span>
          </button>
          <button
            type="button"
            onClick={() => toggleMaximize(app.id)}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] text-black"
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
