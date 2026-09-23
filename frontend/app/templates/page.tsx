import type { Metadata } from "next";

import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = {
  title: "Templates",
};

export default function TemplatesPage() {
  return (
    <ComingSoon
      title="Templates"
      summary="Reusable marketing templates will be added in a later phase."
    />
  );
}
