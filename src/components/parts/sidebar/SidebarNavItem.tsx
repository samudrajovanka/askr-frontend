"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { SIDEBAR_NAV_TYPE } from "@/constants/sidebar";
import type { SidebarNavItem as TypeSidebarNavItem } from "@/types/sidebar";

type SidebarNavItemProps = {
  item: TypeSidebarNavItem;
};

const isSidebarNavItemButton = (navItem: TypeSidebarNavItem) => {
  return navItem.type === SIDEBAR_NAV_TYPE.BUTTON;
};

const SidebarNavItem = ({ item }: SidebarNavItemProps) => {
  const pathname = usePathname();

  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
    : false;

  if (isSidebarNavItemButton(item)) {
    return (
      <Button
        key={item.href}
        onClick={item.action}
        variant={isActive ? "ghost-primary" : "ghost"}
        className="justify-start"
      >
        <item.icon className="size-4" />
        {item.title}
      </Button>
    );
  }

  return (
    <Link
      key={item.href}
      href={item.href}
      className={buttonVariants({
        variant: isActive ? "ghost-primary" : "ghost",
        className: "justify-start",
      })}
    >
      <item.icon className="size-4" />
      {item.title}
    </Link>
  );
};

export default SidebarNavItem;
