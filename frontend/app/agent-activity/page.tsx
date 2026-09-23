import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Agent activity",
};

export default function AgentActivityPage() {
  return (
    <ComingSoon
      title="Agent activity"
      summary="AI agent runs, logs, and status will be added in a later phase."
    />
  );
}
