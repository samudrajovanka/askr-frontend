"use client";

import { PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/sidebar/useSidebar";

const SidebarExpandButton = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  if (!isCollapsed) return null;

  return (
    <div className="fixed left-2 bottom-2 z-30">
      <SimpleTooltip
        content="Open Sidebar"
        contentProps={{ side: "right" }}
        renderTrigger={
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <PanelRightClose className="size-4" />
          </Button>
        }
      />
    </div>
  );
};

export default SidebarExpandButton;
