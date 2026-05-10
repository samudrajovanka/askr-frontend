import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import WorkspacesPage from "@/components/pages/workspace/WorkspacesPage";
import { getWorkspaces } from "@/endpoints/workspace";
import generateMetadata from "@/lib/helpers/metadata";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getWorkspacesKey } from "@/query/workspace";

export const metadata = generateMetadata(
  { title: "Workspaces" },
  { withSuffix: true },
);

const WorkspacesRoute = async () => {
  const queryClient = getQueryClient();
  const { getToken, userId } = await auth();
  const token = await getToken();

  if (token && userId) {
    await queryClient.prefetchQuery({
      queryKey: getWorkspacesKey(),
      queryFn: () => getWorkspaces(token),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspacesPage />
    </HydrationBoundary>
  );
};

export default WorkspacesRoute;
