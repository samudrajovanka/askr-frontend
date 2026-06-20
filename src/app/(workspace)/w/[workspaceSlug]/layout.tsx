import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getWorkspace } from "@/endpoints/workspace";
import { FetchError } from "@/lib/helpers/fetcher";
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
    try {
      await queryClient.ensureQueryData({
        queryKey: getWorkspaceKey(resolvedParams.workspaceSlug),
        queryFn: () => getWorkspace(token, resolvedParams.workspaceSlug),
      });
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.status === 403 || error.status === 404) {
          return notFound();
        }
      }
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
