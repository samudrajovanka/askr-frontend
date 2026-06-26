import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AnnouncementBar from "@/components/parts/announcement/AnnouncementBar";
import MobileBlocker from "@/components/parts/mobile-blocker/MobileBlocker";
import app from "@/config/app";
import { getMe } from "@/endpoints/auth";
import { getQueryClient } from "@/lib/helpers/queryClient";
import { getMeKey } from "@/query/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
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
      <div className="relative min-h-screen w-full">
        <AnnouncementBar
          storageKey="beta-announcement-v1"
          message="Askr is in beta — we'd love your feedback!"
          actionLabel="Give feedback"
          actionHref={app.feedbackFormUrl}
        />
        <MobileBlocker />

        <div className="hidden md:block min-h-screen w-full">{children}</div>
      </div>
    </HydrationBoundary>
  );
}
