import TokenCategoryCard from "@/components/parts/card/TokenCategoryCard";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Skeleton } from "@/components/ui/skeleton";
import { tokenCategoryIcons, tokenCategoryLabels } from "@/constants/token";
import { useTokenSummary } from "@/query/token";
import type { TokenCategory } from "@/types/token";

type DashboardTokenBreakdownProps = {
  workspaceSlug: string;
  projectSlug: string;
};

const DashboardTokenBreakdown = ({
  workspaceSlug,
  projectSlug,
}: DashboardTokenBreakdownProps) => {
  const summaryQuery = useTokenSummary(workspaceSlug, projectSlug);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="typography-small font-medium text-muted-foreground">
        Token Breakdown
      </h2>
      <QueryHandling
        queryResult={summaryQuery}
        renderLoading={
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: use index
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        }
        render={({
          data: {
            data: { summary },
          },
        }) => (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {Object.entries(tokenCategoryLabels).map(([key, label]) => {
              const count = summary.byCategory[key] ?? 0;
              const Icon = tokenCategoryIcons[key];
              return (
                <TokenCategoryCard
                  key={key}
                  category={key as TokenCategory}
                  label={label}
                  count={count}
                  icon={Icon ? <Icon className="size-4" /> : null}
                />
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default DashboardTokenBreakdown;
