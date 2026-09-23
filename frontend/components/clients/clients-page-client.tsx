"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";

import { ClientCard } from "@/components/clients/client-card";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { clientsApi } from "@/lib/api";
import { CLIENT_STATUS_LABELS, CLIENT_STATUSES } from "@/lib/clients";
import type { ClientStatus } from "@/types";

export function ClientsPageClient() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ClientStatus | "all">("all");
  const [page, setPage] = useState(1);

  const queryKey = useMemo(() => ["clients", { search, status, page }], [search, status, page]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () =>
      clientsApi.list({
        search: search || undefined,
        status,
        page,
        page_size: 12,
      }),
  });

  function applySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage company records for marketing projects and presentations.
          </p>
        </div>
        <Button asChild>
          <Link href="/clients/new">
            <Plus className="h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_220px_auto]">
          <form onSubmit={applySearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search by company, contact, or email"
                className="pl-9"
                aria-label="Search clients"
              />
            </div>
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </form>
          <Select
            aria-label="Filter by status"
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value as ClientStatus | "all");
            }}
          >
            <option value="all">All statuses</option>
            {CLIENT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {CLIENT_STATUS_LABELS[item]}
              </option>
            ))}
          </Select>
          <p className="self-center text-sm text-muted-foreground md:text-right">
            {isFetching && !isLoading ? "Refreshing..." : null}
            {data ? `${data.total} client${data.total === 1 ? "" : "s"}` : null}
          </p>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardHeader>
            <CardTitle>Loading clients</CardTitle>
            <CardDescription>Fetching the latest client records.</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {isError ? (
        <Alert variant="error" title="Unable to load clients">
          {error instanceof Error ? error.message : "Something went wrong."}
        </Alert>
      ) : null}

      {!isLoading && !isError && data && data.items.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No clients yet</CardTitle>
            <CardDescription>
              {search || status !== "all"
                ? "No clients match your current search or filter."
                : "Add your first client to start building marketing projects."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/clients/new">Add Client</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {data && data.items.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.items.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
          {data.total_pages > 1 ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Page {data.page} of {data.total_pages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={page >= data.total_pages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
