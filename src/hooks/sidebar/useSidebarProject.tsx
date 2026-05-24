import {
  LayoutDashboard,
  PencilRuler,
  Rocket,
  Settings,
  SquareStack,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { PROJECT_SIDEBAR_TYPE, SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import type { ProjectSidebarType, SidebarNavItem } from "@/types/sidebar";

type UseSidebarProjectProps = {
  workspaceSlug: string;
  projectSlug: string;
  onTypeChange: (type: ProjectSidebarType) => void;
};

const useSidebarProject = ({
  workspaceSlug,
  projectSlug,
  onTypeChange,
}: UseSidebarProjectProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeUrl = useCallback(
    (to: string, callback: () => void) => {
      if (!pathname.includes(to)) {
        router.push(to);
      }
      callback();
    },
    [pathname, router],
  );

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
        href: generateHref("token/colors"),
        icon: PencilRuler,
        action: () =>
          handleChangeUrl(generateHref("token/colors"), () =>
            onTypeChange(PROJECT_SIDEBAR_TYPE.TOKEN),
          ),
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
      },
      {
        type: SIDEBAR_NAV_TYPE.BUTTON,
        title: "Settings",
        href: generateHref("settings/general"),
        icon: Settings,
        action: () =>
          handleChangeUrl(generateHref("settings/general"), () =>
            onTypeChange(PROJECT_SIDEBAR_TYPE.SETTING),
          ),
      },
    ];
  }, [generateHref, onTypeChange, handleChangeUrl]);

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
