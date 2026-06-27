import { format } from "date-fns";
import { Box, GitCompare, Package } from "lucide-react";
import SummaryCard from "@/components/parts/card/SummaryCard";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectUsage } from "@/query/project";
import { useLatestRelease, useReleaseDiff } from "@/query/release";
import { useTokenSummary } from "@/query/token";

type DashboardSummaryProps = {
  workspaceSlug: string;
  projectSlug: string;
};

const DashboardSummary = ({
  workspaceSlug,
  projectSlug,
}: DashboardSummaryProps) => {
  const summaryQuery = useTokenSummary(workspaceSlug, projectSlug);
  const projectUsageQuery = useProjectUsage(workspaceSlug, projectSlug);
  const latestReleaseQuery = useLatestRelease(workspaceSlug, projectSlug);
  const diffQuery = useReleaseDiff(workspaceSlug, projectSlug);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <QueryHandling
        queryResult={summaryQuery}
        renderLoading={<Skeleton className="h-28 w-full" />}
        render={({
          data: {
            data: { summary },
          },
        }) => (
          <SummaryCard
            icon={<Box className="size-5" />}
            label="Total Tokens"
            value={
              <div className="flex flex-col gap-0.5">
                <span className="typography-heading text-xl">
                  {summary.total ?? 0}
                </span>
                <QueryHandling
                  queryResult={projectUsageQuery}
                  renderLoading={<Skeleton className="h-3 w-full" />}
                  render={({
                    data: {
                      data: { token },
                    },
                  }) => (
                    <span className="typography-xsmall text-muted-foreground">
                      / {token.limit}
                    </span>
                  )}
                />
              </div>
            }
          />
        )}
      />

      <QueryHandling
        queryResult={latestReleaseQuery}
        renderLoading={<Skeleton className="h-28 w-full" />}
        render={({
          data: {
            data: { release },
          },
        }) => {
          return (
            <SummaryCard
              icon={<Package className="size-5" />}
              label="Latest Release"
              value={
                release ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="typography-heading text-xl">
                      {release.version}
                    </span>
                    <span className="typography-xsmall text-muted-foreground">
                      {format(new Date(release.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                ) : (
                  <span className="typography-small text-muted-foreground">
                    No releases yet
                  </span>
                )
              }
            />
          );
        }}
      />

      <QueryHandling
        queryResult={diffQuery}
        renderLoading={<Skeleton className="h-28 w-full" />}
        render={({
          data: {
            data: { diff },
          },
        }) => {
          const hasUnpublishedChanges = diff.hasChanges ?? false;

          return (
            <SummaryCard
              icon={<GitCompare className="size-5" />}
              label="Unpublished Changes"
              value={
                <div className="flex items-center gap-2">
                  <div
                    className={`size-2 rounded-full ${
                      hasUnpublishedChanges
                        ? "bg-green-500"
                        : "bg-muted-foreground/40"
                    }`}
                  />
                  <span className="text-sm">
                    {hasUnpublishedChanges ? "Yes" : "None"}
                  </span>
                </div>
              }
            />
          );
        }}
      />
    </div>
  );
};

export default DashboardSummary;
