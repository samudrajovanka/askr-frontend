"use client";

import { useParams } from "next/navigation";
import useSidebarWorkspaceSetting from "@/hooks/sidebar/useSidebarWorkspaceSetting";
import SidebarMenu from "./SidebarMenu";
import SidebarWrapper from "./SidebarWrapper";

const SidebarWorkspaceSetting = () => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { navItems, header } = useSidebarWorkspaceSetting({ workspaceSlug });

  return (
    <SidebarWrapper logoLink="/workspaces" header={header}>
      <SidebarMenu navItems={navItems} />
    </SidebarWrapper>
  );
};

export default SidebarWorkspaceSetting;
