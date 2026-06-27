import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createRelease as createReleaseFn,
  getLatestRelease,
  getReleaseDiff,
  getReleases,
} from "@/endpoints/release";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type { PaginationParams } from "@/types/pagination";
import type { VersionBumpType } from "@/types/version";

export const getReleasesKey = (
  workspaceSlug: string,
  projectSlug: string,
  pagination?: PaginationParams,
) => [workspaceSlug, projectSlug, "releases", pagination];

export const getReleaseDiffKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [workspaceSlug, projectSlug, "releases", "diff"];

export const useReleases = (
  workspaceSlug: string,
  projectSlug: string,
  pagination?: PaginationParams,
) => {
  const { execute, isSignedIn } = useFetchAuth(getReleases);

  return useQuery({
    queryKey: getReleasesKey(workspaceSlug, projectSlug, pagination),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug,
    queryFn: () => execute(workspaceSlug, projectSlug, pagination),
    placeholderData: keepPreviousData,
    refetchInterval: (query) => {
      const releases = query.state.data?.data?.data?.releases;
      if (!releases) return false;
      const hasActive = releases.some(
        (r) => r.status === "pending" || r.status === "running",
      );
      return hasActive ? 5000 : false;
    },
  });
};

export const getLatestReleaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [workspaceSlug, projectSlug, "releases", "latest"];

export const useLatestRelease = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const { execute, isSignedIn } = useFetchAuth(getLatestRelease);

  return useQuery({
    queryKey: getLatestReleaseKey(workspaceSlug, projectSlug),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug,
    queryFn: () => execute(workspaceSlug, projectSlug),
    refetchInterval: (query) => {
      const release = query.state.data?.data?.data?.release;
      if (!release) return false;
      return release.status === "pending" || release.status === "running"
        ? 5000
        : false;
    },
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
      queryClient.invalidateQueries({
        queryKey: getLatestReleaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};
