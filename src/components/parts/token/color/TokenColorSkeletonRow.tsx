import { Skeleton } from "@/components/ui/skeleton";

const TokenColorSkeletonRow = () => (
  <div className="flex items-center gap-4 px-4 py-3 border-b border-border/40">
    <Skeleton className="h-8 w-8 rounded-md shrink-0" />
    <div className="flex flex-col gap-1.5 flex-1">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-24" />
    </div>
    <Skeleton className="h-5 w-16 rounded-full" />
    <Skeleton className="h-7 w-7 rounded-md" />
  </div>
);

export default TokenColorSkeletonRow;
