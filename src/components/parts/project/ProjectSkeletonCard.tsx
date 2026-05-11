import { Skeleton } from "@/components/ui/skeleton";

const ProjectSkeletonCard = () => (
  <div className="flex flex-col gap-5 rounded-2xl border border-border/40 bg-card p-6 min-h-44">
    <Skeleton className="h-10 w-10 rounded-lg" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-56" />
    </div>
    <Skeleton className="mt-auto h-3 w-24" />
  </div>
);

export default ProjectSkeletonCard;
