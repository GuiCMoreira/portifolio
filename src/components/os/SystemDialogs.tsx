"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Languages, Moon, Sun, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useOSStore } from "@/lib/store";
import { AVATAR_URL, GITHUB_URL } from "@/data/projects";
import { mainStack } from "@/data/career";
import { GitHubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

function DialogShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.15 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30"
      onClick={onClose}
      role="dialog"
      aria-label={title}
    >
      <motion.div
        initial={reduced ? {} : { opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? {} : { opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="glass-heavy relative w-80 rounded-2xl p-6 shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-md p-1 text-text-lo hover:bg-fill-1 hover:text-text-hi"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function AboutDialog({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();

  const specs = [
    { label: t("about.chip"), value: t("about.chipValue") },
    { label: t("about.memory"), value: mainStack.slice(0, 5).join(" · ") },
    { label: t("about.storage"), value: t("about.storageValue") },
    { label: t("about.graphics"), value: t("about.graphicsValue") },
  ];

  return (
    <DialogShell title={t("sysmenu.about")} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <Image
          src={AVATAR_URL}
          alt="Guilherme Carvalho"
          width={64}
          height={64}
          className="rounded-full ring-2 ring-accent/40"
        />
        <h2 className="mt-3 font-display text-xl font-semibold text-text-hi">
          Gui<span className="text-accent">OS</span>
        </h2>
        <p className="font-mono text-[11px] text-text-lo">{t("sysmenu.version")}</p>
      </div>

      <dl className="mt-5 space-y-2">
        {specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-[92px_1fr] gap-2 text-[12px]">
            <dt className="font-mono text-text-lo">{spec.label}</dt>
            <dd className="text-text-hi/90">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <a
        href={GITHUB_URL + "/portifolio"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-fill-2 py-2 text-[12px] font-medium text-text-hi transition-colors hover:bg-fill-3"
      >
        <GitHubIcon className="h-4 w-4" />
        {t("sysmenu.sourceCode")}
      </a>
    </DialogShell>
  );
}

function OptionRow({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-[12px] font-medium transition-colors",
        selected
          ? "border-accent/50 bg-accent/15 text-text-hi"
          : "border-line text-text-lo hover:bg-fill-1",
      )}
    >
      {children}
    </button>
  );
}

function SettingsDialog({ onClose }: { onClose: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();

  return (
    <DialogShell title={t("sysmenu.settings")} onClose={onClose}>
      <h2 className="text-[15px] font-bold text-text-hi">{t("settings.title")}</h2>

      <p className="mt-4 mb-1.5 font-mono text-[10px] tracking-widest text-text-lo uppercase">
        {t("settings.appearance")}
      </p>
      <div className="flex gap-2">
        <OptionRow selected={theme === "light"} onSelect={() => setTheme("light")}>
          <Sun className="h-3.5 w-3.5" /> {t("settings.light")}
        </OptionRow>
        <OptionRow selected={theme === "dark"} onSelect={() => setTheme("dark")}>
          <Moon className="h-3.5 w-3.5" /> {t("settings.dark")}
        </OptionRow>
      </div>

      <p className="mt-4 mb-1.5 font-mono text-[10px] tracking-widest text-text-lo uppercase">
        {t("settings.language")}
      </p>
      <div className="flex gap-2">
        <OptionRow selected={lang === "pt"} onSelect={() => setLang("pt")}>
          <Languages className="h-3.5 w-3.5" /> Português
        </OptionRow>
        <OptionRow selected={lang === "en"} onSelect={() => setLang("en")}>
          <Languages className="h-3.5 w-3.5" /> English
        </OptionRow>
      </div>
    </DialogShell>
  );
}

export function SystemDialogs() {
  const dialog = useOSStore((s) => s.systemDialog);
  const setSystemDialog = useOSStore((s) => s.setSystemDialog);
  const close = () => setSystemDialog(null);

  return (
    <AnimatePresence>
      {dialog === "about" && <AboutDialog key="about" onClose={close} />}
      {dialog === "settings" && <SettingsDialog key="settings" onClose={close} />}
    </AnimatePresence>
  );
}
