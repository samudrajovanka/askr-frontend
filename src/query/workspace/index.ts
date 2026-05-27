import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelInvitation,
  createInvitation,
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  getWorkspaceInvitations,
  getWorkspaceMembers,
  getWorkspaces,
  removeMember,
  updateWorkspace,
  updateWorkspaceMember,
} from "@/endpoints/workspace";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type {
  CreateInvitationPayload,
  CreateWorkspacePayload,
  UpdateWorkspaceMemberPayload,
  WorkspaceInvitationsFilter,
} from "@/types/workspace";

export const getWorkspacesKey = () => ["workspaces"];

export const useWorkspaces = () => {
  const { execute: fetchWorkspaces, isSignedIn } = useFetchAuth(getWorkspaces);

  return useQuery({
    queryKey: getWorkspacesKey(),
    enabled: isSignedIn,
    queryFn: fetchWorkspaces,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createWorkspace);

  return useMutation({
    mutationFn: (payload: CreateWorkspacePayload) => execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWorkspacesKey() });
    },
  });
};

export const getWorkspaceKey = (slug: string) => ["workspace", slug];

export const useWorkspace = (slug: string) => {
  const { execute: fetchWorkspace, isSignedIn } = useFetchAuth(getWorkspace);

  return useQuery({
    queryKey: getWorkspaceKey(slug),
    enabled: isSignedIn && !!slug,
    queryFn: () => fetchWorkspace(slug),
  });
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateWorkspace);

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: CreateWorkspacePayload;
    }) => execute(slug, payload),
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries({ queryKey: getWorkspacesKey() });
      queryClient.invalidateQueries({ queryKey: getWorkspaceKey(slug) });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteWorkspace);

  return useMutation({
    mutationFn: (slug: string) => execute(slug),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: getWorkspacesKey() });
      queryClient.removeQueries({ queryKey: getWorkspaceKey(slug) });
    },
  });
};

export const getWorkspaceMembersKey = (slug: string) => [
  "workspace",
  "members",
  slug,
];

export const useWorkspaceMembers = (slug: string) => {
  const { execute: fetchMembers, isSignedIn } =
    useFetchAuth(getWorkspaceMembers);

  return useQuery({
    queryKey: getWorkspaceMembersKey(slug),
    enabled: isSignedIn && !!slug,
    queryFn: () => fetchMembers(slug),
  });
};

export const useUpdateWorkspaceMember = (slug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateWorkspaceMember);

  return useMutation({
    mutationFn: ({
      memberId,
      payload,
    }: {
      memberId: string;
      payload: UpdateWorkspaceMemberPayload;
    }) => execute(slug, memberId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWorkspaceMembersKey(slug),
      });
    },
  });
};

export const useRemoveMember = (slug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(removeMember);

  return useMutation({
    mutationFn: (memberId: string) => execute(slug, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWorkspaceMembersKey(slug),
      });
    },
  });
};

export const getWorkspaceInvitationsKey = (slug: string) => [
  "workspace",
  "invitations",
  slug,
];

export const useWorkspaceInvitations = (
  slug: string,
  filter?: WorkspaceInvitationsFilter,
) => {
  const { execute: fetchInvitations, isSignedIn } = useFetchAuth(
    getWorkspaceInvitations,
  );

  return useQuery({
    queryKey: [...getWorkspaceInvitationsKey(slug), filter],
    enabled: isSignedIn && !!slug,
    queryFn: () => fetchInvitations(slug, filter),
  });
};

export const useCreateInvitation = (slug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createInvitation);

  return useMutation({
    mutationFn: (payload: CreateInvitationPayload) => execute(slug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWorkspaceInvitationsKey(slug),
      });
    },
  });
};

export const useCancelInvitation = (slug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(cancelInvitation);

  return useMutation({
    mutationFn: (invitationId: string) => execute(slug, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWorkspaceInvitationsKey(slug),
      });
    },
  });
};
