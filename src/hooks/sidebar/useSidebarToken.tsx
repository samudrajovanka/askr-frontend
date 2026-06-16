import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import {
  TOKEN_CATEGORIES,
  tokenCategoryIcons,
  tokenCategoryLabels,
} from "@/constants/token";
import type { SidebarNavItem } from "@/types/sidebar";

type UseSidebarTokenProps = {
  workspaceSlug: string;
  projectSlug: string;
  headerAction: () => void;
};

const CATEGORIES = Object.values(TOKEN_CATEGORIES);

const useSidebarToken = ({
  workspaceSlug,
  projectSlug,
  headerAction,
}: UseSidebarTokenProps) => {
  const navItems = useMemo<SidebarNavItem[]>(() => {
    return CATEGORIES.map((category) => ({
      type: SIDEBAR_NAV_TYPE.LINK,
      title: tokenCategoryLabels[category],
      href: `/w/${workspaceSlug}/p/${projectSlug}/token/${category}`,
      icon: tokenCategoryIcons[category],
    }));
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
