"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import BillingSetting from "@/components/parts/settings/workspace/BillingSetting";
import BillingSettingsLoading from "@/components/parts/settings/workspace/BillingSettingsLoading";
import { useWorkspaceUsage } from "@/query/workspace";

const BillingSettingsPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const usageQuery = useWorkspaceUsage(workspaceSlug);

  return (
    <QueryHandling
      queryResult={usageQuery}
      renderLoading={<BillingSettingsLoading />}
      render={({ data: { data } }) => <BillingSetting usage={data} />}
    />
  );
};

export default BillingSettingsPage;
