import type { LocalizedText } from "@/lib/types";

// A Lixeira do GuiOS guarda os bugs deletados durante o desenvolvimento
// deste próprio sistema. Todos aconteceram de verdade.
export interface DeletedBug {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
}

export const deletedBugs: DeletedBug[] = [
  {
    id: "drag-replay",
    title: {
      pt: "Janela reanimava sozinha ao soltar o arrasto",
      en: "Window replayed its own animation on drag release",
    },
    detail: {
      pt: "Ao soltar uma janela, ela refazia o trajeto inteiro desde a posição original. Duas animações disputavam o mesmo transform; a geometria foi separada em canais independentes.",
      en: "On release, the window replayed its whole path from the original position. Two animations were fighting over the same transform; geometry was split into independent channels.",
    },
  },
  {
    id: "maximizar-menubar",
    title: {
      pt: "Maximizar cobria a barra de menu",
      en: "Maximize covered the menu bar",
    },
    detail: {
      pt: "A janela maximizada subia até o topo absoluto da tela e os botões de fechar/minimizar ficavam escondidos atrás da barra de menu.",
      en: "The maximized window went all the way to the top and the close/minimize buttons hid behind the menu bar.",
    },
  },
  {
    id: "maximizar-dock",
    title: {
      pt: "Janela maximizada passava por trás do dock",
      en: "Maximized window slid behind the dock",
    },
    detail: {
      pt: "Em tela cheia, a parte de baixo da janela ficava soterrada pelo dock. Agora ela para exatamente na borda superior dele.",
      en: "In fullscreen, the bottom of the window was buried under the dock. Now it stops exactly at its top edge.",
    },
  },
  {
    id: "maximizar-piscada",
    title: {
      pt: "Maximizar piscava em vez de animar",
      en: "Maximize blinked instead of animating",
    },
    detail: {
      pt: "A janela crescia num único frame. Uma classe transform-none, colocada para proteger o drag, bloqueava a animação de crescimento inteira.",
      en: "The window grew in a single frame. A transform-none class, added to protect dragging, was blocking the whole grow animation.",
    },
  },
  {
    id: "maximizar-deslocado",
    title: {
      pt: "Maximizar após arrastar deixava a janela torta",
      en: "Maximizing after dragging left the window offset",
    },
    detail: {
      pt: "A janela maximizada herdava o deslocamento do último arrasto e ficava fora do lugar, com a barra de título inalcançável.",
      en: "The maximized window inherited the last drag offset and sat out of place, with the title bar unreachable.",
    },
  },
  {
    id: "drag-eixo-y",
    title: {
      pt: "Arrasto com eixo Y travado após restaurar",
      en: "Drag with a locked Y axis after restoring",
    },
    detail: {
      pt: "Depois de maximizar e restaurar, a janela só andava na horizontal. Religar o drag recalculava os limites com a janela ainda grande.",
      en: "After maximizing and restoring, the window only moved horizontally. Re-enabling drag recalculated bounds while the window was still large.",
    },
  },
  {
    id: "janela-vazando",
    title: {
      pt: "Janelas translúcidas vazando o que estava atrás",
      en: "Translucent windows leaking what was behind them",
    },
    detail: {
      pt: "Dava para ler o widget de boas-vindas através do app Projetos. As janelas ganharam fundo sólido; o vidro ficou só no dock e na barra de menu.",
      en: "You could read the welcome widget through the Projects app. Windows got solid backgrounds; glass stayed only on the dock and menu bar.",
    },
  },
  {
    id: "janela-fantasma",
    title: {
      pt: "Janela fantasma clara no tema escuro",
      en: "Ghost light window in dark theme",
    },
    detail: {
      pt: "Ao trocar de tema, uma janela desfocada chegou a pintar clara sobre o desktop escuro — camada de composição desatualizada do navegador. Fundos sólidos eliminaram a classe do problema.",
      en: "When switching themes, an unfocused window once painted light over the dark desktop — a stale browser compositing layer. Solid backgrounds killed that class of problem.",
    },
  },
  {
    id: "linha-branca",
    title: {
      pt: "Linha branca no topo do site nos dois temas",
      en: "White line at the top of the site in both themes",
    },
    detail: {
      pt: "O highlight interno do efeito de vidro (1px) virava um risco na borda superior, porque a barra de menu encosta no topo da tela.",
      en: "The glass effect's inner highlight (1px) became a streak at the top edge, since the menu bar touches the top of the screen.",
    },
  },
  {
    id: "botao-robo",
    title: {
      pt: "Botão 'Ver projetos' que só funcionava em teste",
      en: "'View projects' button that only worked in tests",
    },
    detail: {
      pt: "A camada invisível que segura as janelas engolia os cliques humanos no desktop. Os testes automatizados disparavam o clique por código e passavam sem perceber.",
      en: "The invisible layer holding the windows swallowed human clicks on the desktop. Automated tests fired clicks via code and passed without noticing.",
    },
  },
  {
    id: "terminal-fundo",
    title: {
      pt: "Fundo do terminal não acompanhava o scroll",
      en: "Terminal background didn't follow the scroll",
    },
    detail: {
      pt: "Com muitos comandos, o texto rolava para fora do fundo escuro e aparecia sobre a janela clara. Altura fixa trocada por altura mínima.",
      en: "With many commands, text scrolled out of the dark background onto the light window. Fixed height swapped for minimum height.",
    },
  },
  {
    id: "terminal-mobile",
    title: {
      pt: "Comandos do terminal não navegavam no celular",
      en: "Terminal commands didn't navigate on mobile",
    },
    detail: {
      pt: "'open restaurant-digital' respondia sucesso, mas a tela não trocava: o celular usava um estado próprio, separado do desktop. Hoje os dois compartilham o mesmo sistema.",
      en: "'open restaurant-digital' reported success but the screen never changed: mobile kept its own state, separate from desktop. Now both share the same system.",
    },
  },
  {
    id: "safari-strict",
    title: {
      pt: "Safari travava ao abrir pelo dock",
      en: "Safari crashed when opened from the dock",
    },
    detail: {
      pt: "Em desenvolvimento, um efeito rodava duas vezes e o histórico apontava para uma página inexistente. O error boundary segurou; pilha e índice viraram um estado único.",
      en: "In development, an effect ran twice and history pointed to a page that didn't exist. The error boundary held; stack and index became a single state.",
    },
  },
  {
    id: "safari-casinha",
    title: {
      pt: "Botão de início apagava o histórico do Safari",
      en: "Home button erased Safari's forward history",
    },
    detail: {
      pt: "Clicar na casinha já estando na página inicial empilhava a mesma página de novo e o 'avançar' deixava de voltar para onde você estava.",
      en: "Clicking home while already on the start page pushed the same page again, and 'forward' no longer returned to where you were.",
    },
  },
  {
    id: "foco-orfao",
    title: {
      pt: "Barra de menu mostrando 'Mesa' com janela aberta",
      en: "Menu bar showing 'Desktop' with a window open",
    },
    detail: {
      pt: "Fechar ou minimizar a janela em foco zerava o foco em vez de promover a próxima janela visível, deixando o sistema em estado incoerente.",
      en: "Closing or minimizing the focused window cleared focus instead of promoting the next visible window, leaving the system inconsistent.",
    },
  },
  {
    id: "anel-azul",
    title: {
      pt: "Anel azul de foco em todo campo de texto",
      en: "Blue focus ring on every text field",
    },
    detail: {
      pt: "A regra global de acessibilidade valia para tudo — e o terminal e a busca focam o campo ao abrir, então o anel aparecia sempre. Campos de texto ganharam exceção: o cursor já sinaliza o foco.",
      en: "The global accessibility rule applied to everything — and the terminal and search auto-focus their fields, so the ring always showed. Text fields got an exception: the caret already signals focus.",
    },
  },
  {
    id: "icones-pequenos",
    title: {
      pt: "Ícones do dock com desenho pequeno demais",
      en: "Dock icons with undersized artwork",
    },
    detail: {
      pt: "Os símbolos ocupavam ~50% do tile; nos apps reais é ~65–70%. Todos os sete ícones foram redesenhados na proporção certa.",
      en: "Glyphs filled ~50% of the tile; real apps use ~65–70%. All seven icons were redrawn at the right proportion.",
    },
  },
  {
    id: "chips-mobile",
    title: {
      pt: "Botões de tema e idioma sobre o widget no celular",
      en: "Theme and language buttons on top of the mobile widget",
    },
    detail: {
      pt: "Os controles flutuavam por cima do cartão de boas-vindas. Ganharam uma linha própria entre a barra de status e o widget.",
      en: "The controls floated over the welcome card. They got their own row between the status bar and the widget.",
    },
  },
  {
    id: "busca-colada",
    title: {
      pt: "Caixa de busca colada nas bordas no celular",
      en: "Search box glued to the screen edges on mobile",
    },
    detail: {
      pt: "A janela do ⌘K encostava nas laterais da tela. Um respiro de 16px de cada lado resolveu.",
      en: "The ⌘K panel touched the sides of the screen. A 16px breathing room on each side fixed it.",
    },
  },
  {
    id: "app-mobile-transparente",
    title: {
      pt: "App aberto no celular deixava a home visível atrás",
      en: "Open mobile app showed the home screen through it",
    },
    detail: {
      pt: "O fundo do app era translúcido demais e a grade de ícones vazava por baixo do conteúdo. O app ganhou fundo opaco.",
      en: "The app background was too translucent and the icon grid bled under the content. The app got an opaque background.",
    },
  },
  {
    id: "storage-bloqueado",
    title: {
      pt: "Página em branco com cookies bloqueados",
      en: "Blank page with cookies blocked",
    },
    detail: {
      pt: "Se o navegador bloqueava storage, ler as preferências lançava um erro na raiz do app e derrubava o site inteiro. Todo acesso passou a ter fallback silencioso.",
      en: "If the browser blocked storage, reading preferences threw at the app root and took the whole site down. Every access now has a silent fallback.",
    },
  },
];
