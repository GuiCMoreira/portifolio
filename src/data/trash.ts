import type { LocalizedText } from "@/lib/types";

// A Lixeira do GuiOS guarda os bugs REAIS deletados durante o desenvolvimento
// deste site. Todos aconteceram de verdade. Descansem em paz. 🪦
export interface DeletedBug {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
  deletedAt: string;
}

export const deletedBugs: DeletedBug[] = [
  {
    id: "drag-replay",
    title: {
      pt: "Janela que reanimava sozinha ao soltar",
      en: "Window that replayed its own animation on drop",
    },
    detail: {
      pt: "Você arrastava a janela, soltava, e ela fazia o trajeto inteiro DE NOVO. Culpa de duas animações brigando pelo mesmo transform.",
      en: "You dragged the window, dropped it, and it traveled the whole path AGAIN. Two animations fighting over the same transform.",
    },
    deletedAt: "20/08/2026",
  },
  {
    id: "linha-branca",
    title: {
      pt: "Linha branca misteriosa no topo da tela",
      en: "Mysterious white line at the top of the screen",
    },
    detail: {
      pt: "Um highlight de 1px do efeito Liquid Glass aparecendo onde não devia. Investigação digna de CSI para um único pixel.",
      en: "A 1px highlight from the Liquid Glass effect showing up where it shouldn't. A CSI-grade investigation for a single pixel.",
    },
    deletedAt: "20/08/2026",
  },
  {
    id: "finder-derretido",
    title: {
      pt: "Ícone do Finder derretido",
      en: "Melted Finder icon",
    },
    detail: {
      pt: "Um path de SVG errado transformou o rosto sorridente do Finder numa massa azul disforme. Ele está bem agora.",
      en: "A wrong SVG path turned the Finder's smiley face into a shapeless blue blob. He's fine now.",
    },
    deletedAt: "20/08/2026",
  },
  {
    id: "botao-robo",
    title: {
      pt: "Botão 'Ver projetos' que só funcionava para robôs",
      en: "'View projects' button that only worked for robots",
    },
    detail: {
      pt: "Uma camada invisível engolia os cliques humanos — mas os testes automatizados clicavam por baixo dela e passavam. O QA aprendeu a clicar como gente.",
      en: "An invisible layer swallowed human clicks — but automated tests clicked underneath it and passed. QA learned to click like a person.",
    },
    deletedAt: "20/08/2026",
  },
  {
    id: "terminal-fundo",
    title: {
      pt: "Terminal com fundo fujão",
      en: "Terminal with a runaway background",
    },
    detail: {
      pt: "O fundo escuro tinha altura fixa; o texto rolava e saía do fundo, tipo pijama curto. Agora ele cresce junto.",
      en: "The dark background had a fixed height; text scrolled right out of it, like short pajamas. Now it grows along.",
    },
    deletedAt: "20/08/2026",
  },
  {
    id: "maximizar-piscada",
    title: {
      pt: "Maximizar que piscava em vez de animar",
      en: "Maximize that blinked instead of animating",
    },
    detail: {
      pt: "A janela ia de pequena para tela cheia num único frame. Uma classe CSS de 14 caracteres bloqueava a animação inteira.",
      en: "The window went from small to fullscreen in a single frame. A 14-character CSS class was blocking the whole animation.",
    },
    deletedAt: "20/08/2026",
  },
  {
    id: "safari-strict",
    title: {
      pt: "Safari que travava ao abrir pelo dock",
      en: "Safari that crashed when opened from the dock",
    },
    detail: {
      pt: "O modo estrito do React rodava um efeito duas vezes e o histórico apontava para uma página que não existia. O error boundary segurou a bronca — como projetado. 💪",
      en: "React strict mode ran an effect twice and history pointed to a page that didn't exist. The error boundary held the line — as designed. 💪",
    },
    deletedAt: "20/08/2026",
  },
];
