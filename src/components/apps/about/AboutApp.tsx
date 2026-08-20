"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { career, mainStack } from "@/data/career";
import { AVATAR_URL } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { LocalizedText } from "@/lib/types";

interface Note {
  id: string;
  title: LocalizedText;
  date: string;
  paragraphs: LocalizedText[];
}

const NOTES_DATE = "19/08/2026";

function buildNotes(): Note[] {
  return [
    {
      id: "about",
      title: { pt: "Sobre", en: "About" },
      date: NOTES_DATE,
      paragraphs: [
        {
          pt: "Sou Guilherme Carvalho, Desenvolvedor Web Fullstack em Bragança Paulista — SP.",
          en: "I'm Guilherme Carvalho, a Fullstack Web Developer based in Bragança Paulista — SP, Brazil.",
        },
        {
          pt: "Trabalho com sistemas corporativos no dia a dia e adoro explorar arquiteturas modernas — de microserviços com mensageria a interfaces que fogem do comum, como este site que imita um sistema operacional.",
          en: "I work with corporate systems daily and love exploring modern architectures — from microservices with messaging to interfaces that break the mold, like this OS-style website.",
        },
        {
          pt: "Acredito que bom software nasce do equilíbrio entre fundamento sólido (PHP, SQL, HTTP de verdade) e ferramenta moderna (Next.js, React, TypeScript). Meu caminho passa pelos dois mundos.",
          en: "I believe good software comes from balancing solid fundamentals (PHP, SQL, real HTTP) with modern tooling (Next.js, React, TypeScript). My path runs through both worlds.",
        },
      ],
    },
    {
      id: "experience",
      title: { pt: "Experiência", en: "Experience" },
      date: NOTES_DATE,
      paragraphs: career.flatMap((entry) => [
        {
          pt: `${entry.company} · ${entry.role.pt} (${entry.start}–${entry.end ?? "presente"})`,
          en: `${entry.company} · ${entry.role.en} (${entry.start}–${entry.end ?? "present"})`,
        },
        entry.summary,
      ]),
    },
    {
      id: "stack",
      title: { pt: "Stack & specs", en: "Stack & specs" },
      date: NOTES_DATE,
      paragraphs: [
        {
          pt: `Tecnologias do dia a dia: ${mainStack.join(", ")}.`,
          en: `Everyday technologies: ${mainStack.join(", ")}.`,
        },
        {
          pt: "Specs desta máquina: Chip Cérebro G1 Pro movido a café · Memória carregada de Next.js, React e PHP · Armazenamento com anos de código, bugs resolvidos e lições aprendidas · Gráficos em CSS artesanal integrado.",
          en: "This machine's specs: G1 Pro caffeine-powered Brain chip · Memory loaded with Next.js, React and PHP · Storage full of years of code, solved bugs and lessons learned · Integrated handcrafted CSS graphics.",
        },
      ],
    },
  ];
}

export function AboutApp() {
  const { tx, lang } = useI18n();
  const notes = buildNotes();
  const [selectedId, setSelectedId] = useState(notes[0].id);
  const selected = notes.find((n) => n.id === selectedId) ?? notes[0];

  const fullDate = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(2026, 7, 19, 11, 35));

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Sidebar de notas, estilo Notes (vira lista horizontal em telas estreitas) */}
      <aside className="os-scroll flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-inset p-2 md:w-52 md:flex-col md:space-y-1 md:overflow-x-visible md:overflow-y-auto md:border-r md:border-b-0">
        {notes.map((note) => {
          const isSel = note.id === selectedId;
          return (
            <button
              key={note.id}
              type="button"
              onClick={() => setSelectedId(note.id)}
              className={cn(
                "block w-44 shrink-0 rounded-lg px-3 py-2 text-left transition-colors md:w-full",
                isSel
                  ? "bg-[#f7cf4f] text-[#3a2f04] dark:bg-amber-400/90 dark:text-[#2b2304]"
                  : "hover:bg-fill-1",
              )}
            >
              <span className={cn("block text-[13px] font-semibold", !isSel && "text-text-hi")}>
                {tx(note.title)}
              </span>
              <span
                className={cn(
                  "block truncate text-[11px]",
                  isSel ? "text-[#6b5a10] dark:text-[#4a3d08]" : "text-text-lo",
                )}
              >
                {note.date} · {tx(note.paragraphs[0]).slice(0, 28)}…
              </span>
            </button>
          );
        })}
      </aside>

      {/* Corpo da nota */}
      <div className="os-scroll flex-1 overflow-y-auto p-6">
        <p className="text-center text-[11px] text-text-lo">{fullDate}</p>

        <div className="mt-4 flex items-center gap-3">
          <Image
            src={AVATAR_URL}
            alt="Guilherme Carvalho"
            width={44}
            height={44}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold tracking-tight text-text-hi">{tx(selected.title)}</h2>
        </div>

        <div className="mt-4 space-y-4">
          {selected.paragraphs.map((p, i) => (
            <p key={i} className="text-[13.5px] leading-relaxed text-text-hi/90">
              {tx(p)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
