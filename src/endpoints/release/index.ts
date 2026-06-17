import { fetcher } from "@/lib/helpers/fetcher";
import type { PaginationParams } from "@/types/pagination";
import type { ReleaseDiff, SafeRelease } from "@/types/release";
import type { SuccessResponseData } from "@/types/response";
import type { VersionBumpType } from "@/types/version";

export const getReleases = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  pagination?: PaginationParams,
) => {
  const params: Record<string, string | number | undefined> = {};

  if (pagination?.page) params.page = pagination.page;
  if (pagination?.limit) params.limit = pagination.limit;

  return await fetcher<SuccessResponseData<{ releases: SafeRelease[] }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/releases`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );
};

export const getReleaseDiff = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
) => {
  return await fetcher<SuccessResponseData<{ diff: ReleaseDiff }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/releases/diff`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const createRelease = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  body: { bumpType: VersionBumpType; notes: string },
) => {
  return await fetcher<SuccessResponseData<{ release: SafeRelease }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/releases`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
};
