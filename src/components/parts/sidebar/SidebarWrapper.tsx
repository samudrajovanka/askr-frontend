"use client";

import { PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/sidebar/useSidebar";
import { cn } from "@/lib/utils";
import type { UseSidebarReturn } from "@/types/sidebar";
import Logo from "../logo/Logo";
import SidebarExpandButton from "./SidebarExpandButton";
import SidebarHeader from "./SidebarHeader";

type SidebarWrapperProps = React.PropsWithChildren<{
  header: UseSidebarReturn["header"];
  logoLink?: string;
  className?: string;
  noLogo?: boolean;
  isUnderNav?: boolean;
}>;

const SidebarWrapper = ({
  children,
  logoLink,
  header,
  className,
  noLogo,
  isUnderNav,
}: SidebarWrapperProps) => {
  const { isCollapsed, isMobile, closeSidebar } = useSidebar();
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: use pathname
  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [pathname, isMobile, closeSidebar]);

  const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
    if (logoLink) {
      return <Link href={logoLink}>{children}</Link>;
    }

    return <>{children}</>;
  };

  return (
    <div>
      {isMobile && (
        <Backdrop
          show={isCollapsed}
          onClick={closeSidebar}
          className="z-(--z-index-sidebar)"
        />
      )}

      <aside
        className={cn(
          "sidebar-width z-(--z-index-sidebar) bg-background border-r border-border left-0 top-0 h-dvh flex flex-col transition-transform duration-300 ease-in-out",
          isMobile ? "fixed" : "sticky",
          isUnderNav && !isMobile
            ? "top-(--navbar-height) h-[calc(100dvh-var(--navbar-height))]"
            : "top-0 h-dvh",
          isCollapsed && isMobile ? "-translate-x-full" : "translate-x-0",
          className,
        )}
      >
        {!noLogo && (
          <div className="p-4 pb-0">
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </div>
        )}

        <nav className="p-4 flex-1 overflow-auto">
          {header && <SidebarHeader header={header} className="mb-1 w-full" />}

          {children}
        </nav>

        {isMobile && (
          <div className="p-2 border-t border-border">
            <SimpleTooltip
              content="Close Sidebar"
              contentProps={{ side: "right" }}
              renderTrigger={
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={closeSidebar}
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="size-4" />
                </Button>
              }
            />
          </div>
        )}
      </aside>

      {isMobile && <SidebarExpandButton />}
    </div>
  );
};

export default SidebarWrapper;
