import { fetcher } from "@/lib/helpers/fetcher";
import type { SuccessResponseData } from "@/types/response";
import type {
  CreateInvitationPayload,
  CreateWorkspacePayload,
  UpdateWorkspaceMemberPayload,
  Workspace,
  WorkspaceInvitation,
  WorkspaceInvitationsFilter,
  WorkspaceMember,
} from "@/types/workspace";

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

export const getWorkspaceMembers = async (token: string, slug: string) => {
  return await fetcher<SuccessResponseData<{ members: WorkspaceMember[] }>>(
    `/workspaces/${slug}/members`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateWorkspaceMember = async (
  token: string,
  slug: string,
  memberId: string,
  payload: UpdateWorkspaceMemberPayload,
) => {
  return await fetcher<SuccessResponseData<{ member: WorkspaceMember }>>(
    `/workspaces/${slug}/members/${memberId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
};

export const removeMember = async (
  token: string,
  slug: string,
  memberId: string,
) => {
  return await fetcher<SuccessResponseData<null>>(
    `/workspaces/${slug}/members/${memberId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getWorkspaceInvitations = async (
  token: string,
  slug: string,
  filter?: WorkspaceInvitationsFilter,
) => {
  const params: Record<string, string> = {};

  if (filter?.status) {
    params.status = filter.status;
  }

  return await fetcher<
    SuccessResponseData<{ invitations: WorkspaceInvitation[] }>
  >(`/workspaces/${slug}/invitations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};

export const createInvitation = async (
  token: string,
  slug: string,
  payload: CreateInvitationPayload,
) => {
  return await fetcher<
    SuccessResponseData<{ invitation: WorkspaceInvitation }>
  >(`/workspaces/${slug}/invitations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const cancelInvitation = async (
  token: string,
  slug: string,
  invitationId: string,
) => {
  return await fetcher<SuccessResponseData<null>>(
    `/workspaces/${slug}/invitations/${invitationId}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
