import type { invitationStatuses } from "@/constants/invitation";
import type { RoleWorkspace } from "./workspace";

export type InvitationStatus = (typeof invitationStatuses)[number];

export type MyPendingInvitation = {
  id: string;
  workspaceId: string;
  email: string;
  role: RoleWorkspace;
  status: InvitationStatus;
  token: string;
  createdAt: string;
  expiresAt: string;
  workspaceName: string;
  workspaceSlug: string;
};
