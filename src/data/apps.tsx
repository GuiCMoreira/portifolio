import type { AppId } from "@/lib/types";
import { FolderOpen, Mail, SquareTerminal, UserRound } from "lucide-react";
import { ProjectsApp } from "@/components/apps/projects/ProjectsApp";
import { TerminalApp } from "@/components/apps/terminal/TerminalApp";
import { AboutApp } from "@/components/apps/about/AboutApp";
import { ContactApp } from "@/components/apps/contact/ContactApp";

export interface AppDefinition {
  id: AppId;
  titleKey: string;
  icon: React.ComponentType<{ className?: string }>;
  /** classes tailwind do gradiente do ícone (tile estilo iOS/macOS) */
  gradient: string;
  component: React.ComponentType;
  defaultSize: { w: number; h: number };
}

export const APPS: AppDefinition[] = [
  {
    id: "projects",
    titleKey: "apps.projects",
    icon: FolderOpen,
    gradient: "from-indigo-500 to-violet-600",
    component: ProjectsApp,
    defaultSize: { w: 860, h: 560 },
  },
  {
    id: "terminal",
    titleKey: "apps.terminal",
    icon: SquareTerminal,
    gradient: "from-emerald-500 to-teal-700",
    component: TerminalApp,
    defaultSize: { w: 680, h: 440 },
  },
  {
    id: "about",
    titleKey: "apps.about",
    icon: UserRound,
    gradient: "from-sky-500 to-blue-700",
    component: AboutApp,
    defaultSize: { w: 640, h: 560 },
  },
  {
    id: "contact",
    titleKey: "apps.contact",
    icon: Mail,
    gradient: "from-rose-500 to-orange-500",
    component: ContactApp,
    defaultSize: { w: 520, h: 420 },
  },
];

export function getApp(id: AppId): AppDefinition {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`App desconhecido: ${id}`);
  return app;
}
