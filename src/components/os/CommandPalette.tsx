"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Languages, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { APPS } from "@/data/apps";
import { projects, GITHUB_URL, LINKEDIN_URL } from "@/data/projects";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function CommandPalette() {
  const { t, lang, setLang } = useI18n();
  const open = useOSStore((s) => s.paletteOpen);
  const setOpen = useOSStore((s) => s.setPaletteOpen);
  const openApp = useOSStore((s) => s.openApp);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!useOSStore.getState().paletteOpen);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const run = (action: () => void) => {
    action();
    setOpen(false);
  };

  // Popup blocker pode devolver null — cai para navegação direta.
  const openExternal = (url: string) => {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = url;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 px-4 pt-[18vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={reduced ? {} : { opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="glass-heavy w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label={t("menubar.palette")} loop>
              <div className="flex items-center gap-2 border-b border-line px-4">
                <Search className="h-4 w-4 shrink-0 text-text-lo" />
                <Command.Input
                  placeholder={t("palette.placeholder")}
                  autoFocus
                  className="h-12 w-full bg-transparent text-[14px] text-text-hi placeholder:text-text-lo/60 focus:outline-none"
                />
                <kbd className="rounded bg-fill-2 px-1.5 py-0.5 font-mono text-[10px] text-text-lo">
                  esc
                </kbd>
              </div>

              <Command.List className="os-scroll max-h-80 overflow-y-auto p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-text-lo/70 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-item]]:flex [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-3 [&_[cmdk-item]]:rounded-lg [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2 [&_[cmdk-item]]:text-[13px] [&_[cmdk-item]]:text-text-hi/90 [&_[cmdk-item][data-selected=true]]:bg-accent/20 [&_[cmdk-item][data-selected=true]]:text-text-hi">
                <Command.Empty className="p-4 text-center text-[13px] text-text-lo">
                  {t("palette.empty")}
                </Command.Empty>

                <Command.Group heading={t("palette.apps")}>
                  {APPS.map((app) => {
                    const Icon = app.icon;
                    return (
                      <Command.Item key={app.id} onSelect={() => run(() => openApp(app.id))}>
                        <Icon className="h-6 w-6" />
                        {t(app.titleKey)}
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group heading={t("palette.projects")}>
                  {projects.map((p) => (
                    <Command.Item key={p.id} onSelect={() => run(() => openApp("projects", p.id))}>
                      <span className="font-mono text-[11px] text-accent">▸</span>
                      {p.name}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t("palette.system")}>
                  <Command.Item onSelect={() => run(() => setLang(lang === "pt" ? "en" : "pt"))}>
                    <Languages className="h-4 w-4 text-text-lo" />
                    {t("palette.switchLang")}
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => openExternal(GITHUB_URL))}>
                    <GitHubIcon className="h-4 w-4 text-text-lo" />
                    {t("palette.openGithub")}
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => openExternal(LINKEDIN_URL))}>
                    <LinkedInIcon className="h-4 w-4 text-text-lo" />
                    {t("palette.openLinkedin")}
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
