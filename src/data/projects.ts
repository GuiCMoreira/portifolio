import type { Project } from "@/lib/types";

export const GITHUB_URL = "https://github.com/GuiCMoreira";
export const LINKEDIN_URL = "https://www.linkedin.com/in/guilherme-de-carvalho-moreira/";
export const INSTAGRAM_URL = "https://www.instagram.com/_guic_m/";
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/142915547?v=4";
export const EMAIL = "guicarvalhomoreira@gmail.com"; // REVISAR: confirmar e-mail público preferido

export const projects: Project[] = [
  {
    id: "restaurant-digital",
    name: "restaurant-digital",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["Next.js", "TypeScript", "RabbitMQ", "Microserviços", "Docker"],
    github: "https://github.com/GuiCMoreira/restaurant-digital",
    tagline: {
      pt: "Cardápio digital com arquitetura de microserviços orientada a eventos",
      en: "Digital menu system with event-driven microservices architecture",
    },
    description: {
      pt: "Sistema de cardápio digital construído com Next.js e arquitetura de microserviços. Os serviços de Pedido, Cozinha, Venda e Notificação se comunicam por eventos via RabbitMQ — cada domínio evolui e escala de forma independente, como em sistemas de produção de grande porte.",
      en: "Digital menu system built with Next.js and a microservices architecture. Order, Kitchen, Sale and Notification services communicate through events via RabbitMQ — each domain evolves and scales independently, like large-scale production systems.",
    },
    highlights: [
      {
        pt: "Comunicação assíncrona entre 4 serviços com RabbitMQ",
        en: "Asynchronous communication between 4 services with RabbitMQ",
      },
      {
        pt: "Separação de domínios: Pedido, Cozinha, Venda e Notificação",
        en: "Domain separation: Order, Kitchen, Sale and Notification",
      },
      {
        pt: "Frontend Next.js consumindo a malha de serviços",
        en: "Next.js frontend consuming the service mesh",
      },
    ],
  },
  {
    id: "devroast",
    name: "devroast",
    year: 2026,
    category: "web",
    featured: true,
    stack: ["TypeScript", "Next.js", "React"],
    github: "https://github.com/GuiCMoreira/devroast",
    tagline: {
      pt: "Plataforma web em TypeScript para feedback de projetos dev",
      en: "TypeScript web platform for dev project feedback",
    },
    description: {
      pt: "Aplicação web em TypeScript/Next.js. Projeto pessoal para explorar padrões modernos do ecossistema React com tipagem de ponta a ponta.",
      en: "TypeScript/Next.js web application. Personal project exploring modern React ecosystem patterns with end-to-end typing.",
    },
  },
  {
    id: "controle-chamados",
    name: "controle-chamados",
    year: 2025,
    category: "web",
    featured: false,
    stack: ["PHP", "MySQL"],
    github: "https://github.com/GuiCMoreira/controle-chamados",
    tagline: {
      pt: "Sistema de controle de chamados em PHP",
      en: "Ticket management system in PHP",
    },
    description: {
      pt: "Sistema de abertura e acompanhamento de chamados construído em PHP, cobrindo o fluxo completo de um helpdesk: criação, atribuição e resolução de tickets.",
      en: "Ticket creation and tracking system built in PHP, covering the full helpdesk flow: creating, assigning and resolving tickets.",
    },
  },
  {
    id: "fsw-barber",
    name: "fsw-barber",
    year: 2024,
    category: "web",
    featured: false,
    stack: ["TypeScript", "Next.js", "Prisma", "Tailwind CSS"],
    github: "https://github.com/GuiCMoreira/fsw-barber",
    tagline: {
      pt: "Agendamento de barbearias com Next.js",
      en: "Barbershop booking app with Next.js",
    },
    description: {
      pt: "Aplicação fullstack de agendamento para barbearias: catálogo de serviços, reservas e autenticação, construída no ecossistema Next.js.",
      en: "Fullstack barbershop booking application: service catalog, reservations and authentication, built on the Next.js ecosystem.",
    },
  },
  {
    id: "eccomerce-php",
    name: "Eccomerce-PHP",
    year: 2024,
    category: "web",
    featured: false,
    stack: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/GuiCMoreira/Eccomerce-PHP",
    tagline: {
      pt: "E-commerce completo construído em PHP puro",
      en: "Complete e-commerce built in plain PHP",
    },
    description: {
      pt: "Loja virtual com carrinho, catálogo e fluxo de checkout construída em PHP — exercício de fundamentos web sem frameworks.",
      en: "Online store with cart, catalog and checkout flow built in PHP — an exercise in web fundamentals without frameworks.",
    },
  },
  {
    id: "projetos-reactnative",
    name: "Projetos-ReactNative",
    year: 2026,
    category: "mobile",
    featured: false,
    stack: ["React Native", "TypeScript", "Expo"],
    github: "https://github.com/GuiCMoreira/Projetos-ReactNative",
    tagline: {
      pt: "Coleção de apps mobile em React Native",
      en: "Collection of React Native mobile apps",
    },
    description: {
      pt: "Conjunto de aplicativos mobile construídos em React Native/TypeScript, explorando navegação, consumo de APIs e componentes nativos.",
      en: "Set of mobile applications built with React Native/TypeScript, exploring navigation, API consumption and native components.",
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
