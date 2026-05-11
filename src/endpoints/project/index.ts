import { fetcher } from "@/lib/helpers/fetcher";
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "@/types/project";
import type { SuccessResponseData } from "@/types/response";

export const getProjects = async (token: string, workspaceSlug: string) => {
  return await fetcher<SuccessResponseData<{ projects: Project[] }>>(
    `/workspaces/${workspaceSlug}/projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createProject = async (
  token: string,
  workspaceSlug: string,
  payload: CreateProjectPayload,
) => {
  return await fetcher<SuccessResponseData<{ project: Project }>>(
    `/workspaces/${workspaceSlug}/projects`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
};

export const getProject = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
) => {
  return await fetcher<SuccessResponseData<{ project: Project }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const updateProject = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: UpdateProjectPayload,
) => {
  return await fetcher<SuccessResponseData<{ project: Project }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
};

export const deleteProject = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
) => {
  return await fetcher<SuccessResponseData<null>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
