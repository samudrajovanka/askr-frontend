import {
  LayoutDashboard,
  PencilRuler,
  Rocket,
  Settings,
  SquareStack,
  Workflow,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { projectSidebarType, sidebarNavType } from "@/constants/sidebar";
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
        type: sidebarNavType.LINK,
        title: "Dashboard",
        href: generateHref("dashboard"),
        icon: LayoutDashboard,
      },
      {
        type: sidebarNavType.BUTTON,
        title: "Tokens",
        href: generateHref("token/colors"),
        icon: PencilRuler,
        action: () =>
          handleChangeUrl(generateHref("token/colors"), () =>
            onTypeChange(projectSidebarType.TOKEN),
          ),
      },
      {
        type: sidebarNavType.LINK,
        title: "Release",
        href: generateHref("release"),
        icon: Rocket,
      },
      {
        type: sidebarNavType.LINK,
        title: "Integration",
        href: generateHref("integration"),
        icon: Workflow,
      },
      {
        type: sidebarNavType.LINK,
        title: "Activity",
        href: generateHref("activity"),
        icon: SquareStack,
      },
      {
        type: sidebarNavType.LINK,
        title: "Settings",
        href: generateHref("settings/general"),
        icon: Settings,
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
