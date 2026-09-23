export type MetricSource = "development_placeholder";

export type DashboardMetric = {
  id: "totalClients" | "activeProjects" | "presentationsGenerated" | "awaitingReview";
  label: string;
  value: number;
  source: MetricSource;
};

export const dashboardMetrics: DashboardMetric[] = [
  { id: "totalClients", label: "Total Clients", value: 0, source: "development_placeholder" },
  { id: "activeProjects", label: "Active Projects", value: 0, source: "development_placeholder" },
  {
    id: "presentationsGenerated",
    label: "Presentations Generated",
    value: 0,
    source: "development_placeholder",
  },
  { id: "awaitingReview", label: "Awaiting Review", value: 0, source: "development_placeholder" },
];

export const emptyStates = {
  presentations: "No presentations yet. Create your first presentation project.",
  clients: "No clients yet. Add your first client.",
} as const;
