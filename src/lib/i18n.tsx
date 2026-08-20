"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, LocalizedText } from "./types";
import { storageGet, storageSet } from "./safe-storage";

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
  "menu.file": { pt: "Arquivo", en: "File" },
  "menu.help": { pt: "Ajuda", en: "Help" },
  "menu.closeWindow": { pt: "Fechar janela", en: "Close window" },
  "menu.helpPalette": { pt: "Busca rápida (⌘K)", en: "Quick search (⌘K)" },
  "menu.helpTerminal": { pt: "Abrir o Terminal", en: "Open Terminal" },
  "menu.helpHire": { pt: "Falar comigo", en: "Get in touch" },

  // Apps (títulos)
  "apps.projects": { pt: "Projetos", en: "Projects" },
  "apps.safari": { pt: "Safari", en: "Safari" },
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

  // Popovers de status (Wi-Fi, bateria, relógio)
  "wifi.connected": { pt: "Conectado", en: "Connected" },
  "wifi.offline": { pt: "Sem conexão", en: "Offline" },
  "wifi.otherNetworks": { pt: "Outras redes", en: "Other networks" },
  "battery.title": { pt: "Bateria", en: "Battery" },
  "battery.device": { pt: "Essa é a bateria real do seu dispositivo.", en: "That's your device's real battery." },
  "battery.apiNote": { pt: "(sim, Battery Status API 😉)", en: "(yes, Battery Status API 😉)" },
  "battery.charging": { pt: "Carregando", en: "Charging" },
  "battery.onBattery": { pt: "Usando a bateria", en: "On battery power" },
  "battery.caffeine": { pt: "Cafeína do Gui", en: "Gui's caffeine" },
  "battery.caffeineNote": { pt: "recarregando com café ☕", en: "recharging with coffee ☕" },
  "clock.ariaLabel": { pt: "Data e hora", en: "Date and time" },
  "clock.yourTime": { pt: "Seu horário", en: "Your time" },
  "clock.myTime": { pt: "Meu horário (Bragança Paulista)", en: "My time (Bragança Paulista, BR)" },
  "clock.available": { pt: "Disponível para novas oportunidades", en: "Open to new opportunities" },
  "clock.contact": { pt: "Entrar em contato", en: "Get in touch" },

  // Safari
  "safari.addressPlaceholder": {
    pt: "Pesquisar no Guigle ou digitar endereço",
    en: "Search Guigle or enter address",
  },
  "safari.recentSearches": { pt: "Pesquisas recentes", en: "Recent searches" },

  // Guigle™ — o buscador que só encontra uma pessoa
  "guigle.searching": {
    pt: "vasculhando a internet inteira…",
    en: "scouring the entire internet…",
  },
  "guigle.stats": {
    pt: "Aproximadamente 6.740.000 resultados (0,42 segundos) — curiosamente, todos apontam para a mesma pessoa.",
    en: "About 6,740,000 results (0.42 seconds) — curiously, they all point to the same person.",
  },
  "guigle.didYouMean": { pt: "Você quis dizer:", en: "Did you mean:" },
  "guigle.didYouMeanQuery": {
    pt: "contratar o Guilherme Carvalho",
    en: "hire Guilherme Carvalho",
  },
  "guigle.footer": {
    pt: "Guigle™ — resultados imparciais desde nunca. Nenhum outro dev foi consultado na produção desta página.",
    en: "Guigle™ — unbiased results since never. No other devs were consulted in the making of this page.",
  },
  "safari.start": { pt: "Página inicial", en: "Start page" },
  "safari.back": { pt: "Voltar", en: "Back" },
  "safari.forward": { pt: "Avançar", en: "Forward" },
  "safari.reload": { pt: "Recarregar", en: "Reload" },
  "safari.favorites": { pt: "Favoritos", en: "Favorites" },
  "safari.myProjects": { pt: "Meus projetos", en: "My projects" },
  "safari.myProjectsHint": {
    pt: "abre o repositório aqui mesmo — demos ao vivo em breve",
    en: "opens the repository right here — live demos coming soon",
  },
  "safari.blockedTitle1": { pt: "Infelizmente o", en: "Unfortunately" },
  "safari.blockedTitle2": {
    pt: "não deixa eu carregá-lo aqui dentro 😅",
    en: "won't let me load it in here 😅",
  },
  "safari.blockedHint": {
    pt: "Um navegador dentro de um navegador já era pedir demais para eles… mas lá fora funciona:",
    en: "A browser inside a browser was too much to ask of them… but it works out there:",
  },
  "safari.openYourBrowser": {
    pt: "Abrir no seu navegador (o de verdade 😉)",
    en: "Open in your browser (the real one 😉)",
  },
  "safari.iframeHint": {
    pt: "Se a página ficar em branco, o site bloqueia visualização embutida.",
    en: "If the page stays blank, the site blocks embedding.",
  },
  "safari.ghError": {
    pt: "Não deu para carregar o GitHub agora (limite da API pública). Tente pelo site oficial:",
    en: "Couldn't load GitHub right now (public API rate limit). Try the official site:",
  },
  "safari.ghOpen": {
    pt: "Ver no seu navegador (o de verdade 😉)",
    en: "View in your browser (the real one 😉)",
  },
  "safari.repoUpdated": { pt: "atualizado em", en: "updated" },
  "safari.ghRepos": { pt: "Repositórios recentes", en: "Recent repositories" },
  "safari.ghFollowers": { pt: "seguidores", en: "followers" },
  "safari.ghFollowing": { pt: "seguindo", en: "following" },
  "safari.ghRepoCount": { pt: "repositórios", en: "repositories" },

  // Lixeira
  "trash.title": { pt: "Lixeira", en: "Trash" },
  "trash.subtitle": {
    pt: "Bugs reais encontrados e deletados durante o desenvolvimento deste sistema.",
    en: "Real bugs found and deleted while building this system.",
  },
  "trash.footer": {
    pt: "A lixeira não pode ser esvaziada — esses bugs são troféus. 🏆",
    en: "The trash can't be emptied — these bugs are trophies. 🏆",
  },

  // Menu do sistema (logo G)
  "sysmenu.about": { pt: "Sobre o GuiOS", en: "About GuiOS" },
  "sysmenu.settings": { pt: "Ajustes…", en: "Settings…" },
  "sysmenu.recent": { pt: "Itens recentes", en: "Recent items" },
  "sysmenu.recentEmpty": { pt: "Nenhum item recente", en: "No recent items" },
  "sysmenu.forceQuit": { pt: "Forçar Encerrar Tudo", en: "Force Quit All" },
  "sysmenu.sleep": { pt: "Repouso", en: "Sleep" },
  "sysmenu.restart": { pt: "Reiniciar…", en: "Restart…" },
  "sysmenu.shutdown": { pt: "Desligar…", en: "Shut Down…" },
  "sysmenu.logout": { pt: "Finalizar Sessão de Visitante…", en: "Log Out Visitor…" },
  "sysmenu.version": { pt: "Versão 2.0 (build 2026)", en: "Version 2.0 (build 2026)" },
  "sysmenu.sourceCode": { pt: "Código-fonte deste Mac", en: "This Mac's source code" },
  "sysmenu.poweredOff": { pt: "GuiOS foi desligado", en: "GuiOS is powered off" },
  "sysmenu.powerOn": { pt: "Ligar", en: "Power on" },
  "sysmenu.sleeping": { pt: "Em repouso — toque para acordar", en: "Sleeping — tap to wake" },

  // Ajustes
  "settings.title": { pt: "Ajustes do Sistema", en: "System Settings" },
  "settings.appearance": { pt: "Aparência", en: "Appearance" },
  "settings.light": { pt: "Claro", en: "Light" },
  "settings.dark": { pt: "Escuro", en: "Dark" },
  "settings.language": { pt: "Idioma", en: "Language" },
  "settings.wallpaper": { pt: "Fundo de tela", en: "Wallpaper" },
  "settings.system": { pt: "Sistema", en: "System" },
  "mobile.settings": { pt: "Ajustes", en: "Settings" },
  "mobile.search": { pt: "Pesquisar", en: "Search" },

  // Clima, notificação e menu de contexto
  "weather.aria": { pt: "Clima em Bragança Paulista", en: "Weather in Bragança Paulista" },
  "notify.title": { pt: "Gostou do que viu por aqui?", en: "Enjoying what you've seen?" },
  "notify.body": {
    pt: "O dono deste sistema está disponível para novas oportunidades. ☕",
    en: "The owner of this system is open to new opportunities. ☕",
  },
  "notify.cta": { pt: "Falar com o Guilherme", en: "Talk to Guilherme" },
  "ctxmenu.wallpaper": { pt: "Alterar fundo de tela", en: "Change wallpaper" },
  "ctxmenu.settings": { pt: "Ajustes…", en: "Settings…" },
  "ctxmenu.terminal": { pt: "Abrir o Terminal", en: "Open Terminal" },
  "ctxmenu.about": { pt: "Sobre o GuiOS", en: "About GuiOS" },
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
    // Hidratação única a partir do localStorage/navigator — não há cascata de renders.
    const saved = storageGet("local", STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(
      saved === "pt" || saved === "en"
        ? saved
        : navigator.language?.toLowerCase().startsWith("pt")
          ? "pt"
          : "en",
    );
  }, []);

  // Leitores de tela escolhem a voz pelo atributo lang do documento.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    storageSet("local", STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[i18n] chave ausente: ${key}`);
        }
        return key;
      }
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
