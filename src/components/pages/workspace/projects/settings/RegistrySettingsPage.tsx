"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import RegistrySetting from "@/components/parts/settings/project/RegistrySetting";
import GeneralSettingsLoading from "@/components/parts/settings/workspace/GeneralSettingsLoading";
import AccessRestrictedState from "@/components/parts/template/AccessRestrictedState";
import { usePermission } from "@/hooks/usePermission";
import { useRegistryConfig } from "@/query/registry";

const RegistrySettingsPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();
  const { hasPermission, isFetched } = usePermission(workspaceSlug);
  const canRead = hasPermission("registry:read");
  const registryQuery = useRegistryConfig(workspaceSlug, projectSlug);

  if (isFetched && !canRead) {
    return (
      <AccessRestrictedState description="You don't have permission to view the registry configuration." />
    );
  }

  return (
    <QueryHandling
      queryResult={registryQuery}
      renderLoading={<GeneralSettingsLoading />}
      render={(data) => (
        <RegistrySetting
          workspaceSlug={workspaceSlug}
          projectSlug={projectSlug}
          config={data.data.data.config}
        />
      )}
    />
  );
};

export default RegistrySettingsPage;
