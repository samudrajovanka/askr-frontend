import { fetcher } from "@/lib/helpers/fetcher";
import type { AuditLog, AuditLogFilters } from "@/types/audit";
import type { SuccessResponseData } from "@/types/response";

export const getWorkspaceAuditLogs = async (
  token: string,
  workspaceSlug: string,
  filters?: AuditLogFilters,
) => {
  const params: Record<string, string | number | undefined> = {};

  if (filters?.eventType) params.eventType = filters.eventType;
  if (filters?.userId) params.userId = filters.userId;
  if (filters?.startDate) params.startDate = filters.startDate;
  if (filters?.endDate) params.endDate = filters.endDate;
  if (filters?.search) params.search = filters.search;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  return await fetcher<SuccessResponseData<{ auditLogs: AuditLog[] }>>(
    `/workspaces/${workspaceSlug}/audit-logs`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );
};

export const getProjectAuditLogs = async (
  token: string,
  workspaceSlug: string,
  projectSlug: string,
  filters?: AuditLogFilters,
) => {
  const params: Record<string, string | number | undefined> = {};

  if (filters?.eventType) params.eventType = filters.eventType;
  if (filters?.userId) params.userId = filters.userId;
  if (filters?.startDate) params.startDate = filters.startDate;
  if (filters?.endDate) params.endDate = filters.endDate;
  if (filters?.search) params.search = filters.search;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  return await fetcher<SuccessResponseData<{ auditLogs: AuditLog[] }>>(
    `/workspaces/${workspaceSlug}/projects/${projectSlug}/audit-logs`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
  );
};
