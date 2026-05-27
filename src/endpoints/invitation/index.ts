import { fetcher } from "@/lib/helpers/fetcher";
import type { MyPendingInvitation } from "@/types/invitation";
import type {
  SuccessGeneralResponse,
  SuccessResponseData,
} from "@/types/response";

export const acceptInvitation = async (token: string, inviteToken: string) => {
  return await fetcher<SuccessGeneralResponse>(
    "/workspaces/invitations/accept",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token: inviteToken }),
    },
  );
};

export const declineInvitation = async (token: string, inviteToken: string) => {
  return await fetcher<SuccessGeneralResponse>(
    "/workspaces/invitations/decline",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token: inviteToken }),
    },
  );
};

export const getMyInvitations = async (token: string) => {
  return await fetcher<
    SuccessResponseData<{ invitations: MyPendingInvitation[] }>
  >("/workspaces/invitations/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
