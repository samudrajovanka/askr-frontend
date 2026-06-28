import Navbar from "@/components/parts/navbar/Navbar";
import SidebarWorkspaceSetting from "@/components/parts/sidebar/SidebarWorkspaceSetting";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh">
      <SidebarWorkspaceSetting />

      <div className="sidebar-margin flex-1">
        <Navbar withoutLogo showWorkspaceSwitcher />

        <main className="container-layout py-10">{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayout;
