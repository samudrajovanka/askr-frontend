import { format } from "date-fns";
import { useMemo } from "react";
import AuditEventBadge from "@/components/parts/badge/AuditEventBadge";
import TableFactory, {
  type TableHeaderItem,
} from "@/components/parts/table/TableFactory";
import { TableCell, TableRow } from "@/components/ui/table";
import type { AuditLog } from "@/types/audit";

const formatDetails = (log: AuditLog): string => {
  if (log.before && log.after) {
    const changedKeys = Object.keys(log.after).filter(
      (key) =>
        JSON.stringify(log.before?.[key]) !== JSON.stringify(log.after?.[key]),
    );
    if (changedKeys.length === 0) return "No changes";
    return `Changed: ${changedKeys.join(", ")}`;
  }
  if (log.after) {
    const keys = Object.keys(log.after);
    if (keys.length === 0) return "Created";
    return `Created with ${keys.join(", ")}`;
  }
  if (log.before) {
    return "Removed";
  }
  return "—";
};

type Props = {
  data: AuditLog[];
  showProject?: boolean;
};

const ActivityTable = ({ data, showProject = false }: Props) => {
  const headers = useMemo(() => {
    const list: TableHeaderItem[] = [
      { title: "Timestamp" },
      { title: "Actor" },
    ];
    if (showProject) {
      list.push({ title: "Project" });
    }
    list.push({ title: "Event" }, { title: "Resource" }, { title: "Details" });
    return list;
  }, [showProject]);

  return (
    <TableFactory
      headers={headers}
      data={data}
      renderRow={(log: AuditLog) => (
        <TableRow key={log.id}>
          <TableCell>
            {format(new Date(log.createdAt), "dd MMM yyyy HH:mm")}
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <span>{log.actor.email}</span>
              <span className="typography-xsmall text-muted-foreground">
                {log.actor.name}
              </span>
            </div>
          </TableCell>
          {showProject && (
            <TableCell>
              {log.project ? (
                <div className="flex flex-col">
                  <span>{log.project.name}</span>
                  <span className="typography-xsmall text-muted-foreground">
                    {log.project.slug}
                  </span>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
          )}
          <TableCell>
            <AuditEventBadge event={log.event} />
          </TableCell>
          <TableCell>
            <div className="flex flex-col">
              <span>{log.resourceName || log.resourceId}</span>
              <span className="typography-xsmall text-muted-foreground capitalize">
                {log.resourceType}
              </span>
            </div>
          </TableCell>
          <TableCell className="text-muted-foreground typography-xsmall max-w-60 truncate">
            {formatDetails(log)}
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default ActivityTable;
