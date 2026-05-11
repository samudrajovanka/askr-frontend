import Logo from "@/components/parts/logo/Logo";
import WorkspaceSwitcher from "@/components/parts/switcher/WorkspaceSwitcher";
import NavbarProfile from "./NavbarProfile";

type NavbarProps = {
  withoutLogo?: boolean;
  showWorkspaceSwitcher?: boolean;
};

const Navbar = ({
  withoutLogo = false,
  showWorkspaceSwitcher = false,
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center px-6">
        <div className="flex items-center gap-4">
          {!withoutLogo && <Logo />}

          {showWorkspaceSwitcher && <WorkspaceSwitcher />}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <NavbarProfile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
