import { z } from "zod";
import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/string";
import { slugValidator } from "@/lib/validators/string";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(NAME_MAX_LENGTH, "Project name is too long"),
  slug: slugValidator("Slug"),
  description: z
    .string()
    .max(DESCRIPTION_MAX_LENGTH, "Description is too long")
    .optional(),
});

export const updateProjectSchema = createProjectSchema;
