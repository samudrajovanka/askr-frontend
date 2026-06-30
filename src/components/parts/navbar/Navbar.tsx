"use client";

import Logo from "@/components/parts/logo/Logo";
import WorkspaceSwitcher from "@/components/parts/switcher/WorkspaceSwitcher";
import { usePermission } from "@/hooks/usePermission";
import ProjectSwitcher from "../switcher/ProjectSwitcher";
import NavbarProfile from "./NavbarProfile";
import NavbarWrapper from "./NavbarWrapper";
import NavLink from "./NavLink";

type NavbarProps = {
  withoutLogo?: boolean;
  showWorkspaceSwitcher?: boolean;
  showProjectSwitcher?: boolean;
  workspaceSlug?: string;
};

const Navbar = ({
  withoutLogo = false,
  showWorkspaceSwitcher = false,
  showProjectSwitcher = false,
  workspaceSlug,
}: NavbarProps) => {
  const { hasPermission } = usePermission(workspaceSlug ?? "");
  const canViewActivity = hasPermission("log:read");

  return (
    <NavbarWrapper>
      <div className="flex h-(--navbar-height) w-full items-center px-6">
        <div className="flex items-center gap-4">
          {!withoutLogo && <Logo />}

          <div className="flex items-center gap-1">
            {showWorkspaceSwitcher && <WorkspaceSwitcher />}
            {showProjectSwitcher && (
              <>
                {showWorkspaceSwitcher && (
                  <span className="text-muted-foreground">/</span>
                )}
                <ProjectSwitcher />
              </>
            )}
          </div>

          {showWorkspaceSwitcher && workspaceSlug && (
            <nav className="flex justify-center items-center gap-2">
              <NavLink href={`/w/${workspaceSlug}/projects`}>Projects</NavLink>
              {canViewActivity && (
                <NavLink href={`/w/${workspaceSlug}/activity`}>
                  Activity
                </NavLink>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <NavbarProfile />
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
