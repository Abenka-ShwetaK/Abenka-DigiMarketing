import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CLIENT_STATUS_LABELS, formatDate } from "@/lib/clients";
import type { Client } from "@/types";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} className="group block h-full">
      <Card className="h-full transition-colors group-hover:border-primary/40 group-hover:bg-muted/30">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate text-lg">{client.company_name}</CardTitle>
              <CardDescription className="mt-1">
                {client.industry || "Industry not set"}
              </CardDescription>
            </div>
            <Badge variant="outline">{CLIENT_STATUS_LABELS[client.status]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            {client.contact_person || "No contact person"}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{client.email || "No email"}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            {client.phone || "No phone"}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {client.location || "No location"}
          </p>
          <p className="pt-2 text-xs">Updated {formatDate(client.updated_at)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
