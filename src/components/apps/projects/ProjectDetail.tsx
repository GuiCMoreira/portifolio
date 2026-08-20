"use client";

import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { t, tx } = useI18n();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] text-text-lo transition-colors hover:bg-white/5 hover:text-text-hi"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("projects.back")}
        </button>
        <h2 className="font-mono text-[14px] font-semibold text-text-hi">{project.name}</h2>
        <span className="font-mono text-[11px] text-text-lo">{project.year}</span>
      </div>

      <div className="os-scroll flex-1 space-y-6 overflow-y-auto p-6">
        <p className="text-[15px] leading-relaxed font-medium text-text-hi">{tx(project.tagline)}</p>
        <p className="text-[13px] leading-relaxed text-text-lo">{tx(project.description)}</p>

        {project.highlights && project.highlights.length > 0 && (
          <section>
            <h3 className="mb-2 flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-text-lo uppercase">
              <Sparkles className="h-3 w-3 text-accent" />
              {t("projects.highlights")}
            </h3>
            <ul className="space-y-1.5">
              {project.highlights.map((h) => (
                <li key={h.pt} className="flex gap-2 text-[13px] text-text-hi/85">
                  <span className="text-accent">▸</span>
                  {tx(h)}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h3 className="mb-2 font-mono text-[11px] tracking-widest text-text-lo uppercase">
            {t("projects.stack")}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-line bg-fill-1 px-2 py-1 font-mono text-[11px] text-text-hi/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-fill-2 px-4 py-2 text-[13px] font-medium text-text-hi transition-colors hover:bg-fill-3"
            >
              <GitHubIcon className="h-4 w-4" />
              {t("projects.viewGithub")}
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <ExternalLink className="h-4 w-4" />
              {t("projects.viewDemo")}
            </a>
          ) : (
            <span className="font-mono text-[11px] text-text-lo/70">({t("projects.noDemo")})</span>
          )}
        </section>
      </div>
    </div>
  );
}
