import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getWorkspace } from "@/endpoints/workspace";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getWorkspaceKey } from "@/query/workspace";

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
      queryKey: getWorkspaceKey(resolvedParams.workspaceSlug),
      queryFn: () => getWorkspace(token, resolvedParams.workspaceSlug),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
