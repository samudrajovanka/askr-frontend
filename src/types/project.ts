import type z from "zod";
import type {
  createProjectSchema,
  updateProjectSchema,
} from "@/endpoints/project/validator";
import type { UsageMetric } from "./workspace";

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

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
export type UpdateProjectPayload = z.infer<typeof updateProjectSchema>;

export type ProjectUsage = {
  token: UsageMetric;
};
