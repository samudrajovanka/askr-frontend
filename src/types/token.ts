import type z from "zod";
import type {
  tokenCategories,
  tokenLayers,
  tokenStatuses,
} from "@/constants/token";
import type {
  createTokenSchema,
  updateTokenSchema,
} from "@/endpoints/token/validator";

export type TokenCategory =
  (typeof tokenCategories)[keyof typeof tokenCategories];
export type TokenLayer = (typeof tokenLayers)[keyof typeof tokenLayers];
export type TokenStatus = (typeof tokenStatuses)[keyof typeof tokenStatuses];

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
};

export type CreateTokenPayload = z.infer<typeof createTokenSchema>;
export type UpdateTokenPayload = z.infer<typeof updateTokenSchema>;

export type TokenColorGroup = {
  group: string;
  tokens: Token[];
};
