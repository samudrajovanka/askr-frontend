import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createWorkspace, getWorkspaces } from "@/endpoints/workspace";
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
