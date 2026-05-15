import { z } from "zod";
import { nameMaxLength } from "@/constants/string";
import { slugValidator } from "@/lib/validators/string";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(nameMaxLength, "Workspace name is too long"),
  slug: slugValidator("Slug"),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(nameMaxLength, "Workspace name is too long")
    .optional(),
  slug: slugValidator("Slug").optional(),
});
