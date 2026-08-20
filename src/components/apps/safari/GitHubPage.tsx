"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookMarked, ExternalLink, Star, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { GITHUB_URL } from "@/data/projects";
import { storageGet, storageSet } from "@/lib/safe-storage";

interface GhUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GhRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

type GhState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; user: GhUser; repos: GhRepo[] };

const CACHE_KEY = "guios.github-profile";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Java: "#b07219",
  "C#": "#178600",
};

function useGitHubProfile(): GhState {
  const [state, setState] = useState<GhState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const apply = (s: GhState) => {
      if (!cancelled) setState(s);
    };

    const cached = storageGet("session", CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { user: GhUser; repos: GhRepo[] };
        // tempo mínimo de skeleton: com cache a página abria num piscar,
        // sem parecer um navegador carregando de verdade
        const id = setTimeout(() => apply({ status: "ok", ...parsed }), 700);
        return () => {
          cancelled = true;
          clearTimeout(id);
        };
      } catch {
        // cache corrompido — segue para o fetch
      }
    }

    Promise.all([
      fetch("https://api.github.com/users/GuiCMoreira").then((r) => (r.ok ? r.json() : null)),
      fetch("https://api.github.com/users/GuiCMoreira/repos?sort=updated&per_page=6").then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([user, repos]) => {
        if (!user || !Array.isArray(repos)) {
          apply({ status: "error" });
          return;
        }
        storageSet("session", CACHE_KEY, JSON.stringify({ user, repos }));
        apply({ status: "ok", user, repos });
      })
      .catch(() => apply({ status: "error" }));

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function GitHubPage() {
  const { t } = useI18n();
  const gh = useGitHubProfile();

  if (gh.status === "loading") {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-fill-2" />
          <div className="space-y-2">
            <div className="h-4 w-44 rounded bg-fill-2" />
            <div className="h-3 w-64 rounded bg-fill-1" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-20 rounded-xl bg-fill-1" />
          ))}
        </div>
      </div>
    );
  }

  if (gh.status === "error") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-[13px] text-text-lo">{t("safari.ghError")}</p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white"
        >
          <ExternalLink className="h-4 w-4" />
          {t("safari.ghOpen")}
        </a>
      </div>
    );
  }

  const { user, repos } = gh;

  return (
    <div className="p-6">
      <header className="flex items-start gap-4">
        <Image
          src={user.avatar_url}
          alt={user.name}
          width={64}
          height={64}
          className="rounded-full ring-1 ring-line"
        />
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-text-hi">{user.name}</h2>
          <p className="font-mono text-[12px] text-text-lo">@{user.login}</p>
          {user.bio && <p className="mt-1 text-[13px] text-text-lo">{user.bio}</p>}
          <p className="mt-2 flex items-center gap-1.5 text-[12px] text-text-lo">
            <Users className="h-3.5 w-3.5" />
            <b className="text-text-hi">{user.followers}</b> {t("safari.ghFollowers")} ·{" "}
            <b className="text-text-hi">{user.following}</b> {t("safari.ghFollowing")} ·{" "}
            <b className="text-text-hi">{user.public_repos}</b> {t("safari.ghRepoCount")}
          </p>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg bg-fill-2 px-3 py-1.5 text-[12px] font-medium text-text-hi hover:bg-fill-3"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t("safari.ghOpen")}
        </a>
      </header>

      <h3 className="mt-6 mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-text-lo uppercase">
        <BookMarked className="h-3.5 w-3.5" />
        {t("safari.ghRepos")}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-line bg-inset p-3.5 transition-colors hover:border-line-strong hover:bg-fill-1"
          >
            <p className="truncate font-mono text-[13px] font-semibold text-accent">{repo.name}</p>
            <p className="mt-1 line-clamp-2 min-h-8 text-[12px] text-text-lo">
              {repo.description ?? "—"}
            </p>
            <p className="mt-2 flex items-center gap-3 text-[11px] text-text-lo">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: LANG_COLORS[repo.language] ?? "#8b949e" }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {repo.stargazers_count}
              </span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
