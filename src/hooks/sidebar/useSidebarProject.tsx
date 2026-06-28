import {
  LayoutDashboard,
  PencilRuler,
  Rocket,
  Settings,
  SquareStack,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { PROJECT_SIDEBAR_TYPE, SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import { usePermission } from "@/hooks/usePermission";
import type {
  ProjectSidebarType,
  SidebarNavItem,
  UseSidebarReturn,
} from "@/types/sidebar";

type UseSidebarProjectProps = {
  workspaceSlug: string;
  projectSlug: string;
  onTypeChange: (type: ProjectSidebarType) => void;
};

const useSidebarProject = ({
  workspaceSlug,
  projectSlug,
  onTypeChange,
}: UseSidebarProjectProps): UseSidebarReturn => {
  const { hasPermission } = usePermission(workspaceSlug);

  const generateHref = useCallback(
    (path: string) => {
      return `/w/${workspaceSlug}/p/${projectSlug}/${path}`;
    },
    [workspaceSlug, projectSlug],
  );

  const navItems = useMemo<SidebarNavItem[]>(() => {
    return [
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Dashboard",
        href: generateHref("dashboard"),
        icon: LayoutDashboard,
      },
      {
        type: SIDEBAR_NAV_TYPE.BUTTON,
        title: "Tokens",
        icon: PencilRuler,
        action: () => onTypeChange(PROJECT_SIDEBAR_TYPE.TOKEN),
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Release",
        href: generateHref("release"),
        icon: Rocket,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Activity",
        href: generateHref("activity"),
        icon: SquareStack,
        permission: "log:read",
      },
      {
        type: SIDEBAR_NAV_TYPE.BUTTON,
        title: "Settings",
        icon: Settings,
        action: () => onTypeChange(PROJECT_SIDEBAR_TYPE.SETTING),
      },
    ].filter((item) => !item.permission || hasPermission(item.permission));
  }, [generateHref, onTypeChange, hasPermission]);

  const header = useMemo(
    () => ({
      href: `/w/${workspaceSlug}/projects`,
      title: "Project",
    }),
    [workspaceSlug],
  );

  return { navItems, header };
};

export default useSidebarProject;
