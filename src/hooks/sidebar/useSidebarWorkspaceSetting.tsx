import { CreditCard, Settings, Users } from "lucide-react";
import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import { usePermission } from "@/hooks/usePermission";
import type { SidebarNavItem, UseSidebarReturn } from "@/types/sidebar";

type UseSidebarWorkspaceSettingProps = {
  workspaceSlug: string;
};

const useSidebarWorkspaceSetting = ({
  workspaceSlug,
}: UseSidebarWorkspaceSettingProps): UseSidebarReturn => {
  const { permissions } = usePermission(workspaceSlug);

  const navItems = useMemo<SidebarNavItem[]>(() => {
    return [
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "General",
        href: `/w/${workspaceSlug}/settings/general`,
        icon: Settings,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Members",
        href: `/w/${workspaceSlug}/settings/members`,
        icon: Users,
        permission: "member:read",
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Billing",
        href: `/w/${workspaceSlug}/settings/billing`,
        icon: CreditCard,
      },
    ].filter(
      (item) => !item.permission || permissions?.includes(item.permission),
    );
  }, [workspaceSlug, permissions]);

  const header = useMemo(
    () => ({
      title: "Settings",
      href: `/w/${workspaceSlug}/projects`,
    }),
    [workspaceSlug],
  );

  return {
    navItems,
    header,
  };
};

export default useSidebarWorkspaceSetting;
