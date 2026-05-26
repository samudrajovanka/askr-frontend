import { format } from "date-fns";
import { Box, GitCompare, Package } from "lucide-react";
import SummaryCard from "@/components/parts/card/SummaryCard";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Skeleton } from "@/components/ui/skeleton";
import { useReleaseDiff, useReleases } from "@/query/release";
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
  const releasesQuery = useReleases(workspaceSlug, projectSlug);
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
            value={summary.total ?? 0}
          />
        )}
      />

      <QueryHandling
        queryResult={releasesQuery}
        renderLoading={<Skeleton className="h-28 w-full" />}
        render={({
          data: {
            data: { releases },
          },
        }) => {
          const latestRelease = (() => {
            if (!releases?.length) return null;
            const successful = releases.filter((r) => r.status === "success");
            return successful.length > 0 ? successful[0] : null;
          })();

          return (
            <SummaryCard
              icon={<Package className="size-5" />}
              label="Latest Release"
              value={
                latestRelease ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="typography-heading text-xl">
                      {latestRelease.version}
                    </span>
                    <span className="typography-xsmall text-muted-foreground">
                      {format(new Date(latestRelease.createdAt), "MMM d, yyyy")}
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
