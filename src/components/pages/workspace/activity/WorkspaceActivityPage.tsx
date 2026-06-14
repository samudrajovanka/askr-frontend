"use client";

import { Activity } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import ActivityFilters, {
  type ActivityFilterValues,
} from "@/components/parts/activity/ActivityFilters";
import ActivityTable from "@/components/parts/activity/ActivityTable";
import QueryHandling from "@/components/parts/query/QueryHandling";
import HeaderSection from "@/components/parts/template/HeaderSectionTemplate";
import { BasicEmptyState } from "@/components/ui/empty";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { hasPermission } from "@/lib/permissions";
import { useWorkspaceAuditLogs } from "@/query/activity";
import { useProjects } from "@/query/project";
import { useWorkspace, useWorkspaceMembers } from "@/query/workspace";
import type { AuditLogFilters } from "@/types/audit";

const WorkspaceActivityPage = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  const [filters, setFilters] = useState<AuditLogFilters>({
    page: 1,
    limit: 20,
  });

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleFiltersChange = useCallback((values: ActivityFilterValues) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
      page: 1,
    }));
  }, []);

  const workspaceQuery = useWorkspace(workspaceSlug);
  const activityQuery = useWorkspaceAuditLogs(workspaceSlug, filters);
  const membersQuery = useWorkspaceMembers(workspaceSlug);
  const projectsQuery = useProjects(workspaceSlug);

  const canView = hasPermission(
    workspaceQuery.data?.data?.data.workspace.role,
    "audit:view",
  );

  const members = membersQuery.data?.data?.data.members ?? [];
  const projects = projectsQuery.data?.data?.data.projects ?? [];

  return (
    <div className="flex flex-col gap-6">
      <HeaderSection
        title="Activity Log"
        description="View all audit events across your workspace"
      />

      <ActivityFilters
        members={members}
        projects={projects}
        onFiltersChange={handleFiltersChange}
      />

      {!canView ? (
        <BasicEmptyState
          Icon={Activity}
          title="Access denied"
          message="You don't have permission to view the activity log."
        />
      ) : (
        <QueryHandling
          queryResult={activityQuery}
          renderLoading={
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          }
          render={({
            data: {
              data: { auditLogs },
              meta,
            },
          }) => {
            return (
              <div className="flex flex-col gap-4">
                <ActivityTable data={auditLogs} showProject={true} />

                {meta?.pagination && meta.pagination.totalPages > 1 && (
                  <Pagination
                    page={meta.pagination.page}
                    totalPages={meta.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default WorkspaceActivityPage;
