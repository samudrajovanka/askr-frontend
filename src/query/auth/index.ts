import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/endpoints/auth";
import { useFetchAuth } from "@/hooks/useFetchAuth";

export const getMeKey = (userId: string | null | undefined) => ["me", userId];

export const useMe = () => {
  const { execute: fetchMe, isSignedIn, userId } = useFetchAuth(getMe);

  return useQuery({
    queryKey: getMeKey(userId),
    enabled: isSignedIn,
    queryFn: fetchMe,
  });
};
