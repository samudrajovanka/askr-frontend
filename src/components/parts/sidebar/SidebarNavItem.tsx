"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { sidebarNavType } from "@/constants/sidebar";
import type { SidebarNavItem as TypeSidebarNavItem } from "@/types/sidebar";

type SidebarNavItemProps = {
  item: TypeSidebarNavItem;
};

const isSidebarNavItemButton = (navItem: TypeSidebarNavItem) => {
  return navItem.type === sidebarNavType.BUTTON;
};

const SidebarNavItem = ({ item }: SidebarNavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(item.href || "");

  if (isSidebarNavItemButton(item)) {
    return (
      <Button
        key={item.href}
        onClick={item.action}
        variant={isActive ? "default" : "ghost"}
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
        variant: isActive ? "default" : "ghost",
        className: "justify-start",
      })}
    >
      <item.icon className="size-4" />
      {item.title}
    </Link>
  );
};

export default SidebarNavItem;
