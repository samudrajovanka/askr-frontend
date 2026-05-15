import { Package, Settings } from "lucide-react";
import { useMemo } from "react";
import { sidebarNavType } from "@/constants/sidebar";
import type { SidebarNavItem } from "@/types/sidebar";

type UseSidebarProjectSettingProps = {
  workspaceSlug: string;
  projectSlug: string;
  headerAction: () => void;
};

const useSidebarProjectSetting = ({
  workspaceSlug,
  projectSlug,
  headerAction,
}: UseSidebarProjectSettingProps) => {
  const navItems = useMemo<SidebarNavItem[]>(
    () => [
      {
        type: sidebarNavType.LINK,
        title: "General",
        href: `/w/${workspaceSlug}/p/${projectSlug}/settings/general`,
        icon: Settings,
      },
      {
        type: sidebarNavType.LINK,
        title: "Registry",
        href: `/w/${workspaceSlug}/p/${projectSlug}/settings/registry`,
        icon: Package,
      },
    ],
    [workspaceSlug, projectSlug],
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
