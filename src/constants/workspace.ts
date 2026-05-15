export const roleWorkspace = {
  ADMIN: "admin",
  DESIGNER: "designer",
  ENGINEER: "engineer",
  MANAGER: "manager",
} as const;

export const roleWorkspaceLabels = {
  [roleWorkspace.ADMIN]: "Admin",
  [roleWorkspace.DESIGNER]: "Designer",
  [roleWorkspace.ENGINEER]: "Engineer",
  [roleWorkspace.MANAGER]: "Manager",
} as const;
