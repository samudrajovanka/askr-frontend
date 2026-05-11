const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="sidebar-width border-r border-border fixed left-0 top-0 h-dvh">
      {children}
    </aside>
  );
};

export default SidebarWrapper;
