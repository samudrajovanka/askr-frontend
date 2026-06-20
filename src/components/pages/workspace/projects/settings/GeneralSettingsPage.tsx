"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import DangerZoneSetting from "@/components/parts/settings/project/DangerZoneSetting";
import GeneralSetting from "@/components/parts/settings/project/GeneralSetting";
import GeneralSettingsLoading from "@/components/parts/settings/workspace/GeneralSettingsLoading";
import { usePermission } from "@/hooks/usePermission";
import { useProject } from "@/query/project";

const GeneralSettingsPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();
  const projectQuery = useProject(workspaceSlug, projectSlug);
  const { hasPermission } = usePermission(workspaceSlug);

  const canDelete = hasPermission("project:delete");

  return (
    <QueryHandling
      queryResult={projectQuery}
      renderLoading={<GeneralSettingsLoading />}
      render={({
        data: {
          data: { project },
        },
      }) => (
        <div className="flex flex-col gap-6">
          <GeneralSetting project={project} workspaceSlug={workspaceSlug} />
          {canDelete && (
            <DangerZoneSetting
              project={project}
              workspaceSlug={workspaceSlug}
            />
          )}
        </div>
      )}
    />
  );
};

export default GeneralSettingsPage;
