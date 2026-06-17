import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProjectDashboardPage from "@/components/pages/workspace/projects/dashboard/ProjectDashboardPage";
import { getTokenSummary } from "@/endpoints/token";
import generateMetadata from "@/lib/helpers/metadata";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getTokenSummaryKey } from "@/query/token";

export const metadata = generateMetadata(
  { title: "Dashboard" },
  { withSuffix: true },
);

const ProjectDashboardRoute = async ({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) => {
  const queryClient = getQueryClient();
  const { getToken, userId } = await auth();

  const [token, resolvedParams] = await Promise.all([getToken(), params]);

  if (token && userId) {
    await queryClient.prefetchQuery({
      queryKey: getTokenSummaryKey(
        resolvedParams.workspaceSlug,
        resolvedParams.projectSlug,
      ),
      queryFn: () =>
        getTokenSummary(
          token,
          resolvedParams.workspaceSlug,
          resolvedParams.projectSlug,
        ),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDashboardPage />
    </HydrationBoundary>
  );
};

export default ProjectDashboardRoute;
