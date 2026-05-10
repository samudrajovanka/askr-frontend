import { fetcher } from "@/lib/helpers/fetcher";
import type { SuccessResponseData } from "@/types/response";
import type { UserMe } from "@/types/user";

export const getMe = async (token: string) => {
  return await fetcher<SuccessResponseData<{ user: UserMe }>>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
