"use client";

import { useEffect, useState } from "react";
import { Folder, FolderOpen, Smartphone, Star } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";

type Category = "featured" | "web" | "mobile" | "all";

const CATEGORIES: { id: Category; labelKey: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "featured", labelKey: "projects.featured", icon: Star },
  { id: "web", labelKey: "projects.web", icon: FolderOpen },
  { id: "mobile", labelKey: "projects.mobile", icon: Smartphone },
  { id: "all", labelKey: "projects.all", icon: Folder },
];

function filterByCategory(category: Category) {
  if (category === "all") return projects;
  if (category === "featured") return projects.filter((p) => p.featured);
  return projects.filter((p) => p.category === category);
}

export function ProjectsApp() {
  const { t } = useI18n();
  const [category, setCategory] = useState<Category>("featured");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const payload = useOSStore((s) => s.windows.projects.payload);
  const clearPayload = useOSStore((s) => s.clearPayload);

  // Deep-link vindo do terminal ou da command palette: abre direto no detalhe.
  useEffect(() => {
    if (payload && getProject(payload)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(payload);
       
      setCategory("all");
      clearPayload("projects");
    }
  }, [payload, clearPayload]);

  const selected = selectedId ? getProject(selectedId) : undefined;

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelectedId(null)} />;
  }

  const visible = filterByCategory(category);

  return (
    <div className="flex h-full">
      {/* Sidebar estilo Finder */}
      <aside className="flex w-44 shrink-0 flex-col gap-0.5 border-r border-white/5 bg-black/20 p-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = filterByCategory(cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                category === cat.id
                  ? "bg-accent/20 text-text-hi"
                  : "text-text-lo hover:bg-white/5 hover:text-text-hi",
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", category === cat.id && "text-accent")} />
              {t(cat.labelKey)}
              <span className="ml-auto font-mono text-[10px] text-text-lo/60">{count}</span>
            </button>
          );
        })}
      </aside>

      {/* Grid de projetos */}
      <div className="os-scroll flex-1 overflow-y-auto p-4">
        {visible.length === 0 ? (
          <p className="p-8 text-center text-[13px] text-text-lo">{t("projects.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
