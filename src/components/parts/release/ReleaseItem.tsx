import { format, isToday } from "date-fns";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { BasicAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Code from "@/components/ui/code";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { RELEASE_STATUSES } from "@/constants/release";
import type { SafeRelease } from "@/types/release";

const statusMap: Record<
  SafeRelease["status"],
  { content: string; icon: React.ReactNode }
> = {
  [RELEASE_STATUSES.PENDING]: {
    content: "Pending",
    icon: <Clock className="size-4 text-muted-foreground" />,
  },
  [RELEASE_STATUSES.RUNNING]: {
    content: "Processing",
    icon: (
      <Loader2 className="size-4 animate-spin text-amber-600 dark:text-amber-400" />
    ),
  },
  [RELEASE_STATUSES.SUCCESS]: {
    content: "Success",
    icon: (
      <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
    ),
  },
  [RELEASE_STATUSES.FAILED]: {
    content: "Failed",
    icon: <XCircle className="size-4 text-destructive" />,
  },
};

const ReleaseItem = ({ release }: { release: SafeRelease }) => {
  const statusConfig = statusMap[release.status];

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <SimpleTooltip content={statusConfig.content} className="mt-1">
              {statusConfig.icon}
            </SimpleTooltip>

            <div className="flex flex-col flex-1 space-y-1">
              <p className="typography-normal font-medium">{release.notes}</p>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  v{release.version}
                </Badge>

                <span className="typography-small text-muted-foreground">
                  {release.tokenCount ?? 0} tokens
                </span>
              </div>

              <Code className="typography-xsmall">
                {release.packageName}-tokens
              </Code>

              {release.status === RELEASE_STATUSES.FAILED && release.error && (
                <p className="typography-xsmall text-destructive">
                  {release.error}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              {release.creator && (
                <SimpleTooltip content={`Trigger by ${release.creator.email}`}>
                  <div className="flex cursor-default items-center">
                    <BasicAvatar
                      avatarUrl={release.creator.avatarUrl}
                      name={release.creator.name}
                      size="sm"
                    />
                  </div>
                </SimpleTooltip>
              )}

              <span className="ml-auto typography-xsmall text-muted-foreground">
                {isToday(new Date(release.createdAt))
                  ? `Today at ${format(new Date(release.createdAt), "HH:mm")}`
                  : format(new Date(release.createdAt), "dd MMM yyyy HH:mm")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseItem;
