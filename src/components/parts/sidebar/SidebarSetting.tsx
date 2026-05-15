"use client";

import { ArrowLeft, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import Logo from "@/components/parts/logo/Logo";
import { buttonVariants } from "@/components/ui/button";
import { sidebarNavType } from "@/constants/sidebar";
import type { SidebarNavItem as SidebarNavItemType } from "@/types/sidebar";
import SidebarNavItem from "./SidebarNavItem";
import SidebarWrapper from "./SidebarWrapper";

const SidebarSetting = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  const navItems = useMemo<SidebarNavItemType[]>(() => {
    return [
      {
        type: sidebarNavType.LINK,
        title: "General",
        href: `/w/${workspaceSlug}/settings/general`,
        icon: Settings,
      },
      {
        type: sidebarNavType.LINK,
        title: "Members",
        href: `/w/${workspaceSlug}/settings/members`,
        icon: Users,
      },
    ];
  }, [workspaceSlug]);

  return (
    <SidebarWrapper>
      <nav className="p-4 h-full bg-background">
        <Logo className="mb-6" />

        <div className="flex flex-col gap-1">
          <Link
            href={`/w/${workspaceSlug}/projects`}
            className={buttonVariants({
              variant: "ghost",
              className: "relative",
            })}
          >
            <ArrowLeft className="size-4 absolute left-2" />
            Settings
          </Link>

          {navItems.map((item, idx) => (
            <SidebarNavItem key={`${item.title}-${idx}`} item={item} />
          ))}
        </div>
      </nav>
    </SidebarWrapper>
  );
};

export default SidebarSetting;
