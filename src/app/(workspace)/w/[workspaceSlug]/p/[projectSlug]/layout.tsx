import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { getProject } from "@/endpoints/project";
import { FetchError } from "@/lib/helpers/fetcher";
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
    try {
      await queryClient.ensureQueryData({
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
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.status === 404) {
          return notFound();
        }
      }
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectLayout>{children}</ProjectLayout>
    </HydrationBoundary>
  );
}
