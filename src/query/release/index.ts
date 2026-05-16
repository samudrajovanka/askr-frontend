import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRelease as createReleaseFn,
  getReleases,
} from "@/endpoints/release";
import { useFetchAuth } from "@/hooks/useFetchAuth";

export const getReleasesKey = (workspaceSlug: string, projectSlug: string) => [
  workspaceSlug,
  projectSlug,
  "releases",
];

export const useReleases = (workspaceSlug: string, projectSlug: string) => {
  const { execute, isSignedIn } = useFetchAuth(getReleases);

  return useQuery({
    queryKey: getReleasesKey(workspaceSlug, projectSlug),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug,
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
    mutationFn: () => execute(workspaceSlug, projectSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getReleasesKey(workspaceSlug, projectSlug),
      });
    },
  });
};
