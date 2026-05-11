import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "@/endpoints/workspace";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type { CreateWorkspacePayload } from "@/types/workspace";

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
