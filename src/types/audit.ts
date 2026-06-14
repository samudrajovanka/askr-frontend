import type { auditEventTypes, auditResourceTypes } from "@/constants/audit";

export type AuditEventType = (typeof auditEventTypes)[number];

export type AuditResourceType = (typeof auditResourceTypes)[number];

export interface AuditLog {
  id: string;
  workspaceId: string;
  projectId?: string;
  project?: {
    slug: string;
    name: string;
  };
  event: AuditEventType;
  actorId: string;
  actor: {
    email: string;
    name: string;
  };
  resourceType: AuditResourceType;
  resourceId: string;
  resourceName?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogFilters {
  eventType?: AuditEventType;
  userId?: string;
  projectSlug?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}
