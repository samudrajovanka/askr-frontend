import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ReleasePage from "@/components/pages/workspace/projects/release/ReleasePage";
import { getReleases } from "@/endpoints/release";
import generateMetadata from "@/lib/helpers/metadata";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getReleasesKey } from "@/query/release";

export const metadata = generateMetadata(
  { title: "Release" },
  { withSuffix: true },
);

const ReleaseRoute = async ({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) => {
  const queryClient = getQueryClient();
  const { getToken, userId } = await auth();

  const [token, resolvedParams] = await Promise.all([getToken(), params]);
  const defaultPagination = { page: 1, limit: 10 };

  if (token && userId) {
    await queryClient.prefetchQuery({
      queryKey: getReleasesKey(
        resolvedParams.workspaceSlug,
        resolvedParams.projectSlug,
        defaultPagination,
      ),
      queryFn: () =>
        getReleases(
          token,
          resolvedParams.workspaceSlug,
          resolvedParams.projectSlug,
          defaultPagination,
        ),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReleasePage />
    </HydrationBoundary>
  );
};

export default ReleaseRoute;
