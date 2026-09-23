import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Building2,
  FilePlus2,
  LayoutDashboard,
  LayoutTemplate,
  Presentation,
  Settings,
  UserPlus,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const APP_NAME = "Abenka AI Marketing";
export const APP_DESCRIPTION =
  "Your workspace for AI-powered marketing strategy and content production.";

export const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of marketing operations",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Building2,
    description: "Client workspace",
  },
  {
    title: "Presentations",
    href: "/presentations",
    icon: Presentation,
    description: "Presentation projects",
  },
  {
    title: "Templates",
    href: "/templates",
    icon: LayoutTemplate,
    description: "Reusable marketing templates",
  },
  {
    title: "Agent Activity",
    href: "/agent-activity",
    icon: Bot,
    description: "AI agent runs and status",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Workspace settings",
  },
];

export const quickActions = [
  {
    title: "Add New Client",
    href: "/clients/new",
    icon: UserPlus,
    description: "Start a new client record",
  },
  {
    title: "Create Presentation",
    href: "/presentations/new",
    icon: FilePlus2,
    description: "Open a new presentation project",
  },
  {
    title: "View Clients",
    href: "/clients",
    icon: Building2,
    description: "Go to the client list",
  },
  {
    title: "View Presentations",
    href: "/presentations",
    icon: Presentation,
    description: "Go to presentation projects",
  },
] as const;
