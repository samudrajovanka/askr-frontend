import { Badge } from "@/components/ui/badge";
import { AUDIT_EVENT_TYPE, auditEventTypeLabel } from "@/constants/audit";
import type { AuditEventType } from "@/types/audit";

const EVENT_VARIANTS: Record<
  AuditEventType,
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "outline-success"
  | "outline-warning"
  | "outline-destructive"
> = {
  [AUDIT_EVENT_TYPE.MEMBER_INVITED]: "outline",
  [AUDIT_EVENT_TYPE.MEMBER_JOINED]: "outline-success",
  [AUDIT_EVENT_TYPE.MEMBER_UPDATED]: "outline-warning",
  [AUDIT_EVENT_TYPE.MEMBER_REMOVED]: "outline-destructive",
  [AUDIT_EVENT_TYPE.PROJECT_CREATED]: "outline-success",
  [AUDIT_EVENT_TYPE.PROJECT_UPDATED]: "default",
  [AUDIT_EVENT_TYPE.PROJECT_ARCHIVED]: "secondary",
  [AUDIT_EVENT_TYPE.REGISTRY_CONFIGURED]: "default",
  [AUDIT_EVENT_TYPE.WORKSPACE_UPDATED]: "default",
  [AUDIT_EVENT_TYPE.INVITATION_REVOKED]: "outline-destructive",
};

type Props = {
  event: AuditEventType;
};

const AuditEventBadge = ({ event }: Props) => {
  return (
    <Badge variant={EVENT_VARIANTS[event]}>{auditEventTypeLabel[event]}</Badge>
  );
};

export default AuditEventBadge;
