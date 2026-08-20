"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Power } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { storageSet } from "@/lib/safe-storage";

export function PowerOverlay() {
  const { t } = useI18n();
  const powerState = useOSStore((s) => s.powerState);
  const setPowerState = useOSStore((s) => s.setPowerState);
  const setBooted = useOSStore((s) => s.setBooted);
  const reduced = useReducedMotion();

  // Repouso: qualquer interação acorda.
  useEffect(() => {
    if (powerState !== "sleep") return;
    const wake = () => setPowerState("on");
    // pequeno delay para o clique que ativou o repouso não acordar na hora
    const id = setTimeout(() => {
      window.addEventListener("pointerdown", wake);
      window.addEventListener("keydown", wake);
    }, 400);
    return () => {
      clearTimeout(id);
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [powerState, setPowerState]);

  const powerOn = () => {
    // religa passando pelo boot
    storageSet("session", "guios.booted", "0");
    setBooted(false);
    setPowerState("on");
  };

  return (
    <AnimatePresence>
      {powerState === "sleep" && (
        <motion.div
          key="sleep"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // adormecer é lento e cinematográfico; acordar é imediato, como num Mac
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: reduced ? 0.2 : 1.4, ease: "easeIn" }}
          className="fixed inset-0 z-[110] cursor-pointer bg-black"
          aria-label={t("sysmenu.sleeping")}
        />
      )}

      {powerState === "off" && (
        <motion.div
          key="off"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.8 }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-6 bg-black"
        >
          <p className="font-mono text-[12px] tracking-widest text-neutral-600 uppercase">
            {t("sysmenu.poweredOff")}
          </p>
          <button
            type="button"
            onClick={powerOn}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all hover:scale-105 hover:border-neutral-400 hover:text-white"
            aria-label={t("sysmenu.powerOn")}
          >
            <Power className="h-7 w-7" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
