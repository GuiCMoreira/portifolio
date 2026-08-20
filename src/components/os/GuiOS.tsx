"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useOSStore } from "@/lib/store";
import { useIsMobile } from "@/lib/hooks";
import { storageGet, storageSet } from "@/lib/safe-storage";
import { BootScreen } from "./BootScreen";
import { Desktop } from "./Desktop";
import { PowerOverlay } from "./PowerOverlay";
import { SystemDialogs } from "./SystemDialogs";
import { ContactNotification } from "./DesktopExtras";
import { MobileShell } from "@/components/mobile/MobileShell";

const BOOT_FLAG = "guios.booted";

export function GuiOS() {
  const booted = useOSStore((s) => s.booted);
  const setBooted = useOSStore((s) => s.setBooted);
  // null = ainda não sabemos (SSR); evita flash do boot em quem já bootou na sessão.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (storageGet("session", BOOT_FLAG) === "1") {
      setBooted(true);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [setBooted]);

  const finishBoot = () => {
    storageSet("session", BOOT_FLAG, "1");
    setBooted(true);
  };

  const isMobile = useIsMobile();

  if (!ready) return <div className="h-dvh w-full bg-ink" aria-hidden />;

  return (
    <>
      {isMobile ? <MobileShell /> : <Desktop />}
      <SystemDialogs />
      <ContactNotification />
      <AnimatePresence>{!booted && <BootScreen onDone={finishBoot} />}</AnimatePresence>
      <PowerOverlay />
    </>
  );
}
