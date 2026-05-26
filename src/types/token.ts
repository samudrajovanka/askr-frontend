import type z from "zod";
import type {
  leadingUnits,
  radiusSpecials,
  TOKEN_CATEGORIES,
  TOKEN_LAYERS,
  TOKEN_STATUSES,
} from "@/constants/token";
import type {
  createBorderTokenSchema,
  createColorTokenSchema,
  createFontTokenSchema,
  createFontWeightTokenSchema,
  createLeadingTokenSchema,
  createRadiusTokenSchema,
  createShadowTokenSchema,
  createSpacingTokenSchema,
  createTextTokenSchema,
  createTrackingTokenSchema,
  updateBorderTokenSchema,
  updateColorTokenSchema,
  updateFontTokenSchema,
  updateFontWeightTokenSchema,
  updateLeadingTokenSchema,
  updateRadiusTokenSchema,
  updateShadowTokenSchema,
  updateSpacingTokenSchema,
  updateTextTokenSchema,
  updateTrackingTokenSchema,
} from "@/endpoints/token/validator";

export type TokenCategory =
  (typeof TOKEN_CATEGORIES)[keyof typeof TOKEN_CATEGORIES];
export type TokenLayer = (typeof TOKEN_LAYERS)[keyof typeof TOKEN_LAYERS];
export type TokenStatus = (typeof TOKEN_STATUSES)[keyof typeof TOKEN_STATUSES];

export type ShadowLayer = {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;
  color: string;
  inset?: boolean;
};

export type RadiusSpecial = (typeof radiusSpecials)[number];

export type TextMeta = { rawValue: number; unit: string };
export type FontMeta = null;
export type FontWeightMeta = { rawValue: number };
export type LeadingMeta = { rawValue: number; unit?: string };
export type TrackingMeta = { rawValue: number; unit: string };
export type SpacingMeta = { rawValue: number; unit: string };
export type BorderMeta = { rawValue: number; unit: string };
export type RadiusMeta = {
  rawValue?: number;
  unit?: string;
  special?: RadiusSpecial;
};
export type ShadowMeta = { layers: ShadowLayer[] };
export type TokenMeta =
  | TextMeta
  | FontWeightMeta
  | LeadingMeta
  | TrackingMeta
  | SpacingMeta
  | BorderMeta
  | RadiusMeta
  | ShadowMeta;

export type Token = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  name: string;
  category: TokenCategory;
  layer: TokenLayer;
  value: string;
  reference: string | null;
  referenceTokenId: string | null;
  status: TokenStatus;
  description?: string;
  createdById: string;
  updatedById: string | null;
  deletedAt: string | null;
  meta: TokenMeta | null;
};

export type CreateColorTokenPayload = z.infer<typeof createColorTokenSchema>;
export type UpdateColorTokenPayload = z.infer<typeof updateColorTokenSchema>;

export type CreateSpacingTokenPayload = z.infer<
  typeof createSpacingTokenSchema
>;
export type UpdateSpacingTokenPayload = z.infer<
  typeof updateSpacingTokenSchema
>;

export type TokenGroup = { group: string; tokens: Token[] };

export type CreateTextTokenPayload = z.infer<typeof createTextTokenSchema>;
export type UpdateTextTokenPayload = z.infer<typeof updateTextTokenSchema>;

export type CreateFontTokenPayload = z.infer<typeof createFontTokenSchema>;
export type UpdateFontTokenPayload = z.infer<typeof updateFontTokenSchema>;

export type CreateFontWeightTokenPayload = z.infer<
  typeof createFontWeightTokenSchema
>;
export type UpdateFontWeightTokenPayload = z.infer<
  typeof updateFontWeightTokenSchema
>;

export type CreateLeadingTokenPayload = z.infer<
  typeof createLeadingTokenSchema
>;
export type UpdateLeadingTokenPayload = z.infer<
  typeof updateLeadingTokenSchema
>;
export type LeadingUnit = (typeof leadingUnits)[number];

export type CreateTrackingTokenPayload = z.infer<
  typeof createTrackingTokenSchema
>;
export type UpdateTrackingTokenPayload = z.infer<
  typeof updateTrackingTokenSchema
>;

export type CreateRadiusTokenPayload = z.infer<typeof createRadiusTokenSchema>;
export type UpdateRadiusTokenPayload = z.infer<typeof updateRadiusTokenSchema>;

export type CreateShadowTokenPayload = z.infer<typeof createShadowTokenSchema>;
export type UpdateShadowTokenPayload = z.infer<typeof updateShadowTokenSchema>;

export type CreateBorderTokenPayload = z.infer<typeof createBorderTokenSchema>;
export type UpdateBorderTokenPayload = z.infer<typeof updateBorderTokenSchema>;

export type TokenSummary = {
  total: number;
  byCategory: Record<string, number>;
  byLayer: Record<string, number>;
};
