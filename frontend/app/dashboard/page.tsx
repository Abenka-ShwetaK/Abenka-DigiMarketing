import type { Metadata } from "next";

import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { EmptyPanel, SummaryCards } from "@/components/dashboard/overview-panels";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { emptyStates } from "@/lib/dashboard";
import { APP_NAME } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: APP_NAME,
};

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <DashboardHero />
      <SummaryCards />
      <QuickActions />
      <section aria-labelledby="recent-heading" className="grid gap-4 lg:grid-cols-2">
        <h2 id="recent-heading" className="sr-only">
          Recent activity
        </h2>
        <EmptyPanel
          title="Recent projects"
          description={emptyStates.presentations}
          actionHref="/presentations/new"
          actionLabel="Create presentation"
        />
        <EmptyPanel
          title="Recent clients"
          description={emptyStates.clients}
          actionHref="/clients/new"
          actionLabel="Add client"
        />
      </section>
    </div>
  );
}
