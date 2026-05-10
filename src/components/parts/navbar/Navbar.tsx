import Logo from "../logo/Logo";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <NavbarProfile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
