export const ROLE_WORKSPACE = {
  ADMIN: "admin",
  DESIGNER: "designer",
  ENGINEER: "engineer",
  MANAGER: "manager",
} as const;

export const roleWorkspaceLabels = {
  [ROLE_WORKSPACE.ADMIN]: "Admin",
  [ROLE_WORKSPACE.DESIGNER]: "Designer",
  [ROLE_WORKSPACE.ENGINEER]: "Engineer",
  [ROLE_WORKSPACE.MANAGER]: "Manager",
} as const;
