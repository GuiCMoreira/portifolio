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
    <div ref={constraintsRef} className="absolute inset-x-0 top-8 bottom-16 z-20">
      <AnimatePresence>
        {APPS.filter((app) => windows[app.id].open).map((app) => (
          <Window key={app.id} app={app} constraintsRef={constraintsRef} />
        ))}
      </AnimatePresence>
    </div>
  );
}
