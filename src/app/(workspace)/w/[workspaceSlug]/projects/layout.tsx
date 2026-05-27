import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { getProjects } from "@/endpoints/project";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getProjectsKey } from "@/query/project";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}) {
  const queryClient = getQueryClient();
  const { getToken, userId } = await auth();

  const [token, resolvedParams] = await Promise.all([getToken(), params]);

  if (token && userId) {
    await queryClient.prefetchQuery({
      queryKey: getProjectsKey(resolvedParams.workspaceSlug),
      queryFn: () => getProjects(token, resolvedParams.workspaceSlug),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceLayout showWorkspaceSwitcher>{children}</WorkspaceLayout>
    </HydrationBoundary>
  );
}
