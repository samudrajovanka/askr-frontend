import type React from "react";
import type { StaticUsageMetric } from "@/types/workspace";

type MetricStaticProps = {
  icon?: React.ElementType;
  label: string;
  metric: StaticUsageMetric;
};

const MetricStatic = ({ icon: Icon, label, metric }: MetricStaticProps) => {
  return (
    <div className="flex justify-between gap-1 typography-small">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} />}
        <span>{label}</span>
      </div>
      <p className="text-muted-foreground">
        {metric.limit} {metric.unit}
      </p>
    </div>
  );
};

export default MetricStatic;
