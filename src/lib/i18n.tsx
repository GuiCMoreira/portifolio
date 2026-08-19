"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, LocalizedText } from "./types";

const STORAGE_KEY = "guios.lang";

const dict: Record<string, LocalizedText> = {
  // Boot
  "boot.skip": { pt: "clique para pular", en: "click to skip" },
  "boot.msg1": { pt: "montando /dev/carreira…", en: "mounting /dev/career…" },
  "boot.msg2": { pt: "compilando anos de experiência…", en: "compiling years of experience…" },
  "boot.msg3": { pt: "injetando cafeína no kernel…", en: "injecting caffeine into the kernel…" },
  "boot.msg4": { pt: "quase lá…", en: "almost there…" },

  // Menu bar
  "menubar.desktop": { pt: "Mesa", en: "Desktop" },
  "menubar.palette": { pt: "Buscar", en: "Search" },

  // Apps (títulos)
  "apps.projects": { pt: "Projetos", en: "Projects" },
  "apps.terminal": { pt: "Terminal", en: "Terminal" },
  "apps.about": { pt: "Sobre", en: "About" },
  "apps.contact": { pt: "Contato", en: "Contact" },

  // Welcome widget
  "welcome.hello": { pt: "Olá, eu sou", en: "Hi, I'm" },
  "welcome.role": { pt: "Desenvolvedor Web Fullstack", en: "Fullstack Web Developer" },
  "welcome.location": { pt: "Bragança Paulista — SP, Brasil", en: "Bragança Paulista — SP, Brazil" },
  "welcome.tagline": {
    pt: "Construo sistemas que empresas e pessoas usam todos os dias.",
    en: "I build systems that companies and people use every day.",
  },
  "welcome.cta": { pt: "Ver projetos", en: "View projects" },
  "welcome.orPress": { pt: "ou pressione", en: "or press" },

  // Janelas
  "window.close": { pt: "Fechar", en: "Close" },
  "window.minimize": { pt: "Minimizar", en: "Minimize" },
  "window.maximize": { pt: "Maximizar", en: "Maximize" },
  "window.crashed": { pt: "Este app travou.", en: "This app crashed." },
  "window.restart": { pt: "Reiniciar app", en: "Restart app" },

  // Projetos
  "projects.featured": { pt: "Destaques", en: "Featured" },
  "projects.web": { pt: "Web", en: "Web" },
  "projects.mobile": { pt: "Mobile", en: "Mobile" },
  "projects.all": { pt: "Todos", en: "All" },
  "projects.back": { pt: "Voltar", en: "Back" },
  "projects.viewGithub": { pt: "Ver no GitHub", en: "View on GitHub" },
  "projects.viewDemo": { pt: "Ver demo", en: "View demo" },
  "projects.noDemo": { pt: "sem demo pública", en: "no public demo" },
  "projects.highlights": { pt: "Destaques técnicos", en: "Technical highlights" },
  "projects.stack": { pt: "Stack", en: "Stack" },
  "projects.empty": { pt: "Nenhum projeto nesta categoria.", en: "No projects in this category." },

  // Terminal
  "terminal.welcome": {
    pt: "GuiOS Terminal — digite 'help' para ver os comandos.",
    en: "GuiOS Terminal — type 'help' to see available commands.",
  },

  // Sobre
  "about.bio": {
    pt: "Desenvolvedor Web Fullstack apaixonado por transformar problemas reais em software bem construído. Trabalho com sistemas corporativos no dia a dia e adoro explorar arquiteturas modernas — de microserviços com mensageria a interfaces que fogem do comum (como este site).",
    en: "Fullstack Web Developer passionate about turning real problems into well-built software. I work with corporate systems daily and love exploring modern architectures — from microservices with messaging to interfaces that break the mold (like this site).",
  },
  "about.career": { pt: "Trajetória", en: "Career" },
  "about.present": { pt: "presente", en: "present" },
  "about.thisDev": { pt: "Sobre este Dev", en: "About this Dev" },
  "about.chip": { pt: "Chip", en: "Chip" },
  "about.chipValue": { pt: "Cérebro G1 Pro — movido a café", en: "G1 Pro Brain — caffeine powered" },
  "about.memory": { pt: "Memória", en: "Memory" },
  "about.storage": { pt: "Armazenamento", en: "Storage" },
  "about.storageValue": {
    pt: "Anos de código, bugs resolvidos e lições aprendidas",
    en: "Years of code, solved bugs and lessons learned",
  },
  "about.graphics": { pt: "Gráficos", en: "Graphics" },
  "about.graphicsValue": { pt: "CSS artesanal integrado", en: "Integrated handcrafted CSS" },
  "about.os": { pt: "Sistema", en: "OS" },
  "about.osValue": { pt: "GuiOS 1.0 (build 2026)", en: "GuiOS 1.0 (build 2026)" },

  // Contato
  "contact.title": { pt: "Vamos conversar?", en: "Let's talk?" },
  "contact.subtitle": {
    pt: "Escolha o canal — respondo em todos.",
    en: "Pick a channel — I reply on all of them.",
  },
  "contact.email": { pt: "E-mail", en: "Email" },
  "contact.openLink": { pt: "Abrir", en: "Open" },
  "contact.sendEmail": { pt: "Enviar e-mail", en: "Send email" },

  // Command palette
  "palette.placeholder": { pt: "Buscar apps, projetos, ações…", en: "Search apps, projects, actions…" },
  "palette.empty": { pt: "Nada encontrado.", en: "Nothing found." },
  "palette.apps": { pt: "Apps", en: "Apps" },
  "palette.projects": { pt: "Projetos", en: "Projects" },
  "palette.system": { pt: "Sistema", en: "System" },
  "palette.switchLang": { pt: "Mudar idioma para English", en: "Switch language to Português" },
  "palette.openGithub": { pt: "Abrir GitHub", en: "Open GitHub" },
  "palette.openLinkedin": { pt: "Abrir LinkedIn", en: "Open LinkedIn" },

  // Mobile
  "mobile.greeting": { pt: "GuiOS", en: "GuiOS" },
  "mobile.back": { pt: "Início", en: "Home" },
};

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tx: (text: LocalizedText) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") {
      setLangState(saved);
    } else {
      setLangState(navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang],
  );

  const tx = useCallback((text: LocalizedText) => text[lang], [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t, tx }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n deve ser usado dentro de LanguageProvider");
  return ctx;
}
