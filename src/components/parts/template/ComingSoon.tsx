import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";
import { BasicEmptyState } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type ComingSoonProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
};

const ComingSoon = ({
  title = "Coming Soon",
  description = "This feature is currently under construction and will be available in the next iteration.",
  icon: Icon = Construction,
  className,
}: ComingSoonProps) => {
  return (
    <BasicEmptyState
      Icon={Icon}
      title={title}
      message={description}
      className={cn("border border-dashed bg-muted/10 min-h-60 p-8", className)}
    />
  );
};

export default ComingSoon;
