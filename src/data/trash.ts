import type { LocalizedText } from "@/lib/types";

// A Lixeira do GuiOS guarda bugs deletados — os primeiros aconteceram DE
// VERDADE durante o desenvolvimento deste site; o resto, todo dev reconhece.
export interface DeletedBug {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
}

export const deletedBugs: DeletedBug[] = [
  {
    id: "drag-replay",
    title: {
      pt: "Janela que reanimava sozinha ao soltar",
      en: "Window that replayed its own animation on drop",
    },
    detail: {
      pt: "Você arrastava a janela, soltava, e ela fazia o trajeto inteiro DE NOVO. Duas animações brigando pelo mesmo transform.",
      en: "You dragged the window, dropped it, and it traveled the whole path AGAIN. Two animations fighting over the same transform.",
    },
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
  },
  {
    id: "finder-derretido",
    title: { pt: "Ícone do Finder derretido", en: "Melted Finder icon" },
    detail: {
      pt: "Um path de SVG errado transformou o rosto sorridente do Finder numa massa azul disforme. Ele está bem agora.",
      en: "A wrong SVG path turned the Finder's smiley face into a shapeless blue blob. He's fine now.",
    },
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
  },
  {
    id: "terminal-fundo",
    title: { pt: "Terminal com fundo fujão", en: "Terminal with a runaway background" },
    detail: {
      pt: "O fundo escuro tinha altura fixa; o texto rolava e saía do fundo, tipo pijama curto. Agora ele cresce junto.",
      en: "The dark background had a fixed height; text scrolled right out of it, like short pajamas. Now it grows along.",
    },
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
  },
  {
    id: "safari-strict",
    title: {
      pt: "Safari que travava ao abrir pelo dock",
      en: "Safari that crashed when opened from the dock",
    },
    detail: {
      pt: "O modo estrito do React rodava um efeito duas vezes e o histórico apontava para uma página que não existia. O error boundary segurou a bronca. 💪",
      en: "React strict mode ran an effect twice and history pointed to a page that didn't exist. The error boundary held the line. 💪",
    },
  },
  {
    id: "funciona-na-minha-maquina",
    title: { pt: "Funciona na minha máquina", en: "Works on my machine" },
    detail: {
      pt: "Status: não reproduzível. Máquina do dev: em perfeito estado. Produção: em chamas.",
      en: "Status: cannot reproduce. Dev's machine: pristine. Production: on fire.",
    },
  },
  {
    id: "off-by-one",
    title: { pt: "Erro de off-by-one", en: "Off-by-one error" },
    detail: {
      pt: "As duas coisas mais difíceis da computação: invalidação de cache, nomear variáveis e erros de off-by-one.",
      en: "The two hardest things in computer science: cache invalidation, naming things, and off-by-one errors.",
    },
  },
  {
    id: "cache",
    title: { pt: "Bug resolvido limpando o cache", en: "Bug fixed by clearing the cache" },
    detail: {
      pt: "Três horas de investigação. A correção: Ctrl+Shift+R. Ninguém precisa saber.",
      en: "Three hours of investigation. The fix: Ctrl+Shift+R. Nobody needs to know.",
    },
  },
  {
    id: "timezone",
    title: { pt: "Bug de fuso horário", en: "Timezone bug" },
    detail: {
      pt: "Funcionava perfeitamente, exceto para usuários que existem em qualquer lugar do planeta Terra.",
      en: "Worked perfectly, except for users located anywhere on planet Earth.",
    },
  },
  {
    id: "css-centralizar",
    title: { pt: "Div que se recusava a centralizar", en: "Div that refused to center" },
    detail: {
      pt: " 4 gerações de devs tentaram. No fim era um margin escondido num CSS de 2019.",
      en: "Four generations of devs tried. In the end it was a hidden margin in some CSS from 2019.",
    },
  },
  {
    id: "zindex-9999",
    title: { pt: "z-index: 999999999", en: "z-index: 999999999" },
    detail: {
      pt: "Quando o 9999 não funcionou, adicionamos mais noves. Spoiler: o problema era um stacking context.",
      en: "When 9999 didn't work, we added more nines. Spoiler: the problem was a stacking context.",
    },
  },
  {
    id: "sexta-feira",
    title: { pt: "Deploy de sexta-feira às 17h58", en: "Friday 5:58 PM deploy" },
    detail: {
      pt: "O bug não estava no código. Estava na decisão.",
      en: "The bug wasn't in the code. It was in the decision.",
    },
  },
  {
    id: "null",
    title: {
      pt: "Cannot read properties of undefined",
      en: "Cannot read properties of undefined",
    },
    detail: {
      pt: "(reading 'algo que você tinha CERTEZA que existia')",
      en: "(reading 'something you were SURE existed')",
    },
  },
  {
    id: "regex",
    title: { pt: "Regex que funcionou de primeira", en: "Regex that worked on the first try" },
    detail: {
      pt: "Deletado por suspeita de fraude. Ninguém acredita nele até hoje.",
      en: "Deleted on suspicion of fraud. To this day, nobody believes it.",
    },
  },
  {
    id: "cors",
    title: { pt: "Erro de CORS", en: "CORS error" },
    detail: {
      pt: "Access-Control-Allow-Origin: a causa número 1 de devs considerando carreira na agricultura.",
      en: "Access-Control-Allow-Origin: the #1 cause of devs considering a career in farming.",
    },
  },
  {
    id: "merge-conflict",
    title: { pt: "Conflito de merge de 400 linhas", en: "400-line merge conflict" },
    detail: {
      pt: "<<<<<<< HEAD do desespero. Aceitar os dois lados não era a resposta.",
      en: "<<<<<<< HEAD of despair. Accepting both sides was not the answer.",
    },
  },
  {
    id: "console-log",
    title: { pt: "console.log('AQUI 3')", en: "console.log('HERE 3')" },
    detail: {
      pt: "Encontrado em produção junto com os irmãos 'AQUI', 'AQUI 2' e 'entrou??'. Uma família inteira deletada.",
      en: "Found in production alongside siblings 'HERE', 'HERE 2' and 'did it work??'. A whole family deleted.",
    },
  },
  {
    id: "dark-mode",
    title: { pt: "Texto preto no fundo preto", en: "Black text on black background" },
    detail: {
      pt: "O conteúdo estava lá o tempo todo. Em modo furtivo.",
      en: "The content was there the whole time. In stealth mode.",
    },
  },
  {
    id: "ponto-e-virgula",
    title: { pt: "Ponto e vírgula faltando", en: "Missing semicolon" },
    detail: {
      pt: "40 minutos de debugging. Linha 1, coluna 1. O editor estava apontando desde o início.",
      en: "40 minutes of debugging. Line 1, column 1. The editor was pointing at it the whole time.",
    },
  },
  {
    id: "npm-install",
    title: { pt: "Resolvido com rm -rf node_modules", en: "Fixed with rm -rf node_modules" },
    detail: {
      pt: "O equivalente dev de 'já tentou desligar e ligar de novo?'. Taxa de sucesso: suspeitamente alta.",
      en: "The dev equivalent of 'have you tried turning it off and on again?'. Success rate: suspiciously high.",
    },
  },
  {
    id: "todo-antigo",
    title: { pt: "// TODO: arrumar depois (2021)", en: "// TODO: fix later (2021)" },
    detail: {
      pt: "'Depois' nunca chegou. O comentário virou patrimônio histórico do repositório.",
      en: "'Later' never came. The comment became a historical landmark of the repository.",
    },
  },
  {
    id: "demo-effect",
    title: { pt: "Bug que some na frente do chefe", en: "Bug that vanishes in front of the boss" },
    detail: {
      pt: "Reproduzível 100% das vezes, exceto durante demonstrações. Cientistas ainda investigam.",
      en: "Reproducible 100% of the time, except during demos. Scientists are still investigating.",
    },
  },
  {
    id: "estagiario",
    title: { pt: "Culpa do estagiário", en: "The intern's fault" },
    detail: {
      pt: "git blame revelou: era o sênior. Em 2019. O estagiário nem tinha nascido no repo.",
      en: "git blame revealed: it was the senior dev. In 2019. The intern wasn't even born in the repo yet.",
    },
  },
];
