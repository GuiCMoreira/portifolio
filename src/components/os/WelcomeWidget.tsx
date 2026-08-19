"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { AVATAR_URL } from "@/data/projects";

export function WelcomeWidget() {
  const { t } = useI18n();
  const openApp = useOSStore((s) => s.openApp);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      className="glass absolute top-[22%] left-[8%] z-10 max-w-md rounded-3xl p-8"
      aria-label={t("welcome.hello") + " Guilherme Carvalho"}
    >
      <div className="flex items-center gap-4">
        <Image
          src={AVATAR_URL}
          alt="Guilherme Carvalho"
          width={56}
          height={56}
          className="rounded-full ring-2 ring-accent/40"
          priority
        />
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
            {t("welcome.hello")}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text-hi">
            Guilherme Carvalho
          </h2>
        </div>
      </div>

      <p className="mt-4 font-mono text-[12px] tracking-wide text-text-lo uppercase">
        {t("welcome.role")}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-text-hi/90">{t("welcome.tagline")}</p>
      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-text-lo">
        <MapPin className="h-3.5 w-3.5" />
        {t("welcome.location")}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => openApp("projects")}
          className="rounded-xl bg-accent px-5 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          {t("welcome.cta")}
        </button>
        <span className="text-[12px] text-text-lo">
          {t("welcome.orPress")} <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">⌘K</kbd>
        </span>
      </div>
    </motion.section>
  );
}
