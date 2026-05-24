import { z } from "zod";
import { HEX_COLOR_REGEX, TOKEN_NAME_REGEX } from "@/constants/regex";
import { NAME_MAX_LENGTH } from "@/constants/string";
import {
  borderWidthUnits,
  fontWeightNames,
  leadingUnits,
  radiusSpecials,
  radiusUnits,
  spacingUnits,
  TOKEN_LAYERS,
  textUnits,
  tokenLayers,
  tokenStatuses,
  trackingUnits,
} from "@/constants/token";

// ========= Base Schemas =========
export const layerSchema = z.enum(tokenLayers);
export const statusSchema = z.enum(tokenStatuses);

const baseNameField = z
  .string()
  .min(1, "Token name must be at least 1 character long")
  .max(NAME_MAX_LENGTH, "Token name is too long")
  .regex(
    TOKEN_NAME_REGEX,
    "Name must use lowercase letters, numbers, and dots (e.g. 1, green, brand.primary)",
  );

const baseDescriptionField = z
  .string()
  .max(500, "Description is too long")
  .optional();

const baseReferenceIdField = z.uuid("Invalid reference ID").optional();

// ========= Refinement Functions =========
const checkLayerRefinement = (
  data: {
    layer?: string;
    value?: string | number;
    referenceId?: string;
  },
  ctx: z.RefinementCtx,
) => {
  if (data.layer === undefined && data.value !== undefined) {
    ctx.addIssue({
      code: "custom",
      message: `Layer "${TOKEN_LAYERS.PRIMITIVE}" is required when value is provided`,
      path: ["layer"],
    });
  }

  if (data.layer === undefined && data.referenceId !== undefined) {
    ctx.addIssue({
      code: "custom",
      message: `Layer "${TOKEN_LAYERS.SEMANTIC}" is required when reference ID is provided`,
      path: ["layer"],
    });
  }
};

const primitiveTokenRefinement = (
  data: {
    layer?: string;
    value?: string | number;
    referenceId?: string;
  },
  ctx: z.RefinementCtx,
) => {
  if (
    data.layer === TOKEN_LAYERS.PRIMITIVE &&
    (data.value === undefined ||
      data.value === null ||
      data.value === "" ||
      String(data.value).trim().length === 0)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Value is required for primitive tokens",
      path: ["value"],
    });
  }
};

const primitiveTokenUnitRefinement = (
  data: {
    layer?: string;
    value?: string | number;
    unit?: string;
  },
  ctx: z.RefinementCtx,
) => {
  if (data.layer !== TOKEN_LAYERS.PRIMITIVE) return;

  primitiveTokenRefinement(data, ctx);

  if (data.value !== undefined && !data.unit) {
    ctx.addIssue({
      code: "custom",
      message: "Unit is required when value is provided",
      path: ["unit"],
    });
  }
};

const semanticTokenRefinement = (
  data: {
    layer?: string;
    referenceId?: string;
  },
  ctx: z.RefinementCtx,
) => {
  if (data.layer === TOKEN_LAYERS.SEMANTIC && !data.referenceId) {
    ctx.addIssue({
      code: "custom",
      message: "Reference ID is required for semantic tokens",
      path: ["referenceId"],
    });
  }
};

// ========= Base Token Schemas =========
export const baseTokenSchema = z
  .object({
    name: baseNameField,
    layer: layerSchema,
    referenceId: baseReferenceIdField,
    status: statusSchema,
    description: baseDescriptionField,
  })
  .superRefine(semanticTokenRefinement);

export const baseUpdateTokenSchema = z
  .object({
    name: baseNameField.optional(),
    layer: layerSchema.optional(),
    referenceId: baseReferenceIdField,
    status: statusSchema.optional(),
    description: baseDescriptionField.optional(),
  })
  .superRefine(checkLayerRefinement)
  .superRefine(semanticTokenRefinement);

// ========= Color Token =========
const colorSchema = {
  value: z
    .string()
    .regex(HEX_COLOR_REGEX, "Must be a valid hex color")
    .optional(),
};

