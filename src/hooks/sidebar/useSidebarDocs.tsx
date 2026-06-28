import { useMemo } from "react";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import type { SidebarNavItem, UseSidebarReturn } from "@/types/sidebar";

const useSidebarDocs = (): UseSidebarReturn => {
  const navItems = useMemo<SidebarNavItem[]>(() => {
    return [
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Overview",
        href: "/docs",
        exactMatch: true,
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Getting Started",
        href: "/docs/getting-started",
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Tokens",
        href: "/docs/tokens",
      },
      {
        type: SIDEBAR_NAV_TYPE.LINK,
        title: "Releases",
        href: "/docs/releases",
      },
    ];
  }, []);

  return {
    navItems,
  };
};

export default useSidebarDocs;
