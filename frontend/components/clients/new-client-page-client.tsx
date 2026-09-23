"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ClientForm } from "@/components/clients/client-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clientsApi } from "@/lib/api";
import { emptyClientForm, toClientPayload, type ClientFormValues } from "@/lib/clients";

export function NewClientPageClient() {
  const router = useRouter();

  async function handleSubmit(values: ClientFormValues) {
    const created = await clientsApi.create(toClientPayload(values));
    router.push(`/clients/${created.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Add new client</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Capture company and contact details for future marketing projects.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/clients">Cancel</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client details</CardTitle>
          <CardDescription>Company name is required. Other fields can be completed later.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm
            initialValues={emptyClientForm}
            submitLabel="Create client"
            onSubmit={handleSubmit}
            onCancel={() => router.push("/clients")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
