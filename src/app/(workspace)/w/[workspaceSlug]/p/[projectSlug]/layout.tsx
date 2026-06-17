import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProjectLayout from "@/components/layout/ProjectLayout";
import { getProject } from "@/endpoints/project";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getProjectKey } from "@/query/project";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const queryClient = getQueryClient();
  const { getToken, userId } = await auth();

  const [token, resolvedParams] = await Promise.all([getToken(), params]);

  if (token && userId) {
    await queryClient.prefetchQuery({
      queryKey: getProjectKey(
        resolvedParams.workspaceSlug,
        resolvedParams.projectSlug,
      ),
      queryFn: () =>
        getProject(
          token,
          resolvedParams.workspaceSlug,
          resolvedParams.projectSlug,
        ),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectLayout>{children}</ProjectLayout>
    </HydrationBoundary>
  );
}
