import type { Metadata } from "next";

import { ClientDetailClient } from "@/components/clients/client-detail-client";

export const metadata: Metadata = {
  title: "Client details",
};

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  return <ClientDetailClient clientId={id} />;
}
