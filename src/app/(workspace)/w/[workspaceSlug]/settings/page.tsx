import { redirect } from "next/navigation";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/w/${resolvedParams.workspaceSlug}/settings/general`);
}
