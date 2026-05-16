import IntegrationPage from "@/components/pages/workspace/projects/integration/IntegrationPage";

type Props = {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
};

const IntegrationRoute = async ({ params }: Props) => {
  const { workspaceSlug, projectSlug } = await params;

  return (
    <IntegrationPage workspaceSlug={workspaceSlug} projectSlug={projectSlug} />
  );
};

export default IntegrationRoute;
