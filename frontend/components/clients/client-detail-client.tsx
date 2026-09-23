"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ArrowLeft, ExternalLink, Pencil, Trash2 } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApiError, clientsApi } from "@/lib/api";
import { CLIENT_STATUS_LABELS, formatDate } from "@/lib/clients";

export function ClientDetailClient({ clientId }: { clientId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => clientsApi.get(clientId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => clientsApi.remove(clientId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/clients");
    },
    onError: (mutationError) => {
      setActionMessage(mutationError instanceof Error ? mutationError.message : "Delete failed.");
      setConfirmOpen(false);
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading client</CardTitle>
          <CardDescription>Fetching client details.</CardDescription>
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
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
            Back to clients
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
            <Link href="/clients">
              <ArrowLeft className="h-4 w-4" />
              Clients
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{data.company_name}</h1>
            <Badge variant="outline">{CLIENT_STATUS_LABELS[data.status]}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Created {formatDate(data.created_at)} · Updated {formatDate(data.updated_at)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={`/clients/${data.id}/edit`}>
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {actionMessage ? <Alert variant="error">{actionMessage}</Alert> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailCard title="Company overview">
          <DetailRow label="Industry" value={data.industry} />
          <DetailRow label="Location" value={data.location} />
          <DetailRow label="Status" value={CLIENT_STATUS_LABELS[data.status]} />
          <DetailRow
            label="Website"
            value={
              data.website ? (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {data.website}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null
            }
          />
        </DetailCard>

        <DetailCard title="Contact information">
          <DetailRow label="Contact person" value={data.contact_person} />
          <DetailRow label="Email" value={data.email} />
          <DetailRow label="Phone" value={data.phone} />
        </DetailCard>

        <DetailCard title="Business description">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {data.business_description || "Not provided yet."}
          </p>
        </DetailCard>

        <DetailCard title="Target audience">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {data.target_audience || "Not provided yet."}
          </p>
        </DetailCard>

        <DetailCard title="Marketing goals" className="lg:col-span-2">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {data.marketing_goals || "Not provided yet."}
          </p>
        </DetailCard>

        <DetailCard title="Associated projects" className="lg:col-span-2">
          <p className="text-sm text-muted-foreground">
            Presentation and campaign projects will appear here in a later phase.
          </p>
        </DetailCard>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this client?</DialogTitle>
            <DialogDescription>
              This soft-deletes the client record. It will no longer appear in the client list, but the
              data is retained for recovery and audit purposes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={deleteMutation.isPending}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-1 text-sm text-foreground">{value || "—"}</div>
    </div>
  );
}
