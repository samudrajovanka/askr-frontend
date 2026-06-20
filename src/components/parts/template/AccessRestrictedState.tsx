import type { LucideIcon } from "lucide-react";
import { ShieldOff } from "lucide-react";
import { BasicEmptyState } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type AccessRestrictedStateProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
};

const AccessRestrictedState = ({
  title = "Access restricted",
  description = "You don't have permission to view this content.",
  icon: Icon = ShieldOff,
  className,
}: AccessRestrictedStateProps) => {
  return (
    <BasicEmptyState
      Icon={Icon}
      title={title}
      message={description}
      className={cn("border border-dashed bg-muted/10 min-h-60 p-8", className)}
    />
  );
};

export default AccessRestrictedState;
