import type z from "zod";
import type { ROLE_WORKSPACE } from "@/constants/workspace";
import type { createWorkspaceSchema } from "@/endpoints/workspace/validator";

export type RoleWorkspace = keyof typeof ROLE_WORKSPACE;

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  createdById: string;
  role: RoleWorkspace;
  projectCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkspacePayload = z.infer<typeof createWorkspaceSchema>;
