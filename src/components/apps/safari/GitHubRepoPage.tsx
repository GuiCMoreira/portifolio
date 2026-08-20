"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, GitFork, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { storageGet, storageSet } from "@/lib/safe-storage";

interface RepoInfo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

type RepoState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; repo: RepoInfo; readme: string | null };

function useRepo(name: string): RepoState {
  const [state, setState] = useState<RepoState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const apply = (s: RepoState) => {
      if (!cancelled) setState(s);
    };
    const cacheKey = `guios.gh-repo.${name}`;
    const cached = storageGet("session", cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { repo: RepoInfo; readme: string | null };
        // tempo mínimo de skeleton, como um navegador carregando de verdade
        const id = setTimeout(() => apply({ status: "ok", ...parsed }), 700);
        return () => {
          cancelled = true;
          clearTimeout(id);
        };
      } catch {
        // cache corrompido — segue para o fetch
      }
    }

    Promise.resolve().then(() => apply({ status: "loading" }));
    Promise.all([
      fetch(`https://api.github.com/repos/GuiCMoreira/${name}`).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch(`https://api.github.com/repos/GuiCMoreira/${name}/readme`, {
        headers: { Accept: "application/vnd.github.raw+json" },
      }).then((r) => (r.ok ? r.text() : null)),
    ])
      .then(([repo, readme]) => {
        if (!repo) {
          apply({ status: "error" });
          return;
        }
        const readmeTrimmed = readme ? readme.slice(0, 4000) : null;
        storageSet("session", cacheKey, JSON.stringify({ repo, readme: readmeTrimmed }));
        apply({ status: "ok", repo, readme: readmeTrimmed });
      })
      .catch(() => apply({ status: "error" }));

    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}

export function GitHubRepoPage({ name }: { name: string }) {
  const { t, lang } = useI18n();
  const state = useRepo(name);

  if (state.status === "loading") {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-5 w-64 rounded bg-fill-2" />
        <div className="h-3 w-80 rounded bg-fill-1" />
        <div className="h-48 rounded-xl bg-fill-1" />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-[13px] text-text-lo">{t("safari.ghError")}</p>
        <a
          href={`https://github.com/GuiCMoreira/${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white"
        >
          <ExternalLink className="h-4 w-4" />
          {t("safari.openYourBrowser")}
        </a>
      </div>
    );
  }

  const { repo, readme } = state;
  const updated = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(repo.updated_at));

  return (
    <div className="p-6">
      <header>
        <p className="font-mono text-[15px] font-semibold">
          <span className="text-text-lo">GuiCMoreira /</span>{" "}
          <span className="text-accent">{repo.name}</span>
        </p>
        {repo.description && <p className="mt-1 text-[13px] text-text-lo">{repo.description}</p>}
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-text-lo">
          {repo.language && <span>{repo.language}</span>}
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" /> {repo.forks_count}
          </span>
          <span>
            {t("safari.repoUpdated")} {updated}
          </span>
        </p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-fill-2 px-3 py-1.5 text-[12px] font-medium text-text-hi hover:bg-fill-3"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t("safari.openYourBrowser")}
        </a>
      </header>

      {readme && (
        <section className="mt-5">
          <h3 className="mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-text-lo uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            README.md
          </h3>
          <pre className="os-scroll overflow-x-auto rounded-xl border border-line bg-inset p-4 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap text-text-hi/85">
            {readme}
          </pre>
        </section>
      )}
    </div>
  );
}
