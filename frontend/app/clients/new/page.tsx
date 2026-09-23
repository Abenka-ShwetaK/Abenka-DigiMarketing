import type { Metadata } from "next";

import { NewClientPageClient } from "@/components/clients/new-client-page-client";

export const metadata: Metadata = {
  title: "Add client",
};

export default function NewClientPage() {
  return <NewClientPageClient />;
}
