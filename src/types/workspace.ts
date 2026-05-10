export enum RoleWorkspace {
  ADMIN = "admin",
  DESIGNER = "designer",
  ENGINEER = "engineer",
  MANAGER = "manager",
}

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

export type CreateWorkspacePayload = {
  name: string;
  slug: string;
};
