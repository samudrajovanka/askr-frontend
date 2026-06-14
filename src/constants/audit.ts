export const AUDIT_EVENT_TYPE = {
  RELEASE_CREATED: "release.created",
  MEMBER_INVITED: "member.invited",
  MEMBER_JOINED: "member.joined",
  MEMBER_UPDATED: "member.updated",
  MEMBER_REMOVED: "member.removed",
  PROJECT_CREATED: "project.created",
  PROJECT_UPDATED: "project.updated",
  PROJECT_ARCHIVED: "project.archived",
  REGISTRY_CONFIGURED: "registry.configured",
  WORKSPACE_UPDATED: "workspace.updated",
  INVITATION_REVOKED: "invitation.revoked",
} as const;

export const auditEventTypes = Object.values(AUDIT_EVENT_TYPE);

export const AUDIT_RESOURCE_TYPE = {
  RELEASE: "release",
  MEMBER: "member",
  PROJECT: "project",
  REGISTRY: "registry",
  WORKSPACE: "workspace",
  INVITATION: "invitation",
} as const;

export const auditResourceTypes = Object.values(AUDIT_RESOURCE_TYPE);

export const auditEventTypeLabel = {
  [AUDIT_EVENT_TYPE.RELEASE_CREATED]: "Release Created",
  [AUDIT_EVENT_TYPE.MEMBER_INVITED]: "Member Invited",
  [AUDIT_EVENT_TYPE.MEMBER_JOINED]: "Member Joined",
  [AUDIT_EVENT_TYPE.MEMBER_UPDATED]: "Member Updated",
  [AUDIT_EVENT_TYPE.MEMBER_REMOVED]: "Member Removed",
  [AUDIT_EVENT_TYPE.PROJECT_CREATED]: "Project Created",
  [AUDIT_EVENT_TYPE.PROJECT_UPDATED]: "Project Updated",
  [AUDIT_EVENT_TYPE.PROJECT_ARCHIVED]: "Project Archived",
  [AUDIT_EVENT_TYPE.REGISTRY_CONFIGURED]: "Registry Configured",
  [AUDIT_EVENT_TYPE.WORKSPACE_UPDATED]: "Workspace Updated",
  [AUDIT_EVENT_TYPE.INVITATION_REVOKED]: "Invitation Revoked",
};

export const projectAuditEventTypes = [AUDIT_EVENT_TYPE.REGISTRY_CONFIGURED];
