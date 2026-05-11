import { z } from "zod";

export const DESCRIPTION_MAX_LENGTH = 200;

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(255, "Project name is too long"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .max(100, "Slug is too long")
    .regex(
      /^[a-z][a-z0-9-]*$/,
      "Must start with a letter and contain only lowercase letters, numbers, and hyphens",
    ),
  description: z
    .string()
    .max(DESCRIPTION_MAX_LENGTH, "Description is too long"),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(255, "Project name is too long")
    .optional(),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .max(100, "Slug is too long")
    .regex(
      /^[a-z][a-z0-9-]*$/,
      "Must start with a letter and contain only lowercase letters, numbers, and hyphens",
    )
    .optional(),
  description: z
    .string()
    .max(1000, "Description is too long")
    .nullable()
    .optional(),
});
