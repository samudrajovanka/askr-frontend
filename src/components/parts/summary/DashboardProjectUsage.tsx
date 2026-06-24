"use client";

import { Coins } from "lucide-react";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectUsage } from "@/query/project";

type DashboardProjectUsageProps = {
  workspaceSlug: string;
  projectSlug: string;
};

const DashboardProjectUsage = ({
  workspaceSlug,
  projectSlug,
}: DashboardProjectUsageProps) => {
  const usageQuery = useProjectUsage(workspaceSlug, projectSlug);

  return (
    <QueryHandling
      queryResult={usageQuery}
      renderLoading={<Skeleton className="h-28 w-full" />}
      render={({
        data: {
          data: { token },
        },
      }) => {
        const { current, limit } = token;
        const isAtLimit = current >= limit;
        const pct = Math.min(
          100,
          Math.round((current / Math.max(limit, 1)) * 100),
        );

        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                <Coins className="size-5" />
                Token Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p
                className={
                  isAtLimit
                    ? "text-destructive text-2xl font-bold"
                    : "text-2xl font-bold text-muted-foreground"
                }
              >
                {current} / {limit}
              </p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${isAtLimit ? "bg-destructive" : "bg-primary"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </CardContent>
          </Card>
        );
      }}
    />
  );
};

export default DashboardProjectUsage;