export const createColorTokenSchema = baseTokenSchema
  .extend(colorSchema)
  .superRefine(primitiveTokenRefinement);

export const updateColorTokenSchema = baseUpdateTokenSchema
  .extend(colorSchema)
  .superRefine(primitiveTokenRefinement);

// ========= Spacing Token =========
const spacingSchema = {
  value: z.number({ error: "Value must be a number" }).optional(),
  unit: z
    .enum(spacingUnits, {
      error: `Must be valid unit [${spacingUnits.join(", ")}]`,
    })
    .optional(),
};

export const createSpacingTokenSchema = baseTokenSchema
  .extend(spacingSchema)
  .superRefine(primitiveTokenUnitRefinement);

export const updateSpacingTokenSchema = baseUpdateTokenSchema
  .extend(spacingSchema)
  .superRefine(primitiveTokenUnitRefinement);

// ========= Text Token (font-size) =========
const textSchema = {
  value: z
    .number({ error: "Value must be a number" })
    .positive("Value must be a positive number")
    .optional(),
  unit: z
    .enum(textUnits, {
      error: `Must be valid unit [${textUnits.join(", ")}]`,
    })
    .optional(),
};

export const createTextTokenSchema = baseTokenSchema
  .extend(textSchema)
  .superRefine(primitiveTokenUnitRefinement);

export const updateTextTokenSchema = baseUpdateTokenSchema
  .extend(textSchema)
  .superRefine(primitiveTokenUnitRefinement);

// ========= Font Token (font-family) =========
const fontSchema = {
  value: z
    .string()
    .min(1, "Value must be at least 1 character long")
    .optional(),
};

export const createFontTokenSchema = baseTokenSchema
  .extend(fontSchema)
  .superRefine(primitiveTokenRefinement);

export const updateFontTokenSchema = baseUpdateTokenSchema
  .extend(fontSchema)
  .superRefine(primitiveTokenRefinement);

// ========= Font Weight Token =========
const isValidFontWeightValue = (value?: number | string) => {
  const isValidNumber =
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 100 &&
    value <= 900 &&
    value % 100 === 0;
  const isValidName =
    typeof value === "string" &&
    (fontWeightNames as readonly string[]).includes(value.trim().toLowerCase());

  return isValidNumber || isValidName;
};

const fontWeightSchema = {
  value: z.union([z.number(), z.string().min(1)]).optional(),
};

const fontWeightTokenRefinement = (
  data: {
    layer?: string;
    value?: number | string;
    referenceId?: string;
  },
  ctx: z.RefinementCtx,
) => {
  primitiveTokenRefinement(data, ctx);

  if (data.layer === TOKEN_LAYERS.PRIMITIVE) {
    if (!isValidFontWeightValue(data.value)) {
      ctx.addIssue({
        code: "custom",
        message: `Must be valid weight [100, 200, 300, 400, 500, 600, 700, 800, 900] or valid name [${fontWeightNames.join(", ")}]`,
        path: ["value"],
      });
    }
  }
};

export const createFontWeightTokenSchema = baseTokenSchema
  .extend(fontWeightSchema)
  .superRefine(fontWeightTokenRefinement);

export const updateFontWeightTokenSchema = baseUpdateTokenSchema
  .extend(fontWeightSchema)
  .superRefine(fontWeightTokenRefinement);

// ========= Leading Token (line-height) =========
const leadingSchema = {
  value: z
    .number({ error: "Value must be a number" })
    .positive("Value must be a positive number")
    .optional(),
  unit: z
    .enum(leadingUnits, {
      error: `Must be valid unit [${leadingUnits.join(", ")}]`,
    })
    .optional(),
};

export const createLeadingTokenSchema = baseTokenSchema
  .extend(leadingSchema)
  .superRefine(primitiveTokenUnitRefinement);

export const updateLeadingTokenSchema = baseUpdateTokenSchema
  .extend(leadingSchema)
  .superRefine(primitiveTokenUnitRefinement);

// ========= Tracking Token (letter-spacing) =========
const trackingSchema = {
  value: z.number({ error: "Value must be a number" }).optional(),
  unit: z
    .enum(trackingUnits, {
      error: `Must be valid unit [${trackingUnits.join(", ")}]`,
    })
    .optional(),
};

