import { fetcher } from "@/lib/helpers/fetcher";
import type { SafeRelease } from "@/types/release";
import type { SuccessResponseData } from "@/types/response";

export const getReleases = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
) => {
  return await fetcher<SuccessResponseData<{ releases: SafeRelease[] }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/releases`,
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
) => {
  return await fetcher<SuccessResponseData<{ release: SafeRelease }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/releases`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
