import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Clients",
};

export default function ClientsPage() {
  return (
    <ComingSoon
      title="Clients"
      summary="Client records, onboarding, and account context will be added in a later phase."
    />
  );
}
