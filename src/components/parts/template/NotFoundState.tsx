import type { LucideIcon } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { BasicEmptyState } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type NotFoundStateProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
};

const NotFoundState = ({
  title = "Not found",
  description = "The resource you're looking for doesn't exist or has been removed.",
  icon: Icon = FileQuestion,
  className,
}: NotFoundStateProps) => {
  return (
    <BasicEmptyState
      Icon={Icon}
      title={title}
      message={description}
      className={cn("border border-dashed bg-muted/10 min-h-60 p-8", className)}
    />
  );
};

export default NotFoundState;
