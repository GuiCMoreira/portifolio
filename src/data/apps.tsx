import type { AppId } from "@/lib/types";
import {
  FinderIcon,
  MailIcon,
  NotesIcon,
  SafariIcon,
  TerminalMacIcon,
} from "@/components/ui/app-icons";
import { ProjectsApp } from "@/components/apps/projects/ProjectsApp";
import { SafariApp } from "@/components/apps/safari/SafariApp";
import { TerminalApp } from "@/components/apps/terminal/TerminalApp";
import { AboutApp } from "@/components/apps/about/AboutApp";
import { ContactApp } from "@/components/apps/contact/ContactApp";

export interface AppDefinition {
  id: AppId;
  titleKey: string;
  /** ícone completo estilo macOS (squircle colorido, SVG próprio) */
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  defaultSize: { w: number; h: number };
}

export const APPS: AppDefinition[] = [
  {
    id: "projects",
    titleKey: "apps.projects",
    icon: FinderIcon,
    component: ProjectsApp,
    defaultSize: { w: 860, h: 560 },
  },
  {
    id: "safari",
    titleKey: "apps.safari",
    icon: SafariIcon,
    component: SafariApp,
    defaultSize: { w: 900, h: 600 },
  },
  {
    id: "terminal",
    titleKey: "apps.terminal",
    icon: TerminalMacIcon,
    component: TerminalApp,
    defaultSize: { w: 680, h: 440 },
  },
  {
    id: "about",
    titleKey: "apps.about",
    icon: NotesIcon,
    component: AboutApp,
    defaultSize: { w: 760, h: 560 },
  },
  {
    id: "contact",
    titleKey: "apps.contact",
    icon: MailIcon,
    component: ContactApp,
    defaultSize: { w: 520, h: 440 },
  },
];

export function getApp(id: AppId): AppDefinition {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`App desconhecido: ${id}`);
  return app;
}
