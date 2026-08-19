import type { AppId, Lang } from "@/lib/types";
import { projects, getProject, GITHUB_URL, LINKEDIN_URL, EMAIL } from "@/data/projects";
import { career, mainStack } from "@/data/career";

export interface CommandContext {
  lang: Lang;
  openApp: (id: AppId, payload?: string) => void;
  setLang: (l: Lang) => void;
}

const CAREER_START_YEAR = 2022;

function pt(lang: Lang) {
  return lang === "pt";
}

const HELP: Record<Lang, string[]> = {
  pt: [
    "comandos disponíveis:",
    "  help              esta lista",
    "  whoami            quem é o dono deste OS",
    "  ls projetos       lista os projetos",
    "  open <projeto>    abre um projeto (ex: open restaurant-digital)",
    "  stack             tecnologias que eu uso",
    "  carreira          trajetória profissional",
    "  neofetch          informações do sistema",
    "  hire --me         a melhor decisão que você vai tomar hoje",
    "  lang pt|en        troca o idioma do GuiOS",
    "  clear             limpa a tela",
  ],
  en: [
    "available commands:",
    "  help              this list",
    "  whoami            who owns this OS",
    "  ls projects       list projects",
    "  open <project>    open a project (e.g. open restaurant-digital)",
    "  stack             technologies I use",
    "  career            professional journey",
    "  neofetch          system information",
    "  hire --me         the best decision you'll make today",
    "  lang pt|en        switch GuiOS language",
    "  clear             clear the screen",
  ],
};

function neofetch(lang: Lang): string[] {
  const uptime = new Date().getFullYear() - CAREER_START_YEAR;
  const art = [
    "   ██████╗ ",
    "  ██╔════╝ ",
    "  ██║  ███╗",
    "  ██║   ██║",
    "  ╚██████╔╝",
    "   ╚═════╝ ",
  ];
  const info = pt(lang)
    ? [
        "guilherme@guios",
        "───────────────",
        "OS:       GuiOS 1.0 (build 2026)",
        "Host:     Guilherme Carvalho",
        `Uptime:   ${uptime}+ anos codando`,
        "Shell:    fullstack (front + back)",
        "Kernel:   Next.js / React / PHP",
        "Local:    Bragança Paulista — SP",
        "Fuel:     café ☕",
      ]
    : [
        "guilherme@guios",
        "───────────────",
        "OS:       GuiOS 1.0 (build 2026)",
        "Host:     Guilherme Carvalho",
        `Uptime:   ${uptime}+ years coding`,
        "Shell:    fullstack (front + back)",
        "Kernel:   Next.js / React / PHP",
        "Location: Bragança Paulista — SP, Brazil",
        "Fuel:     coffee ☕",
      ];
  return art.map((line, i) => `${line}  ${info[i] ?? ""}`).concat(info.slice(art.length));
}

export function runCommand(input: string, ctx: CommandContext): string[] | "CLEAR" {
  const raw = input.trim();
  if (!raw) return [];
  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(" ");
  const isPt = pt(ctx.lang);

  switch (cmd.toLowerCase()) {
    case "help":
      return HELP[ctx.lang];

    case "whoami":
      return isPt
        ? [
            "Guilherme Carvalho — Desenvolvedor Web Fullstack.",
            "Next.js · React · TypeScript · PHP · MySQL.",
            "Construo sistemas corporativos de dia e ideias próprias à noite.",
          ]
        : [
            "Guilherme Carvalho — Fullstack Web Developer.",
            "Next.js · React · TypeScript · PHP · MySQL.",
            "I build corporate systems by day and my own ideas by night.",
          ];

    case "ls": {
      const target = arg.toLowerCase();
      if (target === "projetos" || target === "projects" || target === "") {
        return projects.map(
          (p) => `${p.id.padEnd(24)} ${p.year}  [${p.stack.slice(0, 3).join(", ")}]`,
        );
      }
      return isPt ? [`ls: ${arg}: diretório não encontrado`] : [`ls: ${arg}: no such directory`];
    }

    case "open": {
      if (!arg) {
        return isPt ? ["uso: open <projeto> — veja 'ls projetos'"] : ["usage: open <project> — see 'ls projects'"];
      }
      const project = getProject(arg.toLowerCase());
      if (!project) {
        return isPt
          ? [`open: '${arg}' não encontrado — veja 'ls projetos'`]
          : [`open: '${arg}' not found — see 'ls projects'`];
      }
      ctx.openApp("projects", project.id);
      return isPt ? [`abrindo ${project.name}…`] : [`opening ${project.name}…`];
    }

    case "stack":
      return [mainStack.join(" · ")];

    case "carreira":
    case "career":
      return career.flatMap((entry) => [
        `${entry.start}–${entry.end ?? (isPt ? "presente" : "present")}  ${entry.company}`,
        `  ${isPt ? entry.role.pt : entry.role.en} — [${entry.stack.join(", ")}]`,
      ]);

    case "neofetch":
      return neofetch(ctx.lang);

    case "hire": {
      if (arg === "--me") {
        ctx.openApp("contact");
        return isPt
          ? ["✔ excelente escolha. abrindo canais de contato…"]
          : ["✔ excellent choice. opening contact channels…"];
      }
      return isPt ? ["dica: tente 'hire --me'"] : ["hint: try 'hire --me'"];
    }

    case "lang": {
      const l = arg.toLowerCase();
      if (l === "pt" || l === "en") {
        ctx.setLang(l);
        return l === "pt" ? ["idioma alterado para português 🇧🇷"] : ["language switched to English 🌎"];
      }
      return isPt ? ["uso: lang pt|en"] : ["usage: lang pt|en"];
    }

    case "sudo":
      return isPt
        ? ["guilherme não está no arquivo sudoers. este incidente será reportado. ☕"]
        : ["guilherme is not in the sudoers file. this incident will be reported. ☕"];

    case "contact":
    case "contato":
      return [`GitHub:   ${GITHUB_URL}`, `LinkedIn: ${LINKEDIN_URL}`, `E-mail:   ${EMAIL}`];

    case "clear":
      return "CLEAR";

    case "exit":
      return isPt ? ["não há saída. você está no GuiOS agora. 😌"] : ["there is no exit. you live in GuiOS now. 😌"];

    default:
      return isPt
        ? [`comando não encontrado: ${cmd} — tente 'help'`]
        : [`command not found: ${cmd} — try 'help'`];
  }
}
