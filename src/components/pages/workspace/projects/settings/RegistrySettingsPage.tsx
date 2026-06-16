"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import RegistrySetting from "@/components/parts/settings/project/RegistrySetting";
import GeneralSettingsLoading from "@/components/parts/settings/workspace/GeneralSettingsLoading";
import { useRegistryConfig } from "@/query/registry";

const RegistrySettingsPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();
  const registryQuery = useRegistryConfig(workspaceSlug, projectSlug);

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
