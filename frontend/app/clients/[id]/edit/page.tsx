import type { Metadata } from "next";

import { EditClientPageClient } from "@/components/clients/edit-client-page-client";

export const metadata: Metadata = {
  title: "Edit client",
};

type EditClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params;
  return <EditClientPageClient clientId={id} />;
}
