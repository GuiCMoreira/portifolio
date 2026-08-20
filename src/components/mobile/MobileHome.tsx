"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { AppId } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { APPS, getApp } from "@/data/apps";
import { AVATAR_URL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/data/projects";
import {
  GitHubTileIcon,
  InstagramTileIcon,
  LinkedInTileIcon,
} from "@/components/ui/app-icons";

interface MobileHomeProps {
  onOpen: (id: AppId, originLayoutId: string) => void;
}

/** id compartilhado entre o ícone e a MobileAppView para o morph de abertura */
export function appOriginLayoutId(origin: "grid" | "dock", id: AppId) {
  return `mob-${origin}-${id}`;
}

function AppIcon({
  id,
  size,
  onOpen,
}: {
  id: AppId;
  size: "grid" | "dock";
  onOpen: (id: AppId, originLayoutId: string) => void;
}) {
  const { t } = useI18n();
  const app = getApp(id);
  const Icon = app.icon;
  const tile = size === "grid" ? "h-16 w-16" : "h-14 w-14";
  const layoutId = appOriginLayoutId(size, id);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(id, layoutId)}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-1.5"
      aria-label={t(app.titleKey)}
    >
      <motion.span
        layoutId={layoutId}
        style={{ borderRadius: 16 }}
        className={`block overflow-hidden ${tile}`}
      >
        <Icon className="h-full w-full drop-shadow-lg" />
      </motion.span>
      {size === "grid" && <span className="text-[11px] text-text-hi/85">{t(app.titleKey)}</span>}
    </motion.button>
  );
}

const SOCIALS = [
  { id: "github", label: "GitHub", href: GITHUB_URL, Icon: GitHubTileIcon },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedInTileIcon },
  { id: "instagram", label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramTileIcon },
];

function SocialIcon({ label, href, Icon }: (typeof SOCIALS)[number]) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-1.5"
      aria-label={label}
    >
      <Icon className="h-16 w-16 drop-shadow-lg" />
      <span className="text-[11px] text-text-hi/85">{label}</span>
    </motion.a>
  );
}

function WidgetDate() {
  const { lang } = useI18n();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Hidrata no client para não divergir do SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
  }, []);

  if (!now) return null;

  const formatted = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  return (
    <p className="font-mono text-[10px] tracking-wide text-text-lo uppercase first-letter:uppercase">
      {formatted}
    </p>
  );
}

export function MobileHome({ onOpen }: MobileHomeProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-1 flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
      {/* Widget de identidade, como um widget de tela inicial */}
      <div className="glass mt-4 rounded-3xl p-5">
        <WidgetDate />
        <div className="mt-2 flex items-center gap-3">
          <Image
            src={AVATAR_URL}
            alt="Guilherme Carvalho"
            width={48}
            height={48}
            className="rounded-full ring-2 ring-accent/40"
            priority
          />
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-text-hi">
              Guilherme Carvalho
            </h1>
            <p className="font-mono text-[10px] tracking-wide text-accent uppercase">
              {t("welcome.role")}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-text-lo">{t("welcome.tagline")}</p>
      </div>

      {/* Grade de apps: sistema + sociais */}
      <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-6">
        {APPS.map((app) => (
          <AppIcon key={app.id} id={app.id} size="grid" onOpen={onOpen} />
        ))}
        {SOCIALS.map((social) => (
          <SocialIcon key={social.id} {...social} />
        ))}
      </div>

      {/* Dock mobile com os 4 apps do sistema */}
      <div className="glass mt-auto flex items-center justify-around rounded-3xl px-4 py-3">
        {APPS.map((app) => (
          <AppIcon key={app.id} id={app.id} size="dock" onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
