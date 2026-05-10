import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
});
