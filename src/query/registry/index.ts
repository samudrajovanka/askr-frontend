import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRegistryConfig,
  syncPackageName as syncPackageNameFn,
  upsertRegistryConfig as upsertRegistryConfigFn,
} from "@/endpoints/registry";
import type { UpsertRegistryPayload } from "@/endpoints/registry/type";
import { useFetchAuth } from "@/hooks/useFetchAuth";

export const getRegistryConfigKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [workspaceSlug, projectSlug, "registry", "config"];

export const useRegistryConfig = (
  workspaceSlug: string,
  projectSlug: string,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getRegistryConfig);

  return useQuery({
    queryKey: getRegistryConfigKey(workspaceSlug, projectSlug),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug),
  });
};

export const useUpsertRegistryConfig = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(upsertRegistryConfigFn);

  return useMutation({
    mutationFn: (payload: UpsertRegistryPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getRegistryConfigKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useSyncPackageName = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(syncPackageNameFn);

  return useMutation({
    mutationFn: () => execute(workspaceSlug, projectSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getRegistryConfigKey(workspaceSlug, projectSlug),
      });
    },
  });
};
