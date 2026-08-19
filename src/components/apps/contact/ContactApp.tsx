"use client";

import { AtSign, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/projects";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function ContactApp() {
  const { t } = useI18n();

  const channels = [
    {
      id: "github",
      icon: GitHubIcon,
      name: "GitHub",
      handle: "@GuiCMoreira",
      href: GITHUB_URL,
      action: t("contact.openLink"),
      gradient: "from-zinc-600 to-zinc-800",
    },
    {
      id: "linkedin",
      icon: LinkedInIcon,
      name: "LinkedIn",
      handle: "guilherme-de-carvalho-moreira",
      href: LINKEDIN_URL,
      action: t("contact.openLink"),
      gradient: "from-sky-600 to-blue-800",
    },
    {
      id: "email",
      icon: AtSign,
      name: t("contact.email"),
      handle: EMAIL,
      href: `mailto:${EMAIL}`,
      action: t("contact.sendEmail"),
      gradient: "from-rose-500 to-orange-600",
    },
  ];

  return (
    <div className="flex h-full flex-col p-6">
      <h2 className="font-display text-xl font-semibold tracking-tight text-text-hi">
        {t("contact.title")}
      </h2>
      <p className="mt-1 text-[13px] text-text-lo">{t("contact.subtitle")}</p>

      <div className="mt-6 space-y-3">
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.id}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:border-white/15 hover:bg-white/[0.06]"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ch.gradient}`}
              >
                <Icon className="h-5 w-5 text-white" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold text-text-hi">{ch.name}</span>
                <span className="block truncate font-mono text-[12px] text-text-lo">
                  {ch.handle}
                </span>
              </span>
              <span className="flex items-center gap-1 text-[12px] text-text-lo transition-colors group-hover:text-accent">
                {ch.action}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
