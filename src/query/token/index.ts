import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTokenColor as createTokenFn,
  deleteTokenColor as deleteTokenFn,
  getTokenColors,
  updateTokenColor as updateTokenFn,
} from "@/endpoints/token";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type {
  CreateTokenPayload,
  TokenLayer,
  UpdateTokenPayload,
} from "@/types/token";

const getTokenBaseKey = (workspaceSlug: string, projectSlug: string) => [
  workspaceSlug,
  projectSlug,
  "token",
];

export const getTokenColorsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "color"];

export const getTokenColorsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenColorsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenColors = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenColors);

  return useQuery({
    queryKey: getTokenColorsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenColor = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createTokenFn);

  return useMutation({
    mutationFn: (payload: CreateTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenColorsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenColor = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateTokenFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenColorsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenColor = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteTokenFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenColorsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};
