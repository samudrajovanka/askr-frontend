import { RoleWorkspace } from "@/types/workspace";

export const roleWorkspaceLabels: Record<RoleWorkspace, string> = {
  [RoleWorkspace.ADMIN]: "Admin",
  [RoleWorkspace.DESIGNER]: "Designer",
  [RoleWorkspace.ENGINEER]: "Engineer",
  [RoleWorkspace.MANAGER]: "Manager",
};
