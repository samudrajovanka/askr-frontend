import { fetcher } from "@/lib/helpers/fetcher";
import type { SuccessResponseData } from "@/types/response";
import type {
  CreateBorderTokenPayload,
  CreateColorTokenPayload,
  CreateFontTokenPayload,
  CreateFontWeightTokenPayload,
  CreateLeadingTokenPayload,
  CreateRadiusTokenPayload,
  CreateShadowTokenPayload,
  CreateSpacingTokenPayload,
  CreateTextTokenPayload,
  CreateTrackingTokenPayload,
  Token,
  TokenGroup,
  TokenLayer,
  UpdateBorderTokenPayload,
  UpdateColorTokenPayload,
  UpdateFontTokenPayload,
  UpdateFontWeightTokenPayload,
  UpdateLeadingTokenPayload,
  UpdateRadiusTokenPayload,
  UpdateShadowTokenPayload,
  UpdateSpacingTokenPayload,
  UpdateTextTokenPayload,
  UpdateTrackingTokenPayload,
} from "@/types/token";

const baseUrl = (workspaceSlug: string, projectSlug: string, path: string) =>
  `/workspaces/${workspaceSlug}/projects/${projectSlug}/tokens/${path}`;

// ========= Color token endpoints =========
export const getTokenColors = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
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
  payload: CreateColorTokenPayload,
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
  payload: UpdateColorTokenPayload,
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

// ========= Spacing token endpoints =========
export const getTokenSpacings = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "spacing"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenSpacing = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateSpacingTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "spacing"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenSpacing = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `spacing/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenSpacing = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateSpacingTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `spacing/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenSpacing = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `spacing/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Text token endpoints =========
export const getTokenTexts = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "text"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenText = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateTextTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "text"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenText = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `text/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenText = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateTextTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `text/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenText = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `text/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Font token endpoints =========
export const getTokenFonts = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "font"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenFont = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateFontTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "font"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenFont = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `font/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenFont = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateFontTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `font/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenFont = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `font/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Font-weight token endpoints =========
export const getTokenFontWeights = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "font-weight"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenFontWeight = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateFontWeightTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "font-weight"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenFontWeight = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `font-weight/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenFontWeight = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateFontWeightTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `font-weight/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenFontWeight = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `font-weight/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Leading token endpoints =========
export const getTokenLeadings = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "leading"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenLeading = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateLeadingTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "leading"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenLeading = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `leading/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenLeading = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateLeadingTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `leading/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenLeading = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `leading/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Tracking token endpoints =========
export const getTokenTrackings = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "tracking"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenTracking = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateTrackingTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "tracking"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenTracking = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `tracking/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenTracking = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateTrackingTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `tracking/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenTracking = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `tracking/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Radius token endpoints =========
export const getTokenRadii = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "radius"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenRadius = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateRadiusTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "radius"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenRadius = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `radius/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenRadius = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateRadiusTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `radius/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenRadius = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `radius/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Shadow token endpoints =========
export const getTokenShadows = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "shadow"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenShadow = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateShadowTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "shadow"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenShadow = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `shadow/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenShadow = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateShadowTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `shadow/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenShadow = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `shadow/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

// ========= Border token endpoints =========
export const getTokenBorders = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  params?: { search?: string; layer: TokenLayer },
) =>
  fetcher<SuccessResponseData<{ groups: TokenGroup[] }>>(
    baseUrl(workspaceSlug, projectSlug, "border"),
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );

export const createTokenBorder = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  payload: CreateBorderTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, "border"),
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const getTokenBorder = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `border/${tokenId}`),
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const updateTokenBorder = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
  payload: UpdateBorderTokenPayload,
) =>
  fetcher<SuccessResponseData<{ token: Token }>>(
    baseUrl(workspaceSlug, projectSlug, `border/${tokenId}`),
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    },
  );

export const deleteTokenBorder = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  tokenId: string,
) =>
  fetcher<SuccessResponseData<null>>(
    baseUrl(workspaceSlug, projectSlug, `border/${tokenId}`),
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
