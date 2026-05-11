"use client";

import type { Workspace } from "@/types/workspace";
import DangerZoneSetting from "./DangerZoneSetting";
import WorkspaceSetting from "./WorkspaceSetting";

const GeneralSettingsForm = ({ workspace }: { workspace: Workspace }) => {
  return (
    <div className="flex flex-col gap-6">
      <WorkspaceSetting workspace={workspace} />
      <DangerZoneSetting />
    </div>
  );
};

export default GeneralSettingsForm;
