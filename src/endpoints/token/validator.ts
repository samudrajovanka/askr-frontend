import { z } from "zod";
import { hexColorRegex, tokenNameRegex } from "@/constants/regex";
import { nameMaxLength } from "@/constants/string";
import {
  tokenLayers,
  tokenLayerValues,
  tokenStatusValues,
} from "@/constants/token";

const layerSchema = z.enum(tokenLayerValues);
const statusSchema = z.enum(tokenStatusValues);

export const createTokenSchema = z
  .object({
    name: z
      .string()
      .min(3, "Token name must be at least 3 characters long")
      .max(nameMaxLength, "Token name is too long")
      .regex(
        tokenNameRegex,
        "Name must start with a letter and use lowercase letters, numbers, and dots (e.g. green or brand.primary)",
      ),
    layer: layerSchema,
    value: z
      .string()
      .regex(hexColorRegex, "Must be a valid hex color")
      .optional(),
    referenceId: z.uuid("Invalid reference ID").optional(),
    status: statusSchema,
    description: z.string().max(200, "Description is too long").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.layer === tokenLayers.PRIMITIVE && !data.value) {
      ctx.addIssue({
        code: "custom",
        message: "Value is required for primitive tokens",
        path: ["value"],
      });
    }

    if (data.layer === tokenLayers.SEMANTIC && !data.referenceId) {
      ctx.addIssue({
        code: "custom",
        message: "Reference ID is required for semantic tokens",
        path: ["referenceId"],
      });
    }
  });

export const updateTokenSchema = z
  .object({
    name: z
      .string()
      .min(3, "Token name must be at least 3 characters long")
      .max(nameMaxLength, "Token name is too long")
      .regex(
        tokenNameRegex,
        "Name must start with a letter and use lowercase letters, numbers, and dots",
      )
      .optional(),
    layer: layerSchema.optional(),
    value: z
      .string()
      .regex(hexColorRegex, "Must be a valid hex color")
      .optional(),
    referenceId: z.uuid("Invalid reference ID").optional(),
    status: statusSchema.optional(),
    description: z
      .string()
      .max(200, "Description is too long")
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.layer === tokenLayers.PRIMITIVE && !data.value) {
      ctx.addIssue({
        code: "custom",
        message: "Value is required for primitive tokens",
        path: ["value"],
      });
    }

    if (data.layer === tokenLayers.SEMANTIC && !data.referenceId) {
      ctx.addIssue({
        code: "custom",
        message: "Reference ID is required for semantic tokens",
        path: ["referenceId"],
      });
    }
  });
