import type React from "react";
import { Progress } from "@/components/ui/progress";
import type { UsageMetric } from "@/types/workspace";

type MetricProgresProps = {
  icon?: React.ElementType;
  label: string;
  metric: UsageMetric;
};

const MetricProgres = ({ icon: Icon, label, metric }: MetricProgresProps) => {
  const { current, limit } = metric;
  const isAtLimit = current >= limit;
  const percentage = Math.min(
    100,
    Math.round((current / Math.max(limit, 1)) * 100),
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between typography-small">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              className={isAtLimit ? "text-destructive" : undefined}
              size={18}
            />
          )}
          <span className={isAtLimit ? "text-destructive" : undefined}>
            {label}
          </span>
        </div>
        <span
          className={isAtLimit ? "text-destructive" : "text-muted-foreground"}
        >
          {current} / {limit}
        </span>
      </div>
      <Progress
        value={percentage}
        className={`w-full *:data-[slot=progress-track]:h-2 ${
          isAtLimit
            ? "[&>[data-slot=progress-track]>[data-slot=progress-indicator]]:bg-destructive"
            : ""
        }`}
      />
    </div>
  );
};

export default MetricProgres;
