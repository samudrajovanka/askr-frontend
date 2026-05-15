"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import GeneralSettingsLoading from "@/components/parts/settings/GeneralSettingsLoading";
import RegistrySettingsForm from "@/components/parts/settings/RegistrySettingsForm";
import { useRegistryConfig } from "@/query/registry";

const RegistrySettingsPage = () => {
  const params = useParams();
  const { workspaceSlug, projectSlug } = params as {
    workspaceSlug: string;
    projectSlug: string;
  };
  const registryQuery = useRegistryConfig(workspaceSlug, projectSlug);

  return (
    <QueryHandling
      queryResult={registryQuery}
      renderLoading={<GeneralSettingsLoading />}
      render={(data) => (
        <RegistrySettingsForm
          workspaceSlug={workspaceSlug}
          projectSlug={projectSlug}
          config={data.data.data.config}
        />
      )}
    />
  );
};

export default RegistrySettingsPage;
