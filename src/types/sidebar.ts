import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { projectSidebarType, sidebarNavType } from "@/constants/sidebar";

export type ProjectSidebarType =
  (typeof projectSidebarType)[keyof typeof projectSidebarType];

export type SidebarNavType =
  (typeof sidebarNavType)[keyof typeof sidebarNavType];

export type SidebarNavItemButton = {
  type: typeof sidebarNavType.BUTTON;
  href?: string;
  action: () => void;
};

export type SidebarNavItemLink = {
  type: typeof sidebarNavType.LINK;
  href: string;
};

export type SidebarNavItem = {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
} & (SidebarNavItemButton | SidebarNavItemLink);
