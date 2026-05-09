import { auth } from '@clerk/nextjs/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Home from '@/components/pages/home/Home';
import generateMetadata from '@/lib/helpers/metadata';
import { getQueryClient } from '@/lib/helpers/queryClient';
import { getMeKey } from '@/query/auth';
import { getMe } from '@/endpoints/auth';

export const metadata = generateMetadata({ title: 'Home' }, { withSuffix: true });

const HomePage = async () => {
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
      <Home />
    </HydrationBoundary>
  );
};

export default HomePage;
