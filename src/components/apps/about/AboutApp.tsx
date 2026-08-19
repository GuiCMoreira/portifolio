"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { career } from "@/data/career";
import { AVATAR_URL } from "@/data/projects";
import { AboutThisDev } from "./AboutThisDev";

export function AboutApp() {
  const { t, tx } = useI18n();

  return (
    <div className="space-y-8 p-6">
      {/* Header com avatar e bio */}
      <header className="flex items-start gap-4">
        <Image
          src={AVATAR_URL}
          alt="Guilherme Carvalho"
          width={72}
          height={72}
          className="rounded-2xl ring-2 ring-accent/30"
        />
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-text-hi">
            Guilherme Carvalho
          </h2>
          <p className="font-mono text-[11px] tracking-wide text-accent uppercase">
            {t("welcome.role")}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-text-lo">{t("about.bio")}</p>
        </div>
      </header>

      {/* Timeline de carreira */}
      <section>
        <h3 className="mb-4 font-mono text-[11px] tracking-widest text-text-lo uppercase">
          {t("about.career")}
        </h3>
        <ol className="relative space-y-6 border-l border-white/10 pl-5">
          {career.map((entry) => (
            <li key={entry.id} className="relative">
              <span
                className="absolute top-1.5 -left-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-ink bg-accent"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h4 className="text-[14px] font-semibold text-text-hi">{tx(entry.role)}</h4>
                <span className="font-mono text-[11px] text-text-lo">
                  {entry.start} — {entry.end ?? t("about.present")}
                </span>
              </div>
              <p className="text-[13px] font-medium text-accent/90">
                {entry.company} · <span className="font-normal text-text-lo">{entry.location}</span>
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-lo">{tx(entry.summary)}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {entry.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-white/6 px-1.5 py-0.5 font-mono text-[10px] text-text-lo"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <AboutThisDev />
    </div>
  );
}
