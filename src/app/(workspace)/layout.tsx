import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getMe } from "@/endpoints/auth";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getMeKey } from "@/query/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}) {
  const queryClient = getQueryClient();
  const { getToken, userId } = await auth();

  const token = await getToken();

  if (token && userId) {
    await queryClient.prefetchQuery({
      queryKey: getMeKey(userId),
      queryFn: () => getMe(token),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
