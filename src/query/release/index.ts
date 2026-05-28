import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRelease as createReleaseFn,
  getReleaseDiff,
  getReleases,
} from "@/endpoints/release";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type { VersionBumpType } from "@/types/version";

export const getReleasesKey = (workspaceSlug: string, projectSlug: string) => [
  workspaceSlug,
  projectSlug,
  "releases",
];

export const getReleaseDiffKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [workspaceSlug, projectSlug, "releases", "diff"];

export const useReleases = (workspaceSlug: string, projectSlug: string) => {
  const { execute, isSignedIn } = useFetchAuth(getReleases);

  return useQuery({
    queryKey: getReleasesKey(workspaceSlug, projectSlug),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug,
    queryFn: () => execute(workspaceSlug, projectSlug),
  });
};

export const useReleaseDiff = (
  workspaceSlug: string,
  projectSlug: string,
  enabled = true,
) => {
  const { execute, isSignedIn } = useFetchAuth(getReleaseDiff);

  return useQuery({
    queryKey: getReleaseDiffKey(workspaceSlug, projectSlug),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug && enabled,
    staleTime: 0,
    queryFn: () => execute(workspaceSlug, projectSlug),
  });
};

export const useCreateRelease = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createReleaseFn);

  return useMutation({
    mutationFn: (body: { bumpType: VersionBumpType; notes: string }) =>
      execute(workspaceSlug, projectSlug, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getReleasesKey(workspaceSlug, projectSlug),
      });
      queryClient.invalidateQueries({
        queryKey: getReleaseDiffKey(workspaceSlug, projectSlug),
      });
    },
    onError: () => {
      // Invalidate releases so the failed record appears in the list
      queryClient.invalidateQueries({
        queryKey: getReleasesKey(workspaceSlug, projectSlug),
      });
    },
  });
};
