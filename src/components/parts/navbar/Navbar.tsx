import Logo from "@/components/parts/logo/Logo";
import WorkspaceSwitcher from "@/components/parts/switcher/WorkspaceSwitcher";
import ProjectSwitcher from "../switcher/ProjectSwitcher";
import NavbarProfile from "./NavbarProfile";

type NavbarProps = {
  withoutLogo?: boolean;
  showWorkspaceSwitcher?: boolean;
  showProjectSwitcher?: boolean;
};

const Navbar = ({
  withoutLogo = false,
  showWorkspaceSwitcher = false,
  showProjectSwitcher = false,
}: NavbarProps) => {
  return (
    <header className="navbar-wrapper sticky top-0 z-50">
      <div className="flex h-16 w-full items-center px-6">
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
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <NavbarProfile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
