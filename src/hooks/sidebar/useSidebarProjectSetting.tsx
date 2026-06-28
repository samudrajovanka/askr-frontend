import { Package, Settings } from "lucide-react";
import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import { usePermission } from "@/hooks/usePermission";
import type { SidebarNavItem, UseSidebarReturn } from "@/types/sidebar";

type UseSidebarProjectSettingProps = {
  workspaceSlug: string;
  projectSlug: string;
  headerAction: () => void;
};

const useSidebarProjectSetting = ({
  workspaceSlug,
  projectSlug,
  headerAction,
}: UseSidebarProjectSettingProps): UseSidebarReturn => {
  const { permissions } = usePermission(workspaceSlug);

  const navItems = useMemo<SidebarNavItem[]>(
    () =>
      [
        {
          type: SIDEBAR_NAV_TYPE.LINK,
          title: "General",
          href: `/w/${workspaceSlug}/p/${projectSlug}/settings/general`,
          icon: Settings,
        },
        {
          type: SIDEBAR_NAV_TYPE.LINK,
          title: "Registry",
          href: `/w/${workspaceSlug}/p/${projectSlug}/settings/registry`,
          icon: Package,
          permission: "registry:read",
        },
      ].filter(
        (item) => !item.permission || permissions?.includes(item.permission),
      ),
    [workspaceSlug, projectSlug, permissions],
  );

  const header = useMemo(
    () => ({
      action: headerAction,
      title: "Settings",
    }),
    [headerAction],
  );

  return { navItems, header };
};

export default useSidebarProjectSetting;
