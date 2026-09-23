import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Alert({
  variant = "default",
  title,
  children,
  className,
}: {
  variant?: "default" | "error" | "success";
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variant === "error" && "border-red-200 bg-red-50 text-red-800",
        variant === "success" && "border-teal-200 bg-teal-50 text-teal-900",
        variant === "default" && "border-border bg-muted text-foreground",
        className,
      )}
    >
      {title ? <p className="font-medium">{title}</p> : null}
      <div className={title ? "mt-1" : undefined}>{children}</div>
    </div>
  );
}
