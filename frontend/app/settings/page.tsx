import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      summary="Workspace, provider, and account settings will be added in a later phase."
    />
  );
}
