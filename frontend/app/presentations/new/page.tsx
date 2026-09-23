import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Create presentation",
};

export default function NewPresentationPage() {
  return (
    <ComingSoon
      title="Create presentation"
      summary="Presentation project setup and generation will be added in a later phase."
    />
  );
}
