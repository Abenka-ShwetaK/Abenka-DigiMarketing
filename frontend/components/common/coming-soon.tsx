import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ComingSoon({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <Badge>Coming in a future phase</Badge>
        </div>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        This screen is part of the application shell only. The workflow is not implemented yet.
      </CardContent>
    </Card>
  );
}
