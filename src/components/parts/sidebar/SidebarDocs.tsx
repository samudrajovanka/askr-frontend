"use client";

import useSidebarDocs from "@/hooks/sidebar/useSidebarDocs";
import SidebarMenu from "./SidebarMenu";
import SidebarWrapper from "./SidebarWrapper";

const DocsSidebar = () => {
  const { navItems, header } = useSidebarDocs();

  return (
    <SidebarWrapper header={header} noLogo isUnderNav>
      <SidebarMenu navItems={navItems} />
    </SidebarWrapper>
  );
};

export default DocsSidebar;
