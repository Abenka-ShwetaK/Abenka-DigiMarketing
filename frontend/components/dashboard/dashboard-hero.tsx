"use client";

import { useGreeting } from "@/hooks/use-greeting";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/navigation";

export function DashboardHero() {
  const greeting = useGreeting();

  return (
    <header className="space-y-2">
      <p className="text-sm font-medium text-primary">{greeting}</p>
      <h1 className="text-3xl font-semibold tracking-tight">{APP_NAME}</h1>
      <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{APP_DESCRIPTION}</p>
    </header>
  );
}
