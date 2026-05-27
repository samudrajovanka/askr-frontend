import { z } from "zod";
import { NAME_MAX_LENGTH } from "@/constants/string";
import { workspaceRoles } from "@/constants/workspace";
import { slugValidator } from "@/lib/validators/string";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(NAME_MAX_LENGTH, "Workspace name is too long"),
  slug: slugValidator("Slug"),
});

const workspaceRoleEnumSchema = z.enum(workspaceRoles, {
  error: `Must be valid role [${workspaceRoles.join(", ")}]`,
});

export const createInvitationSchema = z.object({
  email: z.email("Invalid email address"),
  role: workspaceRoleEnumSchema,
});

export const updateWorkspaceMemberSchema = z.object({
  role: workspaceRoleEnumSchema.optional(),
});
