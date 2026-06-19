import { fetcher } from "@/lib/helpers/fetcher";
import type {
  GetRegistryConfig,
  SafeRegistryConfig,
  SyncPackageNameResult,
} from "@/types/registry";
import type { SuccessResponseData } from "@/types/response";
import type { UpsertRegistryPayload } from "./type";

export const getRegistryConfig = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
) => {
  return await fetcher<
    SuccessResponseData<{ config: GetRegistryConfig | null }>
  >(`/workspaces/${workspaceSlug}/projects/${projectSlug}/registry`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const upsertRegistryConfig = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: UpsertRegistryPayload,
) => {
  return await fetcher<SuccessResponseData<{ config: SafeRegistryConfig }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/registry`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );
};

export const syncPackageName = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
) => {
  return await fetcher<SuccessResponseData<SyncPackageNameResult>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/registry/package-name/sync`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
