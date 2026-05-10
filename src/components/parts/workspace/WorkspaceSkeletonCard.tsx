import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceSkeletonCard = () => (
  <div className="flex flex-col gap-5 rounded-2xl border border-border/40 bg-card p-6">
    <div className="flex w-full items-start justify-between">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="mt-auto h-3 w-28" />
  </div>
);

export default WorkspaceSkeletonCard;
