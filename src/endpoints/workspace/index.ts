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

export const getWorkspace = async (token: string, slug: string) => {
  return await fetcher<SuccessResponseData<{ workspace: Workspace }>>(
    `/workspaces/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateWorkspace = async (
  token: string,
  slug: string,
  payload: CreateWorkspacePayload,
) => {
  return await fetcher<SuccessResponseData<{ workspace: Workspace }>>(
    `/workspaces/${slug}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
};

export const deleteWorkspace = async (token: string, slug: string) => {
  return await fetcher<SuccessResponseData<null>>(`/workspaces/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
