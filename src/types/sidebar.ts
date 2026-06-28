import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type {
  PROJECT_SIDEBAR_TYPE,
  SIDEBAR_NAV_TYPE,
} from "@/constants/sidebar";

export type ProjectSidebarType =
  (typeof PROJECT_SIDEBAR_TYPE)[keyof typeof PROJECT_SIDEBAR_TYPE];

export type SidebarNavType =
  (typeof SIDEBAR_NAV_TYPE)[keyof typeof SIDEBAR_NAV_TYPE];

export type SidebarNavItemButton = {
  type: typeof SIDEBAR_NAV_TYPE.BUTTON;
  href?: string;
  action: () => void;
};

export type SidebarNavItemLink = {
  type: typeof SIDEBAR_NAV_TYPE.LINK;
  href: string;
};

export type SidebarNavItem = {
  title: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  permission?: string;
  exactMatch?: boolean;
} & (SidebarNavItemButton | SidebarNavItemLink);

type SidebarHeaderAction = {
  title: string;
  action: () => void;
};

type SidebarHeaderLink = {
  title: string;
  href: string;
};

export type UseSidebarReturn = {
  navItems: SidebarNavItem[];
  header?: SidebarHeaderAction | SidebarHeaderLink;
};
