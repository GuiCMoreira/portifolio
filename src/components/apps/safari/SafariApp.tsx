"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe,
  House,
  Lock,
  RotateCw,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { projects, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/data/projects";
import {
  GitHubTileIcon,
  InstagramTileIcon,
  LinkedInTileIcon,
  FinderIcon,
} from "@/components/ui/app-icons";
import { cn } from "@/lib/utils";
import { displayUrl, resolveInput, samePage, type SafariPage } from "./pages";
import { GitHubPage } from "./GitHubPage";
import { GitHubRepoPage } from "./GitHubRepoPage";
import { SearchPage } from "./SearchPage";

const START: SafariPage = { kind: "start" };

function StartPage({ onNavigate }: { onNavigate: (input: string) => void }) {
  const { t, tx } = useI18n();
  const featured = projects.filter((p) => p.featured && p.github);

  const favorites = [
    { label: "GitHub", icon: <GitHubTileIcon className="h-14 w-14" />, go: () => onNavigate(GITHUB_URL) },
    { label: "LinkedIn", icon: <LinkedInTileIcon className="h-14 w-14" />, go: () => onNavigate(LINKEDIN_URL) },
    { label: "Instagram", icon: <InstagramTileIcon className="h-14 w-14" />, go: () => onNavigate(INSTAGRAM_URL) },
  ];

  const recentSearches = [
    { pt: "preciso de um desenvolvedor urgente", en: "need a developer urgently" },
    { pt: "como contratar um dev fullstack", en: "how to hire a fullstack dev" },
    { pt: "dev que entrega no prazo existe?", en: "does a dev who ships on time exist?" },
    { pt: "quem fez esse site?", en: "who made this website?" },
  ];

  return (
    <div className="p-6">
      <h3 className="mb-3 font-mono text-[11px] tracking-widest text-text-lo uppercase">
        {t("safari.favorites")}
      </h3>
      <div className="flex gap-6">
        {favorites.map((fav) => (
          <button
            key={fav.label}
            type="button"
            onClick={fav.go}
            className="flex flex-col items-center gap-1.5"
          >
            {fav.icon}
            <span className="text-[11px] text-text-hi/85">{fav.label}</span>
          </button>
        ))}
      </div>

      {/* Pesquisas "recentes" — a isca de humor do Guigle */}
      <h3 className="mt-8 mb-2 font-mono text-[11px] tracking-widest text-text-lo uppercase">
        {t("safari.recentSearches")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((s) => {
          const q = tx(s);
          return (
            <button
              key={s.pt}
              type="button"
              onClick={() => onNavigate(q)}
              className="flex items-center gap-1.5 rounded-full border border-line bg-inset px-3 py-1.5 text-[12px] text-text-hi/85 transition-colors hover:border-line-strong hover:bg-fill-1"
            >
              <Clock3 className="h-3 w-3 text-text-lo" />
              {q}
            </button>
          );
        })}
      </div>

      <h3 className="mt-8 mb-1 font-mono text-[11px] tracking-widest text-text-lo uppercase">
        {t("safari.myProjects")}
      </h3>
      <p className="mb-3 text-[11px] text-text-lo/70">{t("safari.myProjectsHint")}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {featured.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onNavigate(p.github!)}
            className="flex items-center gap-3 rounded-xl border border-line bg-inset p-3 text-left transition-colors hover:border-line-strong hover:bg-fill-1"
          >
            <FinderIcon className="h-9 w-9 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate font-mono text-[13px] font-semibold text-text-hi">
                {p.name}
              </span>
              <span className="block truncate text-[11px] text-text-lo">{tx(p.tagline)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BlockedPage({ url, host }: { url: string; host: string }) {
  const { t } = useI18n();
  // "instagram.com" → "Instagram"
  const siteName = host.split(".")[0].replace(/^./, (c) => c.toUpperCase());
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-fill-1">
        <Globe className="h-7 w-7 text-text-lo" />
      </span>
      <p className="max-w-80 text-[14px] font-semibold text-text-hi">
        {t("safari.blockedTitle1")} {siteName} {t("safari.blockedTitle2")}
      </p>
      <p className="max-w-80 text-[12px] text-text-lo">{t("safari.blockedHint")}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        <ExternalLink className="h-4 w-4" />
        {t("safari.openYourBrowser")}
      </a>
    </div>
  );
}

export function SafariApp() {
  const { t } = useI18n();
  // Pilha + índice num estado único: atualização atômica e idempotente
  // (o StrictMode roda effects 2x em dev — estados separados dessincronizavam).
  const [nav, setNav] = useState<{ stack: SafariPage[]; index: number }>({
    stack: [START],
    index: 0,
  });
  const [address, setAddress] = useState("");
  const [frameKey, setFrameKey] = useState(0);

  const page = nav.stack[nav.index];

  const navigateTo = (next: SafariPage) => {
    setNav((prev) => {
      // Já estamos nessa página? Não empilha de novo (a casinha na home,
      // por exemplo, não pode apagar o histórico de "avançar").
      if (samePage(next, prev.stack[prev.index])) return prev;
      const stack = [...prev.stack.slice(0, prev.index + 1), next];
      return { stack, index: stack.length - 1 };
    });
    setAddress(displayUrl(next));
  };

  const navigateInput = (input: string) => navigateTo(resolveInput(input));

  // Deep-link: dock/palette podem abrir o Safari já numa página (payload).
  const payload = useOSStore((s) => s.windows.safari.payload);
  const clearPayload = useOSStore((s) => s.clearPayload);
  useEffect(() => {
    if (!payload) return;
    // Navegação única disparada por deep-link — idempotente via samePage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    navigateTo(resolveInput(payload));
    clearPayload("safari");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const go = (delta: number) => {
    const next = Math.min(Math.max(nav.index + delta, 0), nav.stack.length - 1);
    setNav((prev) => ({ ...prev, index: Math.min(next, prev.stack.length - 1) }));
    setAddress(displayUrl(nav.stack[next]));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar do Safari */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-line bg-inset px-3 py-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={nav.index === 0}
          className="rounded-md p-1 text-text-hi/80 hover:bg-fill-1 disabled:opacity-30"
          aria-label={t("safari.back")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={nav.index >= nav.stack.length - 1}
          className="rounded-md p-1 text-text-hi/80 hover:bg-fill-1 disabled:opacity-30"
          aria-label={t("safari.forward")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => navigateTo(START)}
          className="rounded-md p-1 text-text-hi/80 hover:bg-fill-1"
          aria-label={t("safari.start")}
        >
          <House className="h-4 w-4" />
        </button>

        <div className="mx-1 flex h-8 flex-1 items-center gap-1.5 rounded-lg bg-fill-1 px-3">
          {page.kind !== "start" && <Lock className="h-3 w-3 shrink-0 text-text-lo" />}
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigateInput(address);
            }}
            placeholder={t("safari.addressPlaceholder")}
            className="w-full bg-transparent text-center text-[12px] text-text-hi outline-none placeholder:text-text-lo/60"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label={t("safari.addressPlaceholder")}
          />
        </div>

        <button
          type="button"
          onClick={() => setFrameKey((k) => k + 1)}
          className="rounded-md p-1 text-text-hi/80 hover:bg-fill-1"
          aria-label={t("safari.reload")}
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className={cn("os-scroll min-h-0 flex-1", page.kind !== "web" && "overflow-y-auto")}>
        {page.kind === "start" && <StartPage onNavigate={navigateInput} />}
        {page.kind === "github" && <GitHubPage key={frameKey} />}
        {page.kind === "github-repo" && <GitHubRepoPage key={`${page.repo}-${frameKey}`} name={page.repo} />}
        {page.kind === "search" && (
          <SearchPage key={`${page.query}-${frameKey}`} query={page.query} onNavigate={navigateInput} />
        )}
        {page.kind === "blocked" && <BlockedPage url={page.url} host={page.host} />}
        {page.kind === "web" && (
          <div className="flex h-full flex-col">
            <p className="shrink-0 border-b border-line bg-inset px-3 py-1 text-center text-[10px] text-text-lo/80">
              {t("safari.iframeHint")}
            </p>
            <iframe
              key={frameKey}
              src={page.url}
              title={displayUrl(page)}
              className="min-h-0 w-full flex-1 border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
