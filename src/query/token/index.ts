import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTokenBorder as createBorderFn,
  createTokenFont as createFontFn,
  createTokenFontWeight as createFontWeightFn,
  createTokenLeading as createLeadingFn,
  createTokenRadius as createRadiusFn,
  createTokenShadow as createShadowFn,
  createTokenSpacing as createSpacingFn,
  createTokenText as createTextFn,
  createTokenColor as createTokenFn,
  createTokenTracking as createTrackingFn,
  deleteTokenBorder as deleteBorderFn,
  deleteTokenFont as deleteFontFn,
  deleteTokenFontWeight as deleteFontWeightFn,
  deleteTokenLeading as deleteLeadingFn,
  deleteTokenRadius as deleteRadiusFn,
  deleteTokenShadow as deleteShadowFn,
  deleteTokenSpacing as deleteSpacingFn,
  deleteTokenText as deleteTextFn,
  deleteTokenColor as deleteTokenFn,
  deleteTokenTracking as deleteTrackingFn,
  getTokenBorders,
  getTokenColors,
  getTokenFonts,
  getTokenFontWeights,
  getTokenLeadings,
  getTokenRadii,
  getTokenShadows,
  getTokenSpacings,
  getTokenTexts,
  getTokenTrackings,
  updateTokenBorder as updateBorderFn,
  updateTokenFont as updateFontFn,
  updateTokenFontWeight as updateFontWeightFn,
  updateTokenLeading as updateLeadingFn,
  updateTokenRadius as updateRadiusFn,
  updateTokenShadow as updateShadowFn,
  updateTokenSpacing as updateSpacingFn,
  updateTokenText as updateTextFn,
  updateTokenColor as updateTokenFn,
  updateTokenTracking as updateTrackingFn,
} from "@/endpoints/token";
import { useFetchAuth } from "@/hooks/useFetchAuth";
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

const getTokenBaseKey = (workspaceSlug: string, projectSlug: string) => [
  workspaceSlug,
  projectSlug,
  "token",
];

// ========= Color =========

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
    mutationFn: (payload: CreateColorTokenPayload) =>
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
      payload: UpdateColorTokenPayload;
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

// ========= Spacing =========

export const getTokenSpacingsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "spacing"];

export const getTokenSpacingsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenSpacingsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenSpacings = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenSpacings);

  return useQuery({
    queryKey: getTokenSpacingsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenSpacing = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createSpacingFn);

  return useMutation({
    mutationFn: (payload: CreateSpacingTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenSpacingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenSpacing = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateSpacingFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateSpacingTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenSpacingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenSpacing = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteSpacingFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenSpacingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Text =========

export const getTokenTextsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "text"];

export const getTokenTextsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenTextsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenTexts = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenTexts);

  return useQuery({
    queryKey: getTokenTextsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenText = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createTextFn);

  return useMutation({
    mutationFn: (payload: CreateTextTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenTextsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenText = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateTextFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateTextTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenTextsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenText = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteTextFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenTextsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Font =========

export const getTokenFontsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "font"];

export const getTokenFontsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenFontsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenFonts = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenFonts);

  return useQuery({
    queryKey: getTokenFontsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenFont = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createFontFn);

  return useMutation({
    mutationFn: (payload: CreateFontTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenFontsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenFont = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateFontFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateFontTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenFontsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenFont = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteFontFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenFontsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Font-weight =========

export const getTokenFontWeightsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "font-weight"];

export const getTokenFontWeightsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenFontWeightsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenFontWeights = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenFontWeights);

  return useQuery({
    queryKey: getTokenFontWeightsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenFontWeight = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createFontWeightFn);

  return useMutation({
    mutationFn: (payload: CreateFontWeightTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenFontWeightsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenFontWeight = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateFontWeightFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateFontWeightTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenFontWeightsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenFontWeight = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteFontWeightFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenFontWeightsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Leading =========

export const getTokenLeadingsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "leading"];

export const getTokenLeadingsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenLeadingsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenLeadings = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenLeadings);

  return useQuery({
    queryKey: getTokenLeadingsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenLeading = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createLeadingFn);

  return useMutation({
    mutationFn: (payload: CreateLeadingTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenLeadingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenLeading = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateLeadingFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateLeadingTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenLeadingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenLeading = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteLeadingFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenLeadingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Tracking =========

export const getTokenTrackingsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "tracking"];

export const getTokenTrackingsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenTrackingsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenTrackings = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenTrackings);

  return useQuery({
    queryKey: getTokenTrackingsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenTracking = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createTrackingFn);

  return useMutation({
    mutationFn: (payload: CreateTrackingTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenTrackingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenTracking = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateTrackingFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateTrackingTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenTrackingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenTracking = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteTrackingFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenTrackingsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Radius =========

export const getTokenRadiiBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "radius"];

export const getTokenRadiiKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenRadiiBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenRadii = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenRadii);

  return useQuery({
    queryKey: getTokenRadiiKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenRadius = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createRadiusFn);

  return useMutation({
    mutationFn: (payload: CreateRadiusTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenRadiiBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenRadius = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateRadiusFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateRadiusTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenRadiiBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenRadius = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteRadiusFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenRadiiBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Shadow =========

export const getTokenShadowsBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "shadow"];

export const getTokenShadowsKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenShadowsBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenShadows = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenShadows);

  return useQuery({
    queryKey: getTokenShadowsKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenShadow = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createShadowFn);

  return useMutation({
    mutationFn: (payload: CreateShadowTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenShadowsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenShadow = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateShadowFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateShadowTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenShadowsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenShadow = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteShadowFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenShadowsBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

// ========= Border =========

export const getTokenBordersBaseKey = (
  workspaceSlug: string,
  projectSlug: string,
) => [...getTokenBaseKey(workspaceSlug, projectSlug), "border"];

export const getTokenBordersKey = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
) => [...getTokenBordersBaseKey(workspaceSlug, projectSlug), layer];

export const useTokenBorders = (
  workspaceSlug: string,
  projectSlug: string,
  layer: TokenLayer,
  options?: {
    enabled?: boolean;
  },
) => {
  const { execute, isSignedIn } = useFetchAuth(getTokenBorders);

  return useQuery({
    queryKey: getTokenBordersKey(workspaceSlug, projectSlug, layer),
    enabled:
      isSignedIn &&
      !!workspaceSlug &&
      !!projectSlug &&
      (options?.enabled ?? true),
    queryFn: () => execute(workspaceSlug, projectSlug, { layer }),
  });
};

export const useCreateTokenBorder = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(createBorderFn);

  return useMutation({
    mutationFn: (payload: CreateBorderTokenPayload) =>
      execute(workspaceSlug, projectSlug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenBordersBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useUpdateTokenBorder = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(updateBorderFn);

  return useMutation({
    mutationFn: ({
      tokenId,
      payload,
    }: {
      tokenId: string;
      payload: UpdateBorderTokenPayload;
    }) => execute(workspaceSlug, projectSlug, tokenId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenBordersBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};

export const useDeleteTokenBorder = (
  workspaceSlug: string,
  projectSlug: string,
) => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(deleteBorderFn);

  return useMutation({
    mutationFn: (tokenId: string) =>
      execute(workspaceSlug, projectSlug, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTokenBordersBaseKey(workspaceSlug, projectSlug),
      });
    },
  });
};
