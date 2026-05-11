export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  workspaceId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectPayload = {
  name: string;
  slug: string;
  description?: string;
};

export type UpdateProjectPayload = {
  name?: string;
  slug?: string;
  description?: string | null;
};
