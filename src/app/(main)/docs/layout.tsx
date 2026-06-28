import DocsSidebar from "@/components/parts/sidebar/SidebarDocs";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DocsSidebar />

      <div className="sidebar-margin">
        <main className="container-layout py-10">{children}</main>
      </div>
    </>
  );
};

export default DocsLayout;
