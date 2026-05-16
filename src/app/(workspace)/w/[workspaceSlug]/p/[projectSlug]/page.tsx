import { redirect } from "next/navigation";

const ProjectRoute = async ({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) => {
  const resolvedParams = await params;
  redirect(
    `/w/${resolvedParams.workspaceSlug}/p/${resolvedParams.projectSlug}/dashboard`,
  );
};

export default ProjectRoute;
