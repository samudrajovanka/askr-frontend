"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PROJECT_SIDEBAR_TYPE } from "@/constants/sidebar";
import useSidebarProject from "@/hooks/sidebar/useSidebarProject";
import useSidebarProjectSetting from "@/hooks/sidebar/useSidebarProjectSetting";
import useSidebarToken from "@/hooks/sidebar/useSidebarToken";
import type { ProjectSidebarType } from "@/types/sidebar";
import SidebarMenu from "./SidebarMenu";
import SidebarWrapper from "./SidebarWrapper";

const SidebarProject = () => {
  const pathname = usePathname();
  const { workspaceSlug, projectSlug } = useParams<{
    workspaceSlug: string;
    projectSlug: string;
  }>();
  const [activeNavbar, setActiveNavbar] = useState<ProjectSidebarType>(
    PROJECT_SIDEBAR_TYPE.PROJECT,
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
      headerAction: () => setActiveNavbar(PROJECT_SIDEBAR_TYPE.PROJECT),
    });
  const { navItems: sidebarSettingNavs, header: headerSettingNavs } =
    useSidebarProjectSetting({
      workspaceSlug,
      projectSlug,
      headerAction: () => setActiveNavbar(PROJECT_SIDEBAR_TYPE.PROJECT),
    });

  useEffect(() => {
    const isTokenPath = pathname.startsWith(
      `/w/${workspaceSlug}/p/${projectSlug}/token`,
    );
    const isSettingPath = pathname.startsWith(
      `/w/${workspaceSlug}/p/${projectSlug}/settings`,
    );
    if (isTokenPath) {
      setActiveNavbar(PROJECT_SIDEBAR_TYPE.TOKEN);
    } else if (isSettingPath) {
      setActiveNavbar(PROJECT_SIDEBAR_TYPE.SETTING);
    } else {
      setActiveNavbar(PROJECT_SIDEBAR_TYPE.PROJECT);
    }
  }, [pathname, workspaceSlug, projectSlug]);

  const activeNavItems = useMemo(() => {
    if (activeNavbar === PROJECT_SIDEBAR_TYPE.TOKEN) return sidebarTokenNavs;
    if (activeNavbar === PROJECT_SIDEBAR_TYPE.SETTING)
      return sidebarSettingNavs;
    return sidebarProjectNavs;
  }, [activeNavbar, sidebarProjectNavs, sidebarTokenNavs, sidebarSettingNavs]);

  const activeHeader = useMemo(() => {
    if (activeNavbar === PROJECT_SIDEBAR_TYPE.TOKEN) return headerTokenNavs;
    if (activeNavbar === PROJECT_SIDEBAR_TYPE.SETTING) return headerSettingNavs;
    return headerProjectNavs;
  }, [activeNavbar, headerProjectNavs, headerTokenNavs, headerSettingNavs]);

  return (
    <SidebarWrapper logoLink="/workspaces" header={activeHeader}>
      <SidebarMenu navItems={activeNavItems} />
    </SidebarWrapper>
  );
};

export default SidebarProject;
