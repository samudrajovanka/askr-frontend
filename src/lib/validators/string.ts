import { z } from "zod";
import { slugRegex } from "@/constants/regex";
import { slugMaxLength } from "@/constants/string";

export const slugValidator = (fieldName: string = "Slug") =>
  z
    .string()
    .min(3, `${fieldName} must be at least 3 characters long`)
    .max(slugMaxLength, `${fieldName} is too long`)
    .regex(
      slugRegex,
      `${fieldName} must start with a letter and contain only lowercase letters, numbers, and hyphens`,
    );
