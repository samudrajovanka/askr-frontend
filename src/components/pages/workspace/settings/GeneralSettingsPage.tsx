"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import DangerZoneSetting from "@/components/parts/settings/workspace/DangerZoneSetting";
import GeneralSetting from "@/components/parts/settings/workspace/GeneralSetting";
import GeneralSettingsLoading from "@/components/parts/settings/workspace/GeneralSettingsLoading";
import { usePermission } from "@/hooks/usePermission";
import { useWorkspace } from "@/query/workspace";

const GeneralSettingsPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const workspaceQuery = useWorkspace(workspaceSlug);
  const { hasPermission } = usePermission(workspaceSlug);

  const canDelete = hasPermission("workspace:delete");

  return (
    <QueryHandling
      queryResult={workspaceQuery}
      renderLoading={<GeneralSettingsLoading />}
      render={({
        data: {
          data: { workspace },
        },
      }) => (
        <div className="flex flex-col gap-6">
          <GeneralSetting workspace={workspace} />
          {canDelete && <DangerZoneSetting />}
        </div>
      )}
    />
  );
};

export default GeneralSettingsPage;
