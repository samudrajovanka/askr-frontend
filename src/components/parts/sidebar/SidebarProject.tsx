"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Logo from "@/components/parts/logo/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { projectSidebarType } from "@/constants/sidebar";
import useSidebarProject from "@/hooks/sidebar/useSidebarProject";
import useSidebarProjectSetting from "@/hooks/sidebar/useSidebarProjectSetting";
import useSidebarToken from "@/hooks/sidebar/useSidebarToken";
import type { ProjectSidebarType } from "@/types/sidebar";
import SidebarNavItem from "./SidebarNavItem";
import SidebarWrapper from "./SidebarWrapper";

const SidebarProject = () => {
  const pathname = usePathname();
  const { workspaceSlug, projectSlug } = useParams() as {
    workspaceSlug: string;
    projectSlug: string;
  };
  const [activeNavbar, setActiveNavbar] = useState<ProjectSidebarType>(
    projectSidebarType.PROJECT,
  );
  const { navItems: sidebarProjectNavs, header: headerProjectNavs } =
    useSidebarProject({
      workspaceSlug,
      projectSlug,
      onTypeChange: setActiveNavbar,
    });
  const { navItems: sidebarTokenNavs, header: headerTokenNavs } =
    useSidebarToken({
      workspaceSlug,
      projectSlug,
      headerAction: () => setActiveNavbar(projectSidebarType.PROJECT),
    });
  const { navItems: sidebarSettingNavs, header: headerSettingNavs } =
    useSidebarProjectSetting({
      workspaceSlug,
      projectSlug,
      headerAction: () => setActiveNavbar(projectSidebarType.PROJECT),
    });

  useEffect(() => {
    const isTokenPath = pathname.startsWith(
      `/w/${workspaceSlug}/p/${projectSlug}/token`,
    );
    const isSettingPath = pathname.startsWith(
      `/w/${workspaceSlug}/p/${projectSlug}/settings`,
    );
    if (isTokenPath) {
      setActiveNavbar(projectSidebarType.TOKEN);
    } else if (isSettingPath) {
      setActiveNavbar(projectSidebarType.SETTING);
    } else {
      setActiveNavbar(projectSidebarType.PROJECT);
    }
  }, [pathname, workspaceSlug, projectSlug]);

  const activeNavItems = useMemo(() => {
    if (activeNavbar === projectSidebarType.TOKEN) return sidebarTokenNavs;
    if (activeNavbar === projectSidebarType.SETTING) return sidebarSettingNavs;
    return sidebarProjectNavs;
  }, [activeNavbar, sidebarProjectNavs, sidebarTokenNavs, sidebarSettingNavs]);

  const activeHeader = useMemo(() => {
    if (activeNavbar === projectSidebarType.TOKEN) return headerTokenNavs;
    if (activeNavbar === projectSidebarType.SETTING) return headerSettingNavs;
    return headerProjectNavs;
  }, [activeNavbar, headerProjectNavs, headerTokenNavs, headerSettingNavs]);

  const renderHeader = () => {
    const isActionHeader = "action" in activeHeader;
    const commonProps = {
      className: buttonVariants({
        variant: "ghost",
        className: "relative",
      }),
    };

    if (isActionHeader) {
      return (
        <Button
          onClick={activeHeader.action}
          variant="ghost"
          className="relative"
        >
          <ArrowLeft className="size-4 absolute left-2" />
          {activeHeader.title}
        </Button>
      );
    }

    return (
      <Link href={`/w/${workspaceSlug}/projects`} {...commonProps}>
        <ArrowLeft className="size-4 absolute left-2" />
        {activeHeader.title}
      </Link>
    );
  };

  return (
    <SidebarWrapper>
      <nav className="p-4 h-full bg-background">
        <Logo className="mb-6" />
        <div className="flex flex-col gap-1">
          {renderHeader()}

          {activeNavItems.map((item, idx) => (
            <SidebarNavItem key={`${item.title}-${idx}`} item={item} />
          ))}
        </div>
      </nav>
    </SidebarWrapper>
  );
};

export default SidebarProject;
