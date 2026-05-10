import { fetcher } from "@/lib/helpers/fetcher";
import type { SuccessResponseData } from "@/types/response";
import type { CreateWorkspacePayload, Workspace } from "@/types/workspace";

export const getWorkspaces = async (token: string) => {
  return await fetcher<SuccessResponseData<{ workspaces: Workspace[] }>>(
    "/workspaces",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createWorkspace = async (
  token: string,
  payload: CreateWorkspacePayload,
) => {
  return await fetcher<SuccessResponseData<{ workspace: Workspace }>>(
    "/workspaces",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
};
