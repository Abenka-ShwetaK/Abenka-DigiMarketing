import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Presentations",
};

export default function PresentationsPage() {
  return (
    <ComingSoon
      title="Presentations"
      summary="Presentation projects and generated decks will be added in a later phase."
    />
  );
}
