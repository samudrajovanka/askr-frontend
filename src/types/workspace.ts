import type z from "zod";
import type { ROLE_WORKSPACE } from "@/constants/workspace";
import type {
  createInvitationSchema,
  createWorkspaceSchema,
  updateWorkspaceMemberSchema,
} from "@/endpoints/workspace/validator";
import type { InvitationStatus } from "./invitation";

export type RoleWorkspace =
  (typeof ROLE_WORKSPACE)[keyof typeof ROLE_WORKSPACE];

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  createdById: string;
  me: {
    role: RoleWorkspace;
    permissions: string[];
  };
  projectCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkspacePayload = z.infer<typeof createWorkspaceSchema>;

export type CreateInvitationPayload = z.infer<typeof createInvitationSchema>;

export type UpdateWorkspaceMemberPayload = z.infer<
  typeof updateWorkspaceMemberSchema
>;

export type WorkspaceMember = {
  id: string;
  userId: string;
  role: RoleWorkspace;
  createdAt: string;
  email: string;
  name: string;
  avatarUrl: string | null;
};

export type WorkspaceInvitation = {
  id: string;
  workspaceId: string;
  email: string;
  role: RoleWorkspace;
  invitedById: string;
  status: InvitationStatus;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
  invitedByEmail: string;
  invitedByName: string;
};

export type WorkspaceInvitationsFilter = {
  status?: string;
};

export type UsageMetric = {
  current: number;
  limit: number;
  unit?: string;
};

export type StaticUsageMetric = {
  limit: number;
  unit?: string;
};

export type ProjectUsageMetric = {
  token: UsageMetric;
};

export type WorkspaceUsage = {
  projects: UsageMetric;
  members: UsageMetric;
  auditLogRetention: StaticUsageMetric;
  projectsUsage: Record<string, ProjectUsageMetric>;
};
