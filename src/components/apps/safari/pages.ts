// "Motor" de navegação do Safari do GuiOS: resolve o que o usuário digita
// em páginas internas, iframe ou bloqueio (sites com X-Frame-Options).

export type SafariPage =
  | { kind: "start" }
  | { kind: "github" }
  | { kind: "github-repo"; repo: string }
  | { kind: "search"; query: string }
  | { kind: "web"; url: string }
  | { kind: "blocked"; url: string; host: string };

export function samePage(a: SafariPage, b: SafariPage): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "web" || a.kind === "blocked") return a.url === (b as { url: string }).url;
  if (a.kind === "github-repo") return a.repo === (b as { repo: string }).repo;
  if (a.kind === "search") return a.query === (b as { query: string }).query;
  return true;
}

// Sites que proíbem embed via X-Frame-Options/frame-ancestors.
const BLOCKED_HOSTS = [
  "linkedin.com",
  "instagram.com",
  "facebook.com",
  "x.com",
  "twitter.com",
  "google.com",
  "youtube.com",
  "github.com",
];

export function displayUrl(page: SafariPage): string {
  switch (page.kind) {
    case "start":
      return "";
    case "github":
      return "github.com/GuiCMoreira";
    case "github-repo":
      return `github.com/GuiCMoreira/${page.repo}`;
    case "search":
      return `guigle.com/search?q=${encodeURIComponent(page.query)}`;
    case "web":
      return page.url.replace(/^https?:\/\//, "");
    case "blocked":
      return page.url.replace(/^https?:\/\//, "");
  }
}

export function resolveInput(raw: string): SafariPage {
  const input = raw.trim();
  if (!input || input === "guios://start") return { kind: "start" };

  // Texto sem cara de endereço = pesquisa no Guigle™ (o buscador do GuiOS).
  const searchQuery = input.match(/^(?:https?:\/\/)?guigle\.com\/search\?q=(.+)$/i);
  if (searchQuery) return { kind: "search", query: decodeURIComponent(searchQuery[1]) };
  const looksLikeUrl =
    /^https?:\/\//i.test(input) || (/\.[a-z]{2,}(\/|$|\?)/i.test(input) && !/\s/.test(input));
  if (!looksLikeUrl) return { kind: "search", query: input };

  const withProto = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  let url: URL;
  try {
    url = new URL(withProto);
  } catch {
    return { kind: "start" };
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  // Perfil e repositórios do Gui têm versão renderizada própria (a API permite).
  if (host === "github.com") {
    const path = url.pathname.replace(/\/$/, "");
    if (path === "" || path.toLowerCase() === "/guicmoreira") return { kind: "github" };
    const repoMatch = path.match(/^\/guicmoreira\/([^/]+)$/i);
    if (repoMatch) return { kind: "github-repo", repo: repoMatch[1] };
  }

  if (BLOCKED_HOSTS.some((b) => host === b || host.endsWith(`.${b}`))) {
    return { kind: "blocked", url: url.href, host };
  }

  return { kind: "web", url: url.href };
}
