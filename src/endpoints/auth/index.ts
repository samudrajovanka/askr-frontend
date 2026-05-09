import { fetcher } from "@/lib/helpers/fetcher";
import { SuccessResponseData } from "@/types.ts/response";
import { UserMe } from "@/types.ts/user";

export const getMe = async (token: string) => {
  return await fetcher<SuccessResponseData<{ user: UserMe }>>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
