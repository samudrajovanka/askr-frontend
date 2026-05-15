import { Palette } from "lucide-react";
import { useMemo } from "react";
import { sidebarNavType } from "@/constants/sidebar";
import type { SidebarNavItem } from "@/types/sidebar";

type UseSidebarTokenProps = {
  workspaceSlug: string;
  projectSlug: string;
  headerAction: () => void;
};

const useSidebarToken = ({
  workspaceSlug,
  projectSlug,
  headerAction,
}: UseSidebarTokenProps) => {
  const navItems = useMemo<SidebarNavItem[]>(() => {
    return [
      {
        type: sidebarNavType.LINK,
        title: "Color",
        href: `/w/${workspaceSlug}/p/${projectSlug}/token/colors`,
        icon: Palette,
      },
    ];
  }, [workspaceSlug, projectSlug]);

  const header = useMemo(
    () => ({
      action: headerAction,
      title: "Token",
    }),
    [headerAction],
  );

  return { navItems, header };
};

export default useSidebarToken;
