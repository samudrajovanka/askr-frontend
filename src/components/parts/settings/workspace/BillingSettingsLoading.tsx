import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BillingSettingsLoading = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4 mb-1.5" />
        <Skeleton className="h-4 w-3/5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-2 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSettingsLoading;
