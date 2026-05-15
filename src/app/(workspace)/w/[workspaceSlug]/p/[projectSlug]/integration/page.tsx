import IntegrationPage from "@/components/pages/workspace/projects/integration/IntegrationPage";

type Props = {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
};

export default async function Page({ params }: Props) {
  const { workspaceSlug, projectSlug } = await params;

  return (
    <IntegrationPage workspaceSlug={workspaceSlug} projectSlug={projectSlug} />
  );
}
