"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ClientForm } from "@/components/clients/client-form";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError, clientsApi } from "@/lib/api";
import { emptyClientForm, toClientPayload, type ClientFormValues } from "@/lib/clients";

export function EditClientPageClient({ clientId }: { clientId: string }) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => clientsApi.get(clientId),
  });

  async function handleSubmit(values: ClientFormValues) {
    await clientsApi.update(clientId, toClientPayload(values));
    router.push(`/clients/${clientId}`);
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading client</CardTitle>
          <CardDescription>Preparing the edit form.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isError || !data) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="space-y-4">
        <Alert variant="error" title={notFound ? "Client not found" : "Unable to load client"}>
          {error instanceof Error ? error.message : "Something went wrong."}
        </Alert>
        <Button asChild variant="outline">
          <Link href="/clients">Back to clients</Link>
        </Button>
      </div>
    );
  }

  const initialValues: ClientFormValues = {
    ...emptyClientForm,
    company_name: data.company_name,
    contact_person: data.contact_person ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    industry: data.industry ?? "",
    website: data.website ?? "",
    business_description: data.business_description ?? "",
    target_audience: data.target_audience ?? "",
    marketing_goals: data.marketing_goals ?? "",
    location: data.location ?? "",
    status: data.status,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Edit client</h1>
        <p className="mt-1 text-sm text-muted-foreground">{data.company_name}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Update client details</CardTitle>
          <CardDescription>Changes are saved to the client record immediately.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm
            initialValues={initialValues}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
            onCancel={() => router.push(`/clients/${clientId}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
