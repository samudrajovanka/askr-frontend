import { fetcher } from "@/lib/helpers/fetcher";
import type { SuccessResponseData } from "@/types/response";
import type {
  CreateTokenPayload,
  Token,
  TokenColorGroup,
  TokenLayer,
  UpdateTokenPayload,
} from "@/types/token";

const baseUrl = (workspaceSlug: string, projectSlug: string, path: string) =>
  `/workspaces/${workspaceSlug}/projects/${projectSlug}/tokens/${path}`;

export const getTokenColors = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenColorGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "color"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenColor = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "color"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenColor = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `color/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenColor = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `color/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenColor = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `color/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
