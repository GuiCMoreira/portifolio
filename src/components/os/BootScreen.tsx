"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

const BOOT_MS = 2300;
const MSG_KEYS = ["boot.msg1", "boot.msg2", "boot.msg3", "boot.msg4"];

interface BootScreenProps {
  onDone: () => void;
}

export function BootScreen({ onDone }: BootScreenProps) {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const doneRef = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced.current ? 400 : BOOT_MS;
    const started = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(1, (now - started) / total);
      setProgress(pct);
      setMsgIndex(Math.min(MSG_KEYS.length - 1, Math.floor(pct * MSG_KEYS.length)));
      if (pct >= 1) {
        finish();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      cancelAnimationFrame(raf);
      onDone();
    };

    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="status"
      aria-label="GuiOS boot"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="text-center font-mono">
          <div className="text-[11px] tracking-[0.5em] text-text-lo uppercase">v1.0</div>
          <h1 className="mt-2 font-display text-6xl font-semibold tracking-tight text-text-hi">
            Gui<span className="text-accent">OS</span>
            <span className="blink text-accent">_</span>
          </h1>
        </div>

        <div className="w-64">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-100 ease-linear"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="mt-3 min-h-4 text-center font-mono text-[11px] text-text-lo">
            {t(MSG_KEYS[msgIndex])}
          </p>
        </div>
      </div>

      <p className="absolute bottom-8 font-mono text-[10px] tracking-widest text-text-lo/60 uppercase">
        {t("boot.skip")}
      </p>
    </motion.div>
  );
}
