import { Layers } from "lucide-react";
import SummaryCard from "@/components/parts/card/SummaryCard";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Skeleton } from "@/components/ui/skeleton";
import { tokenLayerLabels } from "@/constants/token";
import { useTokenSummary } from "@/query/token";

type DashboardLayerBreakdownProps = {
  workspaceSlug: string;
  projectSlug: string;
};

const DashboardLayerBreakdown = ({
  workspaceSlug,
  projectSlug,
}: DashboardLayerBreakdownProps) => {
  const summaryQuery = useTokenSummary(workspaceSlug, projectSlug);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="typography-small font-medium text-muted-foreground flex items-center gap-1.5">
        <Layers className="size-3.5" />
        By Layer
      </h2>
      <QueryHandling
        queryResult={summaryQuery}
        renderLoading={
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        }
        render={({
          data: {
            data: { summary },
          },
        }) => (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(tokenLayerLabels).map(([key, label]) => {
              const count = summary.byLayer[key] ?? 0;
              return <SummaryCard key={key} label={label} value={count} />;
            })}
          </div>
        )}
      />
    </div>
  );
};

export default DashboardLayerBreakdown;
