import type { Metadata } from "next";

import { ClientsPageClient } from "@/components/clients/clients-page-client";

export const metadata: Metadata = {
  title: "Clients",
};

export default function ClientsPage() {
  return <ClientsPageClient />;
}
