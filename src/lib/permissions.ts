import type { RoleWorkspace } from "@/types/workspace";

export type Permission =
  | "workspace:update"
  | "workspace:delete"
  | "workspace:invite"
  | "workspace:remove-member"
  | "workspace:update-member"
  | "project:create"
  | "project:update"
  | "project:delete"
  | "token:create"
  | "token:edit"
  | "token:delete"
  | "token:restore"
  | "release:publish"
  | "registry:manage"
  | "audit:view";

const permissionMap: Record<Permission, RoleWorkspace[]> = {
  "workspace:update": ["admin"],
  "workspace:delete": ["admin"],
  "workspace:invite": ["admin"],
  "workspace:remove-member": ["admin"],
  "workspace:update-member": ["admin"],
  "project:create": ["admin"],
  "project:update": ["admin"],
  "project:delete": ["admin"],
  "token:create": ["admin", "designer"],
  "token:edit": ["admin", "designer"],
  "token:delete": ["admin", "designer"],
  "token:restore": ["admin", "designer"],
  "release:publish": ["admin", "manager"],
  "registry:manage": ["admin"],
  "audit:view": ["admin", "manager"],
};

export function hasPermission(
  role: RoleWorkspace | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;
  return permissionMap[permission]?.includes(role) ?? false;
}
