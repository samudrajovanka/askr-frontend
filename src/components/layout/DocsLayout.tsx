import DocsSidebar from "../parts/sidebar/SidebarDocs";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh">
      <DocsSidebar />

      <main className="flex-1 container-layout py-10">{children}</main>
    </div>
  );
};

export default DocsLayout;
