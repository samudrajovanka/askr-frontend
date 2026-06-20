import { useCallback } from "react";
import { useWorkspace } from "@/query/workspace";
import type { RoleWorkspace } from "@/types/workspace";

type UsePermissionReturn = {
  role: RoleWorkspace | undefined;
  permissions: string[] | undefined;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
  isFetched: boolean;
};

export const usePermission = (workspaceSlug: string): UsePermissionReturn => {
  const workspaceQuery = useWorkspace(workspaceSlug);
  const me = workspaceQuery.data?.data?.data?.workspace?.me;

  const hasPermission = useCallback(
    (permission: string) => {
      if (!me?.permissions) return false;
      return me.permissions.includes(permission);
    },
    [me?.permissions],
  );

  return {
    role: me?.role,
    permissions: me?.permissions,
    hasPermission,
    isLoading: workspaceQuery.isLoading,
    isFetched: workspaceQuery.isFetched,
  };
};
