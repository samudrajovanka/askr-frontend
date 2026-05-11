import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "@/endpoints/project";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/types/project";

export const getProjectsKey = (workspaceSlug: string) => [
  "projects",
  workspaceSlug,
];

export const useProjects = (workspaceSlug: string) => {
  const { execute: fetchProjects, isSignedIn } = useFetchAuth(getProjects);

  return useQuery({
    queryKey: getProjectsKey(workspaceSlug),
    enabled: isSignedIn && !!workspaceSlug,
    queryFn: () => fetchProjects(workspaceSlug),
  });
};

export const useCreateProject = (workspaceSlug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createProject);

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      execute(workspaceSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProjectsKey(workspaceSlug),
      });
    },
  });
};

export const getProjectKey = (workspaceSlug: string, projectSlug: string) => [
  "project",
  workspaceSlug,
  projectSlug,
];

export const useProject = (workspaceSlug: string, projectSlug: string) => {
  const { execute: fetchProject, isSignedIn } = useFetchAuth(getProject);

  return useQuery({
    queryKey: getProjectKey(workspaceSlug, projectSlug),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug,
    queryFn: () => fetchProject(workspaceSlug, projectSlug),
  });
};

export const useUpdateProject = (workspaceSlug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateProject);

  return useMutation({
    mutationFn: ({
      projectSlug,
      payload,
    }: {
      projectSlug: string;
      payload: UpdateProjectPayload;
    }) => execute(workspaceSlug, projectSlug, payload),
    onSuccess: (_, { projectSlug }) => {
      queryClient.invalidateQueries({
        queryKey: getProjectsKey(workspaceSlug),
      });
      queryClient.invalidateQueries({
        queryKey: getProjectKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteProject = (workspaceSlug: string) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteProject);

  return useMutation({
    mutationFn: (projectSlug: string) => execute(workspaceSlug, projectSlug),
    onSuccess: (_, projectSlug) => {
      queryClient.invalidateQueries({
        queryKey: getProjectsKey(workspaceSlug),
      });
      queryClient.removeQueries({
        queryKey: getProjectKey(workspaceSlug, projectSlug),
      });
    },
  });
};
