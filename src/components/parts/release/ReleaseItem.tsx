import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RELEASE_STATUSES } from "@/constants/release";
import type { SafeRelease } from "@/types/release";

const ReleaseItem = ({ release }: { release: SafeRelease }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="font-mono typography-small font-medium">
            v{release.version}
          </span>
          {release.status === RELEASE_STATUSES.PENDING && (
            <Badge variant="outline" className="gap-1 text-muted-foreground">
              Pending
            </Badge>
          )}
          {release.status === RELEASE_STATUSES.RUNNING && (
            <Badge variant="outline-warning" className="gap-1">
              <Loader2 className="size-3 animate-spin" />
              Processing
            </Badge>
          )}
          {release.status === RELEASE_STATUSES.SUCCESS && (
            <Badge variant="outline-success">Success</Badge>
          )}
          {release.status === RELEASE_STATUSES.FAILED && (
            <Badge variant="outline-destructive">Failed</Badge>
          )}
          <span className="text-sm text-muted-foreground">
            {release.tokenCount ?? 0} tokens
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {format(new Date(release.createdAt), "dd MMM yyyy HH:mm")}
          </span>
        </div>
        {release.status === RELEASE_STATUSES.FAILED && release.error && (
          <p className="mt-1 typography-xsmall text-destructive">
            {release.error}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseItem;
