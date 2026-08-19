import type { CareerEntry } from "@/lib/types";

// REVISAR: datas e detalhes de cargo devem ser confirmados pelo Guilherme.
export const career: CareerEntry[] = [
  {
    id: "altec",
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    company: "Altec Sistemas",
    location: "Bragança Paulista — SP",
    start: "2024",
    end: null,
    summary: {
      pt: "Desenvolvimento e evolução de ERP para o setor de food service: novas funcionalidades, correções e integrações em sistema multi-tenant de grande porte, do banco de dados à interface.",
      en: "Development and evolution of an ERP for the food service industry: new features, fixes and integrations in a large multi-tenant system, from database to UI.",
    },
    stack: ["PHP", "MySQL", "JavaScript", "Docker"],
  },
  {
    id: "freelance",
    role: { pt: "Desenvolvedor Web", en: "Web Developer" },
    company: "Projetos próprios e estudos",
    location: "Remoto",
    start: "2022",
    end: "2024",
    summary: {
      pt: "Construção de base sólida em desenvolvimento web moderno: projetos completos em Next.js/React, PHP e React Native, do e-commerce ao sistema de agendamento.",
      en: "Building a solid foundation in modern web development: complete projects in Next.js/React, PHP and React Native, from e-commerce to booking systems.",
    },
    stack: ["Next.js", "React", "TypeScript", "PHP", "React Native"],
  },
];

export const mainStack = [
  "Next.js",
  "React",
  "TypeScript",
  "PHP",
  "MySQL",
  "Node.js",
  "React Native",
  "Docker",
  "Tailwind CSS",
  "RabbitMQ",
];
