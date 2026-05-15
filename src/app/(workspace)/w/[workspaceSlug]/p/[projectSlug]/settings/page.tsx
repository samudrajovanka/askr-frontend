import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
};

export default async function Page({ params }: Props) {
  const { workspaceSlug, projectSlug } = await params;

  redirect(`/w/${workspaceSlug}/p/${projectSlug}/settings/general`);
}
