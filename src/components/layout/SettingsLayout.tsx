import Navbar from "@/components/parts/navbar/Navbar";
import SidebarSetting from "@/components/parts/sidebar/SidebarSetting";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh">
      <SidebarSetting />

      <div className="sidebar-margin flex-1">
        <Navbar withoutLogo showWorkspaceSwitcher />

        <main className="container-layout py-10">{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayout;
