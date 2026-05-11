"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import GeneralSettingsForm from "@/components/parts/settings/GeneralSettingsForm";
import GeneralSettingsLoading from "@/components/parts/settings/GeneralSettingsLoading";
import { useWorkspace } from "@/query/workspace";

const GeneralSettingsPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const workspaceQuery = useWorkspace(workspaceSlug);

  return (
    <QueryHandling
      queryResult={workspaceQuery}
      renderLoading={<GeneralSettingsLoading />}
      render={({
        data: {
          data: { workspace },
        },
      }) => <GeneralSettingsForm workspace={workspace} />}
    />
  );
};

export default GeneralSettingsPage;
