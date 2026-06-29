import Navbar from "@/components/parts/navbar/Navbar";
import SidebarProject from "@/components/parts/sidebar/SidebarProject";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh">
      <SidebarProject />

      <div className="flex-1">
        <Navbar withoutLogo showWorkspaceSwitcher showProjectSwitcher />

        <main className="container-layout py-10">{children}</main>
      </div>
    </div>
  );
};

export default ProjectLayout;
