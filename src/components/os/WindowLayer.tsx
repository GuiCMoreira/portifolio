"use client";

import { useRef } from "react";
import { AnimatePresence } from "motion/react";
import { useOSStore } from "@/lib/store";
import { APPS } from "@/data/apps";
import { Window } from "./Window";

export function WindowLayer() {
  const windows = useOSStore((s) => s.windows);
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    // pointer-events-none: a camada cobre a tela toda e não pode engolir cliques
    // do desktop (ex.: CTA do welcome); cada janela reativa seus próprios eventos.
    <div ref={constraintsRef} className="pointer-events-none absolute inset-x-0 top-8 bottom-16 z-20">
      <AnimatePresence>
        {APPS.filter((app) => windows[app.id].open).map((app) => (
          <Window key={app.id} app={app} constraintsRef={constraintsRef} />
        ))}
      </AnimatePresence>
    </div>
  );
}
