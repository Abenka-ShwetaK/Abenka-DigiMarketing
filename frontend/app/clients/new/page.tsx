import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Add client",
};

export default function NewClientPage() {
  return (
    <ComingSoon
      title="Add new client"
      summary="Client creation and requirement collection will be added in a later phase."
    />
  );
}
