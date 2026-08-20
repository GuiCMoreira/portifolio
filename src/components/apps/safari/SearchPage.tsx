"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/data/projects";

// Logo do Guigle™ — o buscador do GuiOS que só encontra uma pessoa.
export function GuigleLogo({ className }: { className?: string }) {
  const letters: [string, string][] = [
    ["G", "#4285F4"],
    ["u", "#EA4335"],
    ["i", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span className={className} aria-label="Guigle">
      {letters.map(([ch, color], i) => (
        <span key={i} style={{ color }} className="font-display font-bold">
          {ch}
        </span>
      ))}
    </span>
  );
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  action: () => void;
}

export function SearchPage({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: (input: string) => void;
}) {
  const { t, lang } = useI18n();
  const openApp = useOSStore((s) => s.openApp);
  const [searching, setSearching] = useState(true);

  // Animação de "pesquisando" antes de revelar que só existe um resultado possível.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearching(true);
    const id = setTimeout(() => setSearching(false), 1100);
    return () => clearTimeout(id);
  }, [query]);

  const pt = lang === "pt";

  const results: SearchResult[] = [
    {
      title: pt
        ? "Guilherme de Carvalho Moreira — Desenvolvedor Web Fullstack | LinkedIn"
        : "Guilherme de Carvalho Moreira — Fullstack Web Developer | LinkedIn",
      url: "linkedin.com › in › guilherme-de-carvalho-moreira",
      snippet: pt
        ? "Next.js · React · TypeScript · PHP · MySQL. Sistemas corporativos de dia, ideias próprias à noite. Exatamente o dev que você pesquisou."
        : "Next.js · React · TypeScript · PHP · MySQL. Corporate systems by day, personal ideas by night. Exactly the dev you searched for.",
      action: () => window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer"),
    },
    {
      title: "GuiCMoreira (Guilherme Carvalho) · GitHub",
      url: "github.com › GuiCMoreira",
      snippet: pt
        ? "20 repositórios públicos. Microserviços com RabbitMQ, apps em React Native e este portfólio que você está usando agora."
        : "20 public repositories. Microservices with RabbitMQ, React Native apps and this very portfolio you're using right now.",
      action: () => onNavigate(GITHUB_URL),
    },
    {
      title: pt
        ? "Falar com o Guilherme agora — Contato"
        : "Talk to Guilherme now — Contact",
      url: "guios.dev › contato",
      snippet: pt
        ? "Resposta rápida garantida. Abre direto o app de contato deste sistema operacional (sim, você continua dentro dele)."
        : "Quick reply guaranteed. Opens this operating system's contact app directly (yes, you're still inside it).",
      action: () => openApp("contact"),
    },
    {
      title: "Guilherme (@_guic_m) • Instagram",
      url: "instagram.com › _guic_m",
      snippet: pt
        ? "O lado fora do terminal. Fotos, projetos e a quantidade de café responsável por este site."
        : "Life outside the terminal. Photos, projects and the amount of coffee responsible for this site.",
      action: () => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer"),
    },
    {
      title: "restaurant-digital — microserviços com RabbitMQ · GitHub",
      url: "github.com › GuiCMoreira › restaurant-digital",
      snippet: pt
        ? "O projeto em destaque: cardápio digital com arquitetura orientada a eventos. Abre renderizado aqui dentro do Safari."
        : "The featured project: digital menu with event-driven architecture. Opens rendered right here inside Safari.",
      action: () => onNavigate(`${GITHUB_URL}/restaurant-digital`),
    },
  ];

  if (searching) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <GuigleLogo className="text-3xl" />
        <motion.div
          className="h-6 w-6 rounded-full border-2 border-line border-t-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
        <p className="font-mono text-[11px] text-text-lo">{t("guigle.searching")}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-4">
        <GuigleLogo className="text-2xl" />
        <span className="rounded-full bg-fill-1 px-3 py-1 text-[12px] text-text-hi">{query}</span>
      </div>

      <p className="mt-3 text-[11px] text-text-lo">{t("guigle.stats")}</p>
      <p className="mt-1 text-[12px] text-text-lo">
        {t("guigle.didYouMean")}{" "}
        <button
          type="button"
          onClick={() => onNavigate(pt ? "contratar o Guilherme Carvalho" : "hire Guilherme Carvalho")}
          className="font-semibold text-accent italic hover:underline"
        >
          {t("guigle.didYouMeanQuery")}
        </button>
      </p>

      <div className="mt-5 max-w-xl space-y-6">
        {results.map((r, i) => (
          <motion.div
            key={r.url}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.25 }}
          >
            <p className="text-[11px] text-text-lo">{r.url}</p>
            <button
              type="button"
              onClick={r.action}
              className="mt-0.5 block text-left text-[15px] text-accent hover:underline"
            >
              {r.title}
            </button>
            <p className="mt-0.5 text-[12px] leading-relaxed text-text-lo">{r.snippet}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-[11px] text-text-lo/70">{t("guigle.footer")}</p>
    </div>
  );
}
