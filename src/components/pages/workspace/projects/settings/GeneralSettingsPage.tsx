"use client";

import { useParams } from "next/navigation";
import QueryHandling from "@/components/parts/query/QueryHandling";
import DangerZoneSetting from "@/components/parts/settings/project/DangerZoneSetting";
import GeneralSetting from "@/components/parts/settings/project/GeneralSetting";
import GeneralSettingsLoading from "@/components/parts/settings/workspace/GeneralSettingsLoading";
import { useProject } from "@/query/project";

const GeneralSettingsPage = () => {
  const params = useParams();
  const { workspaceSlug, projectSlug } = params as {
    workspaceSlug: string;
    projectSlug: string;
  };
  const projectQuery = useProject(workspaceSlug, projectSlug);

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
          <DangerZoneSetting project={project} workspaceSlug={workspaceSlug} />
        </div>
      )}
    />
  );
};

export default GeneralSettingsPage;
