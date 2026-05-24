import { z } from "zod";
import { NAME_MAX_LENGTH } from "@/constants/string";
import { slugValidator } from "@/lib/validators/string";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(NAME_MAX_LENGTH, "Workspace name is too long"),
  slug: slugValidator("Slug"),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(NAME_MAX_LENGTH, "Workspace name is too long")
    .optional(),
  slug: slugValidator("Slug").optional(),
});
