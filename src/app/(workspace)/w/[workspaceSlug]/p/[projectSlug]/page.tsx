import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const resolvedParams = await params;
  redirect(
    `/w/${resolvedParams.workspaceSlug}/p/${resolvedParams.projectSlug}/dashboard`,
  );
}
