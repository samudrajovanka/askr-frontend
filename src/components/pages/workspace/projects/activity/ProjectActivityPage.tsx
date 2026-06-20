"use client";

import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import ActivityFilters, {
  type ActivityFilterValues,
} from "@/components/parts/activity/ActivityFilters";
import ActivityTable from "@/components/parts/activity/ActivityTable";
import QueryHandling from "@/components/parts/query/QueryHandling";
import AccessRestrictedState from "@/components/parts/template/AccessRestrictedState";
import HeaderSection from "@/components/parts/template/HeaderSectionTemplate";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { projectAuditEventTypes } from "@/constants/audit";
import { usePermission } from "@/hooks/usePermission";
import { useProjectAuditLogs } from "@/query/activity";
import { useWorkspaceMembers } from "@/query/workspace";
import type { AuditLogFilters } from "@/types/audit";

const ProjectActivityPage = () => {
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();

  const [filters, setFilters] = useState<AuditLogFilters>({
    page: 1,
    limit: 10,
  });

  const auditLogsQuery = useProjectAuditLogs(
    workspaceSlug,
    projectSlug,
    filters,
  );
  const { hasPermission } = usePermission(workspaceSlug);
  const membersQuery = useWorkspaceMembers(workspaceSlug);

  const canView = hasPermission("log:read");

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

  const members = membersQuery.data?.data?.data?.members ?? [];

  return (
    <div id="pagination-scroll-wrapper" className="flex flex-col gap-6">
      <HeaderSection
        title="Activity Log"
        description="Track all changes and events in this project"
      />

      {!canView ? (
        <AccessRestrictedState description="You don't have permission to view the activity log." />
      ) : (
        <>
          <ActivityFilters
            members={members}
            allowEventTypes={projectAuditEventTypes}
            onFiltersChange={handleFiltersChange}
          />

          <QueryHandling
            queryResult={auditLogsQuery}
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
                  <ActivityTable data={auditLogs} />

                  {meta?.pagination && (
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
        </>
      )}
    </div>
  );
};

export default ProjectActivityPage;
