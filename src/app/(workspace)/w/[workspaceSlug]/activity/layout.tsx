import WorkspaceLayout from "@/components/layout/WorkspaceLayout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  return (
    <WorkspaceLayout showWorkspaceSwitcher workspaceSlug={workspaceSlug}>
      {children}
    </WorkspaceLayout>
  );
}
