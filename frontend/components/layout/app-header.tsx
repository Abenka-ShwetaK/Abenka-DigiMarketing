"use client";

import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/layout/mobile-nav";
import { APP_NAME, navigation } from "@/lib/navigation";

function titleForPath(pathname: string): string {
  const match = navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  if (pathname.endsWith("/new") && match) {
    return `${match.title} · New`;
  }
  return match?.title ?? APP_NAME;
}

export function AppHeader() {
  const pathname = usePathname();
  const title = titleForPath(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card px-4 lg:px-8">
      <MobileNav />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="hidden text-xs text-muted-foreground sm:block">Internal marketing operations workspace</p>
      </div>
    </header>
  );
}
