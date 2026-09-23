import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quickActions } from "@/lib/navigation";

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading" className="space-y-4">
      <h2 id="quick-actions-heading" className="text-lg font-semibold">
        Quick actions
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href + action.title} href={action.href} className="group block h-full">
              <Card className="h-full transition-colors group-hover:border-primary/40 group-hover:bg-muted/40">
                <CardHeader>
                  <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
