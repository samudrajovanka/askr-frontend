type NavbarWrapperProps = React.PropsWithChildren;

const NavbarWrapper = ({ children }: NavbarWrapperProps) => {
  return (
    <header className="navbar-wrapper sticky top-0 z-(--z-index-navbar)">
      {children}
    </header>
  );
};

export default NavbarWrapper;
