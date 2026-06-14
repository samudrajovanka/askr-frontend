import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getProjectAuditLogs,
  getWorkspaceAuditLogs,
} from "@/endpoints/activity";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import type { AuditLogFilters } from "@/types/audit";

export const getWorkspaceAuditLogsKey = (
  workspaceSlug: string,
  filters?: AuditLogFilters,
) => [workspaceSlug, "audit-logs", filters];

export const useWorkspaceAuditLogs = (
  workspaceSlug: string,
  filters?: AuditLogFilters,
) => {
  const { execute, isSignedIn } = useFetchAuth(getWorkspaceAuditLogs);

  return useQuery({
    queryKey: getWorkspaceAuditLogsKey(workspaceSlug, filters),
    enabled: isSignedIn && !!workspaceSlug,
    queryFn: () => execute(workspaceSlug, filters),
    placeholderData: keepPreviousData,
  });
};

export const getProjectAuditLogsKey = (
  workspaceSlug: string,
  projectSlug: string,
  filters?: AuditLogFilters,
) => [workspaceSlug, projectSlug, "audit-logs", filters];

export const useProjectAuditLogs = (
  workspaceSlug: string,
  projectSlug: string,
  filters?: AuditLogFilters,
) => {
  const { execute, isSignedIn } = useFetchAuth(getProjectAuditLogs);

  return useQuery({
    queryKey: getProjectAuditLogsKey(workspaceSlug, projectSlug, filters),
    enabled: isSignedIn && !!workspaceSlug && !!projectSlug,
    queryFn: () => execute(workspaceSlug, projectSlug, filters),
    placeholderData: keepPreviousData,
  });
};