export const createTrackingTokenSchema = baseTokenSchema
  .extend(trackingSchema)
  .superRefine(primitiveTokenUnitRefinement);

export const updateTrackingTokenSchema = baseUpdateTokenSchema
  .extend(trackingSchema)
  .superRefine(primitiveTokenUnitRefinement);

// ========= Radius Token =========
const primitiveRadiusRefinement = (
  data: {
    layer?: string;
    value?: number;
    unit?: string;
    special?: string;
  },
  ctx: z.RefinementCtx,
) => {
  if (data.layer !== TOKEN_LAYERS.PRIMITIVE) return;

  if (data.special) {
    if (data.value !== undefined || data.unit !== undefined) {
      ctx.addIssue({
        code: "custom",
        message:
          "Cannot provide value or unit when special is set — they are mutually exclusive",
        path: ["special"],
      });
    }
    return;
  }

  primitiveTokenUnitRefinement(data, ctx);
};

const radiusSchema = {
  value: z
    .number({ error: "Value must be a number" })
    .nonnegative({ error: "Value must be 0 or greater" })
    .optional(),
  unit: z
    .enum(radiusUnits, {
      error: `Must be valid unit [${radiusUnits.join(", ")}]`,
    })
    .optional(),
  special: z
    .enum(radiusSpecials, {
      error: `Must be valid special [${radiusSpecials.join(", ")}]`,
    })
    .optional(),
};

export const createRadiusTokenSchema = baseTokenSchema
  .extend(radiusSchema)
  .superRefine(primitiveRadiusRefinement);

export const updateRadiusTokenSchema = baseUpdateTokenSchema
  .extend(radiusSchema)
  .superRefine(primitiveRadiusRefinement);

// ========= Shadow Token =========
export const shadowLayerSchema = z.object({
  offsetX: z.number({ error: "OffsetX must be a number" }),
  offsetY: z.number({ error: "OffsetY must be a number" }),
  blur: z
    .number({ error: "Blur must be a number" })
    .nonnegative("Blur must be 0 or greater"),
  spread: z.number({ error: "Spread must be a number" }).optional(),
  color: z
    .string({ error: "Color must be a string" })
    .regex(HEX_COLOR_REGEX, "Must be a valid hex color"),
  inset: z.boolean({ error: "Inset must be a boolean" }).optional(),
});

export type ShadowLayer = z.infer<typeof shadowLayerSchema>;

const shadowSchema = {
  value: z
    .array(shadowLayerSchema, {
      error: "Value must be an array of shadow layers",
    })
    .min(1, "Shadow token must have at least 1 layer")
    .max(10, "Shadow token can have at most 10 layers")
    .optional(),
};

const primitiveShadowRefinement = (
  data: {
    layer?: string;
    value?: z.infer<typeof shadowLayerSchema>[];
  },
  ctx: z.RefinementCtx,
) => {
  if (
    data.layer === TOKEN_LAYERS.PRIMITIVE &&
    (!data.value || data.value.length === 0)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Shadow layers are required for primitive tokens",
      path: ["value"],
    });
  }
};

export const createShadowTokenSchema = baseTokenSchema
  .extend(shadowSchema)
  .superRefine(primitiveShadowRefinement);

export const updateShadowTokenSchema = baseUpdateTokenSchema
  .extend(shadowSchema)
  .superRefine(primitiveShadowRefinement);

// ========= Border Token =========
const borderSchema = {
  value: z
    .number({ error: "Value must be a number" })
    .min(0, "Value must be 0 or greater")
    .optional(),
  unit: z
    .enum(borderWidthUnits, {
      error: `Must be valid unit [${borderWidthUnits.join(", ")}]`,
    })
    .optional(),
};

export const createBorderTokenSchema = baseTokenSchema
  .extend(borderSchema)
  .superRefine(primitiveTokenUnitRefinement);

export const updateBorderTokenSchema = baseUpdateTokenSchema
  .extend(borderSchema)
  .superRefine(primitiveTokenUnitRefinement);
