import { z } from "zod";
import { descriptionMaxLength, nameMaxLength } from "@/constants/string";
import { slugValidator } from "@/lib/validators/string";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(nameMaxLength, "Project name is too long"),
  slug: slugValidator("Slug"),
  description: z.string().max(descriptionMaxLength, "Description is too long"),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(nameMaxLength, "Project name is too long")
    .optional(),
  slug: slugValidator("Slug").optional(),
  description: z
    .string()
    .max(descriptionMaxLength, "Description is too long")
    .nullable()
    .optional(),
});
