// "Motor" de navegação do Safari do GuiOS: resolve o que o usuário digita
// em páginas internas, iframe ou bloqueio (sites com X-Frame-Options).

export type SafariPage =
  | { kind: "start" }
  | { kind: "github" }
  | { kind: "web"; url: string }
  | { kind: "blocked"; url: string; host: string };

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
    case "web":
      return page.url.replace(/^https?:\/\//, "");
    case "blocked":
      return page.url.replace(/^https?:\/\//, "");
  }
}

export function resolveInput(raw: string): SafariPage {
  const input = raw.trim();
  if (!input || input === "guios://start") return { kind: "start" };

  const withProto = /^https?:\/\//i.test(input) ? input : `https://${input}`;
  let url: URL;
  try {
    url = new URL(withProto);
  } catch {
    return { kind: "start" };
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  // Perfil do Gui no GitHub tem versão renderizada própria (a API permite).
  if (host === "github.com") {
    const path = url.pathname.replace(/\/$/, "").toLowerCase();
    if (path === "" || path === "/guicmoreira") return { kind: "github" };
  }

  if (BLOCKED_HOSTS.some((b) => host === b || host.endsWith(`.${b}`))) {
    return { kind: "blocked", url: url.href, host };
  }

  return { kind: "web", url: url.href };
}
