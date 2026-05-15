import type z from "zod";
import type { roleWorkspace } from "@/constants/workspace";
import type { createWorkspaceSchema } from "@/endpoints/workspace/validator";

export type RoleWorkspace = keyof typeof roleWorkspace;

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
