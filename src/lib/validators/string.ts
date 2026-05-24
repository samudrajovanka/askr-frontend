import { z } from "zod";
import { SLUG_REGEX } from "@/constants/regex";
import { SLUG_MAX_LENGTH } from "@/constants/string";

export const slugValidator = (fieldName: string = "Slug") =>
  z
    .string()
    .min(3, `${fieldName} must be at least 3 characters long`)
    .max(SLUG_MAX_LENGTH, `${fieldName} is too long`)
    .regex(
      SLUG_REGEX,
      `${fieldName} must start with a letter and contain only lowercase letters, numbers, and hyphens`,
    );
