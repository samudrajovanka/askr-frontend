import { redirect } from "next/navigation";

const WorkspaceSettingsRoute = async ({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) => {
  const resolvedParams = await params;
  redirect(`/w/${resolvedParams.workspaceSlug}/settings/general`);
};

export default WorkspaceSettingsRoute;
